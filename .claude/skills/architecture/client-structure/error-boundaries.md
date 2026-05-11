# Error / Loading / Empty States

Every async UI block has three orthogonal states. Render all three explicitly.

## The three states

| State | Trigger | Rendering |
|-------|---------|-----------|
| Loading | Data not yet fetched | Skeleton or spinner |
| Error | Fetch failed | Message + retry CTA |
| Empty | Fetch succeeded, zero results | Placeholder + suggestion |

## Pattern

```tsx
const { data, isLoading, isError, refetch } = use<Entities>Query();

if (isError) {
  return (
    <div className="error-block">
      <p>Could not load <entities>.</p>
      <button onClick={() => refetch()}>Try again</button>
    </div>
  );
}

if (isLoading) {
  return (
    <div className="grid">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="card-skeleton" />
      ))}
    </div>
  );
}

if (data.length === 0) {
  return (
    <div className="empty-block">
      <p>No <entities> match your filters.</p>
    </div>
  );
}

return (
  <div className="grid">
    {data.map((item) => <<Entity>Card key={item.id} <entity>={item} />)}
  </div>
);
```

## Rules

- Never assume `data` exists. Type narrowing or explicit guards.
- Never silently render `null` on error. The user must know something went
  wrong.
- Loading skeletons should match the final layout (same grid, same card size)
  to avoid content shift.
- Empty state must be distinguishable from loading — different icon, different
  copy.

## React Error Boundary

For unexpected runtime errors (not data-fetch errors), wrap subtrees with an
ErrorBoundary at the **module** or **page** level. Don't put ErrorBoundary
inside small reusable components — let the failure propagate to the boundary
the page owner controls.
