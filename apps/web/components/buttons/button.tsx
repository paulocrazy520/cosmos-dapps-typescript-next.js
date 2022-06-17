import Image from "next/image";
import { FunctionComponent } from "react";
import classNames from "classnames";
import {
  ActionIcon,
  Button as Bt,
  Loader,
  MantineGradient,
  MantineNumberSize,
  MantineSize,
  MantineTheme,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { TbPlus } from "react-icons/tb";
import { CustomClasses, Disableable } from "../types";
import { ButtonProps } from "./types";
import { ThemeContext } from "@emotion/react";

interface Props extends ButtonProps, CustomClasses, Disableable {
  color?: "primary" | "secondary" | "error" | "violet" | "dimmed";
  leftIcon?: React.ReactNode;
  size?: "xs" | "sm" | "lg" | "md";
  rightIcon?: React.ReactNode;
  variant?: "default" | "filled" | "outline" | "subtle" | "light";
  loading?: boolean;
  compact?: boolean;
  gradient?: MantineGradient;
  type?: string;
  p?: number;
  disabeld?: boolean;
  radius?: MantineNumberSize;
  className?: string;
}

export const grad = (theme: MantineTheme): any => {
  const {
    colorScheme,
    colors: { violet, indigo },
  } = theme;
  const iv: MantineGradient = {
    from: colorScheme === "dark" ? violet[5] : violet[8],
    to: colorScheme === "dark" ? indigo[5] : indigo[8],
    deg: 90,
  };
  return {
    indigoViolet: iv,
  };
};

export const Btn: FunctionComponent<Props> = ({
  onClick,
  color = "violet",
  p = undefined,
  leftIcon = <TbPlus />,
  rightIcon = undefined,
  size = "md",
  radius = "sm",
  disabeld = false,

  type,
  variant = "default",
  loading = false,

  compact = false,
  gradient = undefined,
  disabled = false,
  children,
  className=""
}) => (
  <Bt
    className={className}
    loading={loading}
    // loaderPosition="right"
    leftIcon={leftIcon}
    rightIcon={rightIcon ? rightIcon : undefined}
    compact={compact}
    radius={radius}
    p={p}
    gradient={gradient}
    loaderProps={{}}
    color={color}
    disabled={disabled}
    onClick={onClick}
    variant="default"
  >
    <>{children}</>
  </Bt>
);

export type ActionBtnProps = {
  color?: "primary" | "secondary" | "error" | "violet" | "dimmed";
  iron?: React.ReactNode;
  size?: MantineSize;
  loading?: boolean;
  variant?:
  | "gradient"
  | "default"
  | "filled"
  | "outline"
  | "subtle"
  | "light"
  | "link"
  | "white"
  | "light";
  gradient?: MantineGradient;
  disabeld?: boolean;
  radius?: MantineNumberSize;
  onClick: () => void;
  dir?: "top" | "right" | "bottom" | "left";
  p?: "xs" | "sm" | "lg" | "md" | "xl";
};
export const ActionBtn = ({
  icon = <TbPlus />,
  p = "xs",
  loading = false,
  disabled = false,
  onClick = () => { },
  variant = "filled",
  size = "xs",
  color = "violet",
  label,
  gradient = undefined,
  radius = "sm",
  className="",
}) => {
  return (
    <Tooltip label={label} withArrow transition={"slide-up"}>
      <Bt
        className={className}
        color={color}
        loading={loading}
        loaderPosition={"right"}
        gradient={gradient}
        style={{}}
        disabled={disabled}
        onClick={onClick}
        p={p}
        size={"xs"}
        variant={
          variant == "filled"
            ? "filled"
            : variant == "subtle"
              ? "subtle"
              : variant == "default"
                ? "default"
                : variant == "outline"
                  ? "outline"
                  : variant == "gradient"
                    ? "gradient"
                    : variant == "light"
                      ? "light"
                      : "default"
        }
        radius={radius == "xs" ? "xs" : "sm"}
      >
        {icon}
      </Bt>
    </Tooltip>
  );
};
export const Button = Btn;
