export interface Subscriber {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt: string | null;
  source: string;
}

export const mockSubscribers: Subscriber[] = [
  {
    id: 'SUB-001',
    email: 'ahmed@example.com',
    name: 'أحمد العلي',
    isActive: true,
    subscribedAt: '2024-01-15',
    unsubscribedAt: null,
    source: 'footer',
  },
  {
    id: 'SUB-002',
    email: 'sara@example.com',
    name: 'سارة محمد',
    isActive: true,
    subscribedAt: '2024-02-20',
    unsubscribedAt: null,
    source: 'homepage',
  },
  {
    id: 'SUB-003',
    email: 'khalid@example.com',
    name: 'خالد الدوسري',
    isActive: false,
    subscribedAt: '2024-03-10',
    unsubscribedAt: '2024-06-01',
    source: 'blog',
  },
  {
    id: 'SUB-004',
    email: 'noura@example.com',
    name: 'نورة العنزي',
    isActive: true,
    subscribedAt: '2024-04-05',
    unsubscribedAt: null,
    source: 'footer',
  },
  {
    id: 'SUB-005',
    email: 'faisal@example.com',
    name: 'فيصل الشمري',
    isActive: true,
    subscribedAt: '2024-05-18',
    unsubscribedAt: null,
    source: 'quote',
  },
  {
    id: 'SUB-006',
    email: 'hind@example.com',
    name: 'هند القحطاني',
    isActive: true,
    subscribedAt: '2024-06-22',
    unsubscribedAt: null,
    source: 'homepage',
  },
  {
    id: 'SUB-007',
    email: 'abdullah@example.com',
    name: 'عبدالله السبيعي',
    isActive: false,
    subscribedAt: '2024-01-08',
    unsubscribedAt: '2024-03-15',
    source: 'footer',
  },
  {
    id: 'SUB-008',
    email: 'maha@example.com',
    name: 'مها الرشيد',
    isActive: true,
    subscribedAt: '2024-07-01',
    unsubscribedAt: null,
    source: 'blog',
  },
  {
    id: 'SUB-009',
    email: 'sultan@example.com',
    name: 'سلطان المطيري',
    isActive: true,
    subscribedAt: '2024-07-10',
    unsubscribedAt: null,
    source: 'footer',
  },
  {
    id: 'SUB-010',
    email: 'lama@example.com',
    name: 'لمى الحربي',
    isActive: false,
    subscribedAt: '2024-02-14',
    unsubscribedAt: '2024-05-20',
    source: 'homepage',
  },
  {
    id: 'SUB-011',
    email: 'majed@example.com',
    name: 'ماجد العتيبي',
    isActive: true,
    subscribedAt: '2024-06-30',
    unsubscribedAt: null,
    source: 'quote',
  },
  {
    id: 'SUB-012',
    email: 'reema@example.com',
    name: 'ريما الشهراني',
    isActive: true,
    subscribedAt: '2024-07-15',
    unsubscribedAt: null,
    source: 'footer',
  },
];
