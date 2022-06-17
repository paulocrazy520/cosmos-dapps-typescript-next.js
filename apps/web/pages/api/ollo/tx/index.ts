import { NextApiRequest, NextApiResponse } from "next";
import { getCosmos } from "../../../../lib/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { txHash } = req.query;
  switch (req.method) {
    case "GET":
      return await getCosmos("tx", `txs`).then((response) => {
        return res.status(200).json(response);
      });
  }
}
