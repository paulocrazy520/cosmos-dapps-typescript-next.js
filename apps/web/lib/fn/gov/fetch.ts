import { Proposal } from "@/types/gov";
import axios from "axios";

export const getProposals = async (): Promise<Proposal[]> => {
  return await axios
    .get(`${process.env.OLLO_API}/ollo/gov/proposals`)
    .then((r) => r.data)
    .then((r) => r.proposals);
};
export const getProposal = async (id: string): Promise<Proposal> => {
  return await axios
    .get(`${process.env.OLLO_API}/ollo/gov/proposals/${id}`)
    .then((r) => r.data.proposal);
};
