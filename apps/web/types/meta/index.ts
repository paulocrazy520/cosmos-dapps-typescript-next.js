import { Tooltip, Text } from "@mantine/core";
import { NextApiRequest } from "next";

export declare type HeadersMetadata = {
  date: string;
  "x-server-time": string;
  "grpc-metadata-x-cosmos-block-height": string;
};

export const metadataFromHeaders = (
  req: NextApiRequest
): HeadersMetadata | void => {
  const h = req.headers;
  const serverTime = h["x-server-time"];
  const date = h["date"];
  const blockHeight = h["grpc-metadata-x-cosmos-block-height"];
  if (serverTime && date && blockHeight)
    return {
      date: date,
      "x-server-time": serverTime as string,
      "grpc-metadata-x-cosmos-block-height": blockHeight as string,
    };
};
