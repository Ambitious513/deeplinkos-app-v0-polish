# Dashboard Polish Review Checklist

Use this after v0 returns the dashboard polish output.

## Product Fit

- The dashboard feels like a serious smart-link analytics workspace.
- The design is not a marketing landing page.
- The UI is full viewport, not framed like a browser mockup or giant card.
- The visual direction is not dominated by blue/purple gradients.
- Orange is used as the primary action color without overpowering the workspace.

## Navigation

- Grouped sidebar includes Dashboard, Settings, and Features.
- Desktop collapsed mode is genuinely icon-only.
- Collapsed mode does not leak labels or break spacing.
- Icons are visually strong, aligned, and distinct.
- Active state is obvious.
- Mobile navigation can reach every dashboard page.
- Mobile More drawer/sheet is easy to open and close.

## Functionality Preservation

- Existing link manager can still create links through `/api/links`.
- Existing copy action still uses the generated short URL.
- Pause/resume still calls `PATCH /api/links/[slug]`.
- Delete still calls `DELETE /api/links/[slug]`.
- Server-side dashboard data fetching is not moved wholesale to the client.
- Auth/onboarding guard behavior is untouched.

## Page Quality

- Overview has useful KPIs, top links, trend area, device/referrer context, and attention items.
- Links page has search, filters or filter-like controls, readable status/platform badges, and strong empty state.
- Analytics page has date controls, trend area, device/referrer/source panels, and tables.
- QR Designer has one `Download PNG` action only.
- Profile/Billing are grouped settings pages, not random cards.
- Domains page includes DNS and verification context.
- Pixels page is useful even if marked beta.

## Responsive QA

- 390px: no clipped nav, buttons, or long table text.
- 430px: primary actions remain reachable.
- 768px: tablet layout does not feel like stretched mobile.
- 1280px: dashboard uses width efficiently.
- 1440px: no oversized empty space or browser-card framing.

## Merge Readiness

- Changes are dashboard-scoped.
- New components are dashboard-scoped.
- No accidental changes to public homepage/auth/Supabase schema/API contracts.
- CSS class names are understandable.
- Mock data, if any, is clearly isolated and easy to replace.
