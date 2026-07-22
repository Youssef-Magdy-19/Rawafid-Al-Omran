import { useQuery } from '@tanstack/react-query';
import { partnersApi } from '@services/api/endpoints';
import type { Partner } from '@services/api/types';

export function usePartners() {
  return useQuery({
    queryKey: ['public', 'partners'],
    queryFn: async () => {
      const res = await partnersApi.getAll();
      return res.data.data as Partner[];
    },
  });
}
