# v0 Brief: DeepLinkOS Public Site Polish

## Context

DeepLinkOS needs a clean, trustworthy public website that explains smart links, app-opening behavior, analytics, QR codes, and custom domains. The old repo has an approved public-site backup and several experimental versions. Use the backup as reference; do not import old clutter.

Reference:

```text
_backups/approved-redesign-2026-06-17
```

## Goal

Create a polished public site for launch:

- homepage
- pricing
- blog index
- blog article route
- tools index
- tool detail route
- contact
- privacy
- terms
- disclaimer
- missing link page

## Public Site Direction

- Product-first SaaS landing experience.
- Clear first viewport: DeepLinkOS and smart-link value proposition.
- Real product UI or meaningful product visuals, not abstract decoration.
- Strong CTA: create/start free.
- Copy should emphasize:
  - paste one URL
  - auto-detect platform
  - open the right app on iOS/Android/desktop
  - measure clicks
  - generate QR codes
  - use custom domains

## Implementation Rules

- Keep public site separate from dashboard components.
- Use one public component namespace.
- Do not keep duplicate `components/marketing` and `components/home` implementations at the same time.
- Preserve auth modal entry points.
- Preserve `?auth=required` behavior.
- Do not rewrite smart-link backend logic.
- Avoid generated one-off HTML files in the app root.

## Pages

### Homepage

Include:

- hero with URL input or product generator preview
- supported platform strip
- how it works
- analytics proof
- QR/custom domain/features
- pricing preview
- final CTA

### Pricing

Include:

- free/pro plan framing
- usage limits
- upgrade CTA
- FAQ

### Blog

Include:

- growth/linking content library
- category/filter affordance if data supports it
- article route with SEO metadata

### Tools

Include:

- free tool landing pages for deep link generator, QR generator, UTM builder, etc.
- clear internal links to signup/dashboard

## SEO / Metadata

- canonical URLs
- Open Graph metadata
- sitemap support
- robots support
- article schema where article content exists
- avoid broken placeholder article pages if not ready

## Acceptance Criteria

- Public routes render without conflicts.
- No duplicate route groups serving the same URL.
- Build passes.
- Auth modal opens from CTAs.
- Mobile header/menu works.
- Page copy is launch-ready, not placeholder-heavy.

