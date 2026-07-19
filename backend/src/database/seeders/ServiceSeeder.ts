import { Seeder } from '../seed/seeder.js';
import { Service } from '../../modules/service/models/service.model.js';

interface ProcessStep {
  step: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
}

interface ServiceFaq {
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

interface ServiceData {
  title: string;
  titleAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  icon: string;
  image: string;
  features: string[];
  featuresAr: string[];
  benefits: string[];
  benefitsAr: string[];
  process: ProcessStep[];
  faqs: ServiceFaq[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
}

const services: ServiceData[] = [
  {
    title: 'Architectural Design',
    titleAr: 'التصميم المعماري',
    slug: 'architectural-design',
    description: 'Our architectural design services encompass comprehensive planning, conceptual development, and detailed technical drawings for residential, commercial, and industrial projects. We blend modern aesthetics with functional requirements to create spaces that inspire.',
    descriptionAr: 'تشمل خدمات التصميم المعماري التخطيط الشامل وتطوير المفاهيم والرسومات التقنية التفصيلية للمشاريع السكنية والتجارية والصناعية. نجمع بين الجماليات الحديثة والمتطلبات الوظيفية لخلق مساحات ملهمة.',
    shortDescription: 'Comprehensive architectural planning and design for all project types.',
    shortDescriptionAr: 'التخطيط والتصميم المعماري الشامل لجميع أنواع المشاريع.',
    icon: 'building',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/architecture-signs.jpg',
    features: ['Concept Development', '3D Visualization', 'Technical Drawings', 'Permit Documentation', 'Sustainable Design'],
    featuresAr: ['تطوير المفاهيم', 'التصور ثلاثي الأبعاد', 'الرسومات التقنية', 'وثائق التصريح', 'التصميم المستدام'],
    benefits: ['Innovative Designs', 'Sustainable Solutions', 'Cost Efficiency', 'Timely Delivery', 'Expert Consultation'],
    benefitsAr: ['تصاميم مبتكرة', 'حلول مستدامة', 'كفاءة التكلفة', 'التسليم في الوقت', 'استشارات متخصصة'],
    process: [
      { step: 1, title: 'Initial Consultation', titleAr: 'الاستشارة الأولية', description: 'Meet with clients to understand their vision, requirements, and budget.', descriptionAr: 'الاجتماع مع العملاء لفهم رؤيتهم ومتطلباتهم وميزانيتهم.' },
      { step: 2, title: 'Concept Development', titleAr: 'تطوير المفهوم', description: 'Create initial design concepts and present options.', descriptionAr: 'إنشاء مفاهيم التصميم الأولية وعرض الخيارات.' },
      { step: 3, title: 'Design Development', titleAr: 'تطوير التصميم', description: 'Refine selected concept with detailed drawings and specifications.', descriptionAr: 'تطوير المفهوم المختار مع الرسومات والمواصفات التفصيلية.' },
      { step: 4, title: 'Final Documentation', titleAr: 'الوثائق النهائية', description: 'Prepare complete construction documents and permits.', descriptionAr: 'إعداد وثائق البناء والتصاريح الكاملة.' }
    ],
    faqs: [
      { question: 'How long does a typical architectural project take?', questionAr: 'كم تستغرق عادةً المشاريع المعمارية؟', answer: 'Project timelines vary based on complexity. A typical residential project takes 3-6 months for design phase.', answerAr: 'تختلف الجداول الزمنية للمشاريع حسب التعقيد. يستغرق المشروع السكني النموذجي 3-6 أشهر لمرحلة التصميم.' },
      { question: 'Do you handle permit applications?', questionAr: 'هل تتعامل مع طلبات التصريح؟', answer: 'Yes, we handle all permit documentation and coordinate with relevant authorities.', answerAr: 'نعم، نتعامل مع جميع وثائق التصريح وننسق مع الجهات المعنية.' }
    ],
    isActive: true,
    isFeatured: true,
    order: 1
  },
  {
    title: 'Interior Design',
    titleAr: 'التصميم الداخلي',
    slug: 'interior-design',
    description: 'Transform your spaces with our expert interior design services. We create functional, aesthetically pleasing environments that reflect your personality and meet your practical needs, from concept to completion.',
    descriptionAr: 'حوّل مساحاتك مع خدمات التصميم الداخلي المتخصصة. نخلق بيئات وظيفية وجذابة تعكس شخصيتك وتلبي احتياجاتك العملية، من المفهوم إلى الإنجاز.',
    shortDescription: 'Expert interior design that transforms spaces into inspiring environments.',
    shortDescriptionAr: 'تصميم داخلي متخصص يحول المساحات إلى بيئات ملهمة.',
    icon: 'sofa',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/rooms/living-room-2.jpg',
    features: ['Space Planning', 'Furniture Selection', 'Color Consultation', 'Lighting Design', 'Material Selection'],
    featuresAr: ['تخطيط المساحات', 'اختيار الأثاث', 'الاستشارة اللونية', 'تصميم الإضاءة', 'اختيار المواد'],
    benefits: ['Optimized Spaces', 'Aesthetic Excellence', 'Budget Management', 'Quality Materials', 'Timely Completion'],
    benefitsAr: ['مساحات محسنة', 'تميز جمالي', 'إدارة الميزانية', 'مواد عالية الجودة', 'إكمال في الوقت'],
    process: [
      { step: 1, title: 'Needs Assessment', titleAr: 'تقييم الاحتياجات', description: 'Understand client requirements, lifestyle, and preferences.', descriptionAr: 'فهم متطلبات العملاء ونمط حياتهم وتفضيلاتهم.' },
      { step: 2, title: 'Concept Creation', titleAr: 'إنشاء المفهوم', description: 'Develop design concepts with mood boards and layouts.', descriptionAr: 'تطوير مفاهيم التصميم مع لوحات المزاج والتخطيطات.' },
      { step: 3, title: 'Design Refinement', titleAr: 'تنقية التصميم', description: 'Finalize materials, colors, and furniture selections.', descriptionAr: 'تحديد المواد والألوان واختيارات الأثاث.' },
      { step: 4, title: 'Implementation', titleAr: 'التنفيذ', description: 'Oversee installation and final styling.', descriptionAr: 'الإشراف على التثبيت والتنسيق النهائي.' }
    ],
    faqs: [
      { question: 'What is included in interior design services?', questionAr: 'ماذا تشمل خدمات التصميم الداخلي؟', answer: 'Our services include space planning, material selection, furniture procurement, and project supervision.', answerAr: 'تشمل خدماتنا تخطيط المساحات واختيار المواد وتوريد الأثاث والإشراف على المشروع.' }
    ],
    isActive: true,
    isFeatured: true,
    order: 2
  },
  {
    title: 'Project Management',
    titleAr: 'إدارة المشاريع',
    slug: 'project-management',
    description: 'Our project management services ensure your construction project is delivered on time, within budget, and to the highest quality standards. We handle all aspects from planning to final delivery.',
    descriptionAr: 'تضمن خدمات إدارة المشاريع لدينا تسليم مشروعك في الوقت المحدد وضمن الميزانية وأعلى معايير الجودة. نتعامل مع جميع الجوانب من التخطيط إلى التسليم النهائي.',
    shortDescription: 'Professional management ensuring timely and quality project delivery.',
    shortDescriptionAr: 'إدارة احترافية تضمن التسليم في الوقت المحدد وبجودة عالية.',
    icon: 'clipboard',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/john.jpg',
    features: ['Timeline Management', 'Budget Control', 'Quality Assurance', 'Vendor Coordination', 'Risk Management'],
    featuresAr: ['إدارة الجدول الزمني', 'مراقبة الميزانية', 'ضمان الجودة', 'تنسيق الموردين', 'إدارة المخاطر'],
    benefits: ['On-Time Delivery', 'Cost Control', 'Quality Assurance', 'Risk Mitigation', 'Clear Communication'],
    benefitsAr: ['التسليم في الوقت', 'مراقبة التكلفة', 'ضمان الجودة', 'تقليل المخاطر', 'تواصل واضح'],
    process: [
      { step: 1, title: 'Project Planning', titleAr: 'تخطيط المشروع', description: 'Develop comprehensive project schedule and budget.', descriptionAr: 'تطوير جدول المشروع والميزانية الشاملة.' },
      { step: 2, title: 'Team Coordination', titleAr: 'تنسيق الفريق', description: 'Coordinate with contractors and suppliers.', descriptionAr: 'التنسيق مع المقاولين والموردين.' },
      { step: 3, title: 'Quality Control', titleAr: 'مراقبة الجودة', description: 'Regular inspections and quality checks.', descriptionAr: 'الفحوصات الدورية ومراقبة الجودة.' },
      { step: 4, title: 'Final Delivery', titleAr: 'التسليم النهائي', description: 'Complete handover with documentation.', descriptionAr: 'التسليم الكامل مع الوثائق.' }
    ],
    faqs: [
      { question: 'How do you handle project delays?', questionAr: 'كيف تتعامل مع تأخيرات المشروع؟', answer: 'We proactively identify risks and implement mitigation strategies to minimize delays.', answerAr: 'نحدد المخاطر بشكل استباقي وننفذ استراتيجيات التخفيف لتقليل التأخيرات.' }
    ],
    isActive: true,
    isFeatured: true,
    order: 3
  },
  {
    title: 'Construction Services',
    titleAr: 'خدمات البناء',
    slug: 'construction-services',
    description: 'From foundation to finishing, our construction services deliver exceptional quality and craftsmanship. We use premium materials and modern techniques to build structures that stand the test of time.',
    descriptionAr: 'من الأساس إلى التشطيب، تقدم خدمات البناء لدينا جودة وحرفية استثنائية. نستخدم مواد ممتازة وتقنيات حديثة لبناء هياكل تصمد أمام اختبار الزمن.',
    shortDescription: 'Full-service construction with premium quality and craftsmanship.',
    shortDescriptionAr: 'بناء شامل مع جودة وحرفية ممتازة.',
    icon: 'hard-hat',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/architecture-signs.jpg',
    features: ['Foundation Work', 'Structural Construction', 'MEP Installation', 'Finishing Work', 'Quality Control'],
    featuresAr: ['أعمال الأساس', 'البناء الهيكلي', 'تركيب MEP', 'أعمال التشطيب', 'مراقبة الجودة'],
    benefits: ['Premium Quality', 'Skilled Workforce', 'Modern Techniques', 'Safety First', 'Warranty'],
    benefitsAr: ['جودة ممتازة', 'قوة عاملة ماهرة', 'تقنيات حديثة', 'السلامة أولاً', 'الضمان'],
    process: [
      { step: 1, title: 'Site Preparation', titleAr: 'تحضير الموقع', description: 'Clear and prepare construction site.', descriptionAr: 'مسح وتحضير موقع البناء.' },
      { step: 2, title: 'Foundation', titleAr: 'الأساس', description: 'Lay foundation according to specifications.', descriptionAr: 'وضع الأساس وفقاً للمواصفات.' },
      { step: 3, title: 'Structure', titleAr: 'الهيكل', description: 'Complete structural framework.', descriptionAr: 'إكمال الإطار الهيكلي.' },
      { step: 4, title: 'Finishing', titleAr: 'التشطيب', description: 'Final finishes and installations.', descriptionAr: 'التشطيبات والتركيبات النهائية.' }
    ],
    faqs: [
      { question: 'What warranties do you provide?', questionAr: 'ما الضمانات التي تقدمونها؟', answer: 'We provide comprehensive warranties on all construction work.', answerAr: 'نقدم ضمانات شاملة على جميع أعمال البناء.' }
    ],
    isActive: true,
    isFeatured: false,
    order: 4
  },
  {
    title: 'Renovation & Restoration',
    titleAr: 'التجديد والترميم',
    slug: 'renovation-restoration',
    description: 'Breathe new life into existing structures with our renovation and restoration services. We preserve historical character while updating functionality to meet modern standards.',
    descriptionAr: 'امنح الهياكل الموجودة حياة جديدة مع خدمات التجديد والترميم. نحافظ على الطابع التاريخي مع تحديث الوظائف لتلبية المعايير الحديثة.',
    shortDescription: 'Modernizing existing structures while preserving their character.',
    shortDescriptionAr: 'تحديث الهياكل القائمة مع الحفاظ على طابعها.',
    icon: 'tools',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/rooms/living-room-1.jpg',
    features: ['Structural Assessment', 'Historic Preservation', 'Modern Upgrades', 'Energy Efficiency', 'Code Compliance'],
    featuresAr: ['التقييم الهيكلي', 'الحفاظ التاريخي', 'الترقيات الحديثة', 'كفاءة الطاقة', 'الامتثال للقوانين'],
    benefits: ['Preserved Character', 'Modern Functionality', 'Energy Savings', 'Increased Value', 'Code Compliance'],
    benefitsAr: ['طابع محفوظ', 'وظائف حديثة', 'توفير الطاقة', 'قيمة مضافة', 'الامتثال للقوانين'],
    process: [
      { step: 1, title: 'Assessment', titleAr: 'التقييم', description: 'Evaluate current condition and requirements.', descriptionAr: 'تقييم الحالة الحالية والمتطلبات.' },
      { step: 2, title: 'Planning', titleAr: 'التخطيط', description: 'Develop renovation plan with preservation focus.', descriptionAr: 'تطوير خطة التجديد مع التركيز على الحفاظ.' },
      { step: 3, title: 'Restoration', titleAr: 'الترميم', description: 'Restore and upgrade existing elements.', descriptionAr: 'ترميم وترقية العناصر الموجودة.' },
      { step: 4, title: 'Modernization', titleAr: 'التحديث', description: 'Add modern systems and finishes.', descriptionAr: 'إضافة الأنظمة والتشطيبات الحديثة.' }
    ],
    faqs: [
      { question: 'Can you work on heritage buildings?', questionAr: 'هل يمكنكم العمل على المباني التراثية؟', answer: 'Yes, we specialize in heritage restoration with appropriate expertise.', answerAr: 'نعم، نتخصص في ترميم التراث بخبرة مناسبة.' }
    ],
    isActive: true,
    isFeatured: false,
    order: 5
  },
  {
    title: 'Consultation Services',
    titleAr: 'خدمات الاستشارات',
    slug: 'consultation-services',
    description: 'Expert consultation services for all your construction and design needs. Our experienced professionals provide valuable insights and recommendations to guide your project decisions.',
    descriptionAr: 'خدمات استشارية متخصصة لجميع احتياجات البناء والتصميم. يقدم خبرائنا المتمرسون رؤى وتوصيات قيمة لتوجيه قرارات مشروعك.',
    shortDescription: 'Expert guidance for informed project decisions.',
    shortDescriptionAr: 'إرشاد متخصص لقرارات مشروع مستنيرة.',
    icon: 'lightbulb',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    features: ['Feasibility Studies', 'Cost Analysis', 'Design Review', 'Technical Advice', 'Project Planning'],
    featuresAr: ['دراسات الجدوى', 'تحليل التكاليف', 'مراجعة التصميم', 'النصائح التقنية', 'تخطيط المشروع'],
    benefits: ['Expert Advice', 'Cost Savings', 'Risk Reduction', 'Better Decisions', 'Industry Insights'],
    benefitsAr: ['نصائح متخصصة', 'توفير التكاليف', 'تقليل المخاطر', 'قرارات أفضل', 'رؤى الصناعة'],
    process: [
      { step: 1, title: 'Initial Meeting', titleAr: 'الاجتماع الأول', description: 'Understand project scope and challenges.', descriptionAr: 'فهم نطاق المشروع والتحديات.' },
      { step: 2, title: 'Analysis', titleAr: 'التحليل', description: 'Conduct thorough project analysis.', descriptionAr: 'إجراء تحليل شامل للمشروع.' },
      { step: 3, title: 'Recommendations', titleAr: 'التوصيات', description: 'Provide detailed recommendations.', descriptionAr: 'تقديم توصيات مفصلة.' },
      { step: 4, title: 'Follow-up', titleAr: 'المتابعة', description: 'Support implementation of recommendations.', descriptionAr: 'دعم تنفيذ التوصيات.' }
    ],
    faqs: [
      { question: 'What types of projects do you consult on?', questionAr: 'ما أنواع المشاريع التي تستشيرون فيها؟', answer: 'We consult on residential, commercial, industrial, and institutional projects.', answerAr: 'نستشير في المشاريع السكنية والتجارية والصناعية والمؤسسية.' }
    ],
    isActive: true,
    isFeatured: false,
    order: 6
  }
];

export class ServiceSeeder extends Seeder {
  protected readonly seederName = 'ServiceSeeder';

  async run(): Promise<void> {
    this.log('Starting services seeding...');

    try {
      for (const serviceData of services) {
        const existing = await Service.findOne({ slug: serviceData.slug });
        
        if (existing) {
          this.success(`Service already exists: ${serviceData.title}`);
          continue;
        }

        await Service.create(serviceData);
        this.success(`Service created: ${serviceData.title}`);
      }
    } catch (error) {
      this.error(`Failed to seed services: ${error}`);
      throw error;
    }
  }

  async down(): Promise<void> {
    this.log('Removing services...');

    try {
      const slugs = services.map(s => s.slug);
      await Service.deleteMany({ slug: { $in: slugs } });
      this.success('Services removed');
    } catch (error) {
      this.error(`Failed to remove services: ${error}`);
      throw error;
    }
  }
}