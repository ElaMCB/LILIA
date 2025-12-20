/**
 * Script to generate favicon files from assets/icon.png
 * 
 * Requires: sharp package
 * Install: npm install --save-dev sharp
 * 
 * Usage: node scripts/generate-favicons.js
 */

const fs = require('fs');
const path = require('path');

try {
  const sharp = require('sharp');
  
  const iconPath = path.join(__dirname, '..', 'assets', 'icon.png');
  const outputDir = path.join(__dirname, '..', 'favicons');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  if (!fs.existsSync(iconPath)) {
    console.error(`❌ Icon file not found: ${iconPath}`);
    console.log('Please ensure assets/icon.png exists');
    process.exit(1);
  }
  
  console.log('🎨 Generating favicons from', iconPath);
  console.log('📁 Output directory:', outputDir);
  console.log('');
  
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 }
  ];
  
  const promises = sizes.map(({ name, size }) => {
    const outputPath = path.join(outputDir, name);
    return sharp(iconPath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
      })
      .png()
      .toFile(outputPath)
      .then(() => {
        console.log(`✅ Generated ${name} (${size}x${size})`);
      })
      .catch((err) => {
        console.error(`❌ Error generating ${name}:`, err.message);
      });
  });
  
  // Generate favicon.ico (multi-size ICO file)
  // Note: sharp doesn't support ICO directly, so we'll create a 32x32 PNG and note that user needs to convert
  const faviconIcoPath = path.join(outputDir, 'favicon-32x32-for-ico.png');
  promises.push(
    sharp(iconPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(faviconIcoPath)
      .then(() => {
        console.log(`✅ Generated favicon-32x32-for-ico.png (convert to .ico manually or use online tool)`);
      })
      .catch((err) => {
        console.error(`❌ Error generating favicon PNG:`, err.message);
      })
  );
  
  Promise.all(promises).then(() => {
    console.log('');
    console.log('✨ Favicon generation complete!');
    console.log('');
    console.log('📝 Next steps:');
    console.log('1. Convert favicon-32x32-for-ico.png to favicon.ico using:');
    console.log('   - Online: https://convertio.co/png-ico/');
    console.log('   - Or use: npm install --save-dev to-ico (if available)');
    console.log('2. Copy all files from favicons/ to your website root');
    console.log('3. Add favicon links to your HTML <head> section');
    console.log('');
    console.log('📄 See assets/FAVICON.md for HTML code to add');
  });
  
} catch (err) {
  console.log('⚠️  Sharp package not found.');
  console.log('');
  console.log('Please install it first:');
  console.log('  npm install --save-dev sharp');
  console.log('');
  console.log('Or use an online favicon generator:');
  console.log('  https://realfavicongenerator.net/');
  console.log('  https://www.favicon-generator.org/');
  process.exit(1);
}

