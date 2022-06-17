// import { AccountData } from "@cosmjs/stargate"
import { AccountData } from "@keplr-wallet/types";
import {
  Account,
  SigningStargateClient,
  StargateClient,
  Coin,
} from "@cosmjs/stargate";
import { useLocalStorage } from "@mantine/hooks";
import { useQueries, useQuery } from "@tanstack/react-query";
import { olloKeplrChainInfo } from "../../config/ollo";
import { endpoints, fchr } from "../../lib/api";
import { allowStateReadsStart } from "mobx/dist/internal";
import { openModal } from "@mantine/modals";
import axios from "axios";

export function useStakedBalance(a: string) {
  StargateClient.connect(endpoints.rpc).then(async (r) => {
    a && (await r.getBalanceStaked(a).then((r) => parseInt(r.amount)));
  });
}
export function useSpendableBalance(a: string) {
  const { data, error, status, isLoading } = useQuery(["ollo-balances"], () =>
    axios
      .get(`${process.env.OLLO_API}/cosmos/bank/v1beta1/balances/${a}`)
      .then((d) => d.data.balances)
  );
  if (!error) return data;
}
export function useDelegations(a: string) {
  const { data, error } = useQuery(["ollo-delegations"], () =>
    axios
      .get(
        `${process.env.OLLO_API}/cosmos/distribution/v1beta1/delegators/${a}/validators?pagination.size=200`
      )
      .then((r) => r.data)
  );
  if (!error) return data;
}
export function useRewards(a: string) {
  const { data, error } = useQuery(["ollo-rewards"], () =>
    axios
      .get(
        `${process.env.OLLO_API}/cosmos/distribution/v1beta1/delegators/${a}/rewards`
      )
      .then((r) => r.data)
  );
  if (!error) return data;
}
export function useBalance(a: string) {
  StargateClient.connect(endpoints.rpc).then(async (r) => {
    a && (await r.getBalance(a, "utollo").then((r) => parseInt(r.amount)));
  });
}

export async function getAccounts(): Promise<readonly AccountData[]> {
  if (typeof window !== "undefined") {
    if (!window.keplr)
      openModal({
        title: "Please install Keplr extension",
        onClose: () => {
          return [];
        },
      });
    const { chainId } = olloKeplrChainInfo;
    await window.keplr?.experimentalSuggestChain(olloKeplrChainInfo);
    await window.keplr?.enable(chainId);
    const offlineSigner = window.getOfflineSigner(chainId);
    return await offlineSigner.getAccounts();
  }
  return [];
}
export async function getSigningClient(): Promise<SigningStargateClient> {
  if (typeof window !== "undefined") {
    if (!window.keplr)
      openModal({
        title: "Please install Keplr extension",
        onClose: () => {
          return [];
        },
      });
    const { chainId } = olloKeplrChainInfo;
    await window.keplr?.experimentalSuggestChain(olloKeplrChainInfo);
    await window.keplr.enable(chainId);
    const offlineSigner = window.getOfflineSigner(chainId);
    return SigningStargateClient.connectWithSigner(
      endpoints.rpc,
      offlineSigner
    );
  }
}

export async function undelegate(
  d: string,
  v: string,
  amount: Coin,
  memo?: string
) {
  const client = await getSigningClient();
  return client.undelegateTokens(d, v, amount, "auto", memo ? memo : null);
}
export async function send(d: string, r: string, amount: any, memo?: string) {
  const client = await getSigningClient();
  return await client.sendTokens(d, r, amount, "auto", memo ? memo : null);
}
export async function account(
  d: string,
  v: string,
  amount: Coin,
  memo?: string
): Promise<Account> {
  const client = await getSigningClient();
  return await client.getAccount(d);
}
export async function delegate(
  d: string,
  v: string,
  amount: Coin,
  memo?: string
) {
  const client = await getSigningClient();
  return client.delegateTokens(d, v, amount, "auto", memo ? memo : null);
}
export async function withdrawRewards(d: string, v: string, memo?: string) {
  const client = await getSigningClient();
  await client.withdrawRewards(d, v, "auto", memo ? memo : null);
}
export function useStaked(a: string) {
  const { data, error } = useQuery(["ollo-balances"], () =>
    fetch(`/api/${a}/balances`).then((r) => r.json())
  );
  if (!error) return data;
}
export function useOlloBalance(a: string) {
  const { data, error } = useQuery(["ollo-balances"], () =>
    fetch(`/api/${a}/balances/ollo`).then((r) => r.json())
  );
  if (!error) return data;
}
export function useBalances(a: string) {
  const { data, error } = useQuery(["ollo-balances"], () =>
    fetch(`/api/${a}/balances`).then((r) => r.json())
  );
  if (!error) return data;
}
export function useAccounts() {
  const { data, error } = useQuery(["ollo-accounts"], () =>
    fetch(`/api/ollo/auth/accounts`).then((r) => r.json())
  );
  if (!error) return data;
}
// export function useUser(addr: string): UserProps {
//     return k{

//     }
// }
// export const claimRewards = async (
//   senderAddress: string,
//   rewardsAddresses: Array<string>,
//   client: SigningCosmWasmClient
// ) => {
//   const claimRewardsMsg = { claim: {} }

//   const messages = rewardsAddresses.map((rewardsAddress) =>
//     createExecuteMessage({
//       senderAddress,
//       contractAddress: rewardsAddress,
//       message: claimRewardsMsg,
//     })
//   )

//   return validateTransactionSuccess(
//     await client.signAndBroadcast(senderAddress, messages, 'auto')
//   )
// }
