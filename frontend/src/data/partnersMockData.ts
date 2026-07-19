export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
  descriptionAr: string;
  descriptionEn: string;
  partnershipType: string;
  since: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const mockPartners: Partner[] = [
  {
    id: 'PRT-001',
    name: 'شركة التقنية المتقدمة',
    logoUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=150&q=80',
    website: 'https://advancedtech.com',
    descriptionAr: 'شريك تقني رئيسي يوفر حلول البرمجيات وتقنية المعلومات لدعم عملياتنا.',
    descriptionEn: 'Key technology partner providing software solutions and IT support for our operations.',
    partnershipType: 'تقني',
    since: '2020',
    isActive: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-06-15',
  },
  {
    id: 'PRT-002',
    name: 'المجموعة السعودية للمقاولات',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&q=80',
    website: 'https://saudigroup.com',
    descriptionAr: 'شريك استراتيجي في تنفيذ المشاريع الكبرى بالمملكة.',
    descriptionEn: 'Strategic partner in executing major projects in the Kingdom.',
    partnershipType: 'استراتيجي',
    since: '2019',
    isActive: true,
    createdAt: '2024-02-05',
    updatedAt: '2024-07-20',
  },
  {
    id: 'PRT-003',
    name: 'شركة المواد المتحدة',
    logoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=150&q=80',
    website: 'https://unitedmaterials.com',
    descriptionAr: 'مورد رئيسي لمواد البناء عالية الجودة.',
    descriptionEn: 'Primary supplier of high-quality construction materials.',
    partnershipType: 'مورد',
    since: '2021',
    isActive: true,
    createdAt: '2024-03-12',
    updatedAt: '2024-08-10',
  },
  {
    id: 'PRT-004',
    name: 'مكتب الهندسة العصري',
    logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&q=80',
    website: 'https://moderneng.com',
    descriptionAr: 'شريك هندسي واستشاري لتصميم المشاريع والإشراف عليها.',
    descriptionEn: 'Engineering and consulting partner for project design and supervision.',
    partnershipType: 'استشاري',
    since: '2018',
    isActive: true,
    createdAt: '2024-04-18',
    updatedAt: '2024-09-05',
  },
  {
    id: 'PRT-005',
    name: 'شركة النقل السريع',
    logoUrl: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=150&q=80',
    website: 'https://fastlogistics.com',
    descriptionAr: 'شريك لوجستي يوفر حلول النقل والتخزين للمشاريع.',
    descriptionEn: 'Logistics partner providing transport and storage solutions for projects.',
    partnershipType: 'لوجستي',
    since: '2022',
    isActive: false,
    createdAt: '2024-05-22',
    updatedAt: '2024-10-01',
  },
  {
    id: 'PRT-006',
    name: 'مجموعة الطاقة المستدامة',
    logoUrl: 'https://images.unsplash.com/photo-1548611635-b6e7827d8c6d?w=150&q=80',
    website: 'https://sustainableenergy.com',
    descriptionAr: 'شريك في حلول الطاقة المتجددة والاستدامة للمشاريع الخضراء.',
    descriptionEn: 'Partner in renewable energy and sustainability solutions for green projects.',
    partnershipType: 'استراتيجي',
    since: '2023',
    isActive: true,
    createdAt: '2024-06-08',
    updatedAt: '2024-11-15',
  },
];

export const activePartners = mockPartners.filter((p) => p.isActive);
