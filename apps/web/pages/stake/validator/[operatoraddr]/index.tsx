import {
  Alert,
  Box,
  Center,
  List,
  Loader,
  Skeleton,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { LayoutTabCard } from "@/cmp/cards/card/tabs";
import { FunctionComponent } from "react";
import { Slayout } from "../../../../components/layout/sublayout";
import { useRouter } from "next/router";
import { Validator } from "@/types/staking";
import Split, { ErrorSplit, LoadingSplit } from "@/cmp/layout/split";
import { LayoutCard } from "@/cmp/cards/card";
import { TbPlus, TbView360 } from "react-icons/tb";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPageContext } from "next";
import { getValidator } from "@/lib/fn/stake";
import {
  ValidatorOverviewCard,
  ValOverviewCard,
} from "../../../../components/cards/validator/overview";
import { useStore } from "../../../../stores";

export interface ValidatorPageProps {}

// export const getValidator = (operator_address: string) => {
//     return fetch(apiUrl("cosmos/staking/v1beta1/validators/ " + operator_address))
//     .then(r=>r.json())

// }

export const ValidatorPage: FunctionComponent<
  ValidatorPageProps
> = ({}: ValidatorPageProps) => {
  const {
    query: { operatoraddr: addr },
    push,
  } = useRouter();
  const q = useQueryClient();
  const {
    data: val,
    isSuccess,
    isFetched,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery(
    ["ollo", "validator", addr as string],
    async () => await getValidator(addr as string),
    { initialData: q.getQueryData<Validator>(["ollo", "validator", addr]) }
  );
  const {
    accountStore,
    chainStore: {
      ollo: { chainId },
    },
  } = useStore();
  const { bech32Address } = accountStore.getAccount(chainId);
  const card = (
    <ValidatorOverviewCard bech32Address={bech32Address} validator={val} />
  );
  // if (error) return <Alert color={"red"}>Error fetching {operator_addr as string}</Alert>
  // if (!data) return <Skeleton />
  // @ts-ignore
  if (isLoading) return <LoadingSplit />;
  else if (isFetching) return <LoadingSplit loading={isFetching} />;
  else if (isSuccess || isFetched)
    return (
      <Slayout
        pgTitle={
          val &&
          `${val.description?.moniker ? val.description?.moniker : "Validator"}`
        }
      >
        <Split
          sideChildren={
            <>
              {card}
              <LayoutCard title="Validator Information">
                <List
                  spacing="sm"
                  icon={
                    <ThemeIcon color="violet" size={12} radius="sm">
                      <TbPlus size={12} />
                    </ThemeIcon>
                  }
                >
                  <List.Item>{val.description?.moniker}</List.Item>
                </List>
              </LayoutCard>
              <LayoutCard title="Delegators"></LayoutCard>
            </>
          }
        >
          <LayoutTabCard
            title="Validator Profile"
            default="profile"
            top={false}
            tabs={[
              {
                title: "Profile",
                value: "profile",
                children: <>HI</>,
                icon: <TbView360 />,
              },
              {
                title: "Information",
                value: "info",
                children: <></>,
                icon: <TbView360 />,
              },
            ]}
          />
          <LayoutCard title={"Activity"}></LayoutCard>
        </Split>
      </Slayout>
    );
  else if (isError)
    return (
      <ErrorSplit
        message={"Couldn't fetch validator."}
        title={`Couldn't get validator ${addr}`}
      />
    );
  else return <Skeleton height={400} />;
};

export default ValidatorPage;

// export async function getServerSideProps(context: NextPageContext) {
// const { query: { operatoraddr: addr } } = context
// const validator = await getValidator(addr as string)
// return {
// props: {
// validator
// }
// }
// }
