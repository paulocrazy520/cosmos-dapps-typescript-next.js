import { violet } from "@/cfg/theme";
import {
  Anchor,
  Button,
  Card,
  Indicator,
  Loader,
  Menu,
  Skeleton,
  Space,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import {
  createStyles,
  ThemeIcon,
  Progress,
  Text,
  Group,
  Badge,
  Paper,
} from "@mantine/core";
import { Validator } from "@/types/staking";
import { TbUser, TbUserCheck } from "react-icons/tb";

export const validatorCardIconSize = 60;

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "visible",
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl * 1.5 + validatorCardIconSize / 3,
    backgroundColor:
      theme.colorScheme == "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
  },

  icon: {
    position: "absolute",
    top: -validatorCardIconSize / 3,
    left: `calc(50% - ${validatorCardIconSize / 2}px)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

export type ValidatorAvatarProps = {
  v: Validator;
};
export function ValidatorAvatar({ v }: ValidatorAvatarProps) {
  const { classes, theme } = useStyles();
  return (
    <ThemeIcon
      className={classes.icon}
      color={violet(theme)}
      size={validatorCardIconSize}
      style={{
        boxShadow: "0px 0px 4px rgba(0,0,0,0.15)",
      }}
      radius={validatorCardIconSize}
    >
      <Indicator
        inline
        label={
          v.status == "BOND_STATUS_BONDED"
            ? "Active"
            : v.status == "BOND_STATUS_UNBONDED"
            ? v.jailed == true
              ? "Jailed"
              : "Inactive"
            : v.status == "BOND_STATUS_UNBONDING"
            ? "Unbonding"
            : "Unknown"
        }
        offset={-3}
        size={12}
        zIndex={0}
        color={
          v.status == "BOND_STATUS_UNBONDED"
            ? v.jailed == true
              ? theme.colorScheme == "dark"
                ? theme.colors.red[4]
                : theme.colors.red[8]
              : theme.colorScheme == "dark"
              ? theme.colors.gray[4]
              : theme.colors.dark[8]
            : v.status == "BOND_STATUS_BONDED"
            ? theme.colorScheme == "dark"
              ? theme.colors.teal[5]
              : theme.colors.teal[7]
            : v.status == "BOND_STATUS_UNBONDING"
            ? theme.colorScheme == "dark"
              ? theme.colors.violet[5]
              : theme.colors.yellow[7]
            : theme.colorScheme == "dark"
            ? theme.colors.violet[5]
            : theme.colors.violet[7]
        }
      >
        {/* { */}
        {/*   !true */}
        {/*     ? <Avatar src={""} size={34}></Avatar> */}
        <TbUser size={34} />
        {/* } */}
      </Indicator>
    </ThemeIcon>
  );
}
