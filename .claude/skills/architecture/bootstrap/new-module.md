# Adding a New Module

A module is the unit that composes entities, features, and UI into a
page-sized block. Pages render modules.

## Checklist

### 1. Create the slice directory

```
src/app/modules/<module>/
```

### 2. Root component

`src/app/modules/<module>/<module>.module.tsx`:

```tsx
// Server Component by default — add "use client" only if needed.

import { type FC } from "react";

interface IProps {
  // declare props
}

// component
const __Module__Module: FC<Readonly<IProps>> = (props) => {
  const {} = props;

  // render
  return (
    <section>
      {/* compose features + entities here */}
    </section>
  );
};

export default __Module__Module;
```

### 3. Barrel

`src/app/modules/<module>/index.ts`:

```ts
export { default as __Module__Module } from "./__module__.module";
```

### 4. Optional pieces (add when needed)

| When | Add |
|------|-----|
| Constants used only here | `<module>.constant.ts` |
| Private sub-components | `elements/<element>/<element>.component.tsx` + `index.ts` |
| Pure helpers / business logic | `services/<action>.service.ts` + `services/index.ts` |
| Form schema (if not in entities) | `<module>.schema.ts` |

### 5. Wire to a page

The page (route) imports and renders the module:

```tsx
import { __Module__Module } from "@/app/modules/__module__";

export default function Page() {
  return <__Module__Module />;
}
```

## Constraints

- Modules cannot import from other modules.
- Modules cannot import from widgets or features above them. They can import
  features (for actions like logout, language switcher) — features are below
  modules. The exact direction is `widgets → features → modules → entities`.
  Re-read `references/layers.md` if unsure.
- Constants and helpers belong in `<module>.constant.ts` and `services/`,
  never inline at the top of the module file.

## Reference

See `examples/app/modules/__module__/` for the canonical structure.
