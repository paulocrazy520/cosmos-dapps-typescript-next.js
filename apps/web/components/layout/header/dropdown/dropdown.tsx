import {
  createStyles,
  Group,
  UnstyledButton,
  Text,
  ThemeIcon,
  SimpleGrid,
  Container,
} from "@mantine/core";
import { useRouter } from "next/router";
export const useDropdownHeaderStyles = createStyles((theme) => ({
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
}));
export type DropdownLink = {
  icon: JSX.Element;
  title: string;
  description: string;
  to: string;
};
export const DropdownLinks = (links: DropdownLink[]) => {
  const { push } = useRouter();
  const { classes, theme } = useDropdownHeaderStyles();
  return (
    <>
      {" "}
      {links.map((item: DropdownLink) => {
        return (
          <UnstyledButton
            classNames={classes.subLink}
            key={item.title}
            onClick={() => {
              push(item.to);
            }}
          >
            <Group noWrap align="flex-start">
              <ThemeIcon
                size={34}
                variant="default"
                color={theme.primaryColor}
                radius="md"
              >
                {item.icon}
              </ThemeIcon>
              <div>
                <Text size="sm" weight={500}>
                  {item.title}
                </Text>
                <Text size="xs" color="dimmed">
                  {item.description}
                </Text>
              </div>
            </Group>
          </UnstyledButton>
        );
      })}
    </>
  );
};

export const DropdownLinksGrid = (links: DropdownLink[]) => {
  return (
    <SimpleGrid cols={2} spacing={16}>
      {DropdownLinks(links)}
    </SimpleGrid>
  );
};
