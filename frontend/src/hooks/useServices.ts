import { useQuery } from '@tanstack/react-query';
import { servicesApi } from '@services/api/endpoints';
import type { Service } from '@services/api/types';

export function useServices() {
  return useQuery({
    queryKey: ['public', 'services'],
    queryFn: async () => {
      const res = await servicesApi.getAll();
      return res.data.data as Service[];
    },
  });
}

export function useService(slug: string) {
  return useQuery({
    queryKey: ['public', 'service', slug],
    queryFn: async () => {
      const res = await servicesApi.getBySlug(slug);
      return res.data.data as Service;
    },
    enabled: !!slug,
  });
}
