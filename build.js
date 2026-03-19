const fs = require('fs');
const path = require('path');

// Create build directory
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Copy files from public to build
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  fs.readdirSync(publicDir).forEach(file => {
    const src = path.join(publicDir, file);
    const dest = path.join(buildDir, file);
    if (fs.statSync(src).isDirectory()) {
      copyDir(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  });
}

// Copy build.js to build
fs.copyFileSync(path.join(__dirname, 'build.js'), path.join(buildDir, 'build.js'));

// Helper function to recursively copy directories
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

console.log('✅ Build completed successfully!');