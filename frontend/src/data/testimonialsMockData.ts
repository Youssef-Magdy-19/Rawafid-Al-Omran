export interface Testimonial {
  id: string;
  clientName: string;
  clientPosition: string;
  companyName: string;
  contentAr: string;
  contentEn: string;
  rating: number;
  avatarUrl: string;
  projectName: string;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const mockTestimonials: Testimonial[] = [
  {
    id: 'TST-001',
    clientName: 'أحمد العلي',
    clientPosition: 'مدير المشاريع',
    companyName: 'شركة العلي للتطوير العقاري',
    contentAr: 'عملنا مع روافد العمران في مشروع سكني كبير، وكانت النتائج مذهلة. التزامهم بالمواعيد وجودة العمل جعلتنا نختارهم كشريك استراتيجي لجميع مشاريعنا المستقبلية.',
    contentEn: 'We worked with Rawafid Al Omran on a large residential project, and the results were amazing. Their commitment to deadlines and quality of work made us choose them as a strategic partner for all our future projects.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80',
    projectName: 'مشروع الرياض السكني',
    featured: true,
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-06-20',
  },
  {
    id: 'TST-002',
    clientName: 'سارة محمد',
    clientPosition: 'مدير التخطيط',
    companyName: 'مجموعة السلام القابضة',
    contentAr: 'فريق روافد العمران يتمتع بكفاءة عالية واحترافية في العمل. استطعنا تنفيذ المشروع بأعلى معايير الجودة وفي الوقت المحدد.',
    contentEn: 'The Rawafid Al Omran team has high efficiency and professionalism. We were able to execute the project with the highest quality standards and on time.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80',
    projectName: 'برج السلام التجاري',
    featured: true,
    isActive: true,
    createdAt: '2024-02-20',
    updatedAt: '2024-07-10',
  },
  {
    id: 'TST-003',
    clientName: 'خالد الدوسري',
    clientPosition: 'رئيس مجلس الإدارة',
    companyName: 'مؤسسة الدوسري للمقاولات',
    contentAr: 'تعاوننا مع روافد العمران كان تجربة مميزة. الخبرة والابتكار الذي يقدمونه يجعلهم في مقدمة شركات المقاولات في المملكة.',
    contentEn: 'Our collaboration with Rawafid Al Omran was a distinguished experience. The expertise and innovation they offer puts them at the forefront of contracting companies in the Kingdom.',
    rating: 4,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    projectName: 'مشروع الدمام الصناعي',
    featured: false,
    isActive: true,
    createdAt: '2024-03-10',
    updatedAt: '2024-08-05',
  },
  {
    id: 'TST-004',
    clientName: 'نورة العنزي',
    clientPosition: 'المدير التنفيذي',
    companyName: 'شركة العنزي القابضة',
    contentAr: 'من أفضل الشركات التي تعاملت معها في مجال البناء. الاهتمام بالتفاصيل والجودة العالية هما ما يميز روافد العمران.',
    contentEn: 'One of the best companies I have dealt with in the construction field. Attention to detail and high quality are what distinguish Rawafid Al Omran.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80',
    projectName: 'مشروع جدة السكني',
    featured: true,
    isActive: true,
    createdAt: '2024-04-05',
    updatedAt: '2024-09-01',
  },
  {
    id: 'TST-005',
    clientName: 'فيصل الشمري',
    clientPosition: 'نائب الرئيس للتطوير',
    companyName: 'مجموعة الشمري العقارية',
    contentAr: 'التزام روافد العمران بمعايير الجودة والسلامة كان واضحاً في كل مراحل المشروع. نوصي بهم بشدة.',
    contentEn: 'Rawafid Al Omran\'s commitment to quality and safety standards was evident in all stages of the project. We highly recommend them.',
    rating: 4,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    projectName: 'مشروع الخبر التجاري',
    featured: false,
    isActive: true,
    createdAt: '2024-04-20',
    updatedAt: '2024-08-15',
  },
  {
    id: 'TST-006',
    clientName: 'هند القحطاني',
    clientPosition: 'استشاري مشاريع',
    companyName: 'مكتب القحطاني للاستشارات',
    contentAr: 'فريق متكامل ومحترف. التعامل مع روافد العمران كان سلساً وفعالاً من البداية حتى التسليم النهائي.',
    contentEn: 'An integrated and professional team. Dealing with Rawafid Al Omran was smooth and efficient from start to final delivery.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    projectName: 'مشروع الطائف السياحي',
    featured: false,
    isActive: false,
    createdAt: '2024-05-15',
    updatedAt: '2024-10-01',
  },
  {
    id: 'TST-007',
    clientName: 'عبدالله السبيعي',
    clientPosition: 'مالك',
    companyName: 'مؤسسة السبيعي للبناء',
    contentAr: 'خبرة رائعة منذ أول اجتماع. روافد العمران يمتلكون فريقاً فنياً متميزاً قادراً على تنفيذ أصعب المشاريع بأعلى كفاءة.',
    contentEn: 'A great experience since the first meeting. Rawafid Al Omran has a distinguished technical team capable of executing the most difficult projects with the highest efficiency.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    projectName: 'مشروع أبها السكني',
    featured: true,
    isActive: true,
    createdAt: '2024-06-01',
    updatedAt: '2024-11-10',
  },
];

export const activeTestimonials = mockTestimonials.filter((t) => t.isActive);
export const featuredTestimonials = mockTestimonials.filter((t) => t.featured);
