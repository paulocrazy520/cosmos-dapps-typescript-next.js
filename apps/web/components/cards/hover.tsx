import { HoverCard } from "@mantine/core";

export interface HCardProps {
  title: string;
  details: string;
}
export default function HCard({ title, details }: HCardProps) {
  return (
    <HoverCard>
      <HoverCard.Target>{title}</HoverCard.Target>
      <HoverCard.Dropdown>{details}</HoverCard.Dropdown>
    </HoverCard>
  );
}
