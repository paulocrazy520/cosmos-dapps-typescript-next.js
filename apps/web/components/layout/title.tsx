import { violet } from "@/cfg/theme";
import {
  Button,
  ButtonVariant,
  createStyles,
  Group,
  MantineSize,
  MantineTheme,
  Space,
  Tabs,
  Title,
  Tooltip,
} from "@mantine/core";
import { FunctionComponent } from "react";
import { TbCircle } from "react-icons/tb";
export type BaseTitleProps = {
  title: string;
  leftActions: JSX.Element;
  rightActions: JSX.Element;
};

export type TitleButtonProps = {
  label?: string;
  tooltip?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  color?: string;
  m?: MantineSize;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  size?: MantineSize;
  p?: MantineSize;
  radius?: MantineSize;
};
export type TitleButtonsProps = {
  buttons: TitleButtonProps[];
  grouped?: boolean;
};
export const useTabTitleStyles = createStyles((theme: MantineTheme) => ({
  tabs: {},
}));
export const useTitleButtonStyles = createStyles((theme: MantineTheme) => ({
  button: {},
}));
export const TitleButtons = ({ buttons, grouped }: TitleButtonsProps) => {
  const {
    classes: { button: btncls },
    theme,
  } = useTitleButtonStyles();
  const ma = buttons.map(
    ({
      onClick,
      m,
      label,
      color = violet(theme),
      tooltip,
      variant = "default",
      leftIcon,
      rightIcon,
      size = "sm",
      p = "sm",
      radius = "sm",
    }: TitleButtonProps) => (
      <Tooltip
        key={label}
        withArrow
        withinPortal
        transition={"slide-up"}
        label={tooltip ? tooltip : label}
      >
        <Button
          className={btncls}
          radius={radius}
          size={size}
          p={p}
          m={m}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          onClick={onClick}
          variant={variant}
          color={color}
        >
          {label}
        </Button>
      </Tooltip>
    )
  );
  return <Button.Group>{ma}</Button.Group>;
};
export const BaseTitle = ({
  title,
  leftActions,
  rightActions,
}: BaseTitleProps) => {
  return (
    <Group style={{ minWidth: "100%" }} position="apart" grow noWrap>
      <Group position="left">
        <Title mr={10}>{title}</Title>
        {leftActions}
      </Group>
      <Group position="right">{rightActions}</Group>
    </Group>
  );
};

export type TitleTab = {
  value: string;
  title: string;
  icon?: JSX.Element;
  children: JSX.Element;
};
export type TabsTitleProps = {
  defaultVal: string;
  title: string;
  tabs: TitleTab[];
  rightActions?: JSX.Element;
};
export function TabsTitle({
  title,
  defaultVal,
  tabs,
  rightActions,
}: TabsTitleProps) {
  const { classes, theme } = useTabTitleStyles();
  const ls = (
    <Tabs.List>
      {tabs.map((t: TitleTab, i: number) => (
        <Tabs.Tab key={i} value={t.value} icon={t.icon ? t.icon : <TbCircle />}>
          {t.title}
        </Tabs.Tab>
      ))}
    </Tabs.List>
  );
  const panels = (
    <>
      {tabs.map((t: TitleTab, i: number) => (
        <Tabs.Panel value={t.value} key={i}>
          {t.children}
        </Tabs.Panel>
      ))}
    </>
  );
  const tt = (
    <>
      <BaseTitle
        title={title}
        leftActions={ls}
        rightActions={rightActions ? rightActions : <></>}
      />
    </>
  );
  return (
    <Tabs color={violet(theme)} variant="pills" defaultValue={defaultVal}>
      {tt}
      <Space h={12} />
      {panels}
    </Tabs>
  );
}
