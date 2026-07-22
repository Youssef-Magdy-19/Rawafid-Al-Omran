import { useQuery } from '@tanstack/react-query';
import { testimonialsApi } from '@services/api/endpoints';
import type { Testimonial } from '@services/api/types';

export function useTestimonials() {
  return useQuery({
    queryKey: ['public', 'testimonials'],
    queryFn: async () => {
      const res = await testimonialsApi.getAll();
      return res.data.data as Testimonial[];
    },
  });
}
