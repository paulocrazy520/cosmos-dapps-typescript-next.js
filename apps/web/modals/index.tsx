import { createStyles, Loader, MantineTheme } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useModalsEvents } from "@mantine/modals/lib/events";

export * from "./base";
export * from "./bridge-transfer";
export * from "./connect-non-ibc-wallet";
export * from "./ibc-transfer";
export * from "./keplr-connection-selection";
export * from "./lock-tokens";
export * from "./manage-liquidity";
export * from "./superfluid-validator";
export * from "./menu-options";
export * from "./pre-transfer";
export * from "./token-select";
export * from "./trade-tokens";
export * from "./transfer-asset-select";
export * from "./wallet-connect";
import { openModal } from "@mantine/modals";

export const useDefaultModalStyles = createStyles((theme: MantineTheme) => ({
  modal: {},
}));

export declare interface DefaultModalProps {
  title: string | React.ReactNode;
  onClose?: () => void;
  onWaiting?: () => void;
  onLoadStart?: () => void;
  children: React.ReactNode;
  style?: any;
  color?: string;
}
export const defaultModal = ({
  title,
  children,
  onClose,
  onLoadStart,
  onWaiting,
  style,
  color,
}: DefaultModalProps) => {
  openModal({
    title: title,
    onLoadStart: onLoadStart ? onLoadStart : () => {},
    onClose: onClose ? onClose : () => {},
    overlayBlur: 20,
    lockScroll: true,
    padding: "md",
    radius: "sm",
    size: "xl",
    trapFocus: true,
    withCloseButton: true,
    withFocusReturn: true,
    overflow: "inside",
    onWaiting: onWaiting ? onWaiting : () => {},
    style: style ? style : {},
    placeholder: "Loading...",
    overlayOpacity: 0.5,
    shadow: "xl",
    closeOnEscape: true,
    closeOnClickOutside: true,
    closeButtonLabel: "Close",
    color: color ? color : "violet",
    centered: true,
    children: children,
  });
};
