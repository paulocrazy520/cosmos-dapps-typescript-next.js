import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { LayoutCard } from "@/components/cards/card";
import Split from "@/components/layout/split";
import { Slayout } from "@/components/layout/sublayout";

const Pools: FunctionComponent<{}> = () => {
  const {
    query: { denomIn, denomOut },
  } = useRouter();
  return (
    <Slayout pgTitle={"Pools " + denomIn + "/" + denomOut}>
      <Split
        sideChildren={
          <LayoutCard
            title={"Pool Info for " + denomIn + "/" + denomOut}
          ></LayoutCard>
        }
      >
        <LayoutCard title={`${denomIn}/${denomOut} Pools`}></LayoutCard>
      </Split>
    </Slayout>
  );
};
export default Pools;
