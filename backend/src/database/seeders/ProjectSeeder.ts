import { Seeder } from '../seed/seeder.js';
import { Project } from '../../modules/project/models/project.model.js';

interface ProjectData {
  title: string;
  titleAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  category: string;
  categoryAr: string;
  location: string;
  locationAr: string;
  client: string;
  clientAr: string;
  year: number;
  duration: string;
  durationAr: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  images: string[];
  thumbnail: string;
  budget: string;
  budgetAr: string;
  features: string[];
  featuresAr: string[];
  isFeatured: boolean;
  isActive: boolean;
  order: number;
}

const projects: ProjectData[] = [
  {
    title: 'King Abdullah Financial District Tower',
    titleAr: 'برج منطقة الملك عبدالله المالية',
    slug: 'king-abdullah-financial-district-tower',
    description: 'A 45-story mixed-use tower featuring premium office spaces, luxury apartments, and retail outlets. The design incorporates sustainable elements including solar panels, rainwater harvesting, and green terraces throughout the building.',
    descriptionAr: 'برج متعدد الاستخدامات من 45 طابقًا يضم مساحات مكتبية فاخرة وشقق سكنية فاخرة ومتاجر تجزئة. يتضمن التصميم عناصر مستدامة بما في ذلك الألواح الشمسية وتجميع مياه الأمتار والتراسات الخضراء في جميع أنحاء المبنى.',
    shortDescription: 'A 45-story mixed-use tower with sustainable design elements.',
    shortDescriptionAr: 'برج متعدد الاستخدامات من 45 طابقًا مع عناصر تصميم مستدامة.',
    category: 'Commercial',
    categoryAr: 'تجاري',
    location: 'Riyadh, Saudi Arabia',
    locationAr: 'الرياض، المملكة العربية السعودية',
    client: 'King Abdullah Financial District Development',
    clientAr: 'تطوير منطقة الملك عبدالله المالية',
    year: 2024,
    duration: '36 months',
    durationAr: '36 شهرًا',
    status: 'completed',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/architecture-signs.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/girl-urban-view.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/architecture-signs.jpg'
    ],
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/architecture-signs.jpg',
    budget: 'SAR 450,000,000',
    budgetAr: '450,000,000 ريال سعودي',
    features: ['LEED Platinum Certification', 'Smart Building Systems', 'Underground Parking', 'Rooftop Garden', 'Solar Panel Array'],
    featuresAr: ['شهادة LEED البلاتينية', 'أنظمة المباني الذكية', 'مواقف سيارات تحت الأرض', 'حديقة على السطح', 'مصفوفة الألواح الشمسية'],
    isFeatured: true,
    isActive: true,
    order: 1
  },
  {
    title: 'Al Olaya Residential Complex',
    titleAr: 'مجمع العليا السكني',
    slug: 'al-olaya-residential-complex',
    description: 'A luxurious residential complex comprising 200 units of premium apartments and townhouses. The development features world-class amenities including a clubhouse, swimming pools, fitness center, and beautifully landscaped gardens.',
    descriptionAr: 'مجمع سكني فاخر يضم 200 وحدة من الشقق الفاخرة والمنازل المدينة. يضم التطوير مرافق عالمية المستوى بما في ذلك clubhouse ومسبح ومركز لياقة وحدائق منسقة بشكل جميل.',
    shortDescription: 'Luxurious residential complex with premium amenities.',
    shortDescriptionAr: 'مجمع سكني فاخر مع مرافق متميزة.',
    category: 'Residential',
    categoryAr: 'سكني',
    location: 'Riyadh, Saudi Arabia',
    locationAr: 'الرياض، المملكة العربية السعودية',
    client: 'Al Olaya Development Company',
    clientAr: 'شركة تطوير العليا',
    year: 2023,
    duration: '24 months',
    durationAr: '24 شهرًا',
    status: 'completed',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg'
    ],
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
    budget: 'SAR 280,000,000',
    budgetAr: '280,000,000 ريال سعودي',
    features: ['Clubhouse', 'Olympic Swimming Pool', 'Tennis Courts', 'Children Playground', '24/7 Security'],
    featuresAr: ['Clubhouse', 'مسبح أولمبي', 'ملاعب تنس', 'ملعب أطفال', 'أمن على مدار الساعة'],
    isFeatured: true,
    isActive: true,
    order: 2
  },
  {
    title: 'Jeddah Corniche Hotel',
    titleAr: 'فندق كورنيش جدة',
    slug: 'jeddah-corniche-hotel',
    description: 'A 5-star beachfront hotel featuring 350 rooms, multiple restaurants, conference facilities, and a world-class spa. The architectural design draws inspiration from traditional Arabian aesthetics with modern interpretations.',
    descriptionAr: 'فندق شاطئي 5 نجوم يضم 350 غرفة ومطاعم متعددة ومرافق مؤتمرات وسبا عالمي المستوى. يستلهم التصميم المعماري من الجماليات العربية التقليدية بتفسيرات حديثة.',
    shortDescription: '5-star beachfront hotel with Arabian-inspired design.',
    shortDescriptionAr: 'فندق شاطئي 5 نجوم بتصميم مستوحى من العربية.',
    category: 'Hospitality',
    categoryAr: 'ضيافة',
    location: 'Jeddah, Saudi Arabia',
    locationAr: 'جدة، المملكة العربية السعودية',
    client: 'Jeddah Hospitality Group',
    clientAr: 'مجموعة ضيافة جدة',
    year: 2024,
    duration: '30 months',
    durationAr: '30 شهرًا',
    status: 'in-progress',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/architecture-signs.jpg'
    ],
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg',
    budget: 'SAR 520,000,000',
    budgetAr: '520,000,000 ريال سعودي',
    features: ['Beach Access', 'Luxury Spa', 'Conference Center', 'Multiple Restaurants', 'Rooftop Lounge'],
    featuresAr: ['وصول للشاطئ', 'سبا فاخر', 'مركز مؤتمرات', 'مطاعم متعددة', 'صالة على السطح'],
    isFeatured: true,
    isActive: true,
    order: 3
  },
  {
    title: 'Dammam Industrial Complex',
    titleAr: 'المجمع الصناعي بالدمام',
    slug: 'dammam-industrial-complex',
    description: 'A state-of-the-art industrial facility spanning 50,000 square meters, featuring modern manufacturing units, warehouse spaces, and administrative offices. Designed for efficiency and sustainability.',
    descriptionAr: 'منشأة صناعية حديثة تمتد على مساحة 50,000 متر مربع، تضم وحدات تصنيع حديثة ومساحات مستودعات ومكاتب إدارية. مصممة للكفاءة والاستدامة.',
    shortDescription: 'Modern industrial facility with sustainable design.',
    shortDescriptionAr: 'منشأة صناعية حديثة بتصميم مستدام.',
    category: 'Industrial',
    categoryAr: 'صناعي',
    location: 'Dammam, Saudi Arabia',
    locationAr: 'الدمام، المملكة العربية السعودية',
    client: 'Gulf Industrial Development Co.',
    clientAr: 'شركة تطوير الصناعات الخليجية',
    year: 2023,
    duration: '18 months',
    durationAr: '18 شهرًا',
    status: 'completed',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/architecture-signs.jpg'
    ],
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/architecture-signs.jpg',
    budget: 'SAR 180,000,000',
    budgetAr: '180,000,000 ريال سعودي',
    features: ['Modern Manufacturing Units', 'Warehouse Facilities', 'Administrative Offices', 'Loading Docks', 'Green Spaces'],
    featuresAr: ['وحدات تصنيع حديثة', 'مرافق المستودعات', 'مكاتب إدارية', ' أرصفة التحميل', 'مساحات خضراء'],
    isFeatured: false,
    isActive: true,
    order: 4
  }
];

export class ProjectSeeder extends Seeder {
  protected readonly seederName = 'ProjectSeeder';

  async run(): Promise<void> {
    this.log('Starting projects seeding...');

    try {
      for (const projectData of projects) {
        const existing = await Project.findOne({ slug: projectData.slug });
        
        if (existing) {
          this.success(`Project already exists: ${projectData.title}`);
          continue;
        }

        await Project.create(projectData);
        this.success(`Project created: ${projectData.title}`);
      }
    } catch (error) {
      this.error(`Failed to seed projects: ${error}`);
      throw error;
    }
  }

  async down(): Promise<void> {
    this.log('Removing projects...');

    try {
      const slugs = projects.map(p => p.slug);
      await Project.deleteMany({ slug: { $in: slugs } });
      this.success('Projects removed');
    } catch (error) {
      this.error(`Failed to remove projects: ${error}`);
      throw error;
    }
  }
}