import { createStyles, Anchor, Group, ActionIcon } from "@mantine/core";
import { useRouter } from "next/router";
import {
  TbBrandDiscord,
  TbBrandTelegram,
  TbBrandTwitter,
} from "react-icons/tb";
import { Logo } from "../logo";

export const defaultFooter = (
  <FooterCentered
    links={[
      { label: "About", link: "/about" },
      { label: "Home", link: "/" },
      { label: "Contact", link: "/contact" },
      { label: "Docs", link: "https://docs.ollo.zone" },
    ]}
  />
);

export const useFooterStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

interface FooterCenteredProps {
  links: { link: string; label: string }[];
}

export function FooterCentered({ links }: FooterCenteredProps) {
  const { classes } = useFooterStyles();
  const { push } = useRouter();
  const items = links.map((link) => (
    <Anchor
      color="dimmed"
      key={link.label}
      onClick={() => push(link.link)}
      sx={{ lineHeight: 1 }}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Logo colorScheme="dark" />

        <Group className={classes.links}>{items}</Group>

        <Group spacing="xs" position="right" noWrap>
          <ActionIcon size="lg" variant="default" radius="xl">
            <TbBrandTwitter size={18} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <TbBrandTelegram size={18} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <TbBrandDiscord size={18} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
