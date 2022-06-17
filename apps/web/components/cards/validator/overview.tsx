import { violet } from "@/cfg/theme";
import { trimAddr } from "@/lib/util";
import {
  Anchor,
  Button,
  Card,
  Indicator,
  Loader,
  Menu,
  Skeleton,
  Space,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import {
  createStyles,
  ThemeIcon,
  Progress,
  Text,
  Group,
  Badge,
  Paper,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { DelegationResponse, Validator } from "@/types/staking";
import {
  TbCopy,
  TbDoorExit,
  TbDots,
  TbExternalLink,
  TbEye,
  TbFile,
  TbInfoCircle,
  TbPlus,
  TbSettings,
  TbTree,
  TbUser,
  TbUserCircle,
  TbWallet,
} from "react-icons/tb";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getValidator, getDelegations } from "@/lib/fn";
import { ExtLink } from "@/cmp/buttons/text/extlink";
import { ValidatorAvatar, validatorCardIconSize } from "./avatar";
import { useStore } from "zustand";

const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "visible",
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
    backgroundColor:
      theme.colorScheme == "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
  },

  icon: {
    position: "absolute",
    top: -ICON_SIZE / 3,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

export type ValOverviewCardProps = {
  bech32Address: string;
  validator: Validator;
};
export const ValOverviewCard = ({
  bech32Address,
  validator: v,
}: ValOverviewCardProps) => {
  const clipboard = useClipboard({ timeout: 500 });
  const router = useRouter();
  const { classes, theme } = useStyles();
  // if (isFetching)
  //   return <Skeleton height={800} />
  // else if (isLoading)
  //   return <Loader />
  // else if (isFetched) {
  const avatar = <ValidatorAvatar {...{ v }} />;
  // const cms = v.commission.commission_rates
  let rate = v ? v.commission?.commission_rates?.rate.slice(2, 4) : "";
  let maxrate = v ? v.commission?.commission_rates?.max_rate.slice(2, 4) : "";
  let maxchgrate = v
    ? v.commission?.commission_rates?.max_change_rate.slice(2, 4)
    : "";
  // if (rate.startsWith("0")) rate = rate.slice(1, rate.length)
  // if (maxrate.startsWith("0")) maxrate = maxrate.slice(1, rate.length)
  // if (maxchgrate.startsWith("0")) maxchgrate = maxchgrate.slice(1, rate.length)
  const q = useQueryClient();
  const { data: dels } = useQuery(
    ["ollo", "delegations", bech32Address],
    async () => {
      return await getDelegations(bech32Address);
    },
    {
      initialData: () => {
        return q.getQueryData<DelegationResponse[]>(["ollo", "delegations"]);
      },
    }
  );
  const delegation = dels.find(
    (dr: DelegationResponse) =>
      dr.delegation.validator_address == v.operator_address
  );

  return (
    <Card
      radius={"md"}
      withBorder
      className={classes.card}
      mt={validatorCardIconSize / 3}
    >
      {avatar}
      {/* <Group position="apart" grow> */}
      {/* <Group position="left"> */}
      {/*   <Tooltip label={"More info"} withArrow transition={"slide-up"}> */}
      {/*     <Button variant="filled" size="xs" p="xs"> */}
      {/*       <TbPlus /> */}
      {/*     </Button> */}
      {/*   </Tooltip> */}
      {/* </Group> */}
      <Card.Section p="md">
        <Menu withinPortal position="bottom-end" shadow="sm">
          <Menu.Target>
            <Group position="right">
              <Tooltip label={"More info"} withArrow transition={"slide-up"}>
                <Button variant="filled" size="xs" p="xs">
                  <TbDots size={12} />
                </Button>
              </Tooltip>
            </Group>
          </Menu.Target>

          <Menu.Dropdown
            style={{
              boxShadow: "0px 0px 8px rgba(0,0,0,0.3)",
            }}
          >
            <Menu.Item icon={<TbInfoCircle size={14} />}>
              <UnstyledButton
                onClick={() => {
                  router.push(
                    "https://explorer.ollo.zone/ollo/staking/" +
                      v.operator_address
                  );
                }}
              >
                Explorer Info
              </UnstyledButton>
            </Menu.Item>
            <Menu.Item icon={<TbUserCircle size={14} />}>
              <UnstyledButton
                onClick={() => {
                  router.push("/stake/validator/" + v.operator_address);
                }}
              >
                Validator Page
              </UnstyledButton>
            </Menu.Item>
            <Menu.Item icon={<TbSettings size={14} />}>Preferences</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Card.Section>

      {/* </Group> */}
      <Space h={1} />
      <Card.Section p={"md"}>
        <Text size={13} align="center" weight={500}>
          {v.description?.details && v.description?.details}
        </Text>

        <Space h={8} />
        <Group position="center" mt={8}>
          <Tooltip
            label={"Click to copy address"}
            withArrow
            transition={"slide-up"}
          >
            <Button.Group>
              <Button
                color="dimmed"
                variant={"light"}
                size="xs"
                onClick={() => {
                  clipboard.copy(v.operator_address);
                  showNotification({
                    title: "Address copied",
                    message: "Copied address " + v.operator_address,
                  });
                }}
              >
                {v.operator_address &&
                  v.operator_address &&
                  trimAddr(v.operator_address, 16, 4)}
              </Button>
              <Button
                color="dimmed"
                variant={"light"}
                size="xs"
                onClick={() => {
                  clipboard.copy(v.operator_address);
                  showNotification({
                    title: "Address copied",
                    message: "Copied address " + v.operator_address,
                  });
                }}
              >
                <TbCopy />
              </Button>
            </Button.Group>
          </Tooltip>
        </Group>
      </Card.Section>

      <Card.Section p={"lg"} withBorder>
        <Group position="apart" mt="xs">
          <Text size="sm" color="dimmed">
            Tokens
          </Text>
          <Group position="right">
            <Text size="sm" color="dimmed">
              {(parseInt(v.tokens) / 1000000).toFixed(0)}
            </Text>
            <Text size="sm" color="violet">
              TOLLO
            </Text>
          </Group>
        </Group>
        <Group position="apart" mt="xs">
          <Text size="sm" color="dimmed">
            Minimum self delegation
          </Text>
          <Group position="right">
            <Text size="sm" color="dimmed">
              {v.min_self_delegation}
            </Text>
            <Text size="sm" color="violet">
              TOLLO
            </Text>
          </Group>
        </Group>
        <Group position="apart" mt="xs">
          <Text size="sm" color="dimmed">
            Commission
          </Text>
        </Group>
        <Group position="apart" mt="xs">
          <Text size="sm" color="dimmed" ml={20}>
            Rate
          </Text>
          <Badge size="xs" color="blue">
            Rate: {rate}%
          </Badge>
        </Group>
        <Group position="apart" mt="xs">
          <Text size="sm" color="dimmed" ml={20}>
            Max rate
          </Text>
          <Badge size="xs" color="yellow">
            Max: {maxrate}%
          </Badge>
        </Group>
        <Group position="apart" mt="xs">
          <Text size="sm" color="dimmed" ml={20}>
            Max change rate
          </Text>
          <Badge size="xs" color="orange">
            Max change: {}%
          </Badge>
        </Group>

        {/* <Text size="sm" color="violet"> */}
        {/*   TOLLO */}
        {/* </Text> */}
        <Group position="apart" mt="xs">
          <Text size="sm" color="dimmed">
            Jailed
          </Text>
          <Group position="right">
            <Text size="sm" color="dimmed">
              {v.jailed ? (
                <Badge size="xs" color="red">
                  Jailed
                </Badge>
              ) : (
                <Badge size="xs" color="green">
                  Not jailed
                </Badge>
              )}
            </Text>
            {/* <Text size="sm" color="violet"> */}
            {/*   TOLLO */}
            {/* </Text> */}
          </Group>
        </Group>
        <Group position="apart" mt="xs">
          <Text size="sm" color="dimmed">
            Status
          </Text>
          <Group position="right">
            <Text size="sm" color="dimmed">
              <Badge size="xs">{v.status}</Badge>{" "}
              {v.jailed && (
                <Badge size="xs" color="red">
                  Jailed
                </Badge>
              )}
            </Text>
            {/* <Text size="sm" color="violet"> */}
            {/*   TOLLO */}
            {/* </Text> */}
          </Group>
        </Group>
        {v.description?.security_contact && (
          <Group position="apart" mt="xs">
            <Text size="sm" color="dimmed">
              Email
            </Text>
            <Group position="right">
              <Text size="sm" color="dimmed">
                {v.description?.security_contact &&
                  v.description?.security_contact}
              </Text>
              {/* <Text size="sm" color="violet"> */}
              {/*   TOLLO */}
              {/* </Text> */}
            </Group>
          </Group>
        )}
        {v.description?.website && (
          <Group position="apart" mt="xs">
            <Text size="sm" color="dimmed">
              Website
            </Text>
            <Group position="right" spacing="sm">
              <ExtLink {...{ href: v.description?.website }} />
              {/* <Text size="sm" color="violet"> */}
              {/*   TOLLO */}
              {/* </Text> */}
            </Group>
          </Group>
        )}
        {/* <Group position="apart" mt="xs"> */}
        {/*   <Text size="sm" color="dimmed"> */}
        {/*     Addresses */}
        {/*   </Text> */}
        {/*   <Text size="sm" color="dimmed"> */}
        {/*     1 */}
        {/*   </Text> */}
        {/* </Group> */}
        {/* <Group position="apart" mt="xs"> */}
        {/*   <Text size="sm" color="dimmed"> */}
        {/*     Connected via */}
        {/*   </Text> */}
        {/*   <Text size="sm" color="dimmed"> */}
        {/*     Keplr */}
        {/*   </Text> */}
        {/* </Group> */}

        {/* <Progress value={62} mt={5} /> */}

        {/* <Group position="apart" mt="md"> */}
        {/*   <Text size="sm">20 / 36 km</Text> */}
        {/* </Group> */}
      </Card.Section>
      <Card.Section>
        <Group position="apart" grow>
          <Group position="center" noWrap spacing={10}>
            {/* <Button.Group > */}
            {/* <Button style={{ fontWeight: 400 }} size={"sm"} variant="subtle" leftIcon={<TbUserCircle />} */}
            {/*   onClick={() => { router.push("/stake/validator/" + validator.operator_address) }} */}
            {/* > */}
            {/*   Profile */}
            {/* </Button> */}
            {/* <Button style={{ fontWeight: 400 }} size={"sm"} variant="subtle" leftIcon={<TbDoorExit />} */}
            {/*   onClick={() => { */}
            {/*     // disconnect */}
            {/*   }} */}
            {/* > */}
            {/*   Disconnect */}
            {/* </Button> */}
            {/* </Button.Group> */}
          </Group>
        </Group>
      </Card.Section>
      {delegation && (
        <Card.Section p="md">
          <Group position="apart">
            <Text color="dimmed">Your delegation</Text>
            {JSON.stringify(delegation)}
          </Group>
        </Card.Section>
      )}
    </Card>
  );
};
export const ValidatorOverviewCard = ValOverviewCard;
export default ValidatorOverviewCard;
