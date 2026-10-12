# Commerce Frontends

Three independent React + Vite applications with separate routes, Redux stores, API clients, environment configuration, styling, and production outputs. The existing JavaScript/JSX stack and charcoal, gold, and cream design are preserved.

| Application | Source | Run from repository root | Build output |
| --- | --- | --- | --- |
| Client storefront | `src/` | `npm run dev` | `dist/` |
| Shared owner portal | `owner-portal/src/` | `npm run dev:owner` | `owner-portal/dist/` |
| Platform super admin | `super-admin/src/` | `npm run dev:super-admin` | `super-admin/dist/` |

## Setup

Run `npm ci` in the root. All apps use that dependency installation for local development. Each management folder also has its own package manifest, lockfile, and ESLint configuration for independent installation.

Copy `.env.example` to `.env`, `owner-portal/.env.example` to `owner-portal/.env`, and `super-admin/.env.example` to `super-admin/.env`. Existing storefront `.env` settings are preserved. Management apps do not inherit the storefront environment or a fixed store slug. Vite environment settings are public build configuration, not secrets.

Run the three development commands in separate terminals. Storefront normally runs at `http://localhost:5173/`; owner login is `http://localhost:5174/login`; super admin login is `http://localhost:5175/super-admin/login`.

## Verification

```sh
npm run build:all
npm run lint
node --test scripts/api-boundaries.test.mjs
```

Individual builds are `npm run build`, `npm run build:owner`, and `npm run build:super-admin`. Previews are `npm run preview`, `npm run preview:owner`, and `npm run preview:super-admin`.

## Deployment and routes

Deploy the storefront `dist/` to each client's domain. `VITE_STORE_SLUG` selects the public store. Client design changes belong to the storefront; management apps do not import its components or styles. This split does not yet introduce a client theme registry or automatic provisioning. Keep client deployments on explicitly selected releases so a code change does not automatically redeploy every store.

Deploy `owner-portal/dist/` at the shared management domain root. Routes are `/login`, `/`, `/products`, `/reports/orders`, `/analytics`, `/reports/cities`, `/reports/status`, and `/change-password`.

Deploy `super-admin/dist/` under `/super-admin/` on that same domain. Routes are `/super-admin/login`, `/super-admin/`, and `/super-admin/stores`. Change `VITE_ADMIN_BASE_PATH` in `super-admin/.env` to use another prefix, for example `/platform-control/`. It must start and end with `/`. Rebuild and configure the host for that exact prefix. No storefront or owner page links to super admin. The prefix is not a security boundary or a secret.

The host must serve the super admin prefix and its assets from its own output **before** applying the owner portal SPA fallback. Owner deep links fall back to the owner `index.html`; super admin deep links fall back to its own `index.html`. Storefront routes need their own SPA fallback on client domains. Do not merge the three output directories.

## Backend contract

The backend is outside this folder and must be verified separately:

- Owner login uses email/password without a fixed `X-Store-Slug`. Owner API endpoints derive and authorize the tenant from the authenticated session. If the backend currently requires a slug, update that contract before deploying the shared portal.
- Owner auth endpoints remain `/auth/login`, `/auth/me`, `/auth/refresh`, `/auth/logout`, and `/auth/change-password`. Super admin auth endpoints remain `/auth/super-admin/login`, `/auth/super-admin/me`, `/auth/super-admin/refresh`, and `/auth/super-admin/logout`.
- `/me` returns the user in `data.data`; login returns `data.data.user`. Existing roles remain `owner` and `super_admin`. Business API response shapes are preserved.
- Management requests send cookies. Prefer proxying `/api` on the management domain and using `VITE_API_BASE_URL=/api`. Cross-origin API hosting needs explicit allowed origins, credential support, suitable cookie attributes, and CSRF protection. Owner and super admin must have distinct backend cookie/session contexts.
- Public storefront requests send a store slug, do not send credentials, and do not refresh authentication. Catalog, metadata, checkout, and tracking endpoints must support anonymous customers. The backend must validate public store selection and order access.
- Enforce tenant isolation, roles, super admin MFA, rate limits, and audit logging on the backend. Frontend guards cannot enforce API security.

Management query caches are isolated by account and cleared on unmount. Failed refresh signals session expiration. Wrong-role accounts cannot enter protected layouts.

## Remaining production work

This restructuring does not certify the whole platform as production ready. Live backend authentication, tenant isolation, order workflows, hosting, MFA, backups, and monitoring still need verification. The existing contact form only shows local confirmation, and stock management remains a placeholder; this split does not implement those backend features.
