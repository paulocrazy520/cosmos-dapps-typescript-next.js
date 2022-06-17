import { createStyles, Paper, Text, ThemeIcon } from "@mantine/core";
import { TbColorSwatch } from "react-icons/tb";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.xl,
    paddingLeft: theme.spacing.xl * 2,

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.02)",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      backgroundImage: theme.fn.linearGradient(
        0,
        theme.colors.pink[6],
        theme.colors.orange[6]
      ),
    },
  },
}));

interface CardGradientProps {
  title: string;
  description: string;
  from?: string;
  to?: string;
  deg?: number;
  icon?: React.ReactFragment;
}

export function CardGradient({
  title,
  description,
  from,
  to,
  deg,
  icon,
}: CardGradientProps) {
  const { classes } = useStyles();
  return (
    <Paper withBorder radius="md" className={classes.card}>
      <ThemeIcon
        size="xl"
        radius="md"
        variant="gradient"
        gradient={{
          deg: deg ? deg : 0,
          from: from ? from : "pink",
          to: to ? to : "orange",
        }}
      >
        {icon ? icon : <TbColorSwatch size={28} />}
      </ThemeIcon>
      <Text size="xl" weight={500} mt="md">
        {title}
      </Text>
      <Text size="sm" mt="sm" color="dimmed">
        {description}
      </Text>
    </Paper>
  );
}
