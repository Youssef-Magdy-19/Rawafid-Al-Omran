import { useQuery } from '@tanstack/react-query';
import { teamApi, TeamMember } from '@services/api';

export function useTeam() {
  return useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      try {
        return await teamApi.getTeam();
      } catch {
        // Return mock data if API fails
        return [
          {
            id: '1',
            name: 'Ahmed Al-Rashid',
            position: 'Chief Executive Officer',
            department: 'Executive',
            bio: 'With over 30 years of experience in the construction industry, Ahmed leads our company with a vision for excellence and innovation.',
            image: '/images/team/ceo.jpg',
            linkedin: 'https://linkedin.com/in/ahmedalrashid',
            email: 'ahmed@rawafid.com',
            phone: '+966 11 123 4567',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'Sarah Al-Mutairi',
            position: 'Chief Operations Officer',
            department: 'Operations',
            bio: 'Sarah brings extensive experience in project management and operational excellence, ensuring every project meets our high standards.',
            image: '/images/team/coo.jpg',
            linkedin: 'https://linkedin.com/in/sarahalmutairi',
            email: 'sarah@rawafid.com',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '3',
            name: 'Mohammed Al-Harthi',
            position: 'Chief Financial Officer',
            department: 'Finance',
            bio: 'Mohammed oversees our financial operations with a focus on sustainable growth and strategic investment.',
            image: '/images/team/cfo.jpg',
            email: 'mohammed@rawafid.com',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '4',
            name: 'Fatima Al-Zahrani',
            position: 'Director of Engineering',
            department: 'Engineering',
            bio: 'Fatima leads our engineering team with expertise in structural design and innovative construction techniques.',
            image: '/images/team/engineering.jpg',
            linkedin: 'https://linkedin.com/in/fatimazahrani',
            email: 'fatima@rawafid.com',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '5',
            name: 'Khalid Al-Qahtani',
            position: 'Project Director',
            department: 'Projects',
            bio: 'Khalid has successfully delivered numerous large-scale projects across Saudi Arabia with a focus on quality and safety.',
            image: '/images/team/project-director.jpg',
            email: 'khalid@rawafid.com',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '6',
            name: 'Noura Al-Amri',
            position: 'HR Director',
            department: 'Human Resources',
            bio: 'Noura leads our human resources initiatives, focusing on talent development and creating an excellent workplace culture.',
            image: '/images/team/hr.jpg',
            email: 'noura@rawafid.com',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ] as TeamMember[];
      }
    },
  });
}

export function useTeamMember(id: string) {
  return useQuery({
    queryKey: ['teamMember', id],
    queryFn: async () => {
      try {
        return await teamApi.getTeamMember(id);
      } catch {
        return {
          id,
          name: 'Team Member',
          position: 'Position',
          department: 'Department',
          bio: 'Team member bio.',
          image: '/images/team/default.jpg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as TeamMember;
      }
    },
    enabled: !!id,
  });
}