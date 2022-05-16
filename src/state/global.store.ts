import create, { GetState, SetState } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface GlobalState {
  isWallectConnected: boolean;
  isDarkTheme: boolean;
  updateWalletState: (newState: boolean) => void;
  updateThemeState: (newState: boolean) => void;
}

const store = (set: SetState<GlobalState>, get: GetState<GlobalState>) => ({
  isWallectConnected: false,
  isDarkTheme: false,
  updateWalletState: (newState: boolean) =>
    set({ isWallectConnected: newState }),
  updateThemeState: (newState: boolean) => set({ isDarkTheme: newState }),
  clear: () => set(() => ({ isWallectConnected: false, isDarkTheme: false })),
});

const useGlobalStore = create(
  persist(devtools(store), {
    name: "globalStorage",
    getStorage: () => localStorage,
    version: 1,
  })
);

export default useGlobalStore;
