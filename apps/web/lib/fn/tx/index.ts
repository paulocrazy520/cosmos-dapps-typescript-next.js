import { olloKeplrChainInfo } from "@/config/ollo";
import { GasPrice } from "@cosmjs/stargate";
import { SigningStargateClient } from "@cosmjs/stargate";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { Keplr } from "@keplr-wallet/types";
import { endpoints } from "../..";

export const defaultOlloGas = (
  base?: number,
  factor?: number,
  denom?: string
): GasPrice => {
  const b = base ? base : 0.025;
  const f = factor ? factor : 1.5;
  const gd = f * b * 1000000;
  return GasPrice.fromString(gd.toString() + (denom ? denom : "utollo"));
};

export const getStargateKeplr = async (
  keplr?: Keplr,
  chainId?: string,
  endpoint?: string
): Promise<SigningStargateClient> => {
  const k = keplr ? keplr : await getKeplrFromWindow();
  const cid = chainId ? chainId : olloKeplrChainInfo.chainId;
  const os = await k.getOfflineSignerAuto(cid);
  const ep = endpoint ? endpoint : endpoints.rpc;
  return await SigningStargateClient.connectWithSigner(ep, os, {
    prefix: "ollo",
    gasPrice: defaultOlloGas(),
  });
};
