import { Coin } from "@cosmjs/stargate";
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
import { TbArrowBack, TbCoin, TbSend, TbUser } from "react-icons/tb";
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

export type RedelegateTabProps = {
  bech32Address: string;
  delegation?: DelegationResponse;
  validator: Validator;
  validatorto?: string;
  validators?: Validator[];
};
export const RedelegateTab = ({
  validators,
  bech32Address,
  delegation,
  validator,
}: RedelegateTabProps) => {
  const form = useForm<{
    delegator: string;
    validatorto: string;
    validatorfrom: string;
    amount: number;
  }>({
    initialValues: {
      delegator: bech32Address,
      validatorfrom: validator.operator_address,
      validatorto: "",
      amount: 0,
    },
    validate: (values) => ({
      validatorfrom: values.validatorfrom.startsWith("ollo"),
      validatorto: values.validatorto.startsWith("ollo"),
      delegator: values.delegator.startsWith("ollo"),
      amount:
        values.amount > 0 &&
        values.amount <
          (delegation ? parseInt(delegation?.delegation.shares) : 0),
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
              "Redelegating" + values.amount + " " + delegation.balance.denom ||
              "utollo",
            message:
              "Redelegating " +
                values.amount +
                " " +
                delegation.balance.denom || "utollo",
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
        <Space h={20} />
        <TextInput
          withAsterisk
          icon={<TbArrowBack />}
          variant="filled"
          description="The validator address to redelegate from"
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
              value={form.values.validatorfrom}
              {...form.getInputProps("validator-from")}
            />
          }
          rightSectionWidth={100}
          label="Redelegate From"
          placeholder={validator.operator_address}
          {...form.getInputProps("validator-from")}
        />
        <Space h={20} />
        <TextInput
          withAsterisk
          icon={<TbSend />}
          variant="filled"
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
              value={form.values.validatorto}
              {...form.getInputProps("validator-to")}
            />
          }
          rightSectionWidth={100}
          description="The validator address to redelegate to"
          label="Redelegate To"
          {...form.getInputProps("validator-to")}
        />
        <Space h={20} />
        <NumberInput
          icon={<TbCoin />}
          rightSection={<CurrencyInput />}
          rightSectionWidth={100}
          description="Amount to unstake"
          withAsterisk
          min={0}
          max={
            delegation
              ? parseInt(delegation.balance ? delegation.balance.amount : "0")
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
export default RedelegateTab;
