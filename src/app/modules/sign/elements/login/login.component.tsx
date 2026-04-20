"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  signInSchema,
  type TSignInSchema,
} from "@/app/modules/sign/sign.schema";
import { InputComponent } from "@/app/shared/components/input";
import { useUserStore } from "@/app/shared/store";
import { authClient } from "@/pkg/auth/client";
import { Link, useRouter } from "@/pkg/locale";
import { toastService } from "@/pkg/theme/services/toast.service";
import { Button } from "@/pkg/theme/ui/button";
import { Checkbox } from "@/pkg/theme/ui/checkbox";
import { Label } from "@/pkg/theme/ui/label";
import { Spinner } from "@/pkg/theme/ui/spinner";

// interface
interface IProps {}

// component
const LoginComponent: FC<Readonly<IProps>> = () => {
  const router = useRouter();
  const { setUserStore } = useUserStore();

  const [isPending, setIsPending] = useState(false);

  const { control, handleSubmit } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;

    setIsPending(true);

    try {
      const { data: res, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (res?.user) {
        setUserStore({ user: res.user });
        toastService.success("Welcome back!");
        router.push("/dashboard");
      } else {
        setIsPending(false);
        toastService.error(error?.message || "Invalid credentials");
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Checkbox id="remember" />
          <Label
            htmlFor="remember"
            className="cursor-pointer text-sm text-muted-foreground"
          >
            Remember me
          </Label>
        </div>

        <Button
          asChild
          variant="link"
          size="sm"
          className="h-auto p-0 text-sm text-primary"
        >
          <Link href="/forgot-password">Forgot password?</Link>
        </Button>
      </div>

      <Button
        className="h-11 w-full font-semibold"
        type="submit"
        disabled={isPending}
      >
        {isPending ? <Spinner className="mr-2 h-4 w-4" /> : null}
        Sign in
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Button
          asChild
          variant="link"
          className="h-auto p-0 text-sm font-semibold text-primary"
        >
          <Link href="/sign-up">Create account</Link>
        </Button>
      </p>
    </form>
  );
};

export default LoginComponent;
