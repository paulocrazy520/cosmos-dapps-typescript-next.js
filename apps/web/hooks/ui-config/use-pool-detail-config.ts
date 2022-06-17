import { useEffect, useState } from "react";
import { ObservableQueryPoolDetails } from "@ollo/stores";
import { useStore } from "../../stores";

export function usePoolDetailConfig(poolId?: string) {
  const { chainStore, accountStore, queriesStore, priceStore } = useStore();

  const { chainId } = chainStore.ollo;
  const queryOllo = queriesStore.get(chainId).ollo!;
  const account = accountStore.getAccount(chainId);
  const { bech32Address } = account;
  const fiat = priceStore.getFiatCurrency(priceStore.defaultVsCurrency)!;

  const pool = poolId ? queryOllo.queryGammPools.getPool(poolId) : undefined;

  const [poolDetailConfig, setPoolDetailConfig] =
    useState<ObservableQueryPoolDetails | null>(null);
  useEffect(() => {
    if (!poolDetailConfig && pool && fiat) {
      // setPoolDetailConfig(
      // new ObservableQueryPoolDetails(fiat, pool, queryOllo, priceStore)
      // );
    }
  }, [pool, poolDetailConfig, fiat, queryOllo, priceStore]);

  // useEffect(
  // () => poolDetailConfig?.setBech32Address(bech32Address),
  // [poolDetailConfig, bech32Address]
  // );
  //
  return { poolDetailConfig: poolDetailConfig ?? undefined, pool };
}
