import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscribersApi } from '@services/api/endpoints';
import type { Subscriber } from '@services/api/types';

export const subscriberKeys = {
  all: ['subscribers'] as const,
  list: (params?: Record<string, string>) => ['subscribers', 'list', params] as const,
  detail: (id: string) => ['subscribers', 'detail', id] as const,
};

export function useSubscribersList(params?: Record<string, string>) {
  return useQuery({
    queryKey: subscriberKeys.list(params),
    queryFn: async () => {
      const res = await subscribersApi.getAll(params);
      return {
        subscribers: res.data.data as Subscriber[],
        pagination: res.data.pagination,
      };
    },
  });
}

export function useSubscriber(id: string) {
  return useQuery({
    queryKey: subscriberKeys.detail(id),
    queryFn: async () => {
      const res = await subscribersApi.getById(id);
      return res.data.data as Subscriber;
    },
    enabled: !!id,
  });
}

export function useUpdateSubscriber() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => subscribersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriberKeys.all });
    },
  });
}

export function useDeleteSubscriber() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => subscribersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriberKeys.all });
    },
  });
}
