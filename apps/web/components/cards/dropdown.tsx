import {
  Card,
  Group,
  Text,
  Menu,
  ActionIcon,
  Image,
  SimpleGrid,
} from "@mantine/core";
import { TbDots, TbEye, TbFile, TbTrack } from "react-icons/tb";

const images = [
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1444084316824-dc26d6657664?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
];

export function Demo() {
  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={500}>Review pictures</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <TbDots size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<TbFile size={14} />}>Download zip</Menu.Item>
              <Menu.Item icon={<TbEye size={14} />}>Preview all</Menu.Item>
              <Menu.Item icon={<TbTrack size={14} />} color="red">
                Delete all
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>

      <Text mt="sm" color="dimmed" size="sm">
        <Text component="span" inherit color="blue">
          200+ images uploaded
        </Text>{" "}
        since last visit, review them to select which one should be added to
        your gallery
      </Text>

      <Card.Section mt="sm">
        <Image
          src="https://images.unsplash.com/photo-1579263477001-7a703f1974e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
          alt=""
        />
      </Card.Section>

      <Card.Section inheritPadding mt="sm" pb="md">
        <SimpleGrid cols={3}>
          {images.map((image) => (
            <>
              <Image src={image} key={image} radius="sm" alt="" />
            </>
          ))}
        </SimpleGrid>
      </Card.Section>
    </Card>
  );
}
