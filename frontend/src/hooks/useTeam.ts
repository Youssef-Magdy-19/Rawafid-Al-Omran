import { useQuery } from '@tanstack/react-query';
import { teamApi } from '@services/api/endpoints';
import type { TeamMember } from '@services/api/types';

export function useTeamMembers() {
  return useQuery({
    queryKey: ['public', 'team'],
    queryFn: async () => {
      const res = await teamApi.getAll();
      return res.data.data as TeamMember[];
    },
  });
}

export function useTeamMember(id: string) {
  return useQuery({
    queryKey: ['public', 'team', id],
    queryFn: async () => {
      const res = await teamApi.getById(id);
      return res.data.data as TeamMember;
    },
    enabled: !!id,
  });
}
