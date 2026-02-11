# Specification

## Summary
**Goal:** Build a responsive government school website with public pages and a password-protected admin panel to manage all site content.

**Planned changes:**
- Create public website pages with top navigation: Home, About the School, Admissions, Academics, Staff/Faculty, News & Notices, Gallery, Contact, each with meaningful English placeholder content.
- Apply a consistent formal/official visual theme across public and admin areas, avoiding blue/purple as primary colors.
- Implement backend content models and canister APIs for all public content (school profile, admissions, academics, staff, notices/news, gallery items, contact details) with stable storage persistence.
- Build a password-protected admin area: unauthenticated visits show only a password prompt; authenticated admins can CRUD staff, notices/news, gallery items, edit page content blocks and contact details; include logout.
- Enforce backend authorization so admin write operations require authentication and fail otherwise.
- Add admin settings to change the admin password (requires current password) and store only a hashed password in the backend.
- Implement a public Contact form that validates input, stores inquiries in the backend, and provide admin views to list and delete inquiries.
- Implement Gallery: public grid/list; admin can add/edit/remove items referencing static frontend image assets or URLs.
- Implement News & Notices: public list (newest first) and detail view; admin can create/edit/delete notices.
- Generate and include required static images under `frontend/public/assets/generated` and use them in the site (no backend image serving).

**User-visible outcome:** Visitors can browse all school pages, view notices and the gallery, and submit contact inquiries; admins can log in via a password prompt to manage site content (including notices, staff, gallery, and inquiries) and change the admin password.
