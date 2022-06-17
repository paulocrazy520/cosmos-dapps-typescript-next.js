import { NextApiRequest, NextApiResponse } from "next";
import { apiUrl } from "../..";

export default async function Validators(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await fetch(apiUrl("cosmos/bank/v1beta1/params"), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => {
          return res.status(200).json(response);
        });
  }
}
