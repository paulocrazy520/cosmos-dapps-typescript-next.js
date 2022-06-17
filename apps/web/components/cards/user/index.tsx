export * from "./overview";
export * from "./session";

import { ActionsGrid } from "../actions";
import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Menu,
} from "@mantine/core";
import { TbChevronRight } from "react-icons/tb";
import { ActionBtn } from "../../buttons";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name: string;
  addr: string;
  icon?: React.ReactNode;
}

export default function UserButton({
  image,
  name,
  addr,
  icon,
  ...others
}: UserButtonProps) {
  const {
    classes,
    theme: { colorScheme, colors },
  } = useStyles();

  return (
    <Menu transition="pop-bottom-left" position="right" width={"350px"}>
      <Menu.Target>
        <UnstyledButton className={classes.user} {...others} onClick={() => {}}>
          <Group>
            <Avatar
              color="violet"
              src={image}
              radius="md"
              style={{
                border: colorScheme == "dark" ? colors.dark[4] : colors.gray[3],
              }}
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {name}
              </Text>

              <Text color="dimmed" size="xs">
                {addr}
              </Text>
            </div>

            {icon || <ActionBtn icon={<TbChevronRight size={14} />} label="" />}
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <ActionsGrid />
      </Menu.Dropdown>
    </Menu>
  );
}
