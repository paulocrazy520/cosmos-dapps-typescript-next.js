import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { BondStatus } from "@keplr-wallet/stores/build/query/cosmos/staking/types";
import { NextApiRequest, NextApiResponse } from "next";
import { RootStore } from "../../../stores/root";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const keplrExt = getKeplrFromWindow();
  const { status } = req.query;
  let bondStatus: BondStatus = BondStatus.Unspecified;
  if (typeof status === "undefined") bondStatus = BondStatus.Unspecified;
  else {
    switch (status as string) {
      case "unbonded":
        bondStatus = BondStatus.Unbonded;
        break;
      case "bonded":
        bondStatus = BondStatus.Bonded;
        break;
      case "unbonding":
        bondStatus = BondStatus.Unbonding;
        break;
      default:
        bondStatus = BondStatus.Unspecified;
    }
  }
  const store = new RootStore(() => {
    return keplrExt;
  });
  const {
    queriesExternalStore,
    queriesStore,
    accountStore: { getAccount },
    chainStore: {
      ollo: { chainId, rpc, rest },
    },
  } = store;
  const v = queriesStore
    .get(chainId)
    .cosmos.queryValidators.getQueryStatus(bondStatus);
  // const v = await vals.waitFreshResponse()
  // console.log(v, vals.validators, rpc, rest)
  // const r = v.staled? vals.validatorsSortedByVotingPower : v.data.validators
  switch (req.method) {
    case "GET":
      return res.status(200).json(v);
  }
}
