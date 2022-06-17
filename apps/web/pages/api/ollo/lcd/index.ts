import { NextApiRequest, NextApiResponse } from "next";
import { apiUrl, rpcUrl } from "../..";

export default async function Validators(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await fetch(apiUrl(""))
        .then((response) => response.json())
        .then();
  }
}
