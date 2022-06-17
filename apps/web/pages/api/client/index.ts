import { StargateClient } from "@cosmjs/stargate";
import { NextApiRequest, NextApiResponse } from "next";
import { olloChainInfo } from "../../../config/ollo";
import { endpoints, rpcUrl } from "../../../lib/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const c = await StargateClient.connect(endpoints.rpc);
}
