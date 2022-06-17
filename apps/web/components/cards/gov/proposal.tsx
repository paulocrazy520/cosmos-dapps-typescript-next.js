// import { Card, Avatar, Text, Progress, Badge, Group, ActionIcon } from '@mantine/core';
// import { TbUpload } from 'react-icons/tb';
// import { Logo } from '../layout/logo';

import { ThemeContext } from "@emotion/react";
import {
  createStyles,
  Progress,
  Box,
  Text,
  Group,
  Paper,
  SimpleGrid,
  Card,
  useMantineTheme,
  Title,
  Tooltip,
  ThemeIcon,
  List,
  Button,
  Code,
} from "@mantine/core";
import {
  TbArrowDownLeft,
  TbArrowForward,
  TbArrowRight,
  TbArrowUpRight,
  TbCheck,
  TbDeviceAnalytics,
  TbInfoCircle,
  TbHash,
  TbPlus,
  TbTallymark1,
} from "react-icons/tb";
import { ActionBtn } from "../../buttons";
import { CardSubtitle } from "../../title";
import { Badge } from "@mantine/core";
import { useRouter } from "next/router";
import { useStyles } from "../../../modals";
import {
  Proposal,
  ProposalChange,
  ProposalStatus,
  ProposalTally,
} from "@/types/gov";
import { FunctionComponent } from "react";
import { proposalTally } from "@/lib/fn/gov";

const useProposalCardStyles = createStyles((theme) => ({
  proposal: {
    marginBottom: "24px",

    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
    "&:hover": {
      // backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
      boxShadow:
        theme.colorScheme === "dark"
          ? "0 0  7px rgba(0,0,0,0.35)"
          : "0 0 7px rgba(0,0,0,0.15)",
      transition: "all 0.2s ease-in-out",
      // transform: "scale(1.08)"
    },
  },
  progressLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },

  stat: {
    borderBottom: "3px solid",
    paddingBottom: 5,
  },

  statCount: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.3,
  },

  diff: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
}));

interface PropCardProps {
  total: string;
  id: number;
  description: string;
  titleMod: React.ReactNode;
  data: {
    label: string;
    count: string;
    part: number;
    color: string;
  }[];
}

export const ProposalCard: FunctionComponent<PropCardProps> = ({
  id,
  total,
  titleMod,
  data,
  description,
}: PropCardProps) => {
  const { classes, theme } = useProposalCardStyles();
  const { push } = useRouter();

  const segments = data.map((segment) => ({
    value: segment.part,
    color: segment.color,
    label: segment.part > 10 ? `${segment.part}%` : undefined,
  }));

  const descriptions = data.map((stat) => (
    <Box
      key={stat.label}
      sx={{ borderBottomColor: stat.color }}
      className={classes.stat}
    >
      <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
        {stat.label}
      </Text>

      <Group position="apart" spacing={0} noWrap>
        <Text weight={700}>{stat.count}</Text>
        <Text
          color={stat.color}
          weight={700}
          size="sm"
          className={classes.statCount}
        >
          {stat.part}%
        </Text>
      </Group>
    </Box>
  ));

  return (
    <Card
      mb={20}
      withBorder
      p="md"
      shadow="xl"
      radius="md"
      style={{
        backgroundColor:
          theme.colorScheme == "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[2],
      }}
    >
      <Card.Section
        withBorder
        p="sm"
        style={{
          backgroundColor:
            theme.colorScheme == "dark"
              ? theme.fn.darken(theme.colors.dark[6], 0.15)
              : theme.fn.darken(theme.colors.gray[1], 0.1),
        }}
      >
        <Group position="apart" spacing="xs" noWrap>
          <Group spacing="xs" noWrap>
            <ActionBtn
              label="More info"
              size="xs"
              variant="subtle"
              p="xs"
              icon={
                <>
                  <TbHash size={10} />
                  {id}
                </>
              }
              onClick={() => {
                push(`/governance/proposal/${id}`);
              }}
            />
            <Tooltip
              label={total}
              withArrow
              offset={10}
              transition={"slide-down"}
              position="bottom-end"
            >
              <Title
                size={16}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  push(`/governance/proposal/${id}`);
                }}
              >
                {total?.length > 43 ? total.substring(0, 40) + "..." : total}
              </Title>
            </Tooltip>
          </Group>
          <Group spacing="xs" position="right" grow>
            <ActionBtn
              label="More info"
              size="xs"
              variant="filled"
              p="xs"
              icon={<TbInfoCircle />}
              onClick={() => {
                push(`/governance/proposal/${id}`);
              }}
            />
          </Group>
        </Group>
      </Card.Section>
      <Card.Section p="md">
        <List
          size={"sm"}
          color="dimmed"
          mt={8}
          spacing="sm"
          center
          icon={
            <ThemeIcon color="violet" size={12} radius="sm">
              <TbPlus size={12} />
            </ThemeIcon>
          }
        >
          <List.Item color="dimmed">
            <Text color="dimmed">{description}</Text>
          </List.Item>
          <List.Item color="dimmed">{titleMod}</List.Item>
          {/* <List.Item>
                Submitted at: <Code>{ p.submit_time}</Code>
                </List.Item> */}
        </List>
      </Card.Section>
      <Card.Section
        withBorder
        p="md"
        style={{
          backgroundColor:
            theme.colorScheme == "dark"
              ? theme.fn.darken(theme.colors.dark[6], 0.0)
              : theme.fn.darken(theme.colors.gray[1], 0.0),
        }}
      >
        <Progress
          sections={segments}
          size={20}
          radius="md"
          classNames={{ label: classes.progressLabel }}
          mt={10}
        />
        <SimpleGrid
          cols={4}
          breakpoints={[{ maxWidth: "xs", cols: 1 }]}
          mt="xl"
        >
          {descriptions}
        </SimpleGrid>
      </Card.Section>
    </Card>
  );
};
type ProposalStatusProps = {
  status: ProposalStatus;
};
export const ProposalStatusBadge = ({ status }: ProposalStatusProps) => {
  switch (status) {
    case "PROPOSAL_STATUS_ACCEPTED":
      return (
        <Badge
          p="xs"
          style={{ verticalAlign: "center" }}
          size="xs"
          color={"green"}
        >
          Accepted
        </Badge>
      );
      break;
    case "PROPOSAL_STATUS_REJECTED":
      return (
        <Badge
          p="xs"
          style={{ verticalAlign: "center" }}
          size="xs"
          color={"red"}
        >
          Rejected
        </Badge>
      );
      break;
    case "PROPOSAL_STATUS_PENDING":
      return (
        <Badge
          p="xs"
          style={{ verticalAlign: "center" }}
          size="xs"
          color={"yellow"}
        >
          Pending
        </Badge>
      );
      break;
    default:
      return (
        <Badge
          p="xs"
          style={{ verticalAlign: "center" }}
          size="xs"
          color={"yellow"}
        >
          Pending
        </Badge>
      );
      break;
      return (
        <Badge
          p="xs"
          style={{ verticalAlign: "center" }}
          size="xs"
          color={"yellow"}
        >
          Pending
        </Badge>
      );
      break;
  }
};

export type ProposalProps = {
  proposal: Proposal;
};
export const ProposalCardWrapper: FunctionComponent<ProposalProps> = ({
  proposal,
}: ProposalProps) => {
  const { classes, theme } = useStyles();
  const { push } = useRouter();
  const tally = proposalTally(proposal, true);
  return (
    <ProposalCard
      description={proposal?.content?.description}
      id={parseInt(proposal?.proposal_id)}
      titleMod={<ProposalStatusBadge status={proposal?.status} />}
      data={[
        { color: "green", label: "Yes", count: tally?.yes.toString(), part: 0 },
        { color: "orange", label: "No", count: tally?.no.toString(), part: 0 },
        {
          color: "violet",
          label: "Abstain",
          count: tally?.abstain.toString(),
          part: 100,
        },
        {
          color: "red",
          label: "No With Veto",
          count: tally?.no_with_veto.toString(),
          part: 0,
        },
      ]}
      total={proposal?.content?.title}
    />
  );
};
const ProposalCardAlt: FunctionComponent<ProposalProps> = ({
  proposal,
}: ProposalProps) => {
  const { classes, theme } = useProposalCardStyles();
  const { push } = useRouter();
  return (
    <Card
      withBorder
      // onWaitingCapture={() => <Loader/>}
      className={classes.proposal}
      // draggable
      // onWaiting={() => {
      //   return <Loader/>
      // }}
      shadow={"lg"}
      radius={"md"}
      p={"md"}
    >
      <Card.Section mb={4} p="sm" withBorder>
        <Group position="apart" noWrap>
          <Group position="left" noWrap>
            <Button
              radius="sm"
              leftIcon={<TbHash />}
              size="sm"
              variant="subtle"
              p={"sm"}
              color={"violet"}
            >
              {proposal.proposal_id}
            </Button>
            <Tooltip
              label={proposal.content.title}
              withArrow
              offset={10}
              closeDelay={1000}
              transition={"slide-down"}
              position="bottom-end"
            >
              <Title
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  push(`/governance/proposal/${proposal.proposal_id}`);
                }}
              >
                {proposal.content.title.length > 33
                  ? proposal.content.title.substring(0, 30) + "..."
                  : proposal.content.title}
              </Title>
            </Tooltip>
          </Group>
          <Group position="right" grow>
            <>
              {status}
              <ActionBtn
                label="More info"
                size="sm"
                variant="filled"
                p="sm"
                icon={<TbArrowForward />}
                onClick={() => {
                  push(`/governance/proposal/${proposal.proposal_id}`);
                }}
              />
            </>
          </Group>
        </Group>
      </Card.Section>
      <Card.Section p="sm">
        <CardSubtitle divider title={"Overview"} />
        <List
          size={"sm"}
          mt={12}
          spacing="xs"
          center
          icon={
            <ThemeIcon color="violet" size={12} radius="sm">
              <TbPlus size={12} />
            </ThemeIcon>
          }
        >
          <List.Item>{proposal.content.description}</List.Item>
          <List.Item>
            Type: <Code>{proposal.content["@type"]}</Code>
          </List.Item>
          <List.Item>
            Submitted at: <Code>{proposal.submit_time}</Code>
          </List.Item>
        </List>
      </Card.Section>
      <Card.Section p="sm">
        <CardSubtitle divider title={"Changes"} />
        <List
          size={"xs"}
          mt={12}
          spacing="xs"
          center
          icon={
            <ThemeIcon color="violet" size={12} radius="sm">
              <TbPlus size={12} />
            </ThemeIcon>
          }
        >
          {proposal.content.changes.map((c: ProposalChange, i: number) => (
            <List.Item key={i}>
              <Group spacing="xs" position="left">
                <Badge size="xs" mr={4}>
                  {c.subspace}
                </Badge>
                <Text>{c.key} </Text>
                <TbArrowRight />
                <Text> {c.value} </Text>
              </Group>
            </List.Item>
          ))}
        </List>
      </Card.Section>
      <Card.Section p="sm">
        <CardSubtitle divider icon={<TbCheck />} title="Votes" />

        {/* <Text>
              { Date.parse(p.voting_start_time) }
              { Date.parse(p.voting_end_time) } */}
        <br />
      </Card.Section>
    </Card>
  );
};
