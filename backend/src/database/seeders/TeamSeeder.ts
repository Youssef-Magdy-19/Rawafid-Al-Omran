import { Seeder } from '../seed/seeder.js';
import { Team } from '../../modules/team/models/team.model.js';

interface TeamData {
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  department: string;
  departmentAr: string;
  bio: string;
  bioAr: string;
  image: string;
  thumbnail: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  phone?: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  yearsOfExperience?: number;
  completedProjects?: number;
}

const teamMembers: TeamData[] = [
  {
    name: 'Ahmed Al-Rashid',
    nameAr: 'أحمد الراشد',
    role: 'Chief Executive Officer',
    roleAr: 'الرئيس التنفيذي',
    department: 'Executive',
    departmentAr: 'الإدارة التنفيذية',
    bio: 'With over 25 years of experience in the construction and design industry, Ahmed leads our company with a vision of excellence and innovation. His leadership has guided numerous landmark projects across the Kingdom.',
    bioAr: 'مع أكثر من 25 عامًا من الخبرة في صناعة البناء والتصميم، يقود أحمد شركتنا برؤية التميز والابتكار. لقد أرشد العديد من المشاريع البارزة في جميع أنحاء المملكة.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_fill/v1/samples/people/smiling-man.jpg',
    linkedin: 'https://linkedin.com/in/ahmedalrashid',
    email: 'ahmed@rawafid-omran.com',
    phone: '+966500000001',
    isActive: true,
    isFeatured: true,
    order: 1,
    yearsOfExperience: 25,
    completedProjects: 150
  },
  {
    name: 'Sarah Johnson',
    nameAr: 'سارة جونسون',
    role: 'Chief Architect',
    roleAr: 'الرئيس المعماري',
    department: 'Design',
    departmentAr: 'التصميم',
    bio: 'Sarah brings a unique blend of creativity and technical expertise to every project. A graduate of MIT with a focus on sustainable architecture, she has won multiple awards for innovative design solutions.',
    bioAr: 'تجلب سارة مزيجًا فريدًا من الإبداع والخبرة التقنية لكل مشروع. خريجة MIT مع التركيز على العمارة المستدامة، فازت بالعديد من الجوائز لحلول التصميم المبتكرة.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/woman-1.jpg',
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_fill/v1/samples/people/woman-1.jpg',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    email: 'sarah@rawafid-omran.com',
    isActive: true,
    isFeatured: true,
    order: 2,
    yearsOfExperience: 15,
    completedProjects: 85
  },
  {
    name: 'Mohammed Al-Farsi',
    nameAr: 'محمد الفارسي',
    role: 'Project Director',
    roleAr: 'مدير المشاريع',
    department: 'Operations',
    departmentAr: 'العمليات',
    bio: 'Mohammed oversees all project operations with meticulous attention to detail. His expertise in project management has ensured the successful delivery of complex multi-phase developments.',
    bioAr: 'يشرف محمد على جميع عمليات المشروع مع اهتمام دقيق بالتفاصيل. تضمن خبرته في إدارة المشاريع التسليم الناجح للمشاريع متعددة المراحل المعقدة.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_fill/v1/samples/people/smiling-man.jpg',
    linkedin: 'https://linkedin.com/in/mohammedalfarsi',
    email: 'mohammed@rawafid-omran.com',
    phone: '+966500000003',
    isActive: true,
    isFeatured: true,
    order: 3,
    yearsOfExperience: 18,
    completedProjects: 120
  },
  {
    name: 'Fatima Hassan',
    nameAr: 'فاطمة حسن',
    role: 'Interior Design Lead',
    roleAr: 'رئيسة التصميم الداخلي',
    department: 'Design',
    departmentAr: 'التصميم',
    bio: 'Fatima specializes in creating interior spaces that seamlessly blend functionality with aesthetic appeal. Her portfolio includes luxury residences, hotels, and corporate offices across the region.',
    bioAr: 'تتخصص فاطمة في إنشاء مساحات داخلية تمزج بسلاسة بين الوظائف والجاذبية الجمالية. تشمل محفظتها المساكن الفاخرة والفنادق ومكاتب الشركات في جميع أنحاء المنطقة.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/woman-1.jpg',
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_fill/v1/samples/people/woman-1.jpg',
    linkedin: 'https://linkedin.com/in/fatimahassan',
    email: 'fatima@rawafid-omran.com',
    isActive: true,
    isFeatured: false,
    order: 4,
    yearsOfExperience: 12,
    completedProjects: 65
  },
  {
    name: 'Khalid Al-Mutairi',
    nameAr: 'خالد المطيري',
    role: 'Chief Engineer',
    roleAr: 'المهندس الرئيسي',
    department: 'Engineering',
    departmentAr: 'الهندسة',
    bio: 'With extensive experience in structural engineering, Khalid ensures all projects meet the highest standards of safety and quality. His expertise spans from foundation design to complex structural systems.',
    bioAr: 'مع خبرة واسعة في الهندسة الإنشائية، يضمن خالد أن تفي جميع المشاريع بأعلى معايير السلامة والجودة. تمتد خبرته من تصميم الأساس إلى الأنظمة الهيكلية المعقدة.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    thumbnail: 'https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_fill/v1/samples/people/smiling-man.jpg',
    linkedin: 'https://linkedin.com/in/khalidalmutairi',
    email: 'khalid@rawafid-omran.com',
    isActive: true,
    isFeatured: false,
    order: 5,
    yearsOfExperience: 20,
    completedProjects: 95
  }
];

export class TeamSeeder extends Seeder {
  protected readonly seederName = 'TeamSeeder';

  async run(): Promise<void> {
    this.log('Starting team members seeding...');

    try {
      for (const memberData of teamMembers) {
        const existing = await Team.findOne({ name: memberData.name });
        
        if (existing) {
          this.success(`Team member already exists: ${memberData.name}`);
          continue;
        }

        await Team.create(memberData);
        this.success(`Team member created: ${memberData.name}`);
      }
    } catch (error) {
      this.error(`Failed to seed team members: ${error}`);
      throw error;
    }
  }

  async down(): Promise<void> {
    this.log('Removing team members...');

    try {
      const names = teamMembers.map(t => t.name);
      await Team.deleteMany({ name: { $in: names } });
      this.success('Team members removed');
    } catch (error) {
      this.error(`Failed to remove team members: ${error}`);
      throw error;
    }
  }
}