import { ActionBtn } from "@/cmp/buttons";
import { LayoutCard } from "..";
import { SearchInput } from "@/cmp/input/search";
import { openModal } from "@mantine/modals";
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
} from "@mantine/core";
import { TbCoin, TbDots, TbFilter } from "react-icons/tb";
import { violet } from "@/config/theme";
import { FunctionComponent } from "react";
import TooltipText from "@/cmp/text/tooltip";

export const AssetsCard: FunctionComponent<{}> = ({}) => {
  const assets = [
    { value: 30, color: "cyan", tooltip: "TOLLO (30%)" },
    { value: 20, color: "violet", tooltip: "ATOM (20%)" },
    { value: 15, color: "blue", tooltip: "OSMO (15%)" },
    { value: 14, color: "green", tooltip: "JUNO (14%)" },
    { value: 12, color: "yellow", tooltip: "EVMO (12%)" },
    { value: 7, color: "orange", tooltip: "TORI (7%)" },
    { value: 2, color: "red", tooltip: "Other (2%)" },
  ];
  const theme = useMantineTheme();
  return (
    <LayoutCard
      title="Your Assets"
      top={false}
      actions={
        <ActionBtn
          label={"Manage"}
          icon={<TbDots />}
          color={violet(theme)}
          variant="filled"
          onClick={() => {}}
        />
      }
    >
      <Group position="apart">
        <Group position="left">
          <Anchor<"a"> onClick={() => {}}>
            <RingProgress
              style={{}}
              size={225}
              roundCaps
              results={9}
              title="Your Assets"
              thickness={28}
              sections={assets}
              label={
                <Center>
                  <TbCoin size={72} />
                </Center>
              }
            />
          </Anchor>
        </Group>
        <Group position="right">
          <Stack>
            {assets.map((asset, index) => {
              return (
                <Group position="apart" key={index}>
                  <TooltipText tooltip={asset.tooltip}>
                    <ThemeIcon size={"sm"} color={asset.color}>
                      <TbCoin />
                    </ThemeIcon>
                  </TooltipText>
                </Group>
              );
            })}
          </Stack>
        </Group>
      </Group>
      <br />

      <Text>Asset breakdown</Text>
      <Divider />
      <br />
    </LayoutCard>
  );
};
