import { ThemeIcon } from "@mantine/core";
import { FunctionComponent } from "react";

export type BaseIconProps = {
  size?: number;
  color?: string;
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
  icon: React.ReactNode;
};
export const BaseIcon: FunctionComponent<BaseIconProps> = ({
  size,
  color,
  icon,
  radius,
}: BaseIconProps) => {
  return (
    <ThemeIcon
      size={size ? size : 12}
      color={color ? color : "violet"}
      radius={radius ? radius : "sm"}
    >
      {icon}
    </ThemeIcon>
  );
};
