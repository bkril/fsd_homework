# Adding a New Feature

A feature is a single user interaction that has internal state or an action:
"logout button", "toggle theme", "subscribe to newsletter". Features are
typically client components.

## Checklist

### 1. Create the slice directory

```
src/app/features/<feature>/
```

### 2. Component

`src/app/features/<feature>/<feature>.component.tsx`:

```tsx
"use client";

import { type FC } from "react";

interface IProps {
  variant?: "default" | "compact";
}

// component
const __Feature__Component: FC<Readonly<IProps>> = (props) => {
  const { variant = "default" } = props;

  // hooks, handlers...

  // render
  return (
    <button onClick={() => {}}>
      {/* ... */}
    </button>
  );
};

export default __Feature__Component;
```

### 3. Barrel

`src/app/features/<feature>/index.ts`:

```ts
export { default as __Feature__Component } from "./__feature__.component";
```

### 4. Optional pieces

| When | Add |
|------|-----|
| Feature-specific custom hook | `use-<feature>.hook.ts` |
| Constants used only here | `<feature>.constant.ts` |

## When to choose feature vs shared component

- **Feature** — has domain knowledge or side-effects. Example: "logout" knows
  about the auth client; "language switcher" knows about i18n routing.
- **Shared component** — purely presentational, no domain knowledge. Example:
  Button, Input, Card.

If a "feature" turns out to be purely visual with no side-effects, move it to
`shared/components/`.

## Reference

See `examples/app/features/__feature__/` for the canonical shape.
