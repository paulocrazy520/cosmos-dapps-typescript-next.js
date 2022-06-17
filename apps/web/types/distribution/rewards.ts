import { Coin } from "@cosmjs/stargate";

export type ValidatorReward = {
  validator_address: string;
  reward: Coin[];
};

export declare type RewardsResponse = {
  rewards: ValidatorReward[];
  total: Coin[];
};
