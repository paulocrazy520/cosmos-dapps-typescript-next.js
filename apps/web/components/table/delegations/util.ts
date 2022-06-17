import { statusReadable } from "@/lib/fn/stake/util";
import { Badge, Group } from "@mantine/core";
import { DelegationResponse, Validator, ValidatorState } from "@/types/staking";

export const validatorFromDelegation = (
  v: Validator[],
  d: DelegationResponse
): Validator => {
  return v.find(
    (vs: Validator) => vs.operator_address === d.delegation.validator_address
  );
};

export const StatusBadge = (status: ValidatorState) => {
  const s = statusReadable(status);
};
