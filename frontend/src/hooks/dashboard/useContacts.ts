import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactsApi } from '@services/api/endpoints';
import type { Contact } from '@services/api/types';

export const contactKeys = {
  all: ['contacts'] as const,
  list: (params?: Record<string, string>) => ['contacts', 'list', params] as const,
  detail: (id: string) => ['contacts', 'detail', id] as const,
};

export function useContactsList(params?: Record<string, string>) {
  return useQuery({
    queryKey: contactKeys.list(params),
    queryFn: async () => {
      const res = await contactsApi.getAll(params);
      return {
        contacts: res.data.data as Contact[],
        pagination: res.data.pagination,
      };
    },
  });
}

export function useContact(id: string) {
  return useQuery({
    queryKey: contactKeys.detail(id),
    queryFn: async () => {
      const res = await contactsApi.getById(id);
      return res.data.data as Contact;
    },
    enabled: !!id,
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => contactsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.all });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => contactsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.all });
    },
  });
}
