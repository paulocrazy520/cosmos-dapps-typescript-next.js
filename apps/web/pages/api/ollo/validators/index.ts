import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { apiGet } from "../..";

export default async function Validators(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return axios
        .get(
          `${process.env.OLLO_API}/lcd/cosmos/staking/v1beta1/validators?pagination.limit=1000`
        )
        .then((response) => res.status(200).json(response.data));
  }
}
