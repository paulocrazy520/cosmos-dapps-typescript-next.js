import { StargateClient, Coin } from "@cosmjs/stargate";
import { apiGet, endpoints } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../../stores";
import axios from "axios";

export const getOlloApiBalance = async (addr: string): Promise<Coin> => {
  return await axios
    .get(`${process.env.OLLO_API}/ollo/${addr}/balances/utollo`)
    .then((r) => r.data)
    .then((r) => r.balances)
    .catch((e) => {
      console.log(e);
      return { amount: "", denom: "utollo" };
    });
};

export const getOlloClientBalance = async (addr: string): Promise<Coin> => {
  return await StargateClient.connect(endpoints.rpc)
    .then(async (r: StargateClient) => {
      return await r.getBalance(addr, "utollo").then((c: Coin) => {
        return c;
      });
    })
    .catch((e) => {
      console.log(e);
      return { amount: "0", denom: "utollo" };
    });
};
export const getOlloClientStakedBalance = async (
  addr: string
): Promise<Coin> => {
  return await StargateClient.connect(endpoints.rpc)
    .then(async (r: StargateClient) => {
      return await r.getBalanceStaked(addr).then((c: Coin) => {
        return c;
      });
    })
    .catch((e) => {
      console.log(e);
      return { amount: "0", denom: "utollo" };
    });
};
export const useBalance = async () => {
  const {
    accountStore,
    chainStore: {
      ollo: { chainId },
    },
  } = useStore();
  const { bech32Address: addr } = accountStore.getAccount(chainId);
  return useQuery(["ollo-balance"], async () => {
    return await getOlloApiBalance(addr);
  });
};
