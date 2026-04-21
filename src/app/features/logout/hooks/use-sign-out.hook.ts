"use client";

import { useUserStore } from "@/app/shared/store";
import { authClient } from "@/pkg/auth/client";

export function useSignOut() {
  const { clearUserStore } = useUserStore();

  const signOut = async () => {
    await authClient.signOut();
    clearUserStore();
    window.location.replace("/sign-in");
  };

  return { signOut };
}
