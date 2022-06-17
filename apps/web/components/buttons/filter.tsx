import {
  ActionIcon,
  Button,
  Card,
  Checkbox,
  Popover,
  Radio,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import { TbFilter } from "react-icons/tb";
import { ActionBtn } from ".";

export type FilterBtnProps = {};
export const FilterBtn = ({}: FilterBtnProps) => {
  return (
    <Popover
      width={400}
      transition="slide-down"
      radius={"md"}
      trapFocus
      closeOnClickOutside
      closeOnEscape
      shadow={"lg"}
      position="bottom"
      withArrow
    >
      <Popover.Target>
        <Tooltip label={"Filter results"} withArrow transition={"slide-up"}>
          <Button p="xs" size="xs" variant="filled">
            <TbFilter size={13} />
          </Button>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown
        sx={(theme) => ({
          background:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        })}
      >
        <Card>
          <Radio.Group>
            <Checkbox>Ascending</Checkbox>
            <Checkbox>Descending</Checkbox>
          </Radio.Group>
        </Card>
      </Popover.Dropdown>
    </Popover>
  );
};
