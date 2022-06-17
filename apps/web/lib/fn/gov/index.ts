import { observer } from "mobx-react-lite";
import { Proposal, ProposalTally } from "@/types/gov";
import { useStore, createStore } from "zustand";

export const proposalTally = (
  p: Proposal,
  normalized?: boolean
): ProposalTally => {
  if (p) {
    return normalized
      ? {
          yes: Math.round(parseInt(p.final_tally_result.yes) / 1000000),
          abstain: Math.round(parseInt(p.final_tally_result.abstain) / 1000000),
          no: Math.round(parseInt(p.final_tally_result.abstain) / 1000000),
          no_with_veto: Math.round(
            parseInt(p.final_tally_result.abstain) / 1000000
          ),
        }
      : {
          yes: parseInt(p.final_tally_result.yes),
          abstain: parseInt(p.final_tally_result.yes),
          no: parseInt(p.final_tally_result.no),
          no_with_veto: parseInt(p.final_tally_result.no_with_veto),
        };
  }
};
