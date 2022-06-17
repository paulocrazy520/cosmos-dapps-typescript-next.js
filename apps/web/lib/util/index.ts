import { Coin } from "@cosmjs/stargate";

export const zeroAmt: Coin = { amount: "0", denom: "utollo" };

export function amt(coin: Coin): number {
  return parseInt(coin.amount);
}
export function trimAddr(
  a: string,
  startLen?: number,
  endLen?: number
): string {
  const sl = startLen ? startLen : 7;
  const el = endLen ? endLen : 4;
  return a.substring(0, sl) + "..." + a.substring(a.length - el, a.length);
}
export const exp6 = (amt: string): number => {
  return parseInt((parseInt(amt) / 1000000).toFixed(0));
};
export function npct(a: number, b: number, fixed?: number): number {
  const r = (a / b) * 100;
  if (fixed ** fixed == 0) return parseInt(r.toFixed(0));
  else if (fixed) return parseFloat(r.toFixed(fixed));
  else return r;
}
export function spct(a: string, b: string, fixed?: number): number {
  return npct(parseInt(a), parseInt(b), fixed);
}

export function pctN(a: number, fixed?: number): string {
  const r = a * 100;
  return fixed ? r.toFixed(fixed) : r.toString();
}

export function addS(a: string, b: string, fixed?: number): number {
  const res = parseInt(a) + parseInt(b);
  return fixed ? parseInt(res.toFixed(fixed)) : res;
}
export function divS(a: string, b: string, fixed?: number): number {
  const res = parseInt(a) / parseInt(b);
  return fixed ? parseInt(res.toFixed(fixed)) : res;
}
export function mulS(a: string, b: string, fixed?: number): number {
  const res = parseInt(a) * parseInt(b);
  return fixed ? parseInt(res.toFixed(fixed)) : res;
}
export function subS(a: string, b: string, fixed?: number): number {
  const res = parseInt(a) - parseInt(b);
  return fixed ? parseInt(res.toFixed(fixed)) : res;
}
