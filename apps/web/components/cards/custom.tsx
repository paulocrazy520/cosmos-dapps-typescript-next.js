import { Card, createStyles, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  title: {},
}));
export interface CCardProps {
  title: string;
  description: string;
  data: string;
  children: React.ReactNode;
  icon?: string;
  color?: string;
}
export function CCard({
  title,
  description,
  children,
  data,
  color,
  icon,
}: CCardProps) {
  const { classes, theme } = useStyles();
  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Text size="lg" className={classes.title} weight={500}>
        {title}
      </Text>
      <Text size="xs" color="dimmed" mt={3} mb="xl">
        {description}
      </Text>
      {children}
    </Card>
  );
}
