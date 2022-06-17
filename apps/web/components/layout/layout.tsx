import Header from "./header";
import {
  handleKeplrInit,
  handleWalletConnectInit,
  handleWollotInit,
  WalletModal,
} from "../../hooks/use-keplr/use-connect-wallet-modal-redirect";
import { createStyles, AppShell } from "@mantine/core";
import { FunctionComponent } from "react";
import { useStore } from "../../stores";
import { useConnectWalletModalRedirect } from "@/hooks/use-keplr";
import { useForceUpdate } from "@mantine/hooks";
import { Nav } from ".";
import Head from "next/head";
import { ModalBase, ModalBaseProps } from "../../modals/base";

export const useLayoutStyles = createStyles((theme) => ({
  shell: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.bgs[0] : theme.colors.gray[0],
  },
}));

export const PgHead = (title: string) => (
  <Head>
    <title>{title} • OLLO Station</title>
  </Head>
);

export interface LayoutProps {
  children: React.ReactNode;
  pgTitle?: string;
  subtitle?: string;
}
export const Layout: FunctionComponent<LayoutProps> = ({
  pgTitle,
  children,
  subtitle,
}: LayoutProps) => {
  // const [loadingModal, setLoadingModal] = useState<boolean>(false)
  const { classes, theme } = useLayoutStyles();

  const {
    accountStore,
    chainStore: {
      ollo: { chainId: olloChainId },
    },
  } = useStore();
    
  const {
    handleWalletModal,
    walletModalOpen,
    walletStatus,
    accountActionButton,
  } = useConnectWalletModalRedirect({}, () => { });
  // const wst = useQuery(["ollo-wallet-status"], () => {
  //   return accountStore.getAccount(olloChainId).walletStatus;
  // }, { initialData: status, refetchOnMount: true, refetchIntervalInBackground: true })
  // const { data;useQuery(["ollo-status"], () => { return status})
  //console.log

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      padding={0}
      style={{}}
      navbar={
        <>
          {PgHead(pgTitle ? pgTitle : "OLLO")}
          <Nav
            {...{
              walletModalOpen,
              handleWalletModal,
              accountActionButton,
              walletStatus,
            }}
          />
        </>
      }
      header={
        <Header
          subtitle={subtitle ? subtitle : ""}
          {...{
            walletModalOpen,
            handleWalletModal,
            walletStatus,
            accountActionButton,
          }}
        />
      }
      footer={
        <>
          {/* <WalletModal
            open={walletModalOpen}
            onSelctKeplr={() => handleKeplrInit(handleWalletModal.close)}
            onSelectWalletConnect={handleWalletConnectInit}
            onClose={handleWalletModal.close}
          /> */}
          {/* {m} */}
          {/* <ModalBase isOpen={walletModalOpen} onRequestClose={() => { }} /> */}
        </>
      }
      className={classes.shell}
    >
      {children}
    </AppShell>
  );
};
