import { trimAddr } from "@/lib/util";
import { DelegationResponse, Validator } from "@/types/staking";
import { Button, Center, RingProgress, Text, Tooltip } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { TbCoin } from "react-icons/tb";

export type ActiveSetRingProps = {
  validators: Validator[];
};
export type InactiveRingProps = {
  validators: Validator[];
};
export const ActiveSetRing = ({ validators }: ActiveSetRingProps) => {
  let sum = 0;
  validators.forEach((v: Validator) => (sum += parseInt(v.tokens)));
  const items = validators.map((v: Validator, i: number) => {
    const pct = (parseInt(v.tokens) / sum) * 100;
    const tooltip =
      (v && v.description?.moniker
        ? v.description.moniker
        : trimAddr(v.operator_address, 16, 4)) +
      " | " +
      (parseInt(v.tokens) / 1000000).toFixed(2) +
      " TOLLO " +
      "(" +
      pct +
      "%)";
    return {
      value: (parseInt(v.tokens) / sum) * 100,
      color:
        i % 10 == 0
          ? "blue"
          : i % 10 == 1
          ? "cyan"
          : i % 10 == 2
          ? "violet"
          : i % 10 == 3
          ? "red"
          : i % 10 == 4
          ? "pink"
          : i % 10 == 5
          ? "orange"
          : i % 10 == 6
          ? "yellow"
          : i % 10 == 7
          ? "green"
          : i % 10 == 8
          ? "teal"
          : i % 10 == 9
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
          label={`Total Validators: ${validators.length}`}
        >
          <Center>
            <Button
              variant="default"
              onClick={() => {
                showNotification({
                  title: "Active validators",
                  message: validators.length,
                });
              }}
            >
              Active set: {validators.length} / 100
            </Button>
          </Center>
        </Tooltip>
      }
      sections={items}
    />
  );
};
