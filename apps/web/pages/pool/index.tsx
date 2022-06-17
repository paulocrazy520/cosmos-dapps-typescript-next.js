import { isMsgDepositEncodeObject } from "@cosmjs/stargate";
import {
  ActionIcon,
  Button,
  createStyles,
  Group,
  Paper,
  ScrollArea,
  Tabs,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openModal } from "@mantine/modals";
import { CreatePoolModal } from "@/components/modal/pool/create";
import { FC, useState } from "react";
import { observer } from "mobx-react-lite";
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
  TbDatabase,
  TbFilter,
  TbAbacus,
  TbPlus,
} from "react-icons/tb";
import { LayoutCard } from "../../components/cards";
import Split from "../../components/layout/split";
import { Slayout } from "../../components/layout/sublayout";
import handler from "../api";
import { ManageLiquidityModal } from "@/cmp/modal/pool";
import create from "zustand/react";
import { queryPools, queryPairs, queryPoolOrders } from "../../lib/fn/pool";

export interface PoolsProps {}

export const Pools = observer(({}: PoolsProps) => {
  const [mgOpened, mgHandlers] = useDisclosure(false, {
    onOpen: () => {},
    onClose: () => {},
  });
  const [createOpened, createHandlers] = useDisclosure(false, {
    onOpen: () => {},
    onClose: () => {},
  });
  const modal = (
    <CreatePoolModal
      {...{ isOpen: createOpened, onClose: createHandlers.close }}
    />
  );
  const manage = (
    <ManageLiquidityModal
      {...{ isOpen: mgOpened, onClose: mgHandlers.close }}
    />
  );
  return (
    <Slayout pgTitle={"Pools"}>
      <>
        <Tabs color={"violet"} variant="pills" defaultValue="all">
          <Group style={{ minWidth: "100%" }} position="apart">
            <Group position="left">
              <Title mr={10}>Pools</Title>
              <Tabs.List>
                <Tabs.Tab value="all" icon={<TbDatabase size={18} />}>
                  All Pools
                </Tabs.Tab>
                <Tabs.Tab value="my" icon={<TbHistory size={18} />}>
                  My Pools
                </Tabs.Tab>
              </Tabs.List>
            </Group>

            <Group position="right">
              <Button.Group>
                <Button
                  onClick={createHandlers.open}
                  color="violet"
                  variant="filled"
                  size="xs"
                  leftIcon={<TbPlus size={12} />}
                >
                  Create Pool
                </Button>
                <Button
                  onClick={mgHandlers.open}
                  color="violet"
                  variant="default"
                  size="xs"
                  leftIcon={<TbSettings size={12} />}
                >
                  Manage
                </Button>
              </Button.Group>
            </Group>
          </Group>
          <br />
          <Tabs.Panel value="all">
            <Split
              sideChildren={
                <LayoutCard
                  title="Overview"
                  top={true}
                  actions={
                    <Button variant="default" size="xs">
                      <TbFilter size={12} />
                    </Button>
                  }
                ></LayoutCard>
              }
            >
              <Paper shadow="md" p="md">
                <Tabs color={"violet"} variant="pills" defaultValue="active">
                  <Group position="apart">
                    <Group position="left">
                      <Title mr={"8px"} size={24}>
                        All Pools
                      </Title>
                      <Tabs.List>
                        <Tabs.Tab
                          value="active"
                          icon={<TbActivity size={18} />}
                        >
                          Active
                        </Tabs.Tab>
                        <Tabs.Tab
                          value="inactive"
                          icon={<TbAbacus size={18} />}
                        >
                          Inactive
                        </Tabs.Tab>
                      </Tabs.List>
                    </Group>
                    <Group position="right">
                      <Button size="sm" variant="default" mr={2}>
                        <ActionIcon>
                          <TbFilter />
                        </ActionIcon>
                      </Button>
                    </Group>
                  </Group>
                  <Tabs.Panel value="active">
                    <br />
                  </Tabs.Panel>
                  <Tabs.Panel value="inactive">
                    <br />
                  </Tabs.Panel>
                </Tabs>
              </Paper>
            </Split>
          </Tabs.Panel>

          <Tabs.Panel value="history">
            <Split
              sideChildren={
                <LayoutCard top={true} title="Overview"></LayoutCard>
              }
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
            </Split>
          </Tabs.Panel>
        </Tabs>
        {modal}
        {manage}
      </>
    </Slayout>
  );
});
export default Pools;
// return <Slayoutviolet"}variant="pills" defaultValue="all" >
//     <Group style={{ minWidth: "100%"}} position="apart">
//       <Group position="left" >
//         <Title mr={10}>Pools</Title>
//         <Tabs.List>
//           <Tabs.Tab value="all" icon={<TbBuildingCommunity size={18} />}>
//             All Pools
//           </Tabs.Tab>
//           <Tabs.Tab value="user" icon={<TbUser size={18} />}>
//             My Pools
//             </Tabs.Tab>
//       </Tabs.List>
//       </Group>
//       <Group position="right">
//         <Button.Group>
//           <Button variant="default" color="violet"><TbCirclePlus/>&nbsp;Create</Button>
//           <Button variant="default" color="violet"><TbCoin/>&nbsp;Manage</Button>

//         </Button.Group>
//       </Group>
//       </Group>
//       <br/>
//       <Tabs.Panel value="all">

//       </Tabs.Panel>
//       <Tabs.Panel value="user">
//       </Tabs.Panel>
//         </Tabs>
// </Slayout>

// export async function getStaticProps() {

//   return {
//     props: {

//     }
//   }
// }
// export default Pools;
