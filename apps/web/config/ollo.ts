import { Bech32Address } from "@keplr-wallet/cosmos";
import { olloChainInfo as olloxChainInfo } from ".";
import { ChainInfo } from "@keplr-wallet/types";
import { ChainInfoWithExplorer } from "../stores/chain";
export { olloChainInfo } from "./chain-infos";
export const olloKeplrChainInfo: ChainInfo = {
  chainId: "ollo-testnet-1",
  chainName: "OLLO Testnet",
  rpc: "https://rpc.ollo.zone:443",
  rest: "https://lcd.ollo.zone:443",
  bip44: {
    coinType: 118,
  },
  coinType: 118,
  bech32Config: {
    bech32PrefixAccAddr: "ollo",
    bech32PrefixAccPub: "ollopub",
    bech32PrefixValAddr: "ollovaloper",
    bech32PrefixValPub: "ollovaloperpub",
    bech32PrefixConsAddr: "ollovalcons",
    bech32PrefixConsPub: "ollovalconspub",
  },
  currencies: [
    {
      coinDenom: "TOLLO",
      coinMinimalDenom: "utollo",
      coinDecimals: 6,
      coinGeckoId: "unknown",
    },
    {
      coinDenom: "TOLLX",
      coinMinimalDenom: "utollx",
      coinDecimals: 6,
      coinGeckoId: "unknown",
    },
    {
      coinDenom: "TUSDO",
      coinMinimalDenom: "utusdo",
      coinDecimals: 6,
      coinGeckoId: "unknown",
    },
    {
      coinDenom: "TWISE",
      coinMinimalDenom: "utwise",
      coinDecimals: 6,
      coinGeckoId: "unknown",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "TOLLO",
      coinMinimalDenom: "utollo",
      coinDecimals: 6,
      coinGeckoId: "unknown",
    },
  ],
  stakeCurrency: {
    coinDenom: "TOLLO",
    coinMinimalDenom: "utollo",
    coinDecimals: 6,
    coinGeckoId: "unknown",
  },

  // "gasPriceStep": {
  //   "low": 0.01,
  //   "average": 0.025,
  //   "high": 0.03
  // },
  features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
};
// export const olloChainInfo: ChainInfoWithExplorer = olloxChainInfo
