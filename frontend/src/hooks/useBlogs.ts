import { useQuery } from '@tanstack/react-query';
import { blogsApi } from '@services/api/endpoints';
import type { Blog } from '@services/api/types';

export function useBlogs(params?: Record<string, string>) {
  return useQuery({
    queryKey: ['public', 'blogs', params],
    queryFn: async () => {
      const res = await blogsApi.getAll(params);
      return res.data.data as Blog[];
    },
  });
}

export function useBlog(slug: string) {
  return useQuery({
    queryKey: ['public', 'blog', slug],
    queryFn: async () => {
      const res = await blogsApi.getBySlug(slug);
      return res.data.data as Blog;
    },
    enabled: !!slug,
  });
}
