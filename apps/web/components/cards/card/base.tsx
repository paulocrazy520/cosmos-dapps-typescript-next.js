import {
  Card,
  createStyles,
  Divider,
  Group,
  Paper,
  Space,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { FunctionComponent } from "react";
import { TbAtom } from "react-icons/tb";
import { Button } from "@mantine/core";
export const useLayoutCardStyles = createStyles(
  (
    { colors: { dark, gray }, colorScheme, fn: { darken, lighten } },
    _params,
    getRef
  ) => ({
    card: {
      backgroundColor: colorScheme === "dark" ? dark[7] : gray[0],
      transition: "backgroundColor 0.20s ease-in-out",
      "&:hover": {
        backgroundColor:
          colorScheme === "dark"
            ? lighten(dark[7], 0.03)
            : darken(gray[1], 0.03),
      },
    },
    title: {},
  })
);
export interface LayoutCardProps {
  children: React.ReactNode;
  top?: boolean;
  hasIcon?: boolean;
  border?: boolean;
  icon?: React.ReactNode;
  color?: string;
  title?: string | React.ReactNode;
  actions?: React.ReactNode;
  shadow?: string;
  padding?: string;
}
export const LayoutCard: FunctionComponent<LayoutCardProps> = ({
  icon,
  color,
  hasIcon = false,
  children,
  shadow,
  top = false,
  padding = "sm",
  title,
  actions,
  border = false,
}: LayoutCardProps) => {
  const { classes, theme } = useLayoutCardStyles();
  return (
    <Paper
      radius="sm"
      className={classes.card}
      withBorder={border}
      shadow={shadow ? shadow : "xl"}
      p={padding ? padding : "sm"}
      mt={top == true ? 0 : 18}
    >
      <Group position="apart" noWrap>
        <Group position="left" grow>
          {hasIcon && (
            <ThemeIcon color={color ? color : "violet"} size="md" radius="sm">
              {icon ? icon : <TbAtom />}
            </ThemeIcon>
          )}

          <Title classNames={classes.title} size={22} weight={600}>
            {title}
          </Title>
        </Group>
        <Group position="right">{actions}</Group>
      </Group>

      <Space h={14} />
      <div>{children}</div>
    </Paper>
  );
};

export const SubHeading: FunctionComponent<{}> = ({ title }: any) => {
  return (
    <>
      <Text>{title}</Text>
      <Divider />
      <br />
    </>
  );
};
