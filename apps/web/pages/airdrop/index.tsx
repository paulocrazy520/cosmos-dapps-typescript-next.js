import { createStyles, MantineTheme, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { Slayout } from "../../components/layout/sublayout";

export interface AirdropProps {}

export const useAirdropStyles = createStyles((theme: MantineTheme) => ({}));

export const Airdrop = observer(({}: AirdropProps) => {
  const { classes } = useAirdropStyles();
  return (
    <Slayout pgTitle="Airdrop">
      <Title>Airdrop</Title>
    </Slayout>
  );
});

export default Airdrop;
