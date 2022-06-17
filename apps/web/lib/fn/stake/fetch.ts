import { apiUrl, apiGet, cosmos } from "@/lib/api";
import { ValidatorReward } from "@/types/distribution";
import { DelegationResponse, Validator } from "@/types/staking";
// import { OlloFetch } from '../'
import { Coin } from "@cosmjs/stargate";
import { Delegation } from "@keplr-wallet/stores/build/query/cosmos/staking/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getValidator = async (addr: string): Promise<Validator> => {
  if (addr == "") return Promise.resolve({} as Validator);
  return await axios
    .get(`${process.env.OLLO_API}/cosmos/staking/v1beta1/validators/${addr}`)
    .then((r) => r.data.validator);
};
export const getDelegations = async (
  addr: string
): Promise<DelegationResponse[]> => {
  if (addr == "") return Promise.resolve([]);
  return await axios
    .get(`${process.env.OLLO_API}/cosmos/staking/v1beta1/delegations/${addr}`)
    .then((r) => r.data.delegation_responses);
};
export const getValidatorDelegation = async (
  addr: string,
  val: string
): Promise<DelegationResponse> => {
  if (addr == "" || val == "") return Promise.resolve({} as DelegationResponse);
  return await axios
    .get(`${process.env.OLLO_API}/api/ollo/${addr}/delegations/${val}`)
    .then((r) => r.data)
    .then((r) => r.delegation_response)
    .catch((e) => {
      console.log(e);
      return {};
    });
};

export const getValidatorRewards = async (
  addr: string,
  val: string
): Promise<Coin[]> => {
  if (addr == "" || val == "") return Promise.resolve([]);
  return await axios
    .get(
      `${process.env.OLLO_API}/cosmos/distribution/v1beta1/delegators/${addr}/rewards/${val}`
    )
    .then((r) => r.data.rewards);
};

export const getValidators = async (): Promise<Validator[]> => {
  return await axios
    .get(
      `${process.env.OLLO_API}/cosmos/staking/v1beta1/validators?pagination.limit=100&status=BOND_STATUS_BONDED`
    )
    .then((data) => data.data.validators);
};

export async function getValidatorListByStatus(status) {
  return await axios
    .get(
      `${process.env.OLLO_API}/cosmos/staking/v1beta1/validators?status=${status}&pagination.limit=500`
    )
    .then((r) => r.data.validators);
}

export const getStakeParams = async () => {
  return await axios
    .get(`${process.env.OLLO_API}/cosmos/staking/v1beta1/params`)
    .then((r) => r.data.pool);
};
export const getPoolInfo = async () => {
  return await axios
    .get(`${process.env.OLLO_API}/cosmos/staking/v1beta1/pool`)
    .then((r) => r.data.pool);
};
export const getInactiveValidators = async () => {
  return await axios
    .get(
      `${process.env.OLLO_API}/cosmos/staking/v1beta1/validators?pagination.limit=100&status=BOND_STATUS_UNBONDED`
    )
    .then((r) => r.data.validators);
};

export const useDelegations = async (
  addr: string,
  init?: DelegationResponse[]
) => {
  return useQuery(["ollo", "delegations", addr], () => getDelegations(addr), {
    initialData: init ? init : [],
  });
};
export const useValidators = async (init?: Validator[]) => {
  return useQuery(["ollo", "validators"], getValidators, {
    initialData: init ? init : [],
  });
};
