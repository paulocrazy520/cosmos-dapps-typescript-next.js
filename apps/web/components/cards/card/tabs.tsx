import { violet } from "@/cfg/theme";
import React from "react";
import { createStyles, MantineTheme, Tabs } from "@mantine/core";
import { TbDashboard } from "react-icons/tb";
import { LayoutCard } from "..";

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
  protected classes: any;

  constructor({ title, value, children, icon }: LayoutTabProps) {
    this.props = { title, value, children, icon };
    // const { classes } = useBaseTabsTheme();
    // this.classes = tab
  }
  tab(index: number) {
    return (
      <Tabs.Tab
        tabIndex={index}
        value={this.props.value}
        icon={this.props.icon ? this.props.icon : <TbDashboard />}
      >
        {this.props.title}
      </Tabs.Tab>
    );
  }
  panel(index: number) {
    return (
      <Tabs.Panel key={`tab-card-${index}`} value={this.props.value}>
        <> {this.props.children}</>
      </Tabs.Panel>
    );
  }
}
export class LayoutTabs {
  protected props: LayoutTabsProps;
  protected tabs: LayoutTab[];

  constructor(props: LayoutTabsProps) {
    this.props = props;
    this.tabs = props.tabs.map((tab: LayoutTabProps) => {
      return new LayoutTab(tab);
    });
  }

  card(): React.ReactElement {
    // const { classes, theme } = useBaseTabsTheme();
    return (
      <Tabs
        // p={"xs"}
        radius={"sm"}
        // className={classes.tabs}
        color={"violet"}
        variant="pills"
        defaultValue={this.props.default}
      >
        <LayoutCard
          top={this.props.top}
          title={this.props.title}
          actions={this.list()}
        >
          {this.panel()}
        </LayoutCard>
      </Tabs>
    );
  }
  panel(): JSX.Element {
    return (
      <Tabs.Panel value={this.props.default}>
        {this.tabs.map((t: LayoutTab, index) => t.panel(index))}
      </Tabs.Panel>
    );
  }

  list(): JSX.Element {
    return (
      <Tabs.List position="right">
        {this.tabs.map((t: LayoutTab, index) => (
          <div key={`layout-tab-${index}`}>{t.tab(index)}</div>
        ))}
      </Tabs.List>
    );
  }
}
export default LayoutTabs;

export const LayoutTabCard = (props: LayoutTabsProps) => {
  const tc = new LayoutTabs(props).card();
  return <>{tc}</>;
};
