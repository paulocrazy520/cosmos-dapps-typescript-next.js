import { Keplr, Window } from "@keplr-wallet/types";

import { getKeplrFromWindow } from "@keplr-wallet/stores";

export const getKeplrFromExt = async (): Promise<Keplr | undefined> => {
  if (typeof window === "undefined") return;
  const keplr = (window as Window).keplr;
  if (keplr) return keplr;

  if (document.readyState === "complete")
    throw new Error("keplr client does not exist on window");

  return new Promise((resolve, reject) => {
    const docStateChange = (e: Event) => {
      if (e.target && (e.target as Document).readyState === "complete") {
        if (keplr) resolve(keplr);
        else reject(Error("keplr client does not exist on window"));
        document.removeEventListener("readystatechange", docStateChange);
      }
    };
    document.addEventListener("readystatechange", docStateChange);
  });
};
export const getSargateSigner = async () => {
  const keplr = getKeplrFromWindow();
};
