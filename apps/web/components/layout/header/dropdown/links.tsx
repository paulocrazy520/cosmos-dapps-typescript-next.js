import {
  TbNotification,
  TbCode,
  TbBook,
  TbChartPie3,
  TbFingerprint,
  TbCoin,
  TbWallet,
  TbChevronDown,
  TbInfoCircle,
  TbSettings,
} from "react-icons/tb";
import { MantineTheme } from "@mantine/core";
import { DropdownLink } from "./dropdown";

export const getLinkData = ({
  colorScheme,
  primaryColor,
  colors: { violet },
}: MantineTheme): DropdownLink[] => {
  const size = 22;
  const color = colorScheme == "dark" ? violet[7] : violet[5];
  return [
    {
      icon: <TbCode size={size} color={color}></TbCode>,
      title: "Limit Trading",
      description: "Utilize limit orders to buy or sell assets",
      to: "#",
    },
    {
      icon: <TbCoin size={size} color={color}></TbCoin>,
      title: "Liquidity Pools",
      description: "The fluid of Smeargle’s tail secretions changes",
      to: "#",
    },
    {
      icon: <TbBook size={size} color={color}></TbBook>,
      title: "Early exit staking",
      description: "Yanma is capable of seeing 360 degrees without",
      to: "#",
    },
    {
      icon: <TbFingerprint size={size} color={color}></TbFingerprint>,
      title: "Liquidity backed lending",
      description: "The shell’s rounded shape and the grooves on its.",
      to: "#",
    },
    {
      icon: <TbChartPie3 size={size} color={color}></TbChartPie3>,
      title: "Portfolio Automation",
      description: "This Pokémon uses its flying ability to quickly chase",
      to: "#",
    },
    {
      icon: <TbNotification size={size} color={color}></TbNotification>,
      title: "Sustainable Tokenomics",
      description: "Combusken battles with the intensely hot flames it spews",
      to: "#",
    },
  ];
};
