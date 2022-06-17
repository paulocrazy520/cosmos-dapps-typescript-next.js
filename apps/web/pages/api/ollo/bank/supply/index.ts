import { NextApiRequest, NextApiResponse } from "next";
import { apiUrl } from "../../..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await fetch(apiUrl("cosmos/bank/v1beta1/supply"), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => {
          return res.status(200).json(response);
        });
  }
}
