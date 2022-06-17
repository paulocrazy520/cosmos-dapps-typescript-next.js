import { Tabs, TabsProps } from "@mantine/core";
import { useState } from "react";
import { TbPhoto, TbMessageCircle, TbSettings } from "react-icons/tb";

function StyledTabs(props: TabsProps) {
  return (
    <Tabs
      unstyled
      styles={(theme) => ({
        tab: {
          ...theme.fn.focusStyles(),
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[0]
              : theme.colors.gray[9],
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[4]
          }`,
          padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
          cursor: "pointer",
          fontSize: theme.fontSizes.sm,
          display: "flex",
          alignItems: "center",

          "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
          },

          "&:not(:first-of-type)": {
            borderLeft: 0,
          },

          "&:first-of-type": {
            borderTopLeftRadius: theme.radius.md,
            borderBottomLeftRadius: theme.radius.md,
          },

          "&:last-of-type": {
            borderTopRightRadius: theme.radius.md,
            borderBottomRightRadius: theme.radius.md,
          },

          "&[data-active]": {
            backgroundColor: theme.colors.blue[7],
            borderColor: theme.colors.blue[7],
            color: theme.white,
          },
        },

        tabTb: {
          marginRight: theme.spacing.xs,
          display: "flex",
          alignItems: "center",
        },

        tabsList: {
          display: "flex",
        },
      })}
      {...props}
    />
  );
}
export interface GroupTabProps {
  name: string;
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}
export interface GroupTabsProps {
  color: string;
  tabs: GroupTabProps[];
}

export function GroupedTabs({ color, tabs }: GroupTabsProps) {
  const [current, setCurrent] = useState(0);
  return (
    <StyledTabs>
      <Tabs.List>
        {tabs.map((tab, index) => (
          <Tabs.Tab key={index} value={tab.name} icon={tab.icon}>
            {tab.children}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </StyledTabs>
  );
}
