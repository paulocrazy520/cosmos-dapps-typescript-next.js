import { NextApiRequest, NextApiResponse } from "next";
import { apiUrl } from "../../../..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { useraddr, validatoraddr } = req.query;
  switch (req.method) {
    case "GET":
      return await fetch(
        apiUrl(
          "cosmos/staking/v1beta1/validators/" +
            validatoraddr +
            "/delegations/" +
            useraddr
        ),
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((response) => {
          return res.status(200).json(response);
        });
  }
}
