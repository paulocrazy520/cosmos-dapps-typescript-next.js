import { RewardsResponse } from "@/types/distribution";
import { DelegationResponse } from "@/types/staking";
import { Coin } from "@cosmjs/stargate";
import { useQueries } from "@tanstack/react-query";
import { getOlloBalance, getOlloRewards, getOlloSpendableBalance } from ".";
import { getDelegations, zeroAmt } from "..";

export declare type UseOlloUserResponse = {
  addr: string;
  name?: string;
  olloBalance: Coin;
  olloSpendable: Coin;
  olloDelegations: DelegationResponse[];
  olloRewards: RewardsResponse;
};
export const useOlloUser = (a: string, name?: string): UseOlloUserResponse => {
  const [
    { data: addr, isFetched: aFetched },
    { data: uname, isFetched: uFetched },
    { data: balance, isFetched: bFetched },
    { data: spendable, isFetched: sFetched },
    { data: dels, isFetched: dFetched },
    { data: rews, isFetched: rFetched },
  ] = useQueries({
    queries: [
      {
        queryKey: ["ollo", "address"],
        queryFn: () => a,
        initialData: a,
        refetchOnMount: "always",
        retryOnMount: true,
        refetchInterval: 1000,
      },
      {
        queryKey: ["ollo", "name", a],
        queryFn: () => name,
        initialData: name,
        refetchOnMount: "always",
        retryOnMount: true,
        refetchInterval: 1000,
      },
      {
        queryKey: ["ollo", "balance", a],
        queryFn: () => getOlloBalance(a),
        initialData: zeroAmt,
      },
      {
        queryKey: ["ollo", "balance", "spendable", a],
        queryFn: () => getOlloSpendableBalance(a),
        initialData: zeroAmt,
      },
      {
        queryKey: ["ollo", "delegations", a],
        queryFn: () => getDelegations(a),
        initialData: [],
      },
      { queryKey: ["ollo", "rewards", a], queryFn: () => getOlloRewards(a) },
    ],
  });
  if (uFetched && aFetched && bFetched && sFetched && dFetched && rFetched)
    return {
      olloBalance: balance,
      olloRewards: rews,
      olloDelegations: dels,
      olloSpendable: spendable,
      name: uname,
      addr: addr,
    };
};
