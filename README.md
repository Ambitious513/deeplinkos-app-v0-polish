# DeepLinkOS App

Clean rebuild workspace for DeepLinkOS.

This repo replaces the rough experimental `deeplinkos` history with a production-focused Next.js app rebuild. The old project remains a reference source only. Do not bulk-copy the old repo into this one.

## Current Goal

Build a shippable DeepLinkOS product around the already-proven core smart-link behavior:

- Smart link creation
- `/r/[slug]` redirect resolution
- Bot/prefetch click filtering
- UTM passthrough
- Supabase-backed auth, links, clicks, and analytics
- Polished public site and authenticated dashboard

## Reference Source

Old local repo:

```text
C:\Users\USER\Desktop\SORT KEYWORDS\SAFE MIGRATION
```

Use it as a reference library, not as a codebase to patch.

Start with:

- `docs/00-rebuild-plan.md`
- `docs/01-source-inventory.md`
- `docs/02-stabilization-checklist.md`
- `docs/03-v0-dashboard-implementation-brief.md`
- `docs/04-v0-public-site-polish-brief.md`

Reference artifacts live in `docs/reference/`. Files under `docs/reference/old-core-source/` are snapshots from the old repo and are not live app code.
