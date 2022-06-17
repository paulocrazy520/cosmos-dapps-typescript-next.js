import { NextApiRequest, NextApiResponse } from "next";
import { apiUrl } from "../..";

export default async function Validators(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { useraddr } = req.query;
  switch (req.method) {
    case "GET":
      return await fetch(
        apiUrl(("cosmos/auth/v1beta1/accounts/" + useraddr) as string),
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((response) => {
          return res.status(200).json(response);
        });
  }
}
