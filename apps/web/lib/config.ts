import dynamic, { DynamicOptions } from "next/dynamic";
import { Loader } from "@mantine/core";

export const suspenseCfg: DynamicOptions = {
  suspense: true,
};
export type DynProps = {
  path: string;
  loader: JSX.Element;
};
export type SusProps = {
  path: string;
  loader: JSX.Element;
  fb: React.ReactFragment;
};
export const Dyn = ({ path, loader }: DynProps) => {
  dynamic(() => import(path), {
    loading: () => loader,
    suspense: true,
  });
};
