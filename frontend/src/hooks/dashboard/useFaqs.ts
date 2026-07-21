import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { faqApi } from '@services/api/endpoints';
import type { Faq } from '@services/api/types';

export const faqKeys = {
  all: ['faqs'] as const,
  list: (params?: Record<string, string>) => ['faqs', 'list', params] as const,
  detail: (id: string) => ['faqs', 'detail', id] as const,
};

export function useFaqsList(params?: Record<string, string>) {
  return useQuery({
    queryKey: faqKeys.list(params),
    queryFn: async () => {
      const res = await faqApi.getAll(params);
      return {
        faqs: res.data.data as Faq[],
        pagination: res.data.pagination,
      };
    },
  });
}

export function useFaq(id: string) {
  return useQuery({
    queryKey: faqKeys.detail(id),
    queryFn: async () => {
      const res = await faqApi.getById(id);
      return res.data.data as Faq;
    },
    enabled: !!id,
  });
}

export function useCreateFaq() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => faqApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: faqKeys.all });
    },
  });
}

export function useUpdateFaq() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => faqApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: faqKeys.all });
    },
  });
}

export function useDeleteFaq() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => faqApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: faqKeys.all });
    },
  });
}
