import { ChainStore } from "@keplr-wallet/stores";
import { ChainInfos, olloChainInfo } from "../../config";
import { olloKeplrChainInfo } from "../../config/ollo";
import { withEthInWindow } from "../../integrations/ethereum/metamask-utils";

async function initKeplr() {
  if (window.keplr) {
    if (window.keplr["experimentalSuggestChain"]) {
      await window.keplr.experimentalSuggestChain(olloKeplrChainInfo);
      await window.keplr.enable(olloChainInfo.chainId);
      const offlineSigner = window.keplr.getOfflineSigner(
        olloChainInfo.chainId
      );
      const accs = offlineSigner.getAccounts();
    }
  }
}
