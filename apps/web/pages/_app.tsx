import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  useMantineTheme,
  Loader,
  Skeleton,
} from "@mantine/core";
import { TempBanner } from "../components/alert/temp-banner";
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StoreProvider } from "../stores";
import {
  Hydrate,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
  QueryClientProviderProps,
} from "@tanstack/react-query";
import { GetKeplrProvider } from "../hooks";
import { IbcNotifier } from "../stores/ibc-notifier";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ModalsProvider } from "@mantine/modals";
import { violet, theme } from "../config/theme";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import { RouterTransition } from "@/lib/nprogress";
import { dayjsInit } from "@/lib/util/dayjs";
import dynamic from "next/dynamic";
import React from "react";
// import { persistQueryClient, PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
// import { queryClient, persister, dehydratedState, syncStoragePersister } from '@/lib/query';
import { queryClient } from "@/lib/query";
import { olloKeplrChainInfo } from "@/config/ollo";
import { SigningStargateClient } from "@cosmjs/stargate";
import { endpoints } from "../lib";
import { defaultOlloGas } from "@/lib/fn/tx";
import { useRef } from "react";
import "../styles/globals.css"
// import { createUserState, UserProvider, useUser } from '@/stores/user-settings';

// dayjsInit();

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });
  // const addAccs = useUser(u => u.addAccounts)
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  // queryClient.setQueryData(["ollo", "validator", "full", bech32Address, validator], (old: UseOlloValidatorResponse) => useOlloValidator(old.userAddr, old.validator.operator_address))

  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
    if (typeof window !== "undefined") {
      window.onload = async () => {
        if (!window.getOfflineSigner || !window.keplr) {
          showNotification({
            title: "Keplr not installed",
            message: "Install keplr",
          });
        } else if (window.keplr?.experimentalSuggestChain) {
          try {
            await window.keplr?.experimentalSuggestChain(olloKeplrChainInfo);
          } catch {
            showNotification({
              title: "Could not suggest chain",
              message:
                "Could not suggest to keplr " + olloKeplrChainInfo.chainId,
            });
          }
        } else {
          showNotification({
            title: "Outdated Keplr",
            message: "Please use most recent Keplr version",
          });
        }
        await window.keplr?.enable(olloKeplrChainInfo.chainId);
        const offlineSigner = window.getOfflineSigner(
          olloKeplrChainInfo.chainId
        );

        const accts = await offlineSigner.getAccounts();
        // addAccs(accts.map((a) => a.address))
        // showNotification({
        //   title: "Successfully linked to keplr",
        //   message: "?"

        // })
        const cosm = await SigningStargateClient.connectWithSigner(
          endpoints.rpc,
          offlineSigner,
          { prefix: "ollo", gasPrice: defaultOlloGas() }
        );
      };
    }
  }, []);
  if (!showChild) return <Skeleton />;
  // if (typeof window === 'undefined') setShowChild(false)
  // else {
  // }
  return (
     <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} >
      <MantineProvider
        withGlobalStyles
        withCSSVariables
        withNormalizeCSS
        theme={theme(colorScheme)}
      >
        <GetKeplrProvider>
          <QueryClientProvider client={queryClient}>
            <StoreProvider>
              <RouterTransition />
                <ModalsProvider>
                  <NotificationsProvider>
                    <Component {...pageProps} />
                  </NotificationsProvider>
                </ModalsProvider>
              <ReactQueryDevtools />
            </StoreProvider>
          </QueryClientProvider>
        </GetKeplrProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
// <MainLayout menus={menus}>
// <IbcNotifier />
//
// <Head>
//   {/* metamask Ollo app icon */}
//   <link
//     rel="shortcut icon"
//     href={`${typeof window !== "undefined" ? window.origin : ""
//       }/tokens/TOLLO.png`}
//   />
// </Head>
