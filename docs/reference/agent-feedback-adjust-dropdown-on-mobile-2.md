# Feedback for `adjust-dropdown-on-mobile-2.zip`

## Overall
The redesign is directionally strong as a visual/product prototype. The dashboard shell, grouped navigation, collapsible sidebar, dark/light theme, mobile bottom nav with More sheet, and new page coverage all match the intended product direction.

However, it is currently a standalone generated Next.js project, not an integration-ready patch for our existing DeepLinkOS app. Please revise it so it can be merged into the current codebase without replacing working auth, Supabase data, public pages, middleware, or existing production flows.

## Must Fix Before Integration

1. Do not replace the root app
- The zip includes `app/page.tsx` that redirects `/` to `/dashboard`. That would break the public homepage.
- Keep the existing public routes and only redesign authenticated dashboard routes/components.
- Do not replace the current root `app/layout.tsx` unless the changes are carefully merged.

2. Do not disable TypeScript safety
- `next.config.mjs` has:
  ```js
  typescript: {
    ignoreBuildErrors: true,
  }
  ```
- Remove this. The final implementation must pass TypeScript/build checks.

3. Match the current project stack
- Current app uses Next `15.3.0`, React `19`, npm/package-lock, and global CSS.
- The generated project assumes Next `16.2.6`, pnpm, Tailwind 4, shadcn package CSS, `@base-ui/react`, `lucide-react`, SWR, and Vercel Analytics.
- Either provide a clean dependency/setup migration plan or adapt the implementation to the current app without unnecessary stack churn.

4. Replace mock data with current production data
- Most pages consume `lib/mock-data.ts`.
- Preserve existing Supabase data flows where already implemented:
  - Supabase auth/profile
  - `deep_links`
  - click counts
  - domains
  - RPCs: `get_dashboard_analytics`, `get_clicks_by_day`
- Use typed mock data only for features that genuinely do not exist yet, such as billing or future pixel events.

5. Preserve existing functional flows
- The new `CreateLinkProvider` only mocks create-link success. It must either reuse the existing `components/dashboard/create-link-modal.tsx` or call the existing create-link API/data flow.
- Links page actions must be real or clearly disabled:
  - Copy should write the actual short URL to clipboard.
  - Pause/resume should preserve existing status update behavior.
  - Edit should open the existing edit flow or route.
  - QR should open the QR flow with the selected link.
- Domain verify should call the existing `/api/domains/verify` flow.
- Profile should use the real auth user/profile data.

6. Do not regress auth and onboarding
- Keep current Supabase middleware/session handling.
- Dashboard routes must remain protected.
- Existing onboarding behavior must continue to work.

## Product/UI Fixes

1. Keep the new navigation direction
- Grouped sections are good:
  - Dashboard: Overview, Links, Analytics, QR Designer
  - Settings: Profile, Billing
  - Features: Custom Domains, Pixels
- Collapsible sidebar is good.
- Mobile More sheet is good and solves access to secondary pages.
- Keep one global `Create link` action.

2. Improve mobile dropdown/select accessibility
- The custom `SelectInput` is visually better than a cramped native dropdown.
- Add keyboard behavior for listbox navigation:
  - ArrowDown/ArrowUp
  - Enter/Space to select
  - Escape to close
  - focus management when opened
- Ensure the dropdown never clips inside modals/panels on small screens.

3. QR Designer needs real export behavior
- Current QR preview is a faux SVG matrix.
- Either generate a valid QR code or reuse the existing QR implementation.
- `Download PNG` must actually export/download the QR.
- Keep only one `Download PNG` action in the QR design surface.

4. Avoid misleading live UI
- Billing buttons, invoice downloads, pixel connect buttons, API key rotate, session revoke, etc. should not look production-live unless wired.
- If not wired, show disabled states or "Coming soon/Beta" labeling.

5. Keep visual direction, but test real data density
- The design is clean and much better than the old blue/glassy dashboard.
- Test long link names, long domains, empty states, 50+ link rows, and small mobile widths.
- Required responsive checks: 390px, 430px, 1280px, 1440px.

## Strong Parts to Preserve
- Full viewport dashboard shell.
- Neutral canvas with orange primary accent.
- Dark high-contrast sidebar.
- Route coverage for Overview, Links, Analytics, QR, Profile, Billing, Domains, Pixels.
- Bottom nav plus More sheet on mobile.
- Page-level skeleton/error/empty states.
- Centralized design primitives like `Panel`, `Badge`, `Segmented`, `ProgressBar`.
- Better spacing and hierarchy than the current dashboard.

## Recommended Next Step
Convert this from a standalone generated app into a focused integration PR:

- Modify existing dashboard files only.
- Keep current public app, auth, Supabase clients, middleware, and APIs.
- Introduce new dashboard shell/components gradually.
- Use real Supabase data in Overview, Links, Analytics, Domains, and Profile.
- Keep typed mock data only for Billing and Pixels until those backends exist.
- Run typecheck/build with TypeScript errors enabled.
