import { AmountSlider } from "@/cmp/input/slider";
import { sendTokens } from "@/lib/fn/user/action";
import { getStargateKeplr } from "@/lib/fn/tx";
import { trimAddr, zeroAmt } from "@/lib/util";
import { DelegationResponse } from "@/types/staking";
import {
  Coin,
  DeliverTxResponse,
  SigningStargateClient,
} from "@cosmjs/stargate";
import {
  Button,
  Card,
  Grid,
  Group,
  NativeSelect,
  NumberInput,
  Paper,
  Space,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormValidateInput } from "@mantine/form/lib/types";
import { closeAllModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { defaultModal } from "modals";
import { TbReceipt, TbSend } from "react-icons/tb";

export type SendModalProps = {
  from: string;
  to?: string;
  amt?: {
    amount: number;
    denom: string;
  };
};
export type SendForm = {
  amt: { amount: number; denom: string };
  from: string;
  to: string;
};
export const openSendModal = ({ from, to, amt }: SendModalProps) => {
  defaultModal({
    title: <Title order={2}>Delegation </Title>,
    children: <SendModalContent {...{ from, to, amt }} />,
  });
};

export const SendModalContent = ({ amt, from, to }: SendModalProps) => {
  const form = useForm<SendForm>({
    initialValues: {
      from: from ? from : "",
      to: to ? to : "",
      amt: { amount: 0, denom: "utollo" },
    },
  });
  return (
    <Grid>
      <Grid.Col span={6}>
        <Card>
          <Card.Section withBorder p="md">
            <Title>{trimAddr(from)}</Title>
          </Card.Section>
          <Card.Section p="md">
            <Title>From {trimAddr(from)}</Title>
            <Title></Title>
          </Card.Section>
          <Card.Section p="md">
            <Title>To {trimAddr(to)}</Title>
          </Card.Section>
          <Card.Section withBorder p="md">
            <Title>
              Amount {amt.amount} {amt.denom}
            </Title>
          </Card.Section>
        </Card>
      </Grid.Col>
      <Grid.Col span={6}>
        <Paper my={10} mx="auto" style={{ minHeight: "100%" }}>
          <Title>Send</Title>
          <Stack spacing="md">
            <form
              onSubmit={form.onSubmit(({ ...values }) => {
                showNotification({
                  loading: true,
                  title: `Sending ${values.amt.amount} ${
                    values.amt.denom
                  } to ${trimAddr(values.to)}`,
                  message: `Sending ${values.amt.amount} ${
                    values.amt.denom
                  } from ${trimAddr(values.from)} to ${trimAddr(values.to)}`,
                });
                getStargateKeplr().then((k: SigningStargateClient) => {
                  k.sendTokens(
                    values.from,
                    values.to,
                    [
                      {
                        amount: (values.amt.amount * 1000000).toString(),
                        denom: values.amt.denom,
                      },
                    ],
                    "auto",
                    null
                  )
                    .then((r: DeliverTxResponse) => {
                      console.log(r);
                      showNotification({
                        title: "Successfully sent",
                        message:
                          "Sent " + values.amt.amount + " " + values.amt.denom,
                      });
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                });
              })}
            >
              <TextInput value={from} rightSection={<TbSend />} />
              <TextInput value={to} rightSection={<TbReceipt />} />
              <NumberInput
                value={amt.amount}
                rightSectionWidth={90}
                rightSection={
                  <NativeSelect
                    styles={{
                      input: {
                        fontWeight: 500,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      },
                    }}
                    data={[{ value: "utollo", label: "TOLLO" }]}
                    value={amt.denom}
                  />
                }
              />
              <Space h={20} />
              <br />
              <AmountSlider />
              <Space h={20} />
              <Group mt={20} spacing="md" position="right">
                <Button
                  variant="default"
                  onClick={closeAllModals}
                  color={"dimmed"}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color={"violet"}
                  variant="filled"
                  onClick={() => {}}
                >
                  Submit
                </Button>
              </Group>
            </form>
          </Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};
