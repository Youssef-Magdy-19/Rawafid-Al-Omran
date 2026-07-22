import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '@services/api/endpoints';
import type { Project } from '@services/api/types';

export function useProjects(params?: Record<string, string>) {
  return useQuery({
    queryKey: ['public', 'projects', params],
    queryFn: async () => {
      const res = await projectsApi.getAll(params);
      return res.data.data as Project[];
    },
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ['public', 'project', slug],
    queryFn: async () => {
      const res = await projectsApi.getBySlug(slug);
      return res.data.data as Project;
    },
    enabled: !!slug,
  });
}
