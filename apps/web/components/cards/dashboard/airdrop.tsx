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
  Card,
  Progress,
  Timeline,
} from "@mantine/core";
import { TbCheck, TbCoin, TbDots, TbFilter } from "react-icons/tb";
import { violet } from "@/config/theme";
import { FunctionComponent } from "react";
import TooltipText from "@/cmp/text/tooltip";
import { useRouter } from "next/router";

export const AirdropCard: FunctionComponent<{}> = ({}) => {
  const router = useRouter();
  const theme = useMantineTheme();
  return (
    <LayoutCard
      title="Wisedrop"
      actions={
        <Button
          variant="filled"
          color={violet(theme)}
          size="sm"
          onClick={() => {
            router.push("/airdrop");
          }}
        >
          <TbCheck />
          &nbsp;Check
        </Button>
      }
    >
      <Card
        withBorder
        radius="md"
        p="xl"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        })}
      >
        <Text size="xs" transform="uppercase" weight={700} color="dimmed">
          Total Airdrop Claimed
        </Text>
        <Text size="lg" weight={500}>
          22,355,409 / 45,000,000
        </Text>
        <Progress
          value={54.31}
          mt="md"
          size="lg"
          radius="xl"
          color={violet(theme)}
        />
      </Card>
      <Timeline active={1}>{/* items */}</Timeline>
    </LayoutCard>
  );
};
