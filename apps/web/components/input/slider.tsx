import { createStyles, MantineTheme, Slider } from "@mantine/core";

const marks = [
  { value: 0, label: "None" },
  { value: 25, label: "25%" },
  { value: 50, label: "50%" },
  { value: 75, label: "75%" },
  { value: 100, label: "Max" },
];

export const useAmountSliderThemes = createStyles((theme: MantineTheme) => ({
  track: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.blue[1],
  },
  mark: {
    width: 6,
    height: 6,
    borderRadius: 6,
    transform: "translateX(-3px) translateY(-2px)",
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.blue[1],
  },
  markFilled: {
    borderColor: theme.colors.blue[6],
  },
  markLabel: { fontSize: theme.fontSizes.xs, marginBottom: 5, marginTop: 0 },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: theme.white,
    borderWidth: 1,
    boxShadow: theme.shadows.sm,
  },
}));
export const AmountSlider = () => {
  const { classes, theme } = useAmountSliderThemes();
  return (
    <Slider
      defaultValue={0}
      marks={marks}
      labelTransition="fade"
      size={2}
      sx={classes}
    />
  );
};
