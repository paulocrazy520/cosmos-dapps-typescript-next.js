import { NativeSelect, Select, TextInput } from "@mantine/core";
import { Validator } from "@/types/staking";
import { statusReadable } from "@/lib/fn/stake/util";
import { useState } from "react";

export type ValidatorSelectProps = {
  onChange: (e: string) => void;
  value: string;
  validators: Validator[];
};
export type ValidatorInputProps = {
  label: string;
  field: string;
  icon: JSX.Element;
  value: string;
  validators: Validator[];
  description: string;
  placeholder?: string;
  form: any;
};

export default function ValidatorInput({
  field,
  placeholder,
  description,
  form,
  icon,
  label,
  value,
  validators,
}: ValidatorInputProps) {
  const [val, setValue] = useState<string>(value);
  const data = validators.map((v: Validator) => ({
    value: v.operator_address,
    group: statusReadable({ jailed: v.jailed, status: v.status }),
    disabled: false,
    label: v.description?.moniker,
  }));
  const select = (
    <NativeSelect
      // nothingFound={"No validators"}
      // maxDropdownHeight={280}
      // searchable
      data={data}
      // transition={"slide-down"}
      // transitionDuration={50}
      // transitionTimingFunction={"ease"}
      value={val}
      onChange={(e): void => {
        setValue(e.currentTarget.value);
      }}
    />
  );
  return (
    <TextInput
      withAsterisk
      icon={icon}
      variant="filled"
      value={val}
      rightSection={select}
      placeholder={placeholder ? placeholder : ""}
      onChange={(e) => setValue(e.currentTarget.value)}
      rightSectionWidth={90}
      description={description}
      mb={10}
      label={label}
    />
  );
}
//     {...form.getInputProps(field)} />
