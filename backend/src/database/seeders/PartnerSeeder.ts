import { Seeder } from '../seed/seeder.js';
import { Partner } from '../../modules/partner/models/partner.model.js';

interface PartnerData {
  name: string;
  nameAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  logo: string;
  website: string;
  category: string;
  categoryAr: string;
  isFeatured: boolean;
  isActive: boolean;
  order: number;
}

const partners: PartnerData[] = [
  {
    name: 'Saudi Aramco',
    nameAr: 'أرامكو السعودية',
    slug: 'saudi-aramco',
    description: 'The world\'s largest oil company, partnering with us on major industrial projects.',
    descriptionAr: 'أكبر شركة نفط في العالم، تتعاون معنا في المشاريع الصناعية الكبرى.',
    logo: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/architecture-signs.jpg',
    website: 'https://www.aramco.com',
    category: 'Energy',
    categoryAr: 'الطاقة',
    isFeatured: true,
    isActive: true,
    order: 1
  },
  {
    name: 'Saudi Binladin Group',
    nameAr: 'مجموعة بن لادن السعودية',
    slug: 'saudi-binladin-group',
    description: 'A leading construction conglomerate in the Middle East.',
    descriptionAr: 'مجموعة بناء رائدة في الشرق الأوسط.',
    logo: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
    website: 'https://www.sbg.com.sa',
    category: 'Construction',
    categoryAr: 'البناء',
    isFeatured: true,
    isActive: true,
    order: 2
  },
  {
    name: 'SABIC',
    nameAr: 'سابك',
    slug: 'sabic',
    description: 'Global diversified chemicals company, collaborating on industrial facilities.',
    descriptionAr: 'شركة كيماويات عالمية متنوعة، تتعاون في المرافق الصناعية.',
    logo: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg',
    website: 'https://www.sabic.com',
    category: 'Chemicals',
    categoryAr: 'الكيماويات',
    isFeatured: true,
    isActive: true,
    order: 3
  },
  {
    name: 'King Abdullah University of Science and Technology',
    nameAr: 'جامعة الملك عبدالله للعلوم والتقنية',
    slug: 'kaust',
    description: 'Research university partnership for innovative construction technologies.',
    descriptionAr: 'شراكة أكاديمية للبحث في تقنيات البناء المبتكرة.',
    logo: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/architecture-signs.jpg',
    website: 'https://www.kaust.edu.sa',
    category: 'Education',
    categoryAr: 'التعليم',
    isFeatured: false,
    isActive: true,
    order: 4
  },
  {
    name: 'Saudi Electricity Company',
    nameAr: 'الشركة السعودية للكهرباء',
    slug: 'sec',
    description: 'National electricity provider, supporting our infrastructure projects.',
    descriptionAr: 'مزود الكهرباء الوطني، يدعم مشاريع البنية التحتية لدينا.',
    logo: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
    website: 'https://www.se.com.sa',
    category: 'Utilities',
    categoryAr: 'المرافق',
    isFeatured: false,
    isActive: true,
    order: 5
  }
];

export class PartnerSeeder extends Seeder {
  protected readonly seederName = 'PartnerSeeder';

  async run(): Promise<void> {
    this.log('Starting partners seeding...');

    try {
      for (const partnerData of partners) {
        const existing = await Partner.findOne({ slug: partnerData.slug });
        
        if (existing) {
          this.success(`Partner already exists: ${partnerData.name}`);
          continue;
        }

        await Partner.create(partnerData);
        this.success(`Partner created: ${partnerData.name}`);
      }
    } catch (error) {
      this.error(`Failed to seed partners: ${error}`);
      throw error;
    }
  }

  async down(): Promise<void> {
    this.log('Removing partners...');

    try {
      const slugs = partners.map(p => p.slug);
      await Partner.deleteMany({ slug: { $in: slugs } });
      this.success('Partners removed');
    } catch (error) {
      this.error(`Failed to remove partners: ${error}`);
      throw error;
    }
  }
}