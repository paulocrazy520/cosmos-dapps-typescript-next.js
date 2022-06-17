import { RiReservedFill } from "react-icons/ri";
import { apiGet, apiUrl } from "../..";

export default async function handler(req, res) {
  const { status } = req.query;
  let s = "";
  if (status == "unbonded") s = "BOND_STATUS_UNBONDED";
  else if (status == "bonded") s = "BOND_STATUS_BONDED";
  else if (status == "unbonding") s = "BOND_STATUS_UNBONDING";
  else if (status == "bonding") s = "BOND_STATUS_BONDING";
  else if (status == "jailed") s = "JAILED";
  else if (!status) s = "";

  const url =
    "cosmos/staking/v1beta1/validators" + (s != "" ? "status=" + s : "");
  const validators = await fetch(apiUrl(url))
    .then((r) => r.json())
    .then((r) => r.validators);
  switch (req.method) {
    case "GET":
      return res
        .status(200)
        .json({ validators: validators, query: req.query, url: url });
  }
}
