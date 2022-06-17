import {
  createStyles,
  Card,
  Group,
  Switch,
  Text,
  Grid,
  Header,
  Divider,
  Container,
  Box,
} from "@mantine/core";
import { Wallet, WalletManager, WalletAdapter } from "@cosmos-kit/core";
import { Layout } from "../../components/layout";
import { useState } from "react";
import { UnstyledButton, Menu, Image } from "@mantine/core";
import { TbChevronDown } from "react-icons/tb";
import images from "../../public/lang";
import { Slayout } from "../../components/layout/sublayout";

const data = [
  { label: "English", image: images.english },
  { label: "German", image: images.german },
  { label: "Italian", image: images.italian },
  { label: "French", image: images.french },
  { label: "Polish", image: images.polish },
];

const useLangStyles = createStyles(
  (theme, { opened }: { opened: boolean }) => ({
    control: {
      width: 200,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 15px",
      borderRadius: theme.radius.md,
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2]
      }`,
      transition: "background-color 150ms ease",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[opened ? 5 : 6]
          : opened
          ? theme.colors.gray[0]
          : theme.white,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[0],
      },
    },

    label: {
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
    },

    icon: {
      transition: "transform 150ms ease",
      transform: opened ? "rotate(180deg)" : "rotate(0deg)",
    },
  })
);

export function LanguagePicker() {
  const [opened, setOpened] = useState(false);
  const { classes } = useLangStyles({ opened });
  const [selected, setSelected] = useState(data[0]);
  const items = data.map((item) => (
    <Menu.Item
      icon={<Image alt="Language" src={item.image} width={18} height={18} />}
      onClick={() => setSelected(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            <Image
              alt="preferences"
              src={selected.image}
              width={22}
              height={22}
            />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <TbChevronDown size={16} className={classes.icon} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  item: {
    "& + &": {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
  },

  switch: {
    "& *": {
      cursor: "pointer",
    },
  },

  title: {
    lineHeight: 1,
  },
}));

interface SwitchesCardProps {
  title: string;
  description: string;
  data: {
    title: string;
    description: string;
  }[];
}

export function SwitchesCard({ title, description, data }: SwitchesCardProps) {
  const { classes } = useStyles();

  const items = data.map((item) => (
    <Group
      key={item.title}
      position="apart"
      className={classes.item}
      noWrap
      spacing="xl"
    >
      <div>
        <Text>{item.title}</Text>
        <Text size="xs" color="dimmed">
          {item.description}
        </Text>
      </div>
      <Switch
        onLabel="ON"
        offLabel="OFF"
        className={classes.switch}
        size="lg"
      />
    </Group>
  ));

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Text size="lg" className={classes.title} weight={500}>
        {title}
      </Text>
      <Text size="xs" color="dimmed" mt={3} mb="xl">
        {description}
      </Text>
      {items}
    </Card>
  );
}
export default function Prefs() {
  return (
    <Slayout>
      <Container
        style={{
          marginTop: "10px",
        }}
      >
        <Group>
          <Text weight={300} size={38}>
            Preferences
          </Text>
        </Group>
        <Divider />
        <br />
        <Grid style={{}}>
          <Grid.Col span={6}>
            <SwitchesCard
              title="Notifications"
              description="Turn on/off notifications"
              data={[
                { title: "Email", description: "Receive email notifications" },
              ]}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <SwitchesCard
              title="Notifications"
              description="Turn on/off notifications"
              data={[
                { title: "Email", description: "Receive email notifications" },
              ]}
            />
            <Box
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "5px",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              <LanguagePicker />
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Slayout>
  );
}
