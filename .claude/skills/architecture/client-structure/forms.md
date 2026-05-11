# Forms

## Stack

- React Hook Form for form state and validation orchestration
- A schema library (zod / valibot / yup) for the validation schema
- `@hookform/resolvers/<lib>` to bridge them

## Schema location

Schemas live in the **entity** layer, not in the form component:

```
src/app/entities/api/<domain>/<domain>.schema.ts
```

The component imports the schema and the inferred type from the entity's
public API.

## Pattern (static schema, hardcoded messages)

```ts
// src/app/entities/api/auth/auth.schema.ts
import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type TSignInSchema = z.infer<typeof signInSchema>;
```

```tsx
// src/app/modules/sign/elements/login/login.component.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signInSchema, type TSignInSchema } from "@/app/entities/api";

const LoginComponent: FC = () => {
  const { control, handleSubmit } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    // submit
  });

  return (
    <form onSubmit={onSubmit}>
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <input {...field} aria-invalid={fieldState.invalid} />
        )}
      />
    </form>
  );
};
```

## Why static schema

- Schema is a constant — same reference every render, no `useMemo` needed.
- Validation messages are inside the schema, hardcoded in one language.
- The component does not need a translator just to build a schema.

## When you need localized messages

Use the schema-factory pattern: the schema is a function `(messages) => zod`,
and the component calls `useMemo(() => factory(localizedMessages), [tv])`. This
is more code — only adopt it if you actually ship the app in multiple
languages and the validation messages matter for UX.

## Controlled inputs only

Use `<Controller>` for every field. Avoid `register` directly — it works for
plain `<input>` but breaks for most UI-library components.
