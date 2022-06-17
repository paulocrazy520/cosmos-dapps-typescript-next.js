export * from "./balance";
import { Coin } from "@cosmjs/stargate";
import { getOlloApiBalance, getOlloClientBalance } from "./balance";

export { zeroAmt } from "@/lib/util";

export const getBalance = getOlloApiBalance;
export const getSgBalance = getOlloClientBalance;
