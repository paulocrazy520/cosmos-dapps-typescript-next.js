import { Alert } from "@mantine/core";
import { TbAlertCircle } from "react-icons/tb";

export function UnbondingAlert() {
  return (
    <Alert
      icon={<TbAlertCircle size={16} />}
      title="Unbonding Notice"
      color="yellow"
      radius="md"
    >
      Please note that after unbonding from a validator, it will take 14 days to
      receive your staked tokens
    </Alert>
  );
}
