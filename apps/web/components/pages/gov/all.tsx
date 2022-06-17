import { ProposalCardWrapper } from "@/cmp/cards";
import { GovProps } from "@/pages/governance";
import { Proposal } from "@/types/gov";
import { Grid } from "@mantine/core";

export type AllProposalsProps = {
  proposals: Proposal[];
};
export const AllProposals = ({ proposals }: AllProposalsProps) => {
  if (proposals) {
    return (
      <Grid sx={{ minWidth: "100%" }} gutter={20}>
        <Grid.Col span={6}>
          {proposals.map((p: Proposal, i: number) =>
            i % 2 == 0 ? <ProposalCardWrapper proposal={p} /> : <></>
          )}
        </Grid.Col>
        <Grid.Col span={6}>
          {proposals.map((p: Proposal, i: number) =>
            i % 2 == 1 ? <ProposalCardWrapper proposal={p} /> : <></>
          )}
        </Grid.Col>
      </Grid>
    );
  } else {
    return (
      <Grid style={{ minWidth: "100%" }} gutter={20}>
        <Grid.Col span={6}>
          <h2>No proposals!</h2>
        </Grid.Col>
      </Grid>
    );
  }
};

export default AllProposals;
