import axios from "axios";
import useSWR from "swr";

export const getOnsNames = () => {};

export async function queryPools(denoms?: string) {
  var qstr = process.env.OLLO_API + "/ollo/liquidity/v1/pools";
  if (denoms) qstr += "?denoms=" + denoms;
  const res = await axios.get(qstr).then((r) => r.data.pools);
}

export async function queryPoolOrders(denoms?: string) {
  var qstr = process.env.OLLO_API + "/ollo/liquidity/v1/orders";
  if (denoms) qstr += "?denoms=" + denoms;
  const res = await axios.get(qstr).then((r) => r.data.orders);
}

export async function queryPairs(denoms?: string) {
  var qstr = process.env.OLLO_API + "/ollo/liquidity/v1/pairs";
  if (denoms) qstr += "?denoms=" + denoms;
  const res = await axios
    .get(process.env.OLLO_API + qstr)
    .then((r) => r.data.pairs);
}

export const usePools = (denoms?: string) => {
  const { data, error } = useSWR(
    denoms ? `/pools?denoms=${denoms}` : "/pools",
    queryPools
  );
  return {
    pools: data,
    isLoading: !error && !data,
    isError: error,
  };
};
