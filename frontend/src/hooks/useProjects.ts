import { useQuery } from '@tanstack/react-query';
import { projectsApi, Project } from '@services/api';

export function useProjects(category?: string) {
  return useQuery({
    queryKey: ['projects', category],
    queryFn: async () => {
      try {
        return await projectsApi.getProjects({ category });
      } catch {
        // Return mock data if API fails
        return [
          {
            id: '1',
            title: 'King Abdullah Financial District',
            description: 'A landmark mixed-use development in Riyadh featuring premium office spaces, retail areas, and residential units.',
            shortDescription: 'Mixed-use development in Riyadh',
            category: 'commercial' as const,
            images: ['/images/projects/kafd-1.jpg', '/images/projects/kafd-2.jpg'],
            location: 'Riyadh, Saudi Arabia',
            year: 2023,
            client: 'King Abdullah Financial District Development',
            status: 'completed' as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Jeddah Metro Station',
            description: 'Modern metro station with state-of-the-art facilities and sustainable design elements.',
            shortDescription: 'Modern metro infrastructure',
            category: 'infrastructure' as const,
            images: ['/images/projects/metro-1.jpg', '/images/projects/metro-2.jpg'],
            location: 'Jeddah, Saudi Arabia',
            year: 2024,
            client: 'Jeddah Metro Authority',
            status: 'completed' as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'Princess Nora University Expansion',
            description: 'Large-scale educational campus expansion including new academic buildings and research facilities.',
            shortDescription: 'University campus expansion',
            category: 'education' as const,
            images: ['/images/projects/university-1.jpg'],
            location: 'Riyadh, Saudi Arabia',
            year: 2022,
            client: 'Princess Nora University',
            status: 'completed' as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '4',
            title: 'Al Olaya Residential Complex',
            description: 'Luxury residential complex featuring modern amenities and sustainable design.',
            shortDescription: 'Luxury residential development',
            category: 'residential' as const,
            images: ['/images/projects/residential-1.jpg'],
            location: 'Riyadh, Saudi Arabia',
            year: 2024,
            client: 'Al Olaya Development',
            status: 'in-progress' as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ] as Project[];
      }
    },
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      try {
        return await projectsApi.getProject(id);
      } catch {
        // Return mock data if API fails
        return {
          id,
          title: 'Project Details',
          description: 'Detailed information about this project.',
          shortDescription: 'Project overview',
          category: 'commercial' as const,
          images: ['/images/projects/detail-1.jpg'],
          location: 'Saudi Arabia',
          year: 2024,
          client: 'Client Name',
          status: 'completed' as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Project;
      }
    },
    enabled: !!id,
  });
}