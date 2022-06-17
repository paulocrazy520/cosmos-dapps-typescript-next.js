import { ValidatorState, ValidatorStatus } from "@/types/staking";
import { Badge } from "@mantine/core";

export const statusReadable = (status: ValidatorState): string => {
  return status.status == "BOND_STATUS_BONDED"
    ? "Active"
    : status.status == "BOND_STATUS_UNBONDED"
    ? status.jailed == true
      ? "Jailed"
      : "Inactive"
    : "Unbonding";
};
