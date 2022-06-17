import {
  ActionIcon,
  Button,
  createStyles,
  Group,
  Paper,
  ScrollArea,
  Tabs,
  Title,
  Flex,
  Space
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useModalsEvents } from "@mantine/modals/lib/events";
import { useNotifications } from "@mantine/notifications";
import { FunctionComponent } from "react";
import {
  TbPhoto,
  TbMessageCircle,
  TbSettings,
  TbExchange,
  TbHistory,
  TbPlane,
  TbPlug,
  TbFilter,
  TbArrowRight,
  TbArrowBack,
  TbCodePlus,
  TbChevronDown,
} from "react-icons/tb";
import { LayoutCard } from "../../components/cards/card";
import Split from "../../components/layout/split";
import { Slayout } from "../../components/layout/sublayout";
import { useKeplr } from "../../hooks";
import { useStore } from "../../stores";
import { TradeMarketCard } from "@/cmp/cards/trade-market";

const Trade = () => {
  const {
    modals,
    closeAll,
    closeModal,
    openConfirmModal,
    openContextModal,
    openModal,
  } = useModals();
  const {} = useKeplr();
  const {} = useNotifications();
  const { accountStore } = useStore();
  return (
    <Slayout pgTitle="Trade">
      <Tabs color={"violet"} variant="pills" defaultValue="all">
        <Group style={{ minWidth: "100%" }} position="apart">
          <Group position="left">
            <Title mr={10}>Trade</Title>
            <Tabs.List>
              <Tabs.Tab value="all" icon={<TbExchange size={18} />}>
                Trade
              </Tabs.Tab>
              <Tabs.Tab value="advanced" icon={<TbHistory size={18} />}>
                Advanced
              </Tabs.Tab>
              <Tabs.Tab value="history" icon={<TbHistory size={18} />}>
                History
              </Tabs.Tab>
            </Tabs.List>
          </Group>

          <Group position="right">
            <Button
              onClick={() => {
                {
                }
              }}
              color="violet"
              variant="default"
              size="sm"
              rightIcon={<TbChevronDown size={18} />}
              leftIcon={<TbCodePlus size={18} />}
            >
              Options
            </Button>
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
                      Send
                    </Title>
                    <Tabs.List>
                      <Tabs.Tab
                        value="active"
                        icon={<TbArrowRight size={18} />}
                      >
                        Send
                      </Tabs.Tab>
                      <Tabs.Tab
                        value="inactive"
                        icon={<TbArrowBack size={18} />}
                      >
                        Receive
                      </Tabs.Tab>
                    </Tabs.List>
                  </Group>
                  <Group position="right">
                    <Button.Group>
                      <Button size="xs" variant="default" mr={2}>
                        <ActionIcon>
                          <TbFilter />
                        </ActionIcon>
                      </Button>
                      <Button size="xs" variant="default" mr={2}>
                        <ActionIcon>
                          <TbSettings />
                        </ActionIcon>
                      </Button>
                    </Button.Group>
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
        <Tabs.Panel value="advanced">
          <Split
            sideChildren={<LayoutCard top={true} title="Lightweight Chart"></LayoutCard>}
            sideSpan={7}
          >
            <LayoutCard
              top={true}
              title="Advanced Trade"
            >
              <Tabs color={"violet"}variant="pills" defaultValue="trade_feature" >
                <Group style={{ minWidth: "100%"}} position="apart">
                  <Group position="left" >
                    <Tabs.List>
                      <Tabs.Tab value="trade_feature" icon={<TbExchange size={18} />}>
                        Market
                      </Tabs.Tab>
                      <Tabs.Tab value="limit_trade" icon={<TbHistory size={18} />}>
                        Limit
                      </Tabs.Tab>
                    </Tabs.List>
                    </Group>
                    </Group>
                    <br/>
                    <Tabs.Panel value="trade_feature">
                      <TradeMarketCard></TradeMarketCard>
                    </Tabs.Panel>
                  <Tabs.Panel value="limit_trade">
                </Tabs.Panel>
              </Tabs>
            </LayoutCard>
          </Split>
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
          </Split>
        </Tabs.Panel>
      </Tabs>
    </Slayout>
  );
};
export default Trade;
