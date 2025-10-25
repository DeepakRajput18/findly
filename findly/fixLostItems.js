const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

// Configuration
const BACKEND_URL = 'http://localhost:5001/api';
const BACKUP_URL = 'http://localhost:5000/api';
const TIMEOUT = 10000; // 10 seconds

// File paths
const backendPath = path.join(__dirname, 'backend');
const serverFile = path.join(backendPath, 'server.js');
const routesPath = path.join(backendPath, 'routes');
const controllersPath = path.join(backendPath, 'controllers');
const modelsPath = path.join(backendPath, 'models');

console.log('Starting Lost Items API diagnostic...');

async function testEndpoint(url, method, data = null) {
  console.log(`Testing ${method} ${url}...`);
  try {
    const config = {
      method,
      url,
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    console.log(`✅ Success! Status: ${response.status}`);
    return { success: true, data: response.data };
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error(`❌ Failed: Connection refused to ${url}`);
      if (url.includes(':5001')) {
        console.log('Trying backup port 5000...');
        const backupUrl = url.replace(':5001', ':5000');
        return testEndpoint(backupUrl, method, data);
      }
    } else if (error.code === 'ECONNABORTED') {
      console.error(`❌ Failed: Request timed out to ${url}`);
    } else if (!error.response) {
      console.error(`❌ Failed: Network error to ${url}`);
    } else {
      console.error(`❌ Failed: ${error.response.status} - ${error.response.statusText}`);
    }
    return { success: false, error };
  }
}

// Check if server.js has correct PORT configuration
function checkServerConfig() {
  console.log('\nChecking server configuration...');
  try {
    const serverContent = fs.readFileSync(serverFile, 'utf8');
    
    // Check if PORT is set correctly
    if (serverContent.includes('const PORT = 5000') && !serverContent.includes('process.env.PORT || 5001')) {
      console.log('⚠️ Found incorrect PORT setting in server.js');
      const newContent = serverContent.replace(
        'const PORT = 5000',
        'const PORT = process.env.PORT || 5001'
      );
      fs.writeFileSync(serverFile, newContent);
      console.log('✅ Fixed PORT setting in server.js');
      return true;
    } else {
      console.log('✅ Server PORT configuration seems correct');
    }
    
    return false;
  } catch (error) {
    console.error('Error reading server.js:', error.message);
    return false;
  }
}

// Check lost-items route
function checkLostItemRoutes() {
  console.log('\nChecking lost-items routes...');
  try {
    const routesFile = path.join(routesPath, 'lostItemRoutes.js');
    
    if (fs.existsSync(routesFile)) {
      const routeContent = fs.readFileSync(routesFile, 'utf8');
      console.log('✅ Lost item routes file exists');
      
      // Check if the route has the correct endpoints
      const hasAllRoutes = 
        routeContent.includes('/api/lost-items') || 
        routeContent.includes('router.get') || 
        routeContent.includes('router.post');
      
      if (hasAllRoutes) {
        console.log('✅ Lost item routes appear to be configured correctly');
      } else {
        console.log('⚠️ Lost item routes might be misconfigured');
      }
    } else {
      console.error('❌ Lost item routes file not found');
    }
  } catch (error) {
    console.error('Error checking routes:', error.message);
  }
}

// Check lost-items controller
function checkLostItemController() {
  console.log('\nChecking lost-items controller...');
  try {
    // There are different naming conventions, so try various options
    const controllerFiles = [
      path.join(controllersPath, 'lostItemController.js'),
      path.join(controllersPath, 'lostItemsController.js')
    ];
    
    let controllerFile = null;
    for (const file of controllerFiles) {
      if (fs.existsSync(file)) {
        controllerFile = file;
        break;
      }
    }
    
    if (controllerFile) {
      console.log(`✅ Found controller at ${path.basename(controllerFile)}`);
    } else {
      console.error('❌ Lost item controller file not found');
    }
  } catch (error) {
    console.error('Error checking controller:', error.message);
  }
}

// Check if MongoDB is running
function checkMongoDB() {
  console.log('\nChecking MongoDB connection...');
  return new Promise((resolve) => {
    exec('mongod --version', (error) => {
      if (error) {
        console.error('❌ MongoDB may not be installed or in PATH');
        resolve(false);
        return;
      }
      
      // Try a simple connection to localhost MongoDB
      const testScript = `
      const mongoose = require('mongoose');
      mongoose.connect('mongodb://localhost:27017/findly', { serverSelectionTimeoutMS: 5000 })
        .then(() => {
          console.log('✅ MongoDB connection successful');
          process.exit(0);
        })
        .catch(err => {
          console.error('❌ MongoDB connection failed:', err.message);
          process.exit(1);
        });
      `;
      
      const tempFile = path.join(__dirname, 'temp-mongo-test.js');
      fs.writeFileSync(tempFile, testScript);
      
      exec(`node ${tempFile}`, (error, stdout, stderr) => {
        console.log(stdout);
        if (stderr) console.error(stderr);
        
        try {
          fs.unlinkSync(tempFile);
        } catch (err) {
          // Ignore cleanup errors
        }
        
        resolve(!error);
      });
    });
  });
}

// Create a sample lost item for testing
async function testCreateLostItem() {
  console.log('\nTesting creation of a lost item...');
  
  const testItem = {
    item_name: 'Test Item (Diagnostic)',
    category: 'Electronics',
    description: 'Created by diagnostic tool',
    last_seen_location: 'Test Location',
    lost_date: new Date().toISOString(),
  };
  
  // Try to get a token for auth
  const user = {
    email: 'admin@example.com',
    password: 'password123'
  };
  
  let token = null;
  
  try {
    const loginResponse = await axios.post(`${BACKEND_URL}/users/login`, user);
    if (loginResponse.data && loginResponse.data.token) {
      token = loginResponse.data.token;
      console.log('✅ Got authentication token for API requests');
    }
  } catch (error) {
    console.log('⚠️ Could not get authentication token, trying anonymous request');
  }
  
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
  try {
    const result = await testEndpoint(
      `${BACKEND_URL}/lost-items`, 
      'post', 
      testItem
    );
    
    if (result.success) {
      console.log('✅ Successfully created test lost item');
      return true;
    } else {
      console.error('❌ Failed to create test lost item');
      return false;
    }
  } catch (error) {
    console.error('❌ Error during test item creation:', error.message);
    return false;
  }
}

// Start diagnostic checks
async function runDiagnostics() {
  console.log('=== FINDLY LOST ITEMS API DIAGNOSTICS ===\n');
  
  // Check server config
  const serverConfigChanged = checkServerConfig();
  
  // Check MongoDB connection
  const mongoConnected = await checkMongoDB();
  
  // Check lost-items routes and controller
  checkLostItemRoutes();
  checkLostItemController();
  
  // Test API endpoints
  console.log('\nTesting API endpoints...');
  const getLostItemsResult = await testEndpoint(`${BACKEND_URL}/lost-items`, 'get');
  
  // Test item creation if GET endpoint works or we fixed something
  let createdItemSuccess = false;
  if (getLostItemsResult.success || serverConfigChanged || mongoConnected) {
    createdItemSuccess = await testCreateLostItem();
  }
  
  // Print summary
  console.log('\n=== DIAGNOSTIC SUMMARY ===');
  console.log(`MongoDB Connection: ${mongoConnected ? '✅ Working' : '❌ Not working'}`);
  console.log(`GET Lost Items: ${getLostItemsResult.success ? '✅ Working' : '❌ Not working'}`);
  console.log(`CREATE Lost Item: ${createdItemSuccess ? '✅ Working' : '❌ Not working'}`);
  
  // Provide recommendations
  console.log('\n=== RECOMMENDATIONS ===');
  if (!mongoConnected) {
    console.log('1. Make sure MongoDB is running on your system');
    console.log('   - Start it with `mongod` command or through MongoDB Compass');
  }
  
  if (serverConfigChanged) {
    console.log('2. Restart your backend server after configuration changes');
    console.log('   - Use `node startServers.js` command');
  }
  
  if (!getLostItemsResult.success && !createdItemSuccess) {
    console.log('3. Check your network connectivity and firewall settings');
    console.log('   - Make sure ports 5001 and 5173 are not blocked');
    console.log('   - Update cors settings in server.js if needed');
    console.log('4. Start both servers with `node startServers.js`');
  }
  
  console.log('\nDiagnostics completed!');
}

runDiagnostics(); 