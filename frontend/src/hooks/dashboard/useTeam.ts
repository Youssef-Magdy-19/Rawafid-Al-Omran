import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamApi } from '@services/api/endpoints';
import type { TeamMember } from '@services/api/types';

export const teamKeys = {
  all: ['team'] as const,
  list: (params?: Record<string, string>) => ['team', 'list', params] as const,
  detail: (id: string) => ['team', 'detail', id] as const,
};

export function useTeamList(params?: Record<string, string>) {
  return useQuery({
    queryKey: teamKeys.list(params),
    queryFn: async () => {
      const res = await teamApi.getAll(params);
      return {
        team: res.data.data as TeamMember[],
        pagination: res.data.pagination,
      };
    },
  });
}

export function useTeamMember(id: string) {
  return useQuery({
    queryKey: teamKeys.detail(id),
    queryFn: async () => {
      const res = await teamApi.getById(id);
      return res.data.data as TeamMember;
    },
    enabled: !!id,
  });
}

export function useCreateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => teamApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
    },
  });
}

export function useUpdateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => teamApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
    },
  });
}

export function useDeleteTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => teamApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
    },
  });
}
