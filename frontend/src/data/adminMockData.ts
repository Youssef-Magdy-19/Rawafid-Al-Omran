export interface CompanyInfo {
  logo: string;
  favicon: string;
  nameAr: string;
  nameEn: string;
  shortDescAr: string;
  shortDescEn: string;
  fullDescAr: string;
  fullDescEn: string;
  email: string;
  phone: string;
  whatsapp: string;
  addressAr: string;
  addressEn: string;
  googleMapsUrl: string;
  workingHours: string;
  socialLinks: { platform: string; url: string }[];
  copyright: string;
  footerText: string;
}

export interface AdminProfileData {
  profileImage: string;
  nameAr: string;
  nameEn: string;
  email: string;
  phone: string;
  role: string;
  lastLogin: string;
  accountStatus: string;
  joinedDate: string;
  biographyAr: string;
  biographyEn: string;
  socialLinks: { platform: string; url: string }[];
}

export interface GeneralSettingsData {
  websiteName: string;
  websiteUrl: string;
  defaultLanguage: string;
  rtlSupport: boolean;
  themeMode: string;
  themeColor: string;
  homepageLayout: string;
  projectsPerPage: number;
  enableBlog: boolean;
  enableCareers: boolean;
  enableQuote: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  gaId: string;
  googleTagManager: string;
  facebookPixel: string;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  cacheEnabled: boolean;
  cacheDuration: number;
  maxFileSize: number;
  allowedFileTypes: string;
  smtpHost: string;
  smtpPort: number;
  smtpEmail: string;
  smtpEncryption: string;
  recaptchaSiteKey: string;
  recaptchaSecretKey: string;
  twoFactorAuth: boolean;
  sessionTimeout: number;
  autoSave: boolean;
  toastNotifications: boolean;
}

export const mockCompanyInfo: CompanyInfo = {
  logo: '/images/logo.png',
  favicon: '/images/favicon.ico',
  nameAr: 'روافد العمران للمقاولات العامة',
  nameEn: 'Rawafid Al Omran General Contracting',
  shortDescAr: 'شركة رائدة في مجال المقاولات والبناء والهندسة',
  shortDescEn: 'A leading company in contracting, construction, and engineering',
  fullDescAr: 'تأسست شركة روافد العمران للمقاولات العامة في عام 1998، ومنذ ذلك الحين وهي تقدم حلولاً متكاملة في مجال البناء والهندسة. تمتلك الشركة فريقاً من أكثر من 200 متخصص في مختلف المجالات الهندسية والإنشائية، ونفذت العديد من المشاريع الكبرى في جميع أنحاء المملكة العربية السعودية ودول الخليج.',
  fullDescEn: 'Rawafid Al Omran General Contracting was founded in 1998, and since then has been providing integrated solutions in construction and engineering. The company has a team of over 200 specialists in various engineering and construction fields, and has executed numerous major projects throughout Saudi Arabia and the Gulf countries.',
  email: 'info@rawafid-alomran.com',
  phone: '+966 55 123 4567',
  whatsapp: '+966 55 123 4567',
  addressAr: 'الرياض - حي النرجس - طريق الملك عبدالله',
  addressEn: 'Riyadh - Al Narjis District - King Abdullah Road',
  googleMapsUrl: 'https://maps.google.com/?q=Rawafid+Al+Omran',
  workingHours: 'SAT - THU: 8:00 AM - 5:00 PM',
  socialLinks: [
    { platform: 'twitter', url: 'https://twitter.com/rawafid' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/rawafid' },
    { platform: 'instagram', url: 'https://instagram.com/rawafid' },
    { platform: 'facebook', url: 'https://facebook.com/rawafid' },
    { platform: 'youtube', url: 'https://youtube.com/@rawafid' },
  ],
  copyright: '© 2024 Rawafid Al Omran General Contracting. All rights reserved.',
  footerText: 'Rawafid Al Omran - Your trusted partner in construction and engineering since 1998',
};

export const mockAdminProfile: AdminProfileData = {
  profileImage: '/images/admin-avatar.jpg',
  nameAr: 'م. عبدالله السالم',
  nameEn: 'Eng. Abdullah Al Salem',
  email: 'abdullah@rawafid-alomran.com',
  phone: '+966 50 111 2222',
  role: 'admin',
  lastLogin: '2024-07-18 09:30 AM',
  accountStatus: 'active',
  joinedDate: '2018-03-01',
  biographyAr: 'مهندس مدني بخبرة تزيد عن 15 عاماً في مجال إدارة المشاريع الإنشائية. حاصل على ماجستير في إدارة المشاريع من جامعة الملك سعود. قاد العديد من المشاريع الكبرى في المملكة.',
  biographyEn: 'Civil engineer with over 15 years of experience in construction project management. Holds a Master\'s degree in Project Management from King Saud University. Led numerous major projects across the kingdom.',
  socialLinks: [
    { platform: 'linkedin', url: 'https://linkedin.com/in/abdullah' },
    { platform: 'twitter', url: 'https://twitter.com/abdullah' },
  ],
};

export const mockGeneralSettings: GeneralSettingsData = {
  websiteName: 'Rawafid Al Omran',
  websiteUrl: 'https://www.rawafid-alomran.com',
  defaultLanguage: 'ar',
  rtlSupport: true,
  themeMode: 'light',
  themeColor: '#1e40af',
  homepageLayout: 'default',
  projectsPerPage: 12,
  enableBlog: true,
  enableCareers: true,
  enableQuote: true,
  metaTitle: 'Rawafid Al Omran General Contracting',
  metaDescription: 'Rawafid Al Omran is a leading general contracting company in Saudi Arabia, providing construction, engineering, and project management services since 1998.',
  metaKeywords: 'contracting, construction, engineering, Saudi Arabia, Rawafid Al Omran',
  ogTitle: 'Rawafid Al Omran General Contracting',
  ogDescription: 'Your trusted partner in construction and engineering since 1998',
  ogImage: '/images/og-default.jpg',
  gaId: 'G-XXXXXXXXXX',
  googleTagManager: 'GTM-XXXXXXX',
  facebookPixel: 'XXXXXXXXXXXXXXXX',
  maintenanceMode: false,
  maintenanceMessage: 'We are currently performing scheduled maintenance. Please check back soon.',
  cacheEnabled: true,
  cacheDuration: 3600,
  maxFileSize: 10,
  allowedFileTypes: 'jpg,jpeg,png,gif,webp,pdf,doc,docx',
  smtpHost: 'smtp.rawafid-alomran.com',
  smtpPort: 587,
  smtpEmail: 'noreply@rawafid-alomran.com',
  smtpEncryption: 'tls',
  recaptchaSiteKey: '6LcXXXXXXXXXXXXXX',
  recaptchaSecretKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
  twoFactorAuth: true,
  sessionTimeout: 60,
  autoSave: true,
  toastNotifications: true,
};
