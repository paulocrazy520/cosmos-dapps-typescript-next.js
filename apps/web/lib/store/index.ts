import create, {
  SetState,
  State,
  StateCreator,
  StoreApi,
  UseBoundStore,
} from "zustand";
import { persist } from "zustand/middleware";

export interface IUserSlice {
  isLoggedIn: boolean;
  address: string;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}
export const createUserSlice: StateCreator<IUserSlice> = (set) => ({
  isLoggedIn: false,
  address: "",
  setIsLoggedIn: (isLoggedIn): void => {
    set({ isLoggedIn });
  },
});

export interface IStore extends IUserSlice {}

export const useStore = create<IStore>();

export type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<State>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};
