import { CoinPretty, PricePretty } from "@keplr-wallet/unit";
import { FiatCurrency } from "@keplr-wallet/types";

export interface IPriceStore {
  defaultVsCurrency: string;
  calculatePrice(
    coin: CoinPretty,
    vsCurrency?: string
  ): PricePretty | undefined;
  getPrice(coinId: string, vsCurrency?: string): number | undefined;
  getFiatCurrency(currency: string): FiatCurrency | undefined;
  setDefaultVsCurrency(defaultVsCurrency: string): void;
  restoreDefaultVsCurrency(): Generator;
}

export interface IntermediateRoute {
  /** CoinGecko ID */
  readonly alternativeCoinId: string;
  readonly poolId: string;
  /** min denom */
  readonly spotPriceSourceDenom: string;
  /** min denom */
  readonly spotPriceDestDenom: string;
  /** CoinGecko ID */
  readonly destCoinId: string;
}
