import {
  Anchor,
  Avatar,
  Badge,
  Loader,
  Progress,
  SegmentedControl,
  Skeleton,
  Space,
  Switch,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { statusReadable } from "@/lib/fn/stake/util";
import {
  Box,
  Grid,
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
import {
  getOlloRewards,
  getOlloValidatorRewards,
  getOlloBalance,
} from "@/lib/fn/user";
import { TbPlus, TbSettings } from "react-icons/tb";
import { useRouter } from "next/router";
import DelegationModal, {
  openDelegationModal,
} from "@/components/modal/delegation/modal";
import { useEffect, useState } from "react";
import { ActionBtn } from "../../buttons";
import { useQuery } from "@tanstack/react-query";
import { useKeplr } from "@/hooks/use-keplr";
import { OfflineAminoSigner } from "@keplr-wallet/types";
import {
  getOlloApiBalance,
  getOlloClientBalance,
  getOlloClientStakedBalance,
} from "@/lib/fn/bank/balance";
import { useStore } from "../../../stores";
import { amt } from "@/lib/util";
import { getDelegations } from "@/lib/fn/stake";
import { endpoints } from "@/lib/api";
import { Keplr } from "@keplr-wallet/types";
import { showNotification } from "@mantine/notifications";
import { GasSimulator } from "@keplr-wallet/hooks";
import { claimOlloValidatorRewards } from "@/lib/fn";
import { validatorFromDelegation } from "./util";
import { DelegationResponse, Validator } from "@/types/staking";
import { ValidatorReward } from "@/types/distribution";
import { useCallback } from "react";
import { olloKeplrChainInfo } from "@/config/ollo";
import { DeliverTxResponse, SigningStargateClient } from "@cosmjs/stargate";
import { AccountData, Coin } from "@keplr-wallet/types";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { defaultOlloGas } from "@/lib/fn/tx";
import { delegatorb } from "@/lib/util/color";

export type DelegationRowProps = {
  balance: Coin;
  index: number;
  bech32Address: string;
  delegation: DelegationResponse;
  reward: ValidatorReward;
  validator: Validator;
  validators: Validator[];
};
const useStyles = createStyles((theme) => ({
  modal: {},
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `3px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

export const DelegationRow = ({
  validators,
  balance,
  bech32Address,
  delegation,
  index,
  validator,
  reward,
}: DelegationRowProps) => {
  // const g = useKeplr().getKeplr().then((r) => r.signEthereum)
  const { classes, theme } = useStyles();

  const router = useRouter();
  const { accountStore } = useStore();
  const { init, getKeplr, ollo } = accountStore.getAccount(
    olloKeplrChainInfo.chainId
  );

  const claimRewards = () => {
    // claimOlloValidatorRewards(delegation.delegation.delegator_address, delegation.delegation.validator_address, k, "")
  };
  const rank = validators.findIndex(
    (v: Validator) =>
      v.operator_address == delegation.delegation.validator_address
  );
  const rankb = (
    <Badge
      color={
        rank <= 10
          ? "teal"
          : rank <= 50
          ? "green"
          : rank <= 100
          ? "yellow"
          : rank <= 150
          ? "orange"
          : rank <= 200
          ? "maroon"
          : rank <= 250
          ? "pink"
          : rank <= 300 && "grape"
      }
    >
      {rank}
    </Badge>
  );
  const status =
    validator &&
    statusReadable({ status: validator.status, jailed: validator.jailed });
  return (
    <tr key={delegation.delegation.validator_address}>
      <td>
        {" "}
        <Badge size="xs" variant="light" color={delegatorb(index)}>
          {index + 1}
        </Badge>{" "}
      </td>
      <td>
        <Tooltip label={delegation.delegation.validator_address} withArrow>
          <Anchor<"a">
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              router.push(
                "/stake/validator/" + delegation.delegation.validator_address
              );
            }}
          >
            <Group position="left">
              <Avatar size={"sm"} src="/images/TOLLO.svg"></Avatar>
              {validator
                ? validator.description?.moniker
                : delegation.delegation.validator_address}
            </Group>
          </Anchor>
        </Tooltip>
      </td>
      <td>{rankb}</td>

      <td>
        {(parseInt(delegation.balance.amount) / 1000000).toFixed(0)}&nbsp;
        <Badge
          size="sm"
          color={
            theme.colorScheme == "dark"
              ? theme.colors.teal[5]
              : theme.colors.teal[8]
          }
        >
          TOLLO
        </Badge>
      </td>
      <td>
        {(
          parseInt(
            reward.reward.find((c: Coin) => c.denom == "utollo").amount
          ) / 1000000
        ).toFixed(2)}
        &nbsp;
        <Badge
          size="sm"
          color={
            theme.colorScheme == "dark"
              ? theme.colors.teal[5]
              : theme.colors.teal[8]
          }
        >
          TOLLO
        </Badge>
      </td>
      <td>
        {validator && (
          <Badge
            size="sm"
            variant="light"
            color={
              status == "Jailed"
                ? "red"
                : rank <= 100
                ? "green"
                : validator.jailed
                ? "red"
                : "yellow"
            }
          >
            {rank <= 100
              ? "Active"
              : validator.jailed
              ? "Jailed"
              : status == "BOND_STATUS_UNBONDING"
              ? "Unbonding"
              : "Inactive"}
          </Badge>
        )}
      </td>
      <td>
        <Group spacing={8}>
          <ActionBtn
            size={"xs"}
            color="violet"
            variant="filled"
            icon={<TbSettings />}
            label="Manage delegation"
            onClick={() => {
              openDelegationModal({
                availableBalance: amt(balance),
                bech32Address,
                delegation: delegation,
                reward: reward,
                validators: validators,
                validator: validator,
              });
            }}
          />
          <ActionBtn
            color="violet"
            variant="default"
            icon={<TbPlus />}
            label="Claim Reards"
            onClick={() => {
              getKeplrFromWindow().then((k: Keplr) => {
                const os: OfflineAminoSigner = k.getOfflineSigner(
                  olloKeplrChainInfo.chainId
                );
                SigningStargateClient.connectWithSigner(endpoints.rpc, os, {
                  prefix: "ollo",
                  gasPrice: defaultOlloGas(),
                }).then((sc: SigningStargateClient) => {
                  // sc.getAllBalances(bech32Address).then((c: Coin[]) => {
                  //   c.forEach((c: Coin) => {
                  //     showNotification({
                  //       title: c.denom,
                  //       message: c.amount
                  //     })
                  //   })
                  // })
                  sc.withdrawRewards(
                    delegation.delegation.delegator_address,
                    delegation.delegation.validator_address,
                    "auto",
                    ""
                  )
                    .then((r: DeliverTxResponse) => {
                      console.log(JSON.stringify(r));
                      showNotification({
                        title: "Sucessfully withdrawn rewards",
                        message:
                          "Withdrew rewards from  " +
                          delegation.delegation.validator_address,
                      });
                    })
                    .catch((e) => {
                      console.log(e);
                      showNotification({
                        title: "Cancelled claiming rewards",
                        message:
                          "Canceled claiming rewards from " +
                          delegation.delegation.validator_address,
                      });
                    });
                });
              });
            }}
          />
        </Group>
      </td>
    </tr>
  );
};
