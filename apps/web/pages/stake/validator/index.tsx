import { Box, Divider, Grid, Skeleton, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { Slayout } from "../../../components/layout/sublayout";

export interface ValidatorsPageProps {}
export const ValidatorsPage: FunctionComponent<ValidatorsPageProps> = observer(
  ({}: ValidatorsPageProps) => {
    const {
      asPath,
      isReady,
      pathname,
      basePath,
      beforePopState,
      push,
      route,
      reload,
    } = useRouter();
    return (
      <Slayout>
        <>
          <Title>Validators</Title>
          <Divider />
          <br />
          {isReady ? (
            <Grid>
              <Grid.Col span={4}></Grid.Col>
              <Grid.Col span={8}></Grid.Col>
            </Grid>
          ) : (
            <Skeleton height={800} />
          )}
        </>
      </Slayout>
    );
  }
);

export default ValidatorsPage;
