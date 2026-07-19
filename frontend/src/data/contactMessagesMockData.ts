export interface ContactMessage {
  id: string;
  senderName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export const mockContactMessages: ContactMessage[] = [
  {
    id: 'MSG-001',
    senderName: 'أحمد العلي',
    email: 'ahmed@example.com',
    phone: '+966 55 123 4567',
    company: 'شركة العلي للتطوير',
    service: 'بناء سكني',
    subject: 'استفسار عن بناء فيلا',
    message: 'السلام عليكم، أود الاستفسار عن إمكانية بناء فيلا سكنية في الرياض بمساحة 500 متر مربع. أرجو تزويدي بعرض سعر مبدئي والجدول الزمني المتوقع.',
    isRead: true,
    isReplied: true,
    isArchived: false,
    createdAt: '2024-07-10',
    updatedAt: '2024-07-11',
  },
  {
    id: 'MSG-002',
    senderName: 'سارة محمد',
    email: 'sara@example.com',
    phone: '+966 50 987 6543',
    company: '',
    service: 'تشطيب داخلي',
    subject: 'استفسار عن أسعار التشطيب',
    message: 'أود معرفة أسعار التشطيب الداخلي لشقة مساحة 150 متر مربع في جدة. وما هي المواد المستخدمة؟',
    isRead: true,
    isReplied: false,
    isArchived: false,
    createdAt: '2024-07-12',
    updatedAt: '2024-07-12',
  },
  {
    id: 'MSG-003',
    senderName: 'خالد الدوسري',
    email: 'khalid@example.com',
    phone: '+966 54 456 7890',
    company: 'مؤسسة الدوسري',
    service: 'مشروع تجاري',
    subject: 'طلب اجتماع لمناقشة مشروع',
    message: 'نرغب في عقد اجتماع لمناقشة مشروع تجاري جديد في الدمام. يرجى التواصل معنا لتحديد موعد مناسب.',
    isRead: false,
    isReplied: false,
    isArchived: false,
    createdAt: '2024-07-15',
    updatedAt: '2024-07-15',
  },
  {
    id: 'MSG-004',
    senderName: 'نورة العنزي',
    email: 'noura@example.com',
    phone: '+966 56 789 0123',
    company: 'شركة العنزي العقارية',
    service: 'بنية تحتية',
    subject: 'استفسار عن تطوير بنية تحتية',
    message: 'نحن بصدد تطوير بنية تحتية لمشروع سكني جديد في الخبر. نود الحصول على استشارة أولية وعرض أسعار للخدمات المطلوبة.',
    isRead: true,
    isReplied: true,
    isArchived: true,
    createdAt: '2024-07-05',
    updatedAt: '2024-07-08',
  },
  {
    id: 'MSG-005',
    senderName: 'فيصل الشمري',
    email: 'faisal@example.com',
    phone: '+966 53 321 0987',
    company: '',
    service: 'صيانة',
    subject: 'طلب صيانة عاجلة',
    message: 'يوجد عطل في التكييف المركزي للمبنى. نحتاج إلى فريق صيانة عاجل. المبنى في الرياض حي النخيل.',
    isRead: false,
    isReplied: false,
    isArchived: false,
    createdAt: '2024-07-18',
    updatedAt: '2024-07-18',
  },
  {
    id: 'MSG-006',
    senderName: 'هند القحطاني',
    email: 'hind@example.com',
    phone: '+966 55 555 5555',
    company: 'مكتب القحطاني للاستشارات',
    service: 'تصميم معماري',
    subject: 'استشارة تصميم معماري',
    message: 'نحتاج إلى استشارات تصميم معماري لمشروع سكني صغير. هل تقدمون خدمات التصميم بشكل منفصل عن التنفيذ؟',
    isRead: true,
    isReplied: false,
    isArchived: false,
    createdAt: '2024-07-14',
    updatedAt: '2024-07-14',
  },
  {
    id: 'MSG-007',
    senderName: 'عبدالله السبيعي',
    email: 'abdullah@example.com',
    phone: '+966 57 777 8888',
    company: 'مؤسسة السبيعي',
    service: 'بناء سكني',
    subject: 'تفاصيل مشروع سكني',
    message: 'السلام عليكم، أود الحصول على معلومات أكثر حول مشاريعكم السكنية في أبها. هل لديكم مشاريع قيد التنفيذ يمكن زيارتها؟',
    isRead: false,
    isReplied: false,
    isArchived: false,
    createdAt: '2024-07-20',
    updatedAt: '2024-07-20',
  },
];
