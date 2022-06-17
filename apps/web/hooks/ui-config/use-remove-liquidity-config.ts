import { useState, useCallback } from "react";
import {
  ChainGetter,
  QueriesStore,
  CosmosQueries,
  CosmwasmQueries,
} from "@keplr-wallet/stores";
import { OlloQueries, ObservableRemoveLiquidityConfig } from "@ollo/stores";
import { useStore } from "../../stores";

/** Maintains a single instance of `ObservableRemoveLiquidityConfig` for React view lifecycle.
 *  Updates `olloChainId`, `poolId`, `bech32Address`, and `queryOllo.queryGammPoolShare` on render.
 *  `percentage` default: `"50"`.
 */
export function useRemoveLiquidityConfig(
  chainGetter: ChainGetter,
  olloChainId: string,
  poolId: string,
  queriesStore: QueriesStore<[CosmosQueries, CosmwasmQueries, OlloQueries]>,
  initialPercent = "50"
): {
  config: ObservableRemoveLiquidityConfig;
  removeLiquidity: () => Promise<void>;
} {
  const { accountStore } = useStore();

  const account = accountStore.getAccount(olloChainId);
  const { bech32Address } = account;

  const queryOllo = queriesStore.get(olloChainId).ollo!;
  const [config] = useState(() => {
    const c = new ObservableRemoveLiquidityConfig(
      chainGetter,
      olloChainId,
      poolId,
      bech32Address,
      queriesStore,
      queryOllo.queryGammPoolShare,
      queryOllo.queryGammPools,
      initialPercent
    );
    c.setPercentage(initialPercent);
    return c;
  });
  config.setChain(olloChainId);
  config.setSender(bech32Address);
  config.setPoolId(poolId);
  config.setQueryPoolShare(queryOllo.queryGammPoolShare);

  const removeLiquidity = useCallback(() => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await account.ollo.sendExitPoolMsg(
          config.poolId,
          config.poolShareWithPercentage.toDec().toString(),
          undefined,
          undefined,
          resolve
        );
      } catch (e) {
        console.error(e);
        reject();
      }
    });
  }, []);

  return { config, removeLiquidity };
}
