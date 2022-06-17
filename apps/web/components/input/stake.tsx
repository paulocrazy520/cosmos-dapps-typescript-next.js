import { useState } from "react";
import { TbPoint, TbGripVertical } from "react-icons/tb";
import { createStyles, NumberInput, Slider } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
  },

  input: {
    height: "auto",
    paddingTop: 22,
    paddingBottom: 3,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },

  slider: {
    position: "absolute",
    width: "100%",
    bottom: -1,
  },

  thumb: {
    width: 16,
    height: 16,
  },

  track: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
}));

export interface UnstakeSliderProps {
  currentlyStaked: number;
}
export interface StakeSliderProps {
  availableBalance: number;
}
export function StakeSlider({ availableBalance }: StakeSliderProps) {
  const { classes } = useStyles();
  const [value, setValue] = useState<number | undefined>(2200);
  const point = <TbPoint size={10} style={{ marginTop: 6 }} />;

  return (
    <div className={classes.wrapper}>
      <NumberInput
        value={value}
        onChange={setValue}
        label="Your stake"
        placeholder="Your stake in TOLLO"
        step={1}
        min={0}
        max={availableBalance}
        hideControls
        classNames={{ input: classes.input, label: classes.label }}
      />
      <Slider
        max={8000}
        step={50}
        min={0}
        label={null}
        value={value}
        onChange={setValue}
        size={2}
        radius={0}
        className={classes.slider}
        classNames={{ thumb: classes.thumb, track: classes.track }}
        marks={[
          { value: 0, label: "0" },
          { value: 12.5, label: point },
          { value: 25, label: "25" },
          { value: 37.5, label: point },
          { value: 50, label: "50" },
          { value: 62.5, label: point },
          { value: 75, label: "75" },
          { value: 87.5, label: point },
          { value: 100, label: "100" },
        ]}
      />
    </div>
  );
}
export function UnstakeSlider({ currentlyStaked }: UnstakeSliderProps) {
  const { classes } = useStyles();
  const [value, setValue] = useState<number | undefined>(2200);
  const point = <TbPoint size={10} style={{ marginTop: 6 }} />;
  const staked = currentlyStaked / 1000000;

  return (
    <div className={classes.wrapper}>
      <NumberInput
        value={value}
        onChange={setValue}
        label="Your stake"
        placeholder="0"
        step={1}
        min={0}
        max={currentlyStaked}
        hideControls
        classNames={{ input: classes.input, label: classes.label }}
      />
      <Slider
        max={8000}
        step={50}
        min={0}
        label={null}
        value={value}
        onChange={setValue}
        size={2}
        radius={0}
        className={classes.slider}
        classNames={{ thumb: classes.thumb, track: classes.track }}
        marks={[
          { value: 0, label: "0" },
          { value: 12.5, label: point },
          { value: 25, label: "25" },
          { value: 37.5, label: point },
          { value: 50, label: "50" },
          { value: 62.5, label: point },
          { value: 75, label: "75" },
          { value: 87.5, label: point },
          { value: 100, label: "100" },
        ]}
      />
    </div>
  );
}
