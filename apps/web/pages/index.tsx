import {
  Text,
  Anchor,
  Box,
  Button,
  Card,
  Center,
  createStyles,
  Divider,
  Grid,
  Group,
  MantineTheme,
  Paper,
  Progress,
  RingProgress,
  ScrollArea,
  Stack,
  Tabs,
  ThemeIcon,
  Title,
  Tooltip,
  Skeleton,
  Loader,
} from "@mantine/core";
// import Candlestick from '@/components/chart/cstick'
import { toDay } from '../lib/utils'
import { Timeline } from "@mantine/core";
import { violet } from "../config/theme";
import {
  TbPhoto,
  TbMessageCircle,
  TbSettings,
  TbExchange,
  TbHistory,
  TbActivity,
  TbUser,
  TbBuildingCommunity,
  TbCirclePlus,
  TbSearch,
  TbCoin,
  TbDashboard,
  TbWallet,
  TbSend,
  TbReceipt,
  TbComponents,
  TbCheck,
  TbPlus,
  TbGitBranch,
  TbGitCommit,
  TbGitPullRequest,
  TbMessage,
  TbDots,
  TbFilter,
  TbRefresh,
} from "react-icons/tb";
import { Slayout } from "../components/layout/sublayout";
import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { SearchInput } from "../components/input/search";
import { useRouter } from "next/router";
// import { useKeplr } from '../hooks';
import { useStore } from "../stores";
import Split from "../components/layout/split";
import { LayoutCard } from "../components/cards/card";
import TooltipText from "../components/text/tooltip";
import { showNotification } from "@mantine/notifications";
import { openModal } from "@mantine/modals";
import { DelegationsTable } from "../components/table/delegations";
import { Validator } from "../types/staking";
import { defaultModal } from "../modals";
import { ActionBtn } from "../components/buttons";
import { WalletStatus } from "@keplr-wallet/stores";
import { QueryClient } from "@cosmjs/stargate";
import { UserOverviewCard } from "../components/cards/user";
import {
  QueriesObserver,
  QueryObserver,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useValidators, getValidators } from "@/lib/fn/stake/fetch";
import { NextPage, NextPageContext } from "next";
import { RightButtonGroup } from "@/cmp/buttons/groups/tx";
import {
  AirdropCard,
  AssetsCard,
  GlanceCard,
  HistoryTab,
  OverviewCard,
} from "@/cmp/cards/dashboard";
import { getOlloRewards, getOlloSpendableBalance, subS, zeroAmt } from "../lib";
import { getOlloBalance, getTxsBySender } from "../lib/fn/user";
import { getDelegations } from "../lib/fn/stake/fetch";
import { getOlloClientStakedBalance } from "../lib/fn/bank/balance";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { RewardsResponse, ValidatorReward } from "../types";
import { openDelegationModal } from "@/cmp/modal";
import { Coin } from "@cosmjs/stargate";

export interface HomeProps { }

export const useHomeStyles = createStyles((theme: MantineTheme) => ({}));

export const getRewards = async (addr: string): Promise<RewardsResponse> => {
  return fetch(`${process.env.URL}/api/ollo/${addr}/rewards`)
    .then((r) => r.json())
    .catch((e) => {
      console.log(e);
      return { rewards: [], total: [{ amount: "0", denom: "utollo" }] };
    });
};
export const Home = observer(({ }: HomeProps): React.ReactElement<HomeProps> => {
  // const { getKeplr, connectionType } = useKeplr()
  const { classes, theme } = useHomeStyles();
  const { accountStore, assetsStore, chainStore, priceStore, queriesStore } =
    useStore();
  const acct = accountStore.getAccount("ollo-testnet-1");
  const q = useQueryClient();
  const { chainId } = chainStore.ollo;
  // const DelegationTable = dynamic(() => import("@/cmp/table/delegations/table"),
  //   { suspense: true })
  // const { data: balance, error } = useQuery(["ollo-balance"],
  //   async () => await getBalance(account.bech32Address)
  //     .then((r) => { return parseInt(r.amount) })
  //     .catch((e) => { console.log(e); return 0; })
  //   , { initialData: 0 })
  //   useQuery(["ollo-balance"], async () => { return await getBalance(account.bech32Address) }, { initialData: "0" })
  //   : 0
  const { bech32Address, name, walletStatus } =
    accountStore.getAccount(chainId);
  // const fiat = priceStore.getFiatCurrency(priceStore.defaultVsCurrency)!;
  // const {
  //   // addr: olloAddr,
  //   // name: olloName,
  //   // olloSpendable,
  //   // olloBalance,
  //   // olloDelegations,
  //   // olloRewards,
  // } = useOlloUser(bech32Address, name)
  const [
    // { data: addr },
    // { data: uname },
    { data: balance, isFetched: bFetched },
    { data: spendable, isFetched: sFetched },
    { data: validators, refetch: refetchValidators },
    { data: dels, refetch: refetchDelegations },
    { data: rews, refetch: refetchRewards },
    { data: staked },
    { data: txs },
  ] = useQueries({
    queries: [
      // {
      //   queryKey: ["ollo", "address"], queryFn: () => bech32Address, initialData: bech32Address,
      //   refetchOnMount: "always",
      //   retryOnMount: true,
      //   refetchInterval: 1000,
      // },
      // {
      //   queryKey: ["ollo", "name", bech32Address], queryFn: () => name, initialData: name,
      //   refetchOnMount: "always",
      //   retryOnMount: true,
      //   refetchInterval: 1000,
      // },
      {
        queryKey: ["ollo", "balance", bech32Address],
        queryFn: async () => {
          return await getOlloBalance(bech32Address);
        },
        initialData: zeroAmt,
      },
      {
        queryKey: ["ollo", "balance", "spendable", bech32Address],
        queryFn: async () => {
          return await getOlloSpendableBalance(bech32Address);
        },
        initialData: zeroAmt,
      },
      {
        queryKey: ["ollo", "validators"],
        queryFn: async () => {
          return await getValidators();
        },
        initialData: [],
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
          return await getRewards(bech32Address);
        },
      },
      {
        queryKey: ["ollo", "balance", "staked", bech32Address],
        queryFn: () => getOlloClientStakedBalance(bech32Address),
        initialData: () => {
          return q.getQueryData<Coin>([
            "ollo",
            "balance",
            "staked",
            bech32Address,
          ]);
        },
      },
      {
        queryKey: ["sender", bech32Address],
        queryFn: () => getTxsBySender("ollo1tzt2x9cay58zrpzhftj4jdfzvap5h52qdrqv2u"),
        // queryFn: () => getTxsBySender(bech32Address),
        initialData: []
      },
    ],
  });
  const router = useRouter();
  const default_value = router.query?.name ? router.query.name : "overview";
  
  return (
    <Slayout pgTitle="Dashboard">
      <Tabs color={violet(theme)} variant="pills" defaultValue={default_value as string}>
        <Group style={{ minWidth: "100%" }} position="apart">
          <Group position="left">
            <Title mr={10}>Home</Title>
            <Tabs.List>
              <Tabs.Tab value="overview" icon={<TbDashboard size={18} />}>
                Overview
              </Tabs.Tab>
              <Tabs.Tab value="assets" icon={<TbCoin size={18} />}>
                Assets
              </Tabs.Tab>
              <Tabs.Tab value="history" icon={<TbHistory size={18} />}>
                History
              </Tabs.Tab>
              <Tabs.Tab value="wallet" icon={<TbWallet size={18} />}>
                Wallet
              </Tabs.Tab>
            </Tabs.List>
          </Group>
          <RightButtonGroup />
        </Group>
        <br />
        <Tabs.Panel value="overview">
          <Split
            sideSpan={4}
            sideChildren={
              acct.walletStatus == WalletStatus.Loaded ? (
                <>
                  <OverviewCard
                    {...{
                      stakedBalance: staked,
                      spendableBalance: spendable,
                      balance: balance,
                    }}
                  />
                  <AssetsCard />
                  <AirdropCard />
                </>
              ) : (
                <>
                  {sFetched && bFetched && (
                    <OverviewCard
                      stakedBalance={staked}
                      balance={balance}
                      spendableBalance={spendable}
                    />
                  )}
                  <AirdropCard />
                </>
              )
            }
          >
            {acct.walletStatus == WalletStatus.Loaded ? (
              <>
                <GlanceCard top={true} />
                <LayoutCard
                  top={false}
                  title="My Delegations"
                  actions={
                    <>
                      <Button.Group>
                        {validators && validators.length > 0 && (
                          <ActionBtn
                            variant="filled"
                            label="Add new"
                            icon={<TbPlus />}
                            color={violet(theme)}
                            onClick={() => {
                              openDelegationModal({
                                validators: validators,
                                availableBalance: parseInt(balance.amount),
                                validator: validators[0],
                                bech32Address,
                              });
                            }}
                          />
                        )}
                        <ActionBtn
                          variant="default"
                          label="Manage"
                          icon={<TbSettings />}
                          color={violet(theme)}
                          onClick={() => {
                            defaultModal({
                              title: "Add Delegation",
                              children: <Box></Box>,
                            });
                          }}
                        />
                        <ActionBtn
                          variant="default"
                          label="Manage"
                          icon={<TbRefresh />}
                          color={violet(theme)}
                          onClick={() => {
                            refetchDelegations();
                          }}
                        />
                      </Button.Group>
                    </>
                  }
                >
                  {dels && validators && (
                    <DelegationsTable
                      {...{
                        delegations: dels,
                        validators,
                        bech32Address,
                        rewards: rews,
                      }}
                    />
                  )}
                </LayoutCard>
                <HistoryTab />
                <LayoutCard top={false} title={"Balances"} actions={<></>}>
                  <br />
                </LayoutCard>
              </>
            ) : walletStatus == WalletStatus.NotInit ? (
              <>
                <LayoutCard
                  title="Connect"
                  top={true}
                  actions={
                    <>
                      <Button.Group></Button.Group>
                    </>
                  }
                ></LayoutCard>
                <GlanceCard top={false} />
              </>
            ) : walletStatus == WalletStatus.Loading ? (
              <Skeleton height={800} width={"100%"}>
                <Loader />
              </Skeleton>
            ) : (
              <Skeleton height={800} width="100%" />
            )}
          </Split>
        </Tabs.Panel>
        <Tabs.Panel value="assets"></Tabs.Panel>
        <Tabs.Panel value="history">
          <Split
            sideChildren={
              <>
                {walletStatus == WalletStatus.Loaded &&
                  spendable &&
                  staked &&
                  balance && (
                    <UserOverviewCard
                      olloAddr={bech32Address}
                      username={name}
                      balance={balance}
                      // stakedBalance={{ amount: subS(balance.amount, spendable.amount).toFixed(0), denom: "utollo" }}
                      stakedBalance={staked}
                      spendableBalance={spendable}
                    />
                  )}
              </>
            }
          >
            
            <HistoryTab />
          </Split>
        </Tabs.Panel>
        <Tabs.Panel value="wallet"></Tabs.Panel>
      </Tabs>
    </Slayout>
  );
});
export default Home;

// export async function getServerSideProps() {
//   // const queryClient = new QueryClient()
//   // context.res.setHeader(
//   //   'Cache-Control',
//   //   'public, s-maxage=10, stale-while-revalidate=59'
//   // )
//   // const queryClient = new Query()
//   // console.log(validators, queryClient)
//   const validators = await getValidators()
//   return {
//     props: {
//       validators,
//     }
//   }
// }
