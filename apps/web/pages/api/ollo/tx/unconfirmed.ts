import { NextApiRequest, NextApiResponse } from "next";

export default async function Validators(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await fetch("https://rpc.ollo.zone:443/num_unconfirmed_txs")
        .then((response) => response.json())
        .then((response) => {
          return res.status(200).json(response);
        });
  }
}
