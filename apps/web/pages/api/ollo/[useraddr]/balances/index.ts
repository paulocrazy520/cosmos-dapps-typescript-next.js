import { zeroAmt } from "@/lib/util";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { apiUrl } from "../../..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { useraddr } = req.query;
  switch (req.method) {
    case "GET":
      return await axios
        .get(
          process.env.OLLO_API + "/lcd/cosmos/bank/v1beta1/balances/" + useraddr
        )
        .then((response) => response.data.balances)
        .then((response) => {
          return res.status(200).json(response);
        })
        .catch((e) => {
          console.log(e);
          res.json(zeroAmt);
        });
  }
}
