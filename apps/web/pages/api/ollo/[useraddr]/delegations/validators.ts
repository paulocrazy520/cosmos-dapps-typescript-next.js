import { NextApiRequest, NextApiResponse } from "next";
import { apiUrl } from "../../..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { useraddr } = req.query;
  switch (req.method) {
    case "GET":
      return await fetch(
        apiUrl(
          "cosmos/distribution/v1beta1/delegators/" + useraddr + "/validators"
        ),
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((response) => {
          return res.status(200).json(response);
        });
  }
}
