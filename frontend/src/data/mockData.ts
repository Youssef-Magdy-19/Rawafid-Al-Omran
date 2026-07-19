import { HardHat, Ruler, Truck, Wrench } from 'lucide-react';

export const mockServices = [
  {
    id: 'construction-management',
    titleKey: 'services.items.constructionManagement.title',
    descriptionKey: 'services.items.constructionManagement.description',
    icon: HardHat,
    slug: 'construction-management',
  },
  {
    id: 'design-engineering',
    titleKey: 'services.items.designEngineering.title',
    descriptionKey: 'services.items.designEngineering.description',
    icon: Ruler,
    slug: 'design-engineering',
  },
  {
    id: 'infrastructure-development',
    titleKey: 'services.items.infrastructureDevelopment.title',
    descriptionKey: 'services.items.infrastructureDevelopment.description',
    icon: Truck,
    slug: 'infrastructure-development',
  },
  {
    id: 'renovation-restoration',
    titleKey: 'services.items.renovationRestoration.title',
    descriptionKey: 'services.items.renovationRestoration.description',
    icon: Wrench,
    slug: 'renovation-restoration',
  },
];

export const mockProjects = [
  {
    id: 'king-abdullah-financial-district',
    title: 'King Abdullah Financial District',
    category: 'commercial',
    categoryKey: 'projects.categories.commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    slug: 'king-abdullah-financial-district',
  },
  {
    id: 'riyadh-metro-station',
    title: 'Riyadh Metro Station',
    category: 'infrastructure',
    categoryKey: 'projects.categories.infrastructure',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    slug: 'riyadh-metro-station',
  },
  {
    id: 'princess-nourah-university',
    title: 'Princess Nourah University',
    category: 'education',
    categoryKey: 'projects.categories.education',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    slug: 'princess-nourah-university',
  },
  {
    id: 'jeddah-tower-foundation',
    title: 'Jeddah Tower Foundation',
    category: 'commercial',
    categoryKey: 'projects.categories.commercial',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    slug: 'jeddah-tower-foundation',
  },
];

export const mockTestimonials = [
  {
    id: 'testimonial-1',
    name: 'Ahmed Al-Rashid',
    role: 'CEO',
    company: 'Al-Rashid Investments',
    content: 'Rawafid Al Omran delivered our project ahead of schedule with exceptional quality. Their attention to detail and professionalism is unmatched.',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Sarah Johnson',
    role: 'Project Director',
    company: 'Global Construction Ltd',
    content: 'Working with Rawafid Al Omran was a seamless experience. Their expertise in large-scale projects is evident in every aspect of their work.',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'Mohammed Al-Fahad',
    role: 'Minister',
    company: 'Ministry of Housing',
    content: 'We have partnered with Rawafid Al Omran on multiple government projects. Their commitment to excellence and safety standards is exemplary.',
    rating: 5,
  },
];

export const mockStatistics = [
  { id: 'stat-1', value: '25+', labelKey: 'statistics.yearsExperience', icon: 'Award' },
  { id: 'stat-2', value: '500+', labelKey: 'statistics.projectsCompleted', icon: 'Building2' },
  { id: 'stat-3', value: '200+', labelKey: 'statistics.teamMembers', icon: 'Users' },
  { id: 'stat-4', value: '98%', labelKey: 'statistics.clientSatisfaction', icon: 'Globe' },
];