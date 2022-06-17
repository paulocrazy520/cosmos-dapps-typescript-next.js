import { ActionBtn } from "@/cmp/buttons";
import { LayoutCard } from "..";
import { SearchInput } from "@/cmp/input/search";
import { openModal } from "@mantine/modals";
import { useMantineTheme } from "@mantine/core";
import { TbFilter } from "react-icons/tb";
import { violet } from "@/config/theme";

export const GlanceCard = ({ top }) => {
  const theme = useMantineTheme();
  return (
    <LayoutCard
      actions={
        <>
          <ActionBtn
            label={"Filter search"}
            icon={<TbFilter />}
            color={violet(theme)}
            onClick={() => {
              openModal({
                title: "Manage Dashboard",
                modalId: "manage-dashboard",
                onClose: () => {},
              });
            }}
          />
        </>
      }
      top={top}
      title="Search"
    >
      <SearchInput />
    </LayoutCard>
  );
};
