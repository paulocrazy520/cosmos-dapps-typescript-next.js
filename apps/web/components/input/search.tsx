import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  Tooltip,
} from "@mantine/core";
import { createFormContext, useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { TbSearch, TbArrowRight, TbArrowLeft } from "react-icons/tb";

export type FormValues = {
  input: string;
};
export type QueryType =
  | "address"
  | "txid"
  | "block"
  | "validator"
  | "proposal"
  | "txs";
export function SearchInput(props: TextInputProps) {
  const theme = useMantineTheme();
  const [focused, setFocused] = useState(false);

  const input = useForm<FormValues>({
    initialValues: {
      input: "",
    },
  });
  const router = useRouter();
  const onSubmit = ({ input: i }: FormValues) => {
    if (i.startsWith("ollovaloper"))
      router.push("https://explorer.ollo.zone/ollo/staking/" + i);
    else if (i.startsWith("ollo"))
      router.push("https://explorer.ollo.zone/ollo/account/" + i);
    if (i.startsWith("cosmosvaloper"))
      router.push("https://explorer.ollo.zone/cosmos/staking/" + i);
    else if (i.startsWith("cosmos"))
      router.push("https://explorer.ollo.zone/cosmos/account/" + i);
    else if (i.matchAll(/^[0-9]+$/))
      router.push("https://explorer.ollo.zone/ollo/blocks/" + i);
    else if (i.matchAll(/^[0-9A-F]+$/))
      router.push("https://explorer.ollo.zone/ollo/tx/" + i);
    else router.push("https://explorer.ollo.zone/ollo/tx/" + i);
  };

  // useEffect(() => {
  //   if (input.values.input.startsWith("ollovaloper"))
  //     setLabel("Searching for OLLO Validator")
  //   else if (input.values.input.startsWith("ollo"))
  //     setLabel("Searching for OLLO Address")
  //   else if (input.values.input.startsWith("cosmosvaloper"))
  //     setLabel("Searching for Cosmos Validator")
  //   else if (input.values.input.startsWith("cosmos"))
  //     setLabel("Searching for Cosmos Address")
  //   else if (input.values.input.match(/^[0-9]+$/))
  //     setLabel("Searching for Block")
  //   else if (input.values.input.match(/^[0-9A-F]+$/))
  //     setLabel("Searching for Txid")
  //   else
  //     setLabel("Searching for Txid")
  // })

  return (
    <form onSubmit={input.onSubmit(onSubmit)}>
      <TextInput
        icon={<TbSearch size={18} />}
        radius="lg"
        size="md"
        rightSection={
          <ActionIcon size={32} radius="xl" color={"violet"} variant="filled">
            {theme.dir === "ltr" ? (
              <TbArrowRight size={18} />
            ) : (
              <TbArrowLeft size={18} />
            )}
          </ActionIcon>
        }
        placeholder="Search addresses, validators, transactions..."
        rightSectionWidth={42}
        {...input.getInputProps("input")}
        {...props}
      />
    </form>
  );
}
// </Tooltip>
// <Tooltip
//   label={label}
//   position="bottom-start"
//   withArrow
//   opened={focused}
// >
