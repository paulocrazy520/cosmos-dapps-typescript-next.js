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
  Paper,
  Title,
} from "@mantine/core";
import { TbCheck, TbCoin, TbDots, TbFilter, TbSettings } from "react-icons/tb";
import { violet } from "@/config/theme";
import { FunctionComponent } from "react";
import TooltipText from "@/cmp/text/tooltip";
import { useRouter } from "next/router";
import { useStore } from "@/stores/index";
import { WalletStatus } from "@keplr-wallet/stores";
import { UserOverviewCard } from "@/components/cards/user/overview";
import { Coin } from "@cosmjs/stargate";

export type OverviewCardProps = {
  spendableBalance: Coin;
  stakedBalance: Coin;
  balance: Coin;
};

export const OverviewCard = ({
  stakedBalance,
  spendableBalance,
  balance,
}: OverviewCardProps) => {
  const theme = useMantineTheme();
  const {
    accountStore,
    chainStore: {
      ollo: { chainId },
    },
  } = useStore();
  const {
    walletStatus,
    bech32Address: addr,
    name,
  } = accountStore.getAccount(chainId);
  return (
    <>
      <Paper shadow="md" p="xs">
        <Group position="apart">
          <Group position="left">
            <Title size={20}>Overview</Title>
          </Group>
          <Group position="right">
            <ActionBtn
              label={"Manage"}
              icon={<TbSettings />}
              color={violet(theme)}
              variant="filled"
              onClick={() => {
                openModal({
                  title: "Manage Dashboard",
                  modalId: "manage-dashboard",
                  onClose: () => {},
                });
              }}
            />
          </Group>
        </Group>
        {walletStatus == WalletStatus.Loaded && balance && spendableBalance && (
          <UserOverviewCard
            olloAddr={addr}
            username={name}
            balance={balance}
            stakedBalance={stakedBalance}
            spendableBalance={spendableBalance}
          />
        )}
      </Paper>
    </>
  );
};
