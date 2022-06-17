import React from "react";
import Image from "next/image";
import { Container, ColorScheme, Text } from "@mantine/core";

export const Logo = React.forwardRef(function Logo(
  { colorScheme }: { colorScheme: ColorScheme },
  ref
) {
  return (
    <Image
      style={{
        textShadow: "1px 1px 4px rgba(0,0,0,0.2)",
      }}
      alt="logo"
      width={96}
      height={48}
      src="/images/white.png"
    ></Image>
    // <Text height={32}>OLLO Station</Text>
  );
});
