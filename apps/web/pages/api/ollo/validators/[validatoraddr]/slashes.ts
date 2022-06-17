import { NextApiRequest, NextApiResponse } from "next";
import { apiGet } from "../../..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { validatoraddr } = req.query;
  if (req.query.validatoraddr) {
    switch (req.method) {
      case "GET":
        await apiGet(
          "cosmos/staking/v1beta1/validators/" + validatoraddr + "/delegations"
        ).then((r) => {
          return res.status(200).json(r);
        });
    }
  }
}
