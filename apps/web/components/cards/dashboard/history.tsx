import { Split } from "@/cmp/layout";
import { Timeline, Text } from "@mantine/core";
import { FunctionComponent } from "react";
import {
  TbGitBranch,
  TbGitCommit,
  TbGitPullRequest,
  TbMessage,
} from "react-icons/tb";
import { useStore } from "@/stores/index";
import { useQueries } from "@tanstack/react-query";
import { getTxsBySender } from "@/lib/fn/user";
import { toDay } from '@/lib/utils'
import { useRouter } from "next/router";
import { LayoutCard } from "..";


export const HistoryTab: FunctionComponent<{}> = ({ }) => {
  const { accountStore, chainStore} = useStore();
  const { chainId } = chainStore.ollo;
  const { bech32Address, name, walletStatus } =
      accountStore.getAccount(chainId);
  const [{ data: txs }] = useQueries({
      queries: [
        {
          queryKey: ["sender", bech32Address],
          // queryFn: () => getTxsBySender("ollo1tzt2x9cay58zrpzhftj4jdfzvap5h52qdrqv2u"),
          queryFn: () => getTxsBySender(bech32Address),
          initialData: []
        },
      ],
  });
  const router = useRouter();
  return (
    // <Split sideChildren={<></>}>
      <LayoutCard title="Transaction History" top={false}>
        <Timeline active={txs?.length} bulletSize={24} lineWidth={2}>
          { txs?.length ? txs.map((tx, index) => {
            return (
              <Timeline.Item
                key={"txhistory_" + index}
                bullet={<TbGitBranch size={12} />}
                title={<Text variant="link" component="span" onClick={() => {
                  router.push("https://explorer.ollo.zone/ollo/tx/" + tx.txhash)
                }} inherit>
                    {"HASH: " + tx.txhash}
                  </Text>}
              >
                <Text color="dimmed" size="sm">
                  New Transaction is created at blockheight {" "}
                  <Text variant="link" component="span" onClick={() => {
                  router.push("https://explorer.ollo.zone/ollo/blocks/" + tx.height)
                  }} inherit>
                    { tx.height}
                  </Text>
                </Text>
                <Text size="xs" mt={4}>
                  {toDay(tx.timestamp, 'from')}
                </Text>
              </Timeline.Item>
          )
        }) : ( <></>)
        }
        </Timeline>
      </LayoutCard>
    // </Split>
  );
};
