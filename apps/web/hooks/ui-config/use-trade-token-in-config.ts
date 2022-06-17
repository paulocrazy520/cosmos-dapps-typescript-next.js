import { useEffect, useState } from "react";
import {
  ChainGetter,
  QueriesStore,
  CosmosQueries,
  CosmwasmQueries,
} from "@keplr-wallet/stores";
import { Pool } from "@ollo/pools";
import { OlloQueries, ObservableTradeTokenInConfig } from "@ollo/stores";

/** Maintains a single instance of `ObservableTradeTokenInConfig` for React view lifecycle.
 *  Updates `olloChainId`, `bech32Address`, `pools` on render.
 *  `percentage` default: `"50"`.
 * `requeryIntervalMs` specifies how often to refetch pool data based on current tokens.
 */
export function useTradeTokenInConfig(
  chainGetter: ChainGetter,
  olloChainId: string,
  bech32Address: string,
  queriesStore: QueriesStore<[CosmosQueries, CosmwasmQueries, OlloQueries]>,
  pools: Pool[],
  requeryIntervalMs = 8000
) {
  const queriesOllo = queriesStore.get(olloChainId).ollo!;

  const [config] = useState(
    () =>
      new ObservableTradeTokenInConfig(
        chainGetter,
        queriesStore,
        olloChainId,
        bech32Address,
        undefined,
        pools
      )
  );

  // refresh relevant pool data every `requeryIntervalMs` period
  useEffect(() => {
    const interval = setInterval(() => {
      const poolIds = config.optimizedRoutePaths
        .map((route) => route.pools.map((pool) => pool.id))
        .flat();

      poolIds.forEach((poolId) => {
        queriesStore
          .get(olloChainId)
          .ollo!.queryGammPools.getPool(poolId)
          ?.fetch();
      });
    }, requeryIntervalMs);
    return () => clearInterval(interval);
  }, [
    config.optimizedRoutePaths,
    olloChainId,
    queriesStore,
    requeryIntervalMs,
  ]);

  useEffect(() => {
    config.setIncentivizedPoolIds(
      queriesOllo.queryIncentivizedPools.incentivizedPools
    );
  }, [queriesOllo.queryIncentivizedPools.response]);

  config.setChain(olloChainId);
  config.setSender(bech32Address);
  config.setPools(pools);
  return config;
}
