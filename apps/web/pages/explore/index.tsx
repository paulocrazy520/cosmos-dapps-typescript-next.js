import { ActionIcon, Button, Group, Paper, Tabs, Title } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { NextPage } from "next";
import {
  TbUsers,
  TbActivity,
  TbAddressBook,
  TbArrowsUp,
  TbDashboard,
  TbDatabase,
  TbExchange,
  TbFilter,
  TbHierarchy,
  TbHistory,
  TbIndentDecrease,
  TbPlug,
} from "react-icons/tb";
import { SearchInput } from "../../components/input/search";
import { LayoutCard } from "../../components/cards";
import Split from "../../components/layout/split";
import { Slayout } from "../../components/layout/sublayout";
import { WalletConnectModal } from "../../components/modal/base";
import { createStyles, SimpleGrid, Text } from "@mantine/core";
import {
  TbUserPlus,
  TbDiscount2,
  TbReceipt2,
  TbCoin,
  TbArrowUpRight,
  TbArrowDownRight,
} from "react-icons/tb";

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

const icons = {
  user: TbUserPlus,
  discount: TbDiscount2,
  receipt: TbReceipt2,
  coin: TbCoin,
};

interface StatsGridProps {
  data: { title: string; icon: JSX.Element; value: string; diff: number }[];
}

export function StatsGrid({ data }: StatsGridProps) {
  const { classes } = useStyles();
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? TbArrowUpRight : TbArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          {stat.icon}
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text
            color={stat.diff > 0 ? "teal" : "red"}
            size="sm"
            weight={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size={16} />
          </Text>
        </Group>

        <Text size="xs" color="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {stats}
      </SimpleGrid>
    </div>
  );
}

export interface RpcStatus {
  jsonrpc: string;
  id: string;
  result: {
    node_info: {
      protocol_version: {
        p2p: string;
        block: string;
        app: string;
      };
      id: string;
      listen_addr: string;
      network: string;
      version: string;
      channels: string;
      moniker: string;
      other: {
        tx_index: "on" | "off";
        rpc_addresss: string;
      };
    };
    sync_info: {
      latest_block_hash: string;
      latest_app_hash: string;
      latest_block_height: string;
      earliest_block_hash: string;
      earliest_app_hash: string;
      earliest_block_height: string;
      earliest_bock_time: string;
      catching_up: boolean;
    };
    validator_info: {
      address: string;
      pub_key: {
        type: string;
        value: string;
      };
      voting_power: string;
    };
  };
}

export declare interface DistributionParams {
  params: {
    community_tax: string;
    base_proposer_reward: string;
    bonus_proposer_reward: string;
    withdraw_addr_enabled: boolean;
  };
}
export declare interface CommunityPool {
  pool: {
    denom: string;
    amount: string;
  }[];
}

export declare interface MintParams {
  params: {
    mint_denom: string;
    blocks_per_year: string;
    goal_bonded: string;
    inflation_min: string;
    inflation_max: string;
    inflation_rate_change: string;
  };
}

export interface ExplorerProps {
  status: RpcStatus;
  communityPool: CommunityPool;
  annualProvisions: AnnualProvisisons;
  mintingParams: MintParams;
  distrParams: DistributionParams;
  consensusState: any;
  supply: TotalSupply;
}

export interface TotalSupply {
  supply: {
    denom: string;
    amount: string;
  }[];
}
export interface AnnualProvisisons {
  annual_provisions: string;
}
export const Explorer: NextPage<ExplorerProps> = ({
  status,
  annualProvisions,
  communityPool,
  consensusState,
  distrParams,
  mintingParams,
  supply,
}: ExplorerProps) => {
  const mock = [
    {
      title: "Block Height",
      icon: <TbHierarchy />,
      // "value": status.result.sync_info? status.result.sync_info.latest_block_height : "334533",
      value: "334533",
      diff: 34,
    },
    {
      title: "Inflation",
      icon: <TbArrowsUp />,
      // "value": mintingParams.params.inflation_max? mintingParams.params.inflation_max : "100%",
      value: "100%",
      diff: -10,
    },
    {
      title: "Total Supply",
      icon: <TbDatabase />,
      // "value": supply.supply? supply.supply.find((c) => c.denom == "utollo").amount :"...",
      value: "3234423423",
      diff: 18,
    },
    {
      title: "Community Pool",
      icon: <TbUsers />,
      // "value": communityPool.pool? communityPool.pool.find((c) => c.denom == "utollo").amount : "...",
      value: "322334",
      diff: -30,
    },
  ];

  return (
    <Slayout pgTitle="Explorer">
      <Tabs color={"violet"} variant="pills" defaultValue="overview">
        <Group style={{ minWidth: "100%" }} position="apart">
          <Group position="left">
            <Title mr={10}>Explorer</Title>
            <Tabs.List>
              <Tabs.Tab value="overview" icon={<TbDatabase size={18} />}>
                Overview
              </Tabs.Tab>
              <Tabs.Tab value="params" icon={<TbHistory size={18} />}>
                Params
              </Tabs.Tab>
              <Tabs.Tab value="blocks" icon={<TbDashboard size={18} />}>
                Blocks
              </Tabs.Tab>
              <Tabs.Tab value="exchange" icon={<TbExchange size={18} />}>
                Transactions
              </Tabs.Tab>
              <Tabs.Tab value="addr" icon={<TbAddressBook size={18} />}>
                Addresses
              </Tabs.Tab>
            </Tabs.List>
          </Group>
          <Group position="right">
            <SearchInput />
          </Group>
        </Group>
        <br />
        <Tabs.Panel value="overview">
          <Paper shadow="md" p="md">
            <Tabs color={"violet"} variant="pills" defaultValue="active">
              <Group position="apart">
                <Group position="left">
                  <Title mr={"8px"} size={24}>
                    Overview
                  </Title>
                  <Tabs.List>
                    <Tabs.Tab value="active" icon={<TbActivity size={18} />}>
                      Active
                    </Tabs.Tab>
                    <Tabs.Tab
                      value="inactive"
                      icon={<TbIndentDecrease size={18} />}
                    >
                      Inactive
                    </Tabs.Tab>
                  </Tabs.List>
                </Group>
                <Group position="right">
                  <Button size="xs" variant="default" mr={2}>
                    <ActionIcon>
                      <TbFilter />
                    </ActionIcon>
                  </Button>
                </Group>
              </Group>
              <Tabs.Panel value="active">
                <StatsGrid data={mock} />
                <br />
              </Tabs.Panel>
              <Tabs.Panel value="inactive">
                <br />
              </Tabs.Panel>
            </Tabs>
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="history">
          <Split
            sideChildren={<LayoutCard top={true} title="Overview"></LayoutCard>}
          >
            <LayoutCard
              top={true}
              title="Past Proposals"
              actions={
                <Button size="sm" variant="default" mr={2}>
                  <TbFilter />
                  &nbsp;Filter
                </Button>
              }
            ></LayoutCard>
            <LayoutCard title="Overview" top={true}>
              <WalletConnectModal />
              <Group position="center">
                <Button
                  onClick={() =>
                    openContextModal({
                      modal: "walletConnect",
                      title: "Connect Wallet",
                      innerProps: {
                        modalBody:
                          "This modal was defined in ModalsProvider, you can open it anywhere in you app with useModals hook",
                      },
                    })
                  }
                >
                  Open demonstration context modal
                </Button>
              </Group>
            </LayoutCard>
          </Split>
        </Tabs.Panel>
      </Tabs>
    </Slayout>
  );
};
export default Explorer;

export async function getServerSideProps({ req, res }) {
  const status = await fetch("/api/status")
    .then((r) => r.json())
    .catch((e) => {
      console.error(e);
      return {};
    });
  const consensusState = await fetch("/api/ollo/net/consensus")
    .then((r) => r.json())
    .catch((e) => {
      console.error(e);
      return {};
    });
  const mintingParams = await fetch("/api/ollo/mint/params")
    .then((r) => r.json())
    .catch((e) => {
      console.error(e);
      return {};
    });
  const supply = await fetch("/api/ollo/bank/supply")
    .then((r) => r.json())
    .catch((e) => {
      console.error(e);
      return {};
    });
  const annualProvisions = await fetch("/api/ollo/mint/annual-provisions")
    .then((r) => r.json())
    .catch((e) => {
      console.error(e);
      return {};
    });
  const communityPool = await fetch("/api/ollo/distribution/community-pool")
    .then((r) => r.json())
    .catch((e) => {
      console.error(e);
      return {};
    });
  const distrParams = await fetch("/api/ollo/distribution/params")
    .then((r) => r.json())
    .catch((e) => {
      console.error(e);
      return {};
    });
  console.log("status: ", status);
  return {
    props: {
      status,
      consensusState,
      mintingParams,
      supply,
      annualProvisions,
      communityPool,
      distrParams,
    },
  };
}
