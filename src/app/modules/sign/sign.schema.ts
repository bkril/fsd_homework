import { z } from "zod";

// validation message types
interface IValidationMessages {
  email_invalid: string;
  password_required: string;
  name_min: string;
  password_min: string;
  password_max: string;
}

// sign in schema factory
export const createSignInSchema = (m: IValidationMessages) =>
  z.object({
    email: z.string().email(m.email_invalid),
    password: z.string().min(1, m.password_required),
  });

// sign up schema factory
export const createSignUpSchema = (m: IValidationMessages) =>
  z.object({
    name: z.string().min(2, m.name_min),
    email: z.string().email(m.email_invalid),
    password: z
      .string()
      .min(8, m.password_min)
      .max(20, m.password_max),
  });

export type TSignInSchema = z.infer<ReturnType<typeof createSignInSchema>>;
export type TSignUpSchema = z.infer<ReturnType<typeof createSignUpSchema>>;
