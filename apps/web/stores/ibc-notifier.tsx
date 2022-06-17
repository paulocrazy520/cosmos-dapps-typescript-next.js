import { FunctionComponent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { CoinPretty, Dec } from "@keplr-wallet/unit";
import { ChainIdHelper } from "@keplr-wallet/cosmos";
import { useStore } from ".";
import { showNotification } from "@mantine/notifications";

/**
 * IBCHistoryNotifier hook tracks the changes of the IBC Transfer history on the IBCTransferHistoryStore.
 * And, if the changes are detected, this will notify the success or failure to the users, and update the balances.
 * XXX: `IBCHistoryNotifier` doesn't render anything.
 */
export const IbcNotifier: FunctionComponent = observer(() => {
  const { chainStore, queriesStore, ibcTransferHistoryStore, accountStore } =
    useStore();
  const { chainId } = chainStore.ollo;
  const [historyHandlerAdded, setHistoryHandlerAdded] = useState(false);

  useEffect(() => {
    if (!historyHandlerAdded) {
      ibcTransferHistoryStore.addHistoryChangedHandler((history) => {
        if (chainStore.hasChain(history.destChainId)) {
          const transferAmount = new CoinPretty(
            history.amount.currency,
            new Dec(history.amount.amount)
          ).moveDecimalPointRight(history.amount.currency.coinDecimals);
          const isWithdraw =
            ChainIdHelper.parse(chainId).identifier !==
            ChainIdHelper.parse(history.destChainId).identifier;

          if (history.status === "complete") {
            showNotification({
              title: "IBC Transfer Complete",
              message: isWithdraw
                ? `${transferAmount
                    .maxDecimals(6)
                    .trim(true)
                    .shrink(true)} has been successfully withdrawn`
                : `${transferAmount
                    .maxDecimals(6)
                    .trim(true)
                    .shrink(true)} has been successfully deposited`,
              color: "green",
            });
          } else if (history.status === "timeout") {
            showNotification({
              title: "IBC Transfer Timeout",
              message: isWithdraw
                ? `${transferAmount
                    .maxDecimals(6)
                    .trim(true)
                    .shrink(true)} has failed to withdraw`
                : `${transferAmount
                    .maxDecimals(6)
                    .trim(true)
                    .shrink(true)} has failed to deposit`,
              color: "red",
            });
          } else if (history.status === "refunded") {
            showNotification({
              color: "green",
              title: "IBC Transfer Refunded",
              message: `${transferAmount
                .maxDecimals(6)
                .trim(true)
                .shrink(true)} has been successfully refunded`,
            });
          }

          const account = accountStore.getAccount(chainId);
          if (
            history.sender === account.bech32Address ||
            history.recipient === account.bech32Address
          ) {
            if (history.status === "complete") {
              queriesStore
                .get(history.destChainId)
                .queryBalances.getQueryBech32Address(history.recipient)
                .fetch();
            } else if (history.status === "refunded") {
              queriesStore
                .get(history.sourceChainId)
                .queryBalances.getQueryBech32Address(history.recipient)
                .fetch();
            }
          }
        }
      });
      setHistoryHandlerAdded(true);
    }
  }, [
    ibcTransferHistoryStore,
    chainId,
    queriesStore,
    accountStore,
    chainStore,
    historyHandlerAdded,
    setHistoryHandlerAdded,
  ]);

  return null;
});
