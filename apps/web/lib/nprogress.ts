import { violet } from "@/config/theme";
import { useMantineTheme } from "@mantine/core";
import {
  NavigationProgress,
  completeNavigationProgress,
  startNavigationProgress,
} from "@mantine/nprogress";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function RouterTransition() {
  const { events, asPath } = useRouter();
  const theme = useMantineTheme();

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== asPath && startNavigationProgress();
    const handleComplete = () => completeNavigationProgress();

    events.on("routeChangeStart", handleStart);
    events.on("routeChangeComplete", handleComplete);
    events.on("routeChangeError", handleComplete);

    return () => {
      events.off("routeChangeStart", handleStart);
      events.off("routeChangeComplete", handleComplete);
      events.off("routeChangeError", handleComplete);
    };
  }, [asPath, events]);

  return NavigationProgress({
    color: violet(theme),
    autoReset: true,
  });
}
