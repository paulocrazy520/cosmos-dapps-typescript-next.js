import { NextApiRequest, NextApiResponse } from "next";
import { apiGet, apiUrl } from "../../..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { useraddr } = req.query;
  switch (req.method) {
    case "GET":
      await apiGet(
        "cosmos/staking/v1beta1/delegations/" + useraddr + "/redelegations"
      ).then((r) => {
        return res.status(200).json(r);
      });
  }
}
