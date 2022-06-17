import { violet } from "@/cfg/theme";
import { olloKeplrChainInfo } from "@/config/ollo";
import { getOlloBalance, getOlloSpendableBalance } from "@/lib/fn";
import { useKeplr } from "@/hooks/use-keplr";
import { disconnect } from "@/lib/fn/user/keplr";
import { apiGet, endpoints } from "@/lib/api";
import { subS, trimAddr, zeroAmt } from "@/lib/util";
import { SigningStargateClient, Coin } from "@cosmjs/stargate";
import { Keplr } from "@keplr-wallet/types";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Button,
  Card,
  Indicator,
  Menu,
  Space,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import {
  createStyles,
  ThemeIcon,
  Progress,
  Text,
  Group,
  Badge,
  Paper,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import {
  TbCompass,
  TbCopy,
  TbDoorExit,
  TbDots,
  TbEye,
  TbFile,
  TbInfoCircle,
  TbPlus,
  TbSettings,
  TbTree,
  TbUser,
  TbUserCircle,
  TbWallet,
} from "react-icons/tb";
import { useCallback } from "react";
import { getOlloRewards } from "@/lib/fn/user";
import { useState } from "react";
import { Rewards } from "@keplr-wallet/stores/build/query/cosmos/staking/types";
import { Reward } from "@/types/staking";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { RewardsResponse } from "@/types/distribution";

const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "visible",
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
    backgroundColor:
      theme.colorScheme == "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
  },

  icon: {
    position: "absolute",
    top: -ICON_SIZE / 3,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

export type UserOverviewCardProps = {
  avatar?: string;
  username: string;
  olloAddr: string;
  balance: Coin;
  spendableBalance: Coin;
  stakedBalance: Coin;
};

export const UserOverviewCard = ({
  stakedBalance,
  olloAddr,
  spendableBalance,
  balance,
  avatar,
  username,
}: UserOverviewCardProps) => {
  const disconn = useCallback(async () => {}, []);
  const iconSize = 60;
  const clipboard = useClipboard({ timeout: 500 });
  const router = useRouter();
  const q = useQueryClient();
  const { classes, theme } = useStyles();
  const [{ data: bal }, { data: staked }, { data: rew }] = useQueries({
    queries: [
      {
        queryKey: ["ollo", "balance", olloAddr],
        queryFn: async () => {
          return await getOlloBalance(olloAddr);
        },
        initialData: (): Coin => {
          return balance
            ? balance
            : q.getQueryData<Coin>(["ollo", "balance", olloAddr]);
        },
      },
      {
        queryKey: ["ollo", "balance", "staked", olloAddr],
        queryFn: async () => {
          return await getOlloBalance(olloAddr);
        },
        initialData: (): Coin => {
          return balance
            ? balance
            : q.getQueryData<Coin>(["ollo", "balance", "staked", olloAddr]);
        },
      },
      {
        queryKey: ["ollo", "rewards", olloAddr],
        queryFn: () => getOlloRewards(olloAddr),
        initialData: () => {
          return q.getQueryData<RewardsResponse>(["ollo", "rewards", olloAddr]);
        },
      },
    ],
  });

  // const rw = data && data.total.map((rw: Coin) => <Text>{rw.amount}</Text>)
  // const tt = data && data.rewards.map((rw: Reward) => <Text>{rw.validator_address}</Text>)

  if (rew && bal) {
    const { rewards, total } = rew;
    return (
      <Card radius={"md"} withBorder className={classes.card} mt={iconSize / 3}>
        <ThemeIcon
          className={classes.icon}
          color={violet(theme)}
          size={iconSize}
          style={{
            boxShadow: "0px 0px 4px rgba(0,0,0,0.15)",
          }}
          radius={iconSize}
        >
          <Indicator
            inline
            label=""
            offset={-3}
            size={12}
            zIndex={0}
            color={
              theme.colorScheme == "dark"
                ? theme.colors.teal[5]
                : theme.colors.teal[7]
            }
          >
            {avatar ? (
              <Avatar src={avatar} size={34}></Avatar>
            ) : (
              <TbUser size={34} />
            )}
          </Indicator>
        </ThemeIcon>
        <Group position="apart">
          <Group position="left">
            <Tooltip label={"More info"} withArrow transition={"slide-up"}>
              <Button variant="filled" size="xs" p="xs">
                <TbPlus />
              </Button>
            </Tooltip>
          </Group>
          <Group position="right">
            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <Tooltip label={"More info"} withArrow transition={"slide-up"}>
                  <Button variant="filled" size="xs" p="xs">
                    <TbDots size={12} />
                  </Button>
                </Tooltip>
              </Menu.Target>

              <Menu.Dropdown
                style={{
                  boxShadow: "0px 0px 8px rgba(0,0,0,0.3)",
                }}
              >
                <Menu.Item icon={<TbUser size={14} />}>Profile</Menu.Item>
                <Menu.Item icon={<TbWallet size={14} />}>Wallet</Menu.Item>
                <Menu.Item icon={<TbInfoCircle size={14} />}>Info</Menu.Item>
                <Menu.Item icon={<TbSettings size={14} />}>
                  Preferences
                </Menu.Item>
                <Menu.Item icon={<TbCompass size={14} />}>
                  <UnstyledButton
                    onClick={() =>
                      router.push(
                        "https://explorer.ollo.zone/ollo/account/" + olloAddr
                      )
                    }
                  >
                    Explorer
                  </UnstyledButton>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
        <Space h={1} />
        <Card.Section p={"sm"}>
          <Text size={22} align="center" weight={700} className={classes.title}>
            {username ? username : trimAddr(olloAddr, 12, 5)}
          </Text>
          <Space h={8} />
          <Group position="center" mt={8}>
            <Tooltip
              label={"Click to copy address"}
              withArrow
              transition={"slide-up"}
            >
              <Button.Group>
                <Button
                  color="dimmed"
                  variant={"light"}
                  size="xs"
                  onClick={() => {
                    clipboard.copy(olloAddr);
                    showNotification({
                      title: "Address copied",
                      message: "Copied address " + olloAddr,
                    });
                  }}
                >
                  {olloAddr && trimAddr(olloAddr, 13, 5)}
                </Button>
                <Button
                  color="dimmed"
                  variant={"light"}
                  size="xs"
                  onClick={() => {
                    clipboard.copy(olloAddr);
                    showNotification({
                      title: "Address copied",
                      message: "Copied address " + olloAddr,
                    });
                  }}
                >
                  <TbCopy />
                </Button>
              </Button.Group>
            </Tooltip>
          </Group>
        </Card.Section>

        <Card.Section p={"lg"} withBorder>
          <Group position="apart" mt="xs">
            <Text size="sm" color="dimmed">
              Pending Rewards
            </Text>
            <Group position="right" spacing="sm">
              <Text size="sm" weight={"bolder"}>
                {total.length > 0
                  ? (
                      parseInt(
                        total.find((c: Coin) => c.denom == "utollo").amount
                      ) / 1000000
                    ).toFixed(4)
                  : 0}
              </Text>
              <Tooltip
                transition="slide-up"
                label={`${
                  total.length > 0 ? total[0].amount : 0
                } TOLLO pending`}
                withArrow
                withinPortal
              >
                <Badge
                  style={{ cursor: "pointer" }}
                  variant="outline"
                  onClick={() => router.push("/stake")}
                  p="xs"
                  rightSection={<TbUser style={{ marginTop: 4 }} size={14} />}
                >
                  {rewards.length}
                </Badge>
              </Tooltip>
              <Text size="sm" color="violet">
                TOLLO
              </Text>
            </Group>
          </Group>
          <Group position="apart" mt="xs">
            <Text size="sm" color="dimmed">
              Balance
            </Text>
            <Group position="right">
              <Text size="sm" weight={"bolder"}>
                {(parseInt(spendableBalance.amount) / 1000000).toFixed(3)}
              </Text>
              <Text size="sm" color="violet">
                TOLLO
              </Text>
            </Group>
          </Group>
          <Group position="apart" mt="xs">
            <Text size="sm" color="dimmed">
              Spendable Balance
            </Text>
            <Group position="right">
              <Text size="sm" weight="bolder">
                {(parseInt(spendableBalance.amount) / 1000000).toFixed(3)}
              </Text>
              <Text size="sm" color="violet">
                TOLLO
              </Text>
            </Group>
          </Group>
          <Group position="apart" mt="xs">
            <Text size="sm" color="dimmed">
              Staked Balance
            </Text>
            <Group position="right">
              <Text size="sm" weight="bolder">
                {stakedBalance
                  ? stakedBalance.amount
                  : balance
                  ? subS(balance.amount, spendableBalance.amount).toFixed(0)
                  : 0}
              </Text>
              <Text size="sm" color="violet">
                TOLLO
              </Text>
            </Group>
          </Group>
          <Group position="apart" mt="xs">
            <Text size="sm" color="dimmed">
              Addresses
            </Text>
            <Text size="sm" weight="bolder">
              <Tooltip
                transition="slide-up"
                label={`1 account`}
                withArrow
                withinPortal
              >
                <Badge
                  style={{ cursor: "pointer" }}
                  variant="outline"
                  onClick={() => router.push("/stake")}
                  p="xs"
                  rightSection={<TbWallet style={{ marginTop: 4 }} size={14} />}
                >
                  1
                </Badge>
              </Tooltip>
            </Text>
          </Group>
          <Group position="apart" mt="xs">
            <Text size="sm" color="dimmed">
              Connected via
            </Text>
            <Text size="sm" color="dimmed">
              Keplr
            </Text>
          </Group>

          {/* <Progress value={62} mt={5} /> */}

          {/* <Group position="apart" mt="md"> */}
          {/*   <Text size="sm">20 / 36 km</Text> */}
          {/* </Group> */}
        </Card.Section>
        <Card.Section>
          <Group position="apart" grow>
            <Group position="center" noWrap spacing={10}>
              <Button.Group>
                <Button
                  style={{ fontWeight: 400 }}
                  size={"sm"}
                  variant="subtle"
                  leftIcon={<TbUserCircle />}
                  onClick={() => {
                    router.push(
                      "https://explorer.ollo.zone/ollo/account/" + olloAddr
                    );
                  }}
                >
                  Info
                </Button>
                <Button
                  style={{ fontWeight: 400 }}
                  size={"sm"}
                  variant="subtle"
                  leftIcon={<TbUserCircle />}
                  onClick={() => {
                    router.push("/user/addr/" + olloAddr);
                  }}
                >
                  Profile
                </Button>
                <Button
                  style={{ fontWeight: 400 }}
                  size={"sm"}
                  variant="subtle"
                  leftIcon={<TbDoorExit />}
                  onClick={disconn}
                >
                  Disconnect
                </Button>
              </Button.Group>
              {/* {rw} */}
              {/* {tt} */}
            </Group>
          </Group>
        </Card.Section>
      </Card>
    );
  }
};
