import {
  ColorScheme,
  MantineTheme,
  MantineThemeBase,
  MantineThemeOverride,
} from "@mantine/core";

export const violet = ({ colorScheme, colors: { violet } }: MantineTheme) =>
  colorScheme === "dark" ? violet[5] : violet[7];
export const grape = ({ colorScheme, colors: { grape } }: MantineTheme) =>
  colorScheme === "dark" ? grape[5] : grape[7];
export const teal = ({ colorScheme, colors: { teal } }: MantineTheme) =>
  colorScheme === "dark" ? teal[5] : teal[7];
export const indigo = ({ colorScheme, colors: { indigo } }: MantineTheme) =>
  colorScheme === "dark" ? indigo[5] : indigo[7];
export const purple = ({ colorScheme, colors: { purple } }: MantineTheme) =>
  colorScheme === "dark" ? purple[5] : purple[7];

export * from "./gradient";
export * from "./cmp";
export * from "./colors";
export * from "./base";

export const theme = (colorsch: ColorScheme): MantineThemeOverride => {
  return {
    loader: "dots",
    focusRing: "never",
    components: {},
    headings: {
      fontFamily: "Roboto, sans-serif",
      fontWeight: 600,
      // sizes: {
      //   h1: 28,
      //   h2: 24,
      //   h3: 20,
      // }
    },

    primaryColor: "violet",
    colorScheme: colorsch,
    fontSizes: {
      xs: 10,
      sm: 12,
      md: 13,
      lg: 16,
      xl: 20,
    },
    defaultRadius: "sm",
    colors: {
      lightBgs: ["#E0DFEA"],

      bgs: ["#0e0f1e"],
      dark: [
        "#d5d7e0",
        "#acaebf",
        "#8c8fa3",
        "#666980",
        "#4d4f66",
        "#34354a",
        "#2b2c3d",
        "#1d1e30",
        "#121328",
        "#01010a",
      ],
    },
  };
};
