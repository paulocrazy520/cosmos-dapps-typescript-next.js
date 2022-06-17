import {
  Anchor,
  Avatar,
  Badge,
  Card,
  Center,
  Loader,
  Progress,
  SegmentedControl,
  Skeleton,
  Switch,
  Timeline,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
// import AllValidators from "./validator/all"

import {} from "@keplr-wallet/cosmos";
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
  openModal,
  closeAllModals,
  closeModal,
  openContextModal,
  openConfirmModal,
} from "@mantine/modals";
import {
  TbActivity,
  TbAlertCircle,
  TbArrowBack,
  TbAtOff,
  TbBuildingCommunity,
  TbCoin,
  TbComponents,
  TbDisabled,
  TbDisabledOff,
  TbFilter,
  TbIdOff,
  TbInfoCircle,
  TbManualGearbox,
  TbPlug,
  TbPlus,
  TbSettings,
  TbSquare,
  TbUserCircle,
  TbVariable,
  TbViewportWide,
} from "react-icons/tb";
import { useRouter } from "next/router";
import { Slayout } from "@/components/layout/sublayout";
import Split from "@/components/layout/split";
import { LayoutCard, LayoutTabCard } from "@/components/cards/card";
import { useState } from "react";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { NextPage, NextPageContext } from "next";
import { apiGet } from "@/lib/api";
import { getOlloRewards } from "@/lib/fn/user";
import { showNotification } from "@mantine/notifications";
import { sleep } from "@axelar-network/axelarjs-sdk";
import { RootStore } from "../../../stores/root";
import { defaultModal } from "../../../modals";
import { useStore } from "../../../stores";
import { Coin } from "@cosmjs/stargate";
import {
  Validator,
  Delegation,
  DelegationBalance,
  DelegationResponse,
  StakeParams,
} from "@/types/staking";
import { CardSubtitle } from "@/cmp/title";
import { DelegationsTable, ValidatorTable } from "@/cmp/table";
import { ActionBtn } from "@/cmp/buttons";
import { violet } from "@/config/theme";
import { RewardsResponse } from "@/types/distribution";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useQueries } from "@tanstack/react-query";
import {
  getInactiveValidators,
  getPoolInfo,
  getValidators,
  getStakeParams,
  getDelegations,
} from "@/lib/fn/stake";
import RewardsCard from "./cards/rewards";
import { trimAddr } from "@/lib/util";
import { DelegationsRing } from "./stats/delegations";

export type MyValidatorsProps = {
  delegations?: DelegationResponse[];
  validators?: Validator[];
  rewards?: RewardsResponse;
  params?: StakeParams;
  pool?: any;
};

const useValidatorStyles = createStyles((theme) => ({}));
export function MyValidators({}: MyValidatorsProps) {
  const { theme } = useValidatorStyles();
  const {
    accountStore,
    assetsStore,
    priceStore,
    chainStore: {
      ollo: { chainId },
    },
  } = useStore();
  const {
    bech32Address,
    getKeplr,
    name,
    cosmos,
    sendToken,
    ollo,
    walletStatus,
  } = accountStore.getAccount(chainId);
  // const inactive = validators.slice(100, validators.length)
  // const Rewards = dynamic(() => import("@/cmp/pages/stake/rewards"), {
  //   suspense: true
  // })
  const [
    { data: addr },
    { data: params },
    { data: validators, isFetching: vFetching, isLoading: vLoading },
    { data: inactive, isFetching: iFetching, isLoading: iLoading },
    { data: pool, isFetching: pFetching, isLoading: pLoading },
    { data: dels, isLoading: dLoading, isFetching: dFetching },
    { data: rewards, isLoading: rLoading, isFetching: rFetching },
  ] = useQueries({
    queries: [
      {
        queryKey: ["ollo", "address"],
        queryFn: () => bech32Address,
        initialData: bech32Address,
      },
      {
        queryKey: ["ollo", "params", "stake"],
        queryFn: async () => {
          return await getStakeParams();
        },
      },
      {
        queryKey: ["ollo", "validators"],
        queryFn: async () => {
          return await getValidators();
        },
        initialData: [],
      },
      {
        queryKey: ["ollo", "validators", "inactive"],
        queryFn: async () => {
          return await getInactiveValidators();
        },
        initialData: [],
      },
      {
        queryKey: ["ollo", "stake-pool"],
        queryFn: async () => {
          return await getPoolInfo();
        },
      },
      {
        queryKey: ["ollo", "delegations", bech32Address],
        queryFn: async () => {
          return await getDelegations(bech32Address);
        },
        initialData: [],
      },
      {
        queryKey: ["ollo", "rewards", bech32Address],
        queryFn: async () => {
          return await getOlloRewards(bech32Address);
        },
      },
    ],
  });
  return (
    <Split
      sideChildren={
        <>
          <LayoutCard
            actions={
              <ActionBtn
                label="Overview settings"
                onClick={() => {
                  openModal({ title: "Settings" });
                }}
                size="xs"
                color="violet"
                icon={<TbSettings />}
              />
            }
            top={true}
            title="Overview"
          >
            <Group position="center">
              <DelegationsRing {...{ delegations: dels, validators }} />
            </Group>
          </LayoutCard>
          {rewards && (
            <RewardsCard
              bech32Address={bech32Address}
              rewardsResponse={rewards}
            />
          )}
          <LayoutCard
            actions={
              <Button
                onClick={() => {
                  openModal({ title: "Settings" });
                }}
                size="xs"
                p={0}
                color="violet"
              >
                <ActionIcon>
                  <TbSettings />
                </ActionIcon>
              </Button>
            }
            top={false}
            title="Delegator Info"
          ></LayoutCard>
        </>
      }
    >
      <LayoutCard
        title="Delegations"
        actions={
          <Button.Group>
            <Button color="violet" variant="filled">
              <TbPlus />
              &nbsp;Add
            </Button>
            <Button color="violet" variant="default">
              <TbFilter />
              &nbsp;Filter
            </Button>
          </Button.Group>
        }
        top={true}
      >
        {dels && validators && (
          <DelegationsTable
            {...{ delegations: dels, validators: validators, bech32Address }}
          />
        )}
      </LayoutCard>
      <LayoutCard
        title="Delegation History"
        actions={
          <Button.Group>
            <Button color={violet(theme)} variant="filled">
              <TbPlus />
              &nbsp;Add
            </Button>
            <Button color={violet(theme)} variant="default">
              <TbFilter />
              &nbsp;Filter
            </Button>
          </Button.Group>
        }
        top={false}
      >
        <Timeline color="violet"></Timeline>
      </LayoutCard>
    </Split>
  );
}
export default MyValidators;
