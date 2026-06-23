# Phase 4 Auth And Onboarding

## Status

Phase 4 wires Supabase Auth into the clean rebuild and makes the dashboard shell/profile page read real session state. The app still builds without Supabase env vars so local prototype work is not blocked.

## Added

- Auth pages:
  - `/login`
  - `/signup`
  - `/onboarding`
- Auth route handlers:
  - `POST /api/auth/login`
  - `POST /api/auth/signup`
  - `POST /api/auth/signout`
  - `GET /auth/callback`
  - `POST /api/onboarding`
- Session/profile helper:
  - `lib/auth/session.ts`
- Reusable auth components:
  - `AuthForm`
  - `OnboardingForm`
  - `SignOutButton`
- Dashboard layout now requires an authenticated, onboarded profile when Supabase is configured.
- Dashboard shell displays workspace name, user email, and sign-out control.
- Profile page reads current profile/session state instead of showing a placeholder.
- Public CTAs now route to `/signup` and `/login`.

## Behavior

- Missing Supabase env vars do not break builds or local visual review.
- With Supabase configured, dashboard and onboarding routes are protected.
- Signup stores first and last name in auth metadata.
- Onboarding upserts `profiles` with name, workspace, and `onboarding_completed_at`.
- Dashboard redirects incomplete profiles to onboarding.

## Verification

- `npm.cmd run build`
- `npm.cmd test`

## Known Follow-Ups

- Add OAuth providers if needed.
- Add forgot-password and reset-password flows.
- Replace profile placeholder fields with editable profile settings.
- Add integration smoke tests once Supabase credentials are configured.
