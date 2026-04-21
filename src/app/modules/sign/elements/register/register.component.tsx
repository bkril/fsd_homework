"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  signUpSchema,
  type TSignUpSchema,
} from "@/app/modules/sign/sign.schema";
import { InputComponent } from "@/app/shared/components/input";
import { useUserStore } from "@/app/shared/store";
import { authClient } from "@/pkg/auth/client";
import { Link } from "@/pkg/locale";
import { toastService } from "@/pkg/theme/services/toast.service";
import { Button } from "@/pkg/theme/ui/button";
import { Spinner } from "@/pkg/theme/ui/spinner";

// interface
interface IProps {}

// component
const RegisterComponent: FC<Readonly<IProps>> = () => {
  const { setUserStore } = useUserStore();

  const [isPending, setIsPending] = useState(false);

  const { control, handleSubmit } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    const { email, password, name } = data;

    setIsPending(true);

    try {
      const { data: res, error } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (res?.user) {
        setUserStore({ user: res.user });
        toastService.success("Account created!");
        window.location.replace("/dashboard");
      } else {
        setIsPending(false);
        toastService.error(error?.message || "Something went wrong");
      }
    } catch (error: unknown) {
      setIsPending(false);
      const message = error instanceof Error ? error.message : "Something went wrong";
      toastService.error(message);
    }
  });

  // render
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState: { invalid, error } }) => (
          <InputComponent
            {...field}
            label="Full name"
            invalid={invalid}
            message={error?.message}
            placeholder="John Doe"
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState: { invalid, error } }) => (
          <InputComponent
            {...field}
            label="Email"
            invalid={invalid}
            message={error?.message}
            type="email"
            placeholder="you@example.com"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState: { invalid, error } }) => (
          <InputComponent
            {...field}
            label="Password"
            invalid={invalid}
            message={error?.message}
            type="password"
            placeholder="••••••••••••••••"
          />
        )}
      />

      <Button
        className="h-11 w-full font-semibold"
        type="submit"
        disabled={isPending}
      >
        {isPending ? <Spinner className="mr-2 h-4 w-4" /> : null}
        Create account
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Button
          asChild
          variant="link"
          className="h-auto p-0 text-sm font-semibold text-primary"
        >
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </p>
    </form>
  );
};

export default RegisterComponent;
