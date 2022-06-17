import { Text, Button, createStyles, Group, MantineTheme } from "@mantine/core";

export const useDropdownFooterStyles = createStyles((theme: MantineTheme) => ({
  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },
}));

export const DropdownFooter = () => {
  const { classes, theme } = useDropdownFooterStyles();
  return (
    <div className={classes.dropdownFooter}>
      <Group position="apart">
        <div>
          <Text weight={500} size="sm">
            Get started
          </Text>
          <Text size="xs" color="dimmed">
            Their food sources have decreased, and their numbers
          </Text>
        </div>
        <Button variant="default">Get started</Button>
      </Group>
    </div>
  );
};
