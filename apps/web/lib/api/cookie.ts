// import { serialize, CookieSerializeOptions } from 'cookie'
// import { NextApiRequest, NextApiResponse } from 'next'

import { NextApiResponse } from "next";
import { CookieSerializeOptions } from "next/dist/server/web/types";

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if (typeof options.maxAge === "number") {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }

  res.setHeader("Set-Cookie", JSON.stringify({ name, stringValue, options }));
};

// pages/api/cookies.ts
