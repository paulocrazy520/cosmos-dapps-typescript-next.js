import { RewardsResponse, ValidatorReward } from "@/types/distribution";
import { DelegationResponse, Validator } from "@/types/staking";
import { Coin } from "@cosmjs/stargate";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { getValidator, getValidatorRewards, getValidators } from ".";
import { zeroAmt } from "..";
import { getValidatorDelegation } from "../..";

export declare type UseOlloValidatorsResponse = {
  validators: Validator[];
};
export declare type UseOlloValidatorInfoResponse = {
  userAddr: string;
  validator: Validator;
  delegation: Coin;
  rewards: Coin;
};

export const useOlloDelegations = (u: string) => {};

export const useOlloValidatorInfo = (
  u: string,
  v: string
): UseOlloValidatorInfoResponse => {
  let [
    { data: val, isFetched: vFetched },
    { data: r, isFetched: rFetched },
    { data: d, isFetched: dFetched },
  ] = useQueries({
    queries: [
      { queryKey: ["ollo", "validator", v], queryFn: () => getValidator(v) },
      {
        queryKey: ["ollo", "reward", { delegator: u, validator: v }],
        queryFn: () => getValidatorRewards(u, v),
        initialData: [zeroAmt],
      },
      {
        queryKey: ["ollo", "delegation", { delegator: u, validator: v }],
        queryFn: () => getValidatorDelegation(u, v),
      },
    ],
  });

  if (vFetched && rFetched && dFetched) {
    return {
      userAddr: u,
      validator: val,
      delegation: d ? d.balance : zeroAmt,
      rewards: r ? r.find((c: Coin) => c.denom == "utollo") : zeroAmt,
    };
  }
};

export const useOlloValidator = (vl: string): Validator => {
  const q = useQueryClient();
  const {
    data: validator,
    isFetching,
    ...query
  } = useQuery(
    ["ollo", "validators"],
    async () => {
      return await getValidators().then((v: Validator[]) =>
        v.find((v: Validator) => v.operator_address == vl)
      );
    },
    {
      initialData: () => {
        return q
          .getQueryData<Validator[]>(["ollo", "validators"])
          .find((v: Validator) => v.operator_address == vl);
      },
    }
  );
  return validator;
};
export const useOlloValidators = (): Validator[] => {
  const q = useQueryClient();
  const {
    data: validators,
    isFetching,
    ...query
  } = useQuery(
    ["ollo", "validators"],
    async () => {
      return await getValidators();
    },
    {
      initialData: () => {
        return q.getQueryData(["ollo", "validators"]);
      },
    }
  );
  if (query.isFetched) return validators;
  return validators;
};
export const useOlloInactiveValidators = (): Validator[] => {
  const q = useQueryClient();
  const {
    data: validators,
    isFetching,
    ...query
  } = useQuery(
    ["ollo", "validators", "inactive"],
    async () => {
      return await getValidators();
    },
    {
      initialData: () => {
        return q.getQueryData(["ollo", "validators", "inactive"]);
      },
    }
  );
  if (query.isFetched) return validators;
  return validators;
};
