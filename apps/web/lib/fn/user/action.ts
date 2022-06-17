import { Validator } from "@/types/staking";
import {
  Coin,
  DeliverTxResponse,
  GasPrice,
  isMsgWithdrawDelegatorRewardEncodeObject,
  MsgWithdrawDelegatorRewardEncodeObject,
} from "@cosmjs/stargate";
// import { OfflineSigner } from '@cosmjs/stargate'
import { SigningStargateClient } from "@cosmjs/stargate";
import { Keplr } from "@keplr-wallet/types";
import { endpoints } from "../..";
import { showNotification } from "@mantine/notifications";
import { defaultOlloGas, getStargateKeplr } from "../tx";
import { getOlloRewards } from ".";
import { ValidatorReward } from "@/types/distribution";
import { EncodeObject } from "@cosmjs/stargate/node_modules/@cosmjs/proto-signing";

export const getAllBalances = async (
  user: string,
  keplr?: Keplr
): Promise<Coin[] | void> => {
  const c: SigningStargateClient = await getStargateKeplr(keplr);
  return await c
    .getAllBalances(user)
    .catch((e) => {
      console.log(e);
      showNotification({
        title: "Cancelled getting balances",
        message: "Cancelled getting balances from " + user,
      });
    })
    .then((r: Coin[]) => {
      console.log("BALANCES", r);
      showNotification({
        title: "Got balances!",
        message: "Got " + r.length + " balances from " + user,
      });
    });
};
export const sendTokens = async (
  from: string,
  to: string,
  amount: Coin,
  keplr?: Keplr,
  memo?: string
): Promise<DeliverTxResponse> => {
  const c: SigningStargateClient = await getStargateKeplr(keplr);
  return await c
    .sendTokens(from, to, [amount], "auto", memo ? memo : "")
    .catch((e) => {
      console.log(e);
      showNotification({
        title: "Cancelled sending tokens",
        message: "Cancelled delegation from " + from + " to " + to,
      });
    })
    .then((r: DeliverTxResponse) => {
      console.log("SENT", r);
      showNotification({
        title: "Sent tokens!",
        message: "Sent " + amount.amount + " " + amount.denom + " to " + to,
      });
      return r;
    });
};

export const delegateToOlloValidator = async (
  user: string,
  validator: string,
  amount: Coin,
  keplr?: Keplr,
  memo?: string
): Promise<DeliverTxResponse> => {
  const c: SigningStargateClient = await getStargateKeplr(keplr);
  return await c
    .delegateTokens(user, validator, amount, "auto", memo ? memo : "")
    .catch((e) => {
      console.log(e);
      showNotification({
        title: "Cancelled delegation",
        message: "Cancelled delegation to " + validator,
      });
    })
    .then((r: DeliverTxResponse) => {
      console.log("CLAIMED REWARDS: ", r);
      showNotification({
        title: "Delegated successfully!",
        message:
          "Delegated " +
          amount.amount +
          " " +
          amount.denom +
          " to " +
          validator,
      });
      return r;
    });
};

export const undelegateToOlloValidator = async (
  user: string,
  validator: string,
  amount: Coin,
  keplr?: Keplr,
  memo?: string
): Promise<DeliverTxResponse> => {
  const c: SigningStargateClient = await getStargateKeplr(keplr);
  return await c
    .undelegateTokens(user, validator, amount, "auto", memo ? memo : "")
    .catch((e) => {
      console.log(e);
      showNotification({
        title: "Cancelled undelegation",
        message: "Cancelled undelegation to " + validator,
      });
    })
    .then((r: DeliverTxResponse) => {
      console.log("CLAIMED REWARDS: " + r.data, r.rawLog);
      showNotification({
        title: "Undelegated successfully",
        message: "Undelegated successfully from validator " + validator,
      });
      return r;
    });
};

export const claimOlloRewards = async (
  user: string,
  keplr?: Keplr,
  memo?: string
): Promise<DeliverTxResponse> => {
  const c: SigningStargateClient = await getStargateKeplr(keplr);
  const rewards = await getOlloRewards(user);
  const encoded: readonly EncodeObject[] = rewards.rewards.map(
    (r: ValidatorReward): MsgWithdrawDelegatorRewardEncodeObject => ({
      typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
      value: {
        delegatorAddress: user,
        validatorAddress: r.validator_address,
      },
    })
  );
  return await c
    .signAndBroadcast(user, encoded, "auto", memo ? memo : "")
    .catch((e) => {
      console.log(e);
      showNotification({
        title: "Cancelled withdrawing rewards",
        message: "Cancelled withdrawing rewards by " + user,
      });
    })
    .then((r: DeliverTxResponse) => {
      console.log("CLAIMED REWARDS: ", r);
      showNotification({
        title: "Withdrawn all rewards!",
        message: "Withdrawn all rewards by " + user,
      });
      return r;
    });
};
export const claimOlloValidatorRewards = async (
  user: string,
  validator: string,
  keplr?: Keplr,
  memo?: string
): Promise<DeliverTxResponse> => {
  const c: SigningStargateClient = await getStargateKeplr(keplr);
  return await c
    .withdrawRewards(user, validator, "auto", memo ? memo : "")
    .catch((e) => {
      console.log(e);
      showNotification({
        title: "Cancelled delegation",
        message: "Cancelled delegation to " + validator,
      });
    })
    .then((r: DeliverTxResponse) => {
      console.log("CLAIMED REWARDS: ", r);
      showNotification({
        title: "Withdrawn rewards!",
        message: "Withdrawn rewards from " + validator,
      });
      return r;
    });
};
