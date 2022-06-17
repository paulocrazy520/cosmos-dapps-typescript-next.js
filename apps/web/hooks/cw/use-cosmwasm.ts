import { useQuery } from "react-query";
import { ChainInfo } from "@keplr-wallet/types";

import { queryClient } from "../../lib/query/client";

const chainInfoQueryKey = "@chain-info";

export const unsafelyReadChainInfoCache = () =>
  queryClient.getQueryCache().find(chainInfoQueryKey)?.state?.data as
    | ChainInfo
    | undefined;

export const useChainInfo = () => {
  const { data, isLoading } = useQuery<ChainInfo>(
    chainInfoQueryKey,
    async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_CHAIN_INFO_URL);
      return await response.json();
    },
    {
      onError(e) {
        console.error("Error loading chain info:", e);
      },
    }
  );

  return [data, isLoading] as const;
};

// import { cosmWasmClientRouter } from '../util/cosmWasmClientRouter'

// export const useCosmWasmClient = () => {
// //   const [chainInfo] = useChainInfo()

//   const { data } = useQuery(
//     '@cosmwasm-client',
//     () => cosmWasmClientRouter.connect(chainInfo.rpc),
//     { enabled: Boolean(chainInfo?.rpc) }
//   )

//   return data
// }
