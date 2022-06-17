import { Coin, StargateClient } from "@cosmjs/stargate";
import { olloChainInfo } from "../../../config/ollo";
import { endpoints, rpcUrl } from "../../../lib/api";
import { NextApiRequest, NextApiResponse } from "next";
import { RootStore } from "../../../stores/root";
import { getKeplrFromWindow } from "@keplr-wallet/stores";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const keplr = getKeplrFromWindow()
  // const { addr } = req.query
  // await c.getAllBalances(addr as string)
  //     .then((b: Coin[]) => {return res.status(200).json(b)})
  //     .catch((e) => {return res.status(500).json({error: e.message})})
}
