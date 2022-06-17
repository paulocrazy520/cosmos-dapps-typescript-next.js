import { observer } from "mobx-react-lite";
import { NextApiHandler, NextApiResponse, NextApiRequest } from "next";

export interface ApiRootProps {
  address: string;
  reqRoute: string;
  props: JSON;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetch("https://rpc.ollo.zone:443/status")
    .then((r) => r.json())
    .then((r) => {
      return res.status(200).json(r);
    })
    .catch((err) => {
      console.error(err);
    });
  // switch (req.method) {
  //     case "GET":
  //         res.status(200).json({
  //             apiRoutes: [
  //                 "/api/health"
  //             ],
  //             ...rpcStatus
  //         });
  //         break;
  //     case "POST":
  //         if (req.body) {
  //             res.setHeader("Content-Type", "application/json");
  //             res.status(200).json({
  //                 ...req.body
  //             })
  //         }
  //         break;
  //     default:
  //         res.status(405).json({
  //             "Not allowed": req.method
  //         })
  //         break;
  // }
}
