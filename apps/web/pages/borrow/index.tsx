import { createStyles, MantineTheme, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { Slayout } from "../../components/layout/sublayout";

export interface BorrowProps {}

export const useBorrowStyles = createStyles((theme: MantineTheme) => ({}));

export const Borrow = observer(({}: BorrowProps) => {
  const { classes } = useBorrowStyles();
  return (
    <Slayout pgTitle="Borrow">
      <Title>Borrow</Title>
    </Slayout>
  );
});

export default Borrow;
