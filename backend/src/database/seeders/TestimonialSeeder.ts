import { Seeder } from '../seed/seeder.js';
import { Testimonial } from '../../modules/testimonial/models/testimonial.model.js';

interface TestimonialData {
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  company: string;
  companyAr: string;
  content: string;
  contentAr: string;
  rating: number;
  image: string;
  thumbnail: string;
  isFeatured: boolean;
  isActive: boolean;
  order: number;
}

const testimonials: TestimonialData[] = [
  {
    name: 'Prince Sultan bin Abdulaziz',
    nameAr: 'الأمير سلطان بن العزيز',
    role: 'Chairman',
    roleAr: 'رئيس مجلس الإدارة',
    company: 'Sultan Real Estate Development',
    companyAr: 'تطوير العقارات سلطان',
    content: 'Rawafid Omran has consistently delivered exceptional quality in all our joint ventures. Their attention to detail and commitment to deadlines is unmatched in the industry. We look forward to many more successful projects together.',
    contentAr: 'قدمت رواق عمران باستمرار جودة استثنائية في جميع مشاريعنا المشتركة. إن اهتمامهم بالتفاصيل والالتزام بالمواعيد النهائية لا مثيل له في الصناعة. نتطلع إلى المزيد من المشاريع الناجحة معًا.',
    rating: 5,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_fill/v1/samples/people/smiling-man.jpg',
    isFeatured: true,
    isActive: true,
    order: 1
  },
  {
    name: 'Dr. Nora Al-Zahrani',
    nameAr: 'الدكتورة نورا الزهراني',
    role: 'CEO',
    roleAr: 'الرئيس التنفيذي',
    company: 'Innovation Hub Saudi',
    companyAr: 'مركز الابتكار السعودي',
    content: 'Working with Rawafid Omran on our new headquarters was a transformative experience. Their innovative approach to sustainable design has set a new standard for commercial buildings in the region.',
    contentAr: 'كان العمل مع رواق عمران في مقرنا الرئيسي الجديد تجربة تحويلية. لقد حدد نهجهم المبتكر في التصميم المستدام معيارًا جديدًا للمباني التجارية في المنطقة.',
    rating: 5,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/woman-1.jpg',
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_fill/v1/samples/people/woman-1.jpg',
    isFeatured: true,
    isActive: true,
    order: 2
  },
  {
    name: 'James Mitchell',
    nameAr: 'جيمس ميتشيل',
    role: 'Regional Director',
    roleAr: 'المدير الإقليمي',
    company: 'Global Construction Partners',
    companyAr: 'شركاء البناء العالميون',
    content: 'The professionalism and expertise demonstrated by the Rawafid Omran team exceeded our expectations. Their project management capabilities are world-class, and the final results speak for themselves.',
    contentAr: 'تتجاوز الاحترافية والخبرة التي أظهرها فريق رواق عمران توقعاتنا. قدراتهم في إدارة المشاريع من الدرجة الأولى، والنتائج النهائية تتحدث عن نفسها.',
    rating: 5,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_fill/v1/samples/people/smiling-man.jpg',
    isFeatured: true,
    isActive: true,
    order: 3
  },
  {
    name: 'Layla Al-Rashid',
    nameAr: 'ليلى الراشد',
    role: 'Property Developer',
    roleAr: 'مطور عقاري',
    company: 'Al-Rashid Properties',
    companyAr: 'العقارات الراشد',
    content: 'We have collaborated with Rawafid Omran on multiple residential projects, and each time they have delivered beyond our expectations. Their design excellence and construction quality are truly remarkable.',
    contentAr: 'تعاون معنا رواق عمران في مشاريع سكنية متعددة، وفي كل مرة قدموا أكثر من توقعاتنا. تميزهم في التصميم وجودة البناء مدهشة حقًا.',
    rating: 5,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/woman-1.jpg',
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_fill/v1/samples/people/woman-1.jpg',
    isFeatured: false,
    isActive: true,
    order: 4
  }
];

export class TestimonialSeeder extends Seeder {
  protected readonly seederName = 'TestimonialSeeder';

  async run(): Promise<void> {
    this.log('Starting testimonials seeding...');

    try {
      for (const testimonialData of testimonials) {
        const existing = await Testimonial.findOne({ name: testimonialData.name });
        
        if (existing) {
          this.success(`Testimonial already exists: ${testimonialData.name}`);
          continue;
        }

        await Testimonial.create(testimonialData);
        this.success(`Testimonial created: ${testimonialData.name}`);
      }
    } catch (error) {
      this.error(`Failed to seed testimonials: ${error}`);
      throw error;
    }
  }

  async down(): Promise<void> {
    this.log('Removing testimonials...');

    try {
      const names = testimonials.map(t => t.name);
      await Testimonial.deleteMany({ name: { $in: names } });
      this.success('Testimonials removed');
    } catch (error) {
      this.error(`Failed to remove testimonials: ${error}`);
      throw error;
    }
  }
}