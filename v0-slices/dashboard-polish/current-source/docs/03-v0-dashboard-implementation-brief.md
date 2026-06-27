# v0 Brief: DeepLinkOS Dashboard Implementation

## Context

DeepLinkOS is a smart-link SaaS for app-opening links, QR codes, click analytics, campaigns, and custom domains. Build a production-quality authenticated dashboard for the new clean Next.js repo. Use this brief for dashboard UI only.

Do not rewrite redirect logic, Supabase auth helpers, link creation contracts, or database schema. Work around the existing server-side data contracts supplied by the app.

## Product Goal

Create a polished, full-viewport dashboard that feels like a serious growth analytics workspace, not a static mockup and not a blue/glassy prototype.

Primary visual direction:

- neutral workspace
- dark high-contrast sidebar
- orange primary action
- compact metrics
- strong tables
- clean analytics panels
- useful mobile navigation

Use these references from the old project:

- `docs/reference/dashboard-vision-prototype.html`
- `docs/reference/dashboard-vision-prototype.before-ia-review.html`
- `docs/reference/dashboard-inspo-1.webp`
- `docs/reference/dashboard-inspo-2.webp`
- `docs/reference/dashboard-inspo-3.webp`

Creative improvement is welcome. Do not literally clone the prototype if a better product layout is obvious.

## Required Routes

Implement or style these routes:

- `/dashboard` - Overview
- `/dashboard/links` - Links manager
- `/dashboard/analytics` - Analytics workspace
- `/dashboard/qr` - QR Designer
- `/dashboard/profile` - Profile
- `/dashboard/billing` - Billing
- `/dashboard/domains` - Custom Domains
- `/dashboard/pixels` - Pixels

If the app currently has fewer physical routes, create the missing route files and keep page responsibilities clear.

## Navigation

Use grouped sidebar navigation:

Dashboard:

- Overview
- Links
- Analytics
- QR Designer

Settings:

- Profile
- Billing

Features:

- Custom Domains
- Pixels

Requirements:

- Sidebar must collapse to icon-only desktop mode.
- Collapsed mode must have no text leakage.
- Tooltips or accessible labels must identify icon-only items.
- Light and dark mode must work and persist.
- Mobile must expose every dashboard page using bottom nav plus a More sheet/drawer or an equally strong pattern.
- Keep exactly one global primary CTA: `+ Create link`.
- Do not add duplicate CTAs like `New smart link`.

## Screens

### Overview

Include:

- total clicks
- unique visitors
- active links
- top referrer
- failed/open success indicator
- date range control
- traffic trend chart
- device breakdown
- top links
- attention items

### Links

Include:

- search
- filters: All, Active, Paused, Needs attention
- dense table or list
- platform/status/clicks/open-rate
- actions: copy, edit, QR, pause/resume/fix
- empty state and loading state

Preserve existing link actions and API methods.

### Analytics

Include:

- date range and compare controls
- trend chart
- device breakdown
- referrer/source breakdown
- location table
- campaign table

Use existing chart dependency unless the app owner installs another.

### QR Designer

Include:

- QR preview
- smart link selector
- destination URL
- color swatches
- foreground/background controls
- size control
- one `Download PNG` action in the design surface

Do not put a duplicate `Download PNG` button in the header.

### Profile

Include:

- identity
- avatar/name/email
- edit profile action
- notification preferences
- API/access key placeholder
- security/session controls

### Billing

Include:

- plan status
- usage limits
- payment method
- invoices
- upgrade/compare plan action

### Custom Domains

Include:

- domain list
- Active/Pending/Failed states
- DNS record panel
- copy controls
- verify action
- SSL/certificate state

### Pixels

Can be beta/coming soon, but must still feel useful:

- GA4, Meta Pixel, TikTok Pixel planned integrations
- event preview
- setup/readiness checklist

## Data Rules

- Keep server-side Supabase fetching in page/server components where possible.
- Pass small typed props into client components.
- Use realistic typed mock data only where production data does not exist yet.
- Make mock data easy to replace.
- Do not move all dashboard data fetching client-side.
- Preserve auth and modal behavior.

## Visual Quality Bar

- Full viewport app shell, no outer browser card.
- No nested cards.
- No decorative gradient blobs/orbs in dashboard.
- Tables must be readable on desktop.
- Mobile must not overlap or clip text.
- Test mentally at 390px, 430px, 1280px, and 1440px.
- Avoid one-note blue/purple palette.
- Use status colors carefully: green, amber, red, neutral, blue as supporting colors.

## Acceptance Criteria

- All dashboard routes render.
- Sidebar collapse works.
- Light/dark mode works.
- Mobile navigation reaches all pages.
- One global `+ Create link` CTA.
- QR page has exactly one primary `Download PNG` action.
- No UI text overlaps at target viewport widths.
- Existing create/copy/edit/pause/delete behavior remains intact.
