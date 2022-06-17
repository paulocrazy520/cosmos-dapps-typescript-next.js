import { Grid, Tabs, Text, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { defaultModal } from "../../../modals";
import { showNotification } from "@mantine/notifications";
import { TbMessage, TbPodium } from "react-icons/tb";
import { Proposal } from "../../../types/gov";

export type VoteModalProps = {
  proposal: Proposal;
};
export const openVoteModal = (proposal: Proposal) => {
  defaultModal({
    title: "Manage proposal " + proposal.proposal_id,
    onClose: () => {
      showNotification({
        title: "Closed",
        message: "You closed the modal",
      });
    },
    children: <VoteModal proposal={proposal} />,
  });
};
export const VoteModal: FC<VoteModalProps> = ({ proposal }: VoteModalProps) => {
  return (
    <Grid>
      <Grid.Col span={6}>
        <Title order={3}>{proposal.content.title}</Title>
        <Text color={"dimmed"}>{proposal.content.description}</Text>
      </Grid.Col>

      <Grid.Col span={6}>
        <Tabs color={"violet"} defaultValue={"vote"} variant="pills">
          <Tabs.List>
            <Tabs.Tab icon={<TbPodium />} value="vote">
              Vote
            </Tabs.Tab>
            <Tabs.Tab icon={<TbMessage />} value="info">
              Info
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Grid.Col>
    </Grid>
  );
};
