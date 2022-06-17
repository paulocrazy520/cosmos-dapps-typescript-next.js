import Image from "next/image";
import { NextPage } from "next";
import { Slayout } from "../components/layout/sublayout";
import { Box } from "@mantine/core";
import { useRouter } from "next/router";

const Custom404: NextPage = () => {
  const { back, replace, beforePopState, route, events } = useRouter();
  return (
    <Slayout>
      <Box>
        <Image
          src="/icons/warning.svg"
          alt="not found"
          height={25}
          width={25}
        />
        <h6>Not found</h6>
      </Box>
    </Slayout>
  );
};

export default Custom404;
