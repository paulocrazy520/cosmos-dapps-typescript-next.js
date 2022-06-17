import { AuthParams } from "@/types/auth";
import { apiGet } from "../..";
export const getOlloAuthParams = async (): Promise<AuthParams> => {
  return await apiGet(`${process.env.OLLO_API}/ollo/auth/params`)
    .then((r) => r.params)
    .catch((e) => {
      console.log(e);
      return {};
    });
};
