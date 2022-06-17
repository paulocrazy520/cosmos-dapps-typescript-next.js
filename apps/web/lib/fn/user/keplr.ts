import { olloKeplrChainInfo } from "@/config/ollo";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Keplr } from "@keplr-wallet/types";
import { endpoints } from "../..";

export const disconnect = (k: Keplr) => {
  k.getOfflineSignerAuto(olloKeplrChainInfo.chainId).then((kp) => {
    SigningStargateClient.connectWithSigner(endpoints.rpc, kp).then((s) => {
      s.disconnect();
    });
  });
};
