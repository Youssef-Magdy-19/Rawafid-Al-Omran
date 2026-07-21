import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogsApi } from '@services/api/endpoints';
import type { Blog } from '@services/api/types';

export const blogKeys = {
  all: ['blogs'] as const,
  list: (params?: Record<string, string>) => ['blogs', 'list', params] as const,
  detail: (slug: string) => ['blogs', 'detail', slug] as const,
};

export function useBlogs(params?: Record<string, string>) {
  return useQuery({
    queryKey: blogKeys.list(params),
    queryFn: async () => {
      const res = await blogsApi.getAll(params);
      return {
        blogs: res.data.data as Blog[],
        pagination: res.data.pagination,
      };
    },
  });
}

export function useBlog(slug: string) {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: async () => {
      const res = await blogsApi.getBySlug(slug);
      return res.data.data;
    },
    enabled: !!slug,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => blogsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => blogsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blogsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
  });
}
