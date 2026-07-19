# UI Design Specification: Rawafid Al Omran Contracting

**Document Date:** July 16, 2026  
**Document Version:** 1.0  
**Project:** Rawafid Al Omran Contracting Corporate Website  
**Scope:** Portfolio-quality commercial website with complete CMS Dashboard

---

## Table of Contents

1. Design Philosophy
2. Color System
3. Typography
4. Spacing System
5. Border Radius
6. Shadows
7. Elevation System
8. Icons
9. Buttons
10. Form Components
11. Cards
12. Tables
13. Badges
14. Alerts
15. Toasts
16. Modals
17. Drawers
18. Tabs
19. Accordions
20. Breadcrumbs
21. Pagination
22. Search Components
23. Navigation Components
24. Dashboard Components
25. Charts
26. Data Visualization Guidelines
27. Animations
28. Responsive Breakpoints
29. Component States
30. Accessibility Rules
31. Dark Mode Design Rules
32. Design Tokens
33. Figma Component Organization
34. Naming Conventions
35. UI Consistency Rules

---

## 1. Design Philosophy

### 1.1 Brand Personality

| Attribute | Description |
|-----------|-------------|
| **Professional** | Clean, polished, and trustworthy appearance |
| **Premium** | High-quality visual design conveying excellence |
| **Modern** | Contemporary design language with current trends |
| **Approachable** | Welcoming to all visitor types |
| **Confident** | Bold design choices that inspire trust |
| **Cultural** | Respectful of Saudi Arabian heritage and values |

### 1.2 Visual Direction

| Element | Direction |
|---------|-----------|
| **Style** | Modern Corporate with Premium touches |
| **Aesthetic** | Clean lines, generous whitespace, bold typography |
| **Imagery** | High-quality construction photography, professional team photos |
| **Iconography** | Outlined icons, consistent stroke weight |
| **Illustrations** | Minimal, geometric, brand-colored |
| **Motion** | Subtle, purposeful, professional |

### 1.3 User Experience Principles

| Principle | Implementation |
|-----------|----------------|
| **Clarity** | Clear hierarchy, obvious CTAs, intuitive navigation |
| **Consistency** | Uniform patterns across all pages and components |
| **Feedback** | Immediate response to all user actions |
| **Efficiency** | Minimize steps, provide shortcuts |
| **Accessibility** | WCAG 2.1 AA compliant, inclusive design |
| **Performance** | Fast loading, smooth animations |

---

## 2. Color System

### 2.1 Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Primary 500** | `#1E40AF` | 30, 64, 175 | Main brand color, primary buttons, links |
| **Primary 600** | `#1D4ED8` | 29, 78, 216 | Primary button hover |
| **Primary 700** | `#1E3A8A` | 30, 58, 138 | Primary button active |
| **Primary 100** | `#DBEAFE` | 219, 234, 254 | Primary backgrounds, highlights |
| **Primary 50** | `#EFF6FF` | 239, 246, 255 | Light primary backgrounds |

### 2.2 Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Secondary 500** | `#0F766E` | 15, 118, 110 | Secondary actions, accents |
| **Secondary 600** | `#0D9488` | 13, 148, 136 | Secondary hover |
| **Secondary 100** | `#CCFBF1` | 204, 251, 241 | Secondary backgrounds |

### 2.3 Accent Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Accent 500** | `#F59E0B` | 245, 158, 11 | Highlights, special callouts |
| **Accent 600** | `#D97706` | 217, 119, 6 | Accent hover |
| **Accent 100** | `#FEF3C7` | 254, 243, 199 | Accent backgrounds |

### 2.4 Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Success** | `#059669` | Success messages, positive states |
| **Success Light** | `#D1FAE5` | Success backgrounds |
| **Warning** | `#D97706` | Warning messages, caution states |
| **Warning Light** | `#FEF3C7` | Warning backgrounds |
| **Error** | `#DC2626` | Error messages, destructive actions |
| **Error Light** | `#FEE2E2` | Error backgrounds |
| **Info** | `#0284C7` | Informational messages |
| **Info Light** | `#E0F2FE` | Info backgrounds |

### 2.5 Neutral Grayscale

| Name | Hex | Usage |
|------|-----|-------|
| **Gray 900** | `#111827` | Primary text |
| **Gray 800** | `#1F2937` | Secondary text |
| **Gray 700** | `#374151` | Tertiary text |
| **Gray 600** | `#4B5563` | Placeholder text |
| **Gray 500** | `#6B7280` | Muted text, icons |
| **Gray 400** | `#9CA3AF` | Disabled text |
| **Gray 300** | `#D1D5DB` | Borders, dividers |
| **Gray 200** | `#E5E7EB` | Light borders |
| **Gray 100** | `#F3F4F6` | Backgrounds, cards |
| **Gray 50** | `#F9FAFB` | Page backgrounds |
| **White** | `#FFFFFF` | Card backgrounds, inputs |

### 2.6 Light Theme

| Element | Color |
|---------|-------|
| **Background** | `#FFFFFF` |
| **Surface** | `#F9FAFB` |
| **Card Background** | `#FFFFFF` |
| **Text Primary** | `#111827` |
| **Text Secondary** | `#4B5563` |
| **Border** | `#E5E7EB` |

### 2.7 Dark Theme

| Element | Color |
|---------|-------|
| **Background** | `#0F172A` |
| **Surface** | `#1E293B` |
| **Card Background** | `#1E293B` |
| **Text Primary** | `#F8FAFC` |
| **Text Secondary** | `#94A3B8` |
| **Border** | `#334155` |

### 2.8 Color Usage Rules

| Rule | Description |
|------|-------------|
| **Text on Primary** | White text on primary colors |
| **Text on Accent** | Dark text on light accent backgrounds |
| **Contrast Ratio** | Minimum 4.5:1 for body text, 3:1 for large text |
| **Brand Consistency** | Use primary colors for brand elements only |
| **Semantic Usage** | Use semantic colors only for their intended purpose |
| **Neutral Usage** | Use grayscale for text, borders, backgrounds |

---

## 3. Typography

### 3.1 Font Families

| Language | Font Family | Fallback |
|----------|-------------|----------|
| **English** | Inter | system-ui, -apple-system, sans-serif |
| **Arabic** | Noto Sans Arabic | Tahoma, Arial, sans-serif |
| **Monospace** | JetBrains Mono | Consolas, monospace |

### 3.2 Font Sizes

| Name | Size | PX | REM | Usage |
|------|------|-----|-----|-------|
| **xs** | 0.75rem | 12px | 0.75 | Labels, captions |
| **sm** | 0.875rem | 14px | 0.875 | Small text, secondary |
| **base** | 1rem | 16px | 1 | Body text |
| **lg** | 1.125rem | 18px | 1.125 | Large body text |
| **xl** | 1.25rem | 20px | 1.25 | Small headings |
| **2xl** | 1.5rem | 24px | 1.5 | Section headings |
| **3xl** | 1.875rem | 30px | 1.875 | Page titles |
| **4xl** | 2.25rem | 36px | 2.25 | Hero headings |
| **5xl** | 3rem | 48px | 3 | Large hero headings |
| **6xl** | 3.75rem | 60px | 3.75 | Display headings |

### 3.3 Font Weights

| Name | Value | Usage |
|------|-------|-------|
| **Thin** | 100 | Decorative only |
| **Light** | 300 | Arabic body text |
| **Regular** | 400 | Body text, labels |
| **Medium** | 500 | Emphasis, subheadings |
| **Semibold** | 600 | Headings, buttons |
| **Bold** | 700 | Strong emphasis |
| **Extrabold** | 800 | Hero text |
| **Black** | 900 | Display text |

### 3.4 Line Heights

| Name | Value | Usage |
|------|-------|-------|
| **none** | 1 | Tight headings |
| **tight** | 1.25 | H1, H2 |
| **snug** | 1.375 | H3, H4 |
| **normal** | 1.5 | Body text |
| **relaxed** | 1.625 | Large body text |
| **loose** | 2 | Arabic text, accessibility |

### 3.5 Heading Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| **H1** | 3rem (48px) | 700 | 1.2 | -0.02em |
| **H2** | 2.25rem (36px) | 700 | 1.25 | -0.01em |
| **H3** | 1.875rem (30px) | 600 | 1.3 | 0 |
| **H4** | 1.5rem (24px) | 600 | 1.35 | 0 |
| **H5** | 1.25rem (20px) | 600 | 1.4 | 0 |
| **H6** | 1rem (16px) | 600 | 1.5 | 0 |

### 3.6 Body Text

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| **Large Body** | 1.125rem (18px) | 400 | 1.625 |
| **Body** | 1rem (16px) | 400 | 1.5 |
| **Small Body** | 0.875rem (14px) | 400 | 1.5 |

### 3.7 Labels

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| **Form Label** | 0.875rem (14px) | 500 | 1.5 |
| **Input Text** | 1rem (16px) | 400 | 1.5 |
| **Helper Text** | 0.75rem (12px) | 400 | 1.5 |
| **Error Text** | 0.75rem (12px) | 500 | 1.5 |

### 3.8 Buttons

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| **Large Button** | 1.125rem (18px) | 600 | 1 |
| **Medium Button** | 1rem (16px) | 600 | 1 |
| **Small Button** | 0.875rem (14px) | 600 | 1 |

### 3.9 Arabic Typography Recommendations

| Element | Recommendation |
|---------|----------------|
| **Font** | Noto Sans Arabic |
| **Weight** | Use Light (300) for body, Regular (400) for emphasis |
| **Line Height** | Use 1.8-2.0 for body text |
| **Letter Spacing** | Slightly negative for headings |
| **Text Alignment** | Right-to-left (RTL) |
| **Numerals** | Eastern Arabic numerals optional |

---

## 4. Spacing System

### 4.1 Base Unit

**Base unit: 4px**

All spacing values are multiples of 4px.

### 4.2 Spacing Scale

| Name | Value | PX | REM | Usage |
|------|-------|-----|-----|-------|
| **0** | 0 | 0px | 0 | No spacing |
| **0.5** | 0.125rem | 2px | 0.125 | Tight spacing |
| **1** | 0.25rem | 4px | 0.25 | Icon gaps |
| **1.5** | 0.375rem | 6px | 0.375 | Small gaps |
| **2** | 0.5rem | 8px | 0.5 | Component internal |
| **3** | 0.75rem | 12px | 0.75 | Input padding |
| **4** | 1rem | 16px | 1 | Standard spacing |
| **5** | 1.25rem | 20px | 1.25 | Form elements |
| **6** | 1.5rem | 24px | 1.5 | Card padding |
| **8** | 2rem | 32px | 2 | Section gaps |
| **10** | 2.5rem | 40px | 2.5 | Large gaps |
| **12** | 3rem | 48px | 3 | Section spacing |
| **16** | 4rem | 64px | 4 | Major sections |
| **20** | 5rem | 80px | 5 | Hero sections |
| **24** | 6rem | 96px | 6 | Page sections |
| **32** | 8rem | 128px | 8 | Large margins |

### 4.3 Margin Rules

| Element | Margin |
|---------|--------|
| **Page Container** | 24px (mobile), 48px (tablet), 64px (desktop) |
| **Section Vertical** | 64px (mobile), 96px (desktop) |
| **Component Group** | 24px |
| **Card Stack** | 16px |
| **Heading to Paragraph** | 16px |
| **List Items** | 8px |

### 4.4 Padding Rules

| Element | Padding |
|---------|--------|
| **Card** | 24px |
| **Modal** | 24px |
| **Button** | 12px 24px (large), 8px 16px (medium), 6px 12px (small) |
| **Input** | 12px 16px |
| **Table Cell** | 12px 16px |
| **Navigation Item** | 8px 16px |

### 4.5 Section Spacing

| Section Type | Spacing |
|--------------|---------|
| **Hero** | 80px top, 80px bottom |
| **Content** | 64px top, 64px bottom |
| **Cards Grid** | 32px gap |
| **Feature List** | 24px between items |
| **Footer** | 48px top padding |

---

## 5. Border Radius

| Name | Value | Usage |
|------|-------|-------|
| **none** | 0 | Sharp edges, images |
| **sm** | 0.125rem (2px) | Small elements |
| **DEFAULT** | 0.25rem (4px) | Inputs, small cards |
| **md** | 0.375rem (6px) | Buttons, cards |
| **lg** | 0.5rem (8px) | Cards, modals |
| **xl** | 0.75rem (12px) | Large cards |
| **2xl** | 1rem (16px) | Feature cards |
| **3xl** | 1.5rem (24px) | Hero elements |
| **full** | 9999px | Pills, avatars, badges |

---

## 6. Shadows

| Name | Value | Usage |
|------|-------|-------|
| **none** | none | No shadow |
| **sm** | 0 1px 2px 0 rgb(0 0 0 / 0.05) | Subtle elevation |
| **DEFAULT** | 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) | Cards, inputs |
| **md** | 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) | Dropdowns |
| **lg** | 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) | Modals |
| **xl** | 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) | Large modals |
| **2xl** | 0 25px 50px -12px rgb(0 0 0 / 0.25) | Overlays |
| **inner** | inset 0 2px 4px 0 rgb(0 0 0 / 0.05) | Pressed states |

---

## 7. Elevation System

| Level | Shadow | Usage | Z-Index |
|-------|--------|-------|---------|
| **0** | none | Base level | 0 |
| **1** | sm | Cards at rest | 10 |
| **2** | DEFAULT | Cards on hover | 20 |
| **3** | md | Dropdowns, tooltips | 100 |
| **4** | lg | Modals, drawers | 200 |
| **5** | xl | Full-screen modals | 300 |
| **6** | 2xl | Overlays, toasts | 400 |
| **7** | Fixed header | Sticky navigation | 500 |
| **8** | Modal backdrop | Modal overlay | 600 |

---

## 8. Icons

### 8.1 Icon Style

| Attribute | Specification |
|-----------|---------------|
| **Style** | Outlined (line icons) |
| **Stroke Width** | 1.5px (standard), 2px (bold) |
| **Corner Radius** | 2px (rounded), 0 (sharp) |
| **Optical Size** | 24px (default) |
| **Consistency** | Same visual weight across all icons |

### 8.2 Icon Sizes

| Name | Size | PX | Usage |
|------|------|-----|-------|
| **xs** | 0.75rem | 12px | Inline with text |
| **sm** | 1rem | 16px | Small buttons |
| **md** | 1.25rem | 20px | Form icons |
| **lg** | 1.5rem | 24px | Standard icons |
| **xl** | 2rem | 32px | Feature icons |
| **2xl** | 2.5rem | 40px | Large icons |
| **3xl** | 3rem | 48px | Hero icons |

### 8.3 Icon Usage Guidelines

| Guideline | Description |
|-----------|-------------|
| **Consistency** | Use same icon set throughout |
| **Meaning** | Icons should match meaning, not just fill space |
| **Accessibility** | Include aria-label for decorative icons |
| **Color** | Use currentColor for flexibility |
| **Spacing** | 8px gap between icon and text |
| **Alignment** | Center icons with text vertically |

---

## 9. Buttons

### 9.1 Primary Button

| State | Background | Text | Border |
|-------|------------|------|--------|
| **Default** | Primary 500 | White | None |
| **Hover** | Primary 600 | White | None |
| **Active** | Primary 700 | White | None |
| **Focus** | Primary 500 | White | 2px ring |
| **Disabled** | Gray 300 | Gray 500 | None |

### 9.2 Secondary Button

| State | Background | Text | Border |
|-------|------------|------|--------|
| **Default** | Secondary 500 | White | None |
| **Hover** | Secondary 600 | White | None |
| **Active** | Secondary 700 | White | None |
| **Focus** | Secondary 500 | White | 2px ring |
| **Disabled** | Gray 200 | Gray 400 | None |

### 9.3 Outline Button

| State | Background | Text | Border |
|-------|------------|------|--------|
| **Default** | Transparent | Primary 500 | Primary 500 |
| **Hover** | Primary 50 | Primary 600 | Primary 600 |
| **Active** | Primary 100 | Primary 700 | Primary 700 |
| **Focus** | Transparent | Primary 500 | 2px ring |
| **Disabled** | Transparent | Gray 400 | Gray 300 |

### 9.4 Ghost Button

| State | Background | Text | Border |
|-------|------------|------|--------|
| **Default** | Transparent | Gray 700 | None |
| **Hover** | Gray 100 | Gray 900 | None |
| **Active** | Gray 200 | Gray 900 | None |
| **Focus** | Transparent | Gray 700 | 2px ring |
| **Disabled** | Transparent | Gray 400 | None |

### 9.5 Danger Button

| State | Background | Text | Border |
|-------|------------|------|--------|
| **Default** | Error | White | None |
| **Hover** | Red 700 | White | None |
| **Active** | Red 800 | White | None |
| **Focus** | Error | White | 2px ring |
| **Disabled** | Gray 300 | Gray 500 | None |

### 9.6 Icon Button

| State | Background | Icon Color |
|-------|------------|------------|
| **Default** | Transparent | Gray 500 |
| **Hover** | Gray 100 | Gray 700 |
| **Active** | Gray 200 | Gray 900 |
| **Focus** | Transparent | Gray 500 |
| **Disabled** | Transparent | Gray 300 |

### 9.7 Button Sizes

| Size | Height | Padding | Font Size | Icon Size |
|------|--------|---------|-----------|-----------|
| **Large** | 48px | 12px 24px | 1.125rem | 20px |
| **Medium** | 40px | 8px 16px | 1rem | 16px |
| **Small** | 32px | 6px 12px | 0.875rem | 14px |

### 9.8 Button Loading State

| Element | Specification |
|---------|---------------|
| **Spinner** | 16px white spinner |
| **Text** | "Loading..." or preserve original text |
| **Width** | Fixed width to prevent layout shift |
| **Disabled** | Pointer events disabled |

### 9.9 Button Disabled State

| Element | Specification |
|---------|---------------|
| **Opacity** | 0.6 |
| **Cursor** | Not allowed |
| **Pointer Events** | None |
| **Tab Index** | -1 |

---

## 10. Form Components

### 10.1 Text Input

| State | Background | Border | Text | Placeholder |
|-------|------------|--------|------|-------------|
| **Default** | White | Gray 300 | Gray 900 | Gray 400 |
| **Hover** | White | Gray 400 | Gray 900 | Gray 400 |
| **Focus** | White | Primary 500 | Gray 900 | Gray 400 |
| **Error** | White | Error | Gray 900 | Gray 400 |
| **Success** | White | Success | Gray 900 | Gray 400 |
| **Disabled** | Gray 100 | Gray 200 | Gray 400 | Gray 400 |

### 10.2 Input Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| **Large** | 48px | 14px 16px | 1rem |
| **Medium** | 40px | 10px 14px | 0.875rem |
| **Small** | 32px | 6px 10px | 0.75rem |

### 10.3 Textarea

| Attribute | Specification |
|-----------|---------------|
| **Min Height** | 120px |
| **Max Height** | 400px |
| **Resize** | Vertical only |
| **Line Count** | Show 4 lines minimum |

### 10.4 Select

| State | Background | Border | Icon |
|-------|------------|--------|------|
| **Default** | White | Gray 300 | Gray 400 |
| **Hover** | White | Gray 400 | Gray 500 |
| **Focus** | White | Primary 500 | Primary 500 |
| **Open** | White | Primary 500 | Primary 500 |
| **Disabled** | Gray 100 | Gray 200 | Gray 300 |

### 10.5 Checkbox

| State | Box | Check | Border |
|-------|-----|-------|--------|
| **Unchecked** | White | None | Gray 300 |
| **Unchecked Hover** | Gray 50 | None | Gray 400 |
| **Checked** | Primary 500 | White | Primary 500 |
| **Checked Hover** | Primary 600 | White | Primary 600 |
| **Indeterminate** | Primary 500 | White dash | Primary 500 |
| **Disabled** | Gray 100 | Gray 400 | Gray 200 |
| **Error** | White | None | Error |

### 10.6 Radio

| State | Outer | Inner | Border |
|-------|-------|-------|--------|
| **Unselected** | White | None | Gray 300 |
| **Unselected Hover** | White | Gray 200 | Gray 400 |
| **Selected** | White | Primary 500 | Primary 500 |
| **Selected Hover** | White | Primary 600 | Primary 600 |
| **Disabled** | Gray 100 | Gray 300 | Gray 200 |
| **Error** | White | None | Error |

### 10.7 Switch

| State | Track | Thumb | Border |
|-------|-------|-------|--------|
| **Off** | Gray 200 | White | Gray 300 |
| **Off Hover** | Gray 300 | White | Gray 400 |
| **On** | Primary 500 | White | Primary 500 |
| **On Hover** | Primary 600 | White | Primary 600 |
| **Disabled Off** | Gray 100 | Gray 200 | Gray 200 |
| **Disabled On** | Gray 300 | White | Gray 300 |

### 10.8 File Upload

| State | Border | Background | Icon |
|-------|--------|------------|------|
| **Default** | Dashed Gray 300 | Gray 50 | Gray 400 |
| **Hover** | Dashed Primary 400 | Primary 50 | Primary 500 |
| **Drag Over** | Solid Primary 500 | Primary 50 | Primary 500 |
| **Uploading** | Solid Gray 300 | Gray 50 | Gray 400 |
| **Error** | Dashed Error | Error 50 | Error |

### 10.9 Validation States

| State | Border | Icon | Message |
|-------|--------|------|---------|
| **Error** | Error | Error icon | Red error text below |
| **Success** | Success | Success icon | Green success text below |
| **Warning** | Warning | Warning icon | Yellow warning text below |
| **Info** | Info | Info icon | Blue info text below |

### 10.10 Form Layout

| Element | Spacing |
|---------|---------|
| **Label to Input** | 6px |
| **Input to Helper** | 6px |
| **Input to Error** | 4px |
| **Form Group** | 20px |
| **Form Section** | 32px |

---

## 11. Cards

### 11.1 Basic Card

| Attribute | Value |
|-----------|-------|
| **Background** | White |
| **Border** | 1px Gray 200 |
| **Border Radius** | lg (8px) |
| **Padding** | 24px |
| **Shadow** | DEFAULT |

### 11.2 Card Hover State

| Attribute | Value |
|-----------|-------|
| **Border** | 1px Gray 300 |
| **Shadow** | md |
| **Transform** | translateY(-2px) |

### 11.3 Card Variants

| Variant | Background | Border | Shadow |
|---------|------------|--------|--------|
| **Default** | White | Gray 200 | DEFAULT |
| **Elevated** | White | None | lg |
| **Outlined** | White | Gray 300 | none |
| **Filled** | Gray 50 | none | none |

### 11.4 Card Sections

| Section | Spacing |
|---------|---------|
| **Header** | 16px bottom padding |
| **Body** | 0 (use body padding) |
| **Footer** | 16px top padding |
| **Image** | Full width, no padding |

---

## 12. Tables

### 12.1 Table Structure

| Element | Style |
|---------|-------|
| **Container** | Border 1px Gray 200, Radius lg |
| **Header** | Background Gray 50, Text Gray 700, Font Weight 600 |
| **Row** | Background White, Border Bottom Gray 100 |
| **Row Hover** | Background Gray 50 |
| **Cell** | Padding 12px 16px |

### 12.2 Table Sizes

| Size | Cell Padding | Font Size |
|------|-------------|-----------|
| **Large** | 16px 20px | 1rem |
| **Medium** | 12px 16px | 0.875rem |
| **Small** | 8px 12px | 0.75rem |

### 12.3 Table Features

| Feature | Implementation |
|---------|----------------|
| **Sortable** | Click header to sort, arrow indicator |
| **Selectable** | Checkbox column, bulk actions bar |
| **Expandable** | Row expansion for details |
| **Pagination** | Bottom pagination controls |
| **Empty State** | Centered message with illustration |

---

## 13. Badges

### 13.1 Badge Variants

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| **Default** | Gray 100 | Gray 700 | None |
| **Primary** | Primary 100 | Primary 700 | None |
| **Success** | Success Light | Success | None |
| **Warning** | Warning Light | Warning | None |
| **Error** | Error Light | Error | None |
| **Info** | Info Light | Info | None |

### 13.2 Badge Sizes

| Size | Padding | Font Size | Border Radius |
|------|---------|-----------|---------------|
| **Large** | 6px 12px | 0.875rem | md |
| **Medium** | 4px 8px | 0.75rem | DEFAULT |
| **Small** | 2px 6px | 0.625rem | sm |

### 13.3 Badge Styles

| Style | Description |
|-------|-------------|
| **Solid** | Filled background |
| **Subtle** | Light background, colored text |
| **Outline** | Border only, colored text |

---

## 14. Alerts

### 14.1 Alert Variants

| Variant | Background | Border | Icon | Text |
|---------|------------|--------|------|------|
| **Info** | Info Light | Left 4px Info | Info icon | Info 700 |
| **Success** | Success Light | Left 4px Success | Check icon | Success 700 |
| **Warning** | Warning Light | Left 4px Warning | Warning icon | Warning 700 |
| **Error** | Error Light | Left 4px Error | Error icon | Error 700 |

### 14.2 Alert Structure

| Element | Specification |
|---------|---------------|
| **Padding** | 16px |
| **Border Radius** | md |
| **Icon** | 20px, left side |
| **Title** | Font weight 600, margin bottom 4px |
| **Description** | Font size sm |
| **Action** | Link style, right side |

### 14.3 Alert Dismissible

| Element | Specification |
|---------|---------------|
| **Close Button** | Icon button, right side |
| **Icon Size** | 16px |
| **Hover** | Background Gray 100 |

---

## 15. Toasts

### 15.1 Toast Variants

| Variant | Background | Border | Icon |
|---------|------------|--------|------|
| **Success** | White | Left 4px Success | Check circle |
| **Error** | White | Left 4px Error | X circle |
| **Warning** | White | Left 4px Warning | Alert triangle |
| **Info** | White | Left 4px Info | Info |

### 15.2 Toast Structure

| Element | Specification |
|---------|---------------|
| **Width** | 360px (max) |
| **Padding** | 16px |
| **Shadow** | lg |
| **Border Radius** | lg |
| **Icon** | 20px, left |
| **Content** | Title + description |
| **Action** | Optional button |
| **Close** | Icon button, right |

### 15.3 Toast Behavior

| Behavior | Specification |
|----------|---------------|
| **Position** | Top right |
| **Duration** | 5 seconds |
| **Animation** | Slide in from right |
| **Stack** | Max 3 visible |
| **Dismiss** | Click X or swipe |

---

## 16. Modals

### 16.1 Modal Sizes

| Size | Width | Usage |
|------|-------|-------|
| **Small** | 400px | Confirmations, alerts |
| **Medium** | 560px | Forms, small content |
| **Large** | 720px | Complex forms, lists |
| **XLarge** | 900px | Content preview |
| **Full** | 100% | Special cases |

### 16.2 Modal Structure

| Element | Specification |
|---------|---------------|
| **Backdrop** | Black 50% opacity |
| **Container** | White background, radius xl |
| **Header** | Padding 24px, border bottom |
| **Title** | H3, font weight 600 |
| **Close Button** | Top right, icon button |
| **Body** | Padding 24px, scrollable |
| **Footer** | Padding 24px, border top, right-aligned buttons |

### 16.3 Modal States

| State | Backdrop | Animation |
|-------|----------|-----------|
| **Opening** | Fade in | Scale up + fade |
| **Open** | Visible | None |
| **Closing** | Fade out | Scale down + fade |

---

## 17. Drawers

### 17.1 Drawer Sizes

| Size | Width | Usage |
|------|-------|-------|
| **Small** | 320px | Notifications, filters |
| **Medium** | 480px | Forms, details |
| **Large** | 640px | Complex content |

### 17.2 Drawer Structure

| Element | Specification |
|---------|---------------|
| **Position** | Right side |
| **Backdrop** | Black 50% opacity |
| **Container** | White background, full height |
| **Header** | Fixed, padding 24px |
| **Body** | Scrollable, padding 24px |
| **Footer** | Fixed, padding 24px |

### 17.3 Drawer Animation

| State | Animation |
|-------|-----------|
| **Opening** | Slide in from right |
| **Closing** | Slide out to right |
| **Duration** | 300ms |

---

## 18. Tabs

### 18.1 Tab Styles

| Style | Description |
|-------|-------------|
| **Underline** | Bottom border indicator |
| **Pill** | Rounded background indicator |
| **Box** | Full background indicator |

### 18.2 Tab Structure

| Element | Specification |
|---------|---------------|
| **Container** | Border bottom Gray 200 |
| **Tab** | Padding 12px 16px |
| **Active Tab** | Primary 500 text, indicator |
| **Inactive Tab** | Gray 500 text |
| **Hover** | Gray 700 text |

### 18.3 Tab Indicator

| Style | Specification |
|-------|---------------|
| **Underline** | 2px bottom border, Primary 500 |
| **Pill** | Background Primary 100 |
| **Box** | Background Primary 500, white text |

---

## 19. Accordions

### 19.1 Accordion Structure

| Element | Specification |
|---------|---------------|
| **Container** | Border Gray 200 |
| **Item** | Border bottom Gray 200 (except last) |
| **Header** | Padding 16px, cursor pointer |
| **Trigger** | Full width, text left, icon right |
| **Content** | Padding 16px, collapsible |
| **Icon** | Chevron, rotates on open |

### 19.2 Accordion States

| State | Icon Rotation | Content |
|-------|---------------|---------|
| **Closed** | 0deg | Hidden |
| **Open** | 180deg | Visible |
| **Hover** | - | Background Gray 50 |

### 19.3 Accordion Variants

| Variant | Border | Background |
|---------|--------|------------|
| **Bordered** | 1px Gray 200 | White |
| **Borderless** | None | Transparent |
| **Elevated** | None | White, shadow |

---

## 20. Breadcrumbs

### 20.1 Breadcrumb Structure

| Element | Specification |
|---------|---------------|
| **Separator** | Slash (/) or chevron |
| **Separator Color** | Gray 400 |
| **Link Color** | Gray 600 |
| **Link Hover** | Primary 500 |
| **Current** | Gray 900, not linked |

### 20.2 Breadcrumb Sizes

| Size | Font Size | Padding |
|------|-----------|---------|
| **Large** | 0.875rem | 8px 0 |
| **Medium** | 0.75rem | 6px 0 |
| **Small** | 0.625rem | 4px 0 |

### 20.3 Breadcrumb Truncation

| Method | Usage |
|--------|-------|
| **Ellipsis** | Show first and last, ellipsis in middle |
| **Max Items** | 4 items visible |

---

## 21. Pagination

### 21.1 Pagination Structure

| Element | Specification |
|---------|---------------|
| **Container** | Flex, center aligned |
| **Page Button** | 40px square, radius md |
| **Current Page** | Primary 500 background, white text |
| **Other Pages** | White background, Gray 700 text |
| **Disabled** | Gray 200 background, Gray 400 text |

### 21.2 Pagination Variants

| Variant | Description |
|---------|-------------|
| **Simple** | Previous, page numbers, next |
| **Complex** | First, prev, numbers, next, last |
| **Compact** | "Page X of Y" with inputs |

### 21.3 Pagination Info

| Element | Specification |
|---------|---------------|
| **Text** | "Showing 1-10 of 156 results" |
| **Position** | Left side |
| **Per Page Select** | Right side |

---

## 22. Search Components

### 22.1 Search Input

| Element | Specification |
|---------|---------------|
| **Icon** | Search icon, left side |
| **Placeholder** | "Search..." |
| **Clear Button** | X icon, right side when has value |
| **Border** | Gray 300, Primary 500 on focus |

### 22.2 Search Modal

| Element | Specification |
|---------|---------------|
| **Trigger** | Click icon or Cmd/Ctrl + K |
| **Backdrop** | Black 50%, blur |
| **Container** | White, radius xl, max 640px |
| **Input** | Large, 56px height |
| **Results** | Below input, scrollable |

### 22.3 Search Results

| Element | Specification |
|---------|---------------|
| **Item** | Padding 12px 16px |
| **Icon** | Result type icon, left |
| **Title** | Font weight 500 |
| **Excerpt** | Font size sm, Gray 500 |
| **Highlight** | Yellow background on match |

---

## 23. Navigation Components

### 23.1 Header

| Element | Specification |
|---------|---------------|
| **Height** | 72px (desktop), 64px (mobile) |
| **Background** | White, blur backdrop |
| **Border** | Bottom 1px Gray 200 |
| **Logo** | Left side |
| **Nav** | Center |
| **Actions** | Right side |

### 23.2 Header States

| State | Background | Shadow |
|-------|------------|--------|
| **Default** | White | None |
| **Scrolled** | White 95% | sm |
| **Mobile Menu Open** | White | lg |

### 23.3 Footer

| Element | Specification |
|---------|---------------|
| **Background** | Gray 900 |
| **Text** | Gray 300 |
| **Links** | Gray 400, White on hover |
| **Heading** | White, font weight 600 |
| **Padding** | 64px top, 32px bottom |

### 23.4 Sidebar (Dashboard)

| Element | Specification |
|---------|---------------|
| **Width** | 280px (expanded), 72px (collapsed) |
| **Background** | Gray 900 |
| **Item** | Padding 12px 16px |
| **Active Item** | Primary 500 background |
| **Icon** | 20px, left |
| **Text** | White, right of icon |

### 23.5 Mobile Navigation

| Element | Specification |
|---------|---------------|
| **Trigger** | Hamburger icon |
| **Menu** | Full screen overlay |
| **Background** | White |
| **Items** | Full width, padding 16px |
| **Submenu** | Accordion style |
| **Close** | X button, top right |

---

## 24. Dashboard Components

### 24.1 Dashboard Card

| Element | Specification |
|---------|---------------|
| **Background** | White |
| **Border** | 1px Gray 200 |
| **Radius** | lg |
| **Padding** | 24px |
| **Shadow** | DEFAULT |

### 24.2 Statistic Widget

| Element | Specification |
|---------|---------------|
| **Label** | Gray 500, font size sm |
| **Value** | Gray 900, font size 2xl, font weight 700 |
| **Change** | Green (positive), Red (negative) |
| **Icon** | Optional, top right |

### 24.3 Quick Action Button

| Element | Specification |
|---------|---------------|
| **Size** | 48px square |
| **Background** | Gray 50 |
| **Icon** | Gray 500 |
| **Hover** | Primary 50 background, Primary 500 icon |
| **Label** | Below icon, font size xs |

### 24.4 Activity Item

| Element | Specification |
|---------|---------------|
| **Avatar** | 32px, left |
| **Content** | Description + time |
| **Time** | Gray 400, font size xs |
| **Border** | Bottom Gray 100 |

### 24.5 Dashboard Table

| Element | Specification |
|---------|---------------|
| **Compact** | Reduced padding |
| **Hover** | Row highlight |
| **Actions** | Icon buttons, right |
| **Status** | Badge in cell |

---

## 25. Charts

### 25.1 Chart Colors

| Chart | Color |
|-------|-------|
| **Primary** | Primary 500 |
| **Secondary** | Secondary 500 |
| **Accent** | Accent 500 |
| **Gray 1** | Gray 400 |
| **Gray 2** | Gray 300 |
| **Gray 3** | Gray 200 |

### 25.2 Chart Types

| Type | Usage |
|------|-------|
| **Line** | Trends over time |
| **Bar** | Comparisons |
| **Pie/Donut** | Distributions |
| **Area** | Cumulative data |

### 25.3 Chart Structure

| Element | Specification |
|---------|---------------|
| **Title** | Top left, font weight 600 |
| **Legend** | Top right or bottom |
| **Tooltip** | On hover, white with shadow |
| **Grid** | Light Gray 200 |
| **Axis Labels** | Gray 500, font size xs |

---

## 26. Data Visualization Guidelines

### 26.1 Color Usage

| Data Type | Color Palette |
|-----------|---------------|
| **Categorical** | Primary, Secondary, Accent, Gray 400, Gray 500, Gray 600 |
| **Sequential** | Light to dark of same hue |
| **Diverging** | Two colors meeting at neutral |

### 26.2 Chart Best Practices

| Practice | Description |
|----------|-------------|
| **Simplicity** | Remove unnecessary elements |
| **Labels** | Always label axes |
| **Legend** | Place where logical |
| **Colors** | Use colorblind-friendly palette |
| **Scale** | Start at zero for bar charts |

### 26.3 Accessibility

| Practice | Description |
|----------|-------------|
| **Patterns** | Add patterns in addition to colors |
| **Labels** | Direct labels on charts |
| **Alt Text** | Describe chart in alt text |
| **Focus** | Keyboard navigable |

---

## 27. Animations

### 27.1 Hover Animations

| Element | Animation | Duration |
|---------|-----------|----------|
| **Button** | Background color change | 150ms |
| **Link** | Color change | 150ms |
| **Card** | Shadow increase, translateY(-2px) | 200ms |
| **Image** | Scale 1.05 | 300ms |
| **Icon** | Color change | 150ms |

### 27.2 Focus Animations

| Element | Animation | Duration |
|---------|-----------|----------|
| **Input** | Border color change, ring | 150ms |
| **Button** | Ring appear | 150ms |
| **Card** | Ring appear | 150ms |

### 27.3 Loading Animations

| Element | Animation | Duration |
|---------|-----------|----------|
| **Spinner** | Rotate 360deg | 1s, linear, infinite |
| **Skeleton** | Shimmer left to right | 1.5s, ease-in-out, infinite |
| **Progress** | Width increase | Variable |
| **Pulse** | Opacity 1 to 0.5 | 1s, ease-in-out, infinite |

### 27.4 Page Transitions

| Transition | Duration | Easing |
|------------|----------|--------|
| **Fade** | 200ms | ease-out |
| **Slide** | 300ms | ease-out |
| **Scale** | 200ms | ease-out |

### 27.5 Motion Duration

| Speed | Duration | Usage |
|-------|----------|-------|
| **Instant** | 0ms | No animation |
| **Fast** | 100ms | Micro-interactions |
| **Normal** | 200ms | Standard transitions |
| **Slow** | 300ms | Complex transitions |
| **Slower** | 500ms | Page transitions |

### 27.6 Easing

| Name | Value | Usage |
|------|-------|-------|
| **ease-in** | cubic-bezier(0.4, 0, 1, 1) | Exit animations |
| **ease-out** | cubic-bezier(0, 0, 0.2, 1) | Enter animations |
| **ease-in-out** | cubic-bezier(0.4, 0, 0.2, 1) | State changes |
| **linear** | cubic-bezier(0, 0, 1, 1) | Loading spinners |

---

## 28. Responsive Breakpoints

### 28.1 Breakpoint Values

| Name | Min Width | Max Width | Usage |
|------|----------|-----------|-------|
| **xs** | 0px | 479px | Small phones |
| **sm** | 480px | 639px | Large phones |
| **md** | 640px | 767px | Tablets portrait |
| **lg** | 768px | 1023px | Tablets landscape |
| **xl** | 1024px | 1279px | Small laptops |
| **2xl** | 1280px | 1535px | Desktops |
| **3xl** | 1536px | - | Large screens |

### 28.2 Container Widths

| Breakpoint | Container Width |
|------------|-----------------|
| **sm** | 100% |
| **md** | 720px |
| **lg** | 960px |
| **xl** | 1140px |
| **2xl** | 1320px |

### 28.3 Grid System

| Breakpoint | Columns | Gutter |
|------------|---------|--------|
| **Mobile** | 4 | 16px |
| **Tablet** | 8 | 24px |
| **Desktop** | 12 | 24px |

---

## 29. Component States

### 29.1 Default State

| Element | Specification |
|---------|---------------|
| **Appearance** | Standard colors, no effects |
| **Cursor** | Default pointer |
| **Interaction** | Ready for user action |

### 29.2 Hover State

| Element | Specification |
|---------|---------------|
| **Appearance** | Slight color change, shadow increase |
| **Cursor** | Pointer |
| **Timing** | 150ms transition |

### 29.3 Active State

| Element | Specification |
|---------|---------------|
| **Appearance** | Darker color, pressed effect |
| **Cursor** | Pointer |
| **Timing** | Instant |

### 29.4 Focus State

| Element | Specification |
|---------|---------------|
| **Appearance** | Ring outline |
| **Ring Color** | Primary 500, 50% opacity |
| **Ring Width** | 2px |
| **Offset** | 2px |

### 29.5 Disabled State

| Element | Specification |
|---------|---------------|
| **Appearance** | Grayed out, reduced opacity |
| **Opacity** | 0.6 |
| **Cursor** | Not allowed |
| **Pointer Events** | None |

### 29.6 Loading State

| Element | Specification |
|---------|---------------|
| **Appearance** | Spinner or skeleton |
| **Interaction** | Disabled |
| **Text** | "Loading..." or preserved |

### 29.7 Error State

| Element | Specification |
|---------|---------------|
| **Appearance** | Red border, error icon |
| **Message** | Error text below |
| **Background** | Light red tint |

---

## 30. Accessibility Rules

### 30.1 Color Contrast

| Text Type | Minimum Ratio |
|-----------|---------------|
| **Normal Text** | 4.5:1 |
| **Large Text** | 3:1 |
| **UI Components** | 3:1 |

### 30.2 Focus Management

| Rule | Implementation |
|------|----------------|
| **Visible Focus** | Never remove focus outline |
| **Focus Trap** | Modal focus stays inside |
| **Focus Return** | Return focus on close |
| **Skip Link** | First tab goes to main content |

### 30.3 Screen Reader Support

| Element | Implementation |
|---------|----------------|
| **Images** | Descriptive alt text |
| **Icons** | aria-label or hidden text |
| **Buttons** | Descriptive text |
| **Forms** | Associated labels |
| **Landmarks** | header, nav, main, footer |

### 30.4 Keyboard Navigation

| Key | Action |
|-----|--------|
| **Tab** | Move forward |
| **Shift+Tab** | Move backward |
| **Enter** | Activate |
| **Space** | Activate/check |
| **Escape** | Close/cancel |
| **Arrow Keys** | Navigate within component |

### 30.5 Motion

| Setting | Implementation |
|---------|----------------|
| **Reduced Motion** | Respect prefers-reduced-motion |
| **Animation** | Disable or reduce animations |
| **Transition** | Instant or very short |

---

## 31. Dark Mode Design Rules

### 31.1 Color Mapping

| Light Mode | Dark Mode |
|------------|-----------|
| White (#FFF) | Gray 900 (#111827) |
| Gray 50 (#F9FAFB) | Gray 800 (#1F2937) |
| Gray 100 (#F3F4F6) | Gray 700 (#374151) |
| Gray 200 (#E5E7EB) | Gray 600 (#4B5563) |
| Gray 900 (#111827) | White (#FFF) |

### 31.2 Dark Mode Adjustments

| Element | Light | Dark |
|---------|-------|------|
| **Background** | White | Gray 900 |
| **Surface** | Gray 50 | Gray 800 |
| **Card** | White | Gray 800 |
| **Border** | Gray 200 | Gray 700 |
| **Text Primary** | Gray 900 | White |
| **Text Secondary** | Gray 600 | Gray 400 |

### 31.3 Dark Mode Images

| Type | Treatment |
|------|-----------|
| **Photos** | Keep as-is |
| **Icons** | Use currentColor |
| **Illustrations** | Invert or use dark variant |
| **Logos** | Use dark version |

### 31.4 Dark Mode Shadows

| Light Mode | Dark Mode |
|------------|-----------|
| DEFAULT shadow | Lighter shadow, more transparent |
| md shadow | sm shadow |
| lg shadow | md shadow |

---

## 32. Design Tokens

### 32.1 Token Categories

| Category | Description |
|----------|-------------|
| **Colors** | All color values |
| **Typography** | Font families, sizes, weights |
| **Spacing** | Margin and padding values |
| **Sizing** | Width, height values |
| **Borders** | Radius, width |
| **Shadows** | Box shadow values |
| **Motion** | Duration, easing values |
| **Z-Index** | Layer values |

### 32.2 Token Naming

```
[category]-[variant]-[state]

Examples:
- color-primary-500
- color-primary-hover
- spacing-4
- border-radius-md
- shadow-lg
- duration-fast
- z-index-dropdown
```

### 32.3 Token Usage

| Usage | Token |
|-------|-------|
| **Primary button bg** | color-primary-500 |
| **Card padding** | spacing-6 |
| **Input border** | border-color-gray-300 |
| **Modal shadow** | shadow-lg |
| **Animation duration** | duration-normal |

---

## 33. Figma Component Organization

### 33.1 Page Structure

```
Rawafid Al Omran
├── Design System
│   ├── Foundations
│   │   ├── Colors
│   │   ├── Typography
│   │   ├── Spacing
│   │   ├── Borders
│   │   ├── Shadows
│   │   └── Icons
│   ├── Components
│   │   ├── Buttons
│   │   ├── Forms
│   │   ├── Cards
│   │   ├── Navigation
│   │   ├── Feedback
│   │   ├── Data Display
│   │   └── Layout
│   └── Patterns
│       ├── Forms
│       ├── Tables
│       └── Modals
├── Public Website
│   ├── Home
│   ├── About
│   ├── Services
│   ├── Projects
│   ├── Careers
│   ├── Blog
│   ├── Contact
│   └── Common
└── Dashboard
    ├── Overview
    ├── Content
    ├── Media
    ├── Settings
    └── Common
```

### 33.2 Component Structure

```
Component Name
├── Component Name
│   ├── Default
│   ├── Hover
│   ├── Active
│   ├── Focus
│   ├── Disabled
│   └── Loading
├── Component Name > Size
│   ├── Large
│   ├── Medium
│   └── Small
├── Component Name > Variant
│   ├── Primary
│   ├── Secondary
│   ├── Outline
│   └── Ghost
└── Component Name > With Icon
    ├── Left Icon
    └── Right Icon
```

---

## 34. Naming Conventions

### 34.1 CSS Classes

```
[prefix]-[component]-[variant]-[size]-[state]

Examples:
- btn-primary-lg
- btn-secondary-md
- input-error
- card-elevated
- nav-item-active
```

### 34.2 Component Names

| Component | Name |
|-----------|------|
| Button | Button |
| Primary Button | ButtonPrimary |
| Text Input | TextInput |
| Select Dropdown | Select |
| Data Table | DataTable |
| Alert Message | Alert |
| Modal Dialog | Modal |
| Navigation Menu | NavMenu |
| Sidebar | Sidebar |
| Breadcrumb | Breadcrumb |

### 34.3 Color Names

```
[color]-[shade]

Examples:
- primary-500
- gray-300
- success-light
- error-dark
```

### 34.4 Spacing Names

```
[spacing]-[value]

Examples:
- spacing-4 (16px)
- spacing-8 (32px)
- margin-x-4
- padding-y-2
```

---

## 35. UI Consistency Rules

### 35.1 Spacing Consistency

| Rule | Implementation |
|------|----------------|
| **Base Unit** | Always use multiples of 4px |
| **Component Spacing** | Use defined spacing scale |
| **Section Spacing** | Use larger spacing for sections |
| **Consistency** | Same elements should have same spacing |

### 35.2 Typography Consistency

| Rule | Implementation |
|------|----------------|
| **Font Family** | Use only defined fonts |
| **Font Sizes** | Use defined scale only |
| **Font Weights** | Use defined weights only |
| **Hierarchy** | Consistent heading levels |

### 35.3 Color Consistency

| Rule | Implementation |
|------|----------------|
| **Primary Use** | Brand elements only |
| **Semantic Use** | Status messages only |
| **Neutral Use** | Text, borders, backgrounds |
| **Consistency** | Same color for same purpose |

### 35.4 Component Consistency

| Rule | Implementation |
|------|----------------|
| **Reuse** | Use existing components |
| **Variants** | Use defined variants |
| **States** | Implement all states |
| **Patterns** | Follow established patterns |

### 35.5 Interaction Consistency

| Rule | Implementation |
|------|----------------|
| **Feedback** | All actions have feedback |
| **Timing** | Consistent animation durations |
| **Easing** | Use defined easing curves |
| **Transitions** | Smooth, professional |

---

## Appendix A: Quick Reference

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary | #1E40AF | Brand, CTAs |
| Secondary | #0F766E | Accents |
| Accent | #F59E0B | Highlights |
| Success | #059669 | Positive |
| Warning | #D97706 | Caution |
| Error | #DC2626 | Negative |
| Gray 900 | #111827 | Primary text |
| Gray 500 | #6B7280 | Muted text |

### Typography Scale

| Name | Size | Weight |
|------|------|--------|
| H1 | 48px | 700 |
| H2 | 36px | 700 |
| H3 | 30px | 600 |
| H4 | 24px | 600 |
| Body | 16px | 400 |
| Small | 14px | 400 |

### Spacing Scale

| Name | Value |
|------|-------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |

### Border Radius

| Name | Value |
|------|-------|
| sm | 2px |
| md | 4px |
| lg | 8px |
| xl | 12px |
| full | 9999px |

### Breakpoints

| Name | Width |
|------|-------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |

---

**Document Status:** Ready for Implementation  
**Next Phase:** UI Design & Development  
**Prepared By:** UI/UX Team  
**Review Date:** July 16, 2026