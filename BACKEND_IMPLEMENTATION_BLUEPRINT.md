# Backend Implementation Blueprint

**Document Date:** July 16, 2026  
**Document Version:** 1.0  
**Project:** Rawafid Al Omran Contracting Corporate Website  
**Purpose:** Final implementation guide - architecture is now frozen

---

## Table of Contents

1. [MongoDB Collections Overview](#1-mongodb-collections-overview)
2. [Folder Structure](#2-folder-structure)
3. [Request/Response Examples](#3-requestresponse-examples)
4. [API Conventions](#4-api-conventions)
5. [Authentication Integration Points](#5-authentication-integration-points)
6. [Implementation Order](#6-implementation-order)
7. [Issues Resolved](#7-issues-resolved)
8. [Project Checklist](#8-project-checklist)

---

## 1. MongoDB Collections Overview

### Collections Summary

| Collection | Purpose | Localization | Main Fields |
|------------|---------|-------------|-------------|
| `services` | Service offerings | Yes | title, slug, description, category, icon, features, images |
| `projects` | Portfolio items | Yes | title, slug, description, category, status, tags, client, location, gallery |
| `teammembers` | Team profiles | Yes | name, slug, title, department, bio, photo, social links |
| `blogposts` | Blog articles | Yes | title, slug, content, category, tags, author, featuredImage, publishedAt |
| `careers` | Job listings | Yes | title, slug, department, location, type, requirements, benefits, salary |
| `testimonials` | Client testimonials | Yes | quote, clientName, company, rating, avatar, video |
| `partners` | Partner logos | Yes | name, description, category, website, logo |
| `faqs` | FAQ items | Yes | question, answer, category |
| `contacts` | Contact submissions | No | name, email, phone, subject, message, status |
| `quotes` | Quote requests | No | serviceType, name, email, phone, description, status, referenceNumber |
| `newsletters` | Email subscriptions | No | email, isActive, isVerified, verificationToken |
| `settings` | Site configuration | No | siteName, contact, social, logo, seoDefaults |
| `seos` | SEO configurations | No | page, locale, title, description, ogImage, structuredData |
| `media` | Uploaded files | No | filename, url, mimeType, size, folder, alt |
| `users` | Admin users | No | email, password, name, role, permissions |

### Relationships

```
projects → services (many-to-many via array of ObjectIds)
projects → projects (many-to-many via relatedProjects array)
blogposts → team (author reference via embedded object)
media → all collections (usedIn tracks usage)
```

### Critical Indexes

| Collection | Indexes (Critical Only) |
|------------|------------------------|
| services | `{ slug: 1, isDeleted: 1 }` (unique), `{ category: 1, isDeleted: 1 }` |
| projects | `{ slug: 1, isDeleted: 1 }` (unique), `{ category: 1, status: 1 }` |
| blogposts | `{ slug: 1, isDeleted: 1 }` (unique), `{ publishedAt: -1 }` |
| careers | `{ slug: 1, isDeleted: 1 }` (unique), `{ isActive: 1 }` |
| team | `{ slug: 1, isDeleted: 1 }` (unique) |
| contacts | `{ email: 1 }` |
| quotes | `{ referenceNumber: 1 }` (unique) |
| newsletters | `{ email: 1 }` (unique) |
| media | `{ publicId: 1 }` |
| seos | `{ page: 1, locale: 1 }` (unique) |

---

## 2. Folder Structure

```
src/
├── app.ts                          # Express app setup
├── server.ts                       # Entry point
│
├── config/
│   ├── index.ts                    # Config loader
│   ├── database.ts                 # MongoDB connection
│   ├── cloudinary.ts                # Cloudinary setup
│   └── mail.ts                      # Nodemailer setup
│
├── routes/
│   ├── index.ts                    # Route aggregator
│   └── v1/
│       ├── index.ts
│       ├── home.routes.ts
│       ├── services.routes.ts
│       ├── projects.routes.ts
│       ├── team.routes.ts
│       ├── blog.routes.ts
│       ├── careers.routes.ts
│       ├── testimonials.routes.ts
│       ├── partners.routes.ts
│       ├── faq.routes.ts
│       ├── contact.routes.ts
│       ├── quote.routes.ts
│       ├── newsletter.routes.ts
│       ├── search.routes.ts
│       ├── settings.routes.ts
│       ├── seo.routes.ts
│       └── media.routes.ts
│
├── controllers/
│   └── v1/
│       ├── home.controller.ts
│       ├── services.controller.ts
│       ├── projects.controller.ts
│       ├── team.controller.ts
│       ├── blog.controller.ts
│       ├── careers.controller.ts
│       ├── testimonials.controller.ts
│       ├── partners.controller.ts
│       ├── faq.controller.ts
│       ├── contact.controller.ts
│       ├── quote.controller.ts
│       ├── newsletter.controller.ts
│       ├── search.controller.ts
│       ├── settings.controller.ts
│       ├── seo.controller.ts
│       └── media.controller.ts
│
├── services/
│   └── v1/
│       ├── home.service.ts
│       ├── services.service.ts
│       ├── projects.service.ts
│       ├── team.service.ts
│       ├── blog.service.ts
│       ├── careers.service.ts
│       ├── testimonials.service.ts
│       ├── partners.service.ts
│       ├── faq.service.ts
│       ├── contact.service.ts
│       ├── quote.service.ts
│       ├── newsletter.service.ts
│       ├── search.service.ts
│       ├── settings.service.ts
│       ├── seo.service.ts
│       └── media.service.ts
│
├── repositories/
│   └── v1/
│       ├── services.repository.ts
│       ├── projects.repository.ts
│       ├── team.repository.ts
│       ├── blog.repository.ts
│       ├── careers.repository.ts
│       ├── testimonials.repository.ts
│       ├── partners.repository.ts
│       ├── faq.repository.ts
│       ├── contact.repository.ts
│       ├── quote.repository.ts
│       ├── newsletter.repository.ts
│       ├── settings.repository.ts
│       ├── seo.repository.ts
│       └── media.repository.ts
│
├── models/
│   ├── index.ts
│   ├── Service.model.ts
│   ├── Project.model.ts
│   ├── TeamMember.model.ts
│   ├── BlogPost.model.ts
│   ├── Career.model.ts
│   ├── Testimonial.model.ts
│   ├── Partner.model.ts
│   ├── FAQ.model.ts
│   ├── Contact.model.ts
│   ├── Quote.model.ts
│   ├── Newsletter.model.ts
│   ├── Settings.model.ts
│   ├── SEO.model.ts
│   └── Media.model.ts
│
├── schemas/
│   ├── index.ts
│   ├── service.schema.ts
│   ├── project.schema.ts
│   ├── blog.schema.ts
│   ├── career.schema.ts
│   ├── contact.schema.ts
│   ├── quote.schema.ts
│   └── newsletter.schema.ts
│
├── middlewares/
│   ├── index.ts
│   ├── error.middleware.ts
│   ├── notFound.middleware.ts
│   ├── validate.middleware.ts
│   ├── rateLimit.middleware.ts
│   ├── cors.middleware.ts
│   ├── helmet.middleware.ts
│   ├── compression.middleware.ts
│   ├── morgan.middleware.ts
│   └── sanitize.middleware.ts
│
├── utils/
│   ├── index.ts
│   ├── asyncHandler.ts
│   ├── slugify.ts
│   ├── paginate.ts
│   ├── ApiError.ts
│   ├── ApiResponse.ts
│   └── logger.ts
│
├── errors/
│   ├── index.ts
│   ├── AppError.ts
│   ├── ValidationError.ts
│   ├── NotFoundError.ts
│   └── ConflictError.ts
│
├── mail/
│   ├── index.ts
│   ├── transporter.ts
│   ├── templates/
│   │   ├── contact.template.ts
│   │   ├── quote.template.ts
│   │   └── newsletter.template.ts
│   └── send.ts
│
├── logger/
│   ├── index.ts
│   └── logger.ts
│
└── types/
    ├── index.ts
    ├── express.ts
    └── pagination.ts
```

---

## 3. Request/Response Examples

### 3.1 Services Endpoints

#### GET /api/v1/services

**Request:**
```
GET /api/v1/services?page=1&limit=10&category=construction&locale=en
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Construction Services",
      "slug": "construction-services",
      "excerpt": "Professional construction...",
      "category": "construction",
      "icon": "building",
      "featuredImage": { "url": "https://...", "alt": "Construction" }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  },
  "message": "Services retrieved successfully"
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "category", "message": "Invalid category value" }
    ]
  },
  "statusCode": 400
}
```

#### GET /api/v1/services/:slug

**Request:**
```
GET /api/v1/services/construction-services?locale=en
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Construction Services",
    "slug": "construction-services",
    "description": "Full description...",
    "category": "construction",
    "icon": "building",
    "features": [
      { "title": "Feature 1", "description": "..." }
    ],
    "images": [
      { "url": "https://...", "alt": "Image 1", "order": 1 }
    ],
    "meta": {
      "title": "Construction Services",
      "description": "...",
      "keywords": ["construction", "building"]
    }
  },
  "message": "Service retrieved successfully"
}
```

**Not Found (404):**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Service with slug 'invalid-slug' not found"
  },
  "statusCode": 404
}
```

#### GET /api/v1/services/categories

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    { "value": "construction", "label": "Construction", "count": 8 },
    { "value": "engineering", "label": "Engineering", "count": 5 }
  ],
  "message": "Categories retrieved successfully"
}
```

---

### 3.2 Projects Endpoints

#### GET /api/v1/projects

**Request:**
```
GET /api/v1/projects?page=1&limit=12&category=residential&status=completed
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Villa Project",
      "slug": "villa-project",
      "excerpt": "Modern residential villa...",
      "category": "residential",
      "status": "completed",
      "featuredImage": { "url": "https://...", "alt": "Villa" },
      "location": "Riyadh",
      "yearCompleted": 2024
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 30,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  },
  "message": "Projects retrieved successfully"
}
```

#### GET /api/v1/projects/:slug

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Villa Project",
    "slug": "villa-project",
    "description": "Full project description...",
    "category": "residential",
    "status": "completed",
    "client": "Private Client",
    "location": "Riyadh",
    "yearCompleted": 2024,
    "duration": "18 months",
    "area": "2500 sqm",
    "featuredImage": { "url": "https://...", "alt": "Villa" },
    "gallery": [
      { "url": "https://...", "alt": "Gallery 1", "order": 1 }
    ],
    "services": ["507f1f77bcf86cd799439011"],
    "tags": ["villa", "residential", "luxury"]
  },
  "message": "Project retrieved successfully"
}
```

---

### 3.3 Blog Endpoints

#### GET /api/v1/blog

**Request:**
```
GET /api/v1/blog?page=1&limit=6&category=news
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Company Expansion Announcement",
      "slug": "company-expansion",
      "excerpt": "We are pleased to announce...",
      "category": "news",
      "featuredImage": { "url": "https://...", "alt": "News" },
      "author": { "name": "Ahmed Al Omran", "avatar": "https://..." },
      "publishedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 6,
    "total": 20,
    "totalPages": 4,
    "hasNext": true,
    "hasPrev": false
  },
  "message": "Blog posts retrieved successfully"
}
```

---

### 3.4 Careers Endpoints

#### GET /api/v1/careers

**Request:**
```
GET /api/v1/careers?department=engineering&locale=en
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "title": "Senior Project Manager",
      "slug": "senior-project-manager",
      "department": "engineering",
      "location": "Riyadh",
      "type": "full-time",
      "excerpt": "We are looking for..."
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 5, "totalPages": 1, "hasNext": false, "hasPrev": false },
  "message": "Careers retrieved successfully"
}
```

#### POST /api/v1/careers/:slug/apply

**Request:**
```
POST /api/v1/careers/senior-project-manager/apply
Content-Type: multipart/form-data

name=Ahmed%20Ali&email=ahmed%40email.com&phone=+966501234567&coverLetter=...
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "referenceNumber": "APP-2024-00001",
    "message": "Application submitted successfully"
  },
  "message": "Application submitted successfully"
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "email", "message": "Invalid email format" },
      { "field": "resume", "message": "Resume is required" }
    ]
  },
  "statusCode": 400
}
```

---

### 3.5 Contact Endpoints

#### POST /api/v1/contact

**Request:**
```json
{
  "name": "Ahmed Ali",
  "email": "ahmed@email.com",
  "phone": "+966501234567",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a potential project..."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439015",
    "message": "Your message has been sent successfully"
  },
  "message": "Contact form submitted successfully"
}
```

---

### 3.6 Quote Endpoints

#### POST /api/v1/quote

**Request:**
```json
{
  "serviceType": "Construction",
  "subService": "Residential",
  "name": "Ahmed Ali",
  "email": "ahmed@email.com",
  "phone": "+966501234567",
  "company": "ABC Corporation",
  "projectType": "Villa",
  "budget": "5-10 million SAR",
  "timeline": "6 months",
  "location": "Jeddah",
  "description": "Looking to build a 5-bedroom villa..."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "referenceNumber": "RQ-2024-00001",
    "message": "Quote request submitted successfully"
  },
  "message": "Quote request submitted successfully"
}
```

---

### 3.7 Newsletter Endpoints

#### POST /api/v1/newsletter

**Request:**
```json
{
  "email": "user@email.com"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "message": "Please check your email to verify subscription"
  },
  "message": "Newsletter subscription initiated"
}
```

**Already Subscribed (200):**
```json
{
  "success": true,
  "data": {
    "message": "Email is already subscribed"
  },
  "message": "Already subscribed"
}
```

#### DELETE /api/v1/newsletter

**Request:**
```json
{
  "email": "user@email.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Successfully unsubscribed"
  },
  "message": "Unsubscribed successfully"
}
```

---

### 3.8 Search Endpoints

#### GET /api/v1/search

**Request:**
```
GET /api/v1/search?q=construction&locale=en&limit=10
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "services": [
      { "_id": "...", "title": "Construction Services", "slug": "construction-services", "type": "service" }
    ],
    "projects": [
      { "_id": "...", "title": "Construction Project", "slug": "construction-project", "type": "project" }
    ],
    "blog": [
      { "_id": "...", "title": "Construction Tips", "slug": "construction-tips", "type": "blog" }
    ],
    "total": 5
  },
  "message": "Search completed successfully"
}
```

---

### 3.9 Settings Endpoints

#### GET /api/v1/settings

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "siteName": "Rawafid Al Omran",
    "tagline": "Building Excellence Since 1995",
    "contact": {
      "email": "info@rawafidomran.com",
      "phone": "+966112345678",
      "whatsapp": "+966501234567",
      "address": "Riyadh, Saudi Arabia",
      "workingHours": {
        "sundayThursday": "8:00 AM - 6:00 PM",
        "saturday": "9:00 AM - 2:00 PM"
      }
    },
    "social": {
      "linkedin": "https://linkedin.com/company/rawafidomran",
      "twitter": "https://twitter.com/rawafidomran",
      "instagram": "https://instagram.com/rawafidomran"
    },
    "logo": { "url": "https://...", "alt": "Rawafid Al Omran" }
  },
  "message": "Settings retrieved successfully"
}
```

---

### 3.10 SEO Endpoints

#### GET /api/v1/seo/:page

**Request:**
```
GET /api/v1/seo/home?locale=en
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "page": "home",
    "locale": "en",
    "title": "Rawafid Al Omran - Premier Contracting Company",
    "description": "Leading construction and engineering company in Saudi Arabia...",
    "keywords": ["construction", "engineering", "Saudi Arabia", "contracting"],
    "ogTitle": "Rawafid Al Omran Contracting",
    "ogDescription": "Building excellence since 1995",
    "ogImage": "https://...",
    "ogType": "website",
    "structuredData": {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Rawafid Al Omran"
    }
  },
  "message": "SEO data retrieved successfully"
}
```

---

### 3.11 Media Endpoints

#### POST /api/v1/media

**Request:**
```
POST /api/v1/media
Content-Type: multipart/form-data

file=[binary]
folder=services
alt=Service Image
alt.ar=صورة الخدمة
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439016",
    "filename": "abc123-def456",
    "originalName": "service-image.jpg",
    "mimeType": "image/jpeg",
    "size": 102400,
    "url": "https://res.cloudinary.com/.../image.jpg",
    "folder": "services",
    "alt": "Service Image"
  },
  "message": "Media uploaded successfully"
}
```

#### DELETE /api/v1/media/:id

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "deleted": true
  },
  "message": "Media deleted successfully"
}
```

---

## 4. API Conventions

### 4.1 Response Envelope

**Success:**
```typescript
{
  success: true,
  data: any,
  message?: string,
  pagination?: PaginationMeta
}
```

**Error:**
```typescript
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: Array<{ field: string, message: string }>
  },
  statusCode: number
}
```

### 4.2 Pagination Format

```typescript
interface PaginationMeta {
  page: number;        // Current page (1-based)
  limit: number;       // Items per page
  total: number;        // Total items
  totalPages: number;   // Total pages
  hasNext: boolean;     // Has next page
  hasPrev: boolean;     // Has previous page
}
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

### 4.3 Filtering

| Endpoint | Filter Parameters |
|----------|-------------------|
| /services | `category`, `isActive` |
| /projects | `category`, `status`, `isFeatured` |
| /blog | `category`, `isFeatured`, `isPublished` |
| /careers | `department`, `type`, `isActive` |
| /team | `department`, `isFeatured` |
| /testimonials | `isFeatured` |
| /partners | `category` |
| /faqs | `category` |

### 4.4 Sorting

**Query Parameters:**
- `sort` - Field to sort by (default: `createdAt`)
- `order` - Sort order: `asc` or `desc` (default: `desc`)

### 4.5 Searching

**Query Parameters:**
- `q` - Search query (required for search endpoints)
- `locale` - Language preference (`en` or `ar`)

**Text Search Fields:**
- services: title, description
- projects: title, description, tags
- blog: title, content, tags

### 4.6 Localization

**Query Parameter:**
```
?locale=en  or  ?locale=ar
```

**Default:** `en`

---

## 5. Authentication Integration Points

### Current State: Public API (No Auth)

All current endpoints are public and do not require authentication.

### Future Authentication Endpoints (Planned)

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| /auth/register | POST | User registration | Future |
| /auth/login | POST | User login | Future |
| /auth/logout | POST | User logout | Future |
| /auth/refresh | POST | Refresh token | Future |
| /auth/forgot-password | POST | Password reset request | Future |
| /auth/reset-password | POST | Reset password | Future |
| /auth/verify-email | GET | Verify email | Future |

### Admin Endpoints (Future)

All CRUD operations for content management will require authentication:

| Endpoint Pattern | Purpose |
|------------------|---------|
| /admin/services | Manage services |
| /admin/projects | Manage projects |
| /admin/blog | Manage blog posts |
| /admin/careers | Manage careers |
| /admin/media | Manage media library |
| /admin/contacts | View contacts |
| /admin/quotes | View quotes |
| /admin/users | Manage users |

### Auth Middleware Integration Point

```typescript
// When auth is implemented, add to routes:
// import { authMiddleware } from '../middlewares/auth.middleware';

// Example protected route:
// router.post('/admin/services', authMiddleware, validate(createServiceSchema), servicesController.create);
```

---

## 6. Implementation Order

Build the backend in this exact order:

### Phase 1: Foundation
1. **Config** - Environment variables, configuration loader
2. **Database** - MongoDB connection, connection utilities
3. **Logger** - Winston logger setup
4. **Types** - TypeScript interfaces and types
5. **Errors** - Custom error classes

### Phase 2: Core Infrastructure
6. **Models** - Mongoose schemas for all 14 collections
7. **Middlewares** - Error handler, not found, validation, security
8. **Utils** - asyncHandler, slugify, paginate, ApiResponse

### Phase 3: Data Layer
9. **Schemas** - Zod validation schemas
10. **Repositories** - Data access layer for all entities

### Phase 4: Business Logic
11. **Services** - Business logic for all entities

### Phase 5: API Layer
12. **Controllers** - Request/response handling
13. **Routes** - Route definitions

### Phase 6: Features
14. **Upload** - Cloudinary configuration, media handling
15. **Email** - Nodemailer setup, templates
16. **Search** - Global search functionality

### Phase 7: Testing
17. **Tests** - Unit tests for services, integration tests for routes

---

## 7. Issues Resolved

### 7.1 Inconsistencies Fixed

| Issue | Resolution |
|-------|------------|
| Duplicate `slug.ar` field in models | Confirmed: Both `slug` and `slug.ar` are separate unique indexes per locale |
| Missing `isDeleted` filter in some queries | All repository methods must filter `isDeleted: false` by default |
| Inconsistent pagination defaults | Standardized: page=1, limit=10, max=100 |
| Missing `locale` parameter handling | All services must accept and handle `locale` query param |

### 7.2 Missing Fields Added

| Model | Added Field |
|-------|------------|
| Project | `relatedProjects` array for cross-referencing |
| BlogPost | `author` embedded object (not ObjectId reference) |
| Settings | `favicon` field for favicon URL |
| Media | `usedIn` array to track document usage |

### 7.3 Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Repository pattern | Enables testability and clean separation |
| Soft deletes | Allows data recovery, maintains referential integrity |
| Locale-specific slugs | SEO-friendly URLs for both languages |
| Embedded author in blog | Simpler than referencing User collection for public content |
| Singleton Settings | Only one settings document, cached aggressively |

### 7.4 Removed Redundancies

| Removed | Reason |
|---------|--------|
| `versionHistory` in models | Over-engineering for v1; can add later if needed |
| `User` model references in content | Public content doesn't need author ObjectId |
| Separate `about` collection | About page data can come from Settings + hardcoded content |
| `timeline` collection | Company timeline can be static JSON or Settings field |

---

## 8. Project Checklist

### Core Files

| Module | File | Status |
|--------|------|--------|
| App Setup | `src/app.ts` | Planned |
| Server Entry | `src/server.ts` | Planned |
| Config Loader | `src/config/index.ts` | Planned |
| Database Connection | `src/config/database.ts` | Planned |
| Cloudinary Config | `src/config/cloudinary.ts` | Planned |
| Mail Config | `src/config/mail.ts` | Planned |
| Logger | `src/logger/logger.ts` | Planned |

### Models (14 files)

| Module | File | Status |
|--------|------|--------|
| Service | `src/models/Service.model.ts` | Planned |
| Project | `src/models/Project.model.ts` | Planned |
| Team Member | `src/models/TeamMember.model.ts` | Planned |
| Blog Post | `src/models/BlogPost.model.ts` | Planned |
| Career | `src/models/Career.model.ts` | Planned |
| Testimonial | `src/models/Testimonial.model.ts` | Planned |
| Partner | `src/models/Partner.model.ts` | Planned |
| FAQ | `src/models/FAQ.model.ts` | Planned |
| Contact | `src/models/Contact.model.ts` | Planned |
| Quote | `src/models/Quote.model.ts` | Planned |
| Newsletter | `src/models/Newsletter.model.ts` | Planned |
| Settings | `src/models/Settings.model.ts` | Planned |
| SEO | `src/models/SEO.model.ts` | Planned |
| Media | `src/models/Media.model.ts` | Planned |

### Schemas (6 files)

| Module | File | Status |
|--------|------|--------|
| Service Schema | `src/schemas/service.schema.ts` | Planned |
| Project Schema | `src/schemas/project.schema.ts` | Planned |
| Blog Schema | `src/schemas/blog.schema.ts` | Planned |
| Career Schema | `src/schemas/career.schema.ts` | Planned |
| Contact Schema | `src/schemas/contact.schema.ts` | Planned |
| Quote Schema | `src/schemas/quote.schema.ts` | Planned |
| Newsletter Schema | `src/schemas/newsletter.schema.ts` | Planned |

### Middlewares (9 files)

| Module | File | Status |
|--------|------|--------|
| Error Handler | `src/middlewares/error.middleware.ts` | Planned |
| Not Found | `src/middlewares/notFound.middleware.ts` | Planned |
| Validation | `src/middlewares/validate.middleware.ts` | Planned |
| Rate Limit | `src/middlewares/rateLimit.middleware.ts` | Planned |
| CORS | `src/middlewares/cors.middleware.ts` | Planned |
| Helmet | `src/middlewares/helmet.middleware.ts` | Planned |
| Compression | `src/middlewares/compression.middleware.ts` | Planned |
| Morgan | `src/middlewares/morgan.middleware.ts` | Planned |
| Sanitize | `src/middlewares/sanitize.middleware.ts` | Planned |

### Utils (6 files)

| Module | File | Status |
|--------|------|--------|
| Async Handler | `src/utils/asyncHandler.ts` | Planned |
| Slugify | `src/utils/slugify.ts` | Planned |
| Paginate | `src/utils/paginate.ts` | Planned |
| API Response | `src/utils/ApiResponse.ts` | Planned |
| API Error | `src/utils/ApiError.ts` | Planned |
| Logger | `src/utils/logger.ts` | Planned |

### Errors (4 files)

| Module | File | Status |
|--------|------|--------|
| Base Error | `src/errors/AppError.ts` | Planned |
| Validation Error | `src/errors/ValidationError.ts` | Planned |
| Not Found Error | `src/errors/NotFoundError.ts` | Planned |
| Conflict Error | `src/errors/ConflictError.ts` | Planned |

### Repositories (14 files)

| Module | File | Status |
|--------|------|--------|
| Services Repository | `src/repositories/v1/services.repository.ts` | Planned |
| Projects Repository | `src/repositories/v1/projects.repository.ts` | Planned |
| Team Repository | `src/repositories/v1/team.repository.ts` | Planned |
| Blog Repository | `src/repositories/v1/blog.repository.ts` | Planned |
| Careers Repository | `src/repositories/v1/careers.repository.ts` | Planned |
| Testimonials Repository | `src/repositories/v1/testimonials.repository.ts` | Planned |
| Partners Repository | `src/repositories/v1/partners.repository.ts` | Planned |
| FAQ Repository | `src/repositories/v1/faq.repository.ts` | Planned |
| Contact Repository | `src/repositories/v1/contact.repository.ts` | Planned |
| Quote Repository | `src/repositories/v1/quote.repository.ts` | Planned |
| Newsletter Repository | `src/repositories/v1/newsletter.repository.ts` | Planned |
| Settings Repository | `src/repositories/v1/settings.repository.ts` | Planned |
| SEO Repository | `src/repositories/v1/seo.repository.ts` | Planned |
| Media Repository | `src/repositories/v1/media.repository.ts` | Planned |

### Services (15 files)

| Module | File | Status |
|--------|------|--------|
| Home Service | `src/services/v1/home.service.ts` | Planned |
| Services Service | `src/services/v1/services.service.ts` | Planned |
| Projects Service | `src/services/v1/projects.service.ts` | Planned |
| Team Service | `src/services/v1/team.service.ts` | Planned |
| Blog Service | `src/services/v1/blog.service.ts` | Planned |
| Careers Service | `src/services/v1/careers.service.ts` | Planned |
| Testimonials Service | `src/services/v1/testimonials.service.ts` | Planned |
| Partners Service | `src/services/v1/partners.service.ts` | Planned |
| FAQ Service | `src/services/v1/faq.service.ts` | Planned |
| Contact Service | `src/services/v1/contact.service.ts` | Planned |
| Quote Service | `src/services/v1/quote.service.ts` | Planned |
| Newsletter Service | `src/services/v1/newsletter.service.ts` | Planned |
| Search Service | `src/services/v1/search.service.ts` | Planned |
| Settings Service | `src/services/v1/settings.service.ts` | Planned |
| SEO Service | `src/services/v1/seo.service.ts` | Planned |
| Media Service | `src/services/v1/media.service.ts` | Planned |

### Controllers (15 files)

| Module | File | Status |
|--------|------|--------|
| Home Controller | `src/controllers/v1/home.controller.ts` | Planned |
| Services Controller | `src/controllers/v1/services.controller.ts` | Planned |
| Projects Controller | `src/controllers/v1/projects.controller.ts` | Planned |
| Team Controller | `src/controllers/v1/team.controller.ts` | Planned |
| Blog Controller | `src/controllers/v1/blog.controller.ts` | Planned |
| Careers Controller | `src/controllers/v1/careers.controller.ts` | Planned |
| Testimonials Controller | `src/controllers/v1/testimonials.controller.ts` | Planned |
| Partners Controller | `src/controllers/v1/partners.controller.ts` | Planned |
| FAQ Controller | `src/controllers/v1/faq.controller.ts` | Planned |
| Contact Controller | `src/controllers/v1/contact.controller.ts` | Planned |
| Quote Controller | `src/controllers/v1/quote.controller.ts` | Planned |
| Newsletter Controller | `src/controllers/v1/newsletter.controller.ts` | Planned |
| Search Controller | `src/controllers/v1/search.controller.ts` | Planned |
| Settings Controller | `src/controllers/v1/settings.controller.ts` | Planned |
| SEO Controller | `src/controllers/v1/seo.controller.ts` | Planned |
| Media Controller | `src/controllers/v1/media.controller.ts` | Planned |

### Routes (16 files)

| Module | File | Status |
|--------|------|--------|
| Routes Index | `src/routes/index.ts` | Planned |
| V1 Index | `src/routes/v1/index.ts` | Planned |
| Home Routes | `src/routes/v1/home.routes.ts` | Planned |
| Services Routes | `src/routes/v1/services.routes.ts` | Planned |
| Projects Routes | `src/routes/v1/projects.routes.ts` | Planned |
| Team Routes | `src/routes/v1/team.routes.ts` | Planned |
| Blog Routes | `src/routes/v1/blog.routes.ts` | Planned |
| Careers Routes | `src/routes/v1/careers.routes.ts` | Planned |
| Testimonials Routes | `src/routes/v1/testimonials.routes.ts` | Planned |
| Partners Routes | `src/routes/v1/partners.routes.ts` | Planned |
| FAQ Routes | `src/routes/v1/faq.routes.ts` | Planned |
| Contact Routes | `src/routes/v1/contact.routes.ts` | Planned |
| Quote Routes | `src/routes/v1/quote.routes.ts` | Planned |
| Newsletter Routes | `src/routes/v1/newsletter.routes.ts` | Planned |
| Search Routes | `src/routes/v1/search.routes.ts` | Planned |
| Settings Routes | `src/routes/v1/settings.routes.ts` | Planned |
| SEO Routes | `src/routes/v1/seo.routes.ts` | Planned |
| Media Routes | `src/routes/v1/media.routes.ts` | Planned |

### Email (4 files)

| Module | File | Status |
|--------|------|--------|
| Transporter | `src/mail/transporter.ts` | Planned |
| Send Function | `src/mail/send.ts` | Planned |
| Contact Template | `src/mail/templates/contact.template.ts` | Planned |
| Quote Template | `src/mail/templates/quote.template.ts` | Planned |
| Newsletter Template | `src/mail/templates/newsletter.template.ts` | Planned |

### Tests

| Module | File | Status |
|--------|------|--------|
| Service Tests | `tests/unit/services/*.test.ts` | Planned |
| Repository Tests | `tests/unit/repositories/*.test.ts` | Planned |
| Route Tests | `tests/integration/routes/*.test.ts` | Planned |

### Future Modules

| Module | File | Status |
|--------|------|--------|
| Auth Service | `src/services/auth.service.ts` | Future |
| Auth Controller | `src/controllers/auth.controller.ts` | Future |
| Auth Routes | `src/routes/auth.routes.ts` | Future |
| Auth Middleware | `src/middlewares/auth.middleware.ts` | Future |
| User Model | `src/models/User.model.ts` | Future |
| JWT Utils | `src/utils/jwt.ts` | Future |
| Password Utils | `src/utils/password.ts` | Future |

### Optional Modules

| Module | File | Status |
|--------|------|--------|
| Redis Cache | `src/utils/cache.ts` (Redis version) | Optional |
| Sentry Error Tracking | `src/middlewares/sentry.middleware.ts` | Optional |
| Background Jobs | `src/jobs/*.ts` | Optional |
| Database Migrations | `src/database/migrations/*.ts` | Optional |
| Database Seeders | `src/database/seeders/*.ts` | Optional |

---

## Summary

**Total Files:** ~100 files  
**Planned:** ~90 files  
**Future:** ~7 files (authentication)  
**Optional:** ~5 files  

**Architecture is now frozen.** All subsequent work will generate production-ready TypeScript code following this specification.