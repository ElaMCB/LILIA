# Generating Icon for VS Code Extension

The VS Code extension requires a PNG icon file. Here's how to generate it from the SVG:

## Quick Method: Using Node.js (if you have sharp installed)

```bash
npm install --save-dev sharp
node -e "const sharp = require('sharp'); sharp('assets/logo-icon.svg').resize(128, 128).png().toFile('assets/icon.png').then(() => console.log('Done!'))"
```

## Method 1: Inkscape (Recommended - Free, Open Source)

1. Install Inkscape: https://inkscape.org/
2. Open `logo-icon.svg` in Inkscape
3. File → Export PNG Image
4. Set width/height to 128
5. Export to `assets/icon.png`

Or use command line:
```bash
inkscape assets/logo-icon.svg --export-filename=assets/icon.png --export-width=128 --export-height=128
```

## Method 2: Online Converter

1. Go to https://cloudconvert.com/svg-to-png
2. Upload `assets/logo-icon.svg`
3. Set width/height to 128x128
4. Download and save as `assets/icon.png`

## Method 3: ImageMagick

```bash
convert -background none -resize 128x128 assets/logo-icon.svg assets/icon.png
```

## Method 4: Browser DevTools (Quick Test)

1. Open `assets/logo-icon.svg` in a browser
2. Right-click → Inspect
3. Select the SVG element
4. Take screenshot or use browser's save image feature
5. Resize to 128x128 using any image editor

## Note

The icon should be:
- Format: PNG
- Size: 128x128 or 256x256 pixels (128 is standard)
- Background: Transparent (if possible)
- File location: `assets/icon.png`

After generating, the extension will use it automatically via the `icon` field in `package.json`.


