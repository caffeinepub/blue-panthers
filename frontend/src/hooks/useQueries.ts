import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { type Member, Role } from '../backend';

export function useGetAllMembers() {
  const { actor, isFetching } = useActor();

  return useQuery<Member[]>({
    queryKey: ['members'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

export interface RegisterPayload {
  name: string;
  email: string;
  role: Role;
}

export function useRegisterMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, RegisterPayload>({
    mutationFn: async ({ name, email, role }) => {
      if (!actor) throw new Error('Backend not available. Please try again.');
      return actor.register(name, email, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
}
