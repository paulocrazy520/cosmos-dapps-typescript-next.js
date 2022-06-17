import { NativeSelect } from "@mantine/core";

export function CurrencyInput() {
  const data = [{ value: "utollo", label: "🦉 TOLLO" }];
  return (
    <NativeSelect
      data={data}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      }}
    />
  );
}
