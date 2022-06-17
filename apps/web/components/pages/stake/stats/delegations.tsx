import { trimAddr } from "@/lib/util";
import { DelegationResponse, Validator } from "@/types/staking";
import { Button, Center, RingProgress, Text, Tooltip } from "@mantine/core";
import { TbCoin } from "react-icons/tb";

export type DelegationsRingProps = {
  delegations: DelegationResponse[];
  validators: Validator[];
};
export const DelegationsRing = ({
  delegations,
  validators,
}: DelegationsRingProps) => {
  let sum = 0;
  delegations.forEach(
    (d: DelegationResponse) => (sum += parseInt(d.balance.amount))
  );
  const items = delegations.map((d: DelegationResponse, i: number) => {
    const v = validators.find(
      (va: Validator) => va.operator_address == d.delegation.validator_address
    );
    const pct = ((parseInt(d.balance.amount) / sum) * 100).toFixed(0);
    const tooltip =
      (i + 1).toString() +
      ". " +
      (v && v.description?.moniker
        ? v.description.moniker
        : trimAddr(d.delegation.validator_address, 16, 4)) +
      " | " +
      (parseInt(d.balance.amount) / 1000000).toFixed(0) +
      " TOLLO " +
      "(" +
      pct +
      "%)";
    return {
      value: (parseInt(d.balance.amount) / sum) * 100,
      color:
        i == 0
          ? "blue"
          : i == 1
          ? "cyan"
          : i == 2
          ? "violet"
          : i == 3
          ? "red"
          : i == 4
          ? "pink"
          : i == 5
          ? "orange"
          : i == 6
          ? "yellow"
          : i == 7
          ? "green"
          : i == 8
          ? "teal"
          : i == 9
          ? "maroon"
          : "grape",
      tooltip: tooltip,
    };
  });
  return (
    <RingProgress
      size={300}
      thickness={24}
      label={
        <Tooltip
          withArrow
          withinPortal
          transition="slide-up"
          label={`Total Delegations: ${delegations.length}`}
        >
          <Center>
            <Button size="sm" variant="default" leftIcon={<TbCoin />}>
              Your Delegations ({delegations.length})
            </Button>
          </Center>
        </Tooltip>
      }
      sections={items}
    />
  );
};
