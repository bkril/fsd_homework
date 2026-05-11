# Client Structure

Runtime patterns for the React client. These supplement the FSD layer rules
in `references/` with concrete recipes for state, forms, data, and UI states.

## Files

| File | Topic |
|------|-------|
| `state-management.md` | Zustand stores: state, actions, persist, versioning |
| `forms.md` | React Hook Form + schema validation |
| `data-fetching.md` | Server prefetch + client query patterns |
| `error-boundaries.md` | Loading / error / empty UI states |

## When to consult

- Adding a store → `state-management.md`
- Adding a form → `forms.md`
- Adding a page that fetches data → `data-fetching.md`
- Wrapping an async UI block → `error-boundaries.md`
