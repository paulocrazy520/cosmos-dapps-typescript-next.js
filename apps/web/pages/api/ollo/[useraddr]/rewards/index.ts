import { Coin } from "@cosmjs/stargate";
import { apiGet, apiUrl, getCosmos } from "@/lib/api";

export default async function handler(req, res) {
  const { useraddr, denom } = req.query;
  switch (req.method) {
    case "GET":
      return await fetch(
        apiUrl(
          "cosmos/distribution/v1beta1/delegators/" + useraddr + "/rewards"
        ),
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((response) => {
          return res.status(200).json(response);
        });
  }
}
