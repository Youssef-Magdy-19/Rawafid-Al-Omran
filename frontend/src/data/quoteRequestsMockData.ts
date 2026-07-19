export interface QuoteRequest {
  id: string;
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  projectLocation: string;
  projectDetails: string;
  attachments: string[];
  status: 'pending' | 'reviewed' | 'inProgress' | 'completed' | 'rejected';
  timeline: { status: string; date: string; note: string }[];
  createdAt: string;
  updatedAt: string;
}

export const quoteStatusLabels: Record<string, string> = {
  pending: 'pending',
  reviewed: 'reviewed',
  inProgress: 'inProgress',
  completed: 'completed',
  rejected: 'rejected',
};

export const statusColorMap: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  reviewed: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  inProgress: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  completed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
};

export const mockQuoteRequests: QuoteRequest[] = [
  {
    id: 'QR-001',
    customerName: 'أحمد العلي',
    companyName: 'شركة العلي للتطوير',
    email: 'ahmed@alali.com',
    phone: '+966 55 123 4567',
    service: 'بناء سكني',
    budget: '2,000,000 - 3,000,000 SAR',
    projectLocation: 'الرياض - حي النرجس',
    projectDetails: 'طلب بناء فيلا سكنية بمساحة 500 متر مربع، مكونة من طابقين مع قبو، تشمل 5 غرف نوم، مجلس، صالة عائلية، ومسبح.',
    attachments: ['مخططات_أولية.pdf', 'صور_الموقع.jpg'],
    status: 'pending',
    timeline: [
      { status: 'pending', date: '2024-07-15', note: 'تم استلام طلب عرض السعر' },
    ],
    createdAt: '2024-07-15',
    updatedAt: '2024-07-15',
  },
  {
    id: 'QR-002',
    customerName: 'سارة محمد',
    companyName: 'مؤسسة السلام التجارية',
    email: 'sara@alsalam.com',
    phone: '+966 50 987 6543',
    service: 'تشطيب داخلي',
    budget: '500,000 - 800,000 SAR',
    projectLocation: 'جدة - حي الشاطئ',
    projectDetails: 'تشطيب داخلي لشقة مساحة 200 متر مربع، تشمل أعمال الكهرباء والسباكة والدهانات والأرضيات.',
    attachments: [],
    status: 'reviewed',
    timeline: [
      { status: 'pending', date: '2024-07-10', note: 'تم استلام طلب عرض السعر' },
      { status: 'reviewed', date: '2024-07-12', note: 'تم مراجعة الطلب وإرسال عرض السعر' },
    ],
    createdAt: '2024-07-10',
    updatedAt: '2024-07-12',
  },
  {
    id: 'QR-003',
    customerName: 'خالد الدوسري',
    companyName: 'مجموعة الدوسري القابضة',
    email: 'khalid@aldossary.com',
    phone: '+966 54 456 7890',
    service: 'مشروع تجاري',
    budget: '5,000,000 - 10,000,000 SAR',
    projectLocation: 'الدمام - المنطقة المركزية',
    projectDetails: 'إنشاء مبنى تجاري مكون من 4 طوابق بمساحة إجمالية 2000 متر مربع، يشمل طابق أرضي تجاري ومكاتب إدارية.',
    attachments: ['الدراسة_الجدوى.pdf', 'المخططات_الهيكلية.pdf'],
    status: 'inProgress',
    timeline: [
      { status: 'pending', date: '2024-06-20', note: 'تم استلام طلب عرض السعر' },
      { status: 'reviewed', date: '2024-06-22', note: 'تم مراجعة الطلب' },
      { status: 'inProgress', date: '2024-06-25', note: 'قيد التفاوض والدراسة' },
    ],
    createdAt: '2024-06-20',
    updatedAt: '2024-06-25',
  },
  {
    id: 'QR-004',
    customerName: 'نورة العنزي',
    companyName: 'شركة العنزي العقارية',
    email: 'noura@alanazi.com',
    phone: '+966 56 789 0123',
    service: 'بنية تحتية',
    budget: '3,000,000 - 5,000,000 SAR',
    projectLocation: 'الخبر - حي العقربية',
    projectDetails: 'تطوير بنية تحتية لمشروع سكني جديد يشمل شبكات المياه والصرف الصحي والكهرباء والطرق الداخلية.',
    attachments: ['مخططات_البنية_التحتية.pdf'],
    status: 'completed',
    timeline: [
      { status: 'pending', date: '2024-05-01', note: 'تم استلام طلب عرض السعر' },
      { status: 'reviewed', date: '2024-05-03', note: 'تم مراجعة الطلب' },
      { status: 'inProgress', date: '2024-05-05', note: 'بدأت المفاوضات' },
      { status: 'completed', date: '2024-05-10', note: 'تم الاتفاق وتوقيع العقد' },
    ],
    createdAt: '2024-05-01',
    updatedAt: '2024-05-10',
  },
  {
    id: 'QR-005',
    customerName: 'فيصل الشمري',
    companyName: 'مؤسسة الشمري للمقاولات',
    email: 'faisal@alshamri.com',
    phone: '+966 53 321 0987',
    service: 'صيانة وتشغيل',
    budget: '200,000 - 400,000 SAR',
    projectLocation: 'تبوك',
    projectDetails: 'عقد صيانة سنوي لمبنى إداري بمساحة 1000 متر مربع يشمل أعمال الكهرباء والتكييف والسباكة.',
    attachments: [],
    status: 'rejected',
    timeline: [
      { status: 'pending', date: '2024-04-10', note: 'تم استلام طلب عرض السعر' },
      { status: 'reviewed', date: '2024-04-12', note: 'تم مراجعة الطلب' },
      { status: 'rejected', date: '2024-04-14', note: 'تم رفض الطلب بسبب عدم توفر الموارد' },
    ],
    createdAt: '2024-04-10',
    updatedAt: '2024-04-14',
  },
  {
    id: 'QR-006',
    customerName: 'هند القحطاني',
    companyName: 'مكتب القحطاني للاستشارات',
    email: 'hind@alqahtani.com',
    phone: '+966 55 555 5555',
    service: 'تصميم معماري',
    budget: '100,000 - 200,000 SAR',
    projectLocation: 'الرياض',
    projectDetails: 'تصميم معماري لمبنى سكني صغير يشمل الواجهات والمخططات الداخلية والتصور ثلاثي الأبعاد.',
    attachments: [],
    status: 'pending',
    timeline: [
      { status: 'pending', date: '2024-07-18', note: 'تم استلام طلب عرض السعر' },
    ],
    createdAt: '2024-07-18',
    updatedAt: '2024-07-18',
  },
];
