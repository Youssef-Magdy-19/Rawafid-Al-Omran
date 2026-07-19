# UX Specification: Rawafid Al Omran Contracting

**Document Date:** July 16, 2026  
**Document Version:** 1.0  
**Project:** Rawafid Al Omran Contracting Corporate Website  
**Scope:** Portfolio-quality commercial website with complete CMS Dashboard

---

## Table of Contents

1. Information Architecture
2. User Flows
3. Page Structure
4. CMS Screen Structure
5. Navigation
6. Search Experience
7. Mobile Experience
8. UX Best Practices

---

## 1. Information Architecture

### 1.1 Site Hierarchy

```
Rawafid Al Omran Contracting
├── Public Website
│   ├── Home (Landing Page)
│   ├── About Us
│   │   ├── Company Overview
│   │   ├── Mission & Vision
│   │   ├── History
│   │   └── Team
│   ├── Services
│   │   ├── Services Overview
│   │   └── Service Details (dynamic)
│   ├── Projects
│   │   ├── Projects Overview
│   │   └── Project Details (dynamic)
│   ├── Careers
│   │   ├── Careers Overview
│   │   └── Career Details (dynamic)
│   ├── Blog
│   │   ├── Blog Overview
│   │   └── Blog Post Details (dynamic)
│   ├── Testimonials
│   ├── Partners
│   ├── FAQ
│   ├── Contact
│   ├── Request Quote
│   ├── Privacy Policy
│   ├── Terms & Conditions
│   ├── Sitemap
│   └── 404 Page
│
├── Dashboard (CMS)
│   ├── Overview/Dashboard
│   ├── Content Management
│   │   ├── Pages
│   │   ├── Homepage Sections
│   │   ├── Services
│   │   ├── Projects
│   │   ├── Blog Posts
│   │   ├── Testimonials
│   │   ├── Partners
│   │   ├── FAQ
│   │   └── Team Members
│   ├── Career Management
│   │   ├── Job Listings
│   │   └── Applications
│   ├── Communication
│   │   ├── Messages
│   │   ├── Quote Requests
│   │   └── Newsletter Subscribers
│   ├── Media Library
│   ├── Website Settings
│   │   ├── General Settings
│   │   ├── SEO Settings
│   │   ├── Social Media
│   │   ├── Contact Information
│   │   └── Email Settings
│   ├── Appearance
│   │   ├── Menu Management
│   │   └── Homepage Sections
│   ├── User Management
│   │   ├── Users
│   │   ├── Roles
│   │   └── Permissions
│   ├── Analytics
│   ├── Activity Logs
│   └── Backup Management
│
└── Footer Content
    ├── About
    ├── Services Links
    ├── Quick Links
    ├── Contact Info
    ├── Social Media
    └── Legal Links
```

### 1.2 Page Relationships

| Parent Page | Child Pages | Related Pages |
|-------------|------------|---------------|
| Home | - | Services, Projects, About, Contact |
| About | Team | Careers, Contact |
| Services | Service Details | Projects (related), Contact |
| Projects | Project Details | Services (related), Contact |
| Careers | Career Details | Applications (CMS) |
| Blog | Blog Post Details | - |
| Contact | - | Request Quote, Careers |
| Request Quote | - | Contact, Projects |

### 1.3 Internal Linking Strategy

| Source Page | Link To | Anchor Text Suggestion |
|-------------|---------|----------------------|
| Home | Services | "Our Services" / "Explore Services" |
| Home | Projects | "View Projects" / "Our Portfolio" |
| Home | About | "Learn About Us" / "Our Story" |
| Home | Request Quote | "Get a Quote" / "Request Consultation" |
| Service Details | Related Projects | "Related Projects" / "See Our Work" |
| Service Details | Request Quote | "Request Quote for This Service" |
| Project Details | Related Services | "Related Services" |
| Project Details | Request Quote | "Start Your Project" |
| About | Team | "Meet Our Team" |
| About | Careers | "Join Our Team" |
| Footer | All Main Pages | Standard navigation |
| Blog Sidebar | Popular Services | "Popular Services" |
| Blog Sidebar | Recent Projects | "Recent Projects" |

---

## 2. User Flows

### 2.1 Visitor Browsing Services

```
Start → Home Page
    ↓
Click "Services" in Navigation
    ↓
Services Overview Page
    ↓
View service cards (grid/list)
    ↓
Filter by category (optional)
    ↓
Click on specific service
    ↓
Service Details Page
    ↓
View service description, features, process
    ↓
View related projects (if any)
    ↓
Click "Request Quote" CTA
    ↓
Request Quote Page (pre-filled service)
    ↓
Submit quote request
    ↓
Thank You Page
    ↓
Email confirmation sent
End
```

### 2.2 Visitor Viewing Projects

```
Start → Home Page
    ↓
Click "Projects" in Navigation
    ↓
Projects Overview Page
    ↓
View project cards (grid)
    ↓
Filter by category (optional)
    ↓
Filter by status (optional)
    ↓
Sort by date/name (optional)
    ↓
Click on specific project
    ↓
Project Details Page
    ↓
View project gallery, description, details
    ↓
View related services
    ↓
Click "Request Quote" CTA
    ↓
Request Quote Page
    ↓
Submit quote request
    ↓
Thank You Page
End
```

### 2.3 Visitor Requesting a Quote

```
Start → Request Quote Page (or CTA from any page)
    ↓
View quote request form
    ↓
Select service type (required)
    ↓
Enter personal information
    - Full name (required)
    - Email (required)
    - Phone (required)
    - Company name (optional)
    ↓
Enter project details
    - Project type (required)
    - Budget range (required)
    - Timeline (required)
    - Location (required)
    - Description (required)
    - Attachments (optional)
    ↓
Accept terms and privacy policy
    ↓
Submit form
    ↓
Client-side validation
    ↓
Server-side validation
    ↓
Save to database
    ↓
Send admin notification email
    ↓
Send client confirmation email
    ↓
Redirect to Thank You Page
    ↓
Display reference number
    ↓
Show next steps
End
```

### 2.4 Visitor Contacting the Company

```
Start → Contact Page (or footer link)
    ↓
View contact information
    - Address
    - Phone numbers
    - Email
    - Office hours
    - WhatsApp link
    ↓
Option A: Use contact form
    ↓
    Fill form
    - Name (required)
    - Email (required)
    - Phone (optional)
    - Subject (required)
    - Message (required)
    ↓
    Submit
    ↓
    Thank You Page
    ↓
    End
    ↓
Option B: Click WhatsApp button
    ↓
    Open WhatsApp with pre-filled message
    ↓
    End
    ↓
Option C: Click phone/email
    ↓
    Make call or open email client
    ↓
    End
```

### 2.5 Visitor Applying for a Job

```
Start → Careers Page
    ↓
View available positions
    ↓
Filter by department (optional)
    ↓
Click on position
    ↓
Career Details Page
    ↓
View job description, requirements, benefits
    ↓
Click "Apply Now" CTA
    ↓
Application Form
    ↓
Fill form
    - Full name (required)
    - Email (required)
    - Phone (required)
    - Position (pre-filled)
    - LinkedIn URL (optional)
    - Portfolio URL (optional)
    - Cover letter (optional)
    - Resume upload (required)
    ↓
Submit application
    ↓
Validation
    ↓
Save to database
    ↓
Send admin notification
    ↓
Send applicant confirmation
    ↓
Thank You Page
    ↓
End
```

### 2.6 Visitor Subscribing to Newsletter

```
Start → Newsletter signup (homepage, footer, or modal)
    ↓
Enter email address
    ↓
Click subscribe
    ↓
Validation (email format, not already subscribed)
    ↓
Save to database
    ↓
Send welcome email
    ↓
Show success message
    ↓
End
```

### 2.7 Visitor Searching the Website

```
Start → Click search icon
    ↓
Search modal/overlay opens
    ↓
Type search query
    ↓
Show search suggestions (real-time)
    ↓
Click search or press Enter
    ↓
View search results
    ↓
Filter results by type (optional)
    ↓
Click result
    ↓
Navigate to page
    ↓
End
```

### 2.8 Administrator CMS Workflows

#### 2.8.1 Content Creation Workflow

```
Login to Dashboard
    ↓
Navigate to content type (e.g., Blog Posts)
    ↓
Click "Add New"
    ↓
Fill content form
    - Title (AR + EN)
    - Content (AR + EN)
    - Featured image
    - Categories/Tags
    - SEO metadata
    - Status: Draft
    ↓
Save as Draft
    ↓
Preview content
    ↓
Edit if needed
    ↓
Click "Publish"
    ↓
Content goes live
    ↓
Success notification
End
```

#### 2.8.2 Quote Request Management Workflow

```
Login to Dashboard
    ↓
Navigate to Quote Requests
    ↓
View list of requests
    ↓
Filter by status (New, In Progress, Completed)
    ↓
Click on request
    ↓
View full details
    ↓
Update status
    ↓
Add internal notes
    ↓
Contact client (external)
    ↓
Mark as completed
    ↓
Archive request
End
```

#### 2.8.3 Career Application Review Workflow

```
Login to Dashboard
    ↓
Navigate to Applications
    ↓
View list of applications
    ↓
Filter by position, status, date
    ↓
Click on application
    ↓
View applicant details
    ↓
Download resume
    ↓
Update status (New, Reviewing, Interview, Hired, Rejected)
    ↓
Add interview notes
    ↓
Send status update email (optional)
    ↓
End
```

---

## 3. Page Structure

### 3.1 Home (Landing Page)

| Attribute | Description |
|-----------|-------------|
| **Purpose** | First impression, showcase value proposition, drive conversions |
| **Primary Goal** | Engage visitors, build trust, generate quote requests |
| **Target User** | All visitor types (villa owners, investors, companies, etc.) |
| **Main Sections** | Hero, Services Overview, Featured Projects, Statistics, Testimonials, Partners, CTA Banner, Latest Blog Posts |
| **CTA Buttons** | "Request Quote", "View Projects", "Contact Us" |
| **Expected Actions** | Scroll through content, click CTAs, view projects, subscribe to newsletter |
| **Exit Paths** | Navigate to other pages, close browser |

### 3.2 About Us

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Build trust, establish credibility, tell company story |
| **Primary Goal** | Help visitors understand who the company is and why to trust them |
| **Target User** | Potential clients researching the company |
| **Main Sections** | Company overview, Mission & Vision, History/Timeline, Team preview, Statistics |
| **CTA Buttons** | "Meet Our Team", "View Projects", "Contact Us" |
| **Expected Actions** | Learn about company, view team, explore history |
| **Exit Paths** | Services, Projects, Contact, Careers |

### 3.3 Team Page

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Humanize the company, showcase expertise |
| **Primary Goal** | Build trust through faces and credentials |
| **Target User** | Potential clients, partners, job seekers |
| **Main Sections** | Team grid, Individual member cards (photo, name, title, bio) |
| **CTA Buttons** | "Join Our Team", "Contact Us" |
| **Expected Actions** | View team members, read bios |
| **Exit Paths** | Careers, Contact |

### 3.4 Services Overview

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Present all services offered |
| **Primary Goal** | Help visitors find the service they need |
| **Target User** | Anyone looking for construction/engineering services |
| **Main Sections** | Services grid, Category filters, Service cards |
| **CTA Buttons** | "Learn More" on each service, "Request Quote" |
| **Expected Actions** | Browse services, filter by category, click for details |
| **Exit Paths** | Service Details, Request Quote, Contact |

### 3.5 Service Details

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Provide detailed information about a specific service |
| **Primary Goal** | Convince visitor this service meets their needs |
| **Target User** | Someone researching specific services |
| **Main Sections** | Service header, Description, Features/Benefits, Process, Related Projects, Related Services |
| **CTA Buttons** | "Request Quote", "View Related Projects" |
| **Expected Actions** | Read details, view related content, request quote |
| **Exit Paths** | Related Projects, Other Services, Contact |

### 3.6 Projects Overview

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Showcase completed work and portfolio |
| **Primary Goal** | Build credibility through visual proof |
| **Target User** | Potential clients evaluating quality |
| **Main Sections** | Projects grid, Category filter, Status filter, Sort options |
| **CTA Buttons** | "View Project" on each card |
| **Expected Actions** | Browse projects, filter/sort, click for details |
| **Exit Paths** | Project Details, Request Quote |

### 3.7 Project Details

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Showcase project details and results |
| **Primary Goal** | Demonstrate quality and expertise |
| **Target User** | Potential clients reviewing past work |
| **Main Sections** | Project header, Gallery, Description, Details (location, duration, scope), Related Services, Related Projects |
| **CTA Buttons** | "Request Quote", "View Similar Projects" |
| **Expected Actions** | View gallery, read details, request quote |
| **Exit Paths** | Related Projects, Services, Contact |

### 3.8 Careers Overview

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Attract potential candidates |
| **Primary Goal** | Fill open positions with qualified candidates |
| **Target User** | Job seekers in construction/engineering fields |
| **Main Sections** | Open positions list, Department filters, Company culture highlights |
| **CTA Buttons** | "Apply Now" on each position, "View All Positions" |
| **Expected Actions** | Browse positions, filter, apply |
| **Exit Paths** | Career Details, Application Form |

### 3.9 Career Details

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Provide full job details and requirements |
| **Primary Goal** | Encourage qualified candidates to apply |
| **Target User** | Job seekers interested in specific position |
| **Main Sections** | Job title, Department, Location, Description, Requirements, Benefits, How to Apply |
| **CTA Buttons** | "Apply Now", "View Other Positions" |
| **Expected Actions** | Read requirements, apply for position |
| **Exit Paths** | Application Form, Other Positions |

### 3.10 Blog Overview

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Share industry insights, company news |
| **Primary Goal** | Establish thought leadership, improve SEO |
| **Target User** | Industry professionals, potential clients, general audience |
| **Main Sections** | Blog posts grid, Category filters, Search, Recent posts sidebar |
| **CTA Buttons** | "Read More" on each post |
| **Expected Actions** | Browse posts, filter by category, read posts |
| **Exit Paths** | Blog Post Details |

### 3.11 Blog Post Details

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Deliver valuable content |
| **Primary Goal** | Engage readers, establish authority |
| **Target User** | Blog readers |
| **Main Sections** | Post header, Content, Author info, Share buttons, Related posts, Comments (if enabled) |
| **CTA Buttons** | Share, Subscribe to newsletter |
| **Expected Actions** | Read content, share, explore related posts |
| **Exit Paths** | Related Posts, Newsletter Signup |

### 3.12 Testimonials

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Build trust through social proof |
| **Primary Goal** | Convince visitors to take action |
| **Target User** | Potential clients researching company |
| **Main Sections** | Testimonials grid, Client info (name, company, photo), Video testimonials (if any) |
| **CTA Buttons** | "View Projects", "Request Quote" |
| **Expected Actions** | Read testimonials, view related projects |
| **Exit Paths** | Projects, Request Quote |

### 3.13 Partners

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Showcase collaborations and credibility |
| **Primary Goal** | Build trust through association |
| **Target User** | Potential clients, partners |
| **Main Sections** | Partner logos grid, Partner categories |
| **CTA Buttons** | "View Projects", "Contact Us" |
| **Expected Actions** | View partners, learn about collaborations |
| **Exit Paths** | Projects, Contact |

### 3.14 FAQ

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Answer common questions |
| **Primary Goal** | Reduce support burden, help visitors |
| **Target User** | Anyone with questions |
| **Main Sections** | FAQ categories, Accordion-style Q&A |
| **CTA Buttons** | "Contact Us" for unanswered questions |
| **Expected Actions** | Browse/search FAQs, expand answers |
| **Exit Paths** | Contact, Services |

### 3.15 Contact

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Provide contact options |
| **Primary Goal** | Make it easy to reach the company |
| **Target User** | Anyone needing to contact the company |
| **Main Sections** | Contact form, Contact info, Map, Office hours, WhatsApp button |
| **CTA Buttons** | Submit form, Start WhatsApp chat |
| **Expected Actions** | Submit inquiry, call, email, or WhatsApp |
| **Exit Paths** | Request Quote, Careers |

### 3.16 Request Quote

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Capture quote requests |
| **Primary Goal** | Generate qualified leads |
| **Target User** | Potential clients interested in services |
| **Main Sections** | Quote form, Service selection, Project details |
| **CTA Buttons** | Submit request |
| **Expected Actions** | Fill form, submit request |
| **Exit Paths** | Thank You Page, Contact |

### 3.17 Privacy Policy

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Legal compliance |
| **Primary Goal** | Inform visitors about data handling |
| **Target User** | Anyone concerned about privacy |
| **Main Sections** | Data collection, Usage, Protection, Rights |
| **CTA Buttons** | None |
| **Expected Actions** | Read policy |
| **Exit Paths** | Home, Contact |

### 3.18 Terms & Conditions

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Legal compliance |
| **Primary Goal** | Define terms of service |
| **Target User** | Anyone using the website |
| **Main Sections** | Terms, Conditions, Disclaimers |
| **CTA Buttons** | None |
| **Expected Actions** | Read terms |
| **Exit Paths** | Home, Contact |

### 3.19 404 Page

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Handle broken links gracefully |
| **Primary Goal** | Keep visitor on site |
| **Target User** | Visitors with broken links |
| **Main Sections** | Friendly error message, Search bar, Popular links, Home link |
| **CTA Buttons** | "Go Home", "Search" |
| **Expected Actions** | Navigate to home, search, or click popular link |
| **Exit Paths** | Home, Search, Popular Pages |

### 3.20 Thank You Pages

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Confirm successful action |
| **Primary Goal** | Provide confirmation and next steps |
| **Target User** | Users who submitted forms |
| **Main Sections** | Success message, Reference number, Next steps, Related links |
| **CTA Buttons** | "Back to Home", "View [Related Content]" |
| **Expected Actions** | Note reference, explore site |
| **Exit Paths** | Home, Related Pages |

---

## 4. CMS Screen Structure

### 4.1 Dashboard Overview

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Central hub showing key metrics and quick actions |
| **Main Widgets** | Recent activity, Pending items, Quick stats, Quick actions |
| **Expected Data** | Quote requests count, New applications, Recent messages, Page views chart |
| **Actions** | View details, Quick add, Navigate to sections |

### 4.2 Projects Management

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Manage project portfolio |
| **Main Actions** | Add, Edit, Delete, Duplicate, Publish, Unpublish |
| **Expected Table Columns** | Image, Title, Category, Status, Date, Actions |
| **Filters** | Category, Status, Date range |
| **Forms** | Project form (title, description, gallery, details, SEO) |
| **Bulk Actions** | Delete, Publish, Unpublish, Change category |
| **Empty State** | "No projects yet. Click 'Add New' to create your first project." |
| **Success State** | "Project saved successfully" |
| **Error State** | "Failed to save project. Please try again." |

### 4.3 Services Management

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Manage services offered |
| **Main Actions** | Add, Edit, Delete, Reorder, Publish, Unpublish |
| **Expected Table Columns** | Icon/Image, Title, Category, Order, Status, Actions |
| **Filters** | Category, Status |
| **Forms** | Service form (title, description, features, process, related projects, SEO) |
| **Bulk Actions** | Delete, Publish, Unpublish |
| **Empty State** | "No services yet. Add your first service to get started." |
| **Success State** | "Service saved successfully" |
| **Error State** | "Failed to save service. Please try again." |

### 4.4 Blog Management

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Manage blog content |
| **Main Actions** | Add, Edit, Delete, Publish, Unpublish, Schedule |
| **Expected Table Columns** | Featured Image, Title, Author, Category, Status, Date, Actions |
| **Filters** | Category, Author, Status, Date range |
| **Forms** | Post form (title, content, featured image, categories, tags, SEO, author) |
| **Bulk Actions** | Delete, Publish, Unpublish, Change category |
| **Empty State** | "No blog posts yet. Start writing to share your insights." |
| **Success State** | "Post published successfully" |
| **Error State** | "Failed to publish post. Please check your content." |

### 4.5 Career Management

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Manage job listings and applications |
| **Main Actions** | Add/Edit Job, Delete Job, Update Application Status |
| **Expected Tables** | Jobs list, Applications list |
| **Job Table Columns** | Title, Department, Location, Status, Posted Date, Applications Count, Actions |
| **Application Table Columns** | Name, Email, Position, Status, Date, Resume, Actions |
| **Filters** | Position, Status, Date range |
| **Forms** | Job form (title, description, requirements, benefits, department, location) |
| **Bulk Actions** | Delete jobs, Change status |
| **Empty State** | "No job listings. Create your first position to start receiving applications." |
| **Success State** | "Application status updated" |
| **Error State** | "Failed to update application. Please try again." |

### 4.6 Quote Requests

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Manage incoming quote requests |
| **Main Actions** | View, Update Status, Add Notes, Export, Delete |
| **Expected Table Columns** | Reference #, Client Name, Service, Status, Date, Actions |
| **Filters** | Status, Date range, Service type |
| **Detail View** | Full request details, Client info, Project details, Attachments, Internal notes |
| **Status Options** | New, In Progress, Completed, Cancelled |
| **Bulk Actions** | Mark as read, Export |
| **Empty State** | "No quote requests yet. Requests will appear here when submitted." |
| **Success State** | "Request status updated" |
| **Error State** | "Failed to update request. Please try again." |

### 4.7 Messages (Contact Form Submissions)

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Manage contact form submissions |
| **Main Actions** | View, Mark as Read, Reply, Delete, Export |
| **Expected Table Columns** | Subject, Sender Name, Email, Status, Date, Actions |
| **Filters** | Status, Date range |
| **Detail View** | Full message, Sender info, Reply option |
| **Bulk Actions** | Mark as read, Delete |
| **Empty State** | "No messages yet. Messages from the contact form will appear here." |

### 4.8 Media Library

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Manage all media files |
| **Main Actions** | Upload, Delete, Copy URL, Edit Alt Text |
| **Expected Display** | Grid view with thumbnails |
| **Filters** | Type (image, video, document), Date |
| **Upload** | Drag & drop, Browse files, Multi-file upload |
| **File Info** | Name, Size, Dimensions, Upload date, Alt text |
| **Empty State** | "No media files. Upload images, videos, or documents to use in your content." |
| **Success State** | "File uploaded successfully" |
| **Error State** | "Upload failed. File type not supported or size too large." |

### 4.9 Users Management

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Manage admin users |
| **Main Actions** | Add User, Edit User, Delete User, Reset Password |
| **Expected Table Columns** | Avatar, Name, Email, Role, Status, Last Login, Actions |
| **Filters** | Role, Status |
| **Forms** | User form (name, email, role, avatar) |
| **Bulk Actions** | Delete, Change role, Activate/Deactivate |
| **Empty State** | "No users yet. Add your first admin user to get started." |
| **Success State** | "User created successfully" |
| **Error State** | "Failed to create user. Email may already exist." |

### 4.10 Roles & Permissions

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Define user roles and permissions |
| **Main Actions** | Add Role, Edit Role, Delete Role |
| **Expected Table Columns** | Role Name, Description, Users Count, Actions |
| **Permissions Categories** | Content, Media, Users, Settings, Analytics |
| **Default Roles** | Super Admin, Admin, Editor, Viewer |
| **Empty State** | "Default roles are provided. You can customize permissions as needed." |

### 4.11 Website Settings

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Configure general website settings |
| **Sections** | General (site name, logo, favicon), Contact Info, Social Media, Email Settings |
| **Forms** | Settings forms with validation |
| **Save Actions** | Save, Save & Publish |
| **Success State** | "Settings saved successfully" |
| **Error State** | "Failed to save settings. Please check your input." |

### 4.12 SEO Settings

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Configure global SEO settings |
| **Sections** | Global meta tags, Open Graph, Sitemap settings, Robots.txt |
| **Forms** | Text inputs, Textareas, Toggles |
| **Save Actions** | Save changes |
| **Success State** | "SEO settings saved" |

### 4.13 Homepage Sections

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Manage homepage content sections |
| **Main Actions** | Reorder, Enable/Disable, Edit Content |
| **Expected Sections** | Hero, Services Preview, Featured Projects, Statistics, Testimonials, Partners, CTA Banner, Blog Preview |
| **Drag & Drop** | Reorder sections |
| **Toggle** | Enable/disable sections |
| **Edit** | Open section editor |
| **Success State** | "Section order updated" |

### 4.14 Menu Management

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Configure navigation menus |
| **Main Actions** | Add Item, Edit Item, Delete Item, Reorder |
| **Menu Types** | Main Navigation, Footer Navigation, Mobile Navigation |
| **Item Fields** | Label, URL, Parent (for dropdowns), Icon |
| **Drag & Drop** | Reorder items, Create nested items |
| **Success State** | "Menu saved successfully" |

### 4.15 Analytics

| Attribute | Description |
|-----------|-------------|
| **Purpose** | View website analytics |
| **Expected Data** | Page views, Unique visitors, Top pages, Traffic sources, User locations |
| **Charts** | Line charts (over time), Bar charts (comparisons), Pie charts (distributions) |
| **Date Range** | Selectable date range filter |
| **Export** | Export data as CSV |

### 4.16 Activity Logs

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Track user activity in CMS |
| **Expected Table Columns** | User, Action, Item, Date/Time, IP Address |
| **Filters** | User, Action type, Date range |
| **Actions** | View details, Export logs |
| **Retention** | Configurable log retention period |

### 4.17 Newsletter Subscribers

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Manage newsletter subscribers |
| **Main Actions** | View, Export, Delete, Send Email |
| **Expected Table Columns** | Email, Name, Status, Subscribed Date, Actions |
| **Filters** | Status, Date range |
| **Bulk Actions** | Export, Delete |
| **Empty State** | "No subscribers yet. Subscribers will appear here when they sign up." |

### 4.18 Testimonials Management

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Manage client testimonials |
| **Main Actions** | Add, Edit, Delete, Approve, Feature |
| **Expected Table Columns** | Client Photo, Client Name, Content Preview, Status, Featured, Actions |
| **Filters** | Status, Featured |
| **Forms** | Testimonial form (client name, company, photo, content, rating) |
| **Bulk Actions** | Delete, Approve, Feature |
| **Empty State** | "No testimonials yet. Add testimonials to build trust with visitors." |

### 4.19 Partners Management

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Manage partner logos |
| **Main Actions** | Add, Edit, Delete, Reorder |
| **Expected Table Columns** | Logo, Name, Website, Order, Actions |
| **Filters** | None |
| **Forms** | Partner form (name, logo, website URL) |
| **Bulk Actions** | Delete, Reorder |
| **Empty State** | "No partners yet. Add partner logos to showcase collaborations." |

### 4.20 FAQ Management

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Manage FAQ content |
| **Main Actions** | Add, Edit, Delete, Reorder |
| **Expected Table Columns** | Question, Category, Order, Status, Actions |
| **Filters** | Category, Status |
| **Forms** | FAQ form (question, answer, category, order) |
| **Bulk Actions** | Delete, Reorder |
| **Empty State** | "No FAQs yet. Add frequently asked questions to help visitors." |

### 4.21 Team Members Management

| Attribute | Description |
|-----------|-------------|
| **Purpose** | Manage team member profiles |
| **Main Actions** | Add, Edit, Delete, Reorder |
| **Expected Table Columns** | Photo, Name, Title, Department, Order, Actions |
| **Filters** | Department |
| **Forms** | Team member form (name, title, bio, photo, department, social links) |
| **Bulk Actions** | Delete, Reorder |
| **Empty State** | "No team members yet. Add your team to humanize your company." |

---

## 5. Navigation

### 5.1 Public Website Navigation

#### Desktop Navigation

| Element | Description |
|---------|-------------|
| **Logo** | Left-aligned, links to home |
| **Main Menu** | Center-aligned |
| **Menu Items** | Home, About, Services, Projects, Careers, Blog, Contact |
| **Language Switcher** | AR/EN toggle, right side |
| **Theme Toggle** | Light/Dark mode, right side |
| **CTA Button** | "Request Quote" button, right side |
| **Dropdown Menus** | Services, Projects, Careers, Blog have dropdowns |
| **Mobile Menu** | Hamburger icon, opens full-screen menu |

#### Mobile Navigation

| Element | Description |
|---------|-------------|
| **Logo** | Left-aligned |
| **Menu Icon** | Right-aligned hamburger |
| **Full-screen Menu** | Opens on tap |
| **Accordion Submenus** | Expandable sections |
| **Language Switcher** | Top of menu |
| **Theme Toggle** | Top of menu |
| **Close Button** | X icon to close |

### 5.2 Dashboard Navigation

#### Sidebar Navigation

| Section | Items |
|---------|-------|
| **Dashboard** | Overview |
| **Content** | Pages, Homepage Sections, Services, Projects, Blog Posts, Testimonials, Partners, FAQ, Team |
| **Careers** | Job Listings, Applications |
| **Communication** | Messages, Quote Requests, Newsletter |
| **Media** | Media Library |
| **Appearance** | Menus |
| **Settings** | General, SEO, Social Media, Contact, Email |
| **Users** | Users, Roles |
| **Tools** | Analytics, Activity Logs, Backup |
| **User Menu** | Profile, Settings, Logout |

#### Breadcrumb Strategy

| Location | Breadcrumb Format |
|----------|-------------------|
| Dashboard Home | Dashboard |
| List Page | Dashboard > [Section] |
| Detail Page | Dashboard > [Section] > [Item Name] |
| Edit Page | Dashboard > [Section] > [Item Name] > Edit |
| Settings | Dashboard > Settings > [Setting Name] |

### 5.3 Footer Navigation

| Column | Links |
|--------|-------|
| **Company** | About Us, Team, Careers, Contact |
| **Services** | All Services (links to Services page) |
| **Resources** | Blog, FAQ, Sitemap |
| **Legal** | Privacy Policy, Terms & Conditions |
| **Contact** | Address, Phone, Email, WhatsApp |
| **Social** | Social media links with icons |
| **Newsletter** | Email input with subscribe button |

### 5.4 Breadcrumb Strategy (Public Website)

| Page | Breadcrumb |
|------|------------|
| Home | Home |
| About | Home > About Us |
| Services | Home > Services |
| Service Details | Home > Services > [Service Name] |
| Projects | Home > Projects |
| Project Details | Home > Projects > [Project Name] |
| Careers | Home > Careers |
| Career Details | Home > Careers > [Job Title] |
| Blog | Home > Blog |
| Blog Post | Home > Blog > [Post Title] |
| Contact | Home > Contact |
| Request Quote | Home > Request Quote |

---

## 6. Search Experience

### 6.1 Search Entry Points

| Location | Element |
|----------|---------|
| Header | Search icon button |
| Mobile Menu | Search icon |
| Dashboard | Search bar in header |
| 404 Page | Search input field |

### 6.2 Search Modal/Overlay

| Element | Description |
|---------|-------------|
| **Trigger** | Click search icon or Cmd/Ctrl + K |
| **Appearance** | Centered modal with backdrop blur |
| **Input** | Large search input with placeholder |
| **Suggestions** | Real-time suggestions as user types |
| **Recent Searches** | Show recent searches when input is empty |
| **Popular Searches** | Show popular searches when input is empty |
| **Close** | Click outside, press Escape, or click X |

### 6.3 Search Filters

| Filter Type | Options |
|-------------|---------|
| **Content Type** | All, Services, Projects, Blog, Pages |
| **Language** | Arabic, English |

### 6.4 Search Results

| Element | Description |
|---------|-------------|
| **Layout** | List view with thumbnails |
| **Result Item** | Title, Excerpt, Content Type Badge, Thumbnail |
| **Highlight** | Search term highlighted in results |
| **Pagination** | Load more button or infinite scroll |
| **No Results** | Friendly message with suggestions |

### 6.5 Empty Results State

| Element | Description |
|---------|-------------|
| **Message** | "No results found for '[query]'" |
| **Suggestions** | "Try different keywords" |
| **Popular Links** | Show popular pages |
| **Search Again** | Input field to retry |

### 6.6 Search Suggestions

| Type | Description |
|------|-------------|
| **Recent Searches** | Last 5 searches (stored locally) |
| **Popular Searches** | Most common search terms |
| **Instant Results** | Pages matching as user types |
| **Category Suggestions** | Suggest category names |

---

## 7. Mobile Experience

### 7.1 Mobile Navigation

| Element | Description |
|---------|-------------|
| **Header** | Logo (left), Menu icon (right) |
| **Menu** | Full-screen overlay |
| **Menu Items** | Stacked vertically with clear spacing |
| **Submenus** | Accordion-style expansion |
| **Language Switcher** | Top of menu |
| **Theme Toggle** | Top of menu |
| **Close** | X button or swipe down |

### 7.2 Mobile Menus

| Pattern | Usage |
|---------|-------|
| **Hamburger Menu** | Primary navigation |
| **Bottom Navigation** | Optional for key actions |
| **Tab Bar** | For multi-section content (e.g., project details) |

### 7.3 Mobile Tables (Dashboard)

| Pattern | Implementation |
|---------|---------------|
| **Horizontal Scroll** | Scrollable table with sticky first column |
| **Card View** | Transform table rows to cards |
| **Collapse Columns** | Show essential columns, expand for details |
| **Swipe Actions** | Swipe to reveal actions (edit, delete) |

### 7.4 Mobile Forms

| Pattern | Implementation |
|---------|---------------|
| **Full-width Inputs** | 100% width for easy tapping |
| **Large Touch Targets** | Minimum 44x44px |
| **Appropriate Keyboards** | Email keyboard for email, phone for phone |
| **Inline Validation** | Show errors as user types |
| **Floating Labels** | Label above input |
| **Grouped Sections** | Visual separation between groups |

### 7.5 Dashboard Responsiveness

| Breakpoint | Layout |
|------------|--------|
| **Desktop (>1024px)** | Full sidebar, multi-column layouts |
| **Tablet (768-1024px)** | Collapsible sidebar, adjusted grids |
| **Mobile (<768px)** | Bottom navigation, single column, card views |

### 7.6 Mobile-Specific Considerations

| Aspect | Consideration |
|--------|---------------|
| **Touch Targets** | Minimum 44x44px for all interactive elements |
| **Thumb Zone** | Primary actions in thumb-friendly areas |
| **Gestures** | Swipe for navigation, pull to refresh |
| **Loading** | Skeleton screens for perceived performance |
| **Offline** | Show cached content when offline |
| **Network** | Lazy load images, show placeholders |

---

## 8. UX Best Practices

### 8.1 Accessibility (WCAG 2.1 AA)

| Requirement | Implementation |
|-------------|----------------|
| **Color Contrast** | Minimum 4.5:1 for normal text, 3:1 for large text |
| **Focus Indicators** | Visible focus ring on all interactive elements |
| **Keyboard Navigation** | All functionality accessible via keyboard |
| **Screen Reader** | Proper ARIA labels, landmarks, headings |
| **Skip Links** | "Skip to main content" link |
| **Alt Text** | All images have descriptive alt text |
| **Form Labels** | All inputs have associated labels |
| **Error Identification** | Errors described in text, not just color |
| **Resizable Text** | Support up to 200% zoom |

### 8.2 Loading States

| Type | Usage |
|------|-------|
| **Full Page** | Centered spinner with logo |
| **Inline** | Small spinner next to button |
| **List Loading** | Skeleton cards |
| **Image Loading** | Blur-up or placeholder |

### 8.3 Skeleton Screens

| Usage | Description |
|-------|-------------|
| **Lists** | Animated gray rectangles matching content layout |
| **Cards** | Skeleton card with image, title, text placeholders |
| **Tables** | Skeleton rows with animated gradient |
| **Text** | Multiple lines of varying width |
| **Animation** | Subtle shimmer effect left to right |

### 8.4 Empty States

| Type | Content |
|------|---------|
| **No Data** | Friendly illustration, message, primary action |
| **No Results** | Message, suggestions, search again option |
| **No Content** | Prompt to create first item |
| **Error** | Friendly error message, retry option |

### 8.5 Error States

| Type | Implementation |
|------|----------------|
| **Form Validation** | Inline error messages below fields, red border |
| **API Errors** | Toast notification or inline message |
| **Page Errors** | Custom error page with navigation options |
| **Network Errors** | Offline indicator, retry button |
| **404** | Custom page with search and popular links |

### 8.6 Confirmation Dialogs

| Type | Usage |
|------|-------|
| **Delete** | "Are you sure? This action cannot be undone." |
| **Discard** | "You have unsaved changes. Discard?" |
| **Publish** | "Ready to publish? This will make it visible." |
| **Bulk Action** | "Delete X items? This cannot be undone." |

### 8.7 Success Messages

| Type | Implementation |
|------|----------------|
| **Toast** | Top-right, auto-dismiss after 5 seconds |
| **Inline** | Below form, green text with checkmark |
| **Redirect** | Success page with next steps |

### 8.8 Delete Confirmation

| Element | Content |
|---------|---------|
| **Title** | "Delete [Item Name]?" |
| **Message** | "This action cannot be undone. The item will be permanently deleted." |
| **Actions** | Cancel (secondary), Delete (danger) |
| **Icon** | Warning icon |

### 8.9 Pagination

| Type | Usage |
|------|-------|
| **Numbered** | Page numbers with prev/next |
| **Load More** | Button to load additional items |
| **Infinite Scroll** | Auto-load on scroll (with scroll-to-top button) |
| **Per Page Selector** | Dropdown to change items per page |

### 8.10 Sorting

| Type | Implementation |
|------|----------------|
| **Column Headers** | Click to sort, arrow indicator |
| **Dropdown** | Sort options in dropdown |
| **Default** | Clear default sort order |
| **State** | Persist sort preference |

### 8.11 Filtering

| Type | Implementation |
|------|----------------|
| **Sidebar Filters** | Checkboxes, collapsible sections |
| **Dropdown Filters** | Single or multi-select |
| **Tag Filters** | Removable filter tags |
| **Clear All** | Button to reset filters |
| **URL State** | Filters reflected in URL |

### 8.12 Additional Best Practices

| Practice | Description |
|----------|-------------|
| **Micro-interactions** | Subtle animations on hover, click |
| **Transitions** | Smooth page transitions |
| **Feedback** | Immediate feedback on all actions |
| **Consistency** | Consistent patterns across all pages |
| **Performance** | Perceived performance through loading states |
| **Progressive Disclosure** | Show advanced options on demand |
| **Undo Actions** | Allow undo for destructive actions |
| **Auto-save** | Auto-save drafts periodically |

---

## Appendix A: Page List

### Public Pages (19 total)

1. Home (Landing Page)
2. About Us
3. Team
4. Services Overview
5. Service Details
6. Projects Overview
7. Project Details
8. Careers Overview
9. Career Details
10. Blog Overview
11. Blog Post Details
12. Testimonials
13. Partners
14. FAQ
15. Contact
16. Request Quote
17. Privacy Policy
18. Terms & Conditions
19. 404 Page

### Thank You Pages (4 total)

20. Quote Request Thank You
21. Contact Thank You
22. Career Application Thank You
23. Newsletter Subscription Thank You

### CMS Pages (25+ modules)

1. Dashboard Overview
2. Projects Management
3. Services Management
4. Blog Management
5. Careers Management
6. Applications Management
7. Messages
8. Quote Requests
9. Newsletter Subscribers
10. Media Library
11. Testimonials Management
12. Partners Management
13. FAQ Management
14. Team Members Management
15. Homepage Sections
16. Menu Management
17. Users Management
18. Roles & Permissions
19. Website Settings
20. SEO Settings
21. Social Media Settings
22. Contact Information
23. Email Settings
24. Analytics
25. Activity Logs
26. Backup Management

---

**Document Status:** Ready for UI Design Phase  
**Next Phase:** UI/Visual Design  
**Prepared By:** UX Team  
**Review Date:** July 16, 2026