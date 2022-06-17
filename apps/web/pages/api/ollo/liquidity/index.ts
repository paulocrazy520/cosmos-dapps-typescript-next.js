import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("accept", "application/json");
  const { data } = await axios.get(
    process.env.OLLO_API + "/lcd/ollo/liquidity/pools"
  );
  res.status(200).json(data);
}
