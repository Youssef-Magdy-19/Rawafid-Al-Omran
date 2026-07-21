import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { testimonialsApi } from '@services/api/endpoints';
import type { Testimonial } from '@services/api/types';

export const testimonialKeys = {
  all: ['testimonials'] as const,
  list: (params?: Record<string, string>) => ['testimonials', 'list', params] as const,
  detail: (id: string) => ['testimonials', 'detail', id] as const,
};

export function useTestimonialsList(params?: Record<string, string>) {
  return useQuery({
    queryKey: testimonialKeys.list(params),
    queryFn: async () => {
      const res = await testimonialsApi.getAll(params);
      return {
        testimonials: res.data.data as Testimonial[],
        pagination: res.data.pagination,
      };
    },
  });
}

export function useTestimonial(id: string) {
  return useQuery({
    queryKey: testimonialKeys.detail(id),
    queryFn: async () => {
      const res = await testimonialsApi.getById(id);
      return res.data.data as Testimonial;
    },
    enabled: !!id,
  });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => testimonialsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testimonialKeys.all });
    },
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => testimonialsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testimonialKeys.all });
    },
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => testimonialsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testimonialKeys.all });
    },
  });
}
