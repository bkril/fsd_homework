"use client";

import { useUserStore } from "@/app/shared/store";
import { authClient } from "@/pkg/auth/client";
import { toastService } from "@/pkg/theme/services/toast.service";

export function useSignOut() {
  const { clearUserStore } = useUserStore();

  const signOut = async () => {
    try {
      await authClient.signOut();
      clearUserStore();
      window.location.replace("/sign-in");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Sign out failed";
      toastService.error(message);
    }
  };

  return { signOut };
}
