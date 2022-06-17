import { Links } from "./links";
import UserButton from "../../cards/user";
import {
  Divider,
  ScrollArea,
  Navbar,
  Tooltip,
  Button,
  Group,
  ActionIcon,
  createStyles,
  Text,
  Loader,
  UnstyledButton,
  Center,
  Alert,
} from "@mantine/core";
import { useRouter } from "next/router";
import { TbPlus, TbChevronRight, TbMinus, TbSettings } from "react-icons/tb";
import { useKeplr } from "../../../hooks";
// import { useWallet } from "../../../../.misc/wallet/hook";
import { openConfirmModal } from "@mantine/modals";
import { useState } from "react";
import { useStore } from "../../../stores";
import { WalletStatus } from "@keplr-wallet/stores";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const useNavStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },
  assets: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[1],
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },

  collectionLink: {
    display: "block",
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

export const Nav = ({
  walletModalOpen,
  handleWalletModal,
  walletStatus,
  accountActionButton,
}: any) => {
  const { classes, theme } = useNavStyles();
  const { push } = useRouter();
  const {
    chainStore: {
      ollo: { chainId },
    },
    accountStore,
    queriesStore,
    priceStore,
  } = useStore();
  const queries = queriesStore.get(chainId);
  const {
    getKeplr,
    clearLastUsedKeplr,
    connectionType,
    setDefaultConnectionType,
  } = useKeplr();
  const [loadingModal, setLoadingModal] = useState<boolean>(false);
  const { name, bech32Address } = accountStore.getAccount(chainId);
  const fiat = priceStore.getFiatCurrency(priceStore.defaultVsCurrency)!;
  const collections = [
    { img: "/tokens/ollo.png", label: "OLLO", amount: 30 },
    { img: "/tokens/osmo.svg", label: "OSMO", amount: 12 },
    { img: "/tokens/atom.svg", label: "ATOM", amount: 13.9 },
    { img: "/tokens/juno.svg", label: "JUNO", amount: 3.8 },
    { img: "/tokens/evmos.svg", label: "EVMO", amount: 0.8 },
  ];
  const [wState, setWState] = useState<WalletStatus>(WalletStatus.NotInit);
  useEffect(() => {
    setWState(walletStatus);
  });
  const wst = useQuery(
    ["ollo-wallet-status"],
    () => {
      return accountStore.getAccount(chainId).walletStatus;
    },
    { initialData: wState }
  );
  const collectionLinks = collections.map((collection, i) => (
    <UnstyledButton
      key={collection.label}
      onClick={() => {
        push("/");
      }}
      className={classes.collectionLink}
    >
      <Group key={i}>
        {/* <span style={{ marginRight: 9, fontSize: 16 }}>{collection.emoji}</span> {collection.label} */}
        {collection.label}
        <span style={{ justifySelf: "end", color: "dimgray" }}>
          {collection.amount}
        </span>
      </Group>
    </UnstyledButton>
  ));
  return (
    <Navbar
      fixed={false}
      hiddenBreakpoint={"sm"}
      position={{ top: 0, left: 0 }}
      width={{
        sm: 175,
        lg: 225,
        md: 200,
        base: 200,
      }}
      classNames={classes.navbar}
      withBorder
    >
      <Navbar.Section px="xs" className={classes.mainLinks}>
        <br />
        <Links />
        <br />
      </Navbar.Section>
      <Divider />
      <Navbar.Section
        grow
        component={ScrollArea}
        px="xs"
        className={classes.assets}
      >
        <br />
        <Group className={classes.collectionsHeader} position="apart">
          <Tooltip label="Show all your assets at a glance">
            <Text
              size="sm"
              weight={600}
              color="dimmed"
              onClick={() => {
                push("/assets");
              }}
            >
              Your Assets
            </Text>
          </Tooltip>
          <Group position="right" spacing="xs">
            <Tooltip
              label="Add asset"
              transition={"slide-up"}
              withArrow
              position="top"
            >
              <ActionIcon
                variant="default"
                size={20}
                onClick={() =>
                  openConfirmModal({
                    title: "Add asset",
                  })
                }
              >
                <TbPlus size={18} />
              </ActionIcon>
            </Tooltip>
            {/* <Tooltip label="Remove asset" transition={"slide-up"} withArrow position="top"> */}
            {/* <ActionIcon variant="default" size={20} onClick={() => openConfirmModal({ */}
            {/*   title: "Remove asset", */}
            {/* })}> */}
            {/*   <TbMinus size={18} /> */}
            {/* </ActionIcon> */}
            {/* </Tooltip> */}
            <Tooltip
              label="Manage quickview"
              withArrow
              transition="slide-up"
              position="top"
            >
              <ActionIcon
                variant="default"
                size={20}
                onClick={() =>
                  openConfirmModal({
                    title: "Manage quickview",
                  })
                }
              >
                <TbSettings size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
        <div className={classes.collections}>{collectionLinks}</div>
      </Navbar.Section>
      <Navbar.Section style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        {walletStatus === WalletStatus.Loaded ? (
          <UserButton
            addr={
              bech32Address.toString().slice(0, 7) +
              "..." +
              bech32Address.toString().slice(-7)
            }
            image=""
            name={name.toString()}
            icon={<TbChevronRight size={18} />}
          />
        ) : walletStatus === WalletStatus.Loading ? (
          <Loader />
        ) : walletStatus === WalletStatus.Rejected ? (
          <Alert>Rejected</Alert>
        ) : walletStatus === WalletStatus.NotExist ? (
          <Button>
            <TbMinus />
            &nbsp;Does not exist
          </Button>
        ) : walletStatus === WalletStatus.NotInit ? (
          <Center py={"md"}>{accountActionButton}</Center>
        ) : (
          <Center py={"md"}>{accountActionButton}</Center>
        )}
      </Navbar.Section>
    </Navbar>
  );
};
export default Nav;
