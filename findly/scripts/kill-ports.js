const { exec } = require('child_process');

console.log('🔧 Killing processes on ports 5001, 5173, 5174, 5175...');

const ports = [5001, 5173, 5174, 5175];

async function killPort(port) {
  return new Promise((resolve) => {
    exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
      if (stdout) {
        const lines = stdout.split('\n');
        lines.forEach(line => {
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 5 && parts[1].includes(`:${port}`)) {
            const pid = parts[4];
            console.log(`   Killing PID ${pid} on port ${port}`);
            exec(`taskkill /F /PID ${pid}`, () => {});
          }
        });
      }
      resolve();
    });
  });
}

async function killAllPorts() {
  for (const port of ports) {
    await killPort(port);
  }
  console.log('✅ All ports cleared!');
}

killAllPorts();

