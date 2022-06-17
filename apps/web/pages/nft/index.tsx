import { Button, Group, Tabs, Title } from "@mantine/core";
import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import {
  TbCoin,
  TbDashboard,
  TbDots,
  TbPlus,
  TbSearch,
  TbSettings,
  TbUsb,
  TbUser,
} from "react-icons/tb";
import { LayoutCard } from "../../components/cards/card";
import Split from "../../components/layout/split";
import { Slayout, Splayout } from "../../components/layout/sublayout";
import { useStore } from "../../stores";
import { AppCurrency } from "@keplr-wallet/types";
import { openModal } from "@mantine/modals";
import { ActionBtn } from "../../components/buttons";

// Highcharts.getJSON('https://demo-live-data.highcharts.com/aapl-ohlcv.json', function (data) {
//   Highcharts.stockChart('container', {
//     rangeSelector: {
//       selected: 1
//     },
//     navigator: {
//       series: {
//         color: Highcharts.getOptions().colors[0]
//       }
//     },
//     series: [{
//       type: 'hollowcandlestick',
//       name: 'Hollow Candlestick',
//       data: data
//     }]
//   });
// });

export interface NFTProps {}

export const NFT: FunctionComponent<NFTProps> = observer(({}) => {
  const {
    assetsStore,
    chainStore: {
      ollo: { chainId },
    },
    accountStore,
    queriesStore,
  } = useStore();
  const { nativeBalances, ibcBalances } = assetsStore;
  return (
    <Slayout pgTitle={"NFT"}>
      <Tabs color={"violet"} variant="pills" defaultValue="overview">
        <Group style={{ minWidth: "100%" }} position="apart">
          <Group position="left">
            <Title mr={10}>NFT</Title>
            <Tabs.List>
              <Tabs.Tab value="overview" icon={<TbDashboard size={18} />}>
                Overview
              </Tabs.Tab>
              <Tabs.Tab value="nfts" icon={<TbCoin size={18} />}>
                NFTs
              </Tabs.Tab>
              <Tabs.Tab value="creators" icon={<TbUser size={18} />}>
                Creators
              </Tabs.Tab>
            </Tabs.List>
          </Group>

          <Group position="right">
            <Button.Group>
              <Button
                onClick={() => {
                  openModal({
                    overlayBlur: 3,
                    overlayOpacity: 0.5,
                    title: "Mint NFT",
                  });
                }}
                color="violet"
                variant="default"
                size="sm"
                leftIcon={<TbPlus size={18} />}
              >
                Mint
              </Button>
              <Button
                onClick={() => {
                  openModal({
                    overlayBlur: 3,
                    overlayOpacity: 0.5,
                    title: "Manage your collection",
                  });
                }}
                color="violet"
                variant="default"
                size="sm"
                leftIcon={<TbSettings size={18} />}
              >
                Manage
              </Button>
            </Button.Group>
          </Group>
        </Group>
        <br />
        <Tabs.Panel value="overview">
          <Split
            sideSpan={4}
            sideChildren={
              <LayoutCard
                top={true}
                title="Your Collection"
                actions={
                  <Group spacing="xs" position="right">
                    <ActionBtn
                      variant="default"
                      icon={<TbDots size={12} />}
                      size="xs"
                      p="xs"
                      label="Manage overview"
                    />
                    <ActionBtn
                      variant="filled"
                      icon={<TbPlus size={12} />}
                      size="xs"
                      p="xs"
                      label="Add"
                    />
                  </Group>
                }
              ></LayoutCard>
            }
          >
            <LayoutCard top={true} title={"Community"} actions={<></>}>
              <br />
            </LayoutCard>
          </Split>
        </Tabs.Panel>
        <Tabs.Panel value="nfts"></Tabs.Panel>
        <Tabs.Panel value="creators"></Tabs.Panel>
      </Tabs>
    </Slayout>
  );
});

export default NFT;
