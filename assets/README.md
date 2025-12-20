# Using Your Logo Image

To use your logo image directly (instead of SVG):

## For VS Code Extension Icon

1. **Save your logo image** as `assets/icon.png`
   - Recommended size: **128x128** or **256x256 pixels**
   - Format: PNG (required by VS Code)
   - The file will be automatically used via `package.json` → `"icon": "assets/icon.png"`

2. **If your image is in another format** (JPG, SVG, etc.):
   - Convert it to PNG
   - Resize to 128x128 or 256x256
   - Save as `assets/icon.png`

## For Documentation (README)

1. **Save your logo image** as `assets/logo.png` (or `logo.jpg`)
2. **Update README.md** to reference the image:
   ```markdown
   <img src="assets/logo.png" alt="LILIA Logo" width="200"/>
   ```

## Quick Conversion Tips

### If you have an image file:
- **Windows**: Right-click image → Edit → Save As PNG
- **Online**: Use https://convertio.co/png-converter/ or similar
- **Command line**: Use ImageMagick: `convert input.jpg -resize 128x128 assets/icon.png`

### If you have an SVG:
- Use Inkscape: `inkscape input.svg --export-filename=assets/icon.png --export-width=128 --export-height=128`
- Or use online SVG to PNG converter

## File Structure

```
assets/
  ├── icon.png          # VS Code extension icon (128x128 or 256x256 PNG)
  ├── logo.png          # Full logo for documentation
  └── logo-icon.svg     # (optional, can be removed if using image)
```

The extension is already configured to use `assets/icon.png` - just add your image file there!

