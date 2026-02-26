import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import { Role } from "../backend";

export function useGetAllMembers() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      role,
    }: {
      name: string;
      email: string;
      role: Role;
    }) => {
      if (!actor) throw new Error("Not connected to the network. Please try again.");

      // The ICP Candid agent requires variant types as objects: { fan: null }
      // Map the Role enum string value to the correct Candid variant object
      const roleVariant = { [role]: null } as unknown as Role;

      await actor.register(name, email, roleVariant);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error: unknown) => {
      // Errors are surfaced to the calling component via mutation.error
      console.error("Registration error:", error);
    },
  });
}
