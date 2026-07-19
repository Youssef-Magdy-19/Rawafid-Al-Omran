import { useQuery } from '@tanstack/react-query';
import { aboutApi } from '@services/api';

export function useAbout() {
  return useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      try {
        return await aboutApi.getAbout();
      } catch {
        // Return mock data if API fails
        return {
          id: '1',
          title: 'About Rawafid Al Omran',
          description: 'Building Tomorrow\'s Landmarks Today',
          story: {
            title: 'Our Story',
            content: 'Founded in 1998, Rawafid Al Omran has grown from a small local contractor to one of Saudi Arabia\'s leading construction companies.',
          },
          mission: {
            title: 'Our Mission',
            description: 'To deliver exceptional construction solutions that exceed client expectations while maintaining the highest standards of safety and quality.',
          },
          vision: {
            title: 'Our Vision',
            description: 'To be the most trusted name in construction across the Middle East, known for innovation, reliability, and sustainable practices.',
          },
          values: [
            { id: '1', title: 'Quality', description: 'Uncompromising commitment to excellence' },
            { id: '2', title: 'Safety', description: 'Zero accidents is our goal' },
            { id: '3', title: 'Innovation', description: 'Embracing cutting-edge technology' },
            { id: '4', title: 'Integrity', description: 'Honest and transparent relationships' },
          ],
          statistics: [
            { id: '1', value: '25+', label: 'Years Experience' },
            { id: '2', value: '500+', label: 'Projects Completed' },
            { id: '3', value: '200+', label: 'Team Members' },
            { id: '4', value: '98%', label: 'Client Satisfaction' },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
    },
  });
}