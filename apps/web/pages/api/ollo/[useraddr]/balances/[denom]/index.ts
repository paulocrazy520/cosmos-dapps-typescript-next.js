import { zeroAmt } from "@/lib/util";
import { Coin } from "@cosmjs/stargate";
import axios from "axios";
import { apiGet, apiUrl, getCosmos } from "../../../../../../lib/api";

export default async function handler(req, res) {
  const { useraddr, denom } = req.query;
  switch (req.method) {
    case "GET":
      return await axios
        .get(
          process.env.OLLO_API +
            "/lcd/cosmos/bank/v1beta1/balances/" +
            useraddr +
            "?denom=" +
            denom
        )
        .then((response) => response.data)
        .then((r) => r.balances)
        .then((response) => {
          return res.status(200).json(response);
        })
        .catch((e) => {
          console.log(e);
          res.json(zeroAmt);
        });
  }
}
