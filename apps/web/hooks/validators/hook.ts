import { useQuery } from "@tanstack/react-query";
import { getValidator, getValidators } from "../../lib/fn";
import { fchr } from "../../lib/api/fetch";
import { Validator } from "../../types/staking";

export function useValidator(addr: string): Validator {
  const { data, error } = useQuery(["ollo-validator"], () =>
    getValidator(addr)
  );
  return data;
}
export function useValidators(): Validator[] {
  const { data, error } = useQuery(["ollo-validators"], () => getValidators());
  //@ts-ignore
  return data.validators;
}
