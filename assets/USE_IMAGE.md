# Using Your Logo Image File

## Quick Setup

1. **Copy your logo image file** to this `assets/` folder
2. **Rename it** based on where you want to use it:
   - `icon.png` - For VS Code extension icon (128x128 or 256x256 recommended)
   - `logo.png` - For README and documentation

3. **That's it!** The extension is already configured to use `assets/icon.png`

## Current Configuration

- **VS Code Extension Icon**: Uses `assets/icon.png` (defined in `package.json`)
- **README Logo**: Uses `assets/logo.png` (defined in `README.md`)

## Image Requirements

### For Extension Icon (`icon.png`):
- Format: **PNG** (required)
- Size: **128x128** or **256x256** pixels
- Background: Transparent or solid (your choice)

### For Documentation (`logo.png`):
- Format: **PNG** or **JPG**
- Size: Any (will be scaled in markdown)
- Recommended: 400-600px width for good quality

## Need to Convert/Resize?

### Using Windows:
1. Right-click image → Open with → Paint
2. Resize (Ctrl+W) to 128x128
3. Save As → PNG

### Using Online Tools:
- https://www.iloveimg.com/resize-image (free resize)
- https://convertio.co/png-converter/ (convert formats)

### Using Command Line (ImageMagick):
```bash
# Convert and resize
convert your-logo.jpg -resize 128x128 assets/icon.png
```

---

**Just drop your image file in the assets folder and name it correctly - it will work automatically!**

