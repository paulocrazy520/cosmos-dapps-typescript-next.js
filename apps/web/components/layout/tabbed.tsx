import {
  createStyles,
  Grid,
  Group,
  ScrollArea,
  Tabs,
  Title,
} from "@mantine/core";
import { Layout } from ".";

const useTabbedLayoutStyles = createStyles((theme: any) => ({
  container: {
    maxWidth: "100vw",
    backgroundColor: theme.colors.bgs[0],
    // backgroundImage:  "radial-gradient(#34354a 0.5px, transparent 0.5px), radial-gradient(#34354a 0.5px, #0e0f1e 0.5px)",
    position: "relative",
    minHeight: "100vh",
    paddingTop: "25px",
    paddingLeft: "25px",
    paddingRight: "25px",
  },
  title: {},
}));
export declare interface TabbedLayoutProps {
  title: string;
  rightChildren?: JSX.Element;
  tabs: {
    value: string;
    label: string;
    icon: JSX.Element;
    children: JSX.Element;
  }[];
}
export const TabbedLayout = ({
  title,
  tabs,
  rightChildren,
}: TabbedLayoutProps) => {
  const { classes } = useTabbedLayoutStyles();
  return (
    <Layout>
      <ScrollArea className={classes.container}>
        <Tabs defaultValue={tabs[0].value} color={"violet"} variant={"pills"}>
          <>
            <Group position="apart">
              <Group position="left">
                <Title mr={8}>
                  <>{title}</>
                </Title>
                <Tabs.List>
                  {tabs.map((tab, i) => {
                    return (
                      <Tabs.Tab key={i} value={tab.value} icon={tab.icon}>
                        {tab.label}
                      </Tabs.Tab>
                    );
                  })}
                </Tabs.List>
              </Group>
              <Group position="right">
                {rightChildren ? rightChildren : <></>}
              </Group>
            </Group>
            {tabs.map((tab) => {
              <Tabs.Panel value={tab.value}>{tab.children}</Tabs.Panel>;
            })}
          </>
        </Tabs>
      </ScrollArea>
    </Layout>
  );
};
