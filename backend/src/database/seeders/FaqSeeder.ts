import { Seeder } from '../seed/seeder.js';
import { Faq } from '../../modules/faq/models/faq.model.js';

interface FaqData {
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
  category: string;
  categoryAr: string;
  isActive: boolean;
  order: number;
}

const faqs: FaqData[] = [
  {
    question: 'What services does Rawafid Omran offer?',
    questionAr: 'ما هي الخدمات التي تقدمها رواق عمران؟',
    answer: 'We offer a comprehensive range of construction and design services including architectural design, interior design, project management, construction services, renovation and restoration, and consultation services. Our team of experts ensures quality and professionalism in every project.',
    answerAr: 'نقدم مجموعة شاملة من خدمات البناء والتصميم بما في ذلك التصميم المعماري والتصميم الداخلي وإدارة المشاريع وخدمات البناء والتجديد والترميم وخدمات الاستشارات. يضمن فريقنا من الخبراء الجودة والاحترافية في كل مشروع.',
    category: 'Services',
    categoryAr: 'الخدمات',
    isActive: true,
    order: 1
  },
  {
    question: 'How long does a typical construction project take?',
    questionAr: 'كم تستغرق مشاريع البناء النموذجية؟',
    answer: 'Project timelines vary based on scope and complexity. A typical residential project may take 12-18 months, while commercial projects can range from 18-36 months. We provide detailed timelines during the planning phase and keep you updated throughout the process.',
    answerAr: 'تختلف الجداول الزمنية للمشاريع حسب النطاق والتعقيد. قد يستغرق المشروع السكني النموذجي من 12 إلى 18 شهرًا، بينما يمكن أن تتراوح المشاريع التجارية من 18 إلى 36 شهرًا. نقدم جداول زمنية مفصلة خلال مرحلة التخطيط ونبقيك على اطلاع طوال العملية.',
    category: 'Projects',
    categoryAr: 'المشاريع',
    isActive: true,
    order: 2
  },
  {
    question: 'Do you provide cost estimates before starting a project?',
    questionAr: 'هل تقدمون تقديرات التكلفة قبل البدء في المشروع؟',
    answer: 'Yes, we provide comprehensive cost estimates during the initial consultation phase. Our estimates include material costs, labor, permits, and potential contingencies. We believe in transparent pricing with no hidden costs.',
    answerAr: 'نعم، نقدم تقديرات شاملة للتكاليف خلال مرحلة الاستشارة الأولية. تشمل تقديراتنا تكاليف المواد والعمالة والتصاريح والمحتملة للطوارئ. نؤمن بالتسعير الشفاف بدون تكاليف مخفية.',
    category: 'Pricing',
    categoryAr: 'التسعير',
    isActive: true,
    order: 3
  },
  {
    question: 'What areas do you serve?',
    questionAr: 'ما هي المناطق التي تخدمونها؟',
    answer: 'We primarily serve the Kingdom of Saudi Arabia, with offices in Riyadh, Jeddah, and Dammam. Our team is available for projects throughout the Kingdom and we also handle international projects on a case-by-case basis.',
    answerAr: 'نخدم بشكل أساسي المملكة العربية السعودية، مع مكاتب في الرياض وجدة والدمام. فريقنا متاح للمشاريع في جميع أنحاء المملكة ونتعامل أيضًا مع المشاريع الدولية حسب كل حالة.',
    category: 'Coverage',
    categoryAr: 'التغطية',
    isActive: true,
    order: 4
  },
  {
    question: 'Do you offer sustainable and eco-friendly building options?',
    questionAr: 'هل تقدمون خيارات بناء مستدامة وصديقة للبيئة؟',
    answer: 'Absolutely! We are committed to sustainable construction practices. We offer LEED-certified designs, solar panel installations, rainwater harvesting systems, and use eco-friendly materials whenever possible. Sustainability is at the core of our design philosophy.',
    answerAr: 'بالطبع! نحن ملتزمون بممارسات البناء المستدامة. نقدم تصاميم معتمدة من LEED وتركيبات الألواح الشمسية وأنظمة تجميع مياه الأمطار ونستخدم المواد الصديقة للبيئة كلما أمكن ذلك. الاستدامة هي جوهر فلسفة التصميم لدينا.',
    category: 'Sustainability',
    categoryAr: 'الاستدامة',
    isActive: true,
    order: 5
  },
  {
    question: 'What is your warranty policy?',
    questionAr: 'ما هي سياسة الضمان الخاصة بكم؟',
    answer: 'We provide a comprehensive 2-year warranty on all construction work and a 5-year structural warranty. Our warranty covers defects in materials and workmanship. We also offer ongoing maintenance services to keep your property in top condition.',
    answerAr: 'نقدم ضمانًا شاملًا لمدة سنتين على جميع أعمال البناء وضمانًا هيكليًا لمدة 5 سنوات. يغطي ضماننا عيوب المواد والحرفية. نقدم أيضًا خدمات صيانة مستمرة للحفاظ على ممتلكاتك في حالة ممتازة.',
    category: 'Warranty',
    categoryAr: 'الضمان',
    isActive: true,
    order: 6
  }
];

export class FaqSeeder extends Seeder {
  protected readonly seederName = 'FaqSeeder';

  async run(): Promise<void> {
    this.log('Starting FAQs seeding...');

    try {
      for (const faqData of faqs) {
        const existing = await Faq.findOne({ question: faqData.question });
        
        if (existing) {
          this.success(`FAQ already exists: ${faqData.question.substring(0, 30)}...`);
          continue;
        }

        await Faq.create(faqData);
        this.success(`FAQ created: ${faqData.question.substring(0, 30)}...`);
      }
    } catch (error) {
      this.error(`Failed to seed FAQs: ${error}`);
      throw error;
    }
  }

  async down(): Promise<void> {
    this.log('Removing FAQs...');

    try {
      const questions = faqs.map(f => f.question);
      await Faq.deleteMany({ question: { $in: questions } });
      this.success('FAQs removed');
    } catch (error) {
      this.error(`Failed to remove FAQs: ${error}`);
      throw error;
    }
  }
}