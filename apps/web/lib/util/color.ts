import { MantineColor } from "@mantine/core";

export type Rank = {
  threshold: number;
  color: MantineColor;
};
export type Ranks = Rank[];

export const delegatorb = (i: number) => {
  return i <= 0
    ? "cyan"
    : i <= 1
    ? "teal"
    : i <= 2
    ? "green"
    : i <= 3
    ? "yellow"
    : i <= 4
    ? "orange"
    : i <= 5
    ? "maroon"
    : i <= 6
    ? "pink"
    : i <= 7
    ? "grape"
    : i <= 8
    ? "purple"
    : i <= 9 && "blue";
};
export const validatorb = (i: number) => {
  return i <= 10
    ? "teal"
    : i <= 25
    ? "green"
    : i <= 50
    ? "yellow"
    : i <= 75
    ? "orange"
    : i <= 100
    ? "maroon"
    : i <= 150
    ? "pink"
    : i <= 200 && "grape";
};
