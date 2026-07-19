import { useQuery } from '@tanstack/react-query';
import { servicesApi, Service } from '@services/api';

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      try {
        return await servicesApi.getServices();
      } catch {
        // Return mock data if API fails
        return [
          {
            id: '1',
            title: 'Construction Management',
            description: 'Comprehensive project oversight from concept to completion with expert coordination and quality control.',
            shortDescription: 'Expert project management for construction excellence',
            icon: 'Building2',
            image: '/images/services/construction.jpg',
            features: [
              'Project planning and scheduling',
              'Quality control and assurance',
              'Cost management',
              'Risk assessment',
              'Contractor coordination',
              'Progress monitoring',
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Design & Engineering',
            description: 'Innovative architectural and structural design solutions tailored to your vision.',
            shortDescription: 'Creative design meets engineering precision',
            icon: 'PencilRuler',
            image: '/images/services/design.jpg',
            features: [
              'Architectural design',
              'Structural engineering',
              'MEP design',
              '3D modeling and visualization',
              'Sustainable design',
              'Value engineering',
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'Infrastructure Development',
            description: 'Large-scale infrastructure projects for communities and urban development.',
            shortDescription: 'Building the foundation for tomorrow',
            icon: 'HardHat',
            image: '/images/services/infrastructure.jpg',
            features: [
              'Road and highway construction',
              'Bridge and tunnel construction',
              'Utility infrastructure',
              'Drainage systems',
              'Public facilities',
              'Urban development',
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '4',
            title: 'Renovation & Restoration',
            description: 'Preserving heritage while modernizing facilities with cutting-edge techniques.',
            shortDescription: 'Modern solutions for historic treasures',
            icon: 'RefreshCw',
            image: '/images/services/renovation.jpg',
            features: [
              'Heritage restoration',
              'Building modernization',
              'Structural repairs',
              'Facade restoration',
              'Interior renovation',
              'Code compliance upgrades',
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ] as Service[];
      }
    },
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      try {
        return await servicesApi.getService(id);
      } catch {
        // Return mock data if API fails
        return {
          id,
          title: 'Service Details',
          description: 'Detailed information about this service.',
          shortDescription: 'Service overview',
          icon: 'Briefcase',
          image: '/images/services/detail.jpg',
          features: [
            'Feature 1',
            'Feature 2',
            'Feature 3',
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Service;
      }
    },
    enabled: !!id,
  });
}