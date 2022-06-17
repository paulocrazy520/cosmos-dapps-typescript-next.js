import {
  Anchor,
  Avatar,
  Badge,
  Card,
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
import { ValidatorTable } from "@/cmp/table";
import { RewardsResponse, ValidatorReward } from "@/types/distribution";
import { olloKeplrChainInfo } from "@/config/ollo";
import { useQueries } from "@tanstack/react-query";
import {
  getInactiveValidators,
  getPoolInfo,
  getValidators,
  getStakeParams,
  getDelegations,
} from "@/lib/fn/stake";
import { subS, trimAddr } from "@/lib/util";
import { ActiveSetRing } from "./stats/validators";
import {
  useOlloInactiveValidators,
  useOlloValidators,
} from "@/lib/fn/stake/hook";
import { FilterBtn } from "@/cmp/buttons/filter";

const useValidatorStyles = createStyles((theme) => ({}));
export type AllValidatorsProps = {
  rewards?: RewardsResponse;
  delegations?: DelegationResponse[];
  validators?: Validator[];
  params?: StakeParams;
  pool?: any;
};
export function AllValidators({}: AllValidatorsProps) {
  const { theme } = useValidatorStyles();
  const { accountStore } = useStore();
  const { bech32Address } = accountStore.getAccount(olloKeplrChainInfo.chainId);
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
  const v = useOlloValidators();
  const iv = useOlloInactiveValidators();
  const ivs = iv.sort((a, b: Validator) => subS(b.tokens, a.tokens));
  const vs = v.sort((a, b: Validator) => subS(b.tokens, a.tokens));
  const notJailed = vs.filter((v: Validator) => v.jailed != true);
  const tot = (l: Coin[]) =>
    (
      parseInt(l.find((c: Coin) => c.denom == "utollo").amount) / 1000000
    ).toFixed(2);
  // const inctv = vs.filter((v: Validator) => v.status == "BOND_STATUS_UNBONDED" || v.status == "BOND_STATUS_UNBONDING")
  // const inactive = validators.slice(100, validators.length)
  return (
    <Split
      sideChildren={
        <>
          <LayoutCard
            actions={
              <Button variant="default">
                <TbComponents />
                &nbsp;See all
              </Button>
            }
            top={true}
            title="Overview"
          >
            <Group position="center">
              <ActiveSetRing {...{ validators: notJailed.slice(0, 100) }} />
            </Group>
            {/* <br/>
            { validators?.length > 0
            ? <DelegationsTable {...{validators, bech32Address}}/> */}
          </LayoutCard>
          <LayoutCard title="Info">
            <CardSubtitle title="Token Bonding" />
            <br />

            <Progress
              radius="md"
              size={18}
              sections={[
                {
                  label: "Bonded",
                  value: pool
                    ? (parseInt(pool.bonded_tokens) /
                        (parseInt(pool.bonded_tokens) +
                          parseInt(pool.not_bonded_tokens))) *
                      100
                    : 0,
                  color: "violet",
                  tooltip: `Bonded TOLLO`,
                },
                {
                  label: "Not bonded",
                  value: pool
                    ? (parseInt(pool.not_bonded_tokens) /
                        (parseInt(pool.bonded_tokens) +
                          parseInt(pool.not_bonded_tokens))) *
                      100
                    : 0,
                  color: "blue",
                  tooltip: "Not bonded TOLLO",
                },
              ]}
            />
            <br />
            <CardSubtitle title="Validator Breakdown" />
            <br />
            <Progress
              radius="md"
              size={18}
              sections={[
                {
                  value:
                    (validators.filter((v) => v.status == "BOND_STATUS_BONDED")
                      .length /
                      validators.length) *
                    100,
                  label: "Active",
                  color: "cyan",
                  tooltip: `Active Validators`,
                },
                {
                  value:
                    (validators.filter(
                      (v) => v.status == "BOND_STATUS_UNBONDING"
                    ).length /
                      validators.length) *
                    100,
                  label: "Unbonding",
                  color: "violet",
                  tooltip: `Unbonding validators`,
                },
                {
                  value: (inactive.length / validators.length) * 100,
                  label: "Inactive",
                  color: "blue",
                  tooltip: "Inactive validators",
                },
                // {label: "Jailed", value: (jailed.length/validators.length)*100, color: "purple", tooltip: "Jailed validators",  }
              ]}
            />
            {/* <List>
        <List.Item>
          <ThemeIcon color="cyan"><TbSquare></TbSquare></ThemeIcon> <Badge color="cyan"></Badge>&nbsp;Unbonding <Text color={"dimmed"}>{
            (validators.filter((v) => v.status == "BOND_STATUS_BONDED").length/(validators.length))*100
          }</Text>

        </List.Item>
          <ThemeIcon color="violet"><TbSquare></TbSquare></ThemeIcon> <Badge color="cyan"></Badge>&nbsp;Unbonding <Text color={"dimmed"}>{
(validators.filter((v) => v.status == "BOND_STATUS_UNBONDING").length/(validators.length))*100
  }</Text>
        <List.Item>


        </List.Item>
        <List.Item>

        </List.Item>
        <List.Item>

        </List.Item>
      </List> */}

            <br />
          </LayoutCard>
          <LayoutCard title="Parameters">
            <br />
            {params && pool && (
              <List
                spacing="sm"
                icon={
                  <ThemeIcon color="violet" size={12} radius="sm">
                    <TbPlus size={12} />
                  </ThemeIcon>
                }
              >
                <List.Item>Max validators: {params.max_validators}</List.Item>
                <List.Item>Unbonding time: {params.unbonding_time}</List.Item>
                <List.Item>Max entries: {params.max_entries}</List.Item>
                <List.Item>
                  Unbonded tokens:{" "}
                  {(parseInt(pool.not_bonded_tokens) / 1000000).toFixed(0)}{" "}
                  <Badge
                    ml={6}
                    size="sm"
                    color={
                      theme.colorScheme == "dark"
                        ? theme.colors.teal[9]
                        : theme.colors.teal[6]
                    }
                  >
                    TOLLO
                  </Badge>
                </List.Item>
                <List.Item>
                  Bonded tokens:{" "}
                  {(parseInt(pool.bonded_tokens) / 1000000).toFixed(0)}{" "}
                  <Badge
                    ml={6}
                    size="sm"
                    color={
                      theme.colorScheme == "dark"
                        ? theme.colors.teal[9]
                        : theme.colors.teal[6]
                    }
                  >
                    TOLLO
                  </Badge>
                </List.Item>
              </List>
            )}
          </LayoutCard>
          <LayoutCard
            title="Rewards"
            actions={
              <Button
                onClick={() => {
                  openConfirmModal({
                    title: "Claim all rewards",
                    color: "violet",
                    about: "Are you sure you want to claim all rewards?",
                    onCancel: () => {},
                    onConfirm: () => {
                      showNotification({
                        title: "Claiming rewards",
                        message: "Claiming all rewards",
                      });
                    },
                    modalId: "clai-rewards",
                  });
                }}
                variant="default"
              >
                <TbComponents />
                &nbsp;Claim All
              </Button>
            }
          >
            <br />
            <Text mb={"7px"}>Total Rewards</Text>
            {rewards &&
              rewards.rewards &&
              rewards.rewards.map((l: ValidatorReward, i: number) => (
                <Group
                  key={l.validator_address}
                  position="left"
                  spacing="sm"
                  noWrap
                >
                  <Button size="sm" p="xs" variant="subtle">
                    {i + 1}
                  </Button>
                  <Text color="dimed">{trimAddr(l.validator_address)}</Text>
                  <Text color="dimed">{tot(l.reward)}</Text>
                </Group>
              ))}
            <Divider />
            <br />
            <Text mb={"7px"}>By Delegation</Text>
            <Divider />
            <br />
          </LayoutCard>
          <LayoutCard title="Recent Activity"></LayoutCard>
        </>
      }
    >
      <LayoutTabCard
        actions={<></>}
        title="Validators"
        default="active"
        top={true}
        tabs={[
          {
            title: "Active",
            value: "active",
            icon: <TbActivity />,
            children: (
              <>
                <Group position="apart">
                  <Group position="left">
                    {/* <Button onClick={() => {openModal({title: "Hi"})}}>HI</Button> */}
                    <Title mr={"8px"} size={22}>
                      Active Set
                    </Title>{" "}
                    <Badge>100 Validators</Badge>
                  </Group>
                  <Group position="right">
                    <FilterBtn />
                    {/* <Button size="sm" variant="default" mr={2}><ActionIcon><TbFilter /></ActionIcon></Button> */}
                  </Group>
                </Group>
                <br />
                <ValidatorTable {...{ validators: notJailed.slice(0, 100) }} />
              </>
            ),
          },
          {
            title: "Inactive",
            value: "inactive",
            icon: <TbAlertCircle />,
            children: (
              <>
                <Group position="apart">
                  <Group position="left">
                    {inactive && (
                      <>
                        <Title mr={"8px"} size={22}>
                          Inactive
                        </Title>{" "}
                        <Badge>{inactive.length}Validators</Badge>
                      </>
                    )}
                  </Group>
                  <Group position="right">
                    <Button size="sm" variant="default" mr={2}>
                      <ActionIcon>
                        <TbFilter />
                      </ActionIcon>
                    </Button>
                  </Group>
                </Group>
                <br />
                <ValidatorTable {...{ validators: ivs }} />
              </>
            ),
          },
        ]}
      />
    </Split>
  );
}
export default AllValidators;
