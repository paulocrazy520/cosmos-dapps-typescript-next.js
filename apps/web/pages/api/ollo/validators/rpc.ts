import { NextApiRequest, NextApiResponse } from "next";
import { rpcUrl } from "../..";

export default async function Validators(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await fetch(rpcUrl("validators"))
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
          return {};
        })
        .then((response) => {
          return res.status(200).json(response);
        });
  }
}
