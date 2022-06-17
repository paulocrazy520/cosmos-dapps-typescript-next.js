import { UserOverviewCard } from "@/cmp/cards/user/overview";
import { Slayout, Split, LayoutCard } from "@/cmp/layout";
import { getOlloAccount, zeroAmt } from "@/lib/fn";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

export type UserAddrPageProps = {};
export const UserAddrPage = ({}: UserAddrPageProps): React.ReactElement => {
  const {
    query: { useraddr },
  } = useRouter();
  return (
    <Slayout pgTitle={useraddr as string}>
      <Split
        sideChildren={
          <UserOverviewCard
            stakedBalance={zeroAmt}
            spendableBalance={zeroAmt}
            balance={zeroAmt}
            olloAddr={useraddr as string}
            username=""
          />
        }
      >
        <LayoutCard></LayoutCard>
      </Split>
    </Slayout>
  );
};

export default UserAddrPage;
