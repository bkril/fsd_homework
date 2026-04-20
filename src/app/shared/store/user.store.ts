import { create } from "zustand";
import { devtools } from "zustand/middleware";

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
    (set) => ({
      user: null,
      setUserStore: (value: Partial<IState>) =>
        set((state: IState) => ({ ...state, ...value })),
      clearUserStore: () => set({ user: null }),
    }),
    {
      name: "user-store",
      enabled:
        process.env.NODE_ENV !== "production" && typeof window !== "undefined",
    },
  ),
);
