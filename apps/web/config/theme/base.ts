export const mTheme = (colorScheme: string) => {
  return {
    colorScheme,
    focusRing: "never",
    components: {},
    headings: {
      fontFamily: "Roboto, sans-serif",
      fontWeight: 600,
      sizes: {
        h1: 28,
        h2: 24,
        h3: 20,
      },
    },

    primaryColor: "violet",
    fontSizes: {
      xs: 10,
      sm: 12,
      md: 13,
      lg: 16,
      xl: 20,
    },
    colors: {
      lightBgs: ["#e0dfea"],

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

export default mTheme;
