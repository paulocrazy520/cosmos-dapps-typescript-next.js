import { NextApiRequest, NextApiResponse } from "next";
import { apiGet, setCookie } from "../../../../lib/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const v = await apiGet("cosmos/staking/v1beta1/validators");
  switch (req.method) {
    case "GET": {
      const { olloaddr } = req.cookies;
      const addr = olloaddr ? olloaddr : "";
      return res.status(200).json(addr);
    }
    case "POST": {
      const { olloaddr } = req.body;
      olloaddr && setCookie(res, "ozone-waddr", olloaddr as string);
      return olloaddr
        ? res.end(res.getHeader("Set-Cookie"))
        : res.json({ msg: "No body" });
    }
  }

  return res.json({});
}
