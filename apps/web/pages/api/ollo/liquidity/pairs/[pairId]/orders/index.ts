import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.setHeader("accept", "application/json")
  const { pairId } = req.query;
  const { data } = await axios.get(
    `${process.env.OLLO_API}/lcd/ollo/liquidity/params`
  );
  return res.status(200).json(data);
}
