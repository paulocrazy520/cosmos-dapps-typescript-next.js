import { NextApiRequest, NextApiResponse } from "next";
import { apiGet, apiUrl } from "../..";

export default async function Validators(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await apiGet("cosmos/staking/v1beta1/validators").then(
        (response) => res.status(200).json(response)
      );
  }
}
