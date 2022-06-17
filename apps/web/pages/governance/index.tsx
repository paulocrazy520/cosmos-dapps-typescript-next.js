import {
  Badge,
  Button,
  Card,
  Code,
  createStyles,
  Divider,
  Grid,
  Group,
  List,
  Loader,
  Paper,
  RingProgress,
  ScrollArea,
  Skeleton,
  Tabs,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { NextPageContext } from "next";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import {
  TbPhoto,
  TbMessageCircle,
  TbSettings,
  TbExchange,
  TbHistory,
  TbActivity,
  TbPlus,
  TbCode,
  TbFilter,
  TbActivityHeartbeat,
  TbCheck,
  TbMinus,
  TbArrowRight,
  TbArrowForward,
  TbHash,
  TbArrowDownRightCircle,
} from "react-icons/tb";
import { ActionBtn } from "../../components/buttons";
import {
  ProposalCard,
  ProposalCardWrapper,
} from "../../components/cards/gov/proposal";
import { SearchInput } from "../../components/input/search";
import { LayoutCard } from "../../components/cards";
import Split from "../../components/layout/split";
import { Slayout } from "../../components/layout/sublayout";
import { CardSubtitle } from "../../components/title";
import { CreatePoolModal } from "../../modals/create-pool";
import { useStore } from "../../stores";
import { Proposal } from "../../types/gov";
import { apiGet, apiUrl } from "../../lib/api";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import { TabsTitle, TitleButtons } from "@/cmp/layout/title";
import { violet } from "@/cfg/theme";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getProposals } from "@/lib/fn/gov/fetch";
import { AllProposals } from "@/cmp/pages/gov";

const useGovStyle = createStyles((theme) => ({
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
}));

export interface GovProps {
  // proposals: Proposal[]
}
export const Governance = observer(({}: GovProps) => {
  const {
    data: props,
    isFetching,
    error,
    isFetched,
    isLoading,
  } = useQuery(["ollo", "gov", "proposals"], () => getProposals(), {
    // initialData: proposals,
    retryOnMount: true,
    retry: true,
    retryDelay: 10000,
  });
  const { accountStore, assetsStore } = useStore();
  const { classes, theme } = useGovStyle();
  const { modals, openModal, openConfirmModal, openContextModal } = useModals();
  // const AllProps = dynamic(() => import("@/cmp/pages/gov/all"), {
  //   suspense: true
  // })
  return (
    <Slayout pgTitle="Governance">
      <TabsTitle
        title="Governance"
        defaultVal="active"
        rightActions={
          <TitleButtons
            buttons={[
              {
                label: "Create",
                leftIcon: <TbPlus />,
                variant: "filled",
                tooltip: "Create a new pre-proposal for discussion",
                color: violet(theme),
                p: "sm",
                size: "sm",
                onClick: () => {
                  openModal({
                    title: "Create a new proposal",
                    centered: true,
                    closeOnEscape: true,
                    closeButtonLabel: "Cancel",
                    withCloseButton: true,
                    radius: "md",
                    overlayBlur: 3,
                    overlayOpacity: 0.5,
                    closeOnClickOutside: true,
                    onClose: () => {
                      showNotification({
                        title: "You tried",
                        message: "You tried to close the modal",
                      });
                    },
                  });
                },
              },
              {
                label: "Check",
                leftIcon: <TbCheck />,
                variant: "default",
                tooltip: "Check your vote history",
                p: "sm",
                size: "sm",
                onClick: () => {
                  showNotification({ title: "Check", message: "Checking" });
                },
              },
            ]}
          />
        }
        tabs={[
          {
            title: "Active",
            value: "active",
            icon: <TbActivity size={18} />,
            children: (
              <Paper shadow="md" p="md">
                <Tabs color={"violet"} variant="pills" defaultValue="all">
                  <Group position="apart">
                    <Group position="left">
                      <Title mr={"8px"} size={24} mb={20}>
                        Proposals
                      </Title>
                      <Tabs.List>
                        <Tabs.Tab value="all" icon={<TbActivity size={18} />}>
                          All
                        </Tabs.Tab>
                        <Tabs.Tab value="passed" icon={<TbCheck size={18} />}>
                          Passed
                        </Tabs.Tab>
                        <Tabs.Tab value="failed" icon={<TbMinus size={18} />}>
                          Failed
                        </Tabs.Tab>
                      </Tabs.List>
                    </Group>
                    <Group position="right">
                      <Button size="sm" variant="default" mr={2}>
                        <TbFilter />
                        &nbsp;Filter
                      </Button>
                    </Group>
                  </Group>
                  <Tabs.Panel value="all">
                    <br />
                    <AllProposals {...{ proposals: props }} />
                    {/* <Suspense fallback={<Loader m={17} />}> */}
                    {/*   <AllProps {...{ proposals: props }} /> */}
                    {/* </Suspense> */}
                  </Tabs.Panel>
                  <Tabs.Panel value="passed">
                    <br />
                  </Tabs.Panel>
                  <Tabs.Panel value="failed">
                    <br />
                  </Tabs.Panel>
                </Tabs>
              </Paper>
            ),
          },
          {
            title: "History",
            value: "history",
            icon: <TbHistory size={18} />,
            children: (
              <Split
                sideChildren={
                  <>
                    <LayoutCard top={true} title="Overview">
                      <Text>
                        Total number of proposals: {Array(props).length}
                      </Text>
                    </LayoutCard>
                    <LayoutCard top={false} title="Your Votes"></LayoutCard>
                  </>
                }
              >
                <LayoutCard
                  top={true}
                  title="Past Proposals"
                  actions={
                    <Button
                      size="sm"
                      variant="default"
                      mr={2}
                      onClick={() => {}}
                    >
                      <TbFilter />
                      &nbsp;Filter
                    </Button>
                  }
                ></LayoutCard>
              </Split>
            ),
          },
        ]}
      />
    </Slayout>
  );
});
export default Governance;

// export async function getServerSideProps(ctx: NextPageContext) {
//   const proposals = await getProposals()
//   return {
//     props: {
//       proposals
//     }
//   }
// }
