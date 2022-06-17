import { NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";
export const fch = fetch;
export const fchr = (url: string, ...props) =>
  fetch(url, ...props)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });

export const apiFetch = (path: string) =>
  fch(apiUrl(path))
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });

export const rpcFetch = (path: string) =>
  fch(rpcUrl(path))
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });

export class Endp {
  protected readonly _api: string = process.env.OLLO_LCD + "/";
  protected readonly _rpc: string = process.env.OLLO_RPC + "/";

  public api(r: string): string {
    return this._api + r;
  }
  public rpc(r: string): string {
    return this._rpc + r;
  }

  public async rpcGet<T = any>(route: string, opts?: any): Promise<T> {
    return await fch(
      this.rpc(route),
      opts
        ? opts
        : {
            method: "GET",
          }
    )
      .then((r) => r.json())
      .catch((e) => {
        console.error(e);
        return { error: e.message, message: "Couldn't fetch API" };
      });
  }
  public async apiGet<T = any>(route: string, opts?: any): Promise<T> {
    return await fch(
      this.api(route),
      opts
        ? opts
        : {
            method: "GET",
          }
    )
      .then((r) => r.json())
      .catch((e) => {
        console.error(e);
        return { error: e.message, message: "Couldn't fetch RPC" };
      });
  }
}
export const endpoints = {
  rpc: "https://rpc.ollo.zone",
  api: "https://lcd.ollo.zone",
};
export const apiUrl = (route: string) => process.env.OLLO_API + "/" + route;

export const rpcUrl = (route: string) => process.env.OLLO_RPC + "/" + route;

export function getCookies(req: Request) {
  const cookie = req.headers.get("cookie");
  const cookies = new Map();
  if (!cookie) {
    return cookies;
  }
  const pairs = cookie.split(/;\s+/);
  for (const pair of pairs) {
    const parts = pair.trim().split("=");
    cookies.set(parts[0], parts[1]);
  }
  return cookies;
}
export const config = {
  runtime: "experimental-edge",
};
export interface ApiRootProps {
  address: string;
  reqRoute: string;
  props: JSON;
}

export enum Endpoint {
  REST,
  GRPC,
  LCD,
}
export async function apiGet(route: string) {
  return await fetch(apiUrl(route))
    .then((r) => r.json())
    .catch((e) => {
      console.error(e);
      return { error: e.message, message: "Couldn't fetch RPC" };
    });
}
export async function rpcGet(route: string) {
  return await fetch(rpcUrl(route))
    .then((r) => r.json())
    .catch((e) => {
      console.error(e);
      return { error: e.message, message: "Couldn't fetch RPC" };
    });
}

export const jsonApi = async (rt: string, res: NextApiResponse) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  const r = await apiGet(rt);
  return res.status(200).json(r);
};
export const jsonRpc = async (rt: string, res: NextApiResponse) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  const r = await rpcGet(rt);
  return res.status(200).json(r);
};
export const cosmos = (r: string, m: string) => "cosmos/" + m + "/v1beta1/" + r;

export const getCosmos = async <T>(r: string, m: string): Promise<T> => {
  return await apiGet(cosmos(r, m));
};
export const getOllo = async <T>(mod: string, r: string): Promise<T> => {
  return await apiGet("ollo/" + mod + "/" + r);
};
export const ollo = (r: string, m: string) => "ollo/" + m + "/" + r;
