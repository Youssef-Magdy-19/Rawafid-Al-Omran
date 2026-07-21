import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quotesApi } from '@services/api/endpoints';
import type { Quote } from '@services/api/types';

export const quoteKeys = {
  all: ['quotes'] as const,
  list: (params?: Record<string, string>) => ['quotes', 'list', params] as const,
  detail: (id: string) => ['quotes', 'detail', id] as const,
};

export function useQuotesList(params?: Record<string, string>) {
  return useQuery({
    queryKey: quoteKeys.list(params),
    queryFn: async () => {
      const res = await quotesApi.getAll(params);
      return {
        quotes: res.data.data as Quote[],
        pagination: res.data.pagination,
      };
    },
  });
}

export function useQuote(id: string) {
  return useQuery({
    queryKey: quoteKeys.detail(id),
    queryFn: async () => {
      const res = await quotesApi.getById(id);
      return res.data.data as Quote;
    },
    enabled: !!id,
  });
}

export function useUpdateQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => quotesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quoteKeys.all });
    },
  });
}

export function useDeleteQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => quotesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quoteKeys.all });
    },
  });
}
