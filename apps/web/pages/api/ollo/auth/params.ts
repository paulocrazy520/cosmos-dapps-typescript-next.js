import { NextApiRequest, NextApiResponse } from "next";
import { apiUrl } from "../..";

export default async function Validators(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await fetch(apiUrl("comos/auth/v1beta1/params")).then(
        (response) => {
          return res.status(200).json(response.json());
        }
      );
  }
}
