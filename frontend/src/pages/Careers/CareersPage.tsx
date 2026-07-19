import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, Briefcase, DollarSign, ArrowRight, Search } from 'lucide-react';
import { PageHeader, Badge, Button } from '@components';
import { useLanguage } from '@providers/LanguageProvider';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary?: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Cairo, Egypt',
    type: 'full-time',
    salary: '$80,000 - $120,000',
    description: 'We are looking for an experienced Frontend Developer to join our team and help build amazing web applications.',
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with modern CSS frameworks',
      'Excellent problem-solving skills',
    ],
    postedDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'remote',
    salary: '$90,000 - $130,000',
    description: 'Join our team to build scalable backend systems and APIs that power our products.',
    requirements: [
      '4+ years of backend development experience',
      'Proficiency in Node.js or Python',
      'Experience with databases and caching',
      'Understanding of microservices architecture',
    ],
    postedDate: '2024-01-12',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Cairo, Egypt',
    type: 'full-time',
    salary: '$60,000 - $90,000',
    description: 'Create beautiful and intuitive user interfaces for our web and mobile applications.',
    requirements: [
      '3+ years of UI/UX design experience',
      'Proficiency in Figma and Adobe XD',
      'Strong portfolio demonstrating design skills',
      'Experience with design systems',
    ],
    postedDate: '2024-01-10',
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'remote',
    salary: '$85,000 - $120,000',
    description: 'Help us build and maintain our cloud infrastructure and deployment pipelines.',
    requirements: [
      '4+ years of DevOps experience',
      'Experience with AWS or GCP',
      'Strong knowledge of Docker and Kubernetes',
      'CI/CD pipeline expertise',
    ],
    postedDate: '2024-01-08',
  },
  {
    id: '5',
    title: 'Product Manager',
    department: 'Product',
    location: 'Cairo, Egypt',
    type: 'full-time',
    salary: '$70,000 - $100,000',
    description: 'Lead product strategy and work closely with engineering and design teams.',
    requirements: [
      '5+ years of product management experience',
      'Strong analytical skills',
      'Experience with agile methodologies',
      'Excellent communication skills',
    ],
    postedDate: '2024-01-05',
  },
  {
    id: '6',
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Cairo, Egypt',
    type: 'full-time',
    salary: '$45,000 - $65,000',
    description: 'Drive our marketing efforts and help grow our brand presence.',
    requirements: [
      '3+ years of marketing experience',
      'Experience with digital marketing',
      'Strong analytical skills',
      'Creative thinking',
    ],
    postedDate: '2024-01-03',
  },
];

const jobTypes = ['all', 'full-time', 'part-time', 'contract', 'remote'] as const;
const departments = ['all', 'Engineering', 'Design', 'Product', 'Marketing'];

export function CareersPage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    return matchesSearch && matchesType && matchesDepartment;
  });

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'remote':
        return 'success';
      case 'full-time':
        return 'primary';
      case 'part-time':
        return 'secondary';
      case 'contract':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('careers.title') || 'Join Our Team'}
        description={t('careers.subtitle') || 'Build the future with us. Explore exciting career opportunities.'}
        variant="centered"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('careers.search') || 'Search jobs...'}
                className={`w-full h-12 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-600 py-2">{t('careers.type') || 'Type:'}</span>
              {jobTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedType === type
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {type === 'all' ? t('careers.all') || 'All' : type.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-sm font-medium text-gray-600 py-2">{t('careers.department') || 'Department:'}</span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDepartment === dept
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {dept === 'all' ? t('careers.all') || 'All' : dept}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`flex flex-col md:flex-row md:items-start md:justify-between gap-4 ${isRTL ? 'text-right' : ''}`}>
                  <div className="flex-1">
                    <div className={`flex flex-wrap items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <Badge variant={getTypeBadgeVariant(job.type) as any} size="sm">
                        {job.type.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className={`flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Briefcase className="h-4 w-4" />
                        {job.department}
                      </span>
                      <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Clock className="h-4 w-4" />
                        {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                      {job.salary && (
                        <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <Badge key={index} variant="secondary" size="sm">
                          {req}
                        </Badge>
                      ))}
                      {job.requirements.length > 3 && (
                        <Badge variant="secondary" size="sm">
                          +{job.requirements.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className={`flex-shrink-0 ${isRTL ? 'text-right' : ''}`}>
                    <Link to={`/careers/${job.id}`}>
                      <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                        {t('careers.apply') || 'Apply Now'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Benefits Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('careers.benefits') || 'Why Work With Us'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '💼', title: 'Competitive Salary', desc: 'We offer top-market compensation packages' },
              { icon: '🏥', title: 'Health Insurance', desc: 'Comprehensive health coverage for you and family' },
              { icon: '🎓', title: 'Learning Budget', desc: 'Annual budget for courses and conferences' },
              { icon: '🏖️', title: 'Flexible PTO', desc: 'Unlimited paid time off policy' },
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}