import {
  createStyles,
  Text,
  Card,
  RingProgress,
  Group,
  Box,
  Button,
  Grid,
  Divider,
  List,
  Title,
  Tabs,
  TextInput,
  NumberInput,
  Container,
  Paper,
  useMantineTheme,
  Center,
  Skeleton,
  Loader,
  JsonInput,
} from "@mantine/core";
import dynamic from "next/dynamic";
import { CurrencyInput, UnbondingAlert, RestakeCheckbox } from ".";
import { DelegateTab, UndelegateTab, RedelegateTab } from ".";
import { ValidatorOverviewCard } from "@/cmp/cards/validator";
import { AmountSlider } from "../../input/slider";
import { useForm } from "@mantine/form";
import {
  openModal,
  closeAllModals,
  closeModal,
  openContextModal,
  openConfirmModal,
} from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import {
  TbAlertCircle,
  TbAt,
  TbArrowBack,
  TbArrowDownCircle,
  TbCoin,
  TbRecycle,
  TbSend,
  TbUser,
  TbInfoCircle,
} from "react-icons/tb";
import { defaultModal } from "../../../modals";
import { DelegationResponse } from "@/types/staking";
import { Validator } from "../../../types/staking";
import { Alert } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/router";
import { NativeSelect } from "@mantine/core";
import { UnstyledButton, Checkbox } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { useContext } from "react";
import { ValOverviewCard } from "@/cmp/cards/validator/overview";
import { useQuery } from "@tanstack/react-query";
import { getValidator } from "@/lib/fn/stake";
import { apiGet } from "@/lib/api";
import { Suspense } from "react";
import { ValidatorReward } from "@/types/distribution";

const DynUndelegate = dynamic(() =>
  import("./undelegate").then((undelegate) => undelegate.UndelegateTab)
);
const DynRedelegate = dynamic(() =>
  import("./redelegate").then((redelegate) => redelegate.RedelegateTab)
);

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 1,
  },

  inner: {
    display: "flex",

    [theme.fn.smallerThan(350)]: {
      flexDirection: "column",
    },
  },

  ring: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",

    [theme.fn.smallerThan(350)]: {
      justifyContent: "center",
      marginTop: theme.spacing.md,
    },
  },
}));

interface StatsRingCardProps {
  title: string;
  completed: number;
  total: number;
  stats: {
    value: number;
    label: string;
  }[];
}

export function StatsRingCard({
  title,
  completed,
  total,
  stats,
}: StatsRingCardProps) {
  const { classes, theme } = useStyles();
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text className={classes.label}>{stat.value}</Text>
      <Text size="xs" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text size="xl" className={classes.label}>
            {title}
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {completed}
            </Text>
            <Text size="xs" color="dimmed">
              Completed
            </Text>
          </div>
          <Group mt="lg">{items}</Group>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[
              { value: (completed / total) * 100, color: theme.primaryColor },
            ]}
            label={
              <div>
                <Text
                  align="center"
                  size="lg"
                  className={classes.label}
                  sx={{ fontSize: 22 }}
                >
                  {((completed / total) * 100).toFixed(0)}%
                </Text>
                <Text align="center" size="xs" color="dimmed">
                  Completed
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}

export const openDelegationModal = ({
  reward,
  validators,
  bech32Address,
  delegation,
  availableBalance,
  validator,
}: DelegationModalProps) => {
  defaultModal({
    title: <Title order={2}>Delegation </Title>,
    children: (
      <DelegationModalContent
        bech32Address={bech32Address}
        delegation={delegation}
        validator={validator}
        reward={reward}
        validators={validators}
        availableBalance={availableBalance}
      />
    ),
  });
};

export type DelegationModalProps = {
  bech32Address: string;
  reward?: ValidatorReward;
  delegation?: DelegationResponse;
  availableBalance: number;
  validator: Validator;
  validators: Validator[];
  onlyStake?: boolean;
};
const DelegationModalContent = ({
  validators,
  bech32Address,
  delegation,
  availableBalance,
  validator,
  onlyStake = false,
}: DelegationModalProps) => {
  const router = useRouter();
  const [tab, setTab] = useState<string>("stake");
  // router.push(router.pathname + "&action=" + tab, undefined, { shallow: true })
  // router.push(router.pathname + "?validator=" + validator.operator_address, undefined, { shallow: true })
  const setAct = (act: string) => {
    // router.push(router.pathname + "&action=" + act, undefined, {
    // shallow: true,
    // })
    setTab(act);
  };
  const vaddr = delegation
    ? delegation.delegation.validator_address
    : validator
    ? validator.operator_address
    : validators[0].operator_address;
  const {
    data: v,
    isFetched: valFetched,
    isLoading: valLoading,
    isFetching: valFetching,
    refetch,
    isError: valError,
  } = useQuery(
    ["ollo", "validator", { validator: vaddr, delegator: bech32Address }],
    () =>
      fetch(`/${vaddr}`)
        .then((r) => r.json())
        .then((r) => r.validator),
    {
      initialData: validator ? validator : {},
      refetchOnReconnect: "always",
      retryOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    }
  );
  const {
    data: del,
    isLoading: delLoading,
    isError: delError,
  } = useQuery(
    ["ollo", "delegation", { delegator: bech32Address, validator: v }],
    () =>
      fetch(
        `${process.env.OLLO_API}/ollo/${bech32Address}/delegations/${vaddr}`
      )
        .then((r) => r.json())
        .then((r) => r.delegation_response)
        .catch((e) => {}),
    {
      initialData: delegation ? delegation : {},
      refetchOnWindowFocus: true,
    }
  );
  const {
    colorScheme,
    fn: { darken },
    colors: { dark, gray },
  } = useMantineTheme();
  // const vc = <><Card.Section withBorder shadow="xl" style={{ minHeight: "100%" }} p="md" radius="md" >

  //   <Card.Section style={{
  //     padding: "10px",
  //     backgroundColor: colorScheme == "dark" ? darken(dark[6], 0.18) : darken(gray[1], 0.18)
  //   }} withBorder>
  //     <Group position="apart" grow>
  //       <Group position="left" grow>
  //         <Title size={18}>Validator Info</Title>
  //       </Group>
  //       <Group position="right" spacing="sm">
  //         <ActionBtn variant='default' size='xs' p='xs' label={"View on explorer"} onClick={() => {
  //           closeAllModals()
  //           push("https://explorer.ollo.zone/ollo/staking/" + delegation.delegation.validator_address)
  //         }} icon={<TbInfoCircle />
  //         } />
  //         <ActionBtn variant='filled' size='xs' p='xs' label={"Visit validator page"} onClick={() => {
  //           closeAllModals()
  //           push("/stake/validator/" + delegation.delegation.validator_address)
  //         }} icon={<TbAt />
  //         } />
  //       </Group>

  //     </Group>
  //   </Card.Section>
  //   <Card.Section p="md">
  //     <List>
  //       <List.Item>{delegation.delegation.delegator_address}</List.Item>
  //       <List.Item>{delegation.delegation.validator_address}</List.Item>
  //       <List.Item>{delegation.delegation.shares}</List.Item>
  //       <List.Item>{delegation.balance.amount}</List.Item>
  //       <List.Item>{delegation.balance.denom}</List.Item>
  //     </List>

  //   </Card.Section>
  // </Card.Section>
  // </>
  // if (valFetching) return <Loader />
  // if (valLoading) return <Loader />
  // const Delegate = dynamic(() => import('./delegate'),
  //   {
  //     ssr: false
  //   }
  // )
  const Undelegate = dynamic(() => import("./undelegate"), { ssr: false });
  const Redelegate = dynamic(() => import("./redelegate"), { ssr: false });
  const ValCard = dynamic(() => import("@/cmp/cards/validator/overview"), {
    ssr: false,
  });

  return (
    <Container size="xl" mt={5} mb={15} mx={10}>
      <Grid align="normal" grow gutter={30}>
        <Grid.Col span={6} style={{ minHeight: "100%" }}>
          {/* <Suspense fallback={<Loader />}> */}
          {v && (
            <ValidatorOverviewCard
              bech32Address={bech32Address}
              validator={v}
            />
          )}
          {/* </Suspense> */}
        </Grid.Col>

        <Grid.Col span={6} style={{ minHeight: "100%" }}>
          <Box>
            <Tabs
              value={tab}
              onTabChange={setAct}
              color={"violet"}
              defaultValue="stake"
              variant="pills"
            >
              <Tabs.List>
                <Tabs.Tab icon={<TbArrowDownCircle />} value="stake">
                  Stake
                </Tabs.Tab>
                <Tabs.Tab icon={<TbArrowBack />} value="unstake">
                  Unstake
                </Tabs.Tab>
                <Tabs.Tab icon={<TbRecycle />} value="redelegate">
                  Redelegate
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="stake">
                <Suspense fallback={<Loader />}>
                  <DelegateTab
                    {...{
                      bech32Address: bech32Address,
                      delegation: del,
                      validator: v,
                      validators: validators,
                      availableBalance: availableBalance,
                    }}
                  />
                </Suspense>
              </Tabs.Panel>

              <Tabs.Panel value="unstake">
                <Suspense fallback={<Loader />}>
                  <UndelegateTab
                    {...{
                      bech32Address: bech32Address,
                      delegation: del,
                      validator: v,
                      validators: validators,
                      availableBalance: availableBalance,
                    }}
                  />
                </Suspense>
              </Tabs.Panel>
              <Tabs.Panel value="redelegate">
                <Suspense fallback={<Loader />}>
                  <RedelegateTab
                    {...{
                      bech32Address: bech32Address,
                      delegation: del,
                      validator: v,
                      validators: validators,
                    }}
                  />
                </Suspense>
              </Tabs.Panel>
            </Tabs>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default DelegationModalContent;
