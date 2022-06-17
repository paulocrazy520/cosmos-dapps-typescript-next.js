import { LayoutCard } from "@/cmp/cards";
import { trimAddr } from "@/lib/util";
import { Gradients, violet } from "@/config/theme";
import { RewardsResponse, ValidatorReward } from "@/types/distribution";
import { Coin } from "@cosmjs/stargate";
import {
  Text,
  Group,
  List,
  Button,
  createStyles,
  MantineTheme,
  Stack,
  Center,
  Loader,
  Space,
} from "@mantine/core";
import { TbCircle, TbPlus } from "react-icons/tb";
import { claimOlloRewards, claimOlloValidatorRewards } from "@/lib/fn/user";
import { useCallback } from "react";
import { ActionBtn } from "@/cmp/buttons";

export declare type RewardsCardProps = {
  bech32Address: string;
  rewardsResponse: RewardsResponse;
};

export const useRewardsStyles = createStyles((theme: MantineTheme) => ({
  listclass: {
    listStyle: "none",
    listStyleType: "none",
  },
}));
export const RewardsCard = ({
  bech32Address,
  rewardsResponse,
}: RewardsCardProps): React.ReactElement<RewardsCardProps> => {
  const {
    theme,
    classes: { listclass },
  } = useRewardsStyles();
  const { rewards, total } = rewardsResponse;
  const claim = useCallback(async (val: string) => {
    const res = await claimOlloValidatorRewards(bech32Address, val);
  }, []);
  const claimAll = useCallback(async () => {
    const res = await claimOlloRewards(bech32Address);
  }, []);
  const tot = (l: Coin[]) =>
    l.length > 0
      ? (
          parseInt(l.find((c: Coin) => c.denom == "utollo").amount) / 1000000
        ).toFixed(2)
      : 0;
  if (rewards) {
    const items = rewards.map((l: ValidatorReward, i: number) => (
      <Group key={l.validator_address} position="apart" noWrap>
        <Group position="left" spacing="sm" noWrap>
          <Button size="sm" p="xs" variant="subtle">
            {i + 1}
          </Button>
          <Text color="dimmed">{trimAddr(l.validator_address)}</Text>
          <Text size="lg" weight="bold">
            {tot(l.reward)}
          </Text>
          <Text size="md" weight="normal" color={violet(theme)}>
            TOLLO
          </Text>
        </Group>
        <Group position="right">
          <ActionBtn
            label="Claim rewards"
            onClick={() => {
              claim(l.validator_address);
            }}
          ></ActionBtn>
        </Group>
      </Group>
    ));
    return (
      <LayoutCard
        actions={
          <Button leftIcon={<TbPlus />} onClick={claimAll}>
            Claim All
          </Button>
        }
        title="Rewards"
      >
        <Group position="apart" grow>
          <Group position="left" grow ml={20}>
            <Text size="md" color="dimmed">
              Total:
            </Text>
          </Group>
          <Group position="right" ml={24}>
            <Text size="lg" weight={"bold"}>
              {tot(total)}
            </Text>
            <Text
              size="lg"
              color={violet(theme)}
              gradient={Gradients.grapePurple}
            >
              TOLLO
            </Text>
          </Group>
        </Group>
        <Space h={10} />
        <Stack
          spacing={"sm"}
          // listStyleType={"inherit"}
          className={listclass}
          defaultValue={0}
          // icon={<TbCircle size={9} color={violet(theme)} />}>
        >
          {items}
        </Stack>
      </LayoutCard>
    );
  } else
    return (
      <LayoutCard>
        <Center>
          <Loader m={18} />
        </Center>
      </LayoutCard>
    );
};

export default RewardsCard;
