import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// interface
interface IUser {
  id: string;
  email: string;
  name: string;
}

interface IState {
  user: IUser | null;
}

interface IStore extends IState {
  setUserStore: (value: Partial<IState>) => void;
  clearUserStore: () => void;
}

// store
export const useUserStore = create<IStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUserStore: (value: Partial<IState>) =>
          set((state: IState) => ({ ...state, ...value })),
        clearUserStore: () => set({ user: null }),
      }),
      {
        name: "user-store",
        version: 1,
        partialize: (state) => ({ user: state.user }),
        migrate: (persisted, version) => {
          if (version < 1) return { user: null };
          return persisted as IState;
        },
      },
    ),
    {
      name: "user-store",
      enabled:
        process.env.NODE_ENV !== "production" && typeof window !== "undefined",
    },
  ),
);
