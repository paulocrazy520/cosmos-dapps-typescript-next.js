import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Group,
} from "@mantine/core";
import { TbArrowUpRight, TbArrowDownRight } from "react-icons/tb";

interface StatsRingProps {
  data: {
    label: string;
    stats: string;
    progress: number;
    color: string;
    icon: "up" | "down";
  }[];
}

const icons = {
  up: TbArrowUpRight,
  down: TbArrowDownRight,
};

export function StatsRing({ data }: StatsRingProps) {
  const stats = data.map((stat) => {
    const Cicon = icons[stat.icon];
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Cicon size={22} />
              </Center>
            }
          />

          <div>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              {stat.label}
            </Text>
            <Text weight={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });
  return (
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
      {stats}
    </SimpleGrid>
  );
}
