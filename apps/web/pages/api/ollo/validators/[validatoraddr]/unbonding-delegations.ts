import { NextApiRequest, NextApiResponse } from "next";
import { apiGet } from "../../..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { validatoraddr } = req.query;
  switch (req.method) {
    case "GET":
      await apiGet(
        "cosmos/staking/v1beta1/validators/" +
          validatoraddr +
          "/unbonding_delegations/"
      ).then((r) => {
        return res.status(200).json(r);
      });
  }
}
