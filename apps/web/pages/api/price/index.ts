import { RootStore } from "../../../stores/root";
import { NextApiRequest, NextApiResponse } from "next";
import { getKeplrFromWindow } from "@keplr-wallet/stores";

export const fiatDenomFromCountry = (
  country: string
): LocaleDenom | undefined => {
  switch (country.toLowerCase()) {
    case "united states of america" || "usa" || "united_states_of_america":
      return LocaleDenom.USD;
    case "canada":
      return LocaleDenom.CUSD;
    case "australia":
      return LocaleDenom.CUSD;
    default:
      return undefined;
  }
};

export enum LocaleDenom {
  USD,
  CUSD,
  AUSD,
}
export type FiatCoin = {
  localityDenom: LocaleDenom;
};

export type CoinPrice = {};
export const Handler = (req: NextApiRequest, res: NextApiResponse) => {
  const keplr = getKeplrFromWindow();
  const store = new RootStore(() => {
    return keplr;
  });
  const { priceStore } = store;
  switch (req.method) {
    case "GET":
      return res.status(200).json(priceStore);
    case "POST": {
    }
  }
  return res.status(500).json({ error: "Method not supported" });
};
export default Handler;
