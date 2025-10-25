const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');
console.log(`Checking uploads directory: ${uploadsDir}`);

// Check if directory exists
if (fs.existsSync(uploadsDir)) {
  console.log('✅ Uploads directory exists');
} else {
  console.log('❌ Uploads directory does not exist');
  
  // Try to create it
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('✅ Created uploads directory');
  } catch (err) {
    console.error('❌ Failed to create uploads directory:', err);
  }
}

// Test write access
const testFile = path.join(uploadsDir, 'test.txt');
try {
  fs.writeFileSync(testFile, 'Test write access');
  console.log(`✅ Successfully wrote to ${testFile}`);
  
  // Clean up
  fs.unlinkSync(testFile);
  console.log(`✅ Successfully deleted ${testFile}`);
} catch (err) {
  console.error('❌ File access error:', err);
}

// List contents of uploads directory
try {
  const files = fs.readdirSync(uploadsDir);
  console.log('Contents of uploads directory:');
  if (files.length === 0) {
    console.log('  (empty)');
  } else {
    files.forEach(file => console.log(`  - ${file}`));
  }
} catch (err) {
  console.error('❌ Error reading directory:', err);
}

console.log('Test complete!'); 