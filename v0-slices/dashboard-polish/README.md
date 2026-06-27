# DeepLinkOS Dashboard Polish Slice

This folder is a focused handoff package for v0. It is intentionally limited to the authenticated dashboard surface so v0 can spend its effort on UI polish instead of reading the whole product.

## What Is Included

- `current-source/app/(dashboard)/` - current dashboard route files.
- `current-source/components/dashboard-shell.tsx` - current dashboard shell, sidebar, topbar, theme toggle, and mobile nav.
- `current-source/components/dashboard/` - dashboard-specific components.
- `current-source/app/globals.css` - current global CSS, including dashboard styles.
- `current-source/docs/03-v0-dashboard-implementation-brief.md` - earlier dashboard implementation brief.
- `references/` - approved dashboard prototype and inspiration images.

## How To Use This With v0

Upload this entire `dashboard-polish` folder to v0 and paste the contents of `V0_DASHBOARD_POLISH_PROMPT.md` as the instruction prompt.

The goal is not a full app rebuild. The goal is a dashboard design pass that can be merged back into the real Next.js app with minimal product risk.

## Reviewer Note

Prioritize the dashboard shell, route layouts, spacing, color system, cards, tables, mobile behavior, and responsive navigation. Do not ask v0 to solve Supabase/auth/backend concerns in this slice.
