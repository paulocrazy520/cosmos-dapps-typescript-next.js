import React from "react";
import {
  TbGitPullRequest,
  TbAlertCircle,
  TbMessages,
  TbDatabase,
  TbArrowDownCircle,
  TbPool,
  TbDashboard,
  TbInfoCircle,
  TbTicket,
  TbHome,
  TbExchange,
  TbCompass,
  TbPodium,
  TbLayoutDashboard,
  TbBusinessplan,
  TbUsers,
  TbCircleDashed,
} from "react-icons/tb";
import {
  ThemeIcon,
  UnstyledButton,
  Group,
  Text,
  MantineGradient,
  useMantineTheme,
  Button,
  Avatar,
} from "@mantine/core";
import Link from "next/link";
import { IoIosBoat, IoIosShare, IoMdHeartHalf, IoMdSwap } from "react-icons/io";
import {
  BsBucketFill,
  BsBugFill,
  BsCircleFill,
  BsPlusCircleFill,
  BsSafe,
  BsSafe2,
} from "react-icons/bs";
import { useRouter } from "next/router";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  gradient?: MantineGradient;
  label: string;
  to: string;
}

function MainLink({ icon, color, label, to }: MainLinkProps) {
  const router = useRouter();
  return (
    <UnstyledButton
      onClick={() => {
        router.push(to);
      }}
      sx={({ colors, spacing, colorScheme, radius }) => ({
        display: "block",
        // boxShadow:"1px 0px 4px rbga(0,0,0,0.1)",
        // borderBottom: colorScheme==='dark'? "1px solid rgba(0,0,0,0.2)" : "1px solid rgba(0,0,0,0.1)",
        width: "100%",
        padding: spacing.xs,
        backgroundColor:
          router.asPath == to &&
          (colorScheme === "dark" ? colors.dark[8] : colors.gray[1]),
        borderColor:
          router.asPath == to &&
          (colorScheme === "dark" ? colors.dark[5] : colors.gray[3]),
        borderRadius: radius.sm,
        transition: "all 0.2s ease-in-out",
        color: colorScheme === "dark" ? colors.dark[0] : colors.black,

        "&:hover": {
          backgroundColor:
            colorScheme === "dark" ? colors.dark[6] : colors.gray[0],
        },
      })}
    >
      <Group>
        <Avatar size="sm" color={color} variant="subtle">
          <>{icon}</>
        </Avatar>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  { icon: <TbHome size={24} />, color: "violet", label: "Dashboard", to: "/" },
  { icon: <BsSafe2 size={24} />, color: "blue", label: "Stake", to: "/stake" },
  {
    icon: <IoMdSwap size={24} />,
    color: "yellow",
    label: "Trade",
    to: "/trade",
  },
  { icon: <IoIosBoat size={24} />, color: "teal", label: "Pools", to: "/pool" },
  {
    icon: <TbBusinessplan size={24} />,
    color: "salmon",
    label: "Borrow",
    to: "/borrow",
  },
  {
    icon: <TbPodium size={24} />,
    color: "grape",
    label: "Governance",
    to: "/governance",
  },
  // { icon: <TbInfoCircle size={24} />, color: 'cyan', label: 'Info', to: "/about" },
  { icon: <TbUsers size={24} />, color: "cyan", label: "NFTs", to: "/nft" },
  {
    icon: <TbCompass size={24} />,
    color: "orange",
    label: "Airdrop",
    to: "/airdrop",
  },
  // { icon: <TbCompass size={24} />, color: 'orange', label: 'Explorer', to: "https://explorer.ollo.zone" },
];

export function Links() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}

const others = [
  { icon: <TbHome size={24} />, color: "green", label: "Home", to: "/" },
];
