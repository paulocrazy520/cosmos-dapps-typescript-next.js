import {
  Anchor,
  Avatar,
  Badge,
  Loader,
  MantineTheme,
  Progress,
  Skeleton,
  Switch,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import {
  Table,
  Modal,
  Container,
  createStyles,
  Title,
  Group,
  Divider,
  Paper,
  Text,
  ScrollArea,
  Tabs,
  RingProgress,
  Button,
  ActionIcon,
  List,
  ThemeIcon,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useLocalStorage } from "@mantine/hooks";
import { Validator } from "@/types/staking";
import { useStore } from "../../../stores";
import { useEffect, useState } from "react";
import { endpoints } from "@/lib/api";
import { StargateClient } from "@cosmjs/stargate";
import { ValidatorTableRow } from "./row";
import { subS } from "@/lib/util";
import { Suspense } from "react";
import dynamic from "next/dynamic";

export declare type ValidatorTableProps = {
  validators: Validator[];
};

export const valildatorStyles = createStyles((theme) => ({}));
export function ValidatorTable({ validators }: ValidatorTableProps) {
  const { push, isReady } = useRouter();
  const {
    accountStore,
    chainStore: {
      ollo: { chainId },
    },
  } = useStore();
  const { bech32Address } = accountStore.getAccount(chainId);
  const [bal, setBal] = useLocalStorage<number>({
    key: "balance-tollo",
    defaultValue: 0,
  });
  const [staked, setStaked] = useState(0);
  const [page, setPage] = useState(0);
  // const Row = dynamic(() => import("./row"), {
  //   suspense: true,
  // })

  // useEffect(() => {
  //   StargateClient.connect(endpoints.rpc)
  //     .then((r) => {
  //       bech32Address && r.getBalance(bech32Address, "utollo")
  //         .then((r) => setBal(parseInt(r.amount)))
  //       bech32Address && r.getBalanceStaked(bech32Address)
  //         .then((r) => setStaked(parseInt(r.amount)))
  //     })
  //   console.log("STARGATE", bech32Address, bal, staked)

  // }, [vs])
  return (
    <Table
      highlightOnHover
      fontSize={"sm"}
      sx={{}}
      horizontalSpacing="xs"
      verticalSpacing="xs"
    >
      <thead
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <tr>
          <th></th>
          <th>Moniker</th>
          <th>Tokens</th>
          <th>Voting Power</th>
          <th>Uptime</th>
          <th>Manage</th>
        </tr>
      </thead>
      <tbody>
        {/* <Suspense fallback={<Loader m={15} />}> */}

        {validators
          .sort((a, b) => subS(b.tokens, a.tokens))
          .map((v: Validator, i: number, vs: Validator[]) => (
            <ValidatorTableRow
              key={i}
              {...{ v, i, vs, u: { addr: bech32Address, balance: bal } }}
            />
          ))}
        {/* </Suspense> */}
      </tbody>
    </Table>
  );
}
