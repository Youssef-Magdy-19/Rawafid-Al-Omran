export interface DashboardService {
  id: string;
  nameAr: string;
  nameEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  fullDescriptionAr: string;
  fullDescriptionEn: string;
  slug: string;
  category: 'construction' | 'engineering' | 'infrastructure' | 'maintenance' | 'consulting';
  icon: string;
  displayOrder: number;
  featured: boolean;
  active: boolean;
  coverImage: string;
  galleryImages: string[];
  seo: {
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    keywords: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const serviceCategoryLabels: Record<string, string> = {
  construction: 'construction',
  engineering: 'engineering',
  infrastructure: 'infrastructure',
  maintenance: 'maintenance',
  consulting: 'consulting',
};

export const iconOptions = [
  { value: 'HardHat', label: 'Hard Hat' },
  { value: 'Ruler', label: 'Ruler' },
  { value: 'Truck', label: 'Truck' },
  { value: 'Wrench', label: 'Wrench' },
  { value: 'Building2', label: 'Building' },
  { value: 'PencilRuler', label: 'Design' },
  { value: 'Drill', label: 'Drill' },
  { value: 'PaintBucket', label: 'Paint' },
  { value: 'Shovel', label: 'Shovel' },
  { value: 'Helopter', label: 'Helicopter' },
];

export const mockServices: DashboardService[] = [
  {
    id: 'SRV-001',
    nameAr: 'إدارة البناء',
    nameEn: 'Construction Management',
    shortDescriptionAr: 'إشراف شامل على المشاريع من الفكرة إلى الإنجاز مع التنسيق الخبير والتحكم في الجودة.',
    shortDescriptionEn: 'Comprehensive project oversight from concept to completion with expert coordination and quality control.',
    fullDescriptionAr: 'نقدم خدمات إدارة بناء متكاملة تشمل التخطيط والتنفيذ والإشراف على جميع مراحل المشروع. فريقنا من الخبراء يضمن تسليم المشاريع في الوقت المحدد وضمن الميزانية المحددة، مع أعلى معايير الجودة والسلامة. نستخدم أحدث التقنيات في إدارة المشاريع لمتابعة التقدم وضمان الشفافية الكاملة مع عملائنا.',
    fullDescriptionEn: 'We offer comprehensive construction management services including planning, execution and supervision of all project phases. Our team of experts ensures project delivery on time and within budget, with the highest quality and safety standards. We use the latest project management technologies to track progress and ensure complete transparency with our clients.',
    slug: 'construction-management',
    category: 'construction',
    icon: 'HardHat',
    displayOrder: 1,
    featured: true,
    active: true,
    coverImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541888946425-d81bb68b3103?w=600&q=80',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
    ],
    seo: {
      titleAr: 'إدارة البناء - روافد العمران',
      titleEn: 'Construction Management - Rawafid Al Omran',
      descriptionAr: 'خدمات إدارة البناء الاحترافية من روافد العمران',
      descriptionEn: 'Professional construction management services from Rawafid Al Omran',
      keywords: 'construction management, project management, building supervision',
    },
    createdAt: '2024-01-10',
    updatedAt: '2024-07-15',
  },
  {
    id: 'SRV-002',
    nameAr: 'التصميم والهندسة',
    nameEn: 'Design & Engineering',
    shortDescriptionAr: 'حلول تصميم معماري وهيكلي مبتكرة مصممة لتناسب رؤيتك.',
    shortDescriptionEn: 'Innovative architectural and structural design solutions tailored to your vision.',
    fullDescriptionAr: 'يقدم فريق التصميم والهندسة لدينا حلولاً مبتكرة تجمع بين الجماليات والوظائف العملية. من التصميم المفاهيمي إلى الرسومات التنفيذية، نضمن أن كل مشروع يعكس رؤية عميلنا مع الالتزام بأعلى معايير الهندسة والسلامة. نستخدم أحدث برامج التصميم والنمذجة ثلاثية الأبعاد.',
    fullDescriptionEn: 'Our design and engineering team delivers innovative solutions that blend aesthetics with practical functionality. From conceptual design to detailed drawings, we ensure every project reflects our client vision while adhering to the highest engineering and safety standards. We utilize the latest design software and 3D modeling.',
    slug: 'design-engineering',
    category: 'engineering',
    icon: 'Ruler',
    displayOrder: 2,
    featured: true,
    active: true,
    coverImage: 'https://images.unsplash.com/photo-1536895058-45f2e5d0e5b6?w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1572445271230-a78b8b04a3b9?w=600&q=80',
    ],
    seo: {
      titleAr: 'التصميم والهندسة - روافد العمران',
      titleEn: 'Design & Engineering - Rawafid Al Omran',
      descriptionAr: 'خدمات التصميم والهندسة المعمارية من روافد العمران',
      descriptionEn: 'Architectural design and engineering services from Rawafid Al Omran',
      keywords: 'design, engineering, architecture, structural design',
    },
    createdAt: '2024-01-10',
    updatedAt: '2024-07-12',
  },
  {
    id: 'SRV-003',
    nameAr: 'تطوير البنية التحتية',
    nameEn: 'Infrastructure Development',
    shortDescriptionAr: 'مشاريع بنية تحتية واسعة النطاق للمجتمعات والتطوير الحضري.',
    shortDescriptionEn: 'Large-scale infrastructure projects for communities and urban development.',
    fullDescriptionAr: 'نمتلك خبرة واسعة في تطوير مشاريع البنية التحتية الكبرى بما في ذلك الطرق والجسور وشبكات المياه والصرف الصحي وأنظمة الطاقة. نعمل بالتعاون مع الجهات الحكومية والخاصة لتنفيذ مشاريع تساهم في تطوير المجتمعات وتحسين جودة الحياة.',
    fullDescriptionEn: 'We have extensive experience in developing major infrastructure projects including roads, bridges, water and sewage networks, and power systems. We work in collaboration with government and private entities to execute projects that contribute to community development and improve quality of life.',
    slug: 'infrastructure-development',
    category: 'infrastructure',
    icon: 'Truck',
    displayOrder: 3,
    featured: true,
    active: true,
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    ],
    seo: {
      titleAr: 'تطوير البنية التحتية - روافد العمران',
      titleEn: 'Infrastructure Development - Rawafid Al Omran',
      descriptionAr: 'خدمات تطوير البنية التحتية من روافد العمران',
      descriptionEn: 'Infrastructure development services from Rawafid Al Omran',
      keywords: 'infrastructure, roads, bridges, utilities development',
    },
    createdAt: '2024-02-05',
    updatedAt: '2024-07-10',
  },
  {
    id: 'SRV-004',
    nameAr: 'التجديد والترميم',
    nameEn: 'Renovation & Restoration',
    shortDescriptionAr: 'الحفاظ على التراث مع تحديث المرافق باستخدام تقنيات حديثة.',
    shortDescriptionEn: 'Preserving heritage while modernizing facilities with cutting-edge techniques.',
    fullDescriptionAr: 'متخصصون في تجديد وترميم المباني التاريخية والحديثة على حد سواء. نجمع بين الحفاظ على الطابع الأصلي للمباني وإدخال التقنيات الحديثة لتحسين كفاءة الطاقة والوظائف. فريقنا يمتلك خبرة في التعامل مع المواد التقليدية والحديثة.',
    fullDescriptionEn: 'Specialists in renovating and restoring both historic and modern buildings. We combine preserving the original character of buildings with introducing modern technologies to improve energy efficiency and functionality. Our team has expertise in working with both traditional and modern materials.',
    slug: 'renovation-restoration',
    category: 'maintenance',
    icon: 'Wrench',
    displayOrder: 4,
    featured: false,
    active: true,
    coverImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
    galleryImages: [],
    seo: {
      titleAr: 'التجديد والترميم - روافد العمران',
      titleEn: 'Renovation & Restoration - Rawafid Al Omran',
      descriptionAr: 'خدمات التجديد والترميم من روافد العمران',
      descriptionEn: 'Renovation and restoration services from Rawafid Al Omran',
      keywords: 'renovation, restoration, heritage preservation',
    },
    createdAt: '2024-02-15',
    updatedAt: '2024-06-20',
  },
  {
    id: 'SRV-005',
    nameAr: 'استشارات هندسية',
    nameEn: 'Engineering Consulting',
    shortDescriptionAr: 'استشارات هندسية متخصصة لضمان نجاح مشاريعك.',
    shortDescriptionEn: 'Specialized engineering consulting to ensure your project success.',
    fullDescriptionAr: 'نقدم خدمات استشارية هندسية شاملة تشمل دراسات الجدوى، التصميم المفاهيمي، مراجعة المخططات، والإشراف على التنفيذ. فريقنا من المستشارين ذوي الخبرة يقدم حلولاً عملية ومبتكرة تتوافق مع أفضل الممارسات العالمية واللوائح المحلية.',
    fullDescriptionEn: 'We offer comprehensive engineering consulting services including feasibility studies, conceptual design, plan review, and execution supervision. Our team of experienced consultants provides practical and innovative solutions aligned with global best practices and local regulations.',
    slug: 'engineering-consulting',
    category: 'consulting',
    icon: 'PencilRuler',
    displayOrder: 5,
    featured: true,
    active: true,
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
    ],
    seo: {
      titleAr: 'استشارات هندسية - روافد العمران',
      titleEn: 'Engineering Consulting - Rawafid Al Omran',
      descriptionAr: 'خدمات استشارات هندسية احترافية من روافد العمران',
      descriptionEn: 'Professional engineering consulting services from Rawafid Al Omran',
      keywords: 'engineering consulting, feasibility study, project consulting',
    },
    createdAt: '2024-03-01',
    updatedAt: '2024-07-14',
  },
  {
    id: 'SRV-006',
    nameAr: 'الصيانة والتشغيل',
    nameEn: 'Maintenance & Operations',
    shortDescriptionAr: 'خدمات صيانة وتشغيل متكاملة للمنشآت والمباني.',
    shortDescriptionEn: 'Integrated maintenance and operation services for facilities and buildings.',
    fullDescriptionAr: 'نقدم عقود صيانة وتشغيل شاملة للمنشآت التجارية والسكنية والحكومية. تشمل خدماتنا الصيانة الدورية والوقائية، إدارة المرافق، تشغيل الأنظمة الميكانيكية والكهربائية، وإدارة العقود مع الموردين ومقدمي الخدمات.',
    fullDescriptionEn: 'We offer comprehensive maintenance and operation contracts for commercial, residential and government facilities. Our services include periodic and preventive maintenance, facility management, mechanical and electrical system operation, and contract management with suppliers and service providers.',
    slug: 'maintenance-operations',
    category: 'maintenance',
    icon: 'Drill',
    displayOrder: 6,
    featured: false,
    active: false,
    coverImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    galleryImages: [],
    seo: {
      titleAr: 'الصيانة والتشغيل - روافد العمران',
      titleEn: 'Maintenance & Operations - Rawafid Al Omran',
      descriptionAr: 'خدمات الصيانة والتشغيل من روافد العمران',
      descriptionEn: 'Maintenance and operations services from Rawafid Al Omran',
      keywords: 'maintenance, operations, facility management',
    },
    createdAt: '2024-03-20',
    updatedAt: '2024-06-25',
  },
];

export const activeServices = mockServices.filter((s) => s.active);
export const featuredServices = mockServices.filter((s) => s.featured);
