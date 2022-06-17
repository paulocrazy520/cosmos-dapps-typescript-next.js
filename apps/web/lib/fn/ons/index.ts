import { olloKeplrChainInfo } from "@/config/ollo";
import { OnsWhoisResponse } from "@/types/ons";
import { Coin, SigningStargateClient } from "@cosmjs/stargate";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { endpoints } from "../..";

export const getStargateFromKeplrWin =
  async (): Promise<SigningStargateClient> => {
    const keplr = await getKeplrFromWindow();
    const olloChainId = olloKeplrChainInfo.chainId;
    const os = await keplr.getOfflineSignerAuto(olloChainId);
    const sc = await SigningStargateClient.connectWithSigner(endpoints.rpc, os);
    return sc;
  };
