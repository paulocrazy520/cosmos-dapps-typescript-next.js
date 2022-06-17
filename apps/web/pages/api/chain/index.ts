import { RootStore } from "../../../stores/root";
import { NextApiRequest, NextApiResponse } from "next";
import { getKeplrFromWindow } from "@keplr-wallet/stores";

export const Handler = (req: NextApiRequest, res: NextApiResponse) => {
  const keplr = getKeplrFromWindow();
  const store = new RootStore(() => {
    return keplr;
  });
  const { chainStore } = store;
  switch (req.method) {
    case "GET": {
      return res.status(200).json(chainStore);
    }
  }
  return res.status(500).json({ error: "Method not supported" });
};
export default Handler;
