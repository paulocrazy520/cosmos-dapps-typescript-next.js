import { RootStore } from "../../../stores/root";
import { NextApiRequest, NextApiResponse } from "next";
import { getKeplrFromWindow } from "@keplr-wallet/stores";

export type AccountBody = {
  address: string;
  name?: string;
  avatar?: string;
};
export const Handler = (req: NextApiRequest, res: NextApiResponse) => {
  const keplr = getKeplrFromWindow();
  const store = new RootStore(() => {
    return keplr;
  });
  const { accountStore } = store;
  const { chainId } = store.chainStore.ollo;
  switch (req.method) {
    case "POST": {
      const { address, name, avatar } = req.body as AccountBody;
      req.cookies["ollo_address"] = address;
      name && (req.cookies["ollo_name"] = name);
      avatar && (req.cookies["ollo_avatar"] = avatar);
      return res.status(200).json({ address, name, avatar });
    }
    case "GET": {
      return res.status(200).json(accountStore.getAccount(chainId));
    }
  }
  return res.status(500).json({ error: "Method not supported" });
};
export default Handler;
