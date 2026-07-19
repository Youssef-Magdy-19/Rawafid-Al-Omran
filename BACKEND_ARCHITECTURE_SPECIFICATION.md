# Backend Architecture Specification

**Document Date:** July 16, 2026  
**Document Version:** 1.0  
**Project:** Rawafid Al Omran Contracting Corporate Website  
**Scope:** Backend API Architecture

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Architectural Principles](#2-architectural-principles)
3. [Technology Stack](#3-technology-stack)
4. [Folder Structure](#4-folder-structure)
5. [Database Architecture](#5-database-architecture)
6. [MongoDB Models](#6-mongodb-models)
7. [API Architecture](#7-api-architecture)
8. [Routes](#8-routes)

---

## 1. Architecture Overview

### 1.1 System Overview

The Rawafid Al Omran Contracting backend is a RESTful API service designed to support a corporate website with content management, user interactions, and business operations. The architecture follows a layered, feature-based design that separates concerns while maintaining clean interfaces between layers.

### 1.2 Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│              (Routes → Controllers → Responses)              │
├─────────────────────────────────────────────────────────────┤
│                    Application Layer                         │
│                    (Services → Business Logic)               │
├─────────────────────────────────────────────────────────────┤
│                    Data Access Layer                         │
│                    (Repositories → Mongoose)                │
├─────────────────────────────────────────────────────────────┤
│                    Infrastructure Layer                      │
│     (Database, File Storage, Email, Logging, Security)       │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 Design Goals

| Goal | Implementation |
|------|----------------|
| **Scalability** | Horizontal scaling through stateless design |
| **Maintainability** | Feature-based organization with clear separation |
| **Type Safety** | TypeScript strict mode with comprehensive types |
| **Security** | Helmet, rate limiting, input validation, sanitization |
| **Performance** | Indexing, lean queries, pagination, caching ready |
| **Testability** | Repository pattern, dependency injection, interfaces |

### 1.4 API Contract

The backend exposes a RESTful API consumed by React + TanStack Query frontend. All endpoints return JSON responses with consistent formatting.

```
Base URL: /api/v1
Content-Type: application/json
Authentication: Bearer Token (future)
```

---

## 2. Architectural Principles

### 2.1 Layered Architecture

Each layer has specific responsibilities and must not import from layers above it:

| Layer | Responsibility | Access |
|-------|---------------|--------|
| **Routes** | HTTP handling, validation trigger | Controllers |
| **Controllers** | Request/response handling, orchestration | Services |
| **Services** | Business logic, orchestration | Repositories |
| **Repositories** | Data access, Mongoose operations | Models |
| **Models** | Schema definitions, type definitions | Mongoose |

### 2.2 Repository Pattern

The repository pattern abstracts all database operations behind interfaces. Services never manipulate Mongoose models directly.

```
Controller → Service → Repository → Mongoose Model
```

### 2.3 Feature-Based Organization

Each feature module contains all related code:

```
features/
  services/
  projects/
  blog/
  careers/
  contact/
  ...
```

### 2.4 Thin Controllers

Controllers handle only:
- Request parsing
- Response formatting
- Validation triggering
- Service orchestration

All business logic resides in services.

### 2.5 Single Responsibility

Each module, function, and class has a single, focused purpose.

### 2.6 Dependency Injection

Dependencies are injected through constructors, enabling testability and flexibility.

---

## 3. Technology Stack

### 3.1 Runtime & Framework

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | Latest LTS | Runtime environment |
| **Express.js** | Latest | HTTP server framework |
| **TypeScript** | 5.x | Type-safe JavaScript |

### 3.2 Database

| Technology | Version | Purpose |
|-----------|---------|---------|
| **MongoDB** | Latest | Document database |
| **Mongoose** | Latest | ODM for MongoDB |

### 3.3 Validation

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Zod** | Latest | Schema validation |

### 3.4 Security

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Helmet** | Latest | Security headers |
| **express-rate-limit** | Latest | Rate limiting |
| **CORS** | Latest | Cross-origin resource sharing |
| **express-validator** | Latest | Input sanitization |

### 3.5 File Handling

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Multer** | Latest | File upload handling |
| **Cloudinary** | Latest | Image storage & optimization |

### 3.6 Email

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Nodemailer** | Latest | Email sending |

### 3.7 Utilities

| Technology | Version | Purpose |
|-----------|---------|---------|
| **dotenv** | Latest | Environment variables |
| **Morgan** | Latest | HTTP logging |
| **Compression** | Latest | Response compression |
| **pnpm** | Latest | Package manager |

### 3.8 Future-Ready

| Technology | Version | Purpose |
|-----------|---------|---------|
| **jsonwebtoken** | Latest | JWT authentication |

---

## 4. Folder Structure

### 4.1 Complete Directory Tree

```
src/
├── app.ts                          # Express app setup
├── server.ts                       # Server entry point
│
├── config/
│   ├── index.ts                    # Configuration loader
│   ├── database.ts                 # MongoDB connection
│   ├── cloudinary.ts                # Cloudinary setup
│   ├── mail.ts                      # Nodemailer setup
│   └── env.schema.ts                # Environment validation
│
├── routes/
│   ├── index.ts                    # Route aggregator
│   ├── v1/
│   │   ├── index.ts
│   │   ├── home.routes.ts
│   │   ├── about.routes.ts
│   │   ├── services.routes.ts
│   │   ├── projects.routes.ts
│   │   ├── team.routes.ts
│   │   ├── blog.routes.ts
│   │   ├── careers.routes.ts
│   │   ├── testimonials.routes.ts
│   │   ├── partners.routes.ts
│   │   ├── faq.routes.ts
│   │   ├── contact.routes.ts
│   │   ├── quote.routes.ts
│   │   ├── newsletter.routes.ts
│   │   ├── search.routes.ts
│   │   ├── settings.routes.ts
│   │   ├── seo.routes.ts
│   │   └── media.routes.ts
│   └── auth.routes.ts              # Future authentication
│
├── controllers/
│   ├── v1/
│   │   ├── home.controller.ts
│   │   ├── about.controller.ts
│   │   ├── services.controller.ts
│   │   ├── projects.controller.ts
│   │   ├── team.controller.ts
│   │   ├── blog.controller.ts
│   │   ├── careers.controller.ts
│   │   ├── testimonials.controller.ts
│   │   ├── partners.controller.ts
│   │   ├── faq.controller.ts
│   │   ├── contact.controller.ts
│   │   ├── quote.controller.ts
│   │   ├── newsletter.controller.ts
│   │   ├── search.controller.ts
│   │   ├── settings.controller.ts
│   │   ├── seo.controller.ts
│   │   └── media.controller.ts
│   └── auth.controller.ts           # Future authentication
│
├── services/
│   ├── v1/
│   │   ├── home.service.ts
│   │   ├── about.service.ts
│   │   ├── services.service.ts
│   │   ├── projects.service.ts
│   │   ├── team.service.ts
│   │   ├── blog.service.ts
│   │   ├── careers.service.ts
│   │   ├── testimonials.service.ts
│   │   ├── partners.service.ts
│   │   ├── faq.service.ts
│   │   ├── contact.service.ts
│   │   ├── quote.service.ts
│   │   ├── newsletter.service.ts
│   │   ├── search.service.ts
│   │   ├── settings.service.ts
│   │   ├── seo.service.ts
│   │   └── media.service.ts
│   └── auth.service.ts              # Future authentication
│
├── repositories/
│   ├── v1/
│   │   ├── services.repository.ts
│   │   ├── projects.repository.ts
│   │   ├── team.repository.ts
│   │   ├── blog.repository.ts
│   │   ├── careers.repository.ts
│   │   ├── testimonials.repository.ts
│   │   ├── partners.repository.ts
│   │   ├── faq.repository.ts
│   │   ├── contact.repository.ts
│   │   ├── quote.repository.ts
│   │   ├── newsletter.repository.ts
│   │   ├── settings.repository.ts
│   │   ├── seo.repository.ts
│   │   └── media.repository.ts
│   └── auth.repository.ts           # Future authentication
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
│   ├── Media.model.ts
│   └── User.model.ts                # Future authentication
│
├── validators/
│   ├── index.ts
│   ├── request/
│   │   ├── services.validator.ts
│   │   ├── projects.validator.ts
│   │   ├── blog.validator.ts
│   │   ├── careers.validator.ts
│   │   ├── contact.validator.ts
│   │   ├── quote.validator.ts
│   │   ├── newsletter.validator.ts
│   │   └── media.validator.ts
│   └── response/
│       ├── services.response.ts
│       ├── projects.response.ts
│       └── ...
│
├── schemas/
│   ├── index.ts
│   ├── service.schema.ts
│   ├── project.schema.ts
│   ├── blog.schema.ts
│   ├── career.schema.ts
│   ├── contact.schema.ts
│   ├── quote.schema.ts
│   ├── newsletter.schema.ts
│   └── media.schema.ts
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
│   ├── upload.middleware.ts
│   └── sanitize.middleware.ts
│
├── utils/
│   ├── index.ts
│   ├── asyncHandler.ts
│   ├── slugify.ts
│   ├── paginate.ts
│   ├── ApiError.ts
│   ├── ApiResponse.ts
│   ├── logger.ts
│   └── helpers.ts
│
├── constants/
│   ├── index.ts
│   ├── httpStatus.ts
│   ├── errorMessages.ts
│   ├── pagination.ts
│   └── upload.ts
│
├── types/
│   ├── index.ts
│   ├── express.ts
│   ├── api.ts
│   ├── pagination.ts
│   └── localization.ts
│
├── database/
│   ├── index.ts
│   ├── connection.ts
│   ├── seeders/
│   │   ├── index.ts
│   │   ├── services.seeder.ts
│   │   ├── projects.seeder.ts
│   │   └── ...
│   └── migrations/
│       └── ...
│
├── jobs/
│   ├── index.ts
│   ├── cleanup.job.ts
│   └── newsletter.job.ts
│
├── storage/
│   ├── index.ts
│   ├── cloudinary.ts
│   └── local.ts
│
├── mail/
│   ├── index.ts
│   ├── transporter.ts
│   ├── templates/
│   │   ├── contact.template.ts
│   │   ├── quote.template.ts
│   │   ├── career.template.ts
│   │   └── newsletter.template.ts
│   └── send.ts
│
├── logger/
│   ├── index.ts
│   ├── logger.ts
│   └── formats.ts
│
├── errors/
│   ├── index.ts
│   ├── AppError.ts
│   ├── ValidationError.ts
│   ├── NotFoundError.ts
│   └── UnauthorizedError.ts
│
├── features/
│   ├── home/
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   └── interfaces.ts
│   ├── services/
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   └── interfaces.ts
│   └── ... (other features)
│
└── i18n/
    ├── index.ts
    ├── config.ts
    └── locales/
        ├── en/
        │   ├── validation.json
        │   ├── errors.json
        │   └── messages.json
        └── ar/
            └── ...
```

### 4.2 Folder Responsibilities

| Folder | Responsibility |
|--------|----------------|
| `config/` | Environment configuration, service connections |
| `routes/` | HTTP route definitions, endpoint mapping |
| `controllers/` | Request handling, response formatting |
| `services/` | Business logic, orchestration |
| `repositories/` | Data access, Mongoose operations |
| `models/` | Mongoose schemas, TypeScript interfaces |
| `validators/` | Request/response validation schemas |
| `schemas/` | Zod validation schemas |
| `middlewares/` | Express middleware functions |
| `utils/` | Shared utility functions |
| `constants/` | Application constants |
| `types/` | TypeScript type definitions |
| `database/` | Database connection, seeders |
| `jobs/` | Scheduled background jobs |
| `storage/` | File storage configuration |
| `mail/` | Email sending, templates |
| `logger/` | Logging configuration |
| `errors/` | Custom error classes |
| `features/` | Feature-specific types and constants |
| `i18n/` | Internationalization configuration |

---

## 5. Database Architecture

### 5.1 Database Selection

**MongoDB** is selected for the following reasons:

| Factor | Justification |
|--------|---------------|
| **Schema Flexibility** | Content types vary significantly |
| **Localization** | Native support for multilingual content |
| **JSON Documents** | Direct mapping to API responses |
| **Scalability** | Horizontal scaling for growth |
| **Mongoose ODM** | Type-safe schema definitions |

### 5.2 Database Connection

```typescript
// config/database.ts
// MongoDB connection with retry logic
// Connection string from environment
// Database name from environment
```

### 5.3 Collections Overview

| Collection | Purpose | Localization |
|------------|---------|--------------|
| `services` | Service offerings | Yes |
| `projects` | Portfolio items | Yes |
| `teammembers` | Team profiles | Yes |
| `blogposts` | Blog articles | Yes |
| `careers` | Job listings | Yes |
| `testimonials` | Client testimonials | Yes |
| `partners` | Partner logos | Yes |
| `faqs` | FAQ items | Yes |
| `contacts` | Contact form submissions | No |
| `quotes` | Quote requests | No |
| `newsletters` | Email subscriptions | No |
| `settings` | Site configuration | No |
| `seos` | SEO configurations | No |
| `media` | Uploaded files | No |
| `users` | Admin users (future) | No |

### 5.4 Slug Strategy

All content collections use URL-friendly slugs:

| Field | Type | Unique | Auto-generate |
|-------|------|--------|---------------|
| `slug` | String | Yes | On create |
| `slug.ar` | String | Yes (within locale) | On create |

**Slug Format:** lowercase, alphanumeric, hyphens only

### 5.5 Localization Strategy

Multilingual content uses locale-specific fields:

```typescript
// Example: Service document
{
  title: "Construction Services",      // English (default)
  "title.ar": "خدمات البناء",          // Arabic
  description: "We build...",          // English
  "description.ar": "نحن نبني...",     // Arabic
}
```

**Default Locale:** English (`en`)  
**Supported Locales:** English (`en`), Arabic (`ar`)

### 5.6 Soft Deletes

All content collections support soft deletion:

```typescript
{
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null }
}
```

Queries automatically filter out deleted documents.

### 5.7 Timestamps

All collections include automatic timestamps:

```typescript
{
  createdAt: Date,
  updatedAt: Date
}
```

### 5.8 Versioning

Content collections support versioning for audit trails:

```typescript
{
  version: { type: Number, default: 1 },
  versionHistory: [{
    version: Number,
    changedBy: ObjectId,
    changedAt: Date,
    changes: Object
  }]
}
```

### 5.9 Indexes

#### Common Indexes (All Collections)

```typescript
{ isDeleted: 1 }
{ createdAt: -1 }
{ updatedAt: -1 }
```

#### Collection-Specific Indexes

| Collection | Indexes |
|------------|---------|
| `services` | `{ slug: 1, isDeleted: 1 }`, `{ category: 1, isDeleted: 1 }` |
| `projects` | `{ slug: 1, isDeleted: 1 }`, `{ category: 1, status: 1 }`, `{ "tags": 1 }` |
| `blogposts` | `{ slug: 1, isDeleted: 1 }`, `{ category: 1, isDeleted: 1 }`, `{ publishedAt: -1 }` |
| `careers` | `{ slug: 1, isDeleted: 1 }`, `{ department: 1, isDeleted: 1 }`, `{ isActive: 1 }` |
| `media` | `{ filename: 1 }`, `{ folder: 1 }`, `{ mimeType: 1 }` |

#### Text Indexes (Search)

```typescript
// blogposts
{ title: 'text', description: 'text', content: 'text', tags: 'text' }

// projects
{ title: 'text', description: 'text', tags: 'text' }

// services
{ title: 'text', description: 'text' }
```

### 5.10 Pagination Strategy

All list endpoints use cursor-based or offset pagination:

```typescript
// Query Parameters
page: number      // Default: 1
limit: number     // Default: 10, Max: 100
sort: string      // Default: -createdAt
order: 'asc' | 'desc'  // Default: desc

// Response Format
{
  data: [...],
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
    hasNext: boolean,
    hasPrev: boolean
  }
}
```

---

## 6. MongoDB Models

### 6.1 Service Model

**Collection:** `services`

```typescript
// Fields
{
  // Identification
  _id: ObjectId,
  slug: String,                    // Unique URL slug
  "slug.ar": String,               // Arabic slug
  
  // Content
  title: String,                   // Required
  "title.ar": String,
  excerpt: String,                 // Short description
  "excerpt.ar": String,
  description: String,             // Full description
  "description.ar": String,
  icon: String,                    // Icon identifier
  category: String,                // Service category
  features: [{
    title: String,
    "title.ar": String,
    description: String,
    "description.ar": String
  }],
  
  // Media
  images: [{
    url: String,
    alt: String,
    "alt.ar": String,
    order: Number
  }],
  
  // SEO
  meta: {
    title: String,
    "title.ar": String,
    description: String,
    "description.ar": String,
    keywords: [String]
  },
  
  // Status
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date,
  
  // Soft Delete
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date
}

// Indexes
{ slug: 1, isDeleted: 1 }          // Unique
{ category: 1, isDeleted: 1 }
{ isActive: 1, order: 1 }
```

### 6.2 Project Model

**Collection:** `projects`

```typescript
// Fields
{
  // Identification
  _id: ObjectId,
  slug: String,
  "slug.ar": String,
  
  // Content
  title: String,
  "title.ar": String,
  excerpt: String,
  "excerpt.ar": String,
  description: String,
  "description.ar": String,
  
  // Categorization
  category: String,                // residential, commercial, industrial, infrastructure
  status: String,                  // completed, in-progress, upcoming
  tags: [String],
  
  // Details
  client: String,
  location: String,
  "location.ar": String,
  yearCompleted: Number,
  duration: String,                // e.g., "12 months"
  area: String,                    // e.g., "5000 sqm"
  
  // Media
  featuredImage: {
    url: String,
    alt: String,
    "alt.ar": String
  },
  gallery: [{
    url: String,
    alt: String,
    "alt.ar": String,
    order: Number
  }],
  
  // Related
  services: [ObjectId],            // References to services
  relatedProjects: [ObjectId],
  
  // SEO
  meta: {
    title: String,
    "title.ar": String,
    description: String,
    "description.ar": String,
    keywords: [String]
  },
  
  // Status
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date,
  
  // Soft Delete
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date
}

// Indexes
{ slug: 1, isDeleted: 1 }          // Unique
{ category: 1, status: 1, isDeleted: 1 }
{ isFeatured: 1, isActive: 1 }
{ "tags": 1 }
```

### 6.3 Team Member Model

**Collection:** `teammembers`

```typescript
// Fields
{
  // Identification
  _id: ObjectId,
  slug: String,
  
  // Content
  name: String,
  "name.ar": String,
  title: String,
  "title.ar": String,
  department: String,
  bio: String,
  "bio.ar": String,
  
  // Media
  photo: {
    url: String,
    alt: String,
    "alt.ar": String
  },
  
  // Contact
  email: String,
  linkedin: String,
  twitter: String,
  
  // Status
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date,
  
  // Soft Delete
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date
}

// Indexes
{ slug: 1, isDeleted: 1 }
{ department: 1, isActive: 1 }
{ isFeatured: 1, order: 1 }
```

### 6.4 Blog Post Model

**Collection:** `blogposts`

```typescript
// Fields
{
  // Identification
  _id: ObjectId,
  slug: String,
  "slug.ar": String,
  
  // Content
  title: String,
  "title.ar": String,
  excerpt: String,
  "excerpt.ar": String,
  content: String,                 // Rich text/HTML
  "content.ar": String,
  category: String,
  tags: [String],
  
  // Author
  author: {
    name: String,
    "name.ar": String,
    avatar: String,
    bio: String
  },
  
  // Media
  featuredImage: {
    url: String,
    alt: String,
    "alt.ar": String
  },
  gallery: [{
    url: String,
    alt: String,
    "alt.ar": String
  }],
  
  // SEO
  meta: {
    title: String,
    "title.ar": String,
    description: String,
    "description.ar": String,
    keywords: [String]
  },
  
  // Publishing
  isPublished: { type: Boolean, default: false },
  publishedAt: Date,
  
  // Status
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date,
  
  // Soft Delete
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date
}

// Indexes
{ slug: 1, isDeleted: 1 }
{ category: 1, isPublished: 1 }
{ publishedAt: -1 }
{ isFeatured: 1, isPublished: 1 }
```

### 6.5 Career Model

**Collection:** `careers`

```typescript
// Fields
{
  // Identification
  _id: ObjectId,
  slug: String,
  "slug.ar": String,
  
  // Content
  title: String,
  "title.ar": String,
  department: String,
  "department.ar": String,
  location: String,
  "location.ar": String,
  type: String,                    // full-time, part-time, contract
  description: String,
  "description.ar": String,
  requirements: [String],
  "requirements.ar": [String],
  responsibilities: [String],
  "responsibilities.ar": [String],
  benefits: [String],
  "benefits.ar": [String],
  
  // Salary
  salary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'SAR' }
  },
  
  // SEO
  meta: {
    title: String,
    "title.ar": String,
    description: String,
    "description.ar": String,
    keywords: [String]
  },
  
  // Status
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date,
  
  // Soft Delete
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date
}

// Indexes
{ slug: 1, isDeleted: 1 }
{ department: 1, isActive: 1 }
{ isActive: 1, order: 1 }
```

### 6.6 Testimonial Model

**Collection:** `testimonials`

```typescript
// Fields
{
  _id: ObjectId,
  
  // Content
  quote: String,
  "quote.ar": String,
  clientName: String,
  "clientName.ar": String,
  company: String,
  "company.ar": String,
  position: String,
  "position.ar": String,
  rating: { type: Number, min: 1, max: 5, default: 5 },
  
  // Media
  avatar: {
    url: String,
    alt: String
  },
  
  // Video (optional)
  video: {
    url: String,
    thumbnail: String
  },
  
  // Status
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date,
  
  // Soft Delete
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date
}

// Indexes
{ isFeatured: 1, isActive: 1 }
{ order: 1 }
```

### 6.7 Partner Model

**Collection:** `partners`

```typescript
// Fields
{
  _id: ObjectId,
  
  // Content
  name: String,
  "name.ar": String,
  description: String,
  "description.ar": String,
  category: String,                // government, corporate, international
  website: String,
  
  // Media
  logo: {
    url: String,
    alt: String,
    "alt.ar": String
  },
  
  // Status
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date,
  
  // Soft Delete
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date
}

// Indexes
{ category: 1, isActive: 1 }
{ order: 1 }
```

### 6.8 FAQ Model

**Collection:** `faqs`

```typescript
// Fields
{
  _id: ObjectId,
  
  // Content
  question: String,
  "question.ar": String,
  answer: String,
  "answer.ar": String,
  category: String,                // general, services, projects, careers, contact
  
  // Status
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date,
  
  // Soft Delete
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date
}

// Indexes
{ category: 1, isActive: 1 }
{ order: 1 }
```

### 6.9 Contact Model

**Collection:** `contacts`

```typescript
// Fields
{
  _id: ObjectId,
  
  // Contact Info
  name: String,                    // Required
  email: String,                   // Required
  phone: String,
  company: String,
  
  // Message
  subject: String,                 // Required
  message: String,                 // Required
  
  // Status
  status: { 
    type: String, 
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },
  notes: [{
    text: String,
    createdBy: ObjectId,
    createdAt: Date
  }],
  
  // Metadata
  ipAddress: String,
  userAgent: String,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ status: 1, createdAt: -1 }
{ email: 1 }
{ createdAt: -1 }
```

### 6.10 Quote Model

**Collection:** `quotes`

```typescript
// Fields
{
  _id: ObjectId,
  
  // Service Selection
  serviceType: String,            // Required
  subService: String,
  
  // Personal Info
  name: String,                    // Required
  email: String,                   // Required
  phone: String,                   // Required
  company: String,
  
  // Project Details
  projectType: String,
  budget: String,
  timeline: String,
  location: String,
  description: String,             // Required
  
  // Attachments
  attachments: [{
    url: String,
    filename: String,
    mimeType: String,
    size: Number
  }],
  
  // Status
  status: {
    type: String,
    enum: ['new', 'reviewing', 'quoted', 'accepted', 'rejected', 'expired'],
    default: 'new'
  },
  referenceNumber: String,         // Auto-generated: RQ-YYYY-XXXXX
  quotedAmount: Number,
  notes: [{
    text: String,
    createdBy: ObjectId,
    createdAt: Date
  }],
  
  // Metadata
  ipAddress: String,
  userAgent: String,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ referenceNumber: 1 }             // Unique
{ status: 1, createdAt: -1 }
{ email: 1 }
```

### 6.11 Newsletter Model

**Collection:** `newsletters`

```typescript
// Fields
{
  _id: ObjectId,
  
  email: String,                    // Required, Unique
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationExpires: Date,
  
  // Preferences
  preferences: {
    updates: { type: Boolean, default: true },
    marketing: { type: Boolean, default: false }
  },
  
  // Subscription
  subscribedAt: Date,
  unsubscribedAt: Date,
  
  // Metadata
  source: String,                   // website, import, etc.
  ipAddress: String,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ email: 1 }                        // Unique
{ isActive: 1, isVerified: 1 }
```

### 6.12 Settings Model

**Collection:** `settings`

```typescript
// Fields
{
  _id: ObjectId,
  
  // Site Info
  siteName: String,
  "siteName.ar": String,
  tagline: String,
  "tagline.ar": String,
  description: String,
  "description.ar": String,
  
  // Contact
  contact: {
    email: String,
    phone: String,
    mobile: String,
    whatsapp: String,
    address: String,
    "address.ar": String,
    mapUrl: String,
    workingHours: {
      sundayThursday: String,
      saturday: String
    }
  },
  
  // Social
  social: {
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String,
    youtube: String
  },
  
  // Branding
  logo: {
    url: String,
    alt: String
  },
  favicon: {
    url: String
  },
  
  // SEO Defaults
  seoDefaults: {
    title: String,
    "title.ar": String,
    description: String,
    "description.ar": String,
    keywords: [String],
    ogImage: String
  },
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

### 6.13 SEO Model

**Collection:** `seos`

```typescript
// Fields
{
  _id: ObjectId,
  
  // Page Reference
  page: String,                    // e.g., 'home', 'about', 'services'
  locale: { type: String, default: 'en' },
  
  // Meta
  title: String,
  description: String,
  keywords: [String],
  
  // Open Graph
  ogTitle: String,
  ogDescription: String,
  ogImage: String,
  ogType: { type: String, default: 'website' },
  
  // Twitter
  twitterCard: String,
  twitterTitle: String,
  twitterDescription: String,
  twitterImage: String,
  
  // Structured Data
  structuredData: Object,
  
  // Status
  isActive: { type: Boolean, default: true },
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ page: 1, locale: 1 }              // Unique
```

### 6.14 Media Model

**Collection:** `media`

```typescript
// Fields
{
  _id: ObjectId,
  
  // File Info
  filename: String,
  originalName: String,
  mimeType: String,
  size: Number,                     // bytes
  extension: String,
  
  // Storage
  url: String,
  publicId: String,                 // Cloudinary public ID
  folder: String,                   // e.g., 'services', 'projects', 'blog'
  
  // Metadata
  width: Number,
  height: Number,
  duration: Number,                 // For videos/audio
  
  // Alt Text
  alt: String,
  "alt.ar": String,
  caption: String,
  "caption.ar": String,
  
  // Usage
  usedIn: [{
    collection: String,             // e.g., 'services', 'projects'
    documentId: ObjectId
  }],
  
  // Status
  isActive: { type: Boolean, default: true },
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ filename: 1 }
{ folder: 1, isActive: 1 }
{ publicId: 1 }
```

### 6.15 User Model (Future Authentication)

**Collection:** `users`

```typescript
// Fields
{
  _id: ObjectId,
  
  // Auth
  email: String,                     // Required, Unique
  password: String,                  // Hashed
  isEmailVerified: { type: Boolean, default: false },
  verificationToken: String,
  resetToken: String,
  resetTokenExpires: Date,
  
  // Profile
  name: String,
  avatar: String,
  role: { 
    type: String, 
    enum: ['superadmin', 'admin', 'editor', 'viewer'],
    default: 'viewer'
  },
  permissions: [String],
  
  // Status
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  loginAttempts: { type: Number, default: 0 },
  lockUntil: Date,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ email: 1 }                        // Unique
{ role: 1 }
{ isActive: 1 }
```

---

## 7. API Architecture

### 7.1 REST Conventions

#### Resource Naming

| Pattern | Example |
|---------|---------|
| Collection | `/services` (plural) |
| Single Resource | `/services/:slug` |
| Sub-resource | `/services/:slug/gallery` |
| Actions | `/services/:slug/activate` |

#### HTTP Methods

| Method | Usage | Idempotent |
|--------|-------|------------|
| GET | Retrieve resources | Yes |
| POST | Create new resources | No |
| PUT | Full update | Yes |
| PATCH | Partial update | No |
| DELETE | Remove resources | Yes |

### 7.2 API Versioning

All public endpoints are versioned:

```
/api/v1/services
/api/v1/projects
```

Version changes follow breaking changes policy.

### 7.3 Response Format

#### Success Response

```typescript
// Single Resource
{
  "success": true,
  "data": { ... },
  "message": "Resource retrieved successfully"
}

// Collection
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  },
  "message": "Resources retrieved successfully"
}

// Creation
{
  "success": true,
  "data": { ... },
  "message": "Resource created successfully"
}
```

#### Error Response

```typescript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "statusCode": 400
}
```

### 7.4 Status Codes

| Code | Usage |
|------|-------|
| 200 | Success (GET, PUT, PATCH) |
| 201 | Created (POST) |
| 204 | No Content (DELETE) |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (not authenticated) |
| 403 | Forbidden (not authorized) |
| 404 | Not Found |
| 409 | Conflict (duplicate) |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

### 7.5 Filtering

Query parameters for filtering:

```
GET /api/v1/projects?category=residential&status=completed
GET /api/v1/blog?category=news&isFeatured=true
GET /api/v1/careers?department=engineering&isActive=true
```

### 7.6 Sorting

```
GET /api/v1/projects?sort=createdAt&order=desc
GET /api/v1/blog?sort=publishedAt&order=asc
```

Sortable fields vary by collection.

### 7.7 Pagination

```
GET /api/v1/projects?page=2&limit=20
```

Response includes pagination metadata.

### 7.8 Searching

Text search across indexed fields:

```
GET /api/v1/search?q=construction
GET /api/v1/blog/search?q=building&locale=ar
```

### 7.9 Localization

Specify locale via header or query:

```
GET /api/v1/services?locale=ar
Accept-Language: ar
```

Default locale is `en`.

### 7.10 Field Selection

Select specific fields:

```
GET /api/v1/projects?fields=title,slug,featuredImage
GET /api/v1/services?fields=-description,-meta
```

### 7.11 Population

Include related documents:

```
GET /api/v1/projects?populate=services
GET /api/v1/blog/:slug?populate=author
```

---

## 8. Routes

### 8.1 Route Structure

```
/api/v1/
├── home/
│   ├── GET /                       # Get home page data
│   └── GET /featured               # Get featured content
│
├── about/
│   ├── GET /                       # Get about page data
│   ├── GET /timeline               # Get company timeline
│   └── GET /stats                  # Get company statistics
│
├── services/
│   ├── GET /                       # List all services
│   ├── GET /:slug                  # Get service by slug
│   ├── GET /:slug/related          # Get related services
│   ├── GET /categories             # List service categories
│   └── GET /featured               # Get featured services
│
├── projects/
│   ├── GET /                       # List all projects
│   ├── GET /:slug                  # Get project by slug
│   ├── GET /:slug/gallery          # Get project gallery
│   ├── GET /:slug/related          # Get related projects
│   ├── GET /categories             # List project categories
│   ├── GET /statuses               # List project statuses
│   ├── GET /featured               # Get featured projects
│   └── GET /stats                  # Get project statistics
│
├── team/
│   ├── GET /                       # List all team members
│   ├── GET /:slug                  # Get team member by slug
│   ├── GET /departments            # List departments
│   └── GET /featured               # Get featured team members
│
├── blog/
│   ├── GET /                       # List all blog posts
│   ├── GET /:slug                  # Get blog post by slug
│   ├── GET /:slug/related          # Get related posts
│   ├── GET /categories             # List blog categories
│   ├── GET /featured               # Get featured posts
│   ├── GET /latest                 # Get latest posts
│   └── GET /archives               # Get archived posts
│
├── careers/
│   ├── GET /                       # List all careers
│   ├── GET /:slug                  # Get career by slug
│   ├── GET /departments            # List departments
│   ├── GET /featured               # Get featured careers
│   ├── GET /stats                  # Get career statistics
│   └── POST /:slug/apply           # Submit job application
│
├── testimonials/
│   ├── GET /                       # List all testimonials
│   ├── GET /:id                    # Get testimonial by ID
│   ├── GET /featured               # Get featured testimonials
│   └── GET /video                  # Get video testimonials
│
├── partners/
│   ├── GET /                       # List all partners
│   ├── GET /:id                    # Get partner by ID
│   ├── GET /categories             # List partner categories
│   └── GET /featured               # Get featured partners
│
├── faq/
│   ├── GET /                       # List all FAQs
│   ├── GET /:id                    # Get FAQ by ID
│   └── GET /categories             # List FAQ categories
│
├── contact/
│   ├── POST /                       # Submit contact form
│   └── GET /info                    # Get contact information
│
├── quote/
│   ├── POST /                       # Submit quote request
│   ├── GET /services                # Get services for quote form
│   └── GET /budgets                 # Get budget options
│
├── newsletter/
│   ├── POST /                       # Subscribe
│   ├── DELETE /                     # Unsubscribe
│   ├── GET /verify/:token           # Verify subscription
│   └── POST /resubscribe            # Resubscribe
│
├── search/
│   ├── GET /                        # Global search
│   ├── GET /suggestions             # Search suggestions
│   └── GET /popular                 # Popular searches
│
├── settings/
│   ├── GET /                        # Get all settings
│   ├── GET /contact                 # Get contact settings
│   ├── GET /social                  # Get social links
│   └── GET /branding                # Get branding
│
├── seo/
│   ├── GET /:page                   # Get SEO for page
│   └── GET /sitemap                 # Get sitemap data
│
└── media/
    ├── POST /                        # Upload media
    ├── GET /                         # List media
    ├── GET /:id                      # Get media by ID
    ├── DELETE /:id                   # Delete media
    └── GET /folders                  # List folders
```

### 8.2 Endpoint Specifications

#### Home Endpoints

**GET /api/v1/home**

| Attribute | Value |
|-----------|-------|
| Purpose | Get all data needed for home page |
| Query Params | `locale` (optional) |
| Response | Featured services, projects, testimonials, stats, blog posts |
| Caching | 5 minutes |

**GET /api/v1/home/featured**

| Attribute | Value |
|-----------|-------|
| Purpose | Get featured content for home page |
| Response | Featured items from all collections |

#### Services Endpoints

**GET /api/v1/services**

| Attribute | Value |
|-----------|-------|
| Purpose | List all active services |
| Query Params | `page`, `limit`, `sort`, `order`, `category`, `locale`, `fields`, `populate` |
| Response | Paginated list of services |
| Validation | Category must be valid |

**GET /api/v1/services/:slug**

| Attribute | Value |
|-----------|-------|
| Purpose | Get service by slug |
| Params | `slug` (required) |
| Query Params | `locale` |
| Response | Service details with images and features |
| Error | 404 if not found |

**GET /api/v1/services/categories**

| Attribute | Value |
|-----------|-------|
| Purpose | Get all service categories |
| Response | List of unique categories with counts |

#### Projects Endpoints

**GET /api/v1/projects**

| Attribute | Value |
|-----------|-------|
| Purpose | List all active projects |
| Query Params | `page`, `limit`, `sort`, `order`, `category`, `status`, `locale`, `fields` |
| Response | Paginated list of projects |
| Validation | Category and status must be valid |

**GET /api/v1/projects/:slug**

| Attribute | Value |
|-----------|-------|
| Purpose | Get project by slug |
| Params | `slug` (required) |
| Response | Project details with gallery and related services |
| Error | 404 if not found |

**GET /api/v1/projects/categories**

| Attribute | Value |
|-----------|-------|
| Purpose | Get all project categories |
| Response | List of unique categories with counts |

**GET /api/v1/projects/statuses**

| Attribute | Value |
|-----------|-------|
| Purpose | Get all project statuses |
| Response | List of status options |

#### Blog Endpoints

**GET /api/v1/blog**

| Attribute | Value |
|-----------|-------|
| Purpose | List all published blog posts |
| Query Params | `page`, `limit`, `sort`, `order`, `category`, `locale`, `fields` |
| Response | Paginated list of published posts |
| Filter | Only returns `isPublished: true` |

**GET /api/v1/blog/:slug**

| Attribute | Value |
|-----------|-------|
| Purpose | Get blog post by slug |
| Params | `slug` (required) |
| Response | Full blog post with author info |
| Error | 404 if not found or not published |

**GET /api/v1/blog/categories**

| Attribute | Value |
|-----------|-------|
| Purpose | Get all blog categories |
| Response | List of unique categories with counts |

#### Careers Endpoints

**GET /api/v1/careers**

| Attribute | Value |
|-----------|-------|
| Purpose | List all active job listings |
| Query Params | `page`, `limit`, `sort`, `order`, `department`, `locale`, `fields` |
| Response | Paginated list of active careers |
| Filter | Only returns `isActive: true` |

**GET /api/v1/careers/:slug**

| Attribute | Value |
|-----------|-------|
| Purpose | Get career by slug |
| Params | `slug` (required) |
| Response | Full career details with requirements |
| Error | 404 if not found |

**POST /api/v1/careers/:slug/apply**

| Attribute | Value |
|-----------|-------|
| Purpose | Submit job application |
| Params | `slug` (required) |
| Request Body | `{ name, email, phone, coverLetter, resume }` |
| Response | Application confirmation with reference number |
| Validation | All fields required, resume file type/size |
| Email | Send confirmation to applicant |

#### Contact Endpoints

**POST /api/v1/contact**

| Attribute | Value |
|-----------|-------|
| Purpose | Submit contact form |
| Request Body | `{ name, email, phone, subject, message }` |
| Response | Success confirmation |
| Validation | Name (2-100), email (valid), subject (required), message (10-5000) |
| Email | Send notification to admin |

**GET /api/v1/contact/info**

| Attribute | Value |
|-----------|-------|
| Purpose | Get contact information |
| Response | Address, phone, email, working hours, map URL |

#### Quote Endpoints

**POST /api/v1/quote**

| Attribute | Value |
|-----------|-------|
| Purpose | Submit quote request |
| Request Body | `{ serviceType, subService, name, email, phone, company, projectType, budget, timeline, location, description, attachments }` |
| Response | Success with reference number |
| Validation | All required fields, file validation |
| Email | Send confirmation to customer |

#### Newsletter Endpoints

**POST /api/v1/newsletter**

| Attribute | Value |
|-----------|-------|
| Purpose | Subscribe to newsletter |
| Request Body | `{ email }` |
| Response | Success or already subscribed message |
| Validation | Valid email format |
| Email | Send verification email |

**DELETE /api/v1/newsletter**

| Attribute | Value |
|-----------|-------|
| Purpose | Unsubscribe |
| Request Body | `{ email }` |
| Response | Unsubscription confirmation |

#### Search Endpoints

**GET /api/v1/search**

| Attribute | Value |
|-----------|-------|
| Purpose | Global search across all content |
| Query Params | `q` (required), `locale`, `limit` |
| Response | Combined results from services, projects, blog |
| Search | Text index search with relevance scoring |

#### Settings Endpoints

**GET /api/v1/settings**

| Attribute | Value |
|-----------|-------|
| Purpose | Get all public settings |
| Response | Site configuration, contact info, social links |
| Caching | 10 minutes |

#### SEO Endpoints

**GET /api/v1/seo/:page**

| Attribute | Value |
|-----------|-------|
| Purpose | Get SEO configuration for page |
| Params | `page` (required) |
| Query Params | `locale` |
| Response | Meta tags, Open Graph, structured data |

**GET /api/v1/seo/sitemap**

| Attribute | Value |
|-----------|-------|
| Purpose | Get sitemap data for SEO |
| Response | All public URLs with priorities |

#### Media Endpoints

**POST /api/v1/media**

| Attribute | Value |
|-----------|-------|
| Purpose | Upload media file |
| Request | Multipart form with file |
| Body | `file`, `folder`, `alt`, `alt.ar` |
| Response | Uploaded file details |
| Validation | File type, size limits |
| Storage | Cloudinary with optimization |

**GET /api/v1/media**

| Attribute | Value |
|-----------|-------|
| Purpose | List uploaded media |
| Query Params | `page`, `limit`, `folder`, `mimeType` |
| Response | Paginated list of media files |

**DELETE /api/v1/media/:id**

| Attribute | Value |
|-----------|-------|
| Purpose | Delete media file |
| Params | `id` (required) |
| Response | Deletion confirmation |
| Action | Remove from Cloudinary and database |

---

## END OF PART 1

---

## 9. Middleware Architecture

### 9.1 Middleware Stack

Middleware is applied in a specific order to ensure proper request processing:

```
Request
  ↓
Helmet (Security Headers)
  ↓
CORS (Cross-Origin)
  ↓
Compression (Gzip)
  ↓
Morgan (HTTP Logging)
  ↓
Body Parser (JSON/URL-encoded)
  ↓
Rate Limiter (Throttling)
  ↓
Sanitize (Input Sanitization)
  ↓
Routes
  ↓
Not Found Handler
  ↓
Error Handler
  ↓
Response
```

### 9.2 Security Middleware

**Helmet Configuration**

```typescript
// middlewares/helmet.middleware.ts
import helmet from 'helmet';

export const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://*.cloudinary.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
});
```

**CORS Configuration**

```typescript
// middlewares/cors.middleware.ts
import cors from 'cors';

export const corsMiddleware = cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  credentials: true,
  maxAge: 86400 // 24 hours
});
```

### 9.3 Rate Limiting

**Global Rate Limiter**

```typescript
// middlewares/rateLimit.middleware.ts
import rateLimit from 'express-rate-limit';

// General API rate limit
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later'
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/health'
});

// Strict limiter for auth endpoints
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 attempts per hour
  message: {
    success: false,
    error: {
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts, please try again later'
    }
  }
});

// Form submission limiter
export const formLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 submissions per minute
  message: {
    success: false,
    error: {
      code: 'FORM_RATE_LIMIT_EXCEEDED',
      message: 'Too many form submissions, please slow down'
    }
  }
});
```

### 9.4 Request Parsing

```typescript
// Body parser configuration
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.text({ type: 'text/html', limit: '10mb' }));
```

### 9.5 Compression

```typescript
// middlewares/compression.middleware.ts
import compression from 'compression';

export const compressionMiddleware = compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  },
  level: 6,
  threshold: 1024
});
```

### 9.6 Logging Middleware

```typescript
// middlewares/morgan.middleware.ts
import morgan from 'morgan';

export const morganMiddleware = morgan('combined', {
  skip: (req) => req.path === '/health' || req.path === '/metrics',
  stream: {
    write: (message) => logger.http(message.trim())
  }
});
```

### 9.7 Sanitization

```typescript
// middlewares/sanitize.middleware.ts
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

export const sanitizeMiddleware = [
  // Prevent NoSQL injection
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      logger.warn(`Sanitized potentially dangerous field: ${key}`);
    }
  }),
  // Prevent XSS
  xss()
];
```

---

## 10. Error Handling

### 10.1 Error Hierarchy

```
Error (Base)
├── AppError
│   ├── ValidationError
│   ├── NotFoundError
│   ├── UnauthorizedError
│   ├── ForbiddenError
│   ├── ConflictError
│   └── ServiceUnavailableError
├── MongooseError
│   ├── CastError
│   ├── ValidationError
│   └── DuplicateKeyError
└── CustomError
```

### 10.2 Custom Error Classes

**AppError Base Class**

```typescript
// errors/AppError.ts
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code: string;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode: number,
    code: string = 'INTERNAL_ERROR',
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.code = code;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}
```

**Specific Error Classes**

```typescript
// errors/ValidationError.ts
export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

// errors/NotFoundError.ts
export class NotFoundError extends AppError {
  constructor(resource: string, identifier?: string) {
    const message = identifier
      ? `${resource} with identifier '${identifier}' not found`
      : `${resource} not found`;
    super(message, 404, 'NOT_FOUND');
  }
}

// errors/UnauthorizedError.ts
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

// errors/ForbiddenError.ts
export class ForbiddenError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 403, 'FORBIDDEN');
  }
}

// errors/ConflictError.ts
export class ConflictError extends AppError {
  constructor(message: string, identifier?: string) {
    super(message, 409, 'CONFLICT', { identifier });
  }
}
```

### 10.3 Error Handler Middleware

```typescript
// middlewares/error.middleware.ts
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip
  });

  // Handle known errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        details: err.details
      },
      statusCode: err.statusCode
    });
  }

  // Handle Mongoose errors
  if (err.name === 'ValidationError') {
    const details = Object.values(err as any).map(e => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details
      },
      statusCode: 400
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_ID',
        message: 'Invalid resource identifier'
      },
      statusCode: 400
    });
  }

  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue)[0];
    return res.status(409).json({
      success: false,
      error: {
        code: 'DUPLICATE_ERROR',
        message: `${field} already exists`
      },
      statusCode: 409
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : err.message
    },
    statusCode: 500
  });
};
```

### 10.4 Not Found Handler

```typescript
// middlewares/notFound.middleware.ts
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`
    },
    statusCode: 404
  });
};
```

### 10.5 Async Error Wrapper

```typescript
// utils/asyncHandler.ts
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Usage
router.get('/services', asyncHandler(async (req, res) => {
  const services = await servicesService.getAll(req.query);
  res.json(successResponse(services));
}));
```

---

## 11. Security

### 11.1 Input Validation

**Zod Schemas**

```typescript
// schemas/contact.schema.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s\u0600-\u06FF]+$/, 'Name contains invalid characters'),
  
  email: z.string()
    .email('Invalid email format')
    .max(255, 'Email must not exceed 255 characters'),
  
  phone: z.string()
    .regex(/^[\d\s+()-]+$/, 'Invalid phone format')
    .optional(),
  
  subject: z.string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must not exceed 200 characters'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must not exceed 5000 characters')
});

export type ContactInput = z.infer<typeof contactSchema>;
```

### 11.2 Request Validation Middleware

```typescript
// middlewares/validate.middleware.ts
import { z } from 'zod';

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const details = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
            details
          },
          statusCode: 400
        });
      }
      next(error);
    }
  };
};
```

### 11.3 SQL/NoSQL Injection Prevention

- MongoDB sanitize middleware prevents NoSQL injection
- XSS-clean prevents script injection
- Parameterized queries via Mongoose
- Input length limits enforced

### 11.4 File Upload Security

```typescript
// File validation
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Validation in upload middleware
const validateFile = (file: Express.Multer.File) => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    throw new ValidationError('Invalid file type');
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new ValidationError('File size exceeds limit');
  }
  // Check for malicious file content
  if (file.originalname.match(/[\<>\"\']/)) {
    throw new ValidationError('Invalid characters in filename');
  }
};
```

### 11.5 Security Headers

```typescript
// Additional security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});
```

### 11.6 Request Size Limits

```typescript
// Limit request body sizes
app.use(express.json({ limit: '10kb' }));      // API requests
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// File uploads handled separately with higher limits
```

---

## 12. Validation

### 12.1 Validation Strategy

| Layer | Validation | Purpose |
|-------|------------|---------|
| **Routes** | Zod schemas | Request structure |
| **Services** | Business rules | Domain logic |
| **Models** | Mongoose validators | Data integrity |

### 12.2 Validation Schemas

**Service Schema**

```typescript
// schemas/service.schema.ts
import { z } from 'zod';

export const createServiceSchema = z.object({
  title: z.string().min(2).max(200),
  'title.ar': z.string().min(2).max(200).optional(),
  excerpt: z.string().max(500).optional(),
  'excerpt.ar': z.string().max(500).optional(),
  description: z.string().min(10).optional(),
  'description.ar': z.string().min(10).optional(),
  icon: z.string().max(50).optional(),
  category: z.string().min(2).max(50),
  features: z.array(z.object({
    title: z.string().min(2).max(200),
    'title.ar': z.string().max(200).optional(),
    description: z.string().max(1000).optional(),
    'description.ar': z.string().max(1000).optional()
  })).optional(),
  images: z.array(z.object({
    url: z.string().url(),
    alt: z.string().max(200).optional(),
    'alt.ar': z.string().max(200).optional(),
    order: z.number().int().min(0).optional()
  })).optional(),
  meta: z.object({
    title: z.string().max(70).optional(),
    'title.ar': z.string().max(70).optional(),
    description: z.string().max(160).optional(),
    'description.ar': z.string().max(160).optional(),
    keywords: z.array(z.string().max(50)).max(10).optional()
  }).optional()
});

export const updateServiceSchema = createServiceSchema.partial();
```

**Project Schema**

```typescript
// schemas/project.schema.ts
import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(2).max(200),
  'title.ar': z.string().min(2).max(200).optional(),
  excerpt: z.string().max(500).optional(),
  'excerpt.ar': z.string().max(500).optional(),
  description: z.string().min(10).optional(),
  'description.ar': z.string().min(10).optional(),
  category: z.enum(['residential', 'commercial', 'industrial', 'infrastructure']),
  status: z.enum(['completed', 'in-progress', 'upcoming']),
  tags: z.array(z.string().max(30)).max(10).optional(),
  client: z.string().max(200).optional(),
  location: z.string().max(200).optional(),
  'location.ar': z.string().max(200).optional(),
  yearCompleted: z.number().int().min(1900).max(2100).optional(),
  duration: z.string().max(50).optional(),
  area: z.string().max(50).optional(),
  featuredImage: z.object({
    url: z.string().url(),
    alt: z.string().max(200).optional(),
    'alt.ar': z.string().max(200).optional()
  }).optional(),
  gallery: z.array(z.object({
    url: z.string().url(),
    alt: z.string().max(200).optional(),
    'alt.ar': z.string().max(200).optional(),
    order: z.number().int().min(0).optional()
  })).optional(),
  services: z.array(z.string()).optional(),
  relatedProjects: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  order: z.number().int().min(0).optional()
});
```

**Blog Schema**

```typescript
// schemas/blog.schema.ts
import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(2).max(200),
  'title.ar': z.string().min(2).max(200).optional(),
  excerpt: z.string().max(500).optional(),
  'excerpt.ar': z.string().max(500).optional(),
  content: z.string().min(10),
  'content.ar': z.string().min(10).optional(),
  category: z.string().min(2).max(50),
  tags: z.array(z.string().max(30)).max(10).optional(),
  author: z.object({
    name: z.string().min(2).max(100),
    'name.ar': z.string().max(100).optional(),
    avatar: z.string().url().optional(),
    bio: z.string().max(500).optional()
  }).optional(),
  featuredImage: z.object({
    url: z.string().url(),
    alt: z.string().max(200).optional(),
    'alt.ar': z.string().max(200).optional()
  }).optional(),
  isPublished: z.boolean().optional(),
  publishedAt: z.string().datetime().optional(),
  isFeatured: z.boolean().optional()
});
```

**Career Schema**

```typescript
// schemas/career.schema.ts
import { z } from 'zod';

export const createCareerSchema = z.object({
  title: z.string().min(2).max(200),
  'title.ar': z.string().min(2).max(200).optional(),
  department: z.string().min(2).max(100),
  'department.ar': z.string().max(100).optional(),
  location: z.string().min(2).max(200),
  'location.ar': z.string().max(200).optional(),
  type: z.enum(['full-time', 'part-time', 'contract']),
  description: z.string().min(10),
  'description.ar': z.string().min(10).optional(),
  requirements: z.array(z.string().min(2).max(500)).min(1).optional(),
  'requirements.ar': z.array(z.string().max(500)).optional(),
  responsibilities: z.array(z.string().min(2).max(500)).min(1).optional(),
  'responsibilities.ar': z.array(z.string().max(500)).optional(),
  benefits: z.array(z.string().min(2).max(500)).optional(),
  'benefits.ar': z.array(z.string().max(500)).optional(),
  salary: z.object({
    min: z.number().positive().optional(),
    max: z.number().positive().optional(),
    currency: z.string().max(10).optional()
  }).optional(),
  isFeatured: z.boolean().optional()
});

export const applyCareerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^[\d\s+()-]+$/).optional(),
  coverLetter: z.string().min(50).max(5000).optional(),
  resume: z.any() // File validation handled separately
});
```

**Quote Schema**

```typescript
// schemas/quote.schema.ts
import { z } from 'zod';

export const createQuoteSchema = z.object({
  serviceType: z.string().min(2).max(100),
  subService: z.string().max(100).optional(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  company: z.string().max(200).optional(),
  projectType: z.string().max(100).optional(),
  budget: z.string().max(50).optional(),
  timeline: z.string().max(100).optional(),
  location: z.string().max(200).optional(),
  description: z.string().min(20).max(5000)
});
```

**Newsletter Schema**

```typescript
// schemas/newsletter.schema.ts
import { z } from 'zod';

export const subscribeSchema = z.object({
  email: z.string().email()
});

export const unsubscribeSchema = z.object({
  email: z.string().email()
});
```

---

## 13. File Upload

### 13.1 Storage Configuration

**Cloudinary Setup**

```typescript
// config/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'rawafid-omran',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx'],
    transformation: [{ width: 2000, height: 2000, crop: 'limit' }],
    resource_type: 'auto'
  } as any
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});
```

### 13.2 Upload Middleware

```typescript
// middlewares/upload.middleware.ts
import { upload } from '../config/cloudinary';

export const uploadSingle = upload.single('file');
export const uploadMultiple = upload.array('files', 10);

export const handleUpload = (req: Request, res: Response, next: NextFunction) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      if (err.message === 'Invalid file type') {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_FILE_TYPE',
            message: 'Only images and documents are allowed'
          }
        });
      }
      return res.status(400).json({
        success: false,
        error: {
          code: 'UPLOAD_ERROR',
          message: err.message
        }
      });
    }
    next();
  });
};
```

### 13.3 Media Service

```typescript
// services/media.service.ts
import { Media } from '../models/Media.model';
import { cloudinary } from '../config/cloudinary';
import { v4 as uuidv4 } from 'uuid';

export class MediaService {
  async upload(file: Express.Multer.File, data: any) {
    const media = new Media({
      filename: uuidv4(),
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      extension: file.originalname.split('.').pop(),
      url: file.path,
      publicId: file.filename,
      folder: data.folder || 'general',
      width: (file as any).width,
      height: (file as any).height,
      alt: data.alt,
      'alt.ar': data['alt.ar']
    });

    await media.save();
    return media;
  }

  async delete(id: string) {
    const media = await Media.findById(id);
    if (!media) throw new NotFoundError('Media', id);

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(media.publicId);

    // Delete from database
    await Media.findByIdAndDelete(id);
    return { deleted: true };
  }

  async getByFolder(folder: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [media, total] = await Promise.all([
      Media.find({ folder, isActive: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Media.countDocuments({ folder, isActive: true })
    ]);

    return {
      data: media,
      pagination: this.paginate(page, limit, total)
    };
  }
}
```

---

## 14. Email System

### 14.1 Email Configuration

```typescript
// config/mail.ts
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

transporter.verify().then(() => {
  logger.info('Email server connected');
}).catch(err => {
  logger.error('Email server connection failed:', err);
});
```

### 14.2 Email Templates

**Contact Form Notification**

```typescript
// mail/templates/contact.template.ts
export const contactTemplate = (data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  return {
    subject: `New Contact Form: ${data.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted: ${new Date().toISOString()}</small></p>
    `
  };
};
```

**Quote Request Confirmation**

```typescript
// mail/templates/quote.template.ts
export const quoteConfirmationTemplate = (data: {
  name: string;
  referenceNumber: string;
  serviceType: string;
}) => {
  return {
    subject: `Quote Request Received - ${data.referenceNumber}`,
    html: `
      <h2>Thank you for your quote request</h2>
      <p>Dear ${data.name},</p>
      <p>We have received your quote request for <strong>${data.serviceType}</strong>.</p>
      <p><strong>Reference Number:</strong> ${data.referenceNumber}</p>
      <p>Our team will review your request and get back to you within 2-3 business days.</p>
      <p>If you have any urgent inquiries, please contact us directly.</p>
      <p>Best regards,<br>Rawafid Al Omran Team</p>
    `
  };
};
```

**Newsletter Subscription**

```typescript
// mail/templates/newsletter.template.ts
export const newsletterTemplate = (data: {
  email: string;
  verifyUrl: string;
}) => {
  return {
    subject: 'Confirm Your Newsletter Subscription',
    html: `
      <h2>Confirm Your Subscription</h2>
      <p>Thank you for subscribing to our newsletter!</p>
      <p>Please confirm your email address by clicking the button below:</p>
      <p><a href="${data.verifyUrl}" style="display:inline-block;padding:10px 20px;background:#0066cc;color:#fff;text-decoration:none;border-radius:5px;">Confirm Subscription</a></p>
      <p>Or copy this link: ${data.verifyUrl}</p>
      <p><small>This link expires in 24 hours.</small></p>
    `
  };
};
```

### 14.3 Email Service

```typescript
// mail/send.ts
import { transporter } from '../config/mail';
import { logger } from '../logger/logger';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: any[];
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: `"Rawafid Al Omran" <${process.env.SMTP_FROM}>`,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments
    });

    logger.info(`Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Email send failed:', error);
    throw error;
  }
};
```

---

## 15. Caching Strategy

### 15.1 Cache Layers

| Layer | Technology | TTL | Use Case |
|-------|-----------|-----|----------|
| **In-Memory** | Node Cache | 5-10 min | Hot data |
| **CDN** | Cloudflare | 1 hour | Static assets |
| **Application** | Redis (future) | 15-30 min | API responses |

### 15.2 In-Memory Cache

```typescript
// utils/cache.ts
import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 300, // 5 minutes default
  checkperiod: 60,
  useClones: false
});

export const cacheGet = <T>(key: string): T | undefined => {
  return cache.get<T>(key);
};

export const cacheSet = (key: string, value: any, ttl?: number): boolean => {
  return cache.set(key, value, ttl || 300);
};

export const cacheDel = (key: string): number => {
  return cache.del(key);
};

export const cacheFlush = (): void => {
  cache.flushAll();
};

export default cache;
```

### 15.3 Cache Keys

```typescript
// Cache key patterns
const CACHE_KEYS = {
  SETTINGS: 'settings:all',
  SETTINGS_CONTACT: 'settings:contact',
  SETTINGS_SOCIAL: 'settings:social',
  HOME_DATA: (locale: string) => `home:${locale}`,
  SERVICES_LIST: (locale: string) => `services:list:${locale}`,
  SERVICE_DETAIL: (slug: string, locale: string) => `service:${slug}:${locale}`,
  PROJECTS_LIST: (locale: string) => `projects:list:${locale}`,
  PROJECT_DETAIL: (slug: string, locale: string) => `project:${slug}:${locale}`,
  BLOG_LIST: (locale: string) => `blog:list:${locale}`,
  BLOG_DETAIL: (slug: string, locale: string) => `blog:${slug}:${locale}`,
  CAREERS_LIST: (locale: string) => `careers:list:${locale}`,
  SEO_PAGE: (page: string, locale: string) => `seo:${page}:${locale}`
};
```

### 15.4 Cache Implementation

```typescript
// Example: Settings service with caching
export class SettingsService {
  async getAll() {
    const cached = cacheGet(CACHE_KEYS.SETTINGS);
    if (cached) return cached;

    const settings = await Settings.findOne();
    cacheSet(CACHE_KEYS.SETTINGS, settings, 600); // 10 minutes
    return settings;
  }

  async update(id: string, data: any) {
    const settings = await Settings.findByIdAndUpdate(id, data, { new: true });
    cacheDel(CACHE_KEYS.SETTINGS);
    return settings;
  }
}
```

---

## 16. Logging

### 16.1 Logger Configuration

```typescript
// logger/logger.ts
import winston from 'winston';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
  let log = `${timestamp} [${level}]: ${message}`;
  if (Object.keys(metadata).length > 0) {
    log += ` ${JSON.stringify(metadata)}`;
  }
  if (stack) {
    log += `\n${stack}`;
  }
  return log;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), logFormat)
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880,
      maxFiles: 5
    })
  ]
});
```

### 16.2 Log Levels

| Level | Usage |
|-------|-------|
| **error** | Errors requiring attention |
| **warn** | Warnings (deprecations, retries) |
| **info** | Important events (startup, shutdown) |
| **http** | HTTP requests |
| **debug** | Detailed debugging (dev only) |

### 16.3 Request Logging

```typescript
// Log request details
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.http({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent')
    });
  });
  
  next();
});
```

---

## 17. Environment Configuration

### 17.1 Environment Variables

```typescript
// config/env.schema.ts
import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  
  // Database
  MONGODB_URI: z.string().url(),
  MONGODB_DB_NAME: z.string(),
  
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  
  // Email
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().default('587'),
  SMTP_SECURE: z.string().default('false'),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string(),
  
  // Security
  JWT_SECRET: z.string().optional(),
  JWT_EXPIRES_IN: z.string().default('7d'),
  ALLOWED_ORIGINS: z.string().optional(),
  
  // Rate Limiting
  RATE_LIMIT_WINDOW: z.string().default('15'),
  RATE_LIMIT_MAX: z.string().default('100'),
  
  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'debug']).default('info')
});

export type EnvConfig = z.infer<typeof envSchema>;
```

### 17.2 Configuration Loader

```typescript
// config/index.ts
import dotenv from 'dotenv';
import { envSchema } from './env.schema';

dotenv.config();

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  console.error('Invalid environment variables:', parseResult.error.format());
  process.exit(1);
}

export const config = parseResult.data;
```

### 17.3 Environment Files

**.env.example**

```env
# Application
NODE_ENV=development
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=rawafid_omran

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@rawafidomran.com

# Security
JWT_SECRET=your_jwt_secret_key_min_32_chars
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=http://localhost:3000,https://rawafidomran.com

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=info
```

---

## 18. Testing Strategy

### 18.1 Test Structure

```
tests/
├── unit/
│   ├── services/
│   │   ├── services.service.test.ts
│   │   ├── projects.service.test.ts
│   │   └── ...
│   ├── repositories/
│   │   └── ...
│   └── utils/
│       └── ...
├── integration/
│   ├── routes/
│   │   ├── services.routes.test.ts
│   │   └── ...
│   └── setup.ts
├── fixtures/
│   ├── services.json
│   ├── projects.json
│   └── ...
└── helpers/
    ├── setup.ts
    ├── teardown.ts
    └── factories/
```

### 18.2 Unit Test Example

```typescript
// tests/unit/services/services.service.test.ts
import { ServicesService } from '../../../src/services/v1/services.service';
import { ServicesRepository } from '../../../src/repositories/v1/services.repository';
import { NotFoundError } from '../../../src/errors/NotFoundError';

describe('ServicesService', () => {
  let service: ServicesService;
  let mockRepository: jest.Mocked<ServicesRepository>;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findBySlug: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    } as any;
    
    service = new ServicesService(mockRepository);
  });

  describe('getAll', () => {
    it('should return paginated services', async () => {
      const mockServices = [{ title: 'Service 1' }, { title: 'Service 2' }];
      mockRepository.findAll.mockResolvedValue({
        data: mockServices,
        total: 2,
        page: 1,
        limit: 10
      });

      const result = await service.getAll({ page: 1, limit: 10 });

      expect(result.data).toHaveLength(2);
      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1, limit: 10 })
      );
    });
  });

  describe('getBySlug', () => {
    it('should return service when found', async () => {
      const mockService = { title: 'Construction', slug: 'construction' };
      mockRepository.findBySlug.mockResolvedValue(mockService);

      const result = await service.getBySlug('construction');

      expect(result).toEqual(mockService);
    });

    it('should throw NotFoundError when not found', async () => {
      mockRepository.findBySlug.mockResolvedValue(null);

      await expect(service.getBySlug('nonexistent'))
        .rejects.toThrow(NotFoundError);
    });
  });
});
```

### 18.3 Integration Test Example

```typescript
// tests/integration/routes/services.routes.test.ts
import request from 'supertest';
import { app } from '../../../src/app';
import { connectDB, disconnectDB } from '../../../src/config/database';
import { seedServices } from '../../fixtures/services.json';

describe('Services Routes', () => {
  beforeAll(async () => {
    await connectDB();
    await ServiceModel.insertMany(seedServices);
  });

  afterAll(async () => {
    await ServiceModel.deleteMany({});
    await disconnectDB();
  });

  describe('GET /api/v1/services', () => {
    it('should return 200 with services list', async () => {
      const response = await request(app)
        .get('/api/v1/services')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/v1/services?page=1&limit=5')
        .expect(200);

      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.limit).toBe(5);
    });
  });
});
```

---

## 19. Deployment

### 19.1 Docker Configuration

**Dockerfile**

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3000
CMD ["node", "dist/server.js"]
```

**docker-compose.yml**

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:7
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped

volumes:
  mongo_data:
```

### 19.2 Environment-Specific Configs

```typescript
// config/environments/production.ts
export const productionConfig = {
  // Force HTTPS
  forceHTTPS: true,
  
  // Aggressive caching
  cacheTTL: 3600,
  
  // Minified responses
  minify: true,
  
  // Detailed errors off
  showErrors: false,
  
  // Rate limits
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 200
  }
};
```

### 19.3 Health Check

```typescript
// routes/health.routes.ts
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

router.get('/health/ready', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({
      status: 'ready',
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({
      status: 'not ready',
      database: 'disconnected'
    });
  }
});
```

---

## 20. Monitoring & Analytics

### 20.1 Metrics

```typescript
// routes/metrics.routes.ts
import { Request, Response } from 'express';

const metrics = {
  requests: 0,
  errors: 0,
  responseTime: [] as number[]
};

router.get('/metrics', (req: Request, res: Response) => {
  res.json({
    requests: metrics.requests,
    errors: metrics.errors,
    avgResponseTime: metrics.responseTime.length > 0
      ? metrics.responseTime.reduce((a, b) => a + b, 0) / metrics.responseTime.length
      : 0
  });
});
```

### 20.2 Error Tracking

```typescript
// Future: Sentry integration
// import * as Sentry from '@sentry/node';

// Sentry.init({
//   dsn: process.env.SENTRY_DSN,
//   environment: process.env.NODE_ENV
// });

// app.use(Sentry.Handlers.errorHandler());
```

---

## 21. Performance Optimization

### 21.1 Query Optimization

```typescript
// Always use lean() for read-only queries
const services = await Service.find({ isActive: true })
  .lean()
  .select('title slug featuredImage')
  .sort({ order: 1 })
  .limit(10);

// Use indexes for filtering
// .explain('executionStats') to analyze queries
```

### 21.2 Response Optimization

```typescript
// Compress responses
app.use(compression());

// ETag support
app.set('etag', true);

// JSON spaces (disable in production)
if (process.env.NODE_ENV !== 'production') {
  app.set('json spaces', 2);
}
```

### 21.3 Connection Pooling

```typescript
// mongoose connection options
mongoose.connect(uri, {
  maxPoolSize: 10,
  minPoolSize: 2,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 5000
});
```

---

## 22. Future Enhancements

### 22.1 Authentication & Authorization

```typescript
// Planned: JWT-based authentication
// - User registration/login
// - Role-based access control (RBAC)
// - Password reset flow
// - Session management
```

### 22.2 Admin Dashboard API

```typescript
// Planned: Admin-only endpoints
// - CRUD operations for all content
// - Media library management
// - Analytics dashboard
// - User management
```

### 22.3 Advanced Features

| Feature | Priority | Notes |
|---------|----------|-------|
| Real-time notifications | Medium | WebSocket/SSE |
| Advanced search | Medium | Elasticsearch |
| A/B testing | Low | Feature flags |
| Multi-tenancy | Low | Organization support |
| API rate tiers | Low | Rate limiting by API key |

### 22.4 Scalability Considerations

- Redis for session storage and caching
- MongoDB Atlas for managed database
- Load balancer for horizontal scaling
- CDN for static assets
- Message queue for background jobs

---

## Appendix A: API Response Codes

| Code | Name | Description |
|------|------|-------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created |
| 204 | No Content | Deleted successfully |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | Not authenticated |
| 403 | Forbidden | Not authorized |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate resource |
| 422 | Unprocessable | Invalid data |
| 429 | Too Many Requests | Rate limited |
| 500 | Server Error | Internal error |

## Appendix B: Error Codes

| Code | Description |
|------|-------------|
| VALIDATION_ERROR | Request validation failed |
| NOT_FOUND | Resource not found |
| UNAUTHORIZED | Authentication required |
| FORBIDDEN | Insufficient permissions |
| CONFLICT | Resource already exists |
| RATE_LIMIT_EXCEEDED | Too many requests |
| INTERNAL_ERROR | Server error |
| DATABASE_ERROR | Database operation failed |
| UPLOAD_ERROR | File upload failed |
| EMAIL_ERROR | Email sending failed |

## Appendix C: Collection Indexes Summary

| Collection | Indexes |
|------------|---------|
| services | slug, category, isActive, order |
| projects | slug, category, status, isFeatured, tags |
| blogposts | slug, category, publishedAt, isFeatured |
| careers | slug, department, isActive |
| team | slug, department, isFeatured |
| testimonials | isFeatured, order |
| partners | category, order |
| faqs | category, order |
| contacts | status, email, createdAt |
| quotes | referenceNumber, status, email |
| newsletters | email, isActive |
| media | filename, folder, publicId |
| seos | page, locale |
| settings | singleton |

---

**Document End**

*This specification defines the complete backend architecture for the Rawafid Al Omran Contracting Corporate Website. All implementations should follow these guidelines.*
