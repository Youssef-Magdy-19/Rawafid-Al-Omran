import { useQuery } from '@tanstack/react-query';
import { faqApi } from '@services/api/endpoints';
import type { Faq } from '@services/api/types';

export function useFaqs() {
  return useQuery({
    queryKey: ['public', 'faqs'],
    queryFn: async () => {
      const res = await faqApi.getAll();
      return res.data.data as Faq[];
    },
  });
}
