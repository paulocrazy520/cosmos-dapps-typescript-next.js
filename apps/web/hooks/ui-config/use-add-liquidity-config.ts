import { useState, useCallback } from "react";
import {
  ChainGetter,
  QueriesStore,
  CosmosQueries,
  CosmwasmQueries,
} from "@keplr-wallet/stores";
import { OlloQueries, ObservableAddLiquidityConfig } from "@ollo/stores";
import { useStore } from "../../stores";

/** Maintains a single instance of `ObservableAddLiquidityConfig` for React view lifecycle.
 *  Updates `olloChainId`, `poolId`, `bech32Address`, and `queryOllo.queryGammPoolShare` on render.
 */
export function useAddLiquidityConfig(
  chainGetter: ChainGetter,
  olloChainId: string,
  poolId: string,
  queriesStore: QueriesStore<[CosmosQueries, CosmwasmQueries, OlloQueries]>
): {
  config: ObservableAddLiquidityConfig;
  addLiquidity: () => Promise<void>;
} {
  const { accountStore } = useStore();

  const account = accountStore.getAccount(olloChainId);
  const { bech32Address } = account;

  const queryOllo = queriesStore.get(olloChainId).ollo!;
  const [config] = useState(
    () =>
      new ObservableAddLiquidityConfig(
        chainGetter,
        olloChainId,
        poolId,
        bech32Address,
        queriesStore,
        queryOllo.queryGammPoolShare,
        queryOllo.queryGammPools,
        queriesStore.get(olloChainId).queryBalances
      )
  );
  config.setChain(olloChainId);
  config.setSender(bech32Address);
  config.setPoolId(poolId);
  config.setQueryPoolShare(queryOllo.queryGammPoolShare);

  const addLiquidity = useCallback(async () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        if (config.isSingleAmountIn && config.singleAmountInConfig) {
          await account.ollo.sendJoinSwapExternAmountInMsg(
            config.poolId,
            {
              currency: config.singleAmountInConfig.sendCurrency,
              amount: config.singleAmountInConfig.amount,
            },
            undefined,
            undefined,
            resolve
          );
        } else if (config.shareOutAmount) {
          await account.ollo.sendJoinPoolMsg(
            config.poolId,
            config.shareOutAmount.toDec().toString(),
            undefined,
            undefined,
            resolve
          );
        }
      } catch (e: any) {
        console.error(e);
        reject(e.message);
      }
    });
  }, [
    account.ollo,
    config.isSingleAmountIn,
    config.singleAmountInConfig,
    config.sender,
    config.poolId,
    config.singleAmountInConfig?.sendCurrency,
    config.singleAmountInConfig?.amount,
    config.shareOutAmount,
  ]);

  return { config, addLiquidity };
}
