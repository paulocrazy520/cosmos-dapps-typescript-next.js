import { NextApiRequest, NextApiResponse } from "next";
import { apiGet } from "../..";

export default async function Validators(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await apiGet(
        "cosmos/auth/v1beta1/accounts?pagination.limit=1000"
      ).then((response) => res.status(200).json(response));
  }
}
