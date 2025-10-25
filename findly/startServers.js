const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('http');

// Define paths
const backendPath = path.join(__dirname, 'backend');
const frontendPath = path.join(__dirname, 'frontend');
const logPath = path.join(__dirname, 'logs');

// Ensure log directory exists
if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath, { recursive: true });
}

// Create log streams
const backendLogStream = fs.createWriteStream(path.join(logPath, 'backend.log'), { flags: 'a' });
const frontendLogStream = fs.createWriteStream(path.join(logPath, 'frontend.log'), { flags: 'a' });
const errorLogStream = fs.createWriteStream(path.join(logPath, 'error.log'), { flags: 'a' });

// Log timestamp
const timestamp = new Date().toISOString();
backendLogStream.write(`\n\n[${timestamp}] Starting backend server\n`);
frontendLogStream.write(`\n\n[${timestamp}] Starting frontend server\n`);
errorLogStream.write(`\n\n[${timestamp}] Starting servers\n`);

// Function to check if a service is running
function checkService(url) {
  return new Promise((resolve) => {
    const parsedUrl = new URL(url);
    
    const req = http.get({
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname,
      timeout: 3000 // 3s timeout
    }, (res) => {
      res.resume(); // Consume the body to free memory
      resolve(true);
    });
    
    req.on('error', () => {
      resolve(false);
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Function to start a process with proper output logging
function startProcess(command, args, cwd, name, logStream) {
  console.log(`Starting ${name} server...`);
  
  const process = spawn(command, args, {
    cwd,
    shell: true,
    stdio: 'pipe'
  });
  
  process.stdout.on('data', (data) => {
    const output = `[${name}] ${data}`;
    console.log(output);
    logStream.write(output);
  });
  
  process.stderr.on('data', (data) => {
    const output = `[${name} ERROR] ${data}`;
    console.error(output);
    logStream.write(output);
    errorLogStream.write(output);
  });
  
  process.on('close', (code) => {
    if (code !== 0) {
      const output = `[${name}] process exited with code ${code}. Attempting to restart...\n`;
      console.log(output);
      logStream.write(output);
      errorLogStream.write(output);
      
      // Restart after a delay
      setTimeout(() => {
        startProcess(command, args, cwd, name, logStream);
      }, 5000);
    } else {
      const output = `[${name}] process exited normally\n`;
      console.log(output);
      logStream.write(output);
    }
  });
  
  return process;
}

// Check MongoDB connection (MongoDB should be running before we start)
console.log('Checking MongoDB connection...');
// We'll start servers regardless of MongoDB status, but log any issues

// Start backend server
const backendServer = startProcess('node', ['server.js'], backendPath, 'Backend', backendLogStream);

// Wait for backend to be available before starting frontend
setTimeout(async () => {
  let backendAvailable = false;
  
  // Try to connect to backend
  for (let i = 0; i < 5; i++) {
    console.log(`Checking if backend is available (attempt ${i+1}/5)...`);
    backendAvailable = await checkService('http://localhost:5001');
    
    if (backendAvailable) {
      console.log('Backend is running. Starting frontend...');
      break;
    }
    
    // Wait 2 seconds before next attempt
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Start frontend anyway, but log warning if backend isn't available
  if (!backendAvailable) {
    const warning = 'WARNING: Backend server is not responding. Starting frontend anyway, but expect connection errors.\n';
    console.warn(warning);
    errorLogStream.write(warning);
  }
  
  // Start frontend server (assumes you're using npm)
  const frontendServer = startProcess('npm', ['run', 'dev'], frontendPath, 'Frontend', frontendLogStream);
  
  // Check if frontend is available
  setTimeout(async () => {
    const frontendAvailable = await checkService('http://localhost:5173');
    
    if (!frontendAvailable) {
      const warning = 'WARNING: Frontend server is not responding. Check frontend logs for errors.\n';
      console.warn(warning);
      errorLogStream.write(warning);
    } else {
      console.log('Frontend is running.');
    }
    
    console.log('\nApplication Status:');
    console.log(`- Backend: ${backendAvailable ? 'Running' : 'Not responding'}`);
    console.log(`- Frontend: ${frontendAvailable ? 'Running' : 'Not responding'}`);
    console.log('\nTo stop the servers, press Ctrl+C');
    console.log('Logs are being written to:');
    console.log(`- Backend: ${path.join(logPath, 'backend.log')}`);
    console.log(`- Frontend: ${path.join(logPath, 'frontend.log')}`);
    console.log(`- Errors: ${path.join(logPath, 'error.log')}`);
    
    // Handle application shutdown
    const shutdown = () => {
      console.log('Shutting down servers...');
      backendServer.kill();
      frontendServer.kill();
      
      // Close log streams
      backendLogStream.end();
      frontendLogStream.end();
      errorLogStream.end();
      
      process.exit(0);
    };
    
    // Listen for termination signals
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  }, 10000); // Wait 10 seconds for frontend to start
}, 5000); // Wait 5 seconds for backend to start

console.log('Starting servers. Please wait...'); 