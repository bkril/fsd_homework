"use client";

import { LogOutIcon } from "lucide-react";
import { type FC } from "react";

import { useSignOut } from "./use-sign-out.hook";
import { Button } from "@/pkg/theme/ui/button";

// interface
interface IProps {
  variant?: "default" | "mobile";
}

// component
const LogoutComponent: FC<Readonly<IProps>> = ({ variant = "default" }) => {
  const { signOut } = useSignOut();

  // render
  if (variant === "mobile") {
    return (
      <Button variant="destructive" className="w-full" onClick={signOut}>
        <LogOutIcon className="mr-2 h-4 w-4" />
        Sign out
      </Button>
    );
  }

  return (
    <button onClick={signOut} className="flex w-full items-center">
      <LogOutIcon className="mr-2 h-4 w-4" />
      Sign out
    </button>
  );
};

export default LogoutComponent;
