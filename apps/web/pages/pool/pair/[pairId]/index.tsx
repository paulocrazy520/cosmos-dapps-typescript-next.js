import { LayoutCard, Slayout, Split } from "@/cmp/layout";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

export type PoolPairProps = {};
export const PoolPair = ({}: PoolPairProps) => {
  const { query } = useRouter();
  const { pairId } = query;

  return (
    <Slayout pgTitle={("Pair ID " + pairId) as string}>
      <Split
        sideChildren={<LayoutCard title={"Pair ID: " + pairId}></LayoutCard>}
      >
        <LayoutCard title={"Pair ID: " + pairId}></LayoutCard>
      </Split>
    </Slayout>
  );
};

export default PoolPair;
