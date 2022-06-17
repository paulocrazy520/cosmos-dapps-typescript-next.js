export * from "./action";
export * from "./keplr";
export * from "./hook";

import { Coin } from "@cosmjs/stargate";
import { ValidatorReward, RewardsResponse } from "@/types/distribution/rewards";
import { apiGet } from "../../api";
import { Account } from "@/types/auth";
import axios from "axios";

export const getOlloAccounts = async (): Promise<Account[]> => {
  return await axios
    .get(`${process.env.OLLO_API}/ollo/auth/accounts`)
    .then((r) => r.data)
    .then((r) => r.accounts)
    .catch((e) => {
      console.log(e);
      return {};
    });
};

export const getOlloAccount = async (addr: string): Promise<Account> => {
  if (addr === "") return;
  return await axios
    .get(`${process.env.OLLO_API}/ollo/${addr}`)
    .then((r) => r.data)
    .then((r) => r.account)
    .catch((e) => {
      console.log(e);
      return {};
    });
};

export const getOlloValidatorRewards = async (
  addr: string,
  v: string
): Promise<Coin> => {
  if (addr === "") return;
  return await axios
    .get(`${process.env.OLLO_API}/ollo/${addr}/delegations/rewards/${v}`)
    .then((r) => r.data)
    // .then((r: Coin[]) => r.find((c: Coin) => c.denom == "utollo"))
    .catch((e) => {
      console.log(e);
      return {};
    });
};

export const getOlloRewards = async (
  addr: string
): Promise<RewardsResponse> => {
  if (addr === "") return;
  return axios
    .get(
      `${process.env.OLLO_API}/cosmos/distribution/v1beta1/delegators/${addr}/rewards`
    )
    .then((r) => r.data);
};

export const getOlloBalance = async (addr: string): Promise<Coin> => {
  if (addr === "") return { denom: "0", amount: "0" };
  return await axios
    .get(
      `${process.env.OLLO_API}/cosmos/bank/v1beta1/balances/${addr}/by_denom?denom=utollo`
    )
    .then((r) => r.data)
    .then((r: Coin[]) => r.find((c: Coin) => c.denom == "utollo"));
  //   return await axios.get(`${process.env.OLLO_API}/ollo/${addr}/balances/utollo`)
  //     .then(r => r.data)
  //     .then((r: Coin[]) => r.find((c: Coin) => c.denom == "utollo"))
  //     .catch((e) => {
  //       console.log(e)
  //       return {
  //         "amount": "0",
  //         "denom": "utollo"
  //       }
  //     })
};

export const getOlloSpendableBalance = async (addr: string): Promise<Coin> => {
  if (addr === "") return { denom: "0", amount: "0" };
  return await axios
    .get(
      `${process.env.OLLO_API}/cosmos/bank/v1beta1/balances/${addr}/by_denom?denom=utollo`
    )
    .then((r) => r.data)
    .then((r: Coin[]) => r.find((c: Coin) => c.denom == "utollo"));
};

export const getTxsBySender = async (sender: string) => {
  if (sender === "") return;
  return await axios
    .get(
      `${process.env.OLLO_API}/cosmos/tx/v1beta1/txs?events=message.sender='${sender}'&order_by=2&limit=10`
    )
    .then((r) => r.data.tx_responses);
}