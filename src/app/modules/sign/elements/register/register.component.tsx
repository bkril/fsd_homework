"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { type FC, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  createSignUpSchema,
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
  const t = useTranslations("sign");
  const tv = useTranslations("validation");
  const { setUserStore } = useUserStore();

  const [isPending, setIsPending] = useState(false);

  const schema = useMemo(
    () =>
      createSignUpSchema({
        email_invalid: tv("email_invalid"),
        password_required: tv("password_required"),
        name_min: tv("name_min"),
        password_min: tv("password_min"),
        password_max: tv("password_max"),
      }),
    [tv]
  );

  const { control, handleSubmit } = useForm<TSignUpSchema>({
    resolver: zodResolver(schema),
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
        toastService.success(t("toast_created"));
        window.location.replace("/countries");
      } else {
        setIsPending(false);
        toastService.error(error?.message || t("toast_error"));
      }
    } catch (error: unknown) {
      setIsPending(false);
      const message = error instanceof Error ? error.message : t("toast_error");
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
            label={t("name_label")}
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
            label={t("email_label")}
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
            label={t("password_label")}
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
        {t("create_account_btn")}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {t("have_account")}{" "}
        <Button
          asChild
          variant="link"
          className="h-auto p-0 text-sm font-semibold text-primary"
        >
          <Link href="/sign-in">{t("sign_in_btn")}</Link>
        </Button>
      </p>
    </form>
  );
};

export default RegisterComponent;
