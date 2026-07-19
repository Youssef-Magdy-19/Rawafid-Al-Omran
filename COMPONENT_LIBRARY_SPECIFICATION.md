# Component Library Specification: Rawafid Al Omran Contracting

**Document Date:** July 16, 2026  
**Document Version:** 1.0  
**Project:** Rawafid Al Omran Contracting Corporate Website  
**Scope:** Public Website Component Library

---

## Table of Contents

1. [Layout Components](#1-layout-components)
2. [Buttons](#2-buttons)
3. [Typography](#3-typography)
4. [Cards](#4-cards)
5. [Forms](#5-forms)
6. [Navigation Components](#6-navigation-components)
7. [Feedback Components](#7-feedback-components)
8. [Overlay Components](#8-overlay-components)
9. [Content Components](#9-content-components)
10. [Utility Components](#10-utility-components)

---

## 1. Layout Components

### 1.1 Header

#### Purpose
Primary navigation header that appears at the top of every page, providing access to main navigation and key actions.

#### Description
A sticky header containing the logo, main navigation menu, language switcher, theme toggle, and CTA button.

#### Layout Structure
```
┌─────────────────────────────────────────────────────────────────────┐
│ Logo (Left) │ Navigation (Center) │ Actions (Right)                 │
│             │ Home | About | Services | Projects | Careers | Blog  │
│             │                        │ Lang │ Theme │ Request Quote │
└─────────────────────────────────────────────────────────────────────┘
```

#### Variants
| Variant | Description |
|---------|-------------|
| **Default** | Standard header with all elements |
| **Transparent** | Used on hero sections, white text |
| **Scrolled** | Adds shadow and slight background opacity |
| **Mobile** | Hamburger menu, simplified layout |

#### Sizes
| Size | Height | Usage |
|------|--------|-------|
| **Desktop** | 72px | Full navigation |
| **Mobile** | 64px | Hamburger menu |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'transparent' | 'default' | Header style variant |
| isScrolled | boolean | false | Apply scrolled state |
| isMenuOpen | boolean | false | Mobile menu state |

#### States
| State | Appearance |
|-------|------------|
| Default | White background, no shadow |
| Scrolled | White 95% background, shadow-sm |
| Menu Open (Mobile) | Full-screen overlay |

#### Spacing
| Element | Spacing |
|---------|---------|
| Container padding | 0 64px |
| Logo to nav | 48px |
| Nav items | 32px gap |
| Actions gap | 16px |

#### Animation Behavior
- Background opacity transition on scroll (200ms)
- Mobile menu slide in from right (300ms, ease-out)
- Logo subtle scale on hover (1.02, 150ms)

#### Accessibility
- Skip to main content link
- aria-label on logo
- aria-expanded on mobile menu button
- Focus trap in mobile menu

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| Tab | Navigate through nav items |
| Enter | Activate nav item |
| Escape | Close mobile menu |

#### RTL Behavior
- Logo moves to right
- Navigation moves to center
- Actions move to left
- Text alignment flips

---

### 1.2 Footer

#### Purpose
Site-wide footer providing navigation links, contact information, and legal content.

#### Description
A comprehensive footer with multiple columns, newsletter signup, and bottom bar with copyright and social links.

#### Layout Structure
```
┌─────────────────────────────────────────────────────────────────────┐
│ Column 1        │ Column 2      │ Column 3     │ Column 4           │
│ Logo            │ Services      │ Resources    │ Contact Info       │
│ About text      │ - Service 1   │ - Blog       │ Address            │
│ Social icons    │ - Service 2   │ - FAQ        │ Phone              │
│                 │ - Service 3   │ - Careers   │ Email              │
│                 │               │ - Contact    │ WhatsApp           │
├─────────────────────────────────────────────────────────────────────┤
│ Copyright © 2024 │ Privacy Policy │ Terms │ Sitemap              │
└─────────────────────────────────────────────────────────────────────┘
```

#### Variants
| Variant | Description |
|---------|-------------|
| **Default** | Standard 4-column layout |
| **Simplified** | Used on 404 and Thank You pages |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'simplified' | 'default' | Footer variant |
| showNewsletter | boolean | true | Show newsletter section |

#### States
| State | Appearance |
|-------|------------|
| Default | Gray 900 background |
| Link Hover | White text, Primary underline |

#### Spacing
| Element | Spacing |
|---------|---------|
| Top padding | 64px |
| Column gap | 48px |
| Bottom bar padding | 24px |
| Link vertical gap | 12px |

#### Animation Behavior
- Links color transition on hover (150ms)
- Social icons scale on hover (1.1, 150ms)

#### Accessibility
- Semantic footer landmark
- Links have descriptive text
- Social icons have aria-labels

#### RTL Behavior
- Column order reverses
- Text alignment flips

---

### 1.3 Navigation

#### Purpose
Main site navigation providing access to all primary pages.

#### Description
Horizontal navigation menu with dropdown support for nested pages.

#### Variants
| Variant | Description |
|---------|-------------|
| **Horizontal** | Desktop navigation |
| **Vertical** | Sidebar navigation (dashboard) |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | NavItem[] | [] | Navigation items |
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | Menu orientation |
| activeItem | string | '' | Currently active item ID |

#### States
| State | Appearance |
|-------|------------|
| Default | Gray 600 text |
| Hover | Primary 500 text |
| Active | Primary 500 text, underline |
| Focus | Ring outline |

#### Animation Behavior
- Dropdown fade in (150ms)
- Dropdown slide up 4px (150ms)

#### Accessibility
- aria-current on active item
- aria-expanded on dropdown triggers
- Keyboard navigable

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| Tab | Navigate items |
| Enter/Space | Open dropdown |
| Escape | Close dropdown |
| Arrow Down | Navigate dropdown items |

---

### 1.4 Mobile Navigation

#### Purpose
Full-screen navigation overlay for mobile devices.

#### Description
A slide-out menu that covers the entire screen with accordion-style submenus.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ X (Close)              Logo        │
├─────────────────────────────────────┤
│ Language │ Theme                   │
├─────────────────────────────────────┤
│ Home                            ▼  │
│ About Us                        ▼  │
│ Services                        ▼  │
│   - Construction                   │
│   - Engineering                    │
│   - Interior Design                │
│ Projects                        ▼  │
│ Careers                        ▼  │
│ Blog                           ▼  │
│ Contact                           │
├─────────────────────────────────────┤
│ Request Quote (Button)             │
└─────────────────────────────────────┘
```

#### States
| State | Appearance |
|-------|------------|
| Closed | Hidden, no render |
| Open | Full-screen overlay, white background |
| Submenu Open | Accordion expanded |

#### Animation Behavior
- Menu slide in from right (300ms, ease-out)
- Backdrop fade in (200ms)
- Accordion expand (200ms, ease-out)

#### Accessibility
- Focus trap when open
- aria-hidden on page content
- aria-expanded on accordion triggers

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| Escape | Close menu |
| Tab | Navigate items |
| Enter | Expand accordion |

---

### 1.5 Mega Menu

#### Purpose
Expanded navigation dropdown showing multiple columns of links and content.

#### Description
A large dropdown panel that appears on hover/click, containing categorized navigation links and optional featured content.

#### Layout Structure
```
┌─────────────────────────────────────────────────────────────────────┐
│ Column 1        │ Column 2        │ Column 3        │ Featured     │
│ Services        │ Projects        │ Company         │ [Image]      │
│ - Construction  │ - Residential   │ - About Us      │ [Title]      │
│ - Engineering  │ - Commercial    │ - Team          │ [Desc]       │
│ - Interior      │ - Industrial    │ - Careers      │ [CTA]        │
│ - Maintenance   │ - Infrastructure│ - Contact      │              │
└─────────────────────────────────────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | MegaMenuItem[] | [] | Menu items with columns |
| trigger | 'hover' \| 'click' | 'hover' | Open trigger |
| columns | number | 4 | Number of columns |

#### States
| State | Appearance |
|-------|------------|
| Closed | Hidden |
| Open | Visible, shadow-lg |
| Item Hover | Background Gray 50 |

#### Animation Behavior
- Panel fade in (150ms)
- Panel slide up 8px (150ms)
- Items stagger fade in (50ms each)

#### Accessibility
- aria-expanded on trigger
- aria-label on sections
- Keyboard navigable

---

### 1.6 Breadcrumb

#### Purpose
Navigation aid showing the user's location within the site hierarchy.

#### Description
A horizontal list of links separated by separators, showing the path from home to current page.

#### Layout Structure
```
Home > About Us > Company Overview
```

#### Variants
| Variant | Description |
|---------|-------------|
| **Default** | Standard separator (/) |
| **Chevron** | Chevron separators |
| **With Icons** | Home icon at start |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | BreadcrumbItem[] | [] | Path items |
| separator | '/' \| '>' \| 'chevron' | '/' | Separator style |
| maxItems | number | 5 | Max items before truncation |
| showHomeIcon | boolean | true | Show home icon |

#### States
| State | Appearance |
|-------|------------|
| Link | Gray 600 text |
| Link Hover | Primary 500 text |
| Current | Gray 900 text, not linked |
| Separator | Gray 400 |

#### Spacing
| Element | Spacing |
|---------|---------|
| Item gap | 8px |
| Separator margin | 8px |

#### Animation Behavior
- Truncation fade (200ms)

#### Accessibility
- nav with aria-label="Breadcrumb"
- ol element for list
- aria-current on current page

#### RTL Behavior
- Separator direction flips
- Text alignment flips

---

## 2. Buttons

### 2.1 Primary Button

#### Purpose
Main call-to-action button for primary actions.

#### Description
A solid button with primary brand color, used for the most important action on a page.

#### Layout Structure
```
┌─────────────────────────────┐
│  [Icon]  Button Text        │
└─────────────────────────────┘
```

#### Variants
| Variant | Description |
|---------|-------------|
| **Solid** | Filled background (default) |
| **With Icon Left** | Icon before text |
| **With Icon Right** | Icon after text |
| **Icon Only** | Square button with icon |

#### Sizes
| Size | Height | Padding | Font Size | Icon Size |
|------|--------|---------|-----------|-----------|
| **Large** | 48px | 12px 24px | 1.125rem | 20px |
| **Medium** | 40px | 8px 16px | 1rem | 16px |
| **Small** | 32px | 6px 12px | 0.875rem | 14px |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'solid' \| 'outline' \| 'ghost' | 'solid' | Button style |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| icon | ReactNode | null | Icon element |
| iconPosition | 'left' \| 'right' | 'left' | Icon position |
| isLoading | boolean | false | Loading state |
| isDisabled | boolean | false | Disabled state |
| fullWidth | boolean | false | 100% width |

#### States
| State | Background | Text | Border | Shadow |
|-------|------------|------|--------|--------|
| Default | Primary 500 | White | None | None |
| Hover | Primary 600 | White | None | None |
| Active | Primary 700 | White | None | None |
| Focus | Primary 500 | White | 2px ring | None |
| Disabled | Gray 300 | Gray 500 | None | None |
| Loading | Primary 500 | White | None | None |

#### Spacing
| Element | Spacing |
|---------|---------|
| Icon to text | 8px |
| Horizontal padding (lg) | 24px |
| Horizontal padding (md) | 16px |
| Horizontal padding (sm) | 12px |

#### Animation Behavior
- Background color transition (150ms)
- Scale 0.98 on active (100ms)
- Spinner rotation (1s, linear, infinite)

#### Accessibility
- aria-disabled when disabled
- aria-busy when loading
- Visible focus ring
- Descriptive text (not "click here")

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| Enter | Activate button |
| Space | Activate button |

#### RTL Behavior
- Icon position swaps (left becomes right)
- Text alignment remains

---

### 2.2 Secondary Button

#### Purpose
Secondary actions that complement primary buttons.

#### Description
A button with secondary brand color, used for less important actions.

#### States
| State | Background | Text |
|-------|------------|------|
| Default | Secondary 500 | White |
| Hover | Secondary 600 | White |
| Active | Secondary 700 | White |
| Focus | Secondary 500 | White |
| Disabled | Gray 200 | Gray 400 |

(Other properties same as Primary Button)

---

### 2.3 Outline Button

#### Purpose
Tertiary actions and secondary CTAs.

#### Description
A button with transparent background and colored border/text.

#### States
| State | Background | Text | Border |
|-------|------------|------|--------|
| Default | Transparent | Primary 500 | Primary 500 |
| Hover | Primary 50 | Primary 600 | Primary 600 |
| Active | Primary 100 | Primary 700 | Primary 700 |
| Focus | Transparent | Primary 500 | 2px ring |
| Disabled | Transparent | Gray 400 | Gray 300 |

(Other properties same as Primary Button)

---

### 2.4 Ghost Button

#### Purpose
Subtle actions within content areas.

#### Description
A button with no background or border, just text.

#### States
| State | Background | Text |
|-------|------------|------|
| Default | Transparent | Gray 700 |
| Hover | Gray 100 | Gray 900 |
| Active | Gray 200 | Gray 900 |
| Focus | Transparent | Gray 700 |
| Disabled | Transparent | Gray 400 |

(Other properties same as Primary Button)

---

### 2.5 Icon Button

#### Purpose
Actions that are represented by icons only.

#### Description
A square button containing only an icon, used for toolbar actions.

#### Variants
| Variant | Description |
|---------|-------------|
| **Square** | Equal width and height |
| **Circle** | Fully rounded |
| **Pill** | Rounded ends |

#### Sizes
| Size | Dimension | Icon Size |
|------|-----------|-----------|
| **Large** | 48px | 24px |
| **Medium** | 40px | 20px |
| **Small** | 32px | 16px |

#### States
| State | Background | Icon Color |
|-------|------------|------------|
| Default | Transparent | Gray 500 |
| Hover | Gray 100 | Gray 700 |
| Active | Gray 200 | Gray 900 |
| Focus | Transparent | Gray 500 |
| Disabled | Transparent | Gray 300 |

#### Animation Behavior
- Background fade in (150ms)
- Icon scale 1.1 on hover (150ms)

#### Accessibility
- aria-label required (descriptive)
- Tooltip on hover/focus

---

### 2.6 Button Group

#### Purpose
Group related buttons together.

#### Description
A container for multiple buttons with consistent spacing and optional dividers.

#### Layout Structure
```
┌──────────┬──────────┬──────────┐
│ Button 1 │ Button 2 │ Button 3 │
└──────────┴──────────┴──────────┘
```

#### Variants
| Variant | Description |
|---------|-------------|
| **Horizontal** | Buttons side by side |
| **Vertical** | Buttons stacked |
| **Connected** | Buttons share borders |
| **Equal Width** | All buttons same width |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | Group orientation |
| variant | 'connected' \| 'separated' | 'separated' | Button connection |
| equalWidth | boolean | false | Equal button widths |

#### Spacing
| Element | Spacing |
|---------|---------|
| Button gap (horizontal) | 0 (connected) or 12px |
| Button gap (vertical) | 0 (connected) or 8px |

#### Animation Behavior
- Connected buttons share hover state

---

## 3. Typography

### 3.1 Section Header

#### Purpose
Title and optional subtitle for page sections.

#### Description
A component for section-level headings with consistent styling and optional elements.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ Eyebrow (optional)                  │
│ Heading                             │
│ Subtitle (optional)                 │
│ [Alignment]                         │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| eyebrow | string | null | Small label above heading |
| title | string | '' | Main heading text |
| subtitle | string | null | Supporting text |
| as | 'h1' \| 'h2' \| 'h3' \| 'h4' | 'h2' | Heading element |
| align | 'left' \| 'center' \| 'right' | 'center' | Text alignment |
| hasMargin | boolean | true | Bottom margin |

#### Spacing
| Element | Spacing |
|---------|---------|
| Eyebrow to title | 8px |
| Title to subtitle | 12px |
| Bottom margin | 48px |

#### Animation Behavior
- Fade in on scroll (300ms)

#### Accessibility
- Proper heading hierarchy
- Semantic heading element

---

### 3.2 Page Header

#### Purpose
Hero section header for interior pages.

#### Description
A large header with background image/gradient, title, and optional breadcrumb.

#### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│ [Background Image/Gradient]                                  │
│                                                             │
│ Breadcrumb                                                 │
│ Page Title (H1)                                             │
│ Subtitle (optional)                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | '' | Page title |
| subtitle | string | null | Page subtitle |
| breadcrumb | BreadcrumbItem[] | [] | Navigation path |
| background | 'image' \| 'gradient' \| 'solid' | 'gradient' | Background type |
| height | 'sm' \| 'md' \| 'lg' | 'md' | Header height |

#### Sizes
| Size | Height | Title Size |
|------|--------|------------|
| **Small** | 30vh (min 250px, max 350px) | 2.25rem |
| **Medium** | 40vh (min 350px, max 500px) | 3rem |
| **Large** | 50vh (min 400px, max 600px) | 3.75rem |

#### Spacing
| Element | Spacing |
|---------|---------|
| Content padding | 64px |
| Breadcrumb to title | 16px |
| Title to subtitle | 12px |

#### Animation Behavior
- Content fade in (400ms)

#### Accessibility
- H1 for page title
- Breadcrumb navigation

---

### 3.3 Headings

#### Purpose
Semantic headings for content hierarchy.

#### Description
Pre-styled heading components (H1-H6) following the design system typography scale.

#### Scale
| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| H1 | 3rem (48px) | 700 | 1.2 | -0.02em |
| H2 | 2.25rem (36px) | 700 | 1.25 | -0.01em |
| H3 | 1.875rem (30px) | 600 | 1.3 | 0 |
| H4 | 1.5rem (24px) | 600 | 1.35 | 0 |
| H5 | 1.25rem (20px) | 600 | 1.4 | 0 |
| H6 | 1rem (16px) | 600 | 1.5 | 0 |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| as | 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' | 'h2' | Heading element |
| children | ReactNode | null | Heading content |
| color | string | null | Custom color |
| align | 'left' \| 'center' \| 'right' | 'left' | Text alignment |

#### Accessibility
- Semantic heading elements
- Logical hierarchy (no skipped levels)

---

### 3.4 Paragraph

#### Purpose
Body text content.

#### Description
Standard paragraph styling with configurable variants.

#### Variants
| Variant | Size | Line Height | Usage |
|---------|------|-------------|-------|
| **Large** | 1.125rem (18px) | 1.625 | Lead paragraphs |
| **Default** | 1rem (16px) | 1.5 | Standard body |
| **Small** | 0.875rem (14px) | 1.5 | Secondary text |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'lg' \| 'default' \| 'sm' | 'default' | Text variant |
| color | 'primary' \| 'secondary' \| 'muted' | 'primary' | Text color |
| children | ReactNode | null | Paragraph content |

#### Spacing
| Element | Spacing |
|---------|---------|
| Paragraph margin | 16px |
| Last paragraph | 0 |

---

### 3.5 Caption

#### Purpose
Small supporting text for labels and metadata.

#### Description
Small text used for timestamps, labels, and secondary information.

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | null | Caption content |
| color | 'default' \| 'muted' \| 'error' | 'default' | Text color |
| as | 'span' \| 'p' \| 'small' | 'span' | Element type |

#### Typography
| Property | Value |
|----------|-------|
| Font Size | 0.75rem (12px) |
| Font Weight | 400 |
| Line Height | 1.5 |

---

### 3.6 Eyebrow Label

#### Purpose
Small uppercase label above headings.

#### Description
A decorative label that appears above section titles to provide context.

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | null | Label content |
| color | string | 'Primary 500' | Label color |

#### Typography
| Property | Value |
|----------|-------|
| Font Size | 0.75rem (12px) |
| Font Weight | 600 |
| Letter Spacing | 0.1em |
| Text Transform | uppercase |

---

## 4. Cards

### 4.1 Service Card

#### Purpose
Display a service with icon, title, and excerpt.

#### Description
A card component for showcasing services in grids.

#### Layout Structure
```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐    │
│  │         Icon (64px)         │    │
│  └─────────────────────────────┘    │
│                                     │
│  Service Title (H3)                 │
│                                     │
│  Brief description of the service  │
│  spanning two to three lines...     │
│                                     │
│  Learn More →                       │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | ReactNode | null | Service icon |
| title | string | '' | Service title |
| excerpt | string | '' | Brief description |
| href | string | '#' | Link destination |
| variant | 'default' \| 'elevated' \| 'outlined' | 'default' | Card style |

#### States
| State | Appearance |
|-------|------------|
| Default | White bg, shadow DEFAULT, border Gray 200 |
| Hover | Shadow md, translateY(-4px) |
| Focus | Ring outline |

#### Spacing
| Element | Spacing |
|---------|---------|
| Card padding | 24px |
| Icon to title | 16px |
| Title to excerpt | 12px |
| Excerpt to link | 16px |

#### Animation Behavior
- Card lift on hover (200ms, ease-out)
- Icon scale 1.1 on hover (200ms)
- Link color transition (150ms)

#### Accessibility
- Link wraps entire card
- Icon has aria-hidden

---

### 4.2 Project Card

#### Purpose
Display a project with image and overlay.

#### Description
An image-focused card for showcasing portfolio projects.

#### Layout Structure
```
┌─────────────────────────────────────┐
│                                     │
│         [Project Image]             │
│         (16:10 ratio)               │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ [Overlay on hover]          │   │
│  │ Project Title               │   │
│  │ Category Badge              │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Status Badge below image]         │
│                                     │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| image | string | '' | Project image URL |
| title | string | '' | Project title |
| category | string | '' | Project category |
| status | 'completed' \| 'in-progress' \| 'upcoming' | null | Project status |
| href | string | '#' | Link destination |

#### States
| State | Appearance |
|-------|------------|
| Default | Image visible, no overlay |
| Hover | Overlay slides up, image scales 1.05 |
| Focus | Ring outline |

#### Spacing
| Element | Spacing |
|---------|---------|
| Image | Full width |
| Content padding | 16px |
| Badge gap | 8px |

#### Animation Behavior
- Image scale on hover (300ms)
- Overlay slide up (200ms)
- Content fade in (150ms)

#### Accessibility
- Image has descriptive alt text
- Link wraps card

---

### 4.3 Blog Card

#### Purpose
Display a blog post preview.

#### Description
A card for blog listings with image, category, title, and metadata.

#### Layout Structure
```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │      [Featured Image]       │   │
│  │        (16:9 ratio)         │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Category Badge]                    │
│                                     │
│  Blog Post Title                    │
│                                     │
│  Excerpt of the blog post...        │
│                                     │
│  [Avatar] Author Name • Jan 15, 2024 │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| image | string | '' | Post image URL |
| category | string | '' | Post category |
| title | string | '' | Post title |
| excerpt | string | '' | Post excerpt |
| author | { name: string; avatar: string } | null | Author info |
| date | string | '' | Publication date |
| href | string | '#' | Link destination |
| variant | 'default' \| 'featured' | 'default' | Card variant |

#### Spacing
| Element | Spacing |
|---------|---------|
| Image | Full width |
| Category to title | 12px |
| Title to excerpt | 12px |
| Excerpt to meta | 16px |
| Meta items gap | 8px |

#### Animation Behavior
- Image zoom on hover (300ms)
- Title color change (150ms)

---

### 4.4 Team Card

#### Purpose
Display a team member profile.

#### Description
A card showing team member photo, name, title, and social links.

#### Layout Structure
```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │      [Team Member Photo]    │   │
│  │         (1:1 ratio)         │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  Member Name (H4)                   │
│  Job Title                          │
│                                     │
│  [LinkedIn] [Twitter] [Email]       │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| photo | string | '' | Member photo URL |
| name | string | '' | Member name |
| title | string | '' | Job title |
| social | { linkedin?: string; twitter?: string; email?: string } | {} | Social links |

#### States
| State | Appearance |
|-------|------------|
| Default | Photo normal, social icons hidden |
| Hover | Photo scales 1.05, social icons fade in |

#### Animation Behavior
- Photo scale on hover (200ms)
- Social icons fade in on hover (150ms)

---

### 4.5 Testimonial Card

#### Purpose
Display client testimonials.

#### Description
A card with quote, client info, and rating.

#### Layout Structure
```
┌─────────────────────────────────────┐
│  "                                    │
│  The testimonial quote text goes     │
│  here, spanning multiple lines       │
│  to showcase the client's feedback   │
│  about the service provided.         │
│                                   "   │
│                                     │
│  ┌────┐                             │
│  │    │ Client Name                 │
│  │ AV │ Company Name                │
│  │    │ ★★★★★                       │
│  └────┘                             │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| quote | string | '' | Testimonial text |
| author | { name: string; company: string; avatar: string } | null | Author info |
| rating | number | 5 | Star rating (1-5) |
| date | string | null | Testimonial date |

#### Spacing
| Element | Spacing |
|---------|---------|
| Quote padding | 24px |
| Quote to author | 24px |
| Avatar to text | 12px |

#### Animation Behavior
- Quote marks animate on hover (scale 1.2)

---

### 4.6 Partner Card

#### Purpose
Display partner logos.

#### Description
A card showing a partner's logo with optional link.

#### Layout Structure
```
┌─────────────────────────────────────┐
│                                     │
│         [Partner Logo]              │
│         (150px width)               │
│                                     │
│         Partner Name                │
│                                     │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| logo | string | '' | Partner logo URL |
| name | string | '' | Partner name |
| website | string | null | Partner website URL |

#### States
| State | Appearance |
|-------|------------|
| Default | Grayscale logo |
| Hover | Full color logo |

#### Animation Behavior
- Grayscale to color transition (200ms)

---

### 4.7 Stat Card

#### Purpose
Display a single statistic with icon.

#### Description
A card showing a number, label, and optional change indicator.

#### Layout Structure
```
┌─────────────────────────────────────┐
│  [Icon]                    [Trend]  │
│                                     │
│  500+                               │
│  Projects Completed                 │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string \| number | '' | Statistic value |
| label | string | '' | Statistic label |
| icon | ReactNode | null | Statistic icon |
| change | { value: number; direction: 'up' \| 'down' } | null | Change indicator |
| prefix | string | '' | Value prefix |
| suffix | string | '' | Value suffix |

#### Animation Behavior
- Number count-up animation (1.5s, ease-out)
- Triggers on scroll into view

---

### 4.8 Feature Card

#### Purpose
Display a feature with icon, title, and description.

#### Description
A card for showcasing features or benefits.

#### Layout Structure
```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐   │
│  │         Icon (48px)          │   │
│  └─────────────────────────────┘   │
│                                     │
│  Feature Title (H4)                │
│                                     │
│  Description text explaining this   │
│  feature in more detail.            │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | ReactNode | null | Feature icon |
| title | string | '' | Feature title |
| description | string | '' | Feature description |
| variant | 'default' \| 'light' | 'default' | Card variant |

#### States
| State | Appearance |
|-------|------------|
| Default | White background |
| Hover | Icon color changes to Primary |

---

### 4.9 CTA Card

#### Purpose
Call-to-action section in card format.

#### Description
A card with background, headline, description, and CTA button.

#### Layout Structure
```
┌─────────────────────────────────────┐
│  [Background Color/Image]            │
│                                     │
│  Headline Text                      │
│                                     │
│  Supporting description text that   │
│  explains the offer.                │
│                                     │
│  [Primary Button]                   │
│                                     │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| headline | string | '' | CTA headline |
| description | string | '' | CTA description |
| buttonText | string | '' | Button text |
| buttonHref | string | '#' | Button link |
| background | 'primary' \| 'secondary' \| 'image' | 'primary' | Background type |
| image | string | null | Background image URL |

#### Spacing
| Element | Spacing |
|---------|---------|
| Card padding | 48px |
| Headline to description | 16px |
| Description to button | 24px |

---

## 5. Forms

### 5.1 Input

#### Purpose
Single-line text input field.

#### Description
A form input for collecting single-line text data.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ Label (optional)                     │
│ ┌─────────────────────────────────┐ │
│ │ [Icon] Input Value    [Icon]   │ │
│ └─────────────────────────────────┘ │
│ Helper text (optional)               │
│ Error message (optional)              │
└─────────────────────────────────────┘
```

#### Variants
| Variant | Description |
|---------|-------------|
| **Default** | Standard input |
| **With Icon Left** | Icon before input |
| **With Icon Right** | Icon after input |
| **With Clear Button** | X button when has value |

#### Sizes
| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| **Large** | 48px | 14px 16px | 1rem |
| **Medium** | 40px | 10px 14px | 0.875rem |
| **Small** | 32px | 6px 10px | 0.75rem |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | 'text' \| 'email' \| 'password' \| 'tel' \| 'number' | 'text' | Input type |
| value | string | '' | Input value |
| placeholder | string | '' | Placeholder text |
| label | string | null | Field label |
| helperText | string | null | Helper text |
| error | string | null | Error message |
| icon | ReactNode | null | Left icon |
| rightIcon | ReactNode | null | Right icon |
| showClear | boolean | false | Show clear button |
| isDisabled | boolean | false | Disabled state |
| isRequired | boolean | false | Required field |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Input size |

#### States
| State | Background | Border | Text | Icon |
|-------|------------|--------|------|------|
| Default | White | Gray 300 | Gray 900 | Gray 400 |
| Hover | White | Gray 400 | Gray 900 | Gray 500 |
| Focus | White | Primary 500 | Gray 900 | Primary 500 |
| Error | White | Error | Gray 900 | Error |
| Success | White | Success | Gray 900 | Success |
| Disabled | Gray 100 | Gray 200 | Gray 400 | Gray 400 |

#### Spacing
| Element | Spacing |
|---------|---------|
| Label to input | 6px |
| Input to helper | 6px |
| Input to error | 4px |

#### Animation Behavior
- Border color transition (150ms)
- Ring fade in on focus (150ms)

#### Accessibility
- label with htmlFor attribute
- aria-describedby for helper/error
- aria-invalid for error state
- aria-required for required fields

#### Validation Rules
| Rule | Error Message |
|------|---------------|
| Required | "This field is required" |
| Email format | "Please enter a valid email" |
| Min length | "Must be at least X characters" |
| Max length | "Must be no more than X characters" |

---

### 5.2 Textarea

#### Purpose
Multi-line text input field.

#### Description
A form input for collecting multi-line text data.

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | '' | Input value |
| placeholder | string | '' | Placeholder text |
| label | string | null | Field label |
| helperText | string | null | Helper text |
| error | string | null | Error message |
| rows | number | 4 | Minimum rows |
| maxLength | number | null | Maximum characters |
| showCount | boolean | false | Show character count |
| isDisabled | boolean | false | Disabled state |
| isRequired | boolean | false | Required field |

#### Dimensions
| Property | Value |
|----------|-------|
| Min Height | 120px |
| Max Height | 400px |
| Resize | Vertical only |

#### States
(Same as Input component)

---

### 5.3 Select

#### Purpose
Dropdown selection field.

#### Description
A form field for selecting one option from a list.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ Label (optional)                     │
│ ┌─────────────────────────────────┐ │
│ │ Selected Value            [▼]  │ │
│ └─────────────────────────────────┘ │
│ Helper text (optional)               │
│ Error message (optional)              │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| options | { value: string; label: string }[] | [] | Dropdown options |
| value | string | '' | Selected value |
| placeholder | string | 'Select an option' | Placeholder text |
| label | string | null | Field label |
| helperText | string | null | Helper text |
| error | string | null | Error message |
| isDisabled | boolean | false | Disabled state |
| isRequired | boolean | false | Required field |
| isSearchable | boolean | false | Enable search |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Select size |

#### States
| State | Background | Border | Icon |
|-------|------------|--------|------|
| Default | White | Gray 300 | Gray 400 |
| Hover | White | Gray 400 | Gray 500 |
| Focus | White | Primary 500 | Primary 500 |
| Open | White | Primary 500 | Primary 500 |
| Disabled | Gray 100 | Gray 200 | Gray 300 |

#### Animation Behavior
- Dropdown fade in (150ms)
- Options stagger in (50ms each)

#### Accessibility
- role="combobox"
- aria-expanded on trigger
- aria-selected on options
- Keyboard navigation

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| Tab | Focus select |
| Enter/Space | Open dropdown |
| Arrow Up/Down | Navigate options |
| Enter | Select option |
| Escape | Close dropdown |

---

### 5.4 Multi Select

#### Purpose
Dropdown selection field allowing multiple selections.

#### Description
A form field for selecting multiple options from a list.

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| options | { value: string; label: string }[] | [] | Dropdown options |
| value | string[] | [] | Selected values |
| placeholder | string | 'Select options' | Placeholder text |
| label | string | null | Field label |
| helperText | string | null | Helper text |
| error | string | null | Error message |
| maxSelections | number | null | Maximum selections |
| isDisabled | boolean | false | Disabled state |
| isRequired | boolean | false | Required field |

#### Layout Structure
```
┌─────────────────────────────────────┐
│ Label (optional)                     │
│ ┌─────────────────────────────────┐ │
│ │ [Tag 1] ×  [Tag 2] ×    [▼]    │ │
│ └─────────────────────────────────┘ │
│ Helper text (optional)               │
│ Error message (optional)              │
└─────────────────────────────────────┘
```

#### States
(Same as Select component)

---

### 5.5 Checkbox

#### Purpose
Binary selection control.

#### Description
A form control for toggling a single option on or off.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ ┌───┐                               │
│ │ ✓ │  Checkbox Label               │
│ └───┘                               │
│     Helper text (optional)            │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | boolean | false | Checked state |
| label | string | '' | Checkbox label |
| helperText | string | null | Helper text |
| error | string | null | Error message |
| isDisabled | boolean | false | Disabled state |
| isIndeterminate | boolean | false | Indeterminate state |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Checkbox size |

#### Sizes
| Size | Box Size | Font Size |
|------|----------|-----------|
| **Small** | 16px | 0.75rem |
| **Medium** | 20px | 0.875rem |
| **Large** | 24px | 1rem |

#### States
| State | Box | Check | Border |
|-------|-----|-------|--------|
| Unchecked | White | None | Gray 300 |
| Unchecked Hover | Gray 50 | None | Gray 400 |
| Checked | Primary 500 | White | Primary 500 |
| Checked Hover | Primary 600 | White | Primary 600 |
| Indeterminate | Primary 500 | White dash | Primary 500 |
| Disabled | Gray 100 | Gray 400 | Gray 200 |
| Error | White | None | Error |

#### Animation Behavior
- Check mark draw animation (200ms)
- Scale bounce on check (150ms)

#### Accessibility
- role="checkbox"
- aria-checked
- Keyboard focusable

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| Space | Toggle checkbox |

---

### 5.6 Radio

#### Purpose
Single selection from multiple options.

#### Description
A form control for selecting one option from a group.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ ○  Radio Option 1                   │
│ ●  Radio Option 2 (selected)        │
│ ○  Radio Option 3                   │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| options | { value: string; label: string }[] | [] | Radio options |
| value | string | '' | Selected value |
| name | string | '' | Group name |
| label | string | null | Group label |
| error | string | null | Error message |
| isDisabled | boolean | false | Disabled state |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Radio size |

#### States
| State | Outer | Inner | Border |
|-------|-------|-------|--------|
| Unselected | White | None | Gray 300 |
| Unselected Hover | White | Gray 200 | Gray 400 |
| Selected | White | Primary 500 | Primary 500 |
| Selected Hover | White | Primary 600 | Primary 600 |
| Disabled | Gray 100 | Gray 300 | Gray 200 |

#### Animation Behavior
- Inner dot scale in (150ms)

#### Accessibility
- role="radiogroup"
- aria-checked on options
- Keyboard navigable

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| Arrow Up/Left | Previous option |
| Arrow Down/Right | Next option |
| Enter/Space | Select option |

---

### 5.7 Switch

#### Purpose
Toggle control for boolean settings.

#### Description
A toggle switch for turning a setting on or off.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ Switch Label                       │
│                              [●━━] │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | boolean | false | Switch state |
| label | string | '' | Switch label |
| helperText | string | null | Helper text |
| error | string | null | Error message |
| isDisabled | boolean | false | Disabled state |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Switch size |

#### Sizes
| Size | Track Size | Thumb Size |
|------|------------|------------|
| **Small** | 32px × 18px | 14px |
| **Medium** | 44px × 24px | 20px |
| **Large** | 56px × 30px | 26px |

#### States
| State | Track | Thumb |
|-------|-------|-------|
| Off | Gray 200 | White |
| Off Hover | Gray 300 | White |
| On | Primary 500 | White |
| On Hover | Primary 600 | White |
| Disabled Off | Gray 100 | Gray 200 |
| Disabled On | Gray 300 | White |

#### Animation Behavior
- Thumb slide (200ms, ease-out)
- Track color change (200ms)

#### Accessibility
- role="switch"
- aria-checked
- Keyboard focusable

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| Space | Toggle switch |

---

### 5.8 File Upload

#### Purpose
Upload files to the server.

#### Description
A form component for selecting and uploading files.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │    [Upload Icon]                │ │
│ │    Drag & drop files here       │ │
│ │    or click to browse           │ │
│ │                                 │ │
│ │    [Browse Files]              │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Accepted: JPG, PNG, PDF (max 10MB)   │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| accept | string | '' | Accepted file types |
| maxSize | number | 10485760 | Max file size (bytes) |
| maxFiles | number | 1 | Max number of files |
| label | string | null | Field label |
| helperText | string | null | Helper text |
| error | string | null | Error message |
| isDisabled | boolean | false | Disabled state |
| isMultiple | boolean | false | Allow multiple files |

#### States
| State | Border | Background | Icon |
|-------|--------|------------|------|
| Default | Dashed Gray 300 | Gray 50 | Gray 400 |
| Hover | Dashed Primary 400 | Primary 50 | Primary 500 |
| Drag Over | Solid Primary 500 | Primary 50 | Primary 500 |
| Uploading | Solid Gray 300 | Gray 50 | Gray 400 |
| Error | Dashed Error | Error 50 | Error |

#### Animation Behavior
- Border color on hover (150ms)
- Pulse animation during upload

#### Accessibility
- role="button"
- aria-describedby for instructions
- Keyboard accessible

#### Validation Rules
| Rule | Error Message |
|------|---------------|
| File type | "File type not supported" |
| File size | "File exceeds maximum size" |
| Max files | "Maximum X files allowed" |

---

### 5.9 Search Input

#### Purpose
Search input with built-in search functionality.

#### Description
An input field designed for search with icon and clear button.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │ [🔍] Search...            [×]  │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | '' | Input value |
| placeholder | string | 'Search...' | Placeholder text |
| onChange | function | null | Change handler |
| onSearch | function | null | Search submit handler |
| onClear | function | null | Clear handler |
| isLoading | boolean | false | Loading state |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Input size |

#### States
| State | Appearance |
|-------|------------|
| Default | Standard input |
| Loading | Spinner replaces search icon |
| Has Value | Clear button visible |

#### Animation Behavior
- Clear button fade in (150ms)
- Spinner rotation (1s, linear, infinite)

---

### 5.10 Newsletter Form

#### Purpose
Email subscription form.

#### Description
A compact form for newsletter subscriptions.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ Stay updated with our newsletter    │
│ ┌───────────────────────┬─────────┐ │
│ │ Enter your email      │ Subscribe│ │
│ └───────────────────────┴─────────┘ │
│                                     │
│ We respect your privacy.            │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | '' | Form title |
| description | string | null | Form description |
| buttonText | string | 'Subscribe' | Button text |
| placeholder | string | 'Enter your email' | Input placeholder |
| isLoading | boolean | false | Loading state |
| showPrivacyNote | boolean | true | Show privacy note |

#### States
| State | Appearance |
|-------|------------|
| Default | Standard form |
| Loading | Button shows spinner |
| Success | Shows success message |
| Error | Shows error message |

#### Animation Behavior
- Success: Form transforms to checkmark (300ms)

#### Accessibility
- Proper form labels
- Error announcements

---

### 5.11 Contact Form

#### Purpose
General contact form for inquiries.

#### Description
A comprehensive form for collecting contact information and messages.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ Name *                              │
│ [Input]                             │
│                                     │
│ Email *                              │
│ [Input]                             │
│                                     │
│ Phone                               │
│ [Input]                             │
│                                     │
│ Subject *                           │
│ [Select]                            │
│                                     │
│ Message *                           │
│ [Textarea]                          │
│                                     │
│ [Send Message]                      │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| fields | FormField[] | default fields | Form fields |
| submitText | string | 'Send Message' | Submit button text |
| isLoading | boolean | false | Loading state |
| onSubmit | function | null | Submit handler |

#### Default Fields
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | text | Yes | Min 2 chars |
| Email | email | Yes | Valid email |
| Phone | tel | No | Valid phone |
| Subject | select | Yes | - |
| Message | textarea | Yes | Min 10 chars |

#### States
| State | Appearance |
|-------|------------|
| Default | Standard form |
| Submitting | All fields disabled, button loading |
| Success | Success message, form reset |
| Error | Error message |

---

### 5.12 Quote Form

#### Purpose
Multi-step form for quote requests.

#### Description
A wizard-style form with progress indicator for collecting quote request details.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ ● ─── ○ ─── ○ ─── ○                 │
│ Step 1   Step 2  Step 3  Step 4     │
├─────────────────────────────────────┤
│                                     │
│ Step Title                          │
│                                     │
│ [Step Content]                      │
│                                     │
│ [Back]              [Next/Submit]   │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| steps | FormStep[] | [] | Form steps |
| initialStep | number | 0 | Starting step |
| onComplete | function | null | Completion handler |

#### Steps
| Step | Title | Fields |
|------|-------|--------|
| 1 | Service Selection | Service type, Subservice |
| 2 | Personal Info | Name, Email, Phone, Company |
| 3 | Project Details | Type, Budget, Timeline, Location, Description, Attachments |
| 4 | Agreement | Terms checkbox, Privacy link |

#### States
| State | Appearance |
|-------|------------|
| Step Incomplete | Gray circle |
| Step Active | Primary circle, filled |
| Step Complete | Primary circle, checkmark |
| Step Error | Error circle |

#### Animation Behavior
- Step transition slide (300ms)
- Progress bar fill (300ms)

#### Accessibility
- aria-current on active step
- Step announcements
- Keyboard navigation between steps

---

## 6. Navigation Components

### 6.1 Tabs

#### Purpose
Organize content into selectable panels.

#### Description
A tabbed interface for switching between related content sections.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ [Tab 1] [Tab 2] [Tab 3] [Tab 4]     │
├─────────────────────────────────────┤
│                                     │
│ Tab Content Panel                   │
│                                     │
└─────────────────────────────────────┘
```

#### Variants
| Variant | Description |
|---------|-------------|
| **Underline** | Bottom border indicator |
| **Pill** | Rounded background indicator |
| **Box** | Full background indicator |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| tabs | { id: string; label: string; icon?: ReactNode }[] | [] | Tab items |
| activeTab | string | '' | Active tab ID |
| onChange | function | null | Tab change handler |
| variant | 'underline' \| 'pill' \| 'box' | 'underline' | Tab style |
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | Tab orientation |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Tab size |

#### States
| State | Text | Indicator |
|-------|------|-----------|
| Default | Gray 500 | None |
| Hover | Gray 700 | Faint |
| Active | Primary 500 | Full |
| Disabled | Gray 400 | None |

#### Spacing
| Element | Spacing |
|---------|---------|
| Tab padding (lg) | 16px 24px |
| Tab padding (md) | 12px 16px |
| Tab padding (sm) | 8px 12px |
| Tab gap | 0 (connected) or 8px |

#### Animation Behavior
- Indicator slide (200ms, ease-out)
- Content fade (200ms)

#### Accessibility
- role="tablist"
- role="tab" on tabs
- role="tabpanel" on content
- aria-selected
- Keyboard navigation

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| Tab | Move to tab list |
| Arrow Left/Right | Navigate tabs |
| Enter/Space | Select tab |
| Home | First tab |
| End | Last tab |

---

### 6.2 Chips

#### Purpose
Compact elements for filters and selections.

#### Description
Small interactive elements for showing selected filters or tags.

#### Layout Structure
```
┌─────────────────────┐
│ ×  Chip Label        │
└─────────────────────┘
```

#### Variants
| Variant | Description |
|---------|-------------|
| **Filter** | With optional remove button |
| **Tag** | Static, no remove |
| **Category** | With icon |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | '' | Chip label |
| variant | 'filter' \| 'tag' \| 'category' | 'filter' | Chip style |
| icon | ReactNode | null | Chip icon |
| isSelected | boolean | false | Selected state |
| isDisabled | boolean | false | Disabled state |
| onRemove | function | null | Remove handler |
| onClick | function | null | Click handler |

#### States
| State | Background | Text | Border |
|-------|------------|------|--------|
| Default | Gray 100 | Gray 700 | None |
| Hover | Gray 200 | Gray 900 | None |
| Selected | Primary 100 | Primary 700 | None |
| Selected Hover | Primary 200 | Primary 800 | None |
| Disabled | Gray 100 | Gray 400 | None |

#### Animation Behavior
- Background color transition (150ms)
- Remove animation (scale out, 150ms)

#### Accessibility
- role="option" in listbox
- aria-selected
- Keyboard focusable

---

### 6.3 Pagination

#### Purpose
Navigate through paginated content.

#### Description
A component for navigating between pages of content.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ Showing 1-10 of 156    [1] [2] [3] │
│                       [•••] [16]    │
│                       [‹] [›]       │
└─────────────────────────────────────┘
```

#### Variants
| Variant | Description |
|---------|-------------|
| **Simple** | Prev, page numbers, next |
| **Complex** | First, prev, numbers, next, last |
| **Compact** | "Page X of Y" with input |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| currentPage | number | 1 | Current page |
| totalPages | number | 1 | Total pages |
| perPage | number | 10 | Items per page |
| totalItems | number | 0 | Total items |
| variant | 'simple' \| 'complex' \| 'compact' | 'complex' | Pagination style |
| onPageChange | function | null | Page change handler |
| showInfo | boolean | true | Show items info |

#### States
| State | Appearance |
|-------|------------|
| Page Default | White bg, Gray 700 text |
| Page Current | Primary 500 bg, White text |
| Page Hover | Gray 50 bg |
| Page Disabled | Gray 200 bg, Gray 400 text |

#### Spacing
| Element | Spacing |
|---------|---------|
| Page button size | 40px |
| Button gap | 4px |
| Info margin | 16px |

#### Animation Behavior
- Page transition fade (200ms)

#### Accessibility
- aria-label on nav
- aria-current="page" on current
- Keyboard navigable

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| Arrow Left | Previous page |
| Arrow Right | Next page |

---

### 6.4 Filter Bar

#### Purpose
Horizontal bar for filtering content.

#### Description
A bar containing filter controls for content pages.

#### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│ [Filter 1] [Filter 2] [Filter 3] ...    [Search] [Sort ▼]  │
└─────────────────────────────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| filters | FilterItem[] | [] | Filter options |
| activeFilters | string[] | [] | Active filter values |
| onFilterChange | function | null | Filter change handler |
| searchPlaceholder | string | 'Search...' | Search placeholder |
| sortOptions | SortOption[] | [] | Sort dropdown options |
| activeSort | string | '' | Active sort value |

#### Filter Item
| Property | Type | Description |
|----------|------|-------------|
| id | string | Filter ID |
| label | string | Filter label |
| type | 'button' \| 'dropdown' | Filter type |
| options | { value: string; label: string }[] | Options (for dropdown) |

#### States
| State | Appearance |
|-------|------------|
| Filter Default | Gray 600 text |
| Filter Active | Primary 500 text, underline |
| Search Default | Gray 300 border |
| Search Focus | Primary 500 border |

#### Spacing
| Element | Spacing |
|---------|---------|
| Filter gap | 8px |
| Search margin | 16px |
| Sort margin | 16px |

#### Animation Behavior
- Filter transition (150ms)
- Dropdown fade in (150ms)

#### Accessibility
- Filter buttons have aria-pressed
- Search has aria-label

---

## 7. Feedback Components

### 7.1 Toast

#### Purpose
Temporary notification messages.

#### Description
A small notification that appears briefly to provide feedback.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ [Icon]  Title                       │
│         Description text            │
│                            [×]      │
└─────────────────────────────────────┘
```

#### Variants
| Variant | Icon | Border Color |
|---------|------|--------------|
| **Success** | Check circle | Success |
| **Error** | X circle | Error |
| **Warning** | Alert triangle | Warning |
| **Info** | Info | Info |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'success' \| 'error' \| 'warning' \| 'info' | 'info' | Toast variant |
| title | string | '' | Toast title |
| message | string | '' | Toast message |
| action | { label: string; onClick: function } | null | Action button |
| duration | number | 5000 | Auto dismiss duration (ms) |
| isDismissible | boolean | true | Show close button |

#### Dimensions
| Property | Value |
|----------|-------|
| Width | 360px (max) |
| Padding | 16px |
| Border Radius | lg (8px) |
| Icon Size | 20px |

#### States
| State | Appearance |
|-------|------------|
| Entering | Slide in from right |
| Visible | Static |
| Exiting | Slide out to right |

#### Animation Behavior
- Slide in from right (300ms, ease-out)
- Slide out to right (200ms, ease-in)
- Progress bar countdown (duration)

#### Placement
| Position | Value |
|----------|-------|
| Top | 24px |
| Right | 24px |
| Stack Gap | 8px |
| Max Visible | 3 |

#### Accessibility
- role="alert"
- aria-live="polite"
- Focus trap not needed (non-modal)

---

### 7.2 Alert

#### Purpose
Inline feedback messages.

#### Description
A message component for displaying important information within content.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ [Icon]  Title                       │
│         Description text here       │
│                            [Action] │
└─────────────────────────────────────┘
```

#### Variants
| Variant | Icon | Background | Border |
|---------|------|------------|--------|
| **Info** | Info | Info Light | Left 4px Info |
| **Success** | Check | Success Light | Left 4px Success |
| **Warning** | Warning | Warning Light | Left 4px Warning |
| **Error** | Error | Error Light | Left 4px Error |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'info' \| 'success' \| 'warning' \| 'error' | 'info' | Alert variant |
| title | string | null | Alert title |
| children | ReactNode | null | Alert content |
| action | { label: string; onClick: function } | null | Action link |
| isDismissible | boolean | false | Show close button |
| icon | ReactNode | null | Custom icon |

#### Spacing
| Element | Spacing |
|---------|---------|
| Padding | 16px |
| Icon to content | 12px |
| Title to description | 4px |

#### Animation Behavior
- Fade in (200ms)
- Close animation (150ms)

#### Accessibility
- role="alert"
- aria-live="polite"

---

### 7.3 Loading Spinner

#### Purpose
Indicate loading state.

#### Description
An animated circular spinner for indicating ongoing processes.

#### Layout Structure
```
┌───────────┐
│  ╱    ╲   │
│ ╱  ◯   ╲  │
│╲       ╱  │
│ ╲    ╱   │
│  ╲__╱    │
└───────────┘
```

#### Variants
| Variant | Description |
|---------|-------------|
| **Circular** | Standard circular spinner |
| **Dots** | Three bouncing dots |
| **Pulse** | Pulsing circle |

#### Sizes
| Size | Dimension | Stroke Width |
|------|-----------|--------------|
| **Small** | 16px | 2px |
| **Medium** | 24px | 2px |
| **Large** | 40px | 3px |
| **XLarge** | 64px | 4px |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Spinner size |
| variant | 'circular' \| 'dots' \| 'pulse' | 'circular' | Spinner variant |
| color | string | 'Primary 500' | Spinner color |
| label | string | 'Loading...' | Aria label |

#### Animation Behavior
| Variant | Animation |
|---------|-----------|
| Circular | Rotate 360deg (1s, linear, infinite) |
| Dots | Scale 1 to 0.5 to 1 (0.6s, ease-in-out, infinite, staggered) |
| Pulse | Opacity 1 to 0.5 (1s, ease-in-out, infinite) |

#### Accessibility
- aria-label required
- role="status" for loaders in content
- role="progressbar" with aria-valuenow for determinate

---

### 7.4 Loading Skeleton

#### Purpose
Placeholder during content loading.

#### Description
Animated placeholder shapes that match the content layout.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ ┌─────┐ ┌────────────────────────┐ │
│ │     │ │ ████████████████████   │ │
│ │ IMG │ │ ████████████████████   │ │
│ │     │ │ ██████████            │ │
│ └─────┘ └────────────────────────┘ │
│         ████████████████            │
│         ████████████████            │
└─────────────────────────────────────┘
```

#### Variants
| Variant | Description |
|---------|-------------|
| **Text** | Line placeholders |
| **Avatar** | Circle placeholder |
| **Image** | Rectangle placeholder |
| **Card** | Full card placeholder |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'text' \| 'avatar' \| 'image' \| 'card' | 'text' | Skeleton variant |
| width | string \| number | '100%' | Skeleton width |
| height | string \| number | '1rem' | Skeleton height |
| borderRadius | string | 'DEFAULT' | Border radius |
| animation | 'pulse' \| 'wave' \| 'none' | 'wave' | Animation type |

#### Animation Behavior
- Wave shimmer (1.5s, ease-in-out, infinite)
- Left to right gradient sweep

#### Spacing
| Element | Spacing |
|---------|---------|
| Line gap | 8px |
| Avatar to text | 12px |

#### Accessibility
- aria-hidden="true"
- role="presentation"

---

### 7.5 Empty State

#### Purpose
Display when no content is available.

#### Description
A friendly message with illustration when content is empty.

#### Layout Structure
```
┌─────────────────────────────────────┐
│                                     │
│         [Illustration]              │
│              64px                   │
│                                     │
│         No Items Yet                │
│                                     │
│    Description text explaining      │
│    what this section is about       │
│    and how to get started.          │
│                                     │
│         [Action Button]             │
│                                     │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | ReactNode | null | Custom icon |
| title | string | 'No items yet' | Empty state title |
| description | string | null | Description text |
| action | { label: string; onClick: function } | null | Action button |

#### Spacing
| Element | Spacing |
|---------|---------|
| Icon | 64px |
| Icon to title | 24px |
| Title to description | 12px |
| Description to action | 24px |

#### Animation Behavior
- Fade in (300ms)
- Icon subtle float (3s, ease-in-out, infinite)

#### Accessibility
- Icon has aria-hidden
- Title is descriptive

---

### 7.6 Error State

#### Purpose
Display when an error occurs.

#### Description
A message indicating an error with retry option.

#### Layout Structure
```
┌─────────────────────────────────────┐
│                                     │
│         [Error Icon]                │
│              64px                   │
│                                     │
│         Something Went Wrong        │
│                                     │
│    We couldn't load this content.   │
│    Please try again.                │
│                                     │
│         [Try Again]                 │
│                                     │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | ReactNode | null | Custom icon |
| title | string | 'Something went wrong' | Error title |
| message | string | 'Please try again.' | Error message |
| action | { label: string; onClick: function } | null | Retry button |

#### Animation Behavior
- Shake animation on icon (500ms) on mount

#### Accessibility
- Error icon has aria-hidden
- Message is descriptive

---

## 8. Overlay Components

### 8.1 Modal

#### Purpose
Dialog overlay for focused interactions.

#### Description
A modal dialog that appears on top of the page content.

#### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░ ┌─────────────────────────────────────────────┐ ░░░ │
│ ░░░░░░ │  Modal Title                        [×]     │ ░░░ │
│ ░░░░░░ ├─────────────────────────────────────────────┤ ░░░ │
│ ░░░░░░ │                                             │ ░░░ │
│ ░░░░░░ │  Modal Content                              │ ░░░ │
│ ░░░░░░ │                                             │ ░░░ │
│ ░░░░░░ │                                             │ ░░░ │
│ ░░░░░░ ├─────────────────────────────────────────────┤ ░░░ │
│ ░░░░░░ │                              [Cancel] [Save] │ ░░░ │
│ ░░░░░░ └─────────────────────────────────────────────┘ ░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────────────────────────────────────────┘
```

#### Sizes
| Size | Width | Usage |
|------|-------|-------|
| **Small** | 400px | Confirmations |
| **Medium** | 560px | Forms |
| **Large** | 720px | Complex content |
| **XLarge** | 900px | Content preview |
| **Full** | 100% | Special cases |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | false | Open state |
| onClose | function | null | Close handler |
| title | string | null | Modal title |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' | 'md' | Modal size |
| variant | 'default' \| 'danger' | 'default' | Modal variant |
| showClose | boolean | true | Show close button |
| showFooter | boolean | true | Show footer |
| closeOnOverlay | boolean | true | Close on backdrop click |
| closeOnEscape | boolean | true | Close on Escape key |

#### States
| State | Backdrop | Modal |
|-------|----------|-------|
| Opening | Fade in | Scale up + fade |
| Open | Visible | Static |
| Closing | Fade out | Scale down + fade |

#### Spacing
| Element | Spacing |
|---------|---------|
| Header padding | 24px |
| Body padding | 24px |
| Footer padding | 24px |
| Footer button gap | 12px |

#### Animation Behavior
- Backdrop fade (200ms)
- Modal scale + fade (300ms, ease-out)
- Close: reverse animation (200ms)

#### Accessibility
- role="dialog"
- aria-modal="true"
- aria-labelledby for title
- Focus trap when open
- Return focus on close

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| Escape | Close modal |
| Tab | Navigate within modal |
| Shift+Tab | Navigate backwards |

---

### 8.2 Drawer

#### Purpose
Side panel overlay for supplementary content.

#### Description
A slide-out panel from the side of the screen.

#### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Content                                    │ ┌────────────┐ │
│                                            │ │ Drawer     │ │
│                                            │ │ Header     │ │
│                                            │ ├────────────┤ │
│                                            │ │            │ │
│                                            │ │ Drawer     │ │
│                                            │ │ Content    │ │
│                                            │ │            │ │
│                                            │ ├────────────┤ │
│                                            │ │ Footer     │ │
│                                            │ └────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### Sizes
| Size | Width |
|------|-------|
| **Small** | 320px |
| **Medium** | 480px |
| **Large** | 640px |

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | false | Open state |
| onClose | function | null | Close handler |
| position | 'left' \| 'right' | 'right' | Drawer position |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Drawer width |
| title | string | null | Drawer title |
| showClose | boolean | true | Show close button |
| closeOnOverlay | boolean | true | Close on backdrop click |

#### States
| State | Backdrop | Drawer |
|-------|----------|--------|
| Opening | Fade in | Slide in |
| Open | Visible | Static |
| Closing | Fade out | Slide out |

#### Animation Behavior
- Slide in from right (300ms, ease-out)
- Slide out to right (200ms, ease-in)

#### Accessibility
- role="dialog"
- aria-modal="true"
- Focus trap when open

---

### 8.3 Lightbox

#### Purpose
Full-screen image viewer.

#### Description
A modal for viewing images in full screen with navigation.

#### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│ [×]                                              [1 / 10]  │
│                                                             │
│                    [‹]    [Image]    [›]                    │
│                                                             │
│                                                             │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐        │
│  │  │ │▓▓│ │  │ │  │ │  │ │  │ │  │ │  │ │  │ │  │        │
│  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘        │
└─────────────────────────────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| images | { src: string; alt: string }[] | [] | Image array |
| currentIndex | number | 0 | Current image index |
| isOpen | boolean | false | Open state |
| onClose | function | null | Close handler |
| onPrev | function | null | Previous handler |
| onNext | function | null | Next handler |
| showThumbnails | boolean | true | Show thumbnail strip |
| showCounter | boolean | true | Show image counter |

#### States
| State | Appearance |
|-------|------------|
| Opening | Fade in |
| Open | Static |
| Transitioning | Image crossfade |

#### Animation Behavior
- Image crossfade (300ms)
- Thumbnail scroll (smooth)
- Zoom on double-click (300ms)

#### Accessibility
- Keyboard navigation
- aria-label on close
- Focus trap

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| Escape | Close |
| Arrow Left | Previous image |
| Arrow Right | Next image |

---

### 8.4 Dropdown

#### Purpose
Floating menu for additional options.

#### Description
A floating menu that appears on trigger interaction.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ [Trigger Button]              [▼]  │
│                                     │
│ ┌─────────────────────────────────┐│
│ │ Option 1                        ││
│ │ Option 2                        ││
│ │ ─────────────────────────────── ││
│ │ Option 3                        ││
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| trigger | ReactNode | null | Trigger element |
| items | DropdownItem[] | [] | Menu items |
| position | 'bottom-start' \| 'bottom-end' \| 'bottom-center' | 'bottom-start' | Position |
| isOpen | boolean | false | Open state |
| onToggle | function | null | Toggle handler |
| variant | 'default' \| 'actions' | 'default' | Menu variant |

#### Dropdown Item
| Property | Type | Description |
|----------|------|-------------|
| id | string | Item ID |
| label | string | Item label |
| icon | ReactNode | Item icon |
| disabled | boolean | Disabled state |
| danger | boolean | Danger item |
| divider | boolean | Show divider after |

#### States
| State | Appearance |
|-------|------------|
| Closed | Hidden |
| Open | Visible, shadow-md |

#### Animation Behavior
- Fade in (150ms)
- Scale from 95% (150ms)

#### Accessibility
- role="menu"
- role="menuitem"
- Keyboard navigation

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| Enter/Space | Open/select |
| Escape | Close |
| Arrow Up/Down | Navigate items |

---

### 8.5 Tooltip

#### Purpose
Show additional information on hover.

#### Description
A small floating label that appears on hover.

#### Layout Structure
```
┌─────────────────────────────┐
│ Tooltip content text here   │
└─────────────────────────────┘
          │
          ▼
      [Element]
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| content | ReactNode | null | Tooltip content |
| children | ReactNode | null | Trigger element |
| position | 'top' \| 'bottom' \| 'left' \| 'right' | 'top' | Tooltip position |
| delay | number | 200 | Show delay (ms) |
| variant | 'default' \| 'dark' | 'default' | Tooltip variant |

#### Spacing
| Element | Spacing |
|---------|---------|
| Arrow size | 6px |
| Content padding | 8px 12px |
| Gap to trigger | 8px |

#### Animation Behavior
- Fade in (150ms)
- Scale from 95% (150ms)
- Delay before show (200ms)

#### Accessibility
- role="tooltip"
- aria-describedby on trigger
- Keyboard accessible (focus trigger)

---

## 9. Content Components

### 9.1 Accordion

#### Purpose
Expandable content sections.

#### Description
A vertically stacked set of interactive headings that expand to reveal content.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ Section Title                   [▼] │
├─────────────────────────────────────┤
│                                     │
│ Expanded content goes here...       │
│                                     │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { id: string; title: string; content: ReactNode }[] | [] | Accordion items |
| allowMultiple | boolean | false | Allow multiple open |
| defaultOpen | string[] | [] | Initially open items |
| variant | 'bordered' \| 'borderless' \| 'elevated' | 'bordered' | Accordion style |
| onChange | function | null | Change handler |

#### States
| State | Icon | Content |
|-------|------|---------|
| Closed | 0deg | Hidden |
| Open | 180deg | Visible |
| Hover | - | Background Gray 50 |

#### Spacing
| Element | Spacing |
|---------|---------|
| Item padding | 16px |
| Content padding | 16px |
| Item border | 1px Gray 200 |

#### Animation Behavior
- Chevron rotation (200ms)
- Content height animation (200ms, ease-out)

#### Accessibility
- role="button" on headers
- aria-expanded
- aria-controls for content
- Keyboard navigable

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| Enter/Space | Toggle item |
| Arrow Up/Down | Navigate items |

---

### 9.2 Timeline

#### Purpose
Display chronological events.

#### Description
A vertical timeline showing events in sequence.

#### Layout Structure
```
│ 1998
│ ●────────────────────────────
│     Company founded
│     Description text...
│
│ 2005
│ ●────────────────────────────
│     First major project
│     Description text...
│
│ 2010
│ ●────────────────────────────
│     Expansion
│     Description text...
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { year: string; title: string; description: string; icon?: ReactNode }[] | [] | Timeline items |
| variant | 'default' \| 'centered' \| 'compact' | 'default' | Timeline style |
| showLine | boolean | true | Show connecting line |

#### Spacing
| Element | Spacing |
|---------|---------|
| Item gap | 32px |
| Node size | 16px |
| Line width | 2px |

#### Animation Behavior
- Items fade in on scroll (staggered)
- Node pulse on hover

#### Accessibility
- Semantic list markup
- Proper heading hierarchy

---

### 9.3 Process Steps

#### Purpose
Show a multi-step process.

#### Description
Horizontal or vertical steps showing process flow.

#### Layout Structure
```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐
│   1   │───▶│   2   │───▶│   3   │───▶│   4   │
│       │    │       │    │       │    │       │
│ Step  │    │ Step  │    │ Step  │    │ Step  │
│ Title │    │ Title │    │ Title │    │ Title │
└───────┘    └───────┘    └───────┘    └───────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| steps | { title: string; description?: string; icon?: ReactNode }[] | [] | Process steps |
| currentStep | number | 0 | Current step |
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | Step orientation |
| variant | 'default' \| 'simple' \| 'with-description' | 'default' | Step style |

#### States
| State | Appearance |
|-------|------------|
| Completed | Primary bg, checkmark icon |
| Current | Primary border, filled number |
| Upcoming | Gray border, gray number |

#### Spacing
| Element | Spacing |
|---------|---------|
| Step gap | 24px |
| Connector width | 48px |
| Step size | 48px |

#### Animation Behavior
- Progress line fill (300ms)
- Step completion checkmark (200ms)

---

### 9.4 Gallery

#### Purpose
Display a collection of images.

#### Description
A grid or masonry layout for showcasing images.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│ │         │ │         │ │         │ │
│ │ Image 1 │ │ Image 2 │ │ Image 3 │ │
│ │         │ │         │ │         │ │
│ └─────────┘ └─────────┘ └─────────┘ │
│ ┌─────────────────┐ ┌─────────┐     │
│ │                 │ │         │     │
│ │    Image 4      │ │ Image 5 │     │
│ │                 │ │         │     │
│ └─────────────────┘ └─────────┘     │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| images | { src: string; alt: string }[] | [] | Gallery images |
| layout | 'grid' \| 'masonry' | 'grid' | Layout type |
| columns | number | 3 | Number of columns |
| gap | number | 16 | Grid gap |
| onImageClick | function | null | Image click handler |

#### States
| State | Appearance |
|-------|------------|
| Default | Normal image |
| Hover | Overlay with zoom icon |

#### Animation Behavior
- Image zoom on hover (300ms)
- Lightbox open on click

---

### 9.5 Image Slider

#### Purpose
Carousel for displaying images.

#### Description
A slider component for cycling through images.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ [‹]  ┌─────────────────────────┐  [›]│
│     │                         │     │
│     │      Current Image       │     │
│     │                         │     │
│     └─────────────────────────┘     │
│                                     │
│         ● ○ ○ ○ ○                   │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| images | { src: string; alt: string; caption?: string }[] | [] | Slider images |
| autoPlay | boolean | false | Auto play |
| interval | number | 5000 | Auto play interval (ms) |
| showArrows | boolean | true | Show navigation arrows |
| showDots | boolean | true | Show pagination dots |
| showThumbnails | boolean | false | Show thumbnail strip |
| loop | boolean | true | Loop slides |

#### States
| State | Appearance |
|-------|------------|
| Default | Current slide visible |
| Transitioning | Crossfade/slide |
| Hover | Arrows visible |

#### Animation Behavior
- Slide transition (400ms, ease-out)
- Dot active transition (200ms)
- Auto-play pause on hover

#### Accessibility
- role="region" with aria-label
- aria-live for current slide
- Keyboard navigation

#### Keyboard Interactions
| Key | Action |
|-----|--------|
| Arrow Left | Previous slide |
| Arrow Right | Next slide |

---

### 9.6 Testimonial Slider

#### Purpose
Carousel for testimonials.

#### Description
A slider specifically designed for testimonial cards.

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| testimonials | Testimonial[] | [] | Testimonial data |
| visibleCount | number | 3 | Visible testimonials |
| autoPlay | boolean | true | Auto play |
| interval | number | 5000 | Auto play interval |
| showArrows | boolean | true | Show arrows |
| variant | 'cards' \| 'minimal' | 'cards' | Display style |

#### States
| State | Appearance |
|-------|------------|
| Default | Current testimonials |
| Transitioning | Slide animation |

#### Animation Behavior
- Slide transition (400ms)
- Auto-play pause on hover

---

### 9.7 Statistics Counter

#### Purpose
Animated number display.

#### Description
A component that animates numbers counting up.

#### Layout Structure
```
┌─────────────────────────────────────┐
│  [Icon]                             │
│                                     │
│  500+                               │
│  Projects Completed                 │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | 0 | Target value |
| prefix | string | '' | Value prefix |
| suffix | string | '' | Value suffix |
| label | string | '' | Statistic label |
| icon | ReactNode | null | Statistic icon |
| duration | number | 1500 | Animation duration (ms) |
| trigger | 'mount' \| 'scroll' | 'scroll' | Animation trigger |

#### Animation Behavior
- Count from 0 to value (duration, ease-out)
- Triggers when 50% visible

---

## 10. Utility Components

### 10.1 Language Switcher

#### Purpose
Toggle between languages.

#### Description
A dropdown or toggle for switching between Arabic and English.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ [🌐] EN ▼                          │
│     ┌─────────────────────────┐    │
│     │ ○ English                │    │
│     │ ● العربية               │    │
│     └─────────────────────────┘    │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| currentLang | 'en' \| 'ar' | 'en' | Current language |
| onChange | function | null | Language change handler |
| variant | 'dropdown' \| 'toggle' | 'dropdown' | Switcher style |
| showFlag | boolean | true | Show flag icons |

#### States
| State | Appearance |
|-------|------------|
| Default | Current language shown |
| Open | Dropdown visible |

#### Animation Behavior
- Dropdown fade in (150ms)

#### Accessibility
- aria-label="Language switcher"
- Keyboard navigable

---

### 10.2 Theme Switcher

#### Purpose
Toggle between light and dark themes.

#### Description
A toggle for switching between light and dark mode.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ [☀] or [🌙]                         │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| currentTheme | 'light' \| 'dark' | 'light' | Current theme |
| onChange | function | null | Theme change handler |
| variant | 'icon' \| 'toggle' | 'icon' | Switcher style |

#### States
| State | Icon |
|-------|------|
| Light | Sun icon |
| Dark | Moon icon |

#### Animation Behavior
- Icon rotation (300ms)
- Theme transition (200ms)

#### Accessibility
- aria-label="Toggle theme"
- Keyboard accessible

---

### 10.3 WhatsApp Floating Button

#### Purpose
Quick access to WhatsApp contact.

#### Description
A floating button that opens WhatsApp chat.

#### Layout Structure
```
┌─────────┐
│  [WA]   │
└─────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| phoneNumber | string | '' | WhatsApp number |
| message | string | 'Hello!' | Pre-filled message |
| position | 'bottom-right' \| 'bottom-left' | 'bottom-right' | Button position |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| showTooltip | boolean | true | Show tooltip |

#### Sizes
| Size | Dimension |
|------|-----------|
| **Small** | 40px |
| **Medium** | 56px |
| **Large** | 64px |

#### States
| State | Appearance |
|-------|------------|
| Default | WhatsApp green |
| Hover | Darker green, scale 1.1 |
| Focus | Ring outline |

#### Animation Behavior
- Scale on hover (150ms)
- Pulse animation (optional)
- Tooltip fade in (150ms)

#### Accessibility
- aria-label="Contact on WhatsApp"
- Opens in new tab

---

### 10.4 Scroll To Top Button

#### Purpose
Quick scroll to page top.

#### Description
A floating button that appears on scroll and scrolls to top.

#### Layout Structure
```
┌─────────┐
│   [↑]   │
└─────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| showAfter | number | 300 | Scroll position to show (px) |
| position | 'bottom-right' \| 'bottom-center' | 'bottom-right' | Button position |
| size | 'sm' \| 'md' | 'md' | Button size |
| smooth | boolean | true | Smooth scroll |

#### States
| State | Appearance |
|-------|------------|
| Hidden | opacity 0, pointer-events none |
| Visible | opacity 1, pointer-events auto |

#### Animation Behavior
- Fade in/out (200ms)
- Scroll to top (smooth)

#### Accessibility
- aria-label="Scroll to top"
- Keyboard accessible

---

### 10.5 Social Icons

#### Purpose
Display social media links.

#### Description
A set of icons linking to social media profiles.

#### Layout Structure
```
┌─────────────────────────────────────┐
│ [LinkedIn] [Twitter] [Facebook]    │
│ [Instagram] [YouTube]              │
└─────────────────────────────────────┘
```

#### Properties (Props)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| links | { platform: string; url: string }[] | [] | Social links |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Icon size |
| variant | 'default' \| 'colored' \| 'outline' | 'default' | Icon style |
| showLabels | boolean | false | Show platform labels |

#### Platforms
| Platform | Icon |
|----------|------|
| LinkedIn | LinkedIn icon |
| Twitter/X | Twitter icon |
| Facebook | Facebook icon |
| Instagram | Instagram icon |
| YouTube | YouTube icon |
| TikTok | TikTok icon |

#### States
| State | Appearance |
|-------|------------|
| Default | Gray 500 |
| Hover | Platform color |
| Colored | Platform color always |

#### Animation Behavior
- Scale on hover (1.1, 150ms)
- Color transition (150ms)

#### Accessibility
- aria-label="Follow us on [Platform]"
- Links open in new tab

---

## Appendix A: Component State Summary

### Interactive Components

| Component | States |
|-----------|--------|
| Buttons | Default, Hover, Active, Focus, Disabled, Loading |
| Inputs | Default, Hover, Focus, Error, Success, Disabled |
| Cards | Default, Hover, Focus |
| Links | Default, Hover, Active, Focus |
| Tabs | Default, Hover, Active, Disabled |
| Checkbox | Unchecked, Checked, Indeterminate, Disabled |
| Radio | Unselected, Selected, Disabled |
| Switch | Off, On, Disabled |

### Feedback Components

| Component | States |
|-----------|--------|
| Toast | Entering, Visible, Exiting |
| Modal | Opening, Open, Closing |
| Drawer | Opening, Open, Closing |
| Dropdown | Closed, Open |
| Tooltip | Hidden, Visible |

---

## Appendix B: Animation Quick Reference

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| Hover color | 150ms | ease-out | Buttons, links |
| Card lift | 200ms | ease-out | Cards on hover |
| Modal open | 300ms | ease-out | Modal appearance |
| Modal close | 200ms | ease-in | Modal dismissal |
| Drawer slide | 300ms | ease-out | Drawer appearance |
| Dropdown | 150ms | ease-out | Dropdown menu |
| Tooltip | 150ms | ease-out | Tooltip appearance |
| Skeleton shimmer | 1.5s | ease-in-out | Loading skeleton |
| Spinner | 1s | linear | Loading spinner |
| Count up | 1.5s | ease-out | Statistics counter |

---

## Appendix C: Spacing Quick Reference

| Token | Value | Usage |
|-------|-------|-------|
| 0 | 0px | No spacing |
| 1 | 4px | Icon gaps |
| 2 | 8px | Component internal |
| 3 | 12px | Input padding |
| 4 | 16px | Standard spacing |
| 5 | 20px | Form elements |
| 6 | 24px | Card padding |
| 8 | 32px | Section gaps |
| 10 | 40px | Large gaps |
| 12 | 48px | Section spacing |
| 16 | 64px | Major sections |

---

**Document Status:** Ready for Implementation  
**Next Phase:** UI Design & Development  
**Prepared By:** UI/UX Team  
**Review Date:** July 16, 2026