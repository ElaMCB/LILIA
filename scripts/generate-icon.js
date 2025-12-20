/**
 * Script to generate PNG icon from SVG for VS Code extension
 * 
 * Requires: sharp or puppeteer or similar
 * Alternative: Use Inkscape or online converter (see assets/generate-icon.md)
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
try {
  const sharp = require('sharp');
  
  const svgPath = path.join(__dirname, '..', 'assets', 'logo-icon.svg');
  const pngPath = path.join(__dirname, '..', 'assets', 'icon.png');
  
  if (!fs.existsSync(svgPath)) {
    console.error(`SVG file not found: ${svgPath}`);
    process.exit(1);
  }
  
  sharp(svgPath)
    .resize(128, 128)
    .png()
    .toFile(pngPath)
    .then(() => {
      console.log(`✅ Icon generated successfully: ${pngPath}`);
    })
    .catch((err) => {
      console.error('Error generating icon:', err);
      console.log('\n💡 Alternative methods:');
      console.log('1. Install sharp: npm install --save-dev sharp');
      console.log('2. Use Inkscape: inkscape assets/logo-icon.svg --export-filename=assets/icon.png --export-width=128 --export-height=128');
      console.log('3. Use online converter: https://cloudconvert.com/svg-to-png');
      process.exit(1);
    });
} catch (err) {
  console.log('⚠️  Sharp not available. Installing...');
  console.log('Run: npm install --save-dev sharp');
  console.log('Or use alternative methods in assets/generate-icon.md');
  process.exit(1);
}


