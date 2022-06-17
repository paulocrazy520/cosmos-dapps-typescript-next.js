import { Tabs, Group, Title, Button, Box } from "@mantine/core";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import {
  TbActivity,
  TbHistory,
  TbMessage,
  TbUser,
  TbUserCheck,
} from "react-icons/tb";
import { LayoutCard } from "../../../components/cards/card";
import Split from "../../../components/layout/split";
import { Slayout } from "../../../components/layout/sublayout";
import { defaultModal } from "../../../modals";

export declare interface OlloUserProps {}
export const OlloUser: FunctionComponent<OlloUserProps> = ({}) => {
  const { query } = useRouter();
  const { olloname } = query;
  return (
    <Slayout pgTitle={olloname as string}>
      <Tabs color={"violet"} variant="pills" defaultValue="profile">
        <Group position="apart" sx={{ minWidth: "100%" }}>
          <Group position="left">
            <Title mr={10}>{olloname as string}</Title>
            <Tabs.List>
              <Tabs.Tab value="profile" icon={<TbUser size={18} />}>
                Profile
              </Tabs.Tab>
              <Tabs.Tab value="activity" icon={<TbActivity size={18} />}>
                Activity
              </Tabs.Tab>
            </Tabs.List>
          </Group>
          <Group position="right">
            <Button.Group>
              <Button
                onClick={() => {
                  defaultModal({
                    title: ("Follow " + olloname) as string,
                    children: <Box></Box>,
                  });
                }}
                variant="default"
              >
                <TbUserCheck></TbUserCheck>&nbsp;Follow
              </Button>
              <Button
                onClick={() => {
                  defaultModal({
                    title: ("Message " + olloname) as string,
                    children: <Box></Box>,
                  });
                }}
                variant="default"
              >
                <TbMessage></TbMessage>&nbsp;Message
              </Button>
            </Button.Group>
          </Group>
        </Group>
        <Tabs.Panel value="profile">
          <Split
            sideChildren={
              <>
                <LayoutCard title={olloname as string}></LayoutCard>
                <LayoutCard title="Recent Activity"></LayoutCard>
              </>
            }
          >
            <LayoutCard title="Profile"></LayoutCard>
            <LayoutCard title="Addresses"></LayoutCard>
          </Split>
        </Tabs.Panel>
        <Tabs.Panel value="activity"></Tabs.Panel>
      </Tabs>
    </Slayout>
  );
};

export default OlloUser;
