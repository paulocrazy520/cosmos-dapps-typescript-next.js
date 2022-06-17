import {
  useMantineColorScheme,
  ActionIcon,
  Popover,
  TextInput,
  Menu,
  Avatar,
  Skeleton,
  MantineTheme,
} from "@mantine/core";
import {
  DropdownDivider,
  DropdownFooter,
  DropdownHeader,
  DropdownLinks,
  DropdownLinksGrid,
} from "./dropdown";
import {
  TbSun,
  TbMoonStars,
  TbSearch,
  TbPhone,
  TbMessage,
  TbArrowsLeftRight,
  TbTrash,
} from "react-icons/tb";
import {
  createStyles,
  Header as MantineHeader,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  Modal,
} from "@mantine/core";
import { Logo } from "../logo";
import { useDisclosure } from "@mantine/hooks";
import {
  TbNotification,
  TbCode,
  TbBook,
  TbChartPie3,
  TbFingerprint,
  TbCoin,
  TbWallet,
  TbChevronDown,
  TbInfoCircle,
  TbSettings,
} from "react-icons/tb";
import {
  ConnectNonIbcWallet,
  KeplrConnectionSelectModal,
} from "../../../modals";
import { useState } from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { openContextModal, openModal, useModals } from "@mantine/modals";
import { useConnectWalletModalRedirect, useKeplr } from "../../../hooks";
import { olloChainInfo } from "../../../config";
import { useStore } from "../../../stores";
import { createKeplrChainInfos } from "../../../config/utils";
import { showNotification } from "@mantine/notifications";
import { ThemeBtn } from "./themebtn";

import { ModalBase } from "../../../modals";
import { getLinkData } from "./dropdown";
import { trimAddr } from "@/lib/util";
import { WalletStatus } from "@keplr-wallet/stores";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBalance } from "@/lib/fn/bank";
import { violet } from "@/config/theme";
import { getOlloSpendableBalance } from "@/lib/fn/user";

const useStyles = createStyles((theme: MantineTheme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  logo: {
    cursor: "pointer",
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.darken(theme.colors.dark[6], 0.07)
          : theme.fn.darken(theme.colors.gray[0], 0.07),
    }),
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  logostyle: {
    cursor: "pointer",
    // ...theme.fn.hover({
    //   backgroundColor: theme.colorScheme === 'dark'
    //     ? theme.fn.darken(theme.colors.dark[7], 0.075)
    //     : theme.fn.darken(theme.colors.gray[0], 0.075)
    // })
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export const Header = ({
  handleWalletModal,
  walletModalOpen,
  walletStatus,
  accountActionButton,
}: any) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [loadingModal, { toggle: toggleModal }] = useDisclosure(false);
  const [isKeplrOpen, setIsKeplrOpen] = useState(false);
  const { classes, theme } = useStyles();
  const { openModal } = useModals();
  const [loadingKeplr, { toggle: toggleKeplr }] = useDisclosure(false);
  const { accountStore } = useStore();
  const acct = accountStore.getAccount("ollo-testnet-1");
  const links = DropdownLinks(getLinkData(theme));
  const onClose = () => { };
  const q = useQueryClient();
  const olloBalance = useQuery(
    ["ollo", "balance", "spendable", acct.bech32Address],
    async () => await getOlloSpendableBalance(acct.bech32Address),
    {
      initialData: q.getQueryData([
        "ollo",
        "balance",
        "spendable",
        acct.bech32Address,
      ]),
    }
  );
  // const balance  = useQuery(["ollo-staked-balance"], async () => await getStakedBalance(acct.bech32Address))
  const router = useRouter();
  return (
    <MantineHeader withBorder fixed height={60} py={0} px="xl">
      <Group position="apart" sx={{ height: "100%" }}>
        <Group
          position="left"
          sx={{ verticalAlign: "center" }}
          className={classes.logostyle}
        >
          <Link href={"/"} passHref>
            <Logo colorScheme={theme.colorScheme} />
          </Link>
          {/* <Header onClick={() => */}
          {/*   router.push("/")}  */}
          {/*   size="lg">OLLO</Header> */}
        </Group>
        <Group
          align={"end"}
          sx={{ height: "100%" }}
          spacing={0}
          className={classes.hiddenMobile}
        >
          {/* <a href="#" className={classes.link}> */}
          {/*   Home */}
          {/* </a> */}
          {/* <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal> */}
          {/*   <HoverCard.Target> */}
          {/*     <a href="#" className={classes.link}> */}
          {/*       <Center inline> */}
          {/*         <Box component="span" mr={5}> */}
          {/*           About */}
          {/*         </Box> */}
          {/*         <TbChevronDown size={16} color={theme.fn.primaryColor()} /> */}
          {/*       </Center> */}
          {/*     </a> */}
          {/*   </HoverCard.Target> */}

          {/*   <HoverCard.Dropdown sx={{ overflow: 'hidden' }}> */}
          {/*     <DropdownHeader /> */}
          {/*     <DropdownDivider {...theme} /> */}
          {/*     <SimpleGrid cols={2} spacing={16}> */}
          {/*       {links} */}
          {/*     </SimpleGrid> */}
          {/*     <DropdownFooter /> */}
          {/*   </HoverCard.Dropdown> */}
          {/* </HoverCard> */}
          <Text
            className={classes.link}
            onClick={() => {
              router.push("https://docs.ollo.zone");
            }}
          >
            Docs
          </Text>
          <Text
            className={classes.link}
            onClick={() => {
              router.push("https://explorer.ollo.zone");
            }}
          >
            Explorer
          </Text>
        </Group>
        {/* <KeplrConnectionSelectModal overrideWithKeplrInstallLink='' onSelectWalletConnect={() => { }} isOpen={isKeplrOpen} onRequestClose={() => { setIsKeplrOpen(false) }} title="Connct" /> */}

        {acct.walletStatus == WalletStatus.Loaded ? (
          <Group className={classes.hiddenMobile}>
            <Button.Group>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button
                    py={0}
                    size="sm"
                    onClick={() => { }}
                    // leftIcon={ <TbSettings/>}
                    rightIcon={<TbChevronDown />}
                    variant="default"
                  >
                    {acct.walletStatus == WalletStatus.Loaded ? (
                      <Group>
                        <Avatar size={"sm"} color="violet">
                          {acct.name.slice(0, 3)}
                        </Avatar>
                        <div>
                          <Text>{acct.name}</Text>
                          <Text weight={400} size="xs" color="dimmed">
                            {trimAddr(acct.bech32Address)}
                          </Text>
                        </div>
                        <Text
                          style={{}}
                          variant="gradient"
                          gradient={{
                            deg: 90,
                            from: theme.colors.violet[4],
                            to: theme.colors.violet[1],
                          }}
                          weight={500}
                          size={"sm"}
                          py={0}
                          px={0}
                          m={0}
                        >
                          {olloBalance.data &&
                            (
                              parseInt(olloBalance.data.amount) / 1000000
                            ).toFixed(0) + " TOLLO"}
                        </Text>
                      </Group>
                    ) : (
                      <Skeleton />
                    )}
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Application</Menu.Label>
                  <Menu.Item icon={<TbSettings size={14} />} onClick={() => { router.push("https://explorer.ollo.zone"); }}>
                    Block Explorer
                  </Menu.Item>
                  <Menu.Item icon={<TbMessage size={14} />} onClick={() => { router.push("https://docs.ollo.zone"); }}>
                    Station Docs
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Label>Danger zone</Menu.Label>
                  {/* <Menu.Item icon={<TbArrowsLeftRight size={14} />}>
                    switch to:
                  </Menu.Item> */}
                  <Menu.Item color="red" icon={<TbTrash size={14} />}>
                    Disconnect Wallet
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              {accountActionButton}
              <ThemeBtn />
            </Button.Group>
          </Group>
        ) : (
          <Group className={classes.hiddenMobile}>
            <Button.Group>
              {accountActionButton}
              <ThemeBtn />
            </Button.Group>
          </Group>
        )}
        <Burger
          opened={drawerOpened}
          onClick={toggleDrawer}
          className={classes.hiddenDesktop}
        />
      </Group>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <TbChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
      <ModalBase
        isOpen={isKeplrOpen}
        onRequestClose={() => {
          if (walletStatus == WalletStatus.Loaded)
            showNotification({
              title: "Wallet connected",
              message: "You are connected to Keplr",
            });
          else if (walletStatus == WalletStatus.Loading)
            showNotification({
              loading: true,
              title: "Connecting",
              message: "Connecting via keplr...",
            });
          else
            showNotification({
              title: "Wallet not connected",
              message: "You are not connected to Keplr",
            });
        }}
        title={"Connect wallet"}
      ></ModalBase>
    </MantineHeader>
  );
};
export default Header;
