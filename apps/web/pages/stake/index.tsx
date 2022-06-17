import {
  Anchor,
  Avatar,
  Badge,
  Card,
  Loader,
  LoadingOverlay,
  Progress,
  SegmentedControl,
  Skeleton,
  Switch,
  Timeline,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
// import AllValidators from "./validator/all"
import { observer } from "mobx-react-lite";

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
import { Slayout } from "../../components/layout/sublayout";
import Split from "../../components/layout/split";
import { LayoutCard, LayoutTabCard } from "../../components/cards/card";
import { useState } from "react";
import { NextPage, NextPageContext } from "next";
import { apiGet } from "@/lib/api";
import { showNotification } from "@mantine/notifications";
import { sleep } from "@axelar-network/axelarjs-sdk";
import { RootStore } from "../../stores/root";
import { defaultModal } from "../../modals";
import { useStore } from "../../stores";
import { Coin } from "@cosmjs/stargate";
import {
  Validator,
  Delegation,
  DelegationBalance,
  DelegationResponse,
  StakeParams,
} from "@/types/staking";

const useStyles = createStyles((theme) => ({
  modal: {},
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `3px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

// }
import { SearchInput } from "../../components/input/search";
import { CardSubtitle } from "../../components/title";
import { DelegationsTable } from "../../components/table/delegations";
import { ValidatorTable } from "@/components/table/validator/table";
import { getAccounts, useAccounts, getSigningClient } from "../../hooks/user";
import { Account } from "@cosmjs/stargate";
import { ActionBtn } from "../../components/buttons";
import { violet } from "../../config/theme";
import { Suspense } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { StakingPool } from "@keplr-wallet/stores/build/query/cosmos/staking/types";
import {
  getDelegations,
  getInactiveValidators,
  getPoolInfo,
  getStakeParams,
  getValidators,
} from "@/lib/fn/stake";
import { useKeplr } from "@/hooks/use-keplr";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import React from "react";
import { getOlloRewards } from "@/lib/fn";
// import MyValidators from '@/cmp/pages/stake/my';

export interface StakeProps {
  validators: Validator[];
  params: StakeParams;
  pool: StakingPool;
  inactive: Validator[];
}
export const Stake: NextPage<StakeProps> = observer(({}: StakeProps) => {
  // const { query: { activeTab }, push } = useRouter();
  const { classes, theme } = useStyles();
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
  // refetchOnMount: "always",
  // retryOnMount: true,
  // refetchInterval: 1000,
  // onSuccess: (a) => {
  //   showNotification({
  //     title: "Logged in as " + a,
  //     message: "Successfully logged in as " + a,
  //   })
  // }
  // const [
  //   { data: addr },
  //   { data: params },
  //   { data: validators, isFetching: vFetching, isLoading: vLoading },
  //   { data: inactive, isFetching: iFetching, isLoading: iLoading },
  //   { data: pool, isFetching: pFetching, isLoading: pLoading },
  //   { data: dels, isLoading: dLoading, isFetching: dFetching },
  //   { data: rewards, isLoading: rLoading, isFetching: rFetching }
  // ] = useQueries({
  //   queries: [
  //     { queryKey: ["ollo", "address"], queryFn: () => bech32Address, initialData: bech32Address },
  //     { queryKey: ['ollo', 'params', 'stake'], queryFn: async () => { return await getStakeParams() } },
  //     { queryKey: ['ollo', 'validators'], queryFn: async () => { return await getValidators() }, initialData: [] },
  //     { queryKey: ['ollo', 'validators', 'inactive'], queryFn: async () => { return await getInactiveValidators() }, initialData: [] },
  //     { queryKey: ['ollo', 'stake-pool'], queryFn: async () => { return await getPoolInfo() } },
  //     { queryKey: ["ollo", "delegations", bech32Address], queryFn: async () => { return awaift getDelegations(bech32Address) }, initialData: [] },
  //     { queryKey: ["ollo", "rewards", bech32Address,], queryFn: async () => { return await getOlloRewards(bech32Address) } },
  //   ]
  // })
  // let vs = validators.sort((a, b) => parseInt(b.tokens) - parseInt(a.tokens))
  // const notJailed = React.lazy(() => validators.filter((v: Validator) => v.jailed != true))
  // const jailed = dynamic(() => validators.filter((v: Validator) => v.jailed == true))
  // const unbonding = validators.filter((v) => v.status == "UNBONDING" || v.status == "BOND_STATUS_UNBONDING")
  // if (vLoading) return <Loader />

  // if (vFetching) return <Skeleton height={500} />
  // const inactiveV = ValidatorTable(pool, inactive)
  // const jailedV = ValidatorTable(pool, jailed)
  // const unbondingV = ValidatorTable(pool, unbonding)
  // useEffect(() => {

  // }, [bech32Address])
  const AllValidators = dynamic(() => import("@/cmp/pages/stake/all"), {
    suspense: true,
  });
  // const Rewards = dynamic(() => import("@/cmp/pages/stake/rewards"), {
  //   suspense: true
  // })
  const MyValidators = dynamic(() => import("@/cmp/pages/stake/my"), {
    suspense: true,
  });

  // const total = validators.length

  // const [ vals, setVals ] = useState<Validator[]>([])
  //   useEffect(() => {
  //   fetch("/api/ollo/validators/lcd")
  //   .then(r => r.json())
  //   .then((r) => r.validators)
  //   .then((r: Validator[]) => {
  //     setVals(r)
  //   })

  //   })
  // if (rLoading || rFetching) return <Loader />

  return (
    <Slayout pgTitle="Stake">
      <Tabs color={violet(theme)} variant="pills" defaultValue="my">
        <Group style={{ minWidth: "100%" }} position="apart">
          <Group position="left">
            <Title mr={10}>Stake</Title>

            <Tabs.List>
              <Tabs.Tab value="my" icon={<TbUserCircle size={18} />}>
                My Delegations
              </Tabs.Tab>
              <Tabs.Tab value="all" icon={<TbBuildingCommunity size={18} />}>
                All Validators
              </Tabs.Tab>
              <Tabs.Tab value="info" icon={<TbInfoCircle size={18} />}>
                Info
              </Tabs.Tab>
            </Tabs.List>
          </Group>
          <Group position="right">
            <SearchInput />
          </Group>
        </Group>
        <br />
        <Tabs.Panel value="all">
          <Suspense fallback={<Loader />}>
            <AllValidators {...{}} />
          </Suspense>
        </Tabs.Panel>
        <Tabs.Panel value="my">
          <Suspense fallback={<Loader />}>
            <MyValidators {...{}} />
          </Suspense>
        </Tabs.Panel>
        <Tabs.Panel value="info">
          <Split
            sideChildren={
              <LayoutCard title="Active" top={true}>
                {/* { delegations && delegations.map((d) => {
                <Text> d.delegation.validator_address</Text>

              })} */}
                {/* <Button onClick={() => console.log("VALS: " + validators.length + " INACTIVE: " + inactive.length,) }>CHECK</Button>
          {r} */}
              </LayoutCard>
            }
          >
            <LayoutCard title="Active" top={true}>
              {/* { delegations&&delegations.map((v, i) => {
                return <Button key={i}
                variant="default" mr={2} mb={2}>{v.delegation.validator_address}</Button>
              })} */}
              {/* { validators.map((v, i) => {
                return <Button key={i} variant="default" mr={2} mb={2}>{v.description.moniker}</Button>
              })}
              { inactive.map((v, i) => {
                return <Button key={i} variant="default" mr={2} mb={2}>{v.description.moniker}</Button>
              })} */}
            </LayoutCard>
          </Split>
        </Tabs.Panel>
      </Tabs>
    </Slayout>
  );
});

export default Stake;

// export async function getServerSideProps(context: NextPageContext) {

// // const { rewards, total } = await apiGet("cosmos/distribution/v1beta1/delegators/" + acct.bech32Address + "/rewards")
// //   .catch(e => { console.error(e); return []})

// // const inactive = await apiGet("cosmos/staking/v1beta1/validators?status=BOND_STATUS_UNBONDED")
// const params = await getStakeParams()
// const inactive = await getInactiveValidators()
// const validators = await getValidators()
// const pool = await getPoolInfo()

//   return {
//     props: {
//       validators: validators,
//       inactive: inactive,
//       pool,
//       params,
//       // rewards,
//       // total,
//     }
//   }
// }
