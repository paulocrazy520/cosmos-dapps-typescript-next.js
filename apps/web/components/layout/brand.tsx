import React from "react";
import { Group, ActionIcon, useMantineColorScheme, Box } from "@mantine/core";
import { TbSun, TbMoonStars } from "react-icons/tb";
import { Logo } from "./logo";

export function Brand() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        paddingBottom: theme.spacing.lg,
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      })}
    >
      <Group position="apart">
        <Logo colorScheme={colorScheme} />
        <ActionIcon
          variant="default"
          onClick={() => toggleColorScheme()}
          size={30}
        >
          {colorScheme === "dark" ? (
            <TbSun size={16} />
          ) : (
            <TbMoonStars size={16} />
          )}
        </ActionIcon>
      </Group>
    </Box>
  );
}
