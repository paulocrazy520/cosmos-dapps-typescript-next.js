import { NextApiHandler, NextApiResponse, NextApiRequest } from "next";

export interface ApiHealthProps {
  props: JSON;
}

export const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await fetch("https://rpc.ollo.zone:443/health")
    .then((response) => response.json())
    .then((r) => {
      return res.status(200).json(r);
    })
    .catch((e) => {
      console.error(e);
    });
  // switch (req.method) {
  //     case "GET":
  //         res.status(200).json(health);
  //         break;
  //     case "POST":
  //         if (req.body) {
  //             res.setHeader("Content-Type", "application/json");
  //             res.status(200).json(req.body)
  //         }
  //         break;
  //     default:
  //         res.status(405).json({
  //             "Not allowed": req.method
  //         })
  //         break;
  // }
};
