import { Text, Tooltip } from "@mantine/core";

export type HeadersTooltipProps = {
  date: string;
  children: React.ReactFragment;
  blockHeight: string;
};

export const MetadataTooltip = ({
  date,
  children,
  blockHeight,
}: HeadersTooltipProps): React.ReactElement => {
  const tooltipLabel = <Text>{blockHeight + " | " + date} </Text>;
  return (
    <Tooltip
      withArrow
      withinPortal
      transition={"slide-up"}
      label={tooltipLabel}
    >
      {children}
    </Tooltip>
  );
};
