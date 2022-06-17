import { Coin } from "@cosmjs/stargate";

export declare interface ProposalChange {
  subspace: string;
  key: string;
  value: string;
}
export declare interface ProposalContent {
  "@type": string;
  title: string;
  description: string;
  changes: ProposalChange[];
}
export declare interface ProposalTallyResult {
  yes: string;
  abstain: string;
  no: string;
  no_with_veto: string;
}
export declare interface ProposalTally {
  yes: number;
  abstain: number;
  no: number;
  no_with_veto: number;
}
export declare interface Proposal {
  proposal_id: string;
  content: ProposalContent;
  status: ProposalStatus;
  final_tally_result: ProposalTallyResult;
  submit_time: string;
  deposit_and_time: string;
  total_deposit: Coin[];
  voting_start_time: string;
  voting_end_time: string;
}

export declare enum ProposalStatus {
  Pending = "PROPOSAL_STATUS_PENDING",
  Rejected = "PROPOSAL_STATUS_REJECTED",
  Accepted = "PROPOSAL_STATUS_ACCEPTED",
}
export declare enum ProposalVote {
  Yes = "YES",
  No = "NO",
  NoWithVeto = "NO_WITH_VETO",
  Abstain = "ABSTAIN",
}
