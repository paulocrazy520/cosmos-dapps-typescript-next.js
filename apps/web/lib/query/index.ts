import { showNotification } from "@mantine/notifications";
// import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import {
  dehydrate,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientConfig,
} from "@tanstack/react-query";
// import { persistQueryClient } from '@tanstack/react-query-persist-client';
import axios from "axios";

export * from "./handler";

export const defaultQueryFn = async (queryKey: Array<any>) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com${queryKey[0]}`
  );
  return data;
};
// export const syncStoragePersister = createSyncStoragePersister({
// storage: (typeof window !== "undefined") && window.localStorage
// })
export const queryClientOptions: QueryClientConfig = {
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log(`[ERR] Error ${error}`);
      if (query.state.data !== undefined) {
        console.log(`[ERR] Error ${error} with query ${query}`);
        // showNotification({
        //   title: "Something went wrong",
        //   message: `Something went wrong: ${error}`
        // })
      }
    },
  }),
  mutationCache: new MutationCache({}),
  defaultOptions: {
    mutations: {},
    queries: {
      onError: (err) => {
        console.log(`[ERR] Error ${err}`);
        // showNotification({
        //   title: "Something went wrong",
        //   message: `Something went wrong: ${err}`
        // })
      },
      // refetchIntervalInBackground: true,
      // refetchInterval: 5 * 1000,
      // cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      // retryDelay: 1 * 1000,
      // // useErrorBoundary: false,
      // // suspense: true,
      // // retry: 0,
      // retryOnMount: true,
      // refetchOnReconnect: true,
      // refetchOnMount: true,
      // enabled: true,
      // refetchOnWindowFocus: true,
      // staleTime: 1000 * 20,
    },
  },
};
export const queryClient = new QueryClient(queryClientOptions);

export const dehydratedState = dehydrate(queryClient, {
  dehydrateQueries: true,
});

// export const persister = persistQueryClient({
// queryClient,
// maxAge: Infinity,
// persister: syncStoragePersister
// })

// import * from './bank'
