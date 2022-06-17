import { useState } from "react";
import {
  CreatePoolConfigOpts,
  ObservableCreatePoolConfig,
  OlloQueries,
} from "@ollo/stores";
import {
  ChainGetter,
  CosmosQueries,
  CosmwasmQueries,
  QueriesStore,
} from "@keplr-wallet/stores";
import { IFeeConfig } from "@keplr-wallet/hooks";

/** Maintains a single instance of `ObservableCreatePoolConfig` for React view lifecycle.
 *  Updates `chainId`, `bech32Address`, and `feeConfig` on render.
 */
export function useCreatePoolConfig(
  chainGetter: ChainGetter,
  chainId: string,
  bech32Address: string,
  queriesStore: QueriesStore<[CosmosQueries, CosmwasmQueries, OlloQueries]>,
  feeConfig?: IFeeConfig,
  opts?: CreatePoolConfigOpts
) {
  const [config] = useState(
    () =>
      new ObservableCreatePoolConfig(
        chainGetter,
        chainId,
        bech32Address,
        queriesStore,
        queriesStore.get(chainId).queryBalances,
        feeConfig,
        opts
      )
  );
  config.setChain(chainId);
  config.setSender(bech32Address);
  config.setFeeConfig(feeConfig);
  return config;
}
