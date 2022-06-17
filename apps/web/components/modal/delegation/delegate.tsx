import { Coin, DeliverTxResponse } from "@cosmjs/stargate";
import { Validator, Delegation, DelegationResponse } from "@/types/staking";
import {
  Button,
  Card,
  Group,
  NativeSelect,
  Text,
  NumberInput,
  Paper,
  Space,
  TextInput,
  Box,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { TbCoin, TbSend, TbUser } from "react-icons/tb";
import {
  openModal,
  closeAllModals,
  closeModal,
  openContextModal,
  openConfirmModal,
} from "@mantine/modals";
import { CurrencyInput } from ".";
import { AmountSlider } from "@/cmp/input/slider";
import { useForm } from "@mantine/form";
import ValidatorSelect from "./select";
import { statusReadable } from "@/lib/fn/stake/util";
import { delegateToOlloValidator } from "@/lib/fn/user/action";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { trimAddr } from "@/lib/util";
import { getOlloSpendableBalance } from "@/lib/fn/user";

export type DelegateTabProps = {
  bech32Address: string;
  availableBalance: number;
  delegation?: DelegationResponse;
  validator: Validator;
  validators: Validator[];
};
export const DelegateTab = ({
  bech32Address,
  availableBalance,
  delegation,
  validator,
  validators,
}: DelegateTabProps) => {
  const q = useQueryClient();
  const { data: spendable } = useQuery(
    ["ollo", "balance", "spendable", bech32Address],
    () => getOlloSpendableBalance(bech32Address),
    {
      initialData: () =>
        q.getQueryData<Coin>(["ollo", "balance", "spendable", bech32Address]),
    }
  );
  const form = useForm<{
    delegator: string;
    validator: string;
    amount: number;
    denom: string;
  }>({
    initialValues: {
      delegator: bech32Address,
      validator: validator.operator_address,
      amount: 0,
      denom: "utollo",
    },
    validate: (values) => ({
      // validator: values.validator.startsWith("ollovaloper"),
      // delegator: values.delegator.startsWith("ollo"),
      amount: values.amount > 0, //&& (spendable && parseInt(spendable.amount) > 0 && values.amount < parseInt(spendable.amount)
      // )
    }),
  });
  const data = validators.map((v: Validator) => ({
    value: v.operator_address,
    group: statusReadable({ jailed: v.jailed, status: v.status }),
    disabled: false,
    label: v.description?.moniker,
  }));
  return (
    <Paper my={10} mx="auto" style={{ minHeight: "100%" }}>
      <form
        onSubmit={form.onSubmit(({ ...values }) => {
          showNotification({
            title:
              "Staking " + values.amount + " " + delegation?.balance.denom ||
              "utollo",
            message:
              "Staking " + values.amount + " " + delegation?.balance.denom ||
              "utollo",
          });
          delegateToOlloValidator(values.delegator, values.validator, {
            amount: (Math.abs(values.amount) * 1000000).toString(),
            denom: "utollo",
          })
            .then((r: DeliverTxResponse) => {
              console.log(r);
              showNotification({
                title: r.code + "Successfully undelegated",
                message:
                  "Unstaking " +
                    values.amount +
                    " " +
                    delegation.balance.denom || "utollo",
              });
            })
            .catch((e) => {
              console.log(e);
            });
        })}
      >
        <Box>
          <Text size="xs" color="dimmed">
            {trimAddr(bech32Address)}
          </Text>
          <Group position="apart">
            <Text size="sm" color="dimmed">
              Available balance:
            </Text>
            <Group position="right">
              <Text>{availableBalance}</Text>
            </Group>
          </Group>
        </Box>
        <TextInput
          withAsterisk
          icon={<TbUser />}
          variant="filled"
          description="Delegator Address"
          label="Delegator"
          placeholder={bech32Address}
          {...form.getInputProps("delegator")}
        />
        <Space h={20} />
        <TextInput
          icon={<TbSend />}
          variant="filled"
          withAsterisk
          description="The validator address to delegate to"
          rightSection={
            <NativeSelect
              styles={{
                input: {
                  fontWeight: 500,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              }}
              data={data}
              value={form.values.validator}
              {...form.getInputProps("validator")}
            />
          }
          rightSectionWidth={100}
          label="Validator"
          placeholder={validator.operator_address}
          {...form.getInputProps("validator")}
        />
        <Space h={20} />
        <NumberInput
          description="Amount to stake"
          rightSection={<CurrencyInput />}
          rightSectionWidth={100}
          min={0}
          max={availableBalance}
          icon={<TbCoin />}
          withAsterisk
          label="Amount"
          placeholder={0}
          {...form.getInputProps("amount")}
        />
        <Space h={20} />
        <br />
        <AmountSlider />

        {/* <CheckboxCard title={"Auto Restake"} description={"Automatically restake delegated funds"} /> */}
        <Space h={28}></Space>
        <Group mt={20} spacing="md" position="right">
          <Button variant="default" onClick={closeAllModals} color={"dimmed"}>
            Cancel
          </Button>
          <Button type="submit" color={"violet"} variant="filled">
            Submit
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
export default DelegateTab;
