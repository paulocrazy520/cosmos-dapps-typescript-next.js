import { Title } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import { Slayout } from "../../../components/layout/sublayout";

export const Upgrades: FunctionComponent<{}> = observer(({}) => {
  return (
    <Slayout pgTitle="Upgrades">
      <Title>Upgrades</Title>
    </Slayout>
  );
});
export default Upgrades;
