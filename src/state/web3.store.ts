import { ethers } from "ethers";
import create, { GetState, SetState } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Web3State {
  data: Web3StateData;
  updateState: (newState: Partial<Web3StateData>) => void;
}

interface Web3StateData {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  address: string | null;
  network: ethers.providers.Network | null;
}

const WEB3_INITIAL_STATE: Web3StateData = {
  provider: null,
  signer: null,
  address: null,
  network: null,
};

const store = (set: SetState<Web3State>, get: GetState<Web3State>) => ({
  data: WEB3_INITIAL_STATE,
  updateState: (newState: Partial<Web3StateData>) =>
    set((state: Web3State) => ({ data: { ...state.data, ...newState } })),
  clear: () => set(() => ({ data: WEB3_INITIAL_STATE })),
});

const useWeb3Store = create(devtools(store));

export default useWeb3Store;
