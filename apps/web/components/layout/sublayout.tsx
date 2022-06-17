import {
  Tabs,
  createStyles,
  Grid,
  ScrollArea,
  Button,
  Group,
  Title,
  MantineTheme,
} from "@mantine/core";
import classNames from "classnames";
import Head from "next/head";
import { FC } from "react";
import { FunctionComponent, ReactFragment } from "react";
import { TbSettings } from "react-icons/tb";
import { Layout } from ".";
import { CTitle } from "../text/title";
import { LayoutCard } from "../cards";
import Split from "./split";

const useSublayoutStyles = createStyles((theme: any) => ({
  container: {
    maxWidth: "100vw",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.bgs[0]
        : theme.colors.lightBgs[0],
    // backgroundImage:  "radial-gradient(#34354a 0.5px, transparent 0.5px), radial-gradient(#34354a 0.5px, #0e0f1e 0.5px)",
    position: "relative",
    minHeight: "100vh",
    paddingTop: "25px",
    paddingLeft: "25px",
    paddingRight: "25px",
  },
  split: {},
  title: {},
}));
export declare interface SublayoutTabProps {
  value: string;
  label: string;
  icon: JSX.Element;
  children: JSX.Element;
}
export declare interface SublayoutProps {
  title: string;
  children?: JSX.Element;
  tabs?: SublayoutTabProps[];
}
export declare interface SublayoutBasicProps {
  rightChildren?: React.ReactFragment;
  leftChildren?: React.ReactFragment;
  children: React.ReactFragment;
  title: string;
  pgTitle?: string;
}
export interface SlayoutProps {
  children: JSX.Element;
  subtitle?: string;
  pgTitle?: string;
}
export const useSlayoutStyles = createStyles((theme: MantineTheme) => ({
  container: {
    maxWidth: "100vw",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.bgs[0]
        : theme.colors.lightBgs[0],
    // backgroundImage:  "radial-gradient(#34354a 0.5px, transparent 0.5px), radial-gradient(#34354a 0.5px, #0e0f1e 0.5px)",
    position: "relative",
    minHeight: "100vh",
    paddingTop: "25px",
    paddingLeft: "25px",
    paddingRight: "25px",
  },
  scroll: {},
}));

export const Slayout: FC<SlayoutProps> = ({
  children,
  pgTitle,
  subtitle,
}: SlayoutProps) => {
  const { classes, theme, cx } = useSlayoutStyles();
  return (
    <Layout subtitle={pgTitle ? pgTitle : subtitle} pgTitle={pgTitle}>
      <ScrollArea style={{}} className={classes.container}>
        {children}
      </ScrollArea>
    </Layout>
  );
};
export interface SplayoutProps {
  children: React.ReactFragment;
  title: string;
  pgTitle?: string;
  sideChildren: React.ReactFragment;
  rightActions?: React.ReactFragment;
  leftActions?: React.ReactFragment;
}
export const Splayout: FC<SplayoutProps> = ({
  children,
  sideChildren,
  title,
  leftActions,
  rightActions,
}: SplayoutProps) => {
  const { classes, theme } = useSublayoutStyles();
  return (
    <Slayout>
      <>
        <Group style={{ minWidth: "100%" }} position="apart">
          <Group position="left">
            <Title className={classes.title} mr={8}>
              {title}
            </Title>
            {leftActions}
          </Group>

          <Group position="right">{rightActions}</Group>
        </Group>
        <Split sideChildren={sideChildren} sideSpan={4}>
          {children}
        </Split>
      </>
    </Slayout>
  );
};
export const SubLayout: FunctionComponent<SublayoutBasicProps> = ({
  title,
  children,
  leftChildren,
  rightChildren,
}: SublayoutBasicProps) => {
  const { classes } = useSublayoutStyles();
  return (
    <Layout>

      <ScrollArea className={classes.container}>
        <Group position="apart" noWrap grow>
          <Group position="left">
            <Title mr={8}>{title}</Title>
            {leftChildren}
          </Group>
          <Group position="right">{rightChildren}</Group>
        </Group>
        {children}

      </ScrollArea>
    </Layout>
  );
};
export const TabSublayout = ({ title, tabs, children }: SublayoutProps) => {
  const { classes } = useSublayoutStyles();
  return (
    <Layout>
      <>
        <ScrollArea className={classes.container}>
          {tabs ? (
            <>
              <Tabs
                color={"violet"}
                variant="pills"
                defaultValue={tabs[0].value}
              >
                <>
                  <CTitle
                    title={title}
                    leftContent={
                      <Tabs.List>
                        <>
                          {tabs.map((tab: SublayoutTabProps, index: number) => (
                            <Tabs.Tab
                              key={index}
                              value={tab.value}
                              icon={tab.icon}
                            >
                              <>{tab.label}</>
                            </Tabs.Tab>
                          ))}
                        </>
                      </Tabs.List>
                    }
                    rightContent={
                      <Button variant="outline">
                        <TbSettings></TbSettings>Configure
                      </Button>
                    }
                  />
                  {tabs
                    ? tabs.map((tab: SublayoutTabProps, index: number) => {
                        <Tabs.Panel value={tab.value}>
                          {tab.children}
                        </Tabs.Panel>;
                      })
                    : null}
                </>
              </Tabs>
            </>
          ) : (
            <>
              <CTitle title={title} />
              {children}
            </>
          )}
        </ScrollArea>
      </>
    </Layout>
  );
};
export default Slayout;
