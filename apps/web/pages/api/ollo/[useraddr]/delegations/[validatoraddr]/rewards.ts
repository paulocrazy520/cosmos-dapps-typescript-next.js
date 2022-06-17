import { NextApiRequest, NextApiResponse } from "next";
import { apiUrl, getCosmos } from "../../../../../../lib/api";

export type TxPost = {
  tx_bytes: Uint8Array;
  mode: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { useraddr, validatoraddr } = req.query;
  switch (req.method) {
    case "GET":
      return await fetch(
        apiUrl(
          "cosmos/distribution/v1beta1/delegators/" +
            useraddr +
            "/rewards/" +
            validatoraddr
        ),
        { method: "GET" }
      )
        .then((r) => r.json())
        .then((response) => {
          return res.status(200).json(response);
        });
  }
}
