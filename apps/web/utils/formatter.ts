import { PricePretty, IntPretty, CoinPretty } from "@keplr-wallet/unit";

/** Formats a price as compact by default. i.e. $7.53M or $265K. Validate handled by `PricePretty`. */
export function priceFormatter(
  price: PricePretty,
  opts: Intl.NumberFormatOptions = {
    maximumSignificantDigits: 3,
    notation: "compact",
    compactDisplay: "short",
    style: "currency",
    currency: price.fiatCurrency.currency,
  }
): string {
  const formatter = new Intl.NumberFormat(price.fiatCurrency.locale, opts);
  return formatter.format(
    Number(new IntPretty(price).maxDecimals(2).toString().split(",").join(""))
  );
}

/** Formats a coin as compact by default. i.e. $7.53 ATOM or $265 OSMO. Validate handled by `CoinPretty`. */
export function coinFormatter(
  coin: CoinPretty,
  opts: Intl.NumberFormatOptions = {
    maximumSignificantDigits: 3,
    notation: "compact",
    compactDisplay: "short",
    style: "decimal",
  }
): string {
  const formatter = new Intl.NumberFormat("en-US", opts);
  return `${formatter.format(
    Number(new IntPretty(coin).maxDecimals(2).toString().split(",").join(""))
  )} ${coin.currency.coinDenom.toUpperCase()}`;
}
