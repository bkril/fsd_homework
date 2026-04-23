"use client";

import { useTranslations } from "next-intl";
import { type FC } from "react";

import { LogoutComponent } from "@/app/features/logout";
import { useInitUser } from "@/app/shared/hooks";
import { useUserStore } from "@/app/shared/store";
import { Link } from "@/pkg/locale";
import { Avatar, AvatarFallback } from "@/pkg/theme/ui/avatar";
import { Button } from "@/pkg/theme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/pkg/theme/ui/dropdown-menu";

// interface
interface IProps {}

// component
const UserNavComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations("nav");
  const { user } = useUserStore();

  useInitUser();

  const avatarFallback = user?.name ? user.name.slice(0, 2).toUpperCase() : "U";

  // render
  if (!user) {
    return (
      <Button asChild className="max-md:hidden">
        <Link href="/sign-in">{t("sign_in")}</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="max-md:hidden gap-2 pl-2 pr-3">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <span className="max-w-[120px] truncate text-sm">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="font-medium">{user.name}</span>
          <span className="text-xs font-normal text-muted-foreground truncate">
            {user.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            {t("dashboard")}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <LogoutComponent />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavComponent;
