import { Grid, Text, Tooltip } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";

export interface TooltipTextProps {
  tooltip: string;
  children: React.ReactNode;
}
export const TooltipText: FunctionComponent<TooltipTextProps> = observer(
  ({ tooltip, children }: TooltipTextProps) => {
    return (
      <Tooltip label={tooltip}>
        <Text>{children}</Text>
      </Tooltip>
    );
  }
);
export default TooltipText;
