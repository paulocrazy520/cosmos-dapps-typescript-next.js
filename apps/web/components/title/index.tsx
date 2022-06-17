import { Divider, Group, ThemeIcon, Title } from "@mantine/core";
import { IconBase, IconType } from "react-icons/lib";
import { TbCheck } from "react-icons/tb";

type CardSubtitleProps = {
  title: string;
  size?: number;
  color?: string;
  divider?: boolean;
  icon?: React.ReactNode;
};
export const CardSubtitle = ({
  title,
  icon,
  size,
  color,
  divider = false,
}: CardSubtitleProps) => {
  return (
    <>
      {" "}
      <Group position="left" spacing="xs" align="center">
        {icon && (
          <ThemeIcon size={16} color={color ? color : "violet"}>
            {icon}
          </ThemeIcon>
        )}
        <Title size={size ? size : 20}>{title}</Title>
      </Group>
      {divider && <Divider mt={4} />}
    </>
  );
};
