import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateAddress(newaddr?: string) {
  const queryClient = useQueryClient();
  return useMutation(["ollo-address"], {
    onSuccess: (addr) => {
      queryClient.setQueryData(["ollo", "address", addr], addr);
      queryClient.invalidateQueries(["ollo", "address"]);
    },
  });
}
