import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { servicesApi } from '@services/api/endpoints';
import type { Service } from '@services/api/types';

export const serviceKeys = {
  all: ['services'] as const,
  list: (params?: Record<string, string>) => ['services', 'list', params] as const,
  detail: (slug: string) => ['services', 'detail', slug] as const,
};

export function useServicesList(params?: Record<string, string>) {
  return useQuery({
    queryKey: serviceKeys.list(params),
    queryFn: async () => {
      const res = await servicesApi.getAll(params);
      return {
        services: res.data.data as Service[],
        pagination: res.data.pagination,
      };
    },
  });
}

export function useService(slug: string) {
  return useQuery({
    queryKey: serviceKeys.detail(slug),
    queryFn: async () => {
      const res = await servicesApi.getBySlug(slug);
      return res.data.data as Service;
    },
    enabled: !!slug,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => servicesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => servicesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => servicesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
    },
  });
}
