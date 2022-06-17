import { LayoutCard } from "..";
import {
  useMantineTheme,
  Group,
  Text,
  Anchor,
  ThemeIcon,
  Button,
  RingProgress,
  Center,
  Stack,
  Divider,
  Card,
  Progress,
  Timeline,
  Paper,
  Title,
} from "@mantine/core";
import { violet } from "@/config/theme";
import { FunctionComponent } from "react";
import { Validator } from "@/types/staking";

export const ValidatorsCard: FunctionComponent<Validator[]> = (
  v: Validator[]
) => {
  return (
    <LayoutCard title="Validators">
      {v.map((v: Validator, i: number) => (
        <Text key={i}>
          {i} {v.description.moniker}
        </Text>
      ))}
    </LayoutCard>
  );
};
