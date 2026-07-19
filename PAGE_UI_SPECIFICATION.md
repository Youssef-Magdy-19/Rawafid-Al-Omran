# Page-by-Page UI Specification: Rawafid Al Omran Contracting

**Document Date:** July 16, 2026  
**Document Version:** 1.0  
**Project:** Rawafid Al Omran Contracting Corporate Website  
**Scope:** Public Website UI Specifications

---

## Table of Contents

1. [Home (Landing Page)](#1-home-landing-page)
2. [About Us](#2-about-us)
3. [Services Overview](#3-services-overview)
4. [Service Details](#4-service-details)
5. [Projects Overview](#5-projects-overview)
6. [Project Details](#6-project-details)
7. [Testimonials](#7-testimonials)
8. [Partners](#8-partners)
9. [Blog Overview](#9-blog-overview)
10. [Blog Post Details](#10-blog-post-details)
11. [Careers Overview](#11-careers-overview)
12. [Career Details](#12-career-details)
13. [FAQ](#13-faq)
14. [Contact](#14-contact)
15. [Request Quote](#15-request-quote)
16. [Search Results](#16-search-results)
17. [Privacy Policy](#17-privacy-policy)
18. [Terms & Conditions](#18-terms--conditions)
19. [404 Page](#19-404-page)
20. [Thank You Pages](#20-thank-you-pages)

---

## 1. Home (Landing Page)

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | First impression, showcase value proposition, drive conversions |
| **Primary Goal** | Engage visitors, build trust, generate quote requests |
| **Target User** | All visitor types (villa owners, investors, companies, etc.) |
| **Expected Actions** | Scroll through content, click CTAs, view projects, subscribe to newsletter |
| **Exit Paths** | Navigate to other pages, close browser |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER (Sticky)                                            │
│ Logo (Left) | Navigation (Center) | Actions (Right)        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ HERO SECTION                                                │
│ Full-width, 80vh height                                    │
│ Background: High-quality construction image with overlay    │
│ Content: Headline, Subheadline, 2 CTA buttons               │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ SERVICES PREVIEW                                           │
│ Section Title: "Our Services"                              │
│ 3-column grid of service cards                              │
│ "View All Services" link                                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ FEATURED PROJECTS                                          │
│ Section Title: "Featured Projects"                          │
│ 4-column grid of project cards                             │
│ "View All Projects" link                                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ STATISTICS SECTION                                         │
│ Full-width background (Primary 500)                        │
│ 4 statistics in a row                                      │
│ Number, Label, Icon                                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ TESTIMONIALS PREVIEW                                       │
│ Section Title: "What Our Clients Say"                      │
│ Carousel with 3 visible testimonials                       │
│ Navigation dots                                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ PARTNERS                                                   │
│ Section Title: "Our Partners"                             │
│ Logo carousel (6 visible logos)                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ CTA BANNER                                                 │
│ Full-width background (Secondary 500)                      │
│ Headline, Subtext, CTA button                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ BLOG PREVIEW                                               │
│ Section Title: "Latest Insights"                           │
│ 3-column grid of blog post cards                           │
│ "Visit Our Blog" link                                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ NEWSLETTER SECTION                                         │
│ Centered content, email input, subscribe button             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
│ 4-column layout: Company, Services, Resources, Contact     │
│ Bottom bar: Copyright, Social links, Legal links          │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 1.1 Hero Section

| Attribute | Specification |
|-----------|---------------|
| **Height** | 80vh (min 600px, max 900px) |
| **Background** | Full-bleed image with gradient overlay (Black 60% to transparent) |
| **Content Position** | Centered vertically, left-aligned text |
| **Headline** | H1, White, max 60 characters |
| **Subheadline** | Body lg, White 80% opacity, max 120 characters |
| **CTA Buttons** | Primary (Request Quote) + Outline (View Projects) |
| **Scroll Indicator** | Animated chevron at bottom center |

**Responsive Behavior:**
- **Desktop:** Full layout, 2 CTAs side by side
- **Tablet:** 2 CTAs, reduced padding
- **Mobile:** Stacked CTAs, reduced font sizes

**Animation Behavior:**
- Hero content fades in on load (400ms, ease-out)
- Background image subtle zoom (10s, linear, infinite)
- Scroll indicator bounces (1s, ease-in-out, infinite)

**RTL Considerations:**
- Text alignment flips to right
- CTA order reverses (View Projects first, then Request Quote)

#### 1.2 Services Preview Section

| Attribute | Specification |
|-----------|---------------|
| **Section Padding** | 96px top/bottom |
| **Section Title** | H2, centered, margin-bottom 48px |
| **Grid** | 3 columns, 32px gap |
| **Card Content** | Icon (48px), Title (H4), Excerpt (2 lines), Link |
| **View All Link** | Right-aligned below grid, Primary color |

**Components Used:**
- Section Header
- Service Card (3x)
- Text Link

**Animation Behavior:**
- Cards fade in on scroll (staggered 100ms)
- Card hover: translateY(-4px), shadow-md

#### 1.3 Featured Projects Section

| Attribute | Specification |
|-----------|---------------|
| **Section Padding** | 96px top/bottom |
| **Section Title** | H2, centered, margin-bottom 48px |
| **Background** | Gray 50 |
| **Grid** | 4 columns, 24px gap |
| **Card Content** | Image (16:10 ratio), Title, Category badge |
| **View All Link** | Right-aligned below grid |

**Components Used:**
- Section Header
- Project Card (4x)
- Text Link

**Animation Behavior:**
- Images scale 1.05 on hover (300ms)
- Overlay appears on hover with "View Project" text

#### 1.4 Statistics Section

| Attribute | Specification |
|-----------|---------------|
| **Background** | Primary 500 |
| **Padding** | 64px top/bottom |
| **Layout** | 4 columns, centered |
| **Content per Stat** | Icon (32px), Number (H2, White), Label (Body, White 80%) |
| **Numbers** | Animated count-up on scroll into view |

**Statistics Data:**
- Years of Experience: 25+
- Projects Completed: 500+
- Team Members: 200+
- Client Satisfaction: 98%

**Animation Behavior:**
- Numbers count up from 0 (1.5s, ease-out)
- Triggers when section is 50% visible

#### 1.5 Testimonials Preview Section

| Attribute | Specification |
|-----------|---------------|
| **Section Padding** | 96px top/bottom |
| **Section Title** | H2, centered, margin-bottom 48px |
| **Layout** | Carousel, 3 visible cards |
| **Card Content** | Quote, Avatar (48px), Name, Company, Rating (5 stars) |
| **Navigation** | Dots below, left/right arrows on hover |

**Components Used:**
- Section Header
- Testimonial Card (3x)
- Carousel Navigation

**Animation Behavior:**
- Slide transition (400ms, ease-out)
- Auto-play every 5 seconds (pauses on hover)

#### 1.6 Partners Section

| Attribute | Specification |
|-----------|---------------|
| **Section Padding** | 64px top/bottom |
| **Section Title** | H3, centered, margin-bottom 32px |
| **Layout** | Horizontal scroll carousel |
| **Logo Size** | 120px width, grayscale |
| **Visible Count** | 6 on desktop, 4 on tablet, 2 on mobile |

**Animation Behavior:**
- Continuous scroll (30s, linear, infinite)
- Pause on hover
- Logos brighten on hover

#### 1.7 CTA Banner Section

| Attribute | Specification |
|-----------|---------------|
| **Background** | Secondary 500 |
| **Padding** | 80px top/bottom |
| **Layout** | Centered, max-width 800px |
| **Content** | H2 (White), Body (White 90%), Primary Button |

**Animation Behavior:**
- Background subtle gradient shift (10s, infinite)

#### 1.8 Blog Preview Section

| Attribute | Specification |
|-----------|---------------|
| **Section Padding** | 96px top/bottom |
| **Section Title** | H2, centered, margin-bottom 48px |
| **Grid** | 3 columns, 32px gap |
| **Card Content** | Image (16:9), Category badge, Title, Date, Excerpt |
| **Visit Blog Link** | Right-aligned below grid |

**Components Used:**
- Section Header
- Blog Card (3x)
- Text Link

#### 1.9 Newsletter Section

| Attribute | Specification |
|-----------|---------------|
| **Background** | Gray 900 |
| **Padding** | 64px top/bottom |
| **Layout** | Centered, max-width 600px |
| **Content** | H3 (White), Body (Gray 300), Email input + Button |

**Components Used:**
- Newsletter Form
- Input (large)
- Primary Button

**Animation Behavior:**
- Success: Input transforms to checkmark + "Subscribed!"

#### 1.10 Footer

| Attribute | Specification |
|-----------|---------------|
| **Background** | Gray 900 |
| **Top Padding** | 64px |
| **Layout** | 4 columns + bottom bar |
| **Columns** | Company info, Services links, Resources links, Contact info |
| **Bottom Bar** | Copyright, Social icons, Legal links |

**Components Used:**
- Footer Column (4x)
- Footer Link
- Social Icon
- Divider

### CTA Placement Summary

| Location | CTA | Type |
|----------|-----|------|
| Hero | Request Quote | Primary Button |
| Hero | View Projects | Outline Button |
| Services Preview | View All Services | Text Link |
| Featured Projects | View All Projects | Text Link |
| CTA Banner | Request Quote | Primary Button |
| Footer | Contact Us | Text Link |

### Accessibility Notes

- Hero image has appropriate alt text describing construction scene
- All CTAs have descriptive text (not "click here")
- Statistics use aria-label for screen readers
- Carousel has pause/play controls
- Newsletter form has proper labels and error messages

---

## 2. About Us

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Build trust, establish credibility, tell company story |
| **Primary Goal** | Help visitors understand who the company is and why to trust them |
| **Target User** | Potential clients researching the company |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER (Sticky)                                            │
├─────────────────────────────────────────────────────────────┤
│ PAGE HERO                                                  │
│ Reduced height (50vh), breadcrumb overlay                  │
│ Title: H1, centered                                        │
├─────────────────────────────────────────────────────────────┤
│ COMPANY OVERVIEW                                           │
│ 2-column: Image (left) + Text (right)                      │
│ Headline, Description, Key points                         │
├─────────────────────────────────────────────────────────────┤
│ MISSION & VISION                                           │
│ 2 cards side by side                                      │
│ Icon, Title, Description                                   │
├─────────────────────────────────────────────────────────────┤
│ HISTORY TIMELINE                                           │
│ Vertical timeline, alternating left/right                 │
│ Year, Title, Description                                  │
├─────────────────────────────────────────────────────────────┤
│ STATISTICS                                                │
│ Same as Home statistics section                           │
├─────────────────────────────────────────────────────────────┤
│ TEAM PREVIEW                                              │
│ Section Title, 4-column grid of team cards                 │
│ "Meet Full Team" link                                      │
├─────────────────────────────────────────────────────────────┤
│ CTA BANNER                                                │
│ Same structure as Home                                     │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 2.1 Page Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 50vh (min 400px, max 600px) |
| **Background** | Image with dark overlay (50%) |
| **Content** | H1 (White), Breadcrumb below |
| **Breadcrumb** | Home > About Us |

#### 2.2 Company Overview

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 96px top/bottom |
| **Layout** | 2 columns, 64px gap |
| **Image** | 50% width, rounded-lg, shadow-lg |
| **Content** | H2, Body text (3 paragraphs), Bullet list (4 items) |

**Responsive Behavior:**
- **Desktop:** Side by side
- **Tablet:** Stacked, image first
- **Mobile:** Stacked, text first

#### 2.3 Mission & Vision

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 96px top/bottom |
| **Background** | Gray 50 |
| **Layout** | 2 cards, 32px gap |
| **Card Content** | Icon (48px), H3, Body text |

**Card 1 - Mission:**
- Icon: Target
- Title: "Our Mission"
- Text: Mission statement (2-3 sentences)

**Card 2 - Vision:**
- Icon: Eye
- Title: "Our Vision"
- Text: Vision statement (2-3 sentences)

#### 2.4 History Timeline

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 96px top/bottom |
| **Layout** | Vertical line with nodes |
| **Items** | 5 milestones |
| **Content per Item** | Year (H3), Title, Description |

**Timeline Items:**
1. 1998 - Company founded
2. 2005 - First major project
3. 2010 - Expansion to new sectors
4. 2015 - 1000th project milestone
5. 2020 - Digital transformation
6. 2024 - Industry leadership

**Responsive Behavior:**
- **Desktop:** Alternating left/right
- **Tablet:** All items on right
- **Mobile:** All items on right, reduced spacing

#### 2.5 Team Preview

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 96px top/bottom |
| **Grid** | 4 columns, 24px gap |
| **Card Content** | Photo (1:1), Name, Title, Social links |

**Components Used:**
- Team Card (4x)
- Text Link

**Animation Behavior:**
- Photo scales 1.05 on hover
- Social icons fade in on hover

### CTA Placement

| Location | CTA | Type |
|----------|-----|------|
| Team Preview | Meet Full Team | Text Link |
| CTA Banner | Request Quote | Primary Button |

### Accessibility Notes

- Timeline has proper heading structure
- Images have descriptive alt text
- Team cards have proper focus states

---

## 3. Services Overview

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Present all services offered |
| **Primary Goal** | Help visitors find the service they need |
| **Target User** | Anyone looking for construction/engineering services |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ PAGE HERO                                                  │
│ Title: "Our Services"                                      │
├─────────────────────────────────────────────────────────────┤
│ FILTER BAR                                                 │
│ Category filters (horizontal scroll on mobile)             │
├─────────────────────────────────────────────────────────────┤
│ SERVICES GRID                                              │
│ 3-column grid of service cards                             │
│ Pagination or Load More                                    │
├─────────────────────────────────────────────────────────────┤
│ CTA BANNER                                                 │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 3.1 Page Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 40vh (min 350px, max 500px) |
| **Background** | Gradient Primary 700 to Primary 500 |
| **Content** | H1 (White), Subtitle (White 80%) |

#### 3.2 Filter Bar

| Attribute | Specification |
|-----------|---------------|
| **Position** | Sticky below header on scroll |
| **Background** | White, border-bottom Gray 200 |
| **Padding** | 16px 0 |
| **Filters** | Category buttons, "All" selected by default |

**Filter Categories:**
- All Services
- Construction
- Engineering
- Interior Design
- Project Management
- Maintenance

**Responsive Behavior:**
- **Desktop:** Horizontal row, all visible
- **Tablet:** Horizontal row, scroll if needed
- **Mobile:** Horizontal scroll, no scrollbar visible

#### 3.3 Services Grid

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top, 96px bottom |
| **Grid** | 3 columns, 32px gap |
| **Card Content** | Icon (64px), Title (H3), Excerpt (3 lines), "Learn More" link |

**Components Used:**
- Service Card
- Pagination OR Load More Button

**Animation Behavior:**
- Cards fade in on scroll (staggered 50ms)
- Filter change triggers fade out/in (200ms)

#### 3.4 Empty State

| Content | Specification |
|---------|---------------|
| **Icon** | Search icon, 64px, Gray 400 |
| **Title** | H3, "No services found" |
| **Message** | Body, Gray 500, "Try selecting a different category" |
| **Action** | "Clear Filters" button |

### CTA Placement

| Location | CTA | Type |
|----------|-----|------|
| CTA Banner | Request Quote | Primary Button |

### Accessibility Notes

- Filter buttons have aria-pressed state
- Active filter is clearly indicated
- Results count announced to screen readers

---

## 4. Service Details

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Provide detailed information about a specific service |
| **Primary Goal** | Convince visitor this service meets their needs |
| **Target User** | Someone researching specific services |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ PAGE HERO                                                  │
│ Service icon, Title, Category breadcrumb                    │
├─────────────────────────────────────────────────────────────┤
│ SERVICE CONTENT                                            │
│ 2-column: Main content (70%) + Sidebar (30%)               │
│ - Description                                              │
│ - Features/Benefits                                        │
│ - Process/Steps                                            │
│ - Gallery                                                  │
├─────────────────────────────────────────────────────────────┤
│ RELATED PROJECTS                                           │
│ 3-column grid of project cards                             │
├─────────────────────────────────────────────────────────────┤
│ RELATED SERVICES                                           │
│ Horizontal scroll of service cards                         │
├─────────────────────────────────────────────────────────────┤
│ CTA BANNER                                                 │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 4.1 Page Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 40vh (min 350px, max 500px) |
| **Background** | Primary 500 |
| **Content** | Icon (80px, White), H1 (White), Category breadcrumb |

#### 4.2 Service Content

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Layout** | 2 columns, 48px gap |
| **Main Column** | Description, Features, Process, Gallery |
| **Sidebar** | Quick Quote form, Key benefits list, Share buttons |

**Main Column Sections:**

**Description:**
- Body text, 2-3 paragraphs
- Lead paragraph in larger font

**Features/Benefits:**
- Icon list with 6-8 items
- Icon (24px) + Text

**Process/Steps:**
- Numbered steps (1-5)
- Step number (circle), Title, Description

**Gallery:**
- 4-6 images in masonry or grid
- Lightbox on click

**Sidebar Components:**
- Quick Quote Form (simplified)
- Benefits checklist
- Social share buttons

#### 4.3 Related Projects

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Background** | Gray 50 |
| **Title** | H3, "Related Projects" |
| **Grid** | 3 columns, 24px gap |

#### 4.4 Related Services

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Title** | H3, "Other Services" |
| **Layout** | Horizontal scroll, 3 visible |

### CTA Placement

| Location | CTA | Type |
|----------|-----|------|
| Sidebar | Request Quote | Primary Button (full width) |
| CTA Banner | Request Quote | Primary Button |

### Accessibility Notes

- Gallery images have alt text
- Process steps have proper list markup
- Sidebar form has proper labels

---

## 5. Projects Overview

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Showcase completed work and portfolio |
| **Primary Goal** | Build credibility through visual proof |
| **Target User** | Potential clients evaluating quality |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ PAGE HERO                                                  │
│ Title: "Our Projects"                                      │
├─────────────────────────────────────────────────────────────┤
│ FILTER BAR                                                 │
│ Category + Status filters                                  │
├─────────────────────────────────────────────────────────────┤
│ SORT BAR                                                   │
│ Results count, Sort dropdown                                │
├─────────────────────────────────────────────────────────────┤
│ PROJECTS GRID                                             │
│ 3-column grid of project cards                            │
│ Pagination                                                 │
├─────────────────────────────────────────────────────────────┤
│ CTA BANNER                                                 │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 5.1 Page Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 40vh (min 350px, max 500px) |
| **Background** | Image with overlay |
| **Content** | H1 (White), Subtitle (White 80%) |

#### 5.2 Filter Bar

| Attribute | Specification |
|-----------|---------------|
| **Filters** | Category dropdown, Status dropdown |

**Category Options:**
- All Categories
- Residential
- Commercial
- Industrial
- Infrastructure

**Status Options:**
- All Status
- Completed
- In Progress
- Upcoming

#### 5.3 Sort Bar

| Attribute | Specification |
|-----------|---------------|
| **Layout** | Left: Results count, Right: Sort dropdown |
| **Sort Options** | Newest, Oldest, Name A-Z, Name Z-A |

#### 5.4 Projects Grid

| Attribute | Specification |
|-----------|---------------|
| **Grid** | 3 columns, 24px gap |
| **Card Content** | Image (16:10), Overlay on hover with title, Category badge, Status badge |

**Components Used:**
- Project Card
- Category Badge
- Status Badge
- Pagination

**Animation Behavior:**
- Image zoom on hover (scale 1.05)
- Overlay slides up from bottom
- Staggered fade in on load

### CTA Placement

| Location | CTA | Type |
|----------|-----|------|
| CTA Banner | Request Quote | Primary Button |

### Accessibility Notes

- Filter state is announced
- Results count is announced
- Cards are keyboard navigable

---

## 6. Project Details

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Showcase project details and results |
| **Primary Goal** | Demonstrate quality and expertise |
| **Target User** | Potential clients reviewing past work |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ PROJECT HERO                                               │
│ Full-width image gallery (carousel)                        │
│ Title overlay at bottom                                    │
├─────────────────────────────────────────────────────────────┤
│ PROJECT INFO                                               │
│ 2-column: Details (left) + Description (right)            │
├─────────────────────────────────────────────────────────────┤
│ PROJECT GALLERY                                            │
│ Masonry grid of images                                     │
├─────────────────────────────────────────────────────────────┤
│ RELATED SERVICES                                           │
│ Horizontal scroll of service cards                         │
├─────────────────────────────────────────────────────────────┤
│ RELATED PROJECTS                                           │
│ 3-column grid                                              │
├─────────────────────────────────────────────────────────────┤
│ CTA BANNER                                                 │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 6.1 Project Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 70vh (min 500px, max 800px) |
| **Layout** | Image carousel with thumbnails below |
| **Overlay** | Title, Category, Location at bottom left |
| **Navigation** | Arrows on sides, dots below |

**Gallery Features:**
- Main image: 16:9 ratio
- Thumbnails: 80px squares, horizontal scroll
- Lightbox on thumbnail click

#### 6.2 Project Info

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Layout** | 2 columns, 48px gap |

**Left Column - Project Details:**
- Client
- Location
- Year Completed
- Project Type
- Duration
- Area (sqm)

**Right Column - Description:**
- H2: Project Title
- Body text (3-4 paragraphs)
- Key achievements list

#### 6.3 Project Gallery

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Background** | Gray 50 |
| **Layout** | Masonry grid, 4 columns |
| **Images** | Lightbox on click |

#### 6.4 Related Services

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Title** | H3, "Services Provided" |
| **Layout** | Horizontal scroll |

#### 6.5 Related Projects

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Title** | H3, "Similar Projects" |
| **Grid** | 3 columns |

### CTA Placement

| Location | CTA | Type |
|----------|-----|------|
| CTA Banner | Request Quote | Primary Button |

### Accessibility Notes

- Gallery has keyboard navigation
- Lightbox has close button and escape key
- Project details have proper table markup

---

## 7. Testimonials

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Build trust through social proof |
| **Primary Goal** | Convince visitors to take action |
| **Target User** | Potential clients researching company |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ PAGE HERO                                                  │
│ Title: "What Our Clients Say"                              │
├─────────────────────────────────────────────────────────────┤
│ TESTIMONIALS GRID                                         │
│ 3-column grid of testimonial cards                        │
│ Filter by category (optional)                              │
├─────────────────────────────────────────────────────────────┤
│ VIDEO TESTIMONIALS                                         │
│ 2-column grid of video cards                              │
├─────────────────────────────────────────────────────────────┤
│ CTA BANNER                                                 │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 7.1 Page Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 40vh (min 350px, max 500px) |
| **Background** | Gradient Secondary 700 to Secondary 500 |
| **Content** | H1 (White), Subtitle (White 80%) |

#### 7.2 Testimonials Grid

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 96px top/bottom |
| **Grid** | 3 columns, 32px gap |
| **Card Content** | Quote (large), Avatar (64px), Name, Company, Rating, Date |

**Components Used:**
- Testimonial Card
- Rating Stars

**Animation Behavior:**
- Cards fade in on scroll
- Quote marks animate on hover

#### 7.3 Video Testimonials

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Background** | Gray 50 |
| **Title** | H3, "Video Testimonials" |
| **Grid** | 2 columns, 32px gap |
| **Card Content** | Video thumbnail, Play button overlay, Name, Company |

**Video Features:**
- Thumbnail with duration badge
- Play button (centered, 64px)
- Click opens video modal

### CTA Placement

| Location | CTA | Type |
|----------|-----|------|
| CTA Banner | Request Quote | Primary Button |

### Accessibility Notes

- Video testimonials have captions
- Rating stars have text alternative
- Cards have proper focus states

---

## 8. Partners

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Showcase collaborations and credibility |
| **Primary Goal** | Build trust through association |
| **Target User** | Potential clients, partners |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ PAGE HERO                                                  │
│ Title: "Our Partners"                                       │
├─────────────────────────────────────────────────────────────┤
│ INTRO TEXT                                                 │
│ Centered paragraph about partnership approach               │
├─────────────────────────────────────────────────────────────┤
│ PARTNERS GRID                                             │
│ Logo grid by category                                      │
├─────────────────────────────────────────────────────────────┤
│ PARTNERSHIP BENEFITS                                       │
│ 3-column grid of benefit cards                            │
├─────────────────────────────────────────────────────────────┤
│ CTA BANNER                                                 │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 8.1 Page Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 40vh (min 350px, max 500px) |
| **Background** | Primary 500 |
| **Content** | H1 (White), Subtitle (White 80%) |

#### 8.2 Intro Text

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 48px top/bottom |
| **Layout** | Centered, max-width 800px |
| **Content** | Body lg, Gray 600 |

#### 8.3 Partners Grid

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Layout** | Grouped by category |
| **Categories** | Government, Corporate, International |
| **Logo Size** | 150px width |
| **Logo Style** | Grayscale, full color on hover |

**Components Used:**
- Partner Category Header
- Partner Logo Card

#### 8.4 Partnership Benefits

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Background** | Gray 50 |
| **Grid** | 3 columns, 32px gap |
| **Card Content** | Icon (48px), H4, Body text |

### CTA Placement

| Location | CTA | Type |
|----------|-----|------|
| CTA Banner | Contact Us | Primary Button |

### Accessibility Notes

- Logos have alt text (company name)
- Links to partner websites open in new tab

---

## 9. Blog Overview

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Share industry insights, company news |
| **Primary Goal** | Establish thought leadership, improve SEO |
| **Target User** | Industry professionals, potential clients, general audience |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ PAGE HERO                                                  │
│ Title: "Blog"                                               │
├─────────────────────────────────────────────────────────────┤
│ FEATURED POST                                              │
│ Large card, full-width                                     │
├─────────────────────────────────────────────────────────────┤
│ FILTER BAR                                                 │
│ Category filters + Search                                  │
├─────────────────────────────────────────────────────────────┤
│ BLOG GRID                                                 │
│ 3-column grid of blog cards                               │
│ Pagination                                                 │
├─────────────────────────────────────────────────────────────┤
│ SIDEBAR (Desktop only)                                     │
│ - Categories                                               │
│ - Recent Posts                                             │
│ - Newsletter Signup                                        │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 9.1 Page Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 40vh (min 350px, max 500px) |
| **Background** | Gray 900 |
| **Content** | H1 (White), Subtitle (Gray 400) |

#### 9.2 Featured Post

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Layout** | 2 columns, 48px gap |
| **Image** | 50% width, 16:9 ratio |
| **Content** | "Featured" badge, Category, Title (H2), Excerpt, Date, Author, Read More link |

#### 9.3 Filter Bar

| Attribute | Specification |
|-----------|---------------|
| **Filters** | Category buttons, Search input |
| **Categories** | All, Industry News, Company Updates, Project Highlights, Tips & Guides |

#### 9.4 Blog Grid

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Layout** | 3 columns, 32px gap |
| **Card Content** | Image (16:9), Category badge, Title, Excerpt (2 lines), Date, Author avatar + name |

**Components Used:**
- Blog Card
- Category Badge
- Pagination

#### 9.5 Sidebar (Desktop)

| Attribute | Specification |
|-----------|---------------|
| **Position** | Right side, 30% width |
| **Sticky** | Yes, scrolls with content |
| **Sections** | Categories list, Recent posts (5), Newsletter signup |

### CTA Placement

| Location | CTA | Type |
|----------|-----|------|
| Featured Post | Read More | Primary Button |
| Sidebar | Subscribe | Primary Button |

### Accessibility Notes

- Blog posts have proper heading hierarchy
- Images have alt text
- Pagination announces total pages

---

## 10. Blog Post Details

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Deliver valuable content |
| **Primary Goal** | Engage readers, establish authority |
| **Target User** | Blog readers |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ POST HERO                                                  │
│ Full-width image, Title overlay                            │
├─────────────────────────────────────────────────────────────┤
│ POST CONTENT                                              │
│ 2-column: Article (70%) + Sidebar (30%)                   │
│ - Article body                                             │
│ - Author bio                                              │
│ - Share buttons                                            │
│ - Related posts                                           │
├─────────────────────────────────────────────────────────────┤
│ COMMENTS SECTION                                           │
│ (If enabled)                                              │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 10.1 Post Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 50vh (min 400px, max 600px) |
| **Background** | Image with gradient overlay |
| **Content** | Category badge, Title (H1), Meta (Author, Date, Read time) |

#### 10.2 Article Content

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Layout** | 2 columns, 48px gap |
| **Max Width** | 720px for article text |
| **Typography** | Body lg, 1.8 line height |

**Article Sections:**
- Lead paragraph (larger font)
- Headings (H2, H3)
- Paragraphs
- Images with captions
- Blockquotes
- Lists
- Code blocks (if needed)

**Components Used:**
- Article Typography
- Image with Caption
- Blockquote
- Code Block

#### 10.3 Author Bio

| Attribute | Specification |
|-----------|---------------|
| **Position** | Below article |
| **Layout** | Avatar (64px) + Info |
| **Content** | Name, Title, Bio, Social links |

#### 10.4 Share Buttons

| Attribute | Specification |
|-----------|---------------|
| **Position** | Below author bio |
| **Layout** | Horizontal row |
| **Platforms** | Facebook, Twitter, LinkedIn, Copy Link |
| **Style** | Icon buttons with labels on hover |

#### 10.5 Related Posts

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Background** | Gray 50 |
| **Title** | H3, "Related Articles" |
| **Layout** | 3-column grid |

#### 10.6 Comments Section

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Title** | H3, "Comments" |
| **Form** | Name, Email, Comment, Submit |
| **Comments** | List with replies |

### Accessibility Notes

- Article has proper heading structure
- Images have descriptive alt text
- Share buttons have aria-labels

---

## 11. Careers Overview

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Attract potential candidates |
| **Primary Goal** | Fill open positions with qualified candidates |
| **Target User** | Job seekers in construction/engineering fields |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ PAGE HERO                                                  │
│ Title: "Join Our Team"                                     │
├─────────────────────────────────────────────────────────────┤
│ CULTURE SECTION                                            │
│ 2-column: Image + Text                                     │
├─────────────────────────────────────────────────────────────┤
│ BENEFITS                                                   │
│ 4-column grid of benefit cards                            │
├─────────────────────────────────────────────────────────────┤
│ OPEN POSITIONS                                             │
│ Filter by department                                       │
│ Job listings                                              │
├─────────────────────────────────────────────────────────────┤
│ CTA BANNER                                                 │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 11.1 Page Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 50vh (min 400px, max 600px) |
| **Background** | Image with overlay |
| **Content** | H1 (White), Subtitle (White 80%), "View Open Positions" button |

#### 11.2 Culture Section

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 96px top/bottom |
| **Layout** | 2 columns, 64px gap |
| **Image** | Team photo, 50% width |
| **Content** | H2, Body text, Bullet points |

#### 11.3 Benefits

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Background** | Primary 500 |
| **Grid** | 4 columns, 24px gap |
| **Card Content** | Icon (48px, White), Title (H4, White), Description (White 80%) |

**Benefits:**
- Competitive Salary
- Health Insurance
- Professional Development
- Work-Life Balance
- Career Growth
- Modern Equipment
- Team Activities
- Innovative Projects

#### 11.4 Open Positions

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 96px top/bottom |
| **Filter** | Department dropdown |
| **Layout** | List of job cards |

**Job Card Content:**
- Title (H3)
- Department badge
- Location
- Type (Full-time/Part-time)
- Posted date
- "Apply Now" button

**Departments:**
- Engineering
- Project Management
- Design
- Operations
- Administration

### CTA Placement

| Location | CTA | Type |
|----------|-----|------|
| Hero | View Open Positions | Primary Button |
| Job Card | Apply Now | Primary Button |
| CTA Banner | Contact HR | Primary Button |

### Accessibility Notes

- Job cards are keyboard navigable
- Filter state is announced
- Application form has proper labels

---

## 12. Career Details

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Provide full job details and requirements |
| **Primary Goal** | Encourage qualified candidates to apply |
| **Target User** | Job seekers interested in specific position |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ JOB HERO                                                   │
│ Title, Department, Location, Type                         │
├─────────────────────────────────────────────────────────────┤
│ JOB CONTENT                                               │
│ 2-column: Details (70%) + Quick Apply (30%)               │
│ - Description                                             │
│ - Requirements                                            │
│ - Responsibilities                                         │
│ - Benefits                                                │
├─────────────────────────────────────────────────────────────┤
│ SIMILAR JOBS                                               │
│ Horizontal scroll of job cards                            │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 12.1 Job Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 35vh (min 300px, max 400px) |
| **Background** | Secondary 500 |
| **Content** | H1 (White), Meta badges (Department, Location, Type) |

#### 12.2 Job Content

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Layout** | 2 columns, 48px gap |

**Main Column Sections:**

**Description:**
- H2: "About the Role"
- Body text (2-3 paragraphs)

**Requirements:**
- H2: "Requirements"
- Bullet list (6-8 items)

**Responsibilities:**
- H2: "Responsibilities"
- Numbered list (5-7 items)

**Benefits:**
- H2: "What We Offer"
- Bullet list (5-6 items)

**Sidebar - Quick Apply:**
- Sticky card
- "Apply for this Position" H3
- Simplified application form
- Or "Apply with LinkedIn" button

#### 12.3 Similar Jobs

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Background** | Gray 50 |
| **Title** | H3, "Similar Positions" |
| **Layout** | Horizontal scroll, 3 visible |

### CTA Placement

| Location | CTA | Type |
|----------|-----|------|
| Sidebar | Apply Now | Primary Button |
| Sidebar | Apply with LinkedIn | Secondary Button |

### Accessibility Notes

- Lists have proper markup
- Form has proper labels and error messages
- Job details announced to screen readers

---

## 13. FAQ

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Answer common questions |
| **Primary Goal** | Reduce support burden, help visitors |
| **Target User** | Anyone with questions |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ PAGE HERO                                                  │
│ Title: "Frequently Asked Questions"                        │
├─────────────────────────────────────────────────────────────┤
│ SEARCH                                                     │
│ Large search input                                         │
├─────────────────────────────────────────────────────────────┤
│ CATEGORIES                                                │
│ Horizontal tabs or category cards                         │
├─────────────────────────────────────────────────────────────┤
│ FAQ ACCORDION                                             │
│ Grouped by category                                       │
├─────────────────────────────────────────────────────────────┤
│ CONTACT CTA                                               │
│ "Still have questions?" + Contact link                    │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 13.1 Page Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 35vh (min 300px, max 400px) |
| **Background** | Gray 900 |
| **Content** | H1 (White), Subtitle (Gray 400) |

#### 13.2 Search

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 32px top/bottom |
| **Layout** | Centered, max-width 600px |
| **Input** | Large, with search icon, placeholder "Search questions..." |

**Behavior:**
- Real-time filtering as user types
- Highlight matching text in results

#### 13.3 Categories

| Attribute | Specification |
|-----------|---------------|
| **Layout** | Horizontal tabs |
| **Categories** | General, Services, Projects, Careers, Contact |

**Tab Style:**
- Underline indicator
- Active: Primary 500 text, underline
- Inactive: Gray 500 text

#### 13.4 FAQ Accordion

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Layout** | Grouped by category |
| **Category Header** | H3 with icon |
| **Items** | Accordion with question + answer |

**Accordion Behavior:**
- Click to expand/collapse
- Chevron rotates 180deg
- Only one open at a time (optional)
- Smooth height animation (200ms)

#### 13.5 Contact CTA

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 48px top/bottom |
| **Background** | Gray 50 |
| **Layout** | Centered |
| **Content** | H3, Body text, "Contact Us" link |

### Accessibility Notes

- Accordion has proper aria-expanded state
- Search has live region for results
- Questions are keyboard navigable

---

## 14. Contact

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Provide contact options |
| **Primary Goal** | Make it easy to reach the company |
| **Target User** | Anyone needing to contact the company |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ PAGE HERO                                                  │
│ Title: "Contact Us"                                       │
├─────────────────────────────────────────────────────────────┤
│ CONTACT INFO + FORM                                        │
│ 2-column: Info (40%) + Form (60%)                         │
├─────────────────────────────────────────────────────────────┤
│ MAP                                                        │
│ Full-width embedded map                                    │
├─────────────────────────────────────────────────────────────┤
│ OFFICE HOURS                                               │
│ Centered table of hours                                    │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 14.1 Page Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 35vh (min 300px, max 400px) |
| **Background** | Primary 500 |
| **Content** | H1 (White), Subtitle (White 80%) |

#### 14.2 Contact Info + Form

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 96px top/bottom |
| **Layout** | 2 columns, 64px gap |

**Left Column - Contact Info:**
- Address with icon
- Phone numbers (2)
- Email
- WhatsApp button
- Social links

**Right Column - Contact Form:**
- Name (required)
- Email (required)
- Phone (optional)
- Subject (required, dropdown)
- Message (required, textarea)
- Submit button

**Form Validation:**
- Real-time validation
- Error messages below fields
- Success message on submit

#### 14.3 Map

| Attribute | Specification |
|-----------|---------------|
| **Height** | 400px |
| **Type** | Embedded Google Maps |
| **Marker** | Company location |
| **Controls** | Zoom, fullscreen |

#### 14.4 Office Hours

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Background** | Gray 50 |
| **Layout** | Centered, max-width 600px |
| **Content** | Table with day/time |

**Hours Table:**
| Day | Hours |
|-----|-------|
| Sunday - Thursday | 8:00 AM - 6:00 PM |
| Friday | Closed |
| Saturday | 9:00 AM - 2:00 PM |

### CTA Placement

| Location | CTA | Type |
|----------|-----|------|
| Contact Info | WhatsApp | Primary Button |
| Form | Send Message | Primary Button |

### Accessibility Notes

- Form has proper labels
- Map has text alternative
- Phone numbers are tel: links

---

## 15. Request Quote

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Capture quote requests |
| **Primary Goal** | Generate qualified leads |
| **Target User** | Potential clients interested in services |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ PAGE HERO                                                  │
│ Title: "Request a Quote"                                   │
├─────────────────────────────────────────────────────────────┤
│ QUOTE FORM                                                │
│ Multi-step or single form                                 │
│ - Service selection                                       │
│ - Personal info                                           │
│ - Project details                                         │
│ - Attachments                                             │
├─────────────────────────────────────────────────────────────┤
│ WHAT TO EXPECT                                            │
│ 3-step process explanation                                │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 15.1 Page Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 35vh (min 300px, max 400px) |
| **Background** | Secondary 500 |
| **Content** | H1 (White), Subtitle (White 80%) |

#### 15.2 Quote Form

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Layout** | Centered, max-width 800px |
| **Style** | Card with shadow |

**Form Sections:**

**Step 1 - Service Selection:**
- Service type (required, dropdown)
- Subservice (conditional)

**Step 2 - Personal Information:**
- Full name (required)
- Email (required)
- Phone (required)
- Company name (optional)

**Step 3 - Project Details:**
- Project type (required, dropdown)
- Budget range (required, dropdown)
- Timeline (required, dropdown)
- Location (required, text)
- Description (required, textarea)
- Attachments (optional, file upload)

**Step 4 - Agreement:**
- Terms checkbox (required)
- Privacy policy link

**Form Features:**
- Progress indicator (steps)
- Back/Next navigation
- Validation between steps
- Summary before submit

#### 15.3 What to Expect

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Background** | Gray 50 |
| **Layout** | 3 columns, 32px gap |
| **Content** | Numbered steps with icons |

**Steps:**
1. Submit Request - Fill out the form
2. Review - Our team reviews your request
3. Contact - We'll reach out within 24 hours

### CTA Placement

| Location | CTA | Type |
|----------|-----|------|
| Form | Submit Request | Primary Button |

### Accessibility Notes

- Multi-step has progress announcements
- Form has proper labels
- File upload has instructions

---

## 16. Search Results

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Display search results |
| **Primary Goal** | Help visitors find content |
| **Target User** | Anyone searching the site |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ SEARCH BAR                                                 │
│ Large input with query displayed                           │
├─────────────────────────────────────────────────────────────┤
│ RESULTS INFO                                              │
│ Result count, filter options                              │
├─────────────────────────────────────────────────────────────┤
│ RESULTS GRID                                              │
│ Mixed content types                                        │
│ Pagination                                                 │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 16.1 Search Bar

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 32px top/bottom |
| **Background** | Gray 50 |
| **Layout** | Centered, max-width 800px |
| **Input** | Large, pre-filled with query, clear button |

#### 16.2 Results Info

| Attribute | Specification |
|-----------|---------------|
| **Layout** | Left: Count, Right: Filter dropdown |
| **Count Text** | "X results for 'query'" |
| **Filters** | All, Services, Projects, Blog, Pages |

#### 16.3 Results Grid

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 48px top/bottom |
| **Layout** | List view |
| **Item Content** | Type icon, Title (link), Excerpt, Type badge |

**Result Types:**
- Service (icon: tool)
- Project (icon: building)
- Blog Post (icon: document)
- Page (icon: page)

**Highlight:**
- Matching text highlighted in yellow

#### 16.4 No Results

| Content | Specification |
|---------|---------------|
| **Icon** | Search icon, 64px, Gray 400 |
| **Title** | H3, "No results found" |
| **Message** | Body, Gray 500, suggestions |
| **Actions** | "Browse Services" link, "View Projects" link |

### Accessibility Notes

- Results announced to screen readers
- Filters have proper labels
- Highlighted text has aria-label

---

## 17. Privacy Policy

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Legal compliance |
| **Primary Goal** | Inform visitors about data handling |
| **Target User** | Anyone concerned about privacy |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ PAGE HERO                                                  │
│ Title: "Privacy Policy"                                    │
├─────────────────────────────────────────────────────────────┤
│ TABLE OF CONTENTS                                         │
│ Sticky sidebar with links                                  │
├─────────────────────────────────────────────────────────────┤
│ POLICY CONTENT                                            │
│ Numbered sections                                          │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 17.1 Page Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 30vh (min 250px, max 350px) |
| **Background** | Gray 900 |
| **Content** | H1 (White), Last updated date |

#### 17.2 Table of Contents

| Attribute | Specification |
|-----------|---------------|
| **Position** | Sticky sidebar (desktop) |
| **Content** | Numbered list of sections |
| **Behavior** | Highlights current section on scroll |

#### 17.3 Policy Content

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Layout** | Centered, max-width 800px |
| **Sections** | Numbered, with H2 headings |

**Sections:**
1. Introduction
2. Information We Collect
3. How We Use Your Information
4. Information Sharing
5. Data Security
6. Your Rights
7. Cookies Policy
8. Changes to This Policy
9. Contact Us

### Accessibility Notes

- Table of contents has skip links
- Sections have proper heading hierarchy
- Links to contact open contact page

---

## 18. Terms & Conditions

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Legal compliance |
| **Primary Goal** | Define terms of service |
| **Target User** | Anyone using the website |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│ PAGE HERO                                                  │
│ Title: "Terms & Conditions"                                │
├─────────────────────────────────────────────────────────────┤
│ TABLE OF CONTENTS                                         │
│ Sticky sidebar with links                                  │
├─────────────────────────────────────────────────────────────┤
│ TERMS CONTENT                                             │
│ Numbered sections                                          │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 18.1 Page Hero

| Attribute | Specification |
|-----------|---------------|
| **Height** | 30vh (min 250px, max 350px) |
| **Background** | Gray 900 |
| **Content** | H1 (White), Last updated date |

#### 18.2 Table of Contents

| Attribute | Specification |
|-----------|---------------|
| **Position** | Sticky sidebar (desktop) |
| **Content** | Numbered list of sections |

#### 18.3 Terms Content

| Attribute | Specification |
|-----------|---------------|
| **Padding** | 64px top/bottom |
| **Layout** | Centered, max-width 800px |
| **Sections** | Numbered, with H2 headings |

**Sections:**
1. Acceptance of Terms
2. Use of the Website
3. Intellectual Property
4. User Content
5. Links to Third-Party Sites
6. Limitation of Liability
7. Indemnification
8. Governing Law
9. Changes to Terms
10. Contact Information

### Accessibility Notes

- Same as Privacy Policy

---

## 19. 404 Page

### Page Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Handle broken links gracefully |
| **Primary Goal** | Keep visitor on site |
| **Target User** | Visitors with broken links |

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER (Simplified)                                        │
├─────────────────────────────────────────────────────────────┤
│ ERROR CONTENT                                             │
│ Centered, full viewport height                             │
│ - Illustration                                            │
│ - Error message                                           │
│ - Search bar                                              │
│ - Popular links                                           │
│ - Home button                                             │
├─────────────────────────────────────────────────────────────┤
│ FOOTER (Simplified)                                        │
└─────────────────────────────────────────────────────────────┘
```

### Section Specifications

#### 19.1 Error Content

| Attribute | Specification |
|-----------|---------------|
| **Height** | 70vh (min 500px) |
| **Layout** | Centered, max-width 600px |
| **Content** | Illustration, H1, Body text, Search, Links |

**Content:**
- Illustration: 404 error graphic, 200px
- H1: "Page Not Found" (Gray 900)
- Body: "Sorry, the page you're looking for doesn't exist." (Gray 500)
- Search: Input with search button
- Links: "Go to Homepage", "Browse Services", "View Projects"
- Button: "Go Home" (Primary)

**Animation Behavior:**
- Illustration fades in
- Text slides up
- Button pulses subtly

### Accessibility Notes

- Search is keyboard accessible
- Links have proper focus states
- Error message is descriptive

---

## 20. Thank You Pages

### Overview

Thank you pages confirm successful form submissions and provide next steps.

### 20.1 Quote Request Thank You

| Attribute | Specification |
|-----------|---------------|
| **Layout** | Centered, max-width 600px |
| **Content** | Success icon, H1, Reference number, Next steps, Links |

**Content:**
- Icon: Checkmark in circle, 80px, Success color
- H1: "Thank You for Your Request!"
- Reference: "Reference Number: RQ-2024-XXXXX"
- Message: "We've received your quote request. Our team will review it and contact you within 24 hours."
- Next Steps: Numbered list
- Links: "Back to Home", "Browse Services"

#### 20.2 Contact Thank You

| Attribute | Specification |
|-----------|---------------|
| **Layout** | Centered, max-width 600px |
| **Content** | Success icon, H1, Message, Links |

**Content:**
- Icon: Checkmark in circle
- H1: "Message Sent!"
- Message: "Thank you for contacting us. We'll respond to your inquiry as soon as possible."
- Links: "Back to Home", "Contact Us Again"

#### 20.3 Career Application Thank You

| Attribute | Specification |
|-----------|---------------|
| **Layout** | Centered, max-width 600px |
| **Content** | Success icon, H1, Message, Links |

**Content:**
- Icon: Checkmark in circle
- H1: "Application Submitted!"
- Message: "Thank you for your interest in joining our team. We'll review your application and contact you if your qualifications match our requirements."
- Links: "View Other Positions", "Back to Home"

#### 20.4 Newsletter Thank You

| Attribute | Specification |
|-----------|---------------|
| **Layout** | Centered, max-width 500px |
| **Content** | Success icon, H1, Message |

**Content:**
- Icon: Checkmark in circle
- H1: "You're Subscribed!"
- Message: "Thank you for subscribing to our newsletter. You'll receive our latest updates and insights."

### Animation Behavior

| Element | Animation |
|---------|-----------|
| Icon | Scale up + fade in (400ms) |
| Text | Fade in (300ms, 100ms delay) |
| Links | Fade in (300ms, 200ms delay) |

### Accessibility Notes

- Reference number is readable
- Next steps are clear
- Links are keyboard accessible

---

## Appendix A: Component State Summary

### Buttons

| State | Appearance |
|-------|------------|
| Default | Standard colors |
| Hover | Darker shade |
| Active | Darkest shade |
| Focus | Ring outline |
| Disabled | Grayed out, 0.6 opacity |
| Loading | Spinner, disabled |

### Form Inputs

| State | Appearance |
|-------|------------|
| Default | Gray 300 border |
| Hover | Gray 400 border |
| Focus | Primary 500 border, ring |
| Error | Error border, error icon, error message |
| Success | Success border, success icon |
| Disabled | Gray background, no interaction |

### Cards

| State | Appearance |
|-------|------------|
| Default | White, shadow DEFAULT |
| Hover | Shadow md, translateY(-2px) |
| Focus | Ring outline |

### Navigation

| State | Appearance |
|-------|------------|
| Default | Gray 600 text |
| Hover | Primary 500 text |
| Active | Primary 500 text, underline |

---

## Appendix B: Spacing Quick Reference

| Element | Spacing |
|---------|---------|
| Section padding (desktop) | 96px top/bottom |
| Section padding (mobile) | 64px top/bottom |
| Card padding | 24px |
| Grid gap (desktop) | 32px |
| Grid gap (mobile) | 16px |
| Component internal | 8px-16px |
| Page container | 64px (desktop), 24px (mobile) |

---

## Appendix C: Animation Quick Reference

| Animation | Duration | Easing |
|-----------|----------|--------|
| Hover color | 150ms | ease-out |
| Card hover | 200ms | ease-out |
| Modal open | 300ms | ease-out |
| Page fade | 200ms | ease-out |
| Skeleton shimmer | 1.5s | ease-in-out |
| Spinner | 1s | linear |

---

**Document Status:** Ready for Implementation  
**Next Phase:** UI Design & Development  
**Prepared By:** UI/UX Team  
**Review Date:** July 16, 2026