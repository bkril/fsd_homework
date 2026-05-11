# `pkg/` — Third-Party Integration Adapters

Each subdirectory wraps one third-party integration (auth, db, rest-api,
theme, i18n, analytics, etc.). The pattern keeps SDK details out of the
business layers.

## Subdirectory shape

```
src/pkg/<integration>/
├── <integration>.client.ts    runs in the browser
├── <integration>.server.ts    runs on the server, prefixed with `import "server-only"`
└── index.ts                   public API (client-safe only)
```

## Server / client separation

- `*.server.ts` files MUST start with `import "server-only"`. This makes the
  build fail if a client component tries to import them.
- The slice's `index.ts` re-exports **only** the client adapter. Server code
  is imported via its full path from inside server components.

## Why wrap third-party SDKs at all

- The rest of the codebase imports a stable internal interface, not the SDK
  directly. If the SDK changes API, you patch the wrapper, not 50 call sites.
- Tests can swap the wrapper for a fake without touching the SDK.
- Client/server runtime split is enforced at module boundary.

## Examples of real integrations

| Integration | Files inside |
|-------------|--------------|
| `auth/` | `auth.client.ts` (sign in/out, session subscriptions), `auth.server.ts` (session lookup, JWT verify) |
| `db/` | `db.server.ts` only — never run on client |
| `rest-api/` | `fetcher/` with one fetcher per upstream API, optional `query-client.ts` |
| `theme/` | UI primitives (Button, Input), CSS variable utilities |
| `locale/` | i18n navigation wrappers (`Link`, `useRouter`) |
