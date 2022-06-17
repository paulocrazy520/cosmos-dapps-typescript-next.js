import {
  Button,
  ActionIcon,
  ActionIconVariant,
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
  HoverCard,
  Divider,
  Tooltip,
  Box,
} from "@mantine/core";
import { Router, useRouter } from "next/router";
import { useStore } from "../../stores";
import {
  TbCoin,
  TbLogout,
  TbUser,
  TbHistory,
  TbSettings,
  TbBallonOff,
  TbPool,
  TbPodium,
  TbAddressBook,
} from "react-icons/tb";

const mockdata = [
  {
    title: "Assets", icon: TbCoin, color: "violet", to: { pathname: "/", query: { name: "assets" } }
  },
  { title: "Borrow", icon: TbUser, color: "violet", to: "/borrow" },
  { title: "Transactions", icon: TbHistory, color: "blue", to: { pathname: '/', query: { name: 'history' } } },
  { title: "Liquidity", icon: TbPool, color: "green", to: "/pool" },
  { title: "Voting", icon: TbPodium, color: "teal", to: "/governance" },
  { title: "Staking", icon: TbAddressBook, color: "cyan", to: "/stake" },
  { title: "Airdrops", icon: TbBallonOff, color: "pink", to: "/airdrop" },
  { title: "Trade", icon: TbSettings, color: "orange", to: "/trade" },
  { title: "Logout", icon: TbLogout, color: "red" },
];

const useStyles = createStyles((theme) => ({
  card: {
    background: "none",
    padding: 0,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },
  dropdownHeader: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
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

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    border: "1px solid rgba(255,255,255,0.09)",
    height: 90,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.dark[9],
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: `0 0 4px rgba(0, 0, 0, 0.15)`,
      transform: "scale(1.05)",
    },
  },
}));
export function ActionFooter() {
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <Group className={classes.dropdownFooter}>
      <ActionIcon variant="default" onClick={() => { router.push("https://docs.ollo.zone"); }}>
        <TbSettings />
      </ActionIcon>
      {/* <ActionIcon variant="default">
        <TbLogout />
      </ActionIcon> */}
      <ActionIcon variant="default" onClick={() => { router.push({ pathname: "/", query: { name: "wallet" } }) }}>
        <TbAddressBook />
      </ActionIcon>
    </Group>
  );
}

export const ActionHeader = () => {
  const router = useRouter();
  const { classes, theme } = useStyles();
  return <Box style={{}}></Box>;
};
export const ActionsGrid = () => {
  const { classes, theme } = useStyles();
  const router = useRouter();
  const { chainStore, accountStore, queriesStore, priceStore } = useStore();
  const account = accountStore.getAccount(chainStore.ollo.chainId);
  const items = mockdata.map((item, index) => (
    <UnstyledButton
      key={item.title}
      className={classes.item}
      onClick={() => {
        if (index == 8)
          account.disconnect();
        else
          router.push(item.to)
      }}
      style={{
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[1],
      }}
    >
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card radius="lg" shadow="lg" className={classes.card}>
      <Card.Section p="sm" withBorder>
        <Group position="apart" style={{}} grow>
          <Group position="left" grow>
            <Text weight={700}>Features</Text>
          </Group>
          <Group position="right">
            <Tooltip label="Preferences">
              <Anchor
                href="#"
                size="xs"
                onClick={() => {
                  router.push("/user/preferences");
                }}
              >
                <ActionIcon variant="default">
                  <TbSettings></TbSettings>
                </ActionIcon>
              </Anchor>
            </Tooltip>
            {/* <Tooltip label="Disconnect">
              <Anchor href="#" size="xs" onClick={() => { }}>
                <ActionIcon variant="default">
                  <TbLogout />
                </ActionIcon>
              </Anchor>
            </Tooltip> */}
          </Group>
        </Group>
      </Card.Section>
      <ActionHeader />
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
      <ActionFooter />
    </Card>
  );
};
