import {
  Alert,
  createStyles,
  Grid,
  Group,
  LoadingOverlay,
  MantineTheme,
  Skeleton,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { TbArrowBack, TbArrowDownCircle } from "react-icons/tb";
import { LayoutCard } from ".";
import { ActionBtn } from "../buttons";

export interface SplitProps {
  sideChildren: React.ReactNode;
  sideSpan?: number;
  children: React.ReactNode;
}
export const Split: FunctionComponent<SplitProps> = ({
  sideChildren,
  sideSpan,
  children,
}) => {
  const sp = sideSpan ? sideSpan : 4;
  return (
    <Grid grow>
      <Grid.Col span={sp}>{sideChildren}</Grid.Col>
      <Grid.Col span={12 - sp}>{children}</Grid.Col>
    </Grid>
  );
};

export interface LoadingSplitProps {
  sideSpan?: number;
  sideChildren?: JSX.Element;
  children?: JSX.Element;
  loading?: boolean;
}
export interface ErrorSplitProps {
  sideSpan?: number;
  onCloseAlert?: () => void;
  sideChildren?: JSX.Element;
  children?: JSX.Element;
  title: string;
  message: string;
}
export const useErrorSplitStyles = createStyles((theme: MantineTheme) => ({
  alert: {},
}));
export const ErrorSplit: FunctionComponent<ErrorSplitProps> = ({
  sideSpan = 0,
  children,
  title,
  message,
  sideChildren,
  onCloseAlert,
}: ErrorSplitProps) => {
  const { back, reload, query } = useRouter();
  const {
    classes: { alert },
    theme: {
      colorScheme,
      colors: { red },
    },
  } = useErrorSplitStyles();
  return (
    <Split
      sideSpan={sideSpan}
      sideChildren={<>{sideChildren && sideChildren}</>}
    >
      <>
        <Group position="apart" grow>
          <Group position="left">
            <Title size={18}>Error</Title>
          </Group>
          <Group position="right">
            <ActionBtn
              label="Go back"
              icon={<TbArrowBack />}
              variant="filled"
              onClick={() => {
                back();
              }}
            />
            <ActionBtn
              label="Refresh"
              icon={<TbArrowDownCircle />}
              variant="filled"
              onClick={() => {
                reload();
              }}
            />
          </Group>
        </Group>
        <Alert
          color={colorScheme == "dark" ? red[7] : red[5]}
          variant="light"
          className={alert}
          withCloseButton
          title={title}
          onClose={() => {
            onCloseAlert();
          }}
        >
          {message}
        </Alert>
        {children && children}
      </>
    </Split>
  );
};
export const LoadingSplit: FunctionComponent<LoadingSplitProps> = ({
  sideSpan = 4,
  children,
  sideChildren,
  loading = false,
}: LoadingSplitProps) => {
  return (
    <Split
      sideSpan={sideSpan}
      sideChildren={
        <>
          {sideChildren && sideChildren}
          <LoadingOverlay visible={loading} overlayBlur={4} color="violet">
            <Skeleton height={400} />
          </LoadingOverlay>
        </>
      }
    >
      <>
        {children && children}
        <LoadingOverlay color="violet" overlayBlur={4} visible={loading}>
          <Skeleton height={400} />
        </LoadingOverlay>
      </>
    </Split>
  );
};
export default Split;
