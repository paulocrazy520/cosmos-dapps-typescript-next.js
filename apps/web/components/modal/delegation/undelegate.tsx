import { Coin, DeliverTxResponse } from "@cosmjs/stargate";
import { Validator, Delegation, DelegationResponse } from "@/types/staking";
import { UnbondingAlert } from ".";
import {
  Button,
  Group,
  NativeSelect,
  NumberInput,
  Paper,
  Space,
  TextInput,
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
import { undelegateToOlloValidator } from "@/lib/fn/user/action";

export type UndelegateTabProps = {
  bech32Address: string;
  validators: Validator[];
  delegation?: DelegationResponse;
  validator: Validator;
};
export const UndelegateTab = ({
  bech32Address,
  delegation,
  validator,
  validators,
}: UndelegateTabProps) => {
  const isDelegated = typeof delegation !== "undefined";
  const form = useForm<{
    delegator: string;
    validator: string;
    amount: number;
  }>({
    initialValues: {
      delegator: bech32Address,
      validator: validator.operator_address,
      amount: 0,
    },
    validate: (values) => ({
      validator: values.validator.startsWith("ollo"),
      // delegator: values.delegator.startsWith("ollo"),
      amount:
        values.amount > 0 &&
        values.amount < parseInt(delegation?.delegation.shares),
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
      <UnbondingAlert />
      <Space h={20}></Space>
      <form
        onSubmit={form.onSubmit(({ ...values }) => {
          showNotification({
            title:
              "Unstaking " + values.amount + " " + delegation.balance.denom ||
              "utollo",
            message:
              "Unstaking " + values.amount + " " + delegation.balance.denom ||
              "utollo",
          });
          undelegateToOlloValidator(
            form.values.delegator,
            form.values.validator,
            {
              amount: (form.values.amount * 1000000).toString(),
              denom: "utollo",
            }
          )
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
        <TextInput
          icon={<TbUser />}
          variant="filled"
          withAsterisk
          description="The delegator address "
          label="Delegator"
          placeholder={bech32Address}
          {...form.getInputProps("delegator")}
        />
        <Space h={20}></Space>
        <TextInput
          withAsterisk
          icon={<TbSend />}
          variant="filled"
          rightSection={
            <NativeSelect
              // onChange={(e) => { form.setFieldValue("validator", e.currentTarget.value) }}
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
          description="The validator address to undelegate to"
          label="Validator"
          placeholder={validator.operator_address}
          {...form.getInputProps("validator")}
        />
        <Space h={20}></Space>
        <NumberInput
          icon={<TbCoin />}
          rightSection={<CurrencyInput />}
          rightSectionWidth={100}
          description="Amount to unstake"
          withAsterisk
          min={0}
          max={
            isDelegated
              ? delegation?.balance
                ? parseInt(delegation?.balance.amount)
                : 0
              : 0
          }
          label="Amount"
          placeholder={0}
          {...form.getInputProps("amount")}
        />
        <Space h={28}></Space>
        <AmountSlider />
        <Space h={28}></Space>
        <Group mt={20} spacing="md" position="right">
          <Button variant="default" onClick={closeAllModals} color={"dimmed"}>
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
    </Paper>
  );
};
export default UndelegateTab;
