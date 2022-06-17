import { NextApiRequest, NextApiResponse } from "next";
import { getSigningClient } from "../../../../hooks/user";
import { getCosmos } from "../../../../lib/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // req.statusCode(200)
  switch (req.method) {
    // case "POST": return await
    case "GET":
      return await getCosmos("tx", `txs`).then((response) => {
        return res.status(200).json(response);
      });
  }
}
