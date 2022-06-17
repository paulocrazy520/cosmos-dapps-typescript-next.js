import { Anchor, Group, Text } from "@mantine/core";

export const DropdownHeader = () => {
  return (
    <Group position="apart" px="md">
      <Text weight={500}>Features</Text>
      <Anchor href="#" size="xs">
        View all
      </Anchor>
    </Group>
  );
};
