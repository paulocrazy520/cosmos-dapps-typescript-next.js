import { sleep } from "@axelar-network/axelarjs-sdk";
import { Coin } from "@cosmjs/stargate";

export declare interface ValidatorState {
  jailed: boolean;
  status: string;
}
export declare enum ValidatorStatus {
  Bonded = "BOND_STATUS_BONDED",
  Unbonding = "BOND_STATUS_UNBONDING",
  Inactive = "BOND_STATUS_UNBONDED",
}

export declare interface Validator {
  operator_address: string;
  jailed: boolean;
  status: string;
  tokens: string;
  delegator_shares: string;
  min_self_delegation: string;
  commission: {
    update_time: string;
    commission_rates: {
      rate: string;
      max_rate: string;
      max_change_rate: string;
    };
  };
  description?: {
    moniker?: string;
    identity?: string;
    website?: string;
    security_contact?: string;
    details?: string;
  };
  consensusPubkey: {
    "@type": string;
    key: string;
  };

  unbonding_height: string;
  unbonding_time: string;
}

export interface StakeParams {
  unbonding_time: "string";
  max_validators: string;
  max_entries: string;
  historical_entries: string;
  bond_denom: "string";
}

export interface StakingPool {
  not_bonded_tokens: string;
  bonded_tokens: string;
}
export interface DelegationBalance {
  amount: string;
  denom: string;
}
export interface DelegationResponse {
  delegation: Delegation;
  balance: DelegationBalance;
}
export interface Delegation {
  delegator_address: string;
  validator_address: string;
  shares: string;
}
export interface Rewards {
  rewards: Reward[];
  total: Coin[];
}
export interface Reward {
  validator_address: string;
  reward: Coin[];
}

export class ValidatorDisplay {
  protected readonly active: Validator[] = [];
  protected readonly inactive: Validator[] = [];
  protected readonly length: number;

  constructor(v: Validator[]) {
    if (typeof v === "undefined") {
      sleep(1).then(() => {
        // console.log("ValidatorDisplay: undefined")
      });
    }
    this.length = v.length;
    if (v.length > 100) {
      this.active = v.slice(0, 100);
      this.inactive = v.slice(100, v.length);
    } else this.active = v;
  }

  get valSet(): Validator[] {
    return this.active;
  }
  get len(): number {
    return this.length;
  }

  get inactiveLen(): number {
    return this.inactive.length;
  }

  get jailed(): Validator[] {
    return this.inactive.filter((v) => v.jailed);
  }
  get bonded(): Validator[] {
    return this.inactive.filter((v) => v.status == "BODED");
  }

  sortHelper(active?: boolean, inactive?: boolean): Validator[] {
    return active
      ? this.active
      : inactive
      ? this.inactive
      : this.active.concat(this.inactive);
  }
  sortByTokens(
    active?: boolean,
    inactive?: boolean,
    asc?: boolean
  ): Validator[] {
    return this.sortHelper(active, inactive).sort(
      (a: Validator, b: Validator) => {
        return asc
          ? parseInt(b.tokens) - parseInt(a.tokens)
          : parseInt(a.tokens) - parseInt(b.tokens);
      }
    );
  }
  sortByCommission(
    active?: boolean,
    inactive?: boolean,
    asc?: boolean
  ): Validator[] {
    return this.sortHelper(active, inactive).sort(
      (a: Validator, b: Validator) => {
        return asc
          ? parseInt(b.tokens) - parseInt(a.tokens)
          : parseInt(a.tokens) - parseInt(b.tokens);
      }
    );
  }
}
