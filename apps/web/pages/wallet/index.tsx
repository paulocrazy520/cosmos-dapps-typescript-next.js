import { Title } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import { LayoutCard } from "../../components/cards/card";
import Split from "../../components/layout/split";
import { Slayout } from "../../components/layout/sublayout";
import { useStore } from "../../stores";

export interface WalletProps {}
export const Wallet: FunctionComponent<WalletProps> = observer(
  ({}: WalletProps) => {
    // const {
    //   assetsStore,
    //   chainStore: {
    //     ollo: { chainId },
    //   },
    //   accountStore,
    //   queriesStore,
    // } = useStore();
    // const { nativeBalances, ibcBalances } = assetsStore;
    return (
      <Slayout pgTitle="Wallet">
        <>
          <Split
            sideChildren={
              <>
                <LayoutCard>
                  <Title>WOLLOT</Title>
                </LayoutCard>
              </>
            }
          >
            <LayoutCard>
              <Title>WOLLOT</Title>
            </LayoutCard>
          </Split>
        </>
      </Slayout>
    );
  }
);
export default Wallet;
