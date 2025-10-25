const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuration
const FRONTEND_URL = 'http://localhost:5173';
const BACKEND_URL = 'http://localhost:5001';
const LOG_FILE = path.join(__dirname, 'service-check.log');

// Function to check if a service is running
async function checkService(url, name) {
  return new Promise((resolve) => {
    console.log(`Checking ${name} at ${url}...`);
    
    // Parse URL for http.get
    const parsedUrl = new URL(url);
    
    const req = http.get({
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname,
      timeout: 3000 // 3s timeout
    }, (res) => {
      console.log(`${name} status: ${res.statusCode}`);
      res.resume(); // Consume the body to free memory
      resolve({
        name,
        status: 'running',
        statusCode: res.statusCode
      });
    });
    
    req.on('error', (err) => {
      console.error(`${name} error:`, err.message);
      resolve({
        name,
        status: 'not running',
        error: err.message
      });
    });
    
    req.on('timeout', () => {
      console.error(`${name} request timed out`);
      req.destroy();
      resolve({
        name,
        status: 'timeout',
        error: 'Request timed out'
      });
    });
  });
}

// Function to write log
function writeLog(results) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}]\n${results.map(r => `- ${r.name}: ${r.status}${r.error ? ` (${r.error})` : ''}`).join('\n')}\n\n`;
  
  fs.appendFileSync(LOG_FILE, logEntry);
  console.log(`Results written to ${LOG_FILE}`);
  console.log(logEntry);
}

// Main function
async function checkServices() {
  try {
    const results = await Promise.all([
      checkService(FRONTEND_URL, 'Frontend'),
      checkService(BACKEND_URL, 'Backend'),
      checkService(`${BACKEND_URL}/api/users`, 'Backend API - Users'),
      checkService(`${BACKEND_URL}/api/lost-items`, 'Backend API - Lost Items')
    ]);
    
    writeLog(results);
    
    // Check if any service is not running
    const notRunning = results.filter(r => r.status !== 'running');
    if (notRunning.length > 0) {
      console.log('\nServices not running:');
      notRunning.forEach(service => {
        console.log(`- ${service.name}: ${service.error || 'unknown error'}`);
      });
      
      console.log('\nTroubleshooting tips:');
      console.log('1. Make sure MongoDB is running');
      console.log('2. Try starting the backend server manually: cd backend && node server.js');
      console.log('3. Try starting the frontend server manually: cd frontend && npm run dev');
      console.log('4. Check if ports 5001 and 5173 are available and not used by other applications');
    } else {
      console.log('\nAll services are running correctly!');
    }
  } catch (error) {
    console.error('Error checking services:', error);
  }
}

// Run the check
checkServices(); 