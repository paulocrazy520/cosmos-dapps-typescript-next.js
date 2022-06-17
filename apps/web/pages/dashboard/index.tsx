import { observer } from "mobx-react-lite";
import { BsDash, BsClockHistory } from "react-icons/bs";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import {
  Button,
  createStyles,
  Grid,
  Group,
  ScrollArea,
  Tabs,
  Title,
} from "@mantine/core";
import { TbDashboard, TbHistory, TbSettings } from "react-icons/tb";
import { TabbedLayout } from "../../components/layout/tabbed";

export const DashboardOverview: FunctionComponent<{}> = observer(() => {
  return <h1> TAB 1</h1>;
});
export const DashboardHistory: FunctionComponent<{}> = observer(() => {
  return (
    <Grid>
      <Grid.Col span={4}></Grid.Col>
      <Grid.Col span={4}></Grid.Col>
    </Grid>
  );
});

export const Dashboard: FunctionComponent<{}> = observer(() => {
  const router = useRouter();
  const tabs = [
    {
      value: "overview",
      label: "Overview",
      icon: <BsDash />,
      children: (
        <>
          <DashboardOverview />
        </>
      ),
    },
    {
      value: "history",
      label: "history",
      icon: (
        <>
          <BsClockHistory />
        </>
      ),
      children: <DashboardHistory />,
    },
  ];
  return (
    <TabbedLayout
      title="Dashboard"
      rightChildren={
        <Button onClick={() => router.push("/dashboard/new")}>
          <TbSettings />
          &nbsp;Settings
        </Button>
      }
      tabs={tabs}
    />
  );
});

export default Dashboard;
