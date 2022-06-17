import { NextApiRequest, NextApiResponse } from "next";
import { apiUrl } from "../../../..";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { proposalid, depositor } = req.query;
  switch (req.method) {
    case "GET":
      return await fetch(
        apiUrl(
          "cosmos/gov/v1beta1/proposals/" +
            proposalid +
            "/deposits/" +
            depositor
        ),
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((response) => {
          return res.status(200).json(response);
        });
  }
}
