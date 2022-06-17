import { observer } from "mobx-react-lite";
import { Proposal, ProposalChange, ProposalStatus } from "../../../types/gov";
import { FunctionComponent, useEffect } from "react";
import { Slayout } from "../../../components/layout/sublayout";
import Split from "../../../components/layout/split";
import { LayoutCard } from "../../../components/cards/card";
import { useRouter } from "next/router";
import { apiGet, apiUrl } from "../../api";
import {
  Badge,
  Box,
  Button,
  Code,
  Group,
  List,
  Space,
  Tabs,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageContext,
} from "next";
import {
  TbActivity,
  TbArrowBack,
  TbArrowRight,
  TbCircle,
  TbDots,
  TbHistory,
  TbPlus,
  TbPodium,
} from "react-icons/tb";
import { defaultModal } from "../../../modals";
import { showNotification } from "@mantine/notifications";
import { ActionBtn } from "../../../components/buttons";

type ProposalPageProps = {
  id: string;
  proposal: Proposal;
};
export const ProposalPage: FunctionComponent<ProposalPageProps> = observer(
  ({ id, proposal }: ProposalPageProps) => {
    const { back } = useRouter();
    const theme = useMantineTheme();
    let status: JSX.Element;
    switch (proposal.status) {
      case "PROPOSAL_STATUS_ACCEPTED":
        status = <Text>Accepted</Text>;
        break;
      case "PROPOSAL_STATUS_REJECTED":
        status = (
          <Badge size={"sm"} color={"red"}>
            Rejected
          </Badge>
        );
        break;
      case "PROPOSAL_STATUS_PENDING":
        status = (
          <Badge size={"sm"} color={"yellow"}>
            Pending
          </Badge>
        );
        break;
      default:
        status = <Text>{proposal.status}</Text>;
    }
    return (
      <Slayout>
        <Tabs color={"violet"} variant="pills" defaultValue="active">
          <Group style={{ minWidth: "100%" }} position="apart">
            <Group position="left" radioGroup="">
              <ActionBtn
                label="Go back to gov"
                onClick={() => back()}
                icon={<TbArrowBack size={16} />}
              />
              <Title mr={10}>Governance</Title>
              <Group position="center">
                <Title
                  style={{ verticalAlign: "bottom" }}
                  pt={10}
                  mr={0}
                  size={20}
                >
                  <ThemeIcon color="violet" size={16} radius="xl">
                    <TbPodium size={16} />
                  </ThemeIcon>
                  &nbsp; Proposal {id}: {proposal.content.title}
                </Title>
              </Group>
              {/* <Tabs.List tabIndex={0} >
            <Tabs.Tab value="active" icon={<TbActivity size={18} />}>
              Active
            </Tabs.Tab>
            <Tabs.Tab value="history" icon={<TbHistory size={18} />}>
              History
              </Tabs.Tab>
        </Tabs.List> */}
            </Group>
            <Group position="right">
              <Button
                onClick={() => {
                  defaultModal({
                    title: "Create a new proposal",
                    children: <Box>Test</Box>,
                    onClose: () => {
                      showNotification({
                        title: "You tried",
                        message: "You tried to close the modal",
                      });
                    },
                  });
                }}
                variant="default"
                color="violet"
              >
                <TbPlus />
                &nbsp;Vote
              </Button>
            </Group>
          </Group>
          <Tabs.Panel value="active">
            <Split
              sideChildren={
                <>
                  <LayoutCard title="Proposal Info">
                    <List
                      spacing="sm"
                      icon={
                        <ThemeIcon color="blue" size={12} radius="sm">
                          <TbDots size={12} />
                        </ThemeIcon>
                      }
                    >
                      <List.Item>Title: {proposal.content.title}</List.Item>
                      <List.Item>
                        Description: {proposal.content.description}
                      </List.Item>
                      <List.Item>
                        Submitted: <Code>{proposal.submit_time}</Code>
                      </List.Item>
                      <List.Item>
                        Deposit:{" "}
                        {parseInt(
                          proposal.total_deposit.find(
                            (c) => c.denom == "utollo"
                          ).amount
                        ) / 1000000}{" "}
                        TOLLO
                      </List.Item>
                      <List.Item>
                        <Group position="left">Status: {status}</Group>
                      </List.Item>
                    </List>
                  </LayoutCard>
                  <LayoutCard title="Changes">
                    <List
                      spacing="sm"
                      icon={
                        <ThemeIcon color="violet" size={12} radius="sm">
                          <TbPlus size={12} />
                        </ThemeIcon>
                      }
                    >
                      {proposal.content.changes.map(
                        (c: ProposalChange, i: number) => (
                          <List.Item mt={8} key={i}>
                            <Group spacing="xs" position="left">
                              <Badge size="xs" mr={4}>
                                {c.subspace}
                              </Badge>
                              <Text>{c.key} </Text>
                              <TbArrowRight />
                              <Text> {c.value} </Text>
                            </Group>
                          </List.Item>
                        )
                      )}
                    </List>
                  </LayoutCard>
                </>
              }
            >
              <LayoutCard
                title={"Proposal " + id + ": " + proposal.content.title}
                actions={
                  <>
                    <Button
                      onClick={() => {
                        defaultModal({
                          title: "Create a new proposal",
                          children: <Box>Test</Box>,
                          onClose: () => {
                            showNotification({
                              title: "You tried",
                              message: "You tried to close the modal",
                            });
                          },
                        });
                      }}
                      variant="default"
                      color="violet"
                    >
                      <TbPlus />
                      &nbsp;Vote
                    </Button>
                  </>
                }
              >
                {status}
                <Title>Description</Title>
                {proposal.content.description}
                <Space h={20} />
                <Title>Status</Title>
                {status}
              </LayoutCard>
            </Split>
          </Tabs.Panel>
          <Tabs.Panel value="history">Proposal</Tabs.Panel>
        </Tabs>
      </Slayout>
    );
  }
);

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  context.res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  const proposal = await apiGet("cosmos/gov/v1beta1/proposals/" + id).then(
    (r) => r.proposal
  );
  // return error? {
  //     redirect: {
  //         destination: "/governance",
  //         permanent: false
  //     }
  // } :{
  console.log(proposal);
  return {
    props: {
      id,
      proposal,
    },
  };
}

export default ProposalPage;
