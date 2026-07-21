import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { partnersApi } from '@services/api/endpoints';
import type { Partner } from '@services/api/types';

export const partnerKeys = {
  all: ['partners'] as const,
  list: (params?: Record<string, string>) => ['partners', 'list', params] as const,
  detail: (id: string) => ['partners', 'detail', id] as const,
};

export function usePartnersList(params?: Record<string, string>) {
  return useQuery({
    queryKey: partnerKeys.list(params),
    queryFn: async () => {
      const res = await partnersApi.getAll(params);
      return {
        partners: res.data.data as Partner[],
        pagination: res.data.pagination,
      };
    },
  });
}

export function usePartner(id: string) {
  return useQuery({
    queryKey: partnerKeys.detail(id),
    queryFn: async () => {
      const res = await partnersApi.getById(id);
      return res.data.data as Partner;
    },
    enabled: !!id,
  });
}

export function useCreatePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => partnersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partnerKeys.all });
    },
  });
}

export function useUpdatePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => partnersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partnerKeys.all });
    },
  });
}

export function useDeletePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => partnersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partnerKeys.all });
    },
  });
}
