# ZeroVacancy Platform: Claude Code CLI Master Build Doc

## 🧭 Platform Purpose

ZeroVacancy is a two-sided marketplace that connects real estate property managers with verified local content creators (photographers, videographers, drone operators, etc.). It streamlines the entire content production workflow from discovery and booking to delivery and payment — with dedicated dashboards for managers, creators, and admin users.

---

## ✅ MVP FEATURES (FULLY IMPLEMENTED)

### Core Pages
- `/` – Homepage
- `/search` – Search by Creator or Service
- `/creator/[id]` – Creator profile with portfolio and booking CTA
- `/booking/[creatorId]` – Booking form (UI only)
- `/projects/new` – Post a project brief (no creator selected)
- `/projects/[id]` – Public brief with "Apply to Project" UI
- `/projects/[id]/applicants` – Manager reviews and selects applicants

### Dashboards
- `/creator-dashboard/` (tabs: bookings, portfolio, availability, applications, earnings)
- `/manager-dashboard/` (tabs: projects, creators, payments)
- `/admin-dashboard/` (tabs: creators, projects, applications, disputes)

### Application Flow
- Creators can apply to open projects
- Managers can review and accept applicants
- Statuses: Pending, Accepted, Rejected (UI-only)

### Notifications
- In-app toast system
- Bell icon with dropdown

### Payment UI
- Manager payment tracking page
- Creator earnings + payout history (UI only)

---

## ✅ SYSTEM SETUP & DESIGN

### File & Folder Structure
```
src/
├── app/                      # Route-based pages
├── components/
│   ├── ui/                   # Reusable UI primitives
│   ├── layout/               # Nav, DashboardShell
│   ├── cards/                # CreatorCard, ProjectCard
│   ├── forms/                # BookingForm, ApplicationForm
│   └── dashboards/           # Tabs for manager, creator, admin
├── lib/
│   ├── constants.ts          # Route paths, statuses, services
│   ├── utils.ts              # Formatting, helpers
│   ├── mockData/             # creators.ts, projects.ts, applications.ts
├── styles/
│   ├── globals.css
│   └── typography.css
```

### Design System
- TailwindCSS + ShadCN UI
- Fully tokenized (brand colors, spacing, typography)
- Fonts: Plus Jakarta Sans (headings), Inter (body)
- Unified button, card, badge, input styles
- Mobile responsive design applied globally

---

## 🟡 PARTIALLY COMPLETE (UI only or Static Data)

| Feature | Notes |
|--------|-------|
| Booking submission | UI complete, no backend |
| Applications | Stored in mockData only |
| Dashboard stats (earnings, counts) | Static |
| Deliverables upload/review | Not implemented |
| Status updates | Visual only |
| Payment tracking | No Stripe or real payment backend |
| Notifications | Toast + dropdown UI only |
| Creator availability calendar | UI only |
| Admin moderation actions | No backend connection |

---

## 🔴 NOT BUILT (Yet)

| Feature | PRD Status |
|--------|-------------|
| Auth (Clerk, Supabase, Firebase) | Required |
| File uploads (images, deliverables) | Required |
| Messaging/chat system | Deferred |
| Creator verification flow | Deferred |
| Content metadata handling | Deferred |
| Escrow / Stripe Connect payouts | Required |
| Review & rating system | Required |
| Revision requests / threads | Deferred |
| Portfolio engagement analytics | Phase 2 |
| Admin email / dispute resolution tooling | Deferred |

---

## 🔧 NEXT STEPS IN Claude Code

### Priority Backend Tasks
- Add auth + user roles
- Save creator profiles
- Accept and store project briefs
- Accept and store applications
- Store booking requests
- Save dashboard state per user
- Implement file uploads (e.g., S3 or Supabase)
- Connect Stripe Connect

### Priority UI Enhancements
- Hook up form logic to backend
- Filter creator lists by dynamic values
- Sync status badges with real status
- Add rating/review system UI
- Enable revision/comment system (optional)

---

## 🧠 Suggestions for Claude Code CLI

- Define `routes.ts` + `api.ts` to centralize route and fetch logic
- Use `mockData` folder as fallback until real DB is connected
- Extract types/interfaces to `types.ts` in each component or central `lib/types`
- Migrate any uncommitted Lovable changes now
- Use `cleanupReact`, `cleanupServer`, and `cleanupCSS` if carried over from Plandex

---

## 🧾 Summary

You are now ready to build out the backend, real-time project state, file handling, and payment infrastructure with Claude Code CLI. The frontend is 90% production-ready and architected cleanly for expansion.
