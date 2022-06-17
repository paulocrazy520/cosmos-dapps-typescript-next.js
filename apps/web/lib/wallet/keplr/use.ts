import { olloChainInfo, olloKeplrChainInfo } from "../../../config/ollo";
import { Coin } from "@cosmjs/stargate";
export interface ExecuteMultipleMsg {
  contractAddress: string;
  handleMsg: string;
  handleOptions?: HandleOptions;
}

interface Msg {
  contractAddress: string;
  handleMsg: any;
  transferAmount?: readonly Coin[];
}
export const connectKeplrOllo = async () => {
  const { chainId } = olloChainInfo;
  await window.keplr?.enable(chainId);
  const keplr = await window.keplr?.getOfflineSignerAuto(chainId);
  if (!keplr) {
    throw "You have to install Keplr first if you do not use a mnemonic to sign transactions";
  }
  return keplr;
};
export const connectKeplr = async (chainId?: string) => {
  const keplr = await window.keplr?.getOfflineSignerAuto(chainId);
  if (!keplr) {
    throw "You have to install Keplr first if you do not use a mnemonic to sign transactions";
  }
  return keplr;
};
export interface HandleOptions {
  readonly memo?: string;
  /**
   * The funds that are transferred from the sender to the newly created contract.
   * The funds are transferred as part of the message execution after the contract address is
   * created and before the instantiation message is executed by the contract.
   *
   * Only native tokens are supported.
   *
   * TODO: Rename to `funds` for consistency (https://github.com/cosmos/cosmjs/issues/806)
   */
  readonly funds?: readonly Coin[];
}
export async function execute(data: {
  prefix?: string;
  walletAddr: string;
  address: string;
  handleMsg: string;
  handleOptions?: HandleOptions;
  gasAmount: { amount: string; denom: string };
  gasLimits?: { exec: number };
}) {
  try {
    if (await window.keplr) {
      const { chainId } = olloChainInfo;

      await window.keplr!.experimentalSuggestChain(olloKeplrChainInfo);
      const key = await window.keplr?.getKey(chainId);
      if (key.isNanoLedger) return this.executeAmino(data);
      return this.executeDirect(data);
    } else {
      throw "You need to install Keplr to execute the contract";
    }
  } catch (error) {
    console.log("error in executing contract: " + error);
    throw error;
  }
}
export async function executeMultiple(data: {
  prefix?: string;
  walletAddr: string;
  msgs: ExecuteMultipleMsg[];
  gasAmount: { amount: string; denom: string };
  gasLimits?: { exec: number };
}) {
  try {
    if (await window.keplr) {
      const { chainId } = olloChainInfo;
      await window.keplr.experimentalSuggestChain(olloChainInfo);
      const key = await window.keplr.getKey(chainId);
      if (key.isNanoLedger) return this.executeMultipleAmino(data);
      return this.executeMultipleDirect(data);
    } else {
      throw "You need to install Keplr to execute the contract";
    }
  } catch (error) {
    console.log("error in executing contract: " + error);
    throw error;
  }
}
