import dynamic from "next/dynamic";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { ModalBase, ModalBaseProps } from "./base";
import QRCode from "qrcode.react";
import { useWindowSize } from "../hooks";
import {
  isMobile as isMobileWC,
  isAndroid,
  saveMobileLinkInfo,
} from "@walletconnect/browser-utils";
import { Btn } from "../components/buttons";

export const WalletConnectQRModal: FunctionComponent<
  ModalBaseProps & {
    uri: string;
  }
> = ({ isOpen, onRequestClose, uri }) => {
  // Below is used for styling for mobile device.
  // Check the size of window.
  const { isMobile } = useWindowSize();
  console.log("???????????URI", uri)
  // Below is used for real mobile environment.
  // Check the user agent.
  const [checkMobile] = useState(() => isMobileWC());
  const [checkAndroid] = useState(() => isAndroid());

  const navigateToAppURL = useMemo(() => {
    if (!uri) {
      return;
    }

    if (checkMobile) {
      if (checkAndroid) {
        // Save the mobile link.
        saveMobileLinkInfo({
          name: "Keplr",
          href: "intent://wcV1#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;",
        });

        return `intent://wcV1?${uri}#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;`;
      } else {
        // Save the mobile link.
        saveMobileLinkInfo({
          name: "Keplr",
          href: "keplrwallet://wcV1",
        });

        return `keplrwallet://wcV1?${uri}`;
      }
    }
  }, [checkAndroid, checkMobile, uri]);

  useEffect(() => {
    // Try opening the app without interaction.
    if (navigateToAppURL) {
      window.location.href = navigateToAppURL;
    }
  }, [navigateToAppURL]);

  return (
    <ModalBase
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title={
        checkMobile ? (
          <h4 className="qr_caption">Open App</h4>
        ) : (
          <h3 className="qr_caption">Scan QR Code</h3>
        )
      }
      className="qr_container"
    >
      {uri ? (
        !checkMobile ? (
          (() => {
            const QRCode = dynamic(() => import("qrcode.react"));

            return (
              <div className="bg-white-high p-3.5 md:w-80 md:mx-auto qr_draw">
                <QRCode size={isMobile ? 290 : 350} value={uri} />
              </div>
            );
          })()
        ) : (
          <Btn
            onClick={() => {
              if (navigateToAppURL) {
                window.location.href = navigateToAppURL;
              }
            }}
          >
            Open App
          </Btn>
        )
      ) : undefined}
    </ModalBase>
  );
};
