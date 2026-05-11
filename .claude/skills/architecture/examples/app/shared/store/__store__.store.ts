// Zustand store template with persist + version migration.
// See client-structure/state-management.md for the full pattern.

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IState {
  value: string | null;
}

interface IStore extends IState {
  set__Store__: (value: Partial<IState>) => void;
  clear__Store__: () => void;
}

export const use__Store__Store = create<IStore>()(
  devtools(
    persist(
      (set) => ({
        value: null,
        set__Store__: (v) => set((s) => ({ ...s, ...v })),
        clear__Store__: () => set({ value: null }),
      }),
      {
        name: "__store__-store",
        version: 1,
        partialize: (s) => ({ value: s.value }),
        migrate: (persisted, version) => {
          if (version < 1) return { value: null };
          return persisted as IState;
        },
      },
    ),
    {
      name: "__store__-store",
      enabled:
        process.env.NODE_ENV !== "production" &&
        typeof window !== "undefined",
    },
  ),
);
