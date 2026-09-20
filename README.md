# Taxmetryx Advisory Ltd.

> **Complexity. Measured. Resolved.**  
> Production-quality corporate advisory website for a premier UAE-based specialist tax firm operating at the intersection of Transfer Pricing, Corporate Tax, International Tax, and Tax Controversy.

---

## 1. Project Overview

Taxmetryx is built to reflect the high-end, editorial, and architectural visual identity of elite global advisory firms. Inspired by modern architectural compositions, Swiss editorial typography, and the DIFC financial landscape, it departs fundamentally from generic startup templates and repetitive card grids.

### Key Highlights:
- **Zero Database / Pure Typed JSON**: 100% of website content is driven by structured, type-safe JSON files with typed accessor functions.
- **REST Route Handlers**: Decoupled Next.js backend APIs (`/api/services`, `/api/insights`, `/api/contact`, `/api/careers`, `/api/site`).
- **Interactive Visual Systems**:
  - Radial / circular 6-practice orbit visualization with responsive mobile accordion.
  - Interactive cross-border vector world map with highlighted economic corridors and pulsing Dubai hub beacon.
  - Layered overlapping architectural stack with horizontal micro-shift interactions.
  - Minimalist balancing equilibrium sculpture composition.
- **Full Page Architecture**:
  - Homepage (`/`)
  - About Us (`/about`)
  - Services Catalog (`/services`)
  - Dynamic Practice Detail Pages (`/services/[slug]`)
  - Industry Verticals (`/industries`)
  - Insights Archive with Search & Filters (`/insights`)
  - Dynamic Publication Detail Pages (`/insights/[slug]`)
  - Careers with Candidacy Submission Modal (`/careers`)
  - Contact Center with DIFC & ADGM Cards (`/contact`)
  - Privacy Policy (`/privacy-policy`)
  - Terms of Use (`/terms`)
  - Disclaimer (`/disclaimer`)

---

## 2. Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Custom Variables
- **Typography**: Google Fonts via `next/font/google` (`DM Serif Display` + `Inter`)
- **Animation**: Framer Motion
- **Smooth Scrolling**: Lenis (respects `prefers-reduced-motion`)
- **Form Management**: React Hook Form + Zod validation
- **Notifications**: Sonner toasts styled for corporate dark aesthetics
- **Icons**: Lucide React
- **SEO**: Metadata API, dynamic `sitemap.ts` and `robots.ts`

---

## 3. Directory Architecture

```
Taxmetryx/
├── public/
│   └── images/
│       ├── hero-dubai.jpg
│       ├── who-we-are.jpg
│       ├── expertise-architecture.jpg
│       ├── values-sculpture.jpg
│       ├── insights-architecture.jpg
│       └── contact-dubai.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── globals.css
│   │   ├── about/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── industries/page.tsx
│   │   ├── insights/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── careers/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── disclaimer/page.tsx
│   │   └── api/
│   │       ├── services/route.ts
│   │       ├── insights/route.ts
│   │       ├── contact/route.ts
│   │       ├── careers/route.ts
│   │       └── site/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── MegaMenu.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── SmoothScroll.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── WhoWeAreSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── WhereWeServeSection.tsx
│   │   │   ├── ExpertiseSection.tsx
│   │   │   ├── ValuesSection.tsx
│   │   │   ├── InsightsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── shared/
│   │   │   ├── Container.tsx
│   │   │   ├── SectionLabel.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── CTAButton.tsx
│   │   │   ├── ArrowLink.tsx
│   │   │   ├── Counter.tsx
│   │   │   ├── Reveal.tsx
│   │   │   └── Breadcrumb.tsx
│   │   └── ui/
│   │       ├── RadialServices.tsx
│   │       ├── WorldMap.tsx
│   │       └── ToastProvider.tsx
│   ├── data/
│   │   ├── site.json
│   │   ├── navigation.json
│   │   ├── services.json
│   │   ├── expertise.json
│   │   ├── values.json
│   │   ├── regions.json
│   │   ├── insights.json
│   │   ├── industries.json
│   │   ├── careers.json
│   │   └── contact-submissions.json
│   ├── lib/
│   │   ├── json.ts
│   │   ├── utils.ts
│   │   ├── validations.ts
│   │   └── api-response.ts
│   └── types/
│       ├── common.ts
│       ├── service.ts
│       ├── insight.ts
│       ├── region.ts
│       ├── industry.ts
│       └── career.ts
├── package.json
└── tsconfig.json
```

---

## 4. Installation & Local Development

### Prerequisites
- Node.js 18+ (tested on Node v22)
- npm 9+

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Locally (Dev Mode)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 3: Production Build & Validation
```bash
npm run build
npm start
```

---

## 5. How JSON Data Works

All site content is stored in clean JSON files located in `src/data/`:
- `site.json`: Brand name, address, licenses, phone, emails, key metrics.
- `navigation.json`: Main navbar links, dropdown entries, legal links.
- `services.json`: All 6 core practices, capabilities, deliverables, methodology steps, frameworks.
- `expertise.json`: Architectural layers, credentials, deliverables.
- `values.json`: 5 corporate principles and pillars.
- `regions.json`: Global markets, coordinates, trade corridors.
- `insights.json`: Editorial articles, key takeaways, authors, sections.
- `industries.json`: 8+ commercial sectors, regulatory challenges, focus areas.
- `careers.json`: Culture pillars, benefits, open vacancies in DIFC.

### Helper Functions in `src/lib/json.ts`
All components read data through typed helper functions:
```typescript
import { getServices, getServiceBySlug, getInsights } from "@/lib/json";

const allServices = getServices();
const tpService = getServiceBySlug("transfer-pricing");
```

---

## 6. How Backend APIs Work

Even though there is no database, Next.js App Router Route Handlers provide standardized REST endpoints:

- `GET /api/services`: Returns all 6 practices.
- `GET /api/services?slug=transfer-pricing`: Returns single practice.
- `GET /api/insights`: Returns all publications.
- `GET /api/insights?category=Transfer%20Pricing`: Filters by practice.
- `GET /api/insights?slug=...`: Returns single publication.
- `GET /api/careers`: Returns current vacancies and culture pillars.
- `POST /api/careers`: Accepts job applications with resume details.
- `GET /api/site`: Returns site configuration and navigation.
- `POST /api/contact`: Validates with Zod and logs inquiry.

All APIs return standardized JSON envelopes via `src/lib/api-response.ts`:
```json
{
  "success": true,
  "message": "Message submitted successfully",
  "data": { ... }
}
```

---

## 7. Contact Submissions & Future Database Migration

### Current File Storage
When a user submits the contact form, `POST /api/contact` validates the payload with Zod and appends it to `src/data/contact-submissions.json` via Node.js `fs/promises`:
```json
{
  "id": "c7a8b41e-3558-4859-9ff7-b124e65ec8d9",
  "name": "Tariq Mansoor",
  "company": "Al-Bahar Global",
  "email": "tariq@albahar.com",
  "phone": "+971 50 123 4567",
  "areaOfInterest": "Transfer Pricing",
  "message": "We require a Transfer Pricing Local File diagnostic...",
  "createdAt": "2026-09-10T12:00:00.000Z"
}
```

> **Note on Serverless Hosting (e.g., Vercel)**:
> Serverless function filesystems are read-only / ephemeral. While the form responds with success on all platforms, persistent storage across serverless restarts requires a database or CRM webhook.

### Database Integration (Supabase & Prisma)
All data access is powered by Prisma ORM and Supabase PostgreSQL with a high-fidelity static JSON fallback:
1. Database queries are managed via `src/lib/data-repository.ts` and `prisma/schema.prisma`:
   ```typescript
   // Example Supabase / Prisma query:
   await prisma.contactSubmission.create({ data: result.data });
   ```
2. In `src/lib/json.ts`, replace static JSON imports with database query helpers.

---

## 8. Updating Images & Content

### Updating Images
All architectural images reside in `public/images/`:
- `hero-dubai.jpg`: Dawn Dubai DIFC skyline visual.
- `who-we-are.jpg`: Minimalist modern headquarters facade.
- `expertise-architecture.jpg`: Layered cantilevered architectural tiers.
- `values-sculpture.jpg`: Balanced stone/bronze equilibrium sculpture.
- `insights-architecture.jpg`: Corporate tower geometric louvers.
- `contact-dubai.jpg`: Twilight illuminated DIFC Gate precinct.

To replace any image, simply overwrite the corresponding file in `public/images/`.

### Updating Company Information
Edit `src/data/site.json` to instantly update phone numbers, office addresses, legal licensing IDs, social links, and metric figures across the entire website and metadata.

---

## 9. Deployment Instructions

### Vercel Deployment (Recommended)
1. Push this repository to GitHub or GitLab.
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Import the repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **Deploy**.

### Self-Hosted Node.js (Docker or VPS)
```bash
npm run build
NODE_ENV=production PORT=3000 npm start
```

---

## 10. License & Legal

© 2026 Taxmetryx Advisory Ltd. All rights reserved.  
Commercial License No. DIFC-CL-89240. Regulated by Dubai International Financial Centre Authority.
