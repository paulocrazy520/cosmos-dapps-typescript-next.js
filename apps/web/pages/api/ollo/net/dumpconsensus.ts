import { NextApiRequest, NextApiResponse } from "next";
import { rpcGet } from "../..";

export default async function Validators(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await rpcGet("dump_consensus").then((r) => {
        return res.status(200).json(r);
      });
  }
}
