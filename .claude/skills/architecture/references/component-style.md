# Component Style

## Section order

```tsx
"use client"; // only if needed

// 1. external imports
// 2. internal imports (aliased)
// 3. relative imports

// interface
interface IProps {
  // ...
}

// component
const XyzComponent: FC<Readonly<IProps>> = (props) => {
  const { x, y } = props;

  const t = useTranslations("xyz");

  const [state, setState] = useState(0);

  const handleClick = () => setState((s) => s + 1);

  // render
  return (
    <div>{/* ... */}</div>
  );
};

export default XyzComponent;
```

Sections are separated by blank lines:

1. Props destructuring (one block)
2. Hooks (translations, stores, router, useState, useEffect, useMemo)
3. Handlers and derived values
4. `// render` comment + `return`

## Props destructuring

Always destructure inside the function body, not in the signature:

✅ Do:
```tsx
const XyzComponent: FC<Readonly<IProps>> = (props) => {
  const { variant, children } = props;
```

❌ Don't:
```tsx
const XyzComponent: FC<Readonly<IProps>> = ({ variant, children }) => {
```

Why: The body form is consistent across components, supports default values
without conflicting with TypeScript types, and gives an obvious place to add
preprocessing of props later.

## Server vs Client components

Default: Server Component. No `"use client"`.

Add `"use client"` only when the file uses:

- `useState`, `useEffect`, `useRef`, or other client-only hooks
- Browser APIs (`window`, `document`, `localStorage`)
- Event handlers directly in JSX
- Client-only libraries

Never add `"use client"` just because a file imports a client component. The
framework handles the boundary automatically.

## Typing

- Use `FC<Readonly<IProps>>` for components with props.
- Use `FC` (no generic) for components without props.
- `Readonly<IProps>` prevents accidental mutation of props inside the body.

## JSX

- Self-closing tags for elements without children: `<Component />`
- One prop per line when there are more than two props
- Avoid logic inside JSX — extract to a variable above `// render`
