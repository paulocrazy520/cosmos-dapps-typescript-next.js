import {
  rpcUrl,
  apiUrl,
  apiGet,
  rpcGet,
  endpoints,
  jsonRpc,
} from "../../lib/api";
export { rpcUrl, apiUrl, apiGet, rpcGet, endpoints } from "../../lib/api";
import { observer } from "mobx-react-lite";
import { NextApiHandler, NextApiResponse, NextApiRequest } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json({
    dev: process.env.DEVELOPMENT,
    dbUrl: process.env.DB_URL,
    nodeEnv: process.env.NODE_ENV,
    testnet: process.env.TESTNET,
    explorer: process.env.OLLO_EX,
    docs: process.env.OLLO_DOCS,
    chainId: process.env.CHAIN_ID,
    url: process.env.OLLO_API,
  });
}
