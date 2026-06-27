# v0 Prompt: DeepLinkOS Dashboard Polish

You are polishing the authenticated dashboard for DeepLinkOS, a smart-link SaaS for app-opening links, QR codes, analytics, campaigns, affiliate links, social links, and custom domains.

This upload is a dashboard-only slice. Do not redesign the public homepage, auth modal, Supabase schema, redirect logic, or API contracts.

## Primary Goal

Improve the current dashboard UI into a production-quality SaaS workspace while preserving the existing Next.js App Router structure and working functionality.

Use the current code as the source of truth:

- `current-source/app/(dashboard)/`
- `current-source/components/dashboard-shell.tsx`
- `current-source/components/dashboard/`
- `current-source/app/globals.css`

Use the references as design direction:

- `references/dashboard-vision-prototype.html`
- `references/dashboard-inspo-1.webp`
- `references/dashboard-inspo-2.webp`
- `references/dashboard-inspo-3.webp`

## Design Direction

Use the existing v0/prototype dashboard scaffold as the base direction, but improve the color system and polish.

Target feel:

- serious analytics workspace
- dark, high-contrast sidebar
- calm neutral content area
- orange as the main action color
- clean cards and tables
- compact metrics
- clear hierarchy
- strong mobile experience

Avoid:

- blue-heavy dashboard
- purple-heavy gradients
- decorative blobs/orbs
- outer browser-card framing
- nested cards
- duplicate primary CTAs
- marketing-page hero styling inside the dashboard

## Must Keep

- Keep the dashboard route structure:
  - `/dashboard`
  - `/dashboard/links`
  - `/dashboard/analytics`
  - `/dashboard/qr`
  - `/dashboard/profile`
  - `/dashboard/billing`
  - `/dashboard/domains`
  - `/dashboard/pixels`
- Keep server-side auth/onboarding guard behavior.
- Keep existing link manager functionality:
  - create link
  - copy link
  - pause/resume link
  - delete link
  - search links
- Keep API usage and fetch paths unchanged unless a UI refactor absolutely requires a tiny local prop change.
- Keep exactly one global primary CTA: `Create link`.
- QR page should have exactly one `Download PNG` action, inside the QR design surface, not duplicated in the topbar.

## Sidebar Requirements

Improve the grouped sidebar.

Groups:

- Dashboard
  - Overview
  - Links
  - Analytics
  - QR Designer
- Settings
  - Profile
  - Billing
- Features
  - Custom Domains
  - Pixels

Requirements:

- Desktop sidebar must feel premium and intentional.
- Sidebar icons should be bold, visually aligned, and easy to scan.
- Group spacing should breathe without wasting space.
- Active state should be obvious.
- Collapsed desktop mode should be icon-only with no text leakage.
- Collapsed mode should use accessible labels or tooltips.
- Mobile should use a bottom nav plus More drawer/sheet, or a better mobile pattern that still reaches every dashboard page.

## Screen-Level Expectations

### Overview

Make it feel like a useful launch cockpit:

- KPI cards: total clicks, unique visitors, active links, top referrer, failed opens/open health.
- Date range control.
- Trend chart placeholder or chart.
- Device breakdown.
- Top links.
- Attention items.
- Empty state if no data exists.

### Links

Polish the existing working `LinksManager`.

Keep the current functionality intact, but improve:

- create-link composer
- search/filter toolbar
- table/list density
- action buttons
- status/platform badges
- empty state
- mobile table/list behavior

Do not add a second global create CTA.

### Analytics

Make a credible analytics workspace even if some data is mock/placeholder:

- date range controls
- compare controls
- trend chart
- device breakdown
- referrer/source panel
- location table
- campaign table

Mock data is acceptable only where production data does not exist yet. Keep mock data easy to replace.

### QR Designer

Make the QR page feel like a focused design tool:

- QR preview
- smart link selector
- destination URL
- color swatches
- foreground/background controls
- size control
- one Download PNG action
- no duplicate header Download PNG button

### Profile and Billing

Use cleaner grouped settings:

- profile identity
- avatar/name/email
- notification preferences
- API/access placeholder
- security/session area
- plan status
- usage limits
- payment method
- invoices

### Custom Domains and Pixels

Custom Domains should feel usable:

- domain list
- Active/Pending/Failed states
- DNS record panel
- copy controls
- verify action
- SSL/certificate status

Pixels can be beta/coming soon, but it must still feel useful:

- GA4, Meta Pixel, TikTok Pixel planned integrations
- event preview
- setup/readiness checklist

## Mobile Requirements

Design and code mobile responsiveness intentionally.

Check mentally at:

- 390px
- 430px
- 768px
- 1280px
- 1440px

No text overlap. No clipped buttons. Tables should become cards/lists or use a deliberate horizontal layout. Bottom nav and drawers must not hide important content.

## Color Guidance

The current direction is good, but the color needs refinement.

Recommended palette behavior:

- Sidebar: near-black/navy charcoal.
- Main canvas: warm neutral off-white in light mode.
- Dark mode: deep charcoal, not pure black everywhere.
- Primary action: orange.
- Success: green.
- Warning: amber.
- Error: red.
- Info/support: restrained blue.

Do not make the dashboard one-note blue, purple, beige, or espresso.

## Output Expectations

Return code changes for the dashboard slice only.

Prefer editing:

- dashboard route pages
- `dashboard-shell.tsx`
- dashboard components
- dashboard CSS/classes

Avoid changing:

- auth implementation
- Supabase clients
- API route behavior
- database schema
- public homepage
- marketing pages

If you introduce new components, keep them dashboard-scoped and easy to merge into the real repo.

## Acceptance Criteria

- Dashboard routes render.
- Sidebar grouped IA is polished.
- Sidebar collapse works.
- Light/dark mode works.
- Mobile navigation reaches all dashboard pages.
- Link manager functionality remains intact.
- QR page has one Download PNG action.
- No duplicate create-link buttons.
- No obvious text overlap or clipping on mobile.
- Design feels clearly better than the current rough dashboard and close to a production SaaS dashboard.
