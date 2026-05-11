# Adding a New Widget

A widget is a composite UI block reused across multiple pages: header, footer,
sidebar, breadcrumbs. Widgets compose features and shared components.

## Checklist

### 1. Create the slice directory

```
src/app/widgets/<widget>/
```

### 2. Component

`src/app/widgets/<widget>/<widget>.component.tsx`:

```tsx
import { type FC } from "react";

interface IProps {
  // declare props
}

// component
const __Widget__Component: FC<Readonly<IProps>> = (props) => {
  const {} = props;

  // render
  return (
    <header>
      {/* compose features + shared components */}
    </header>
  );
};

export default __Widget__Component;
```

Note: Widgets use `*.component.tsx`, **not** `*.widget.tsx`. The
`*.module.tsx` suffix is reserved for the modules layer.

### 3. Barrel

`src/app/widgets/<widget>/index.ts`:

```ts
export { default as __Widget__Component } from "./__widget__.component";
```

### 4. Optional sub-elements

For complex widgets with private sub-components, use the same `elements/`
pattern as modules:

```
src/app/widgets/header/
├── header.component.tsx
├── elements/
│   ├── header-mobile/
│   │   ├── header-mobile.component.tsx
│   │   └── index.ts
│   └── user-nav/
│       ├── user-nav.component.tsx
│       └── index.ts
└── index.ts
```

The widget's root imports from each sub-element folder directly. No aggregator
`elements/index.ts`.

## Constraints

- Widgets can import features and entities.
- Widgets **cannot** import modules (modules compose widgets, not the other
  way around).
- Widgets cannot import sibling widgets.

## Reference

See `examples/app/widgets/__widget__/` for the canonical shape.
