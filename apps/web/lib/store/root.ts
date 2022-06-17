import create, { createStore, useStore } from "zustand";

const useStores = create((set) => ({
  validators: [],
  // allValidators: validator => {
  //     get(validatoraddr => ({
  //         validators.fi
  //     }))
  // }
}));
