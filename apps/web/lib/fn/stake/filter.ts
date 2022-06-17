import { Validator } from "@/types/staking";

export const jailedV = (validator: Validator[], jailed: boolean = true) => {
  return validator.filter((v: Validator) => v.jailed == jailed);
};
export const activeV = (validators: Validator[]) => {
  return jailedV(validators, false).filter(
    (v) => v.status == "BOND_STATUS_BONDED"
  );
};

export const inactiveUnj = (validators: Validator[]) => {
  return jailedV(validators, false).filter(
    (v) => v.status == "BOND_STATUS_BONDED"
  );
};
export const bondedV = (validators: Validator[]) => {
  return validators.filter((v) => v.status == "BOND_STATUS_BONDED");
};
export const inactiveV = (validators: Validator[]) => {
  return validators.filter((v) => v.status == "BOND_STATUS_UNBONDED");
};
export const unbondingV = (validators: Validator[]) => {
  return validators.filter((v) => v.status == "BOND_STATUS_UNBONDING");
};
