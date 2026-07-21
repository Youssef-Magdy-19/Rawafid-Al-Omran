import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '@services/api/endpoints';
import type { Project } from '@services/api/types';

export const projectKeys = {
  all: ['projects'] as const,
  list: (params?: Record<string, string>) => ['projects', 'list', params] as const,
  detail: (slug: string) => ['projects', 'detail', slug] as const,
};

export function useProjects(params?: Record<string, string>) {
  return useQuery({
    queryKey: projectKeys.list(params),
    queryFn: async () => {
      const res = await projectsApi.getAll(params);
      return {
        projects: res.data.data as Project[],
        pagination: res.data.pagination,
      };
    },
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: projectKeys.detail(slug),
    queryFn: async () => {
      const res = await projectsApi.getBySlug(slug);
      return res.data.data as Project;
    },
    enabled: !!slug,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => projectsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => projectsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => projectsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}
