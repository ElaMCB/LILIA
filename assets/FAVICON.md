# Creating Favicons for Live Page

This guide shows how to create favicon files from your `icon.png` for use on a live website.

## Quick Setup

### Option 1: Use Online Generator (Easiest)

1. Go to https://realfavicongenerator.net/ or https://www.favicon-generator.org/
2. Upload your `assets/icon.png` file
3. Download the generated favicon package
4. Extract the files to your website's root directory (where `index.html` is)

### Option 2: Create Manually

Create these favicon files from your `icon.png`:

1. **favicon.ico** (16x16, 32x32, 48x48 combined) - Main favicon
2. **favicon-16x16.png** - 16x16 PNG
3. **favicon-32x32.png** - 32x32 PNG
4. **apple-touch-icon.png** - 180x180 PNG (for iOS)
5. **android-chrome-192x192.png** - 192x192 PNG (for Android)
6. **android-chrome-512x512.png** - 512x512 PNG (for Android)

## Adding to HTML

Add this to your HTML `<head>` section:

```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="shortcut icon" href="/favicon.ico">
```

## For GitHub Pages

If using GitHub Pages, place favicon files in the root of your `docs/` folder or repository root.

## Files Created

After running the generation script or using an online tool, you should have:

```
your-site/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
└── site.webmanifest (optional)
```

