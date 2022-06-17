import { violet } from "@/cfg/theme";
import React from "react";
import { createStyles, MantineTheme, Tabs } from "@mantine/core";
import { TbDashboard } from "react-icons/tb";
import { LayoutCard } from "../cards";

export const useBaseTabsTheme = createStyles((theme: MantineTheme) => ({
  tab: {},
  tabs: {},
}));
export interface LayoutTabProps {
  title: string;
  value: string;
  icon?: JSX.Element;
  children: React.ReactNode;
}
export interface LayoutTabsProps {
  title: string;
  default: string;
  tabs: LayoutTabProps[];
  top?: boolean;
  actions?: JSX.Element;
}
export class LayoutTab {
  protected props: LayoutTabProps;
  // protected classes: any

  constructor({ title, value, children, icon }: LayoutTabProps) {
    this.props = { title, value, children, icon };
    // const { classes: { tab } } = useBaseTabsTheme();
    // this.classes = tab
  }
  tab() {
    return (
      <Tabs.Tab
        value={this.props.value}
        icon={this.props.icon ? this.props.icon : <TbDashboard />}
      >
        {this.props.title}
      </Tabs.Tab>
    );
  }
  panel() {
    return (
      <Tabs.Panel value={this.props.value}>
        <> {this.props.children}</>
      </Tabs.Panel>
    );
  }
}
export const LayoutTabs = (props: LayoutTabsProps): React.ReactElement => {
  const { classes, theme } = useBaseTabsTheme();
  const ts = props.tabs.map((tab: LayoutTabProps) => {
    return new LayoutTab(tab);
  });
  const list = (
    <Tabs.List position="right">{ts.map((t: LayoutTab) => t.tab())}</Tabs.List>
  );
  const panel = (
    <Tabs.Panel value={props.default}>
      {ts.map((t: LayoutTab) => t.panel())}
    </Tabs.Panel>
  );
  return (
    <Tabs
      p={"xs"}
      radius={"sm"}
      className={classes.tabs}
      color={violet(theme)}
      variant="pills"
      defaultValue={props.default}
    >
      <LayoutCard top={props.top} title={props.title} actions={list}>
        {panel}
      </LayoutCard>
    </Tabs>
  );
};
