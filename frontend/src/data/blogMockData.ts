export interface BlogPost {
  id: string;
  titleAr: string;
  titleEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  fullContentAr: string;
  fullContentEn: string;
  slug: string;
  category: 'constructionNews' | 'industryInsights' | 'projectUpdates' | 'safetyTips' | 'companyNews';
  author: 'admin' | 'editor' | 'contributor';
  readingTime: number;
  featured: boolean;
  published: boolean;
  coverImage: string;
  galleryImages: string[];
  tags: string;
  publishDate: string;
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

export const blogCategoryLabels: Record<string, string> = {
  constructionNews: 'constructionNews',
  industryInsights: 'industryInsights',
  projectUpdates: 'projectUpdates',
  safetyTips: 'safetyTips',
  companyNews: 'companyNews',
};

export const blogAuthorLabels: Record<string, string> = {
  admin: 'admin',
  editor: 'editor',
  contributor: 'contributor',
};

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'BLOG-001',
    titleAr: 'أحدث تقنيات البناء المستدام في المملكة',
    titleEn: 'Latest Sustainable Construction Technologies in the Kingdom',
    shortDescriptionAr: 'نظرة على أحدث التقنيات والممارسات في مجال البناء المستدام وكيف تساهم في تحقيق رؤية المملكة 2030.',
    shortDescriptionEn: 'A look at the latest technologies and practices in sustainable construction and how they contribute to achieving Saudi Vision 2030.',
    fullContentAr: '<h2>مقدمة</h2><p>يشهد قطاع البناء في المملكة العربية السعودية تحولاً كبيراً نحو الاستدامة والابتكار. مع رؤية 2030، أصبح التركيز على تقنيات البناء الخضراء والمستدامة أكثر أهمية من أي وقت مضى.</p><h2>التقنيات الحديثة</h2><p>تشمل التقنيات الحديثة في البناء المستدام استخدام المواد المعاد تدويرها، أنظمة الطاقة الشمسية المتكاملة، والتصميم الذكي الذي يقلل من استهلاك الطاقة. كما أن أنظمة إدارة المباني الذكية تساعد في تحسين كفاءة استهلاك الموارد.</p><h2>الفوائد</h2><p>تساهم هذه التقنيات في تقليل البصمة الكربونية، خفض تكاليف التشغيل على المدى الطويل، وتحسين جودة الحياة للسكان. كما أنها تعزز من قيمة العقارات وتجعلها أكثر جاذبية للمستثمرين.</p><h2>الختام</h2><p>تعتبر الاستدامة في البناء استثماراً في المستقبل. شركة روافد العمران ملتزمة بتطبيق أعلى معايير الاستدامة في جميع مشاريعها.</p>',
    fullContentEn: '<h2>Introduction</h2><p>The construction sector in Saudi Arabia is undergoing a major transformation towards sustainability and innovation. With Vision 2030, the focus on green and sustainable construction technologies has become more important than ever.</p><h2>Modern Technologies</h2><p>Modern sustainable construction technologies include the use of recycled materials, integrated solar energy systems, and smart design that reduces energy consumption. Smart building management systems also help improve resource efficiency.</p><h2>Benefits</h2><p>These technologies help reduce carbon footprint, lower operational costs in the long term, and improve quality of life for residents. They also enhance property values and make them more attractive to investors.</p><h2>Conclusion</h2><p>Sustainability in construction is an investment in the future. Rawafid Al Omran is committed to applying the highest sustainability standards in all its projects.</p>',
    slug: 'latest-sustainable-construction-technologies',
    category: 'constructionNews',
    author: 'admin',
    readingTime: 8,
    featured: true,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d81bb68b3103?w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80',
    ],
    tags: 'استدامة, تقنيات بناء, رؤية 2030, building sustainability, construction technology',
    publishDate: '2024-07-01',
    seo: {
      titleAr: 'أحدث تقنيات البناء المستدام - روافد العمران',
      titleEn: 'Latest Sustainable Construction Technologies - Rawafid Al Omran',
      descriptionAr: 'تعرف على أحدث تقنيات البناء المستدام في المملكة',
      descriptionEn: 'Learn about the latest sustainable construction technologies in the Kingdom',
      keywords: 'sustainable construction, green building, Saudi Arabia, construction technology',
    },
    createdAt: '2024-06-20',
    updatedAt: '2024-07-01',
  },
  {
    id: 'BLOG-002',
    titleAr: 'كيف تدير مشاريع البناء الكبرى بنجاح',
    titleEn: 'How to Successfully Manage Large Construction Projects',
    shortDescriptionAr: 'دليل شامل لأفضل ممارسات إدارة مشاريع البناء الكبرى من التخطيط إلى التسليم.',
    shortDescriptionEn: 'A comprehensive guide to best practices in managing large construction projects from planning to delivery.',
    fullContentAr: '<h2>التخطيط</h2><p>أساس أي مشروع بناء ناجح هو التخطيط الجيد. يجب وضع خطة شاملة تغطي جميع مراحل المشروع من التصميم إلى التسليم النهائي.</p><h2>إدارة الفريق</h2><p>فريق العمل هو العنصر الأهم في نجاح المشروع. يجب اختيار الفريق المناسب وتوزيع المهام بوضوح وتوفير التدريب المستمر.</p><h2>مراقبة الجودة</h2><p>تطبيق نظام صارم لمراقبة الجودة في جميع مراحل المشروع يضمن تحقيق أعلى المعايير.</p>',
    fullContentEn: '<h2>Planning</h2><p>The foundation of any successful construction project is good planning. A comprehensive plan must cover all project phases from design to final delivery.</p><h2>Team Management</h2><p>The work team is the most important element in project success. Choose the right team, distribute tasks clearly, and provide continuous training.</p><h2>Quality Control</h2><p>Implementing a strict quality control system at all project stages ensures the highest standards are achieved.</p>',
    slug: 'how-to-manage-large-construction-projects',
    category: 'industryInsights',
    author: 'editor',
    readingTime: 12,
    featured: true,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541888946425-d81bb68b3103?w=600&q=80',
    ],
    tags: 'إدارة مشاريع, بناء, جودة, project management, construction management',
    publishDate: '2024-06-15',
    seo: {
      titleAr: 'إدارة مشاريع البناء الكبرى - روافد العمران',
      titleEn: 'Managing Large Construction Projects - Rawafid Al Omran',
      descriptionAr: 'دليل شامل لإدارة مشاريع البناء الكبرى بنجاح',
      descriptionEn: 'A comprehensive guide to successfully managing large construction projects',
      keywords: 'project management, construction, quality control, team management',
    },
    createdAt: '2024-06-05',
    updatedAt: '2024-06-15',
  },
  {
    id: 'BLOG-003',
    titleAr: 'افتتاح مشروع طريق الملك فهد بالخبر',
    titleEn: 'Opening of King Fahd Road Project in Al Khobar',
    shortDescriptionAr: 'شركة روافد العمران تعلن عن الانتهاء من مشروع تطوير طريق الملك فهد في مدينة الخبر.',
    shortDescriptionEn: 'Rawafid Al Omran announces the completion of the King Fahd Road development project in Al Khobar.',
    fullContentAr: '<p>يسر شركة روافد العمران أن تعلن عن الانتهاء بنجاح من مشروع تطوير طريق الملك فهد في مدينة الخبر. يأتي هذا المشروع ضمن جهود الشركة للمساهمة في تطوير البنية التحتية في المنطقة الشرقية.</p><p>يشمل المشروع توسعة الطريق وتحسين التقاطعات وإنارة الشوارع بأحدث أنظمة الإضاءة الموفرة للطاقة.</p>',
    fullContentEn: '<p>Rawafid Al Omran is pleased to announce the successful completion of the King Fahd Road development project in Al Khobar. This project is part of the company\'s efforts to contribute to infrastructure development in the Eastern Region.</p><p>The project includes road expansion, intersection improvements, and street lighting with the latest energy-efficient lighting systems.</p>',
    slug: 'opening-king-fahd-road-al-khobar',
    category: 'projectUpdates',
    author: 'admin',
    readingTime: 5,
    featured: true,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    galleryImages: [],
    tags: 'مشاريع, الخبر, بنية تحتية, projects, Al Khobar, infrastructure',
    publishDate: '2024-05-20',
    seo: {
      titleAr: 'افتتاح طريق الملك فهد بالخبر - روافد العمران',
      titleEn: 'King Fahd Road Opening Al Khobar - Rawafid Al Omran',
      descriptionAr: 'شركة روافد العمران تفتتح مشروع طريق الملك فهد في الخبر',
      descriptionEn: 'Rawafid Al Omran opens King Fahd Road project in Al Khobar',
      keywords: 'road opening, Al Khobar, infrastructure, Rawafid Al Omran',
    },
    createdAt: '2024-05-10',
    updatedAt: '2024-05-20',
  },
  {
    id: 'BLOG-004',
    titleAr: 'نصائح السلامة في مواقع البناء',
    titleEn: 'Safety Tips for Construction Sites',
    shortDescriptionAr: 'أهم إرشادات وممارسات السلامة التي يجب اتباعها في مواقع البناء لضمان بيئة عمل آمنة.',
    shortDescriptionEn: 'Key safety guidelines and practices to follow at construction sites to ensure a safe work environment.',
    fullContentAr: '<h2>معدات السلامة الشخصية</h2><p>يجب على جميع العاملين في موقع البناء ارتداء معدات السلامة الشخصية المناسبة بما في ذلك الخوذات وأحذية السلامة وسترات عاكسة.</p><h2>التدريب</h2><p>التدريب المستمر على إجراءات السلامة أمر ضروري للوقاية من الحوادث.</p><h2>التفتيش الدوري</h2><p>يساعد التفتيش الدوري للمعدات والمنطقة في تحديد المخاطر المحتملة قبل وقوع الحوادث.</p>',
    fullContentEn: '<h2>Personal Protective Equipment</h2><p>All workers at the construction site must wear appropriate personal protective equipment including helmets, safety shoes, and reflective vests.</p><h2>Training</h2><p>Continuous training on safety procedures is essential for accident prevention.</p><h2>Regular Inspection</h2><p>Regular inspection of equipment and the work area helps identify potential hazards before accidents occur.</p>',
    slug: 'safety-tips-construction-sites',
    category: 'safetyTips',
    author: 'contributor',
    readingTime: 6,
    featured: false,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    galleryImages: [],
    tags: 'سلامة, مواقع بناء, حوادث, safety, construction, PPE',
    publishDate: '2024-05-10',
    seo: {
      titleAr: 'نصائح السلامة في البناء - روافد العمران',
      titleEn: 'Construction Safety Tips - Rawafid Al Omran',
      descriptionAr: 'أهم نصائح السلامة في مواقع البناء',
      descriptionEn: 'Top safety tips for construction sites',
      keywords: 'safety, construction, PPE, workplace safety',
    },
    createdAt: '2024-05-01',
    updatedAt: '2024-05-10',
  },
  {
    id: 'BLOG-005',
    titleAr: 'شركة روافد العمران تحصل على شهادة الأيزو 9001',
    titleEn: 'Rawafid Al Omran Obtains ISO 9001 Certification',
    shortDescriptionAr: 'حصول الشركة على شهادة الأيزو 9001 يؤكد التزامها بأعلى معايير إدارة الجودة.',
    shortDescriptionEn: 'The company obtaining ISO 9001 certification confirms its commitment to the highest quality management standards.',
    fullContentAr: '<p>تعلن شركة روافد العمران عن حصولها على شهادة الأيزو 9001:2015 لنظام إدارة الجودة. هذا الإنجاز يؤكد التزام الشركة بتقديم خدمات عالية الجودة وفق أفضل الممارسات العالمية.</p><p>تعتبر شهادة الأيزو 9001 من أهم الشهادات في مجال إدارة الجودة، وحصول الشركة عليها يعكس الجهود المستمرة لتطوير العمليات وتحسين الأداء.</p>',
    fullContentEn: '<p>Rawafid Al Omran announces obtaining ISO 9001:2015 certification for its quality management system. This achievement confirms the company\'s commitment to delivering high-quality services according to global best practices.</p><p>ISO 9001 is one of the most important quality management certifications, and obtaining it reflects the continuous efforts to develop processes and improve performance.</p>',
    slug: 'rawafid-al-omran-iso-9001',
    category: 'companyNews',
    author: 'editor',
    readingTime: 4,
    featured: false,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
    ],
    tags: 'أيزو, جودة, شهادة, ISO, quality, certification',
    publishDate: '2024-04-20',
    seo: {
      titleAr: 'روافد العمران تحصل على الأيزو 9001',
      titleEn: 'Rawafid Al Omran ISO 9001 Certification',
      descriptionAr: 'شركة روافد العمران تحصل على شهادة الأيزو 9001 لإدارة الجودة',
      descriptionEn: 'Rawafid Al Omran obtains ISO 9001 quality management certification',
      keywords: 'ISO 9001, quality management, certification, Rawafid Al Omran',
    },
    createdAt: '2024-04-10',
    updatedAt: '2024-04-20',
  },
  {
    id: 'BLOG-006',
    titleAr: 'اتجاهات البناء الحديثة في 2024',
    titleEn: 'Modern Construction Trends in 2024',
    shortDescriptionAr: 'نظرة على أحدث الاتجاهات في صناعة البناء والتشييد لعام 2024.',
    shortDescriptionEn: 'A look at the latest trends in the construction industry for 2024.',
    fullContentAr: '<p>تشهد صناعة البناء والتشييد تطورات سريعة في عام 2024. من البناء الذكي إلى المواد المبتكرة، تتغير طريقة بناء المباني بشكل جذري.</p><h2>البناء الذكي</h2><p>استخدام إنترنت الأشياء والذكاء الاصطناعي في إدارة المباني أصبح أكثر انتشاراً.</p><h2>المواد المبتكرة</h2><p>تطوير مواد بناء جديدة أكثر متانة وصديقة للبيئة.</p>',
    fullContentEn: '<p>The construction industry is witnessing rapid developments in 2024. From smart construction to innovative materials, the way buildings are built is changing radically.</p><h2>Smart Construction</h2><p>IoT and AI use in building management is becoming more widespread.</p><h2>Innovative Materials</h2><p>Development of new building materials that are more durable and environmentally friendly.</p>',
    slug: 'modern-construction-trends-2024',
    category: 'industryInsights',
    author: 'admin',
    readingTime: 7,
    featured: false,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
    galleryImages: [],
    tags: 'اتجاهات, بناء, 2024, trends, construction, innovation',
    publishDate: '2024-04-01',
    seo: {
      titleAr: 'اتجاهات البناء الحديثة 2024 - روافد العمران',
      titleEn: 'Modern Construction Trends 2024 - Rawafid Al Omran',
      descriptionAr: 'أحدث اتجاهات البناء والتشييد في 2024',
      descriptionEn: 'Latest construction and building trends in 2024',
      keywords: 'construction trends, smart building, innovative materials, 2024',
    },
    createdAt: '2024-03-25',
    updatedAt: '2024-04-01',
  },
  {
    id: 'BLOG-007',
    titleAr: 'دليل اختيار مقاول البناء المناسب',
    titleEn: 'Guide to Choosing the Right Construction Contractor',
    shortDescriptionAr: 'نصائح مهمة لاختيار المقاول المناسب لمشروع البناء الخاص بك.',
    shortDescriptionEn: 'Important tips for choosing the right contractor for your construction project.',
    fullContentAr: '<p>اختيار المقاول المناسب هو أحد أهم القرارات في أي مشروع بناء. إليك دليل شامل يساعدك في اتخاذ القرار الصحيح.</p><h2>الخبرة والسجل</h2><p>تحقق من خبرة المقاول وسجل أعماله السابقة.</p><h2>التراخيص</h2><p>تأكد من أن المقاول مرخص ولديه جميع التصاريح اللازمة.</p>',
    fullContentEn: '<p>Choosing the right contractor is one of the most important decisions in any construction project. Here is a comprehensive guide to help you make the right decision.</p><h2>Experience and Track Record</h2><p>Check the contractor\'s experience and previous work record.</p><h2>Licenses</h2><p>Ensure the contractor is licensed and has all necessary permits.</p>',
    slug: 'guide-choosing-right-construction-contractor',
    category: 'constructionNews',
    author: 'contributor',
    readingTime: 10,
    featured: false,
    published: false,
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    galleryImages: [],
    tags: 'مقاول, بناء, دليل, contractor, construction, guide',
    publishDate: '',
    seo: {
      titleAr: 'دليل اختيار مقاول البناء - روافد العمران',
      titleEn: 'Guide to Choosing a Contractor - Rawafid Al Omran',
      descriptionAr: 'دليل شامل لاختيار مقاول البناء المناسب',
      descriptionEn: 'Comprehensive guide to choosing the right construction contractor',
      keywords: 'contractor selection, construction guide, building contractor',
    },
    createdAt: '2024-07-10',
    updatedAt: '2024-07-10',
  },
];

export const publishedPosts = mockBlogPosts.filter((p) => p.published);
export const featuredPosts = mockBlogPosts.filter((p) => p.featured);
