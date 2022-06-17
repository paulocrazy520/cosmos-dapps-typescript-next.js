import { Divider, MantineTheme } from "@mantine/core";

export const DropdownDivider = (theme: MantineTheme) => {
  return (
    <Divider
      my="sm"
      mx="-md"
      color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
    />
  );
};
