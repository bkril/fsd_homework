"use client";

import { useEffect } from "react";

import { useUserStore } from "@/app/shared/store";
import { authClient } from "@/pkg/auth/client";

export function useInitUser() {
  const { setUserStore } = useUserStore();

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (data?.user) {
        setUserStore({ user: data.user });
      }
    });
  }, [setUserStore]);
}
