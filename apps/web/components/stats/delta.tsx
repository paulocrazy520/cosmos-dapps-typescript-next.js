import {
  createStyles,
  Progress,
  Box,
  Text,
  Group,
  Paper,
  SimpleGrid,
} from "@mantine/core";
import {
  TbArrowDownLeft,
  TbArrowUpRight,
  TbDeviceAnalytics,
} from "react-icons/tb";

const useStyles = createStyles((theme) => ({
  progressLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },

  stat: {
    borderBottom: "3px solid",
    paddingBottom: 5,
  },

  statCount: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.3,
  },

  diff: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
}));

export const DeltaLabel = (delta: number) => {
  const { classes } = useStyles();

  return delta > 0 ? (
    <Text color="teal" className={classes.diff} size="sm" weight={700}>
      <span>{delta}%</span>
      <TbArrowUpRight size={16} style={{ marginBottom: 4 }} />
    </Text>
  ) : (
    <Text color="red" className={classes.diff} size="sm" weight={700}>
      <span>{delta}%</span>
      <TbArrowDownLeft size={16} style={{ marginBottom: 4 }} />
    </Text>
  );
};
