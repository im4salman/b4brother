# Paper Industry Website - CSS Design Adaptation

## Overview
This document provides CSS design specifications to adapt the existing B4Brothers construction website design for a paper industry website. **NO CONTENT CHANGES** - only visual/design modifications.

## Color Palette Changes

### Primary Colors (Replace construction theme)
```css
:root {
  /* Replace existing primary colors */
  --primary-50: #f0fdf4;    /* Light green background */
  --primary-100: #dcfce7;   /* Very light green */
  --primary-200: #bbf7d0;   /* Light green */
  --primary-300: #86efac;   /* Medium light green */
  --primary-400: #4ade80;   /* Medium green */
  --primary-500: #22c55e;   /* Main green (replace orange) */
  --primary-600: #16a34a;   /* Dark green */
  --primary-700: #15803d;   /* Darker green */
  --primary-800: #166534;   /* Very dark green */
  --primary-900: #14532d;   /* Darkest green */

  /* Secondary colors for text and backgrounds */
  --secondary-50: #fafaf9;  /* Paper white */
  --secondary-100: #f5f5f4; /* Light paper */
  --secondary-200: #e7e5e4; /* Light gray */
  --secondary-300: #d6d3d1; /* Medium light gray */
  --secondary-400: #a8a29e; /* Medium gray */
  --secondary-500: #78716c; /* Dark gray */
  --secondary-600: #57534e; /* Darker gray */
  --secondary-700: #44403c; /* Very dark gray */
  --secondary-800: #292524; /* Almost black */
  --secondary-900: #1c1917; /* Black */

  /* Accent colors for paper industry */
  --accent-brown: #8b4513;   /* Earthy brown for wood/pulp */
  --accent-cream: #f5f5dc;   /* Cream for paper tones */
  --accent-forest: #228b22;  /* Forest green for sustainability */
}
```

### Tailwind Config Updates
```javascript
// tailwind.config.js - Update existing color definitions
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',  // Main brand color
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        secondary: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        }
      }
    }
  }
}
```

## Typography (Keep existing fonts, adjust colors only)

### Font Stacks (NO CHANGE)
- Keep existing: Inter, Montserrat, system fonts
- Maintain all font sizes and weights

### Text Color Updates
```css
/* Replace orange text with green */
.text-primary-500 { color: #22c55e; }
.text-primary-600 { color: #16a34a; }
.text-primary-700 { color: #15803d; }

/* Update accent text for sustainability messaging */
.text-accent-forest { color: #228b22; }
.text-accent-brown { color: #8b4513; }
```

## Button Styles

### Primary Buttons (Replace orange with green)
```css
.btn-primary {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border: none;
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(34, 197, 94, 0.4);
}
```

### Secondary Buttons
```css
.btn-secondary {
  background: transparent;
  border: 2px solid #22c55e;
  color: #22c55e;
}

.btn-secondary:hover {
  background: #22c55e;
  color: white;
}
```

### CTA Buttons
```css
.cta-button {
  background: linear-gradient(135deg, #22c55e 0%, #228b22 100%);
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
}
```

## Background and Gradient Updates

### Hero Section Overlays
```css
.hero-overlay {
  background: linear-gradient(135deg, 
    rgba(34, 197, 94, 0.8) 0%, 
    rgba(22, 163, 74, 0.9) 100%
  );
}

/* Alternative forest-themed gradient */
.hero-alt {
  background: linear-gradient(135deg, 
    rgba(34, 139, 34, 0.85) 0%, 
    rgba(22, 163, 74, 0.9) 50%,
    rgba(21, 128, 61, 0.95) 100%
  );
}
```

### Section Backgrounds
```css
.section-bg-primary {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
}

.section-bg-alternate {
  background: linear-gradient(135deg, #fafaf9 0%, #f5f5f4 50%, #fafaf9 100%);
}
```

## Icon and Visual Element Colors

### Icon Color Updates
```css
.icon-primary { color: #22c55e; }
.icon-secondary { color: #16a34a; }
.icon-accent { color: #228b22; }

/* For SVG icons */
.svg-primary { fill: #22c55e; }
.svg-secondary { fill: #16a34a; }
```

### Border and Divider Colors
```css
.border-primary { border-color: #22c55e; }
.border-secondary { border-color: #dcfce7; }
.divider-green { border-color: #86efac; }
```

## Animation and Effect Updates

### Box Shadows (Replace orange glows with green)
```css
.shadow-glow-primary {
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
}

.shadow-glow-strong {
  box-shadow: 0 8px 30px rgba(34, 197, 94, 0.4);
}

.hover\:shadow-glow:hover {
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.35);
}
```

### Gradient Animations
```css
@keyframes greenGradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-green-gradient {
  background: linear-gradient(135deg, #22c55e, #16a34a, #22c55e);
  background-size: 200% 200%;
  animation: greenGradient 3s ease infinite;
}
```

## Component-Specific Updates

### Navigation
```css
.nav-link:hover {
  color: #22c55e;
}

.nav-link.active {
  color: #16a34a;
  border-bottom-color: #22c55e;
}
```

### Cards and Containers
```css
.card-hover:hover {
  border-color: #22c55e;
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.15);
}

.feature-card::before {
  background: linear-gradient(135deg, #22c55e, #16a34a);
}
```

### Progress Bars and Indicators
```css
.progress-bar {
  background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
}

.indicator-active {
  background: #22c55e;
}
```

## Mobile Responsiveness (NO CHANGES)
- Keep all existing breakpoints
- Maintain all mobile-specific styling
- Preserve touch targets and mobile navigation

## Quick Implementation Checklist

### Step 1: Global Color Variables
- [ ] Update CSS custom properties (--primary-* variables)
- [ ] Update Tailwind config if using Tailwind

### Step 2: Component Colors
- [ ] Replace all orange/amber colors with green equivalents
- [ ] Update button backgrounds and hover states
- [ ] Change icon colors to green theme

### Step 3: Gradients and Effects
- [ ] Update all gradient backgrounds
- [ ] Change box-shadow colors to green tones
- [ ] Update animation keyframes

### Step 4: Testing
- [ ] Test all interactive elements (buttons, hovers)
- [ ] Verify color contrast for accessibility
- [ ] Check mobile appearance

## Color Mapping Reference

| Original (Construction) | New (Paper Industry) | Usage |
|------------------------|---------------------|--------|
| `#F59E0B` (orange-500) | `#22c55e` (green-500) | Primary buttons, links |
| `#F97316` (orange-600) | `#16a34a` (green-600) | Button hover states |
| `#EA580C` (orange-700) | `#15803d` (green-700) | Active states |
| `#FEF3C7` (orange-50) | `#f0fdf4` (green-50) | Light backgrounds |
| `#FDE68A` (orange-200) | `#bbf7d0` (green-200) | Subtle accents |

This approach maintains the exact same layout, functionality, and design structure while adapting the visual theme for the paper industry.
