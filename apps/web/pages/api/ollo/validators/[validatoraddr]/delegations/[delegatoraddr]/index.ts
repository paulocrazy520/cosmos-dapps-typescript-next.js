import { NextApiRequest, NextApiResponse } from "next";
import { rpcGet, apiGet } from "../../../../..";

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
          delegatoraddr
      ).then((r) => {
        return res.status(200).json(r);
      });
  }
}
