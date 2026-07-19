import { Seeder } from '../seed/seeder.js';
import { Blog } from '../../modules/blog/models/blog.model.js';

interface BlogData {
  title: string;
  titleAr: string;
  slug: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  author: string;
  authorAr: string;
  category: string;
  categoryAr: string;
  tags: string[];
  tagsAr: string[];
  image: string;
  thumbnail: string;
  readTime: number;
  isFeatured: boolean;
  isActive: boolean;
  publishedAt: Date;
  order: number;
}

const blogs: BlogData[] = [
  {
    title: 'The Future of Sustainable Architecture in Saudi Arabia',
    titleAr: 'مستقبل العمارة المستدامة في المملكة العربية السعودية',
    slug: 'future-sustainable-architecture-saudi-arabia',
    excerpt: 'Exploring how innovative design and green technologies are shaping the construction industry in the Kingdom.',
    excerptAr: 'استكشاف كيف يشكل التصميم المبتكر والتقنيات الخضراء صناعة البناء في المملكة.',
    content: `The Kingdom of Saudi Arabia is undergoing a remarkable transformation in its approach to architecture and construction. With Vision 2030 driving innovation and sustainability, the construction industry is embracing new technologies and design philosophies that prioritize environmental responsibility.

At Rawafid Omran, we are at the forefront of this revolution. Our latest projects incorporate LEED-certified designs, solar panel installations, and rainwater harvesting systems that reduce environmental impact while maximizing efficiency.

The integration of smart building technologies is another key trend. Buildings are now equipped with IoT sensors, automated climate control, and energy management systems that significantly reduce operational costs and carbon footprint.

Looking ahead, we see a future where every new construction project in Saudi Arabia will be designed with sustainability at its core. This isn't just an environmental imperative—it's an economic opportunity that creates jobs, attracts investment, and positions the Kingdom as a global leader in sustainable development.`,
    contentAr: `تشهد المملكة العربية السعودية تحولاً ملحوظاً في نهجها تجاه العمارة والبناء. مع رؤية 2030 التي تدفع الابتكار والاستدامة، تتبنى صناعة البناء تقنيات جديدة وفلسفات تصميمية تعطي الأولوية للمسؤولية البيئية.

نحن في رواق عمران في طليعة هذه الثورة. تتضمن مشاريعنا الأخيرة تصاميم معتمدة من LEED وتركيبات الألواح الشمسية وأنظمة تجميع مياه الأمطار التي تقلل الأثر البيئي مع تعظيم الكفاءة.

التكامل مع تقنيات المباني الذكية هو اتجاه رئيسي آخر. الآن مجهزة المباني بمستشعرات إنترنت الأشياء والتحكم الآلي في المناخ وأنظمة إدارة الطاقة التي تقلل بشكل كبير تكاليف التشغيل والبصمة الكربونية.

نظراً للمستقبل، نرى مستقبلاً حيث سيتم تصميم كل مشروع بناء جديد في المملكة العربية السعودية مع الاستدامة في جوهره.`,
    author: 'Sarah Johnson',
    authorAr: 'سارة جونسون',
    category: 'Sustainability',
    categoryAr: 'الاستدامة',
    tags: ['sustainability', 'architecture', 'green building', 'Saudi Arabia'],
    tagsAr: ['الاستدامة', 'العمارة', 'البناء الأخضر', 'المملكة العربية السعودية'],
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/architecture-signs.jpg',
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/v1/samples/landscapes/architecture-signs.jpg',
    readTime: 8,
    isFeatured: true,
    isActive: true,
    publishedAt: new Date('2024-01-15'),
    order: 1
  },
  {
    title: 'Modern Office Design Trends for 2024',
    titleAr: 'اتجاهات تصميم المكاتب الحديثة لعام 2024',
    slug: 'modern-office-design-trends-2024',
    excerpt: 'Discover the latest trends in office space design that promote productivity and employee well-being.',
    excerptAr: 'اكتشف أحدث اتجاهات تصميم مساحات العمل التي تعزز الإنتاجية ورفاهية الموظفين.',
    content: `The modern workplace is evolving rapidly, and office design is at the heart of this transformation. As companies adapt to hybrid work models and prioritize employee well-being, the design of office spaces has become more important than ever.

Key trends shaping office design in 2024 include:

1. Biophilic Design: Bringing nature indoors with living walls, natural light optimization, and organic materials creates spaces that reduce stress and boost creativity.

2. Flexible Workspaces: Modular furniture and adaptable layouts allow offices to transform based on needs, supporting both collaborative work and focused individual tasks.

3. Technology Integration: Smart lighting, climate control, and booking systems create seamless experiences for employees.

4. Wellness Amenities: From meditation rooms to standing desks, offices are increasingly designed with employee health in mind.

5. Sustainability: Green building practices and materials are becoming standard in office construction and renovation.`,
    contentAr: `يتطور مكان العمل الحديث بسرعة، وتصميم المكاتب في قلب هذا التحول. مع تكيّف الشركات مع نماذج العمل الهجينة وإعطاء الأولوية لرفاهية الموظفين، أصبح تصميم مساحات المكتب أكثر أهمية من أي وقت مضى.

الاتجاهات الرئيسية التي تشكل تصميم المكاتب في 2024 تشمل:

1. التصميم البيوفيلي: جلب الطبيعة إلى الداخل مع الجدران الحية وتحسين الضوء الطبيعي والمواد العضوية يخلق مساحات تقلل التوتر وتعزز الإبداع.

2. مساحات العمل المرنة: الأثاث المعياري والتخطيطات القابلة للتكيف تسمح للمكاتب بالتحول بناءً على الاحتياجات، تدعم العمل التعاوني والمهام الفردية المركزة.

3. تكامل التكنولوجيا: الإضاءة الذكية والتحكم في المناخ وأنظمة الحجز تخلق تجارب سلسة للموظفين.

4. مرافق العافية: من غرف التأمل إلى مكاتب الوقوف، increasingly مصممة المكاتب مع مراعاة صحة الموظفين.

5. الاستدامة: ممارسات البناء الأخضر والمواد أصبحت معياراً في بناء المكاتب وتجديدها.`,
    author: 'Fatima Hassan',
    authorAr: 'فاطمة حسن',
    category: 'Design',
    categoryAr: 'التصميم',
    tags: ['office design', 'workplace', 'interior design', 'trends'],
    tagsAr: ['تصميم المكاتب', 'مكان العمل', 'التصميم الداخلي', 'الاتجاهات'],
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains.jpg',
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/v1/samples/landscapes/nature-mountains.jpg',
    readTime: 6,
    isFeatured: true,
    isActive: true,
    publishedAt: new Date('2024-02-20'),
    order: 2
  },
  {
    title: 'Construction Project Management Best Practices',
    titleAr: 'أفضل ممارسات إدارة مشاريع البناء',
    slug: 'construction-project-management-best-practices',
    excerpt: 'Learn the essential strategies for successful project delivery in the construction industry.',
    excerptAr: 'تعرف على الاستراتيجيات الأساسية للتسليم الناجح للمشاريع في صناعة البناء.',
    content: `Effective project management is the cornerstone of successful construction projects. At Rawafid Omran, we have refined our processes over decades to deliver projects on time, within budget, and to the highest quality standards.

Key best practices include:

1. Comprehensive Planning: Every project begins with detailed feasibility studies, risk assessments, and resource planning. This foundation ensures smooth execution.

2. Clear Communication: Regular site meetings, digital collaboration tools, and transparent reporting keep all stakeholders informed and aligned.

3. Technology Adoption: BIM (Building Information Modeling), project management software, and drones for site monitoring enhance efficiency and accuracy.

4. Quality Control: Rigorous inspection protocols and material testing ensure every aspect of construction meets standards.

5. Safety First: Comprehensive safety training, PPE requirements, and regular audits protect workers and reduce liability.

6. Sustainable Practices: Environmentally responsible construction methods benefit the planet and often reduce costs.

By implementing these practices consistently, we have achieved a 98% on-time delivery rate across our portfolio.`,
    contentAr: `إدارة المشاريع الفعالة هي حجر الزاوية للمشاريع الناجحة. في رواق عمران، صقلنا عملياتنا على مدى عقود لتسليم المشاريع في الوقت المحدد وضمن الميزانية وأعلى معايير الجودة.

تشمل أفضل الممارسات الرئيسية:

1. التخطيط الشامل: يبدأ كل مشروع بدراسات جدوى مفصلة وتقييمات المخاطر وتخطيط الموارد. يضمن هذا الأساس تنفيذًا سلسًا.

2. التواصل الواضح: الاجتماعات المنتظمة في الموقع وأدوات التعاون الرقمي والتقارير الشفافة تحافظ على إطلاع جميع أصحاب المصلحة ومحاذاتهم.

3. تبني التكنولوجيا: نمذجة معلومات البناء (BIM) وبرمجيات إدارة المشاريع والطائرات بدون طيار لمراقبة الموقع تعزز الكفاءة والدقة.

4. مراقبة الجودة: بروتوكولات التفتيش الصارمة واختبار المواد تضمن تلبية كل جانب من جوانب البناء للمعايير.

5. السلامة أولاً: التدريب الشامل على السلامة ومتطلبات معدات الحماية الشخصية والتدقيق المنتظم تحمي العمال وتقلل المسؤولية.

6. الممارسات المستدامة: طرق البناء المسؤولة بيئيًا تفيد الكوكب وغالبًا ما تقلل التكاليف.

من خلال تنفيذ هذه الممارسات باستمرار، حققنا معدل تسليم في الوقت المحدد بنسبة 98٪ عبر محفظتنا.`,
    author: 'Mohammed Al-Farsi',
    authorAr: 'محمد الفارسي',
    category: 'Project Management',
    categoryAr: 'إدارة المشاريع',
    tags: ['project management', 'construction', 'best practices', 'efficiency'],
    tagsAr: ['إدارة المشاريع', 'البناء', 'أفضل الممارسات', 'الكفاءة'],
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat.jpg',
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/v1/samples/landscapes/beach-boat.jpg',
    readTime: 7,
    isFeatured: false,
    isActive: true,
    publishedAt: new Date('2024-03-10'),
    order: 3
  }
];

export class BlogSeeder extends Seeder {
  protected readonly seederName = 'BlogSeeder';

  async run(): Promise<void> {
    this.log('Starting blogs seeding...');

    try {
      for (const blogData of blogs) {
        const existing = await Blog.findOne({ slug: blogData.slug });
        
        if (existing) {
          this.success(`Blog already exists: ${blogData.title}`);
          continue;
        }

        await Blog.create(blogData);
        this.success(`Blog created: ${blogData.title}`);
      }
    } catch (error) {
      this.error(`Failed to seed blogs: ${error}`);
      throw error;
    }
  }

  async down(): Promise<void> {
    this.log('Removing blogs...');

    try {
      const slugs = blogs.map(b => b.slug);
      await Blog.deleteMany({ slug: { $in: slugs } });
      this.success('Blogs removed');
    } catch (error) {
      this.error(`Failed to remove blogs: ${error}`);
      throw error;
    }
  }
}