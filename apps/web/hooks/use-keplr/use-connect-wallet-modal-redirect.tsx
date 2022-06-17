import Image from "next/image";
import { ModalBase } from "modals/base";
import {
  Button,
  ActionIcon,
  Loader,
  Box,
  Card,
  Title,
  Group,
  Modal,
  Space,
  Paper,
} from "@mantine/core";
// import { Button } from "../../components/buttons";
import { ComponentProps } from "react";
import { AccountStore, WalletStatus } from "@keplr-wallet/stores";
import { useStore } from "../../stores";
import { useKeplr } from "./hook";
import { TbWall, TbWallet, TbWalletOff, TbX } from "react-icons/tb";
import { olloKeplrChainInfo } from "../../config/ollo";
import { showNotification } from "@mantine/notifications";
import { useDisclosure, useForceUpdate, useLocalStorage } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { defaultModal } from "modals";
import { ActionBtn } from "@/cmp/buttons";
import {
  closeModal,
  openModal,
  closeAllModals,
  useModals,
  openConfirmModal,
} from "@mantine/modals";
import { useUpdateAddress } from "@/lib/fn/user/addr";
// import { useUser } from "@/stores/user-settings";
import { useCallback, useState, useEffect } from "react";

/** FOR USE IN MODALS
 *
 *  If your modal contains a user action that is only possible with a connected wallet on the ollo account.
 *  This hook allows your modal to temporarily redirect to the `keplr-connection-selection` modal.
 *  If the user connects Keplr, your modal will appear after. If the user closes the connection
 *  selection modal, your modal will no longer appear, even if they connect Keplr later.
 *
 * @param actionButtonProps Props for the user action `<Button />` that may be replaced with a "Connect Wallet" button which adopts these styles.
 * @param onRequestClose Required callback to request this modal to be popped from `react-modal`. Use to set modal state to `null`/`false`.
 * @returns
 *   * `showModalBase` - Flag for whether the calling component should be shown. `ModalBase` will likely take on these props: `<ModalBase {...props} isOpen={props.isOpen && showModalBase} />`
 *   * `accountActionButton` - JSXElement containing the wrapped action `<Button />` with the given button props (styles). May be a "Connect Account" button if Keplr not connected. Accepts children.
 */
// export function useConnectWalletModalRedirect(
//   actionButtonProps: ComponentProps<typeof Button>,
//   onRequestClose: () => void,
//   connectWalletMessage = t("connectWallet")
// ) {
//   const keplr = useKeplr();
// const { accountStore, chainStore } = useStore();
// const { chainId } = chainStore.ollo;
// const olloAccount = accountStore.getAccount(chainId);

//   const [walletInitiallyConnected] = useState(
//     () => olloAccount.walletStatus === WalletStatus.Loaded
//   );
//   const [showSelf, setShowSelf] = useState(true);

//   useEffect(() => {
//     if (
//       !walletInitiallyConnected &&
//       olloAccount.walletStatus === WalletStatus.Loaded
//     ) {
//       setShowSelf(true);
//     }
//   }, [olloAccount.walletStatus]);

//   // prevent ibc-transfer dialog from randomly appearing if they connect wallet later
//   useEffect(() => {
//     if (!showSelf) {
//       // getKeplr resolves to an exception when connection-selection modal is closed
//       keplr.getKeplr().catch(() => {
//         onRequestClose();
//         setShowSelf(true); // reset state to allow modal to be opened later
//       });
//     }
//   }, [showSelf]);

//   return {
//     showModalBase: showSelf,
//     accountActionButton:
//       olloAccount.walletStatus === WalletStatus.Loaded ? (
//         <Button {...actionButtonProps}>{actionButtonProps.children}</Button>
//       ) : (
//         <Button
//           {...actionButtonProps}
//           disabled={false}
//           onClick={() => {
//             olloAccount.init(); // show select connect modal
//             setShowSelf(false);
//           }}
//         >
//           <h6 className="flex items-center gap-3">
//             <Image
//               alt="wallet"
//               src="/icons/wallet.svg"
//               height={24}
//               width={24}
//             />
//             {connectWalletMessage}
//           </h6>
//         </Button>
//       ),
//     walletConnected: olloAccount.walletStatus === WalletStatus.Loaded,
//   };
// }
/** FOR USE IN MODALS
 *
 *  If your modal contains a user action that is only possible with a connected wallet on the Ollo account.
 *  This hook allows your modal to temporarily redirect to the `keplr-connection-selection` modal.
 *  If the user connects Keplr, your modal will appear after. If the user closes the connection
 *  selection modal, your modal will no longer appear, even if they connect Keplr later.
 *
 * @param actionButtonProps Props for the user action `<Button />` that may be replaced with a "Connect Wallet" button which adopts these styles.
 * @param onRequestClose Required callback to request this modal to be popped from `react-modal`. Use to set modal state to `null`/`false`.
 * @returns
 *   * `showModalBase` - Flag for whether the calling component should be shown. `ModalBase` will likely take on these props: `<ModalBase {...props} isOpen={props.isOpen && showModalBase} />`
 *   * `accountActionButton` - JSXElement containing the wrapped action `<Button />` with the given button props (styles). May be a "Connect Account" button if Keplr not connected. Accepts children.
 */
export function useConnectWalletModalRedirect(
  actionButtonProps: ComponentProps<typeof Button>,
  onRequestClose: () => void,
  connectWalletMessage = "connectWallet"
) {
  // const keplr = useKeplr();
  // const { accountStore, chainStore } = useStore();

  // const [showSelf, setShowSelf] = useState(true);

  // useEffect(() => {
  //   if (
  //     !walletInitiallyConnected &&
  //     olloAccount.walletStatus === WalletStatus.Loaded
  //   ) {
  //     setShowSelf(true);
  //   }
  // }, [olloAccount.walletStatus]);

  // // prevent ibc-transfer dialog from randomly appearing if they connect wallet later
  // useEffect(() => {
  //   if (!showSelf) {
  //     // getKeplr resolves to an exception when connection-selection modal is closed
  //     keplr.getKeplr().catch(() => {
  //       onRequestClose();
  //       setShowSelf(true); // reset state to allow modal to be opened later
  //     });
  //   }
  // }, [showSelf]);

  const keplr = useKeplr();
  const forceUpdate = useForceUpdate();
  const { accountStore, chainStore } = useStore();
  const { chainId } = chainStore.ollo;
  const olloAccount = accountStore.getAccount(chainId);

  const [walletInitiallyConnected] = useState(
    () => olloAccount.walletStatus === WalletStatus.Loaded
  );
  const [showSelf, setShowSelf] = useState(walletInitiallyConnected);
  // const addAcct = useUser(state => state.addAccount)
  // const addAccts = useUser(state => state.addAccounts)
  // addAcct(olloAccount.bech32Address)

  useEffect(() => {
    if (
      !walletInitiallyConnected &&
      olloAccount.walletStatus === WalletStatus.Loaded
    ) {
      setShowSelf(true);
    }
  }, [olloAccount.walletStatus]);

  // prevent ibc-transfer dialog from randomly appearing if they connect wallet later
  useEffect(() => {
    if (!showSelf) {
      // getKeplr resolves to an exception when connection-selection modal is closed
      keplr.getKeplr().catch(() => {
        onRequestClose();
        setShowSelf(true); // reset state to allow modal to be opened later
      });
    }
  }, [showSelf]);

  // // const olloAddr =
  // //           accountStore.hasAccount("ollo-testnet-0")
  // //           ?accountStore.getAccount("ollo-testnet-0")
  // //           : ""
  const [walletModalOpen, handleWalletModal] = useDisclosure(false, {
    onOpen: () => { },
    onClose: () => { },
  });
  const { data: wst, error } = useQuery(
    ["ollo-wallet-status"],
    () => {
      return accountStore.getAccount(chainId).walletStatus;
    },
    {
      initialData: olloAccount.walletStatus,
      refetchOnMount: true,
      refetchIntervalInBackground: true,
    }
  );
  const [walletType, setWalletType] = useState<string | null>(null);
  const queryClient = useQueryClient();
  initKeplr();
  // const chgWallet = useMutation((wtype: string) => {
  //   return { walletType: wtype };
  // }, {
  //   onSuccess: data => {
  //     queryClient.setQueryData(['wallet-type', olloAccount.bech32Address], data)
  //   }
  // })
  return {
    walletModalOpen,
    handleWalletModal,
    accountActionButton:
      olloAccount.walletStatus === WalletStatus.Loaded ? (
        <Button
          size="sm"
          style={{
            fontWeight: 400,
          }}
          onClick={() => {
            // olloAccount.init(); // show select connect modal
            // setShowSelf(false);
            keplr.clearLastUsedKeplr();
            olloAccount.disconnect();
            showNotification({
              color: "violet",
              title: "Disconnected. Bye! 👋",
              message:
                "You have successfully been disconnected. See ya next time!",
            });
            setShowSelf(false);
          }}
          variant="default"
          {...actionButtonProps}
        >
          <TbWalletOff />
          &nbsp;
          {olloAccount.walletStatus === WalletStatus.Loaded ? (
            <>{"Disconnect"}</>
          ) : (
            <Loader />
          )}
        </Button>
      ) : olloAccount.walletStatus === WalletStatus.Loading ? (
        <Button variant="default" size="sm" loading></Button>
      ) : (
        <Button
          sx={{
            fontWeight: 400,
          }}
          size="sm"
          variant="default"
              onClick={() => {
            olloAccount.init();
            handleWalletModal.open();
            setShowSelf(false);
            // forceUpdate()
          }}
        >
          <TbWallet />
          &nbsp; Connect
          {/* </h6> */}
        </Button>
      ),
    showModalBase: showSelf,
    walletStatus: olloAccount.walletStatus,
  };
}

async function initKeplr() {
  if (window.keplr) {
    if (window.keplr["experimentalSuggestChain"]) {
      const chainId = olloKeplrChainInfo.chainId;
      await window.keplr.experimentalSuggestChain(olloKeplrChainInfo);
      await window.keplr.enable(chainId);
      // const offlineSigner = window.keplr.getOfflineSigner(olloChainInfo.chainId);
      // const accs = offlineSigner.getAccounts();
    }
  }
}

export function handleWollotInit() {
  showNotification({
    title: "Selected wollot",
    message: "Loading wollot...",
    loading: true,
  });
}
export function handleWalletConnectInit() {
  showNotification({
    title: "Selected WalletConnect",
    message: "Loading WalletConnect QR modal...",
    loading: true,
  });
}
export async function handleKeplrInit(onClose) {
  showNotification({
    title: "Selected Keplr",
    message: "Loading Keplr...",
    loading: true,
  });
  if (typeof window !== "undefined") {
    if (window.keplr) {
      if (window.keplr["experimentalSuggestChain"]) {
        window.keplr?.experimentalSuggestChain(olloKeplrChainInfo);
        window.keplr?.enable(olloKeplrChainInfo.chainId);
        const offlineSigner = window.keplr!.getOfflineSigner(
          olloKeplrChainInfo.chainId
        );
        const keplrAccounts = await offlineSigner.getAccounts();
        const keplrAccount = keplrAccounts[0];
        // useUpdateAddress(keplrAccount.address);
        onClose();
        showNotification({
          title: "Keplr connected",
          message: "Keplr connected as " + keplrAccount.address,
          loading: false,
        });
      }
    } else {
      openModal({
        title: "Keplr not found",
        children: (
          <Paper>
            <Title order={3}>Keplr not found</Title>
          </Paper>
        ),
      });
    }
  }
}
export type WalletType = "keplr" | "cosmostation" | "walletconnect" | "wollot";
export type WalletModalProps = {
  open: boolean;
  onClose: () => void;
  onSelctKeplr: () => void;
  onSelectWalletConnect: () => void;
};
export const WalletModal = ({
  open,
  onClose,
  onSelctKeplr,
  onSelectWalletConnect,
}: WalletModalProps) => {
  const [walletType, setWalletType] = useState<WalletType | undefined>(
    undefined
  );
  return (
    <Modal
      opened={open}
      closeOnClickOutside={true}
      title={
        <Group position="left">
          <ActionBtn
            label="Exit"
            icon={<TbX />}
            onClick={() => {
              onClose();
            }}
          />
          <Title size={28}>Connect Wallet</Title>
        </Group>
      }
      closeButtonLabel="Close"
      withCloseButton={true}
      withFocusReturn={true}
      centered
      radius="sm"
      size={"xl"}
      padding="md"
      shadow="lg"
      trapFocus
      overlayOpacity={0.5}
      closeOnEscape
      overlayBlur={3}
      transition="fade"
      onClose={onClose}
    >
      <Box>
        <Card radius="sm" shadow="lg" withBorder onClick={onSelctKeplr}>
          <Card.Section withBorder p="md">
            <Title size={18}>Keplr</Title>
          </Card.Section>
          <Card.Section p="md"></Card.Section>
        </Card>
        <Space h={10}></Space>
        <Card
          radius="sm"
          shadow="lg"
          withBorder
          onClick={onSelectWalletConnect}
        >
          <Card.Section withBorder p="md">
            <Title size={18}>WalletConnect</Title>
          </Card.Section>
          <Card.Section p="md"></Card.Section>
        </Card>
        <Space h={10}></Space>
      </Box>
    </Modal>
  );
};
