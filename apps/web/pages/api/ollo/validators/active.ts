import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { apiGet } from "../..";

export default async function Validators(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await axios
        .get(
          `${process.env.OLLO_API}/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=100`
        )
        .then((response) => res.status(200).json(response.data));
  }
}
