import { openModal } from "@mantine/modals";
import {
  useMantineTheme,
  Group,
  Text,
  Anchor,
  ThemeIcon,
  Button,
  RingProgress,
  Center,
  Stack,
  Divider,
  Card,
  Progress,
  Timeline,
  Paper,
  Title,
} from "@mantine/core";
import {
  TbCheck,
  TbCoin,
  TbDots,
  TbFilter,
  TbReceipt,
  TbSend,
  TbSettings,
} from "react-icons/tb";
import { violet } from "@/config/theme";
import { FunctionComponent } from "react";
import { openSendModal } from "@/cmp/modal/send";
import { useStore } from "../../../stores";
import { olloChainInfo } from "@/config/chain-infos";
import { defaultModal } from "modals";

export const RightButtonGroup: FunctionComponent<{}> = ({}) => {
  const theme = useMantineTheme();
  const { accountStore } = useStore();
  const { bech32Address } = accountStore.getAccount(olloChainInfo.chainId);
  return (
    <>
      <Button.Group>
        <Button
          variant="filled"
          onClick={() => {
            openSendModal({ from: bech32Address });
          }}
          color={violet(theme)}
        >
          <TbSend />
          &nbsp;Send
        </Button>
        <Button
          variant="default"
          color={violet(theme)}
          onClick={() => {
            openModal({
              title: "Receive Tokens",
            });
          }}
        >
          <TbReceipt />
          &nbsp;Receive
        </Button>

        <Button
          onClick={() => {
            openModal({
              title: "Manage Dashboard",
            });
          }}
          ml={4}
          variant="default"
          color={violet(theme)}
        >
          <TbSettings />
          &nbsp;Manage
        </Button>
      </Button.Group>
    </>
  );
};
