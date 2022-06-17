import Link from "next/link";
import Image from "next/image";
import React, { FunctionComponent } from "react";
// import { NavBarEvents } from "../config";
// import { useMatomoAnalytics } from "../hooks";
import { ModalBase, ModalBaseProps } from "./base";
import { Box, createStyles, Paper, Text, Title, Space, Group } from "@mantine/core";
import { Button } from "../components/buttons";

export const useStyles = createStyles((theme) => ({
  base: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
  },
}));

export const KeplrConnectionSelectModal: FunctionComponent<
  ModalBaseProps & {
    overrideWithKeplrInstallLink?: string;
    onSelectExtension: () => void;
    onSelectWalletConnect: () => void;
  }
> = ({
  isOpen,
  onRequestClose,
  overrideWithKeplrInstallLink,
  onSelectExtension,
  onSelectWalletConnect,
}) => {
    const { classes, theme } = useStyles();
    return (
      <ModalBase
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        title={<Title>Connect Wallet</Title>}
      >
        <Group className="wallet_connect_button_style">
        {overrideWithKeplrInstallLink ? (
          <Button
            onClick={() => {
              window.open(overrideWithKeplrInstallLink, "_blank");
            }}
          >
            <Image
              src="/images/keplr-logo.png"
              alt="keplr logo"
              width={50}
              height={50}
            />
            <Box>
              <Paper className="flex items-center gap-2">
                <Title>Install Keplr</Title>
                <Image
                  src="/icons/external-link-white.svg"
                  alt="external link"
                  width={14}
                  height={14}
                />
              </Paper>
              <Box>{overrideWithKeplrInstallLink}</Box>
            </Box>
          </Button>
        ) : (
            <Button
              className="wallet_connect_button"
              onClick={() => {
                onSelectExtension();
              }}
            >
            <Image
              src="/images/keplr-logo.png"
              alt="keplr logo"
              width={50}
              height={50}
              />
              <Space w={10}></Space>
            <Box>
              <Title size={25}>Keplr Wallet</Title>
              <Text>Keplr Browser Extension</Text>
            </Box>
          </Button>
        )}

        <Button
          className="wallet_connect_button"
          onClick={() => {
            onSelectWalletConnect();
          }}
        >
          <Image
            src="/icons/walletconnect.svg"
            alt="wallet connect logo"
            width={50}
            height={50}
          />
          <Space w={10}></Space>
          <Box>
            <Title size={25}>WalletConnect</Title>
            <Text>Keplr Mobile</Text>
          </Box>
          </Button>
        </Group>
      </ModalBase>
    );
  };
