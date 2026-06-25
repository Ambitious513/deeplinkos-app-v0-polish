# v0 Handoff: DeepLinkOS Full Product Polish

## Source of Truth

- Stable repo: `Ambitious513/deeplinkos-app`
- Stable handoff commit: `3a47780`
- Recommended v0 workspace: clone/fork this repo into a separate repo or branch before editing.
- Do not work directly on `main`; return changes as a PR/diff so the original implementation remains reviewable.

## Recommended Git Workflow

Use one of these safe paths:

1. **Best option:** create a new repo named `deeplinkos-app-v0-polish` from `Ambitious513/deeplinkos-app` at commit `3a47780`.
2. **Also acceptable:** create a branch named `v0/product-polish` in the same repo and have v0 commit only to that branch.

The goal is to let v0 be creative without risking the current working product. After v0 finishes, compare against `main`, review the diff, then selectively merge.

## Product Mission

Polish DeepLinkOS into a cohesive, premium, end-to-end product experience using the existing Next.js + Supabase foundation.

Focus on the full journey:

- Public homepage and marketing pages.
- Google auth modal.
- First/last-name onboarding gate.
- Dashboard overview.
- Dashboard link manager.
- Empty states, loading states, error states, and mobile responsiveness.

v0 should use its design strengths freely. The goal is not to merely decorate the current UI; the goal is to make the app feel polished, intentional, and launch-ready.

## Creative Freedom

v0 may improve:

- Layout, spacing, typography, visual hierarchy, motion, and microcopy.
- Auth modal presentation and onboarding delight.
- Dashboard page composition and responsiveness.
- Empty states and first-run guidance.
- Link manager ergonomics.
- Component structure if it improves maintainability.

v0 should avoid making the app feel like a generic SaaS template. DeepLinkOS should feel like a sharp creator/marketer/growth tool: fast, confident, clean, and slightly magical.

## Non-Negotiable Functional Contracts

Do not break or rename these routes:

- `/`
- `/login`
- `/signup`
- `/onboarding`
- `/dashboard`
- `/dashboard/links`
- `/dashboard/analytics`
- `/dashboard/qr`
- `/dashboard/profile`
- `/r/[slug]`

`/login` and `/signup` must remain redirect-only compatibility routes that open the homepage auth modal:

- `/login` -> `/?auth=login`
- `/signup` -> `/?auth=signup`

Do not remove or rename these API routes:

- `/api/auth/state`
- `/api/auth/profile`
- `/api/auth/signout`
- `/api/onboarding`
- `/api/links`
- `/api/links/[slug]`
- `/api/link-preview`

Do not replace Supabase auth. The current direction is Google-only auth:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- `SUPABASE_SERVICE_ROLE_KEY`
- `IP_HASH_SALT`

Do not rename existing profile fields:

- `first_name`
- `last_name`
- `workspace_name`
- `onboarding_completed_at`

Do not rename existing smart-link fields used by the backend:

- `destinationUrl`
- `title`
- `description`
- `preset`
- `slug`
- `iosDeepLink`
- `androidDeepLink`
- `desktopUrl`
- `fallbackUrl`
- `campaign`
- `utmSource`
- `utmMedium`
- `utmCampaign`

## Current Product Behavior To Preserve

- Header `Log in` opens the auth modal without navigating.
- Header `Get Started Free` opens the signup modal without navigating.
- Homepage `Generate` opens the `Experience the magic` signup modal when the user is logged out or not onboarded.
- Completed users can continue link generation.
- Google One Tap is homepage-only for logged-out users.
- First and last name are required before dashboard access.
- `/dashboard` is protected.
- `/dashboard/links` lists real user-owned Supabase links.
- Link manager supports create, search, copy, pause/resume, and delete.
- `/r/[slug]` performs real redirect resolution and click tracking.

## v0 Polish Targets

### Public Site

- Preserve the approved public-site direction from the restored backup.
- Improve polish, spacing, section rhythm, CTA consistency, and mobile behavior.
- CTAs should open the auth modal where appropriate instead of sending users to standalone auth pages.

### Auth and Onboarding

- Make the modal feel premium and native to the site.
- Keep Google-only auth.
- Make missing Supabase/Google env setup feel intentional, not broken.
- Make the first/last-name step feel short, celebratory, and necessary.
- Keep direct `/login` and `/signup` compatibility behavior.

### Dashboard

- Make the dashboard feel like an operational product, not a marketing page.
- Preserve real data usage in `/dashboard` and `/dashboard/links`.
- Improve table density, empty states, mobile layout, and first-link creation flow.
- Improve dashboard navigation polish.
- It is acceptable to visually polish analytics/QR pages, but do not imply unimplemented analytics/QR export functionality is fully live unless wired to real APIs.

## Review Checklist

Before handing work back, v0 should verify:

- `npm.cmd run build`
- `npm.cmd test`
- Homepage renders on desktop and mobile.
- Auth modal opens from header login/signup.
- Homepage generator opens the generator auth modal.
- Direct `/login` and `/signup` open the modal via redirect.
- Google sign-in works with Supabase configured.
- Incomplete Google users must enter first and last name before dashboard access.
- `/dashboard/links` can create a real link.
- Created link appears in the table.
- Copy, pause/resume, and delete actions still work.
- `/r/[slug]` still redirects.
- No dashboard page silently falls back to fake production data.

## What To Return

Return:

- A PR/diff against `main`.
- A short summary of visual/product changes.
- A list of any API or data-contract changes, if any.
- Screenshots or preview links for homepage, auth modal, onboarding, dashboard overview, and links manager.
- Any known limitations or recommended next steps.

