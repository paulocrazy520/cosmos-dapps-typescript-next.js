import { Badge, Group, List, ThemeIcon } from "@mantine/core";
import { FunctionComponent } from "react";
import { TbPlus } from "react-icons/tb";

export type ListProps = {
  list: React.ReactNode[];
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
  center?: boolean;
  icon?: React.ReactNode;
};
export const OlloList: FunctionComponent<ListProps> = ({
  list,
  size,
  spacing,
  radius,
  center = true,
  icon,
}) => {
  return (
    <List
      size={size ? size : "sm"}
      spacing={spacing ? spacing : "sm"}
      center={center}
      icon={
        <ThemeIcon
          color="violet"
          size={size ? size : 12}
          radius={radius ? radius : "sm"}
        >
          (icon? icon : <TbPlus size={size ? size : 12} />)
        </ThemeIcon>
      }
    >
      {list.map((c: React.ReactNode, i: number) => (
        <List.Item key={i}>{c}</List.Item>
      ))}
    </List>
  );
};
