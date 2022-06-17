import { NextApiRequest, NextApiResponse } from "next";
import { apiGet, apiUrl } from "../../../../..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { validatoraddr, delegatoraddr } = req.query;
  switch (req.method) {
    case "GET":
      await apiGet(
        "cosmos/staking/v1beta1/validators/" +
          validatoraddr +
          "/delegations/" +
          delegatoraddr +
          "/unbonding_delegation"
      ).then((r) => {
        return res.status(200).json(r);
      });
  }
}
