import {
  Anchor,
  Avatar,
  Badge,
  Center,
  Loader,
  Progress,
  SegmentedControl,
  Skeleton,
  Space,
  Switch,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { subS, zeroAmt } from "@/lib/util";

import {
  Box,
  Grid,
  Table,
  Modal,
  Container,
  createStyles,
  Title,
  Group,
  Divider,
  Paper,
  Text,
  ScrollArea,
  Tabs,
  RingProgress,
  Button,
  ActionIcon,
  List,
  ThemeIcon,
} from "@mantine/core";
import {
  getOlloRewards,
  getOlloValidatorRewards,
  getOlloBalance,
} from "@/lib/fn/user";
import { TbPlus, TbSettings } from "react-icons/tb";
import { useRouter } from "next/router";
import { Validator } from "@/types/staking";
import { DelegationResponse } from "@/types/staking";
import DelegationModal, {
  openDelegationModal,
} from "@/components/modal/delegation/modal";
import { useEffect, useState } from "react";
import { ActionBtn } from "../../buttons";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useKeplr } from "@/hooks/use-keplr";
import {
  getOlloApiBalance,
  getOlloClientBalance,
  getOlloClientStakedBalance,
} from "@/lib/fn/bank/balance";
import { useStore } from "../../../stores";
import { Coin, OfflineSigner } from "@cosmjs/stargate";
import { amt } from "@/lib/util";
import { getDelegations } from "@/lib/fn/stake";
import { endpoints } from "@/lib/api";
import { Keplr } from "@keplr-wallet/types";
import { showNotification } from "@mantine/notifications";
import { GasSimulator } from "@keplr-wallet/hooks";
import { claimOlloValidatorRewards } from "@/lib/fn";
import { DelegationRow } from "./row";
import { validatorFromDelegation } from "./util";
import { RewardsResponse, ValidatorReward } from "@/types/distribution";
import { Suspense } from "react";
const useStyles = createStyles((theme) => ({
  tablesx: {},
  modal: {},
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `3px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

export type DelegationsTableProps = {
  bech32Address: string;
  rewards?: RewardsResponse;
  delegations?: DelegationResponse[];
  validators: Validator[];
};
export function DelegationsTable({
  bech32Address,
  validators,
  delegations,
  rewards,
}: DelegationsTableProps) {
  // const { accountStore, chainStore: { ollo: { chainId } } } = useStore()
  // const { bech32Address } = accountStore.getAccount(chainId)

  const router = useRouter();
  const {
    classes: { tablesx },
    theme,
  } = useStyles();
  const {
    chainStore: {
      ollo: { chainId },
    },
  } = useStore();
  const [
    { data: bal, error: balError, isLoading: balLoading, refetch: refetchBal },
    { data: spend, error: spendErr, isLoading: spendLoad, refetch: spendRef },
    { data: stk, error: stkError, isLoading: stkLoading, refetch: refetchStk },
    { data: r, isLoading: rLoading },
    { data: d, isLoading: dLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["ollo", "balance", bech32Address],
        queryFn: async () => await getOlloBalance(bech32Address),
        initialData: zeroAmt,
      },
      {
        queryKey: ["ollo", "balance", "spendable", bech32Address],
        queryFn: async () => await getOlloBalance(bech32Address),
        initialData: zeroAmt,
      },
      {
        queryKey: ["ollo", "balance", "staked", bech32Address],
        queryFn: async () => await getOlloClientStakedBalance(bech32Address),
        initialData: zeroAmt,
      },
      {
        queryKey: ["ollo", "rewards", bech32Address],
        queryFn: async () => await getOlloRewards(bech32Address),
        initialData: rewards,
      },
      {
        queryKey: ["ollo", "delegations", bech32Address],
        queryFn: async () => await getDelegations(bech32Address),
        initialData: delegations ? delegations : [],
      },
    ],
  });
  // if (error) return <Text color="red">ERROR</Text>
  // if (!data) return <Skeleton />

  //@ts-ignore
  // const delegations: DelegationResponse[] = data.delegation_responses
  return (
    <Table
      highlightOnHover
      fontSize={"xs"}
      className={tablesx}
      horizontalSpacing="xs"
      verticalSpacing="xs"
    >
      <thead
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <tr>
          <th></th>
          <th>Validator</th>
          <th>Rank</th>
          <th>Balance</th>
          <th>Rewards</th>
          <th>Status</th>
          <th>Manage</th>
        </tr>
      </thead>
      <tbody>
        {/* <Suspense fallback={<Center><Loader m={20} /></Center>}> */}
        {d
          .sort((a: DelegationResponse, b: DelegationResponse) =>
            subS(b.balance.amount, a.balance.amount)
          )
          .map((dr: DelegationResponse, i: number) => {
            const v: Validator = validatorFromDelegation(validators, dr);
            const rw: ValidatorReward = r.rewards.find(
              (r: ValidatorReward) =>
                r.validator_address == dr.delegation.validator_address
            );
            if (v && rw) {
              return (
                <DelegationRow
                  {...{
                    key: dr.delegation.validator_address,
                    balance: bal,
                    bech32Address,
                    validators: validators,
                    reward: rw,
                    delegation: dr,
                    index: i,
                    validator: v,
                  }}
                />
              );
            }
          })}

        {/* </Suspense> */}
      </tbody>
    </Table>
  );
}
export default DelegationsTable;
