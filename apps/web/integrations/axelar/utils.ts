import { SourceChain } from "../bridge-info";

export function waitBySourceChain(sourceChain: SourceChain) {
  switch (sourceChain) {
    case "Ethereum":
    case "Polygon":
    // return "assets.transfer.waitTime", { minutes: "15" });
    default:
    // return t("assets.transfer.waitTime", { minutes: "3" });
  }
}
