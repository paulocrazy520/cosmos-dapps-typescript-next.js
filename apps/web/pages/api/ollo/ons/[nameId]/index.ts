import axios from "axios";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nameId } = req.query;
  const { data } = await axios.get(
    (process.env.OLLO_API + "/lcd/ollo/ons/whois/" + nameId) as string
  );
  res.status(200).json({ data });
}
