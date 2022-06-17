import {
  Anchor,
  Avatar,
  Badge,
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
import { Validator } from "@/types/staking";
import { ActionBtn } from "@/components/buttons";
import { openDelegationModal } from "@/components/modal/delegation";
import { divS, spct, npct } from "@/lib/util";
import { TbSettings } from "react-icons/tb";
import { ValidatorReward } from "@/types/distribution";
const useRowStyles = createStyles((theme) => ({
  modal: {},
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `3px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

export interface UserInfo {
  balance: number;
  addr: string;
}
export const useValidatorTableRowStyles = createStyles(
  (theme: MantineTheme) => ({})
);
export interface ValidatorTableRowProps {
  u: UserInfo;
  v: Validator;
  i: number;
  r?: ValidatorReward;
  vs: Validator[];
}
export const ValidatorTableRow = ({
  u,
  v,
  i,
  vs,
  r,
}: ValidatorTableRowProps) => {
  const votingPower = divS(v.tokens, vs[0].tokens);
  const { theme, classes } = useValidatorTableRowStyles();
  const { push } = useRouter();
  const rankb = (
    <Badge
      color={
        i <= 10
          ? "teal"
          : i <= 25
          ? "green"
          : i <= 50
          ? "yellow"
          : i <= 75
          ? "orange"
          : i <= 100
          ? "maroon"
          : i <= 150
          ? "pink"
          : i <= 200 && "grape"
      }
      size="xs"
      variant="light"
    >
      {i + 1}
    </Badge>
  );
  return (
    <tr key={i}>
      <td>{rankb}</td>
      <td>
        <Tooltip withArrow label={v.operator_address}>
          <Anchor<"a">
            size={"md"}
            color={"white"}
            style={{
              textDecoration: "none",
              textDecorationColor: "white",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              push("/stake/validator/" + v.operator_address);
            }}
          >
            <Group position="left">
              <Avatar src="/images/TOLLO.png" size="sm" />
              {v.description.moniker}
            </Group>
          </Anchor>
        </Tooltip>
      </td>
      <td>
        {(parseInt(v.tokens) / 1000000).toFixed(0)}{" "}
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
        <Anchor<"a">
          size="sm"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {/* <Text color={theme.colorScheme == 'dark'? theme.colors.teal[4] : theme.colors.teal[6]}>{((parseInt(v.tokens) / parseInt(pool.bonded_tokens)) * 100).toFixed(2)}</Text> */}
          <Progress
            animate
            color={
              theme.colorScheme == "dark"
                ? theme.colors.teal[5]
                : theme.colors.teal[8]
            }
            value={divS(v.tokens, vs[0].tokens) * 100}
            label={v.tokens + "%"}
            size="xl"
            radius="sm"
          />
        </Anchor>
      </td>

      <td>
        <Text
          color={
            theme.colorScheme == "dark"
              ? theme.colors.teal[9]
              : theme.colors.teal[6]
          }
        >
          100%
        </Text>
      </td>
      <td>
        <Group position="right">
          <ActionBtn
            variant="filled"
            size="xs"
            p="xs"
            label={"Stake to " + v.description.moniker}
            icon={<TbSettings />}
            onClick={() => {
              openDelegationModal({
                availableBalance: u.balance,
                bech32Address: u.addr,
                validator: v,
                validators: vs,
              });
            }}
          />
        </Group>
      </td>
    </tr>
  );
};
export default ValidatorTableRow;
