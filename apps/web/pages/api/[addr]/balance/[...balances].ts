import { chainRegistryChainToKeplr } from "@chain-registry/keplr";
import { SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { ChainInfos } from "../../../../config";
import { olloChainInfo } from "../../../../config/ollo";
import { endpoints, rpcUrl } from "../../../../lib/api";

export default async function h(req, res) {
  const { chainId } = olloChainInfo;
  const c = await await StargateClient.connect(endpoints.rpc);
  res.status(200);
}
