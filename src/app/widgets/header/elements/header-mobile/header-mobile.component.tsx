"use client";

import { MenuIcon } from "lucide-react";
import { type FC } from "react";

import { LogoutComponent } from "@/app/features/logout";
import { useUserStore } from "@/app/shared/store";
import { Link } from "@/pkg/locale";
import { Avatar, AvatarFallback } from "@/pkg/theme/ui/avatar";
import { Button } from "@/pkg/theme/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/pkg/theme/ui/drawer";

// interface
interface IProps {}

// component
const HeaderMobileComponent: FC<Readonly<IProps>> = () => {
  const { user } = useUserStore();

  const avatarFallback = user?.name
    ? user.name.slice(0, 2).toUpperCase()
    : "U";

  // render
  return (
    <Drawer>
      <DrawerTrigger className="md:hidden" asChild>
        <Button variant="outline" size="icon">
          <MenuIcon />
          <span className="sr-only">Menu</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="px-6">
          <DrawerTitle>
            <Button asChild variant="outline" className="w-full">
              <Link href="/book-demo">Book a demo</Link>
            </Button>
          </DrawerTitle>
        </DrawerHeader>

        <div className="grid gap-4 px-6 pb-[80vh]">
          {user ? (
            <>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">
                    {user.name}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </span>
                </div>
              </div>

              <LogoutComponent variant="mobile" />
            </>
          ) : (
            <Button asChild className="w-full">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default HeaderMobileComponent;
