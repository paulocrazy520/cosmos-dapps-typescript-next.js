import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { apiGet } from "@/lib/api";

export default async function Validators(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { validatoraddr },
  } = req;
  switch (req.method) {
    case "GET":
      return await apiGet("cosmos/staking/v1beta1/validators/" + validatoraddr)
        .then((r) => r.validator)
        .then((response) => res.status(200).json(response));
  }
}
