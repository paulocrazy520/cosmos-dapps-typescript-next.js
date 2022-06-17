import {
  ActionIcon,
  Button,
  createStyles,
  MantineTheme,
  ThemeIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { TbMoonStars, TbSun } from "react-icons/tb";

export const useToggleStyles = createStyles((theme: MantineTheme) => ({
  icon: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[4]
        : theme.colors.gray[6],
  },
}));
export const ThemeBtn = () => {
  const { classes, theme, cx } = useToggleStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Button
      variant="default"
      size="sm"
      onClick={() => {
        toggleColorScheme();
      }}
    >
      {colorScheme === "dark" ? <TbSun size={16} /> : <TbMoonStars size={16} />}
    </Button>
  );
};

export default ThemeBtn;
