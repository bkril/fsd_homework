---
name: comments
description: Code comment style rules. Use when writing or editing comments in source files. Defines syntax (line comments only), placement (above the symbol), length (1-5 words default), casing (lowercase), and spacing (one blank line before).
user-invocable: true
allowed-tools: Read, Edit
---

# Code Comment Style

A small, opinionated rule set for writing comments. Keep them sparse, useful,
and consistent.

## Rules

### Syntax
Use `//` line comments only. No JSDoc (`/** ... */`), no block comments (`/* ... */`).

### Placement
Place the comment **above** the symbol it describes. Never inline at the end
of a line.

### Length
Default length: **1–5 words**. Longer comments are allowed only when the
"why" is non-obvious and cannot be expressed in fewer words.

### Casing
Use **lowercase** for short labels. Skip trailing punctuation (no period for
1–5 word labels). Use sentence case + period only for full-sentence comments.

### Spacing
Maintain **one blank line** between the previous code block and the comment.
This visually anchors the comment to what follows, not what precedes it.

## Examples

### ✅ Correct

```ts
import { type FC } from "react";

// interface
interface IProps {
  name: string;
}

// component
const HelloComponent: FC<Readonly<IProps>> = (props) => {
  const { name } = props;

  // render
  return <p>Hello, {name}</p>;
};
```

```ts
// retry once on transient network failure
const result = await retry(() => fetch(url), { attempts: 2 });
```

### ❌ Wrong

```ts
/** A React component that greets the user. */
const HelloComponent: FC = () => { ... };  // JSDoc block — banned

const result = await fetch(url); // fetch the user  ← inline trailing comment — banned

// Returns the user name. ← Sentence case + period for a 4-word label — banned

const x = 1;
// no blank line above — visually attaches to `const x` instead of next line
const y = 2;
```

## When NOT to write a comment

Don't write a comment if the code is already self-explanatory. Most well-named
identifiers don't need a label above them. Reserve comments for:

- The **why** that isn't obvious from the code (constraints, workarounds,
  business rules)
- **Sections** in a file (`// interface`, `// component`, `// render`) — these
  are structural, not explanatory
- **Surprising** behavior a reader would not predict

Don't write a comment that just restates the code:

```ts
// ❌ delete the user
deleteUser(id);
```

## Section comments

Section comments are the one case where short, lowercase labels are
encouraged. Use them to mark structural blocks in components:

```ts
// interface
interface IProps { ... }

// component
const XyzComponent: FC<Readonly<IProps>> = (props) => {
  // hooks, derived values...

  // render
  return ...;
};
```
