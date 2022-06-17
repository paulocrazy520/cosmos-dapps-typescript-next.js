import { NextApiRequest, NextApiResponse } from "next";
import { apiGet, apiUrl, fchr, setCookie } from "../../lib/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const v = await apiGet("cosmos/staking/v1beta1/validators");
  switch (req.method) {
    case "GET": {
      if (req.cookies["ollo-waddr"]) {
        const addr = req.cookies["ollo-waddr"];
        const validators = v.validators.filter(
          (v) => v.operator_address === addr
        );
        return res.status(200).json(validators);
      }
      return res.status(200).json({
        validators: v.length,
        body: req.body,
        query: req.query,
        cookies: req.cookies,
        env: process.env,
      });
    }
    case "POST": {
      if (req.body) {
        const { addr } = req.body;
        setCookie(res, "ozone-waddr", addr as string);
        return res.end(res.getHeader("Set-Cookie"));
      } else return res.json({});
    }
    default:
      return res.json({});
  }
}
