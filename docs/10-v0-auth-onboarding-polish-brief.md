# v0 Brief: Auth and Onboarding Polish

## Context

The approved public frontend has been restored from `_backups/approved-redesign-2026-06-17`, while the auth/onboarding flow comes from the clean rebuild. The routes compile and the Supabase-backed handlers exist, but the login, signup, and onboarding experience needs a focused product/design pass before launch.

## Current Routes

- `/login`
- `/signup`
- `/onboarding`
- `/auth/callback`
- `/api/auth/login`
- `/api/auth/signup`
- `/api/auth/signout`
- `/api/onboarding`

## What v0 Should Improve

- Make `/login`, `/signup`, and `/onboarding` visually consistent with the approved public frontend.
- Keep the current functional contract: email/password auth, `next` redirect support, Supabase session handling, and onboarding profile completion.
- Preserve all existing form field names because the API routes depend on them:
  - `email`
  - `password`
  - `first_name`
  - `last_name`
  - `workspace_name`
  - `role`
  - `next`
- Add clearer local/deployment states:
  - If Supabase env vars are missing, show a polished setup notice instead of making the flow feel broken.
  - If email confirmation is required, make the "check your email" state feel intentional.
  - If an auth error occurs, display it inline in a calm, readable alert.
- Make mobile layout first-class:
  - No overflow.
  - Touch-friendly inputs/buttons.
  - Header and footer should not crowd the auth form.
- Keep the public header links intact:
  - `Log in` points to `/login`
  - `Get Started Free` points to `/signup`

## Product Direction

Auth should feel like a continuation of the marketing site, not a separate utility page. The ideal flow is:

1. User clicks `Get Started Free`.
2. Signup page clearly explains the free workspace start.
3. After signup, user either sees an email confirmation state or lands in onboarding.
4. Onboarding collects the minimum profile/workspace fields.
5. Completed onboarding redirects to `/dashboard`.

## Do Not Change

- Do not replace Supabase auth with mock auth.
- Do not remove the existing route handlers.
- Do not rename form fields without updating the matching API routes.
- Do not redesign the dashboard in this pass.

## Acceptance Criteria

- `npm.cmd run build` passes.
- `npm.cmd test` passes.
- `/login`, `/signup`, and `/onboarding` render cleanly at desktop and mobile widths.
- Missing Supabase configuration is presented as an expected setup state, not a broken page.
- Successful auth redirects still honor the `next` parameter.

