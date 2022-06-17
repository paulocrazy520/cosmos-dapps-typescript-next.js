import { Button, Menu, Text, useMantineTheme } from "@mantine/core";
import { TbChevronDown } from "react-icons/tb";

export interface Sublink {
  label: string;
  sublabel?: string;
  color?: string;
  icon?: React.ReactFragment;
  to: string;
}
export interface DropdownButtonProps {
  leftIcon: React.ReactFragment;
  label: string;
  color: string;
  sublinks: Sublink[];
  children: React.ReactNode;
}

export default function ButtonMenu({
  children,
  leftIcon,
  label,
  color,
  sublinks,
}: DropdownButtonProps) {
  const subl = () => {
    var sl: JSX.Element[] = [];
    sublinks.forEach((sublink: Sublink) => {
      sl.push(
        <Menu.Item
          icon={sublink.icon ? sublink.icon : null}
          color={sublink.color ? sublink.color : theme.colors.gray[7]}
          rightSection={
            <Text size="xs" transform="uppercase" weight={700} color="dimmed">
              {sublink.sublabel ? sublink.sublabel : null}
            </Text>
          }
        >
          {children}
        </Menu.Item>
      );
    });
    return sl;
  };
  const theme = useMantineTheme();
  return (
    <Menu transition="pop-top-right" position="top-end" width={220}>
      <Menu.Target>
        <Button
          leftIcon={leftIcon ? leftIcon : null}
          rightIcon={<TbChevronDown size={18} />}
          pr={12}
        >
          Create new
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <>{subl}</>
      </Menu.Dropdown>
    </Menu>
  );
}
