export const dashboardStats = {
  totalProjects: 48,
  ongoingProjects: 18,
  completedProjects: 156,
  onHoldProjects: 7,
};

export const categoryLabels = {
  commercial: 'categoryCommercial',
  residential: 'categoryResidential',
  infrastructure: 'categoryInfrastructure',
  industrial: 'categoryIndustrial',
  educational: 'categoryEducational',
};

export const statusLabels = {
  planning: 'statusPlanning',
  inProgress: 'statusInProgress',
  completed: 'statusCompleted',
  onHold: 'statusOnHold',
  cancelled: 'statusCancelled',
};

export interface DashboardProject {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  slug: string;
  category: 'commercial' | 'residential' | 'infrastructure' | 'industrial' | 'educational';
  status: 'planning' | 'inProgress' | 'completed' | 'onHold' | 'cancelled';
  featured: boolean;
  coverImage: string;
  galleryImages: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export const mockProjects: DashboardProject[] = [
  {
    id: 'PRJ-001',
    titleAr: 'برج المملكة التجاري',
    titleEn: 'Kingdom Commercial Tower',
    descriptionAr: 'مشروع بناء برج تجاري مكون من 45 طابقاً في مدينة الرياض، يضم مكاتب ومرافق تجارية حديثة.',
    descriptionEn: 'A 45-story commercial tower project in Riyadh, featuring modern offices and commercial facilities.',
    slug: 'kingdom-commercial-tower',
    category: 'commercial',
    status: 'inProgress',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&q=80',
    ],
    seo: {
      title: 'Kingdom Commercial Tower - Rawafid Al Omran',
      description: 'Kingdom Commercial Tower project by Rawafid Al Omran in Riyadh.',
      keywords: ['commercial tower', 'riyadh', 'construction'],
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-07-10',
  },
  {
    id: 'PRJ-002',
    titleAr: 'مجموعة الرياض السكنية',
    titleEn: 'Riyadh Residential Complex',
    descriptionAr: 'مجمع سكني متكامل يضم 200 وحدة سكنية مع مرافق ترفيهية ومساحات خضراء.',
    descriptionEn: 'An integrated residential complex with 200 housing units, recreational facilities and green spaces.',
    slug: 'riyadh-residential-complex',
    category: 'residential',
    status: 'completed',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    ],
    seo: {
      title: 'Riyadh Residential Complex - Rawafid Al Omran',
      description: 'Riyadh Residential Complex project completed by Rawafid Al Omran.',
      keywords: ['residential', 'riyadh', 'housing complex'],
    },
    createdAt: '2023-06-01',
    updatedAt: '2024-03-20',
  },
  {
    id: 'PRJ-003',
    titleAr: 'جسر الملك سلمان',
    titleEn: 'King Salman Bridge',
    descriptionAr: 'مشروع جسر استراتيجي يربط بين ضفتي وادي حنيفة بطول 1.5 كيلومتر.',
    descriptionEn: 'A strategic bridge project connecting both sides of Wadi Hanifa with a length of 1.5 kilometers.',
    slug: 'king-salman-bridge',
    category: 'infrastructure',
    status: 'planning',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    galleryImages: [],
    seo: {
      title: 'King Salman Bridge - Rawafid Al Omran',
      description: 'King Salman Bridge infrastructure project by Rawafid Al Omran.',
      keywords: ['bridge', 'infrastructure', 'wadi hanifa'],
    },
    createdAt: '2024-06-20',
    updatedAt: '2024-06-20',
  },
  {
    id: 'PRJ-004',
    titleAr: 'مصنع الخرسانة الجاهزة',
    titleEn: 'Ready-Mix Concrete Plant',
    descriptionAr: 'إنشاء مصنع حديث لإنتاج الخرسانة الجاهزة بطاقة إنتاجية 500 متر مكعب يومياً.',
    descriptionEn: 'Construction of a modern ready-mix concrete plant with a production capacity of 500 cubic meters per day.',
    slug: 'ready-mix-concrete-plant',
    category: 'industrial',
    status: 'inProgress',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&q=80',
    ],
    seo: {
      title: 'Ready-Mix Concrete Plant - Rawafid Al Omran',
      description: 'Industrial concrete plant project by Rawafid Al Omran.',
      keywords: ['concrete plant', 'industrial', 'construction'],
    },
    createdAt: '2024-03-10',
    updatedAt: '2024-07-12',
  },
  {
    id: 'PRJ-005',
    titleAr: 'جامعة الأميرة نورة - مبنى الهندسة',
    titleEn: 'Princess Nourah University - Engineering Building',
    descriptionAr: 'مبنى كلية الهندسة الجديد في جامعة الأميرة نورة مجهز بأحدث المختبرات والفصول الدراسية.',
    descriptionEn: 'The new Engineering College building at Princess Nourah University equipped with the latest laboratories and classrooms.',
    slug: 'pnu-engineering-building',
    category: 'educational',
    status: 'onHold',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    galleryImages: [],
    seo: {
      title: 'PNU Engineering Building - Rawafid Al Omran',
      description: 'Princess Nourah University Engineering Building project.',
      keywords: ['university', 'engineering', 'education'],
    },
    createdAt: '2024-02-01',
    updatedAt: '2024-05-15',
  },
  {
    id: 'PRJ-006',
    titleAr: 'مشروع جدة واجهة البحر',
    titleEn: 'Jeddah Waterfront Project',
    descriptionAr: 'تطوير واجهة جدة البحرية بطول 4 كيلومترات تشمل ممشى ومرافق ترفيهية ومطاعم.',
    descriptionEn: 'Development of Jeddah waterfront spanning 4 kilometers including a promenade, entertainment facilities and restaurants.',
    slug: 'jeddah-waterfront',
    category: 'infrastructure',
    status: 'inProgress',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=600&q=80',
      'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?w=600&q=80',
    ],
    seo: {
      title: 'Jeddah Waterfront - Rawafid Al Omran',
      description: 'Jeddah Waterfront development project by Rawafid Al Omran.',
      keywords: ['jeddah', 'waterfront', 'development'],
    },
    createdAt: '2024-04-05',
    updatedAt: '2024-07-15',
  },
  {
    id: 'PRJ-007',
    titleAr: 'مركز الرياض الطبي',
    titleEn: 'Riyadh Medical Center',
    descriptionAr: 'مركز طبي متخصص يضم 150 سريراً وأحدث الأجهزة الطبية والتشخيصية.',
    descriptionEn: 'A specialized medical center with 150 beds and the latest medical and diagnostic equipment.',
    slug: 'riyadh-medical-center',
    category: 'commercial',
    status: 'completed',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    galleryImages: [],
    seo: {
      title: 'Riyadh Medical Center - Rawafid Al Omran',
      description: 'Riyadh Medical Center completed by Rawafid Al Omran.',
      keywords: ['medical center', 'riyadh', 'healthcare'],
    },
    createdAt: '2023-09-01',
    updatedAt: '2024-06-01',
  },
  {
    id: 'PRJ-008',
    titleAr: 'حي السفارات - فيلا نموذجية',
    titleEn: 'Diplomatic Quarter - Model Villa',
    descriptionAr: 'بناء فيلا نموذجية في حي السفارات بالرياض بتصميم معماري فاخر.',
    descriptionEn: 'Construction of a model villa in Riyadh\'s Diplomatic Quarter with luxurious architectural design.',
    slug: 'diplomatic-quarter-villa',
    category: 'residential',
    status: 'completed',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    ],
    seo: {
      title: 'Diplomatic Quarter Villa - Rawafid Al Omran',
      description: 'Luxury model villa in Diplomatic Quarter by Rawafid Al Omran.',
      keywords: ['villa', 'diplomatic quarter', 'luxury'],
    },
    createdAt: '2023-03-15',
    updatedAt: '2023-12-20',
  },
  {
    id: 'PRJ-009',
    titleAr: 'مستودعات المنطقة اللوجستية',
    titleEn: 'Logistics Zone Warehouses',
    descriptionAr: 'إنشاء 6 مستودعات صناعية بمساحة إجمالية 50,000 متر مربع في المنطقة اللوجستية.',
    descriptionEn: 'Construction of 6 industrial warehouses with a total area of 50,000 sqm in the logistics zone.',
    slug: 'logistics-zone-warehouses',
    category: 'industrial',
    status: 'inProgress',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    galleryImages: [],
    seo: {
      title: 'Logistics Zone Warehouses - Rawafid Al Omran',
      description: 'Industrial warehouse project in logistics zone by Rawafid Al Omran.',
      keywords: ['warehouse', 'industrial', 'logistics'],
    },
    createdAt: '2024-05-20',
    updatedAt: '2024-07-16',
  },
  {
    id: 'PRJ-010',
    titleAr: 'مدرسة الخليل الابتدائية',
    titleEn: 'Al Khalil Elementary School',
    descriptionAr: 'بناء مدرسة ابتدائية نموذجية تتسع لـ 600 طالب مع مرافق رياضية وتعليمية متكاملة.',
    descriptionEn: 'Construction of a model elementary school accommodating 600 students with integrated sports and educational facilities.',
    slug: 'al-khalil-elementary-school',
    category: 'educational',
    status: 'planning',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    galleryImages: [],
    seo: {
      title: 'Al Khalil Elementary School - Rawafid Al Omran',
      description: 'Elementary school construction project by Rawafid Al Omran.',
      keywords: ['school', 'education', 'elementary'],
    },
    createdAt: '2024-07-01',
    updatedAt: '2024-07-01',
  },
];

export const recentProjects: DashboardProject[] = mockProjects.slice(0, 5);
