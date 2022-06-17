import axios from "axios";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await axios.get(
    process.env.OLLO_API + "/lcd/ollo/ons/whois"
  );
  res.status(200).json({ data });
}
