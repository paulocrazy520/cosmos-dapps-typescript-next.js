import create from "zustand/react";
import { createSelectors } from "..";
import { Validator } from "../../../types/staking";

export interface ValidatorsState {
  length: number;
  validators: Validator[];

  update: () => void;
  reset: () => void;
}

export const useTotalValidatorsBase = create<ValidatorsState>()((set) => ({
  length: 0,
  validators: [],
  update: async () =>
    await fetch(`/api/ollo/validators/lcd`)
      .then((res) => res.json())
      .then((res) => res.validators)
      .catch((err) => {
        console.log(err);
        return [];
      }),
  reset: () => {},
}));

export const useTotalValidatorsStore = createSelectors(useTotalValidatorsBase);

// const vs = useTotalValidatorsStore.use.length
// const up = useTotalValidatorsStore.use.update()
