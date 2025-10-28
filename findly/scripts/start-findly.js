const { spawn, exec } = require('child_process');
const path = require('path');

console.log('🚀 Starting Findly Development Server...');
console.log('==========================================');

// Kill ports first
console.log('[1/4] Clearing ports...');
exec('node scripts/kill-ports.js', (error, stdout) => {
  console.log(stdout);
  
  // Test MongoDB
  console.log('[2/4] Testing MongoDB...');
  exec('node scripts/test-mongodb.js', (error, stdout) => {
    console.log(stdout);
    
    if (error) {
      console.log('❌ MongoDB test failed. Please fix the password first.');
      process.exit(1);
    }
    
    // Start backend
    console.log('[3/4] Starting backend...');
    const backend = spawn('node', ['server.js'], {
      cwd: path.join(__dirname, '..', 'backend'),
      stdio: 'inherit',
      shell: true
    });
    
    // Wait a moment then start frontend
    setTimeout(() => {
      console.log('[4/4] Starting frontend...');
      const frontend = spawn('npm', ['run', 'dev'], {
        cwd: path.join(__dirname, '..', 'frontend'),
        stdio: 'inherit',
        shell: true
      });
      
      console.log('');
      console.log('✅ Findly is running!');
      console.log('Backend:  http://localhost:5001');
      console.log('Frontend: http://localhost:5173 (or 5174/5175)');
      console.log('Health:   http://localhost:5001/health');
      console.log('');
      console.log('Press Ctrl+C to stop both servers');
      
    }, 2000);
  });
});
