import { Group, Paper, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";

export interface CTitleProps {
  size?: number;
  title: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}
export const CTitle = observer(
  ({ title, size, rightContent, leftContent }: CTitleProps) => {
    return (
      <Group position="apart">
        <Group position="left">
          <Title size={size ? size : 24} mr={8}>
            {title ? title : "Overview"}
          </Title>
          {leftContent}
        </Group>

        {rightContent ? <Group position="right">{rightContent}</Group> : null}
      </Group>
    );
  }
);
export interface CTitleCardProps {
  size?: number;
  title: string;
  rightContent?: React.ReactNode;
  children: React.ReactNode;
}

export const TitleCard = observer(
  ({ title, size, rightContent, children }: CTitleCardProps) => {
    return (
      <Paper shadow={"lg"} px={"md"} py={"md"}>
        <CTitle title={title} size={size} rightContent={rightContent} />
        <br />
        {children}
      </Paper>
    );
  }
);
