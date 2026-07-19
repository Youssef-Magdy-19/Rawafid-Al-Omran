export interface TeamMember {
  id: string;
  nameAr: string;
  nameEn: string;
  positionAr: string;
  positionEn: string;
  shortBioAr: string;
  shortBioEn: string;
  fullBioAr: string;
  fullBioEn: string;
  department: 'management' | 'engineering' | 'design' | 'operations' | 'finance' | 'hr';
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  experience: string;
  yearsOfExperience: number;
  displayOrder: number;
  featured: boolean;
  active: boolean;
  profileImage: string;
  galleryImages: string[];
  skills: string;
  certifications: string;
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

export const departmentLabels: Record<string, string> = {
  management: 'management',
  engineering: 'engineering',
  design: 'design',
  operations: 'operations',
  finance: 'finance',
  hr: 'hr',
};

export const positionLabels: Record<string, string> = {
  ceo: 'ceo',
  cto: 'cto',
  projectManager: 'projectManager',
  engineer: 'engineer',
  architect: 'architect',
  designer: 'designer',
  accountant: 'accountant',
  hrManager: 'hrManager',
};

export const mockTeam: TeamMember[] = [
  {
    id: 'TM-001',
    nameAr: 'أحمد علي',
    nameEn: 'Ahmed Ali',
    positionAr: 'الرئيس التنفيذي',
    positionEn: 'Chief Executive Officer',
    shortBioAr: 'قائد متمرس يتمتع بأكثر من 20 عاماً من الخبرة في إدارة مشاريع البناء والتطوير العقاري.',
    shortBioEn: 'An experienced leader with over 20 years of experience in construction project management and real estate development.',
    fullBioAr: 'أحمد علي هو الرئيس التنفيذي لشركة روافد العمران. حاصل على درجة الماجستير في إدارة المشاريع الهندسية من جامعة الملك فهد للبترول والمعادن. قاد العديد من المشاريع الكبرى في المملكة العربية السعودية، بما في ذلك مشاريع البنية التحتية والتطوير العقاري. تحت قيادته، نمت الشركة لتصبح واحدة من أبرز شركات المقاولات في المنطقة.',
    fullBioEn: 'Ahmed Ali is the CEO of Rawafid Al Omran. He holds a Master\'s degree in Engineering Project Management from King Fahd University of Petroleum and Minerals. He has led numerous major projects in Saudi Arabia, including infrastructure and real estate development projects. Under his leadership, the company has grown to become one of the premier contracting companies in the region.',
    department: 'management',
    email: 'ahmed@rawafid.com',
    phone: '+966 50 123 4567',
    whatsapp: '+966 50 123 4567',
    linkedin: 'https://linkedin.com/in/ahmedali',
    facebook: 'https://facebook.com/ahmedali',
    instagram: 'https://instagram.com/ahmedali',
    experience: 'أكثر من 20 عاماً في إدارة مشاريع البناء والتطوير العقاري. خبرة في إدارة فرق عمل تصل إلى 500 موظف. قاد مشاريع بقيمة تتجاوز 2 مليار ريال سعودي.',
    yearsOfExperience: 22,
    displayOrder: 1,
    featured: true,
    active: true,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541888946425-d81bb68b3103?w=600&q=80',
    ],
    skills: 'إدارة المشاريع, القيادة, التخطيط الاستراتيجي, إدارة المخاطر',
    certifications: 'PMP, MBA, Six Sigma Black Belt',
    seo: {
      titleAr: 'أحمد علي - الرئيس التنفيذي - روافد العمران',
      titleEn: 'Ahmed Ali - CEO - Rawafid Al Omran',
      descriptionAr: 'الرئيس التنفيذي لشركة روافد العمران بخبرة تزيد عن 20 عاماً',
      descriptionEn: 'CEO of Rawafid Al Omran with over 20 years of experience',
      keywords: 'CEO, construction, management, rawafid al omran',
    },
    createdAt: '2023-01-01',
    updatedAt: '2024-07-15',
  },
  {
    id: 'TM-002',
    nameAr: 'سارة خالد',
    nameEn: 'Sara Khaled',
    positionAr: 'المديرة المالية',
    positionEn: 'Chief Financial Officer',
    shortBioAr: 'خبيرة مالية مع أكثر من 15 عاماً في إدارة الشؤون المالية لشركات المقاولات الكبرى.',
    shortBioEn: 'Financial expert with over 15 years in financial management for major contracting companies.',
    fullBioAr: 'سارة خالد هي المديرة المالية لشركة روافد العمران. حاصلة على درجة البكالوريوس في المحاسبة من جامعة الملك سعود، وهي محاسب قانوني معتمد (CPA). تشرف على جميع العمليات المالية للشركة بما في ذلك الميزانية والتخطيط المالي والتدقيق.',
    fullBioEn: 'Sara Khaled is the CFO of Rawafid Al Omran. She holds a Bachelor\'s degree in Accounting from King Saud University and is a Certified Public Accountant (CPA). She oversees all financial operations of the company including budgeting, financial planning, and auditing.',
    department: 'finance',
    email: 'sara@rawafid.com',
    phone: '+966 55 234 5678',
    whatsapp: '+966 55 234 5678',
    linkedin: 'https://linkedin.com/in/sarakhaled',
    facebook: '',
    instagram: '',
    experience: 'خبرة 15 عاماً في المحاسبة والمالية. متخصصة في إدارة الميزانيات الكبيرة لمشاريع البناء. مسئولة عن التخطيط المالي وإعداد التقارير المالية للشركة.',
    yearsOfExperience: 15,
    displayOrder: 2,
    featured: true,
    active: true,
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    galleryImages: [],
    skills: 'محاسبة, تخطيط مالي, تدقيق, إدارة ميزانيات',
    certifications: 'CPA, CMA, CFA Level II',
    seo: {
      titleAr: 'سارة خالد - المديرة المالية - روافد العمران',
      titleEn: 'Sara Khaled - CFO - Rawafid Al Omran',
      descriptionAr: 'المديرة المالية لشركة روافد العمران بخبرة 15 عاماً',
      descriptionEn: 'CFO of Rawafid Al Omran with 15 years of experience',
      keywords: 'CFO, finance, accounting, rawafid al omran',
    },
    createdAt: '2023-02-01',
    updatedAt: '2024-07-12',
  },
  {
    id: 'TM-003',
    nameAr: 'محمد عبدالله',
    nameEn: 'Mohammed Abdullah',
    positionAr: 'مدير المشاريع',
    positionEn: 'Project Manager',
    shortBioAr: 'مدير مشاريع محترف معتمد من PMI وذو خبرة واسعة في مشاريع البناء الكبرى.',
    shortBioEn: 'PMI-certified project manager with extensive experience in major construction projects.',
    fullBioAr: 'محمد عبدالله هو مدير المشاريع في روافد العمران. حاصل على شهادة PMP وماجستير في إدارة المشاريع. يدير فرق المشاريع ويضمن تسليمها في الوقت المحدد وضمن الميزانية المحددة. لديه خبرة في مجموعة متنوعة من المشاريع بما في ذلك المباني التجارية والسكنية والمشاريع الحكومية.',
    fullBioEn: 'Mohammed Abdullah is the Project Manager at Rawafid Al Omran. He holds a PMP certification and a Master\'s in Project Management. He manages project teams and ensures delivery on time and within budget. He has experience in a variety of projects including commercial, residential, and government projects.',
    department: 'operations',
    email: 'mohammed@rawafid.com',
    phone: '+966 54 345 6789',
    whatsapp: '+966 54 345 6789',
    linkedin: 'https://linkedin.com/in/mohammedabdullah',
    facebook: 'https://facebook.com/mohammedabdullah',
    instagram: '',
    experience: '12 عاماً في إدارة المشاريع. خبرة في مشاريع تتراوح قيمتها بين 10 و 500 مليون ريال. متخصص في منهجيات Agile و Waterfall.',
    yearsOfExperience: 12,
    displayOrder: 3,
    featured: true,
    active: true,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80',
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',
    ],
    skills: 'إدارة المشاريع, PMP, إدارة الفرق, التخطيط والجدولة',
    certifications: 'PMP, PRINCE2, Scrum Master',
    seo: {
      titleAr: 'محمد عبدالله - مدير المشاريع - روافد العمران',
      titleEn: 'Mohammed Abdullah - Project Manager - Rawafid Al Omran',
      descriptionAr: 'مدير المشاريع المعتمد في روافد العمران',
      descriptionEn: 'Certified Project Manager at Rawafid Al Omran',
      keywords: 'project manager, PMP, construction, rawafid al omran',
    },
    createdAt: '2023-03-01',
    updatedAt: '2024-07-10',
  },
  {
    id: 'TM-004',
    nameAr: 'نورة فهد',
    nameEn: 'Noura Fahad',
    positionAr: 'مهندسة معمارية',
    positionEn: 'Architect',
    shortBioAr: 'مهندسة معمارية مبدعة حاصلة على جوائز في التصميم المستدام.',
    shortBioEn: 'Creative architect with award-winning sustainable design expertise.',
    fullBioAr: 'نورة فهد هي مهندسة معمارية في روافد العمران. حاصلة على درجة البكالوريوس في الهندسة المعمارية من جامعة الملك فيصل. تتميز بتصاميمها المبتكرة التي تجمع بين الجماليات والوظائف العملية. فازت بعدة جوائز في مسابقات التصميم المعماري.',
    fullBioEn: 'Noura Fahad is an Architect at Rawafid Al Omran. She holds a Bachelor\'s degree in Architecture from King Faisal University. She is known for her innovative designs that combine aesthetics with practical functionality. She has won several awards in architectural design competitions.',
    department: 'design',
    email: 'noura@rawafid.com',
    phone: '+966 56 456 7890',
    whatsapp: '+966 56 456 7890',
    linkedin: 'https://linkedin.com/in/nourafahad',
    facebook: '',
    instagram: 'https://instagram.com/nourafahad',
    experience: '8 سنوات في التصميم المعماري. متخصصة في التصميم المستدام والمباني الخضراء. خبرة في استخدام BIM و Revit.',
    yearsOfExperience: 8,
    displayOrder: 4,
    featured: false,
    active: true,
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    galleryImages: [],
    skills: 'AutoCAD, Revit, BIM, تصميم مستدام, 3D Modeling',
    certifications: 'LEED AP, AIA Associate',
    seo: {
      titleAr: 'نورة فهد - مهندسة معمارية - روافد العمران',
      titleEn: 'Noura Fahad - Architect - Rawafid Al Omran',
      descriptionAr: 'مهندسة معمارية مبدعة في روافد العمران',
      descriptionEn: 'Creative Architect at Rawafid Al Omran',
      keywords: 'architect, design, sustainable architecture, rawafid al omran',
    },
    createdAt: '2023-04-01',
    updatedAt: '2024-07-08',
  },
  {
    id: 'TM-005',
    nameAr: 'فيصل عمر',
    nameEn: 'Faisal Omar',
    positionAr: 'مهندس مدني',
    positionEn: 'Civil Engineer',
    shortBioAr: 'مهندس مدني محترف متخصص في البنية التحتية والطرق.',
    shortBioEn: 'Professional civil engineer specialized in infrastructure and roads.',
    fullBioAr: 'فيصل عمر هو مهندس مدني في روافد العمران. حاصل على درجة البكالوريوس في الهندسة المدنية من جامعة الملك عبدالعزيز. متخصص في تصميم وتنفيذ مشاريع البنية التحتية بما في ذلك الطرق والجسور وشبكات الصرف الصحي.',
    fullBioEn: 'Faisal Omar is a Civil Engineer at Rawafid Al Omran. He holds a Bachelor\'s degree in Civil Engineering from King Abdulaziz University. He specializes in the design and execution of infrastructure projects including roads, bridges, and drainage networks.',
    department: 'engineering',
    email: 'faisal@rawafid.com',
    phone: '+966 57 567 8901',
    whatsapp: '+966 57 567 8901',
    linkedin: 'https://linkedin.com/in/faisalomar',
    facebook: '',
    instagram: '',
    experience: '10 سنوات في الهندسة المدنية. خبرة في تصميم وتنفيذ مشاريع البنية التحتية. متخصص في تحليل التربة والأساسات.',
    yearsOfExperience: 10,
    displayOrder: 5,
    featured: false,
    active: true,
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    galleryImages: [],
    skills: 'AutoCAD, SAP2000, ETABS, تحليل تربة, إشراف موقع',
    certifications: 'PE, SCE Membership',
    seo: {
      titleAr: 'فيصل عمر - مهندس مدني - روافد العمران',
      titleEn: 'Faisal Omar - Civil Engineer - Rawafid Al Omran',
      descriptionAr: 'مهندس مدني متخصص في البنية التحتية في روافد العمران',
      descriptionEn: 'Civil Engineer specializing in infrastructure at Rawafid Al Omran',
      keywords: 'civil engineer, infrastructure, roads, rawafid al omran',
    },
    createdAt: '2023-05-01',
    updatedAt: '2024-07-05',
  },
  {
    id: 'TM-006',
    nameAr: 'لينا يوسف',
    nameEn: 'Lina Yousef',
    positionAr: 'مديرة الموارد البشرية',
    positionEn: 'HR Manager',
    shortBioAr: 'متخصصة في الموارد البشرية مع خبرة في بناء فرق العمل وتطوير الكفاءات.',
    shortBioEn: 'HR specialist with experience in team building and talent development.',
    fullBioAr: 'لينا يوسف هي مديرة الموارد البشرية في روافد العمران. حاصلة على درجة الماجستير في إدارة الموارد البشرية من جامعة الأميرة نورة. تشرف على جميع عمليات التوظيف والتدريب وتطوير الموظفين، وتعمل على بناء بيئة عمل إيجابية تعزز الإنتاجية والرضا الوظيفي.',
    fullBioEn: 'Lina Yousef is the HR Manager at Rawafid Al Omran. She holds a Master\'s degree in Human Resource Management from Princess Nourah University. She oversees all recruitment, training, and employee development processes, working to build a positive work environment that promotes productivity and job satisfaction.',
    department: 'hr',
    email: 'lina@rawafid.com',
    phone: '+966 58 678 9012',
    whatsapp: '+966 58 678 9012',
    linkedin: 'https://linkedin.com/in/linayousef',
    facebook: '',
    instagram: '',
    experience: '10 سنوات في الموارد البشرية. خبرة في التوظيف والتدريب وإدارة الأداء. متخصصة في بناء الثقافة المؤسسية.',
    yearsOfExperience: 10,
    displayOrder: 6,
    featured: false,
    active: false,
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
    galleryImages: [],
    skills: 'توظيف, تدريب, إدارة أداء, تخطيط موارد بشرية',
    certifications: 'CIPD, SHRM-CP',
    seo: {
      titleAr: 'لينا يوسف - مديرة الموارد البشرية - روافد العمران',
      titleEn: 'Lina Yousef - HR Manager - Rawafid Al Omran',
      descriptionAr: 'مديرة الموارد البشرية في روافد العمران',
      descriptionEn: 'HR Manager at Rawafid Al Omran',
      keywords: 'HR manager, human resources, recruitment, rawafid al omran',
    },
    createdAt: '2023-06-01',
    updatedAt: '2024-06-20',
  },
  {
    id: 'TM-007',
    nameAr: 'عبدالرحمن خليل',
    nameEn: 'Abdulrahman Khalil',
    positionAr: 'مهندس تصميم',
    positionEn: 'Design Engineer',
    shortBioAr: 'مهندس تصميم مبدع بخبرة في التصميم الداخلي والواجهات.',
    shortBioEn: 'Creative design engineer with experience in interior design and facades.',
    fullBioAr: 'عبدالرحمن خليل هو مهندس تصميم في روافد العمران. حاصل على درجة البكالوريوس في التصميم الداخلي. متخصص في تصميم الواجهات والديكور الداخلي للمباني التجارية والسكنية. يجمع بين الإبداع الفني والمعايير الهندسية.',
    fullBioEn: 'Abdulrahman Khalil is a Design Engineer at Rawafid Al Omran. He holds a Bachelor\'s degree in Interior Design. He specializes in facade and interior design for commercial and residential buildings, combining artistic creativity with engineering standards.',
    department: 'design',
    email: 'abdulrahman@rawafid.com',
    phone: '+966 59 789 0123',
    whatsapp: '+966 59 789 0123',
    linkedin: 'https://linkedin.com/in/abdulrahman',
    facebook: '',
    instagram: 'https://instagram.com/abdulrahman',
    experience: '6 سنوات في التصميم الداخلي والواجهات. متخصص في برامج التصميم ثلاثي الأبعاد.',
    yearsOfExperience: 6,
    displayOrder: 7,
    featured: false,
    active: true,
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    galleryImages: [],
    skills: '3ds Max, SketchUp, Lumion, تصميم داخلي, واجهات',
    certifications: 'CID, NCIDQ',
    seo: {
      titleAr: 'عبدالرحمن خليل - مهندس تصميم - روافد العمران',
      titleEn: 'Abdulrahman Khalil - Design Engineer - Rawafid Al Omran',
      descriptionAr: 'مهندس تصميم مبدع في روافد العمران',
      descriptionEn: 'Creative Design Engineer at Rawafid Al Omran',
      keywords: 'design engineer, interior design, facades, rawafid al omran',
    },
    createdAt: '2024-01-10',
    updatedAt: '2024-07-01',
  },
];

export const activeTeam = mockTeam.filter((m) => m.active);
export const featuredTeam = mockTeam.filter((m) => m.featured);
