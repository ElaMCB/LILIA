# LILIA Logo Design

## Concept (Futuristic Enhanced Design)

The LILIA logo represents a visual narrative of transformation with modern, tech-inspired aesthetics:

1. **Vesta (Flame)**: A vertical flame with neon glow effects at the top, representing the creative spark, passion, and innovation
2. **Lilith-Gemini (Serpents)**: Two mirrored serpents with gradient fills and glow effects, representing duality, balance, and transformation
3. **Libra (Scales)**: The serpents form balanced scales with a glowing central point, representing harmony, justice, and precision in code
4. **Terminal A (Cursor)**: A terminal letter "A" with depth, highlights, and a glowing cursor line, representing practical application and modern coding

### Futuristic Enhancements:
- **Glow Effects**: Neon-like glows using SVG filters for a tech aesthetic
- **Depth**: Multiple layers with shadows and highlights for 3D appearance
- **Vibrant Gradients**: Enhanced color transitions with magenta, purple, cyan, and orange
- **Highlights**: Shiny overlay gradients for modern, polished look
- **Refined Shapes**: More precise curves and proportions

## Symbolism

- **Flame (Vesta)**: Inspiration, creativity, the divine spark
- **Serpents (Lilith-Gemini)**: Duality, transformation, wisdom
- **Scales (Libra)**: Balance, fairness, code quality
- **Cursor A**: Action, implementation, the tool itself

## Files

- `logo.svg` - Full detailed logo (512x512)
- `logo-simple.svg` - Simplified version with unified gradient
- `logo-icon.svg` - Minimal icon version (128x128) for small sizes
- `icon.png` - PNG version for VS Code extension (128x128 or 256x256) - **needs to be generated**

## Color Palette (Enhanced Futuristic)

- **Flame (Magenta/Orange/Yellow)**: `#ff0080` → `#ff6b00` → `#ffaa00` → `#ffff00` (intense, energetic, futuristic)
- **Serpents (Deep Purple)**: `#9d00ff` → `#7b2cbf` → `#5a189a` → `#c77dff` (mystical, transformative, tech-like)
- **Cursor (Bright Cyan)**: `#00f5ff` → `#00d4ff` → `#0099cc` → `#0066aa` (digital, modern, electric)
- **Highlights**: `#ffffff` with various opacities (depth, glow, clarity)
- **Special Effects**: Neon glow filters, holographic overlays, inner glows

## Usage

### For VS Code Extension

The extension icon needs to be a PNG file. To convert from SVG:

**Option 1: Online**
- Use [CloudConvert](https://cloudconvert.com/svg-to-png) or similar
- Upload `logo-icon.svg`
- Set size to 128x128 or 256x256
- Save as `assets/icon.png`

**Option 2: Inkscape (Command Line)**
```bash
inkscape logo-icon.svg --export-filename=icon.png --export-width=128 --export-height=128
```

**Option 3: ImageMagick**
```bash
convert -background none -resize 128x128 logo-icon.svg icon.png
```

### For Documentation

Use `logo.svg` or `logo-simple.svg` in README and documentation files.

### For Web UI

Use `logo.svg` in the Agent Panel webview if desired.

## License

The LILIA logo is part of the LILIA project and follows the same license (MIT).

