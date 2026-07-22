import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle, FileText, DollarSign, Clock } from 'lucide-react';
import { PageHeader, Button, Input, Textarea, Select } from '@components';
import { useLanguage } from '@providers/LanguageProvider';
import { apiClient } from '@services/api/client';

const serviceOptions = [
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-development', label: 'Mobile App Development' },
  { value: 'ui-ux-design', label: 'UI/UX Design' },
  { value: 'cloud-solutions', label: 'Cloud Solutions' },
  { value: 'consulting', label: 'Digital Consulting' },
  { value: 'other', label: 'Other' },
];

const budgetOptions = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 - $15,000' },
  { value: '15k-50k', label: '$15,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: 'over-100k', label: 'Over $100,000' },
  { value: 'not-sure', label: 'Not sure yet' },
];

const timelineOptions = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-2-months', label: '1-2 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: 'flexible', label: 'Flexible' },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  projectDescription: string;
  howDidYouHear: string;
}

export function QuoteRequestPage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    projectDescription: '',
    howDidYouHear: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await apiClient.post('/quotes', formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit quote request:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Quote Request Submitted!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your interest in our services. Our team will review your requirements and get back to you within 24-48 hours with a detailed proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Back to Home
            </a>
            <a
              href="/contact"
              className="px-6 py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Contact Us Directly
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('quote.title') || 'Request a Quote'}
        description={t('quote.subtitle') || 'Tell us about your project and get a customized quote'}
        variant="centered"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name *"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    placeholder="John Doe"
                  />
                  <Input
                    label="Email Address *"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    placeholder="john@company.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+1 234 567 8900"
                  />
                  <Input
                    label="Company Name"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    placeholder="Your Company Inc."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Select
                    label="Service Needed *"
                    value={formData.service}
                    onChange={(e) => handleChange('service', e.target.value)}
                    options={serviceOptions}
                    required
                    placeholder="Select a service"
                  />
                  <Select
                    label="Budget Range"
                    value={formData.budget}
                    onChange={(e) => handleChange('budget', e.target.value)}
                    options={budgetOptions}
                    placeholder="Select budget"
                  />
                  <Select
                    label="Timeline"
                    value={formData.timeline}
                    onChange={(e) => handleChange('timeline', e.target.value)}
                    options={timelineOptions}
                    placeholder="Select timeline"
                  />
                </div>

                <Textarea
                  label="Project Description *"
                  value={formData.projectDescription}
                  onChange={(e) => handleChange('projectDescription', e.target.value)}
                  required
                  rows={6}
                  placeholder="Please describe your project, goals, and any specific requirements..."
                />

                <Input
                  label="How did you hear about us?"
                  type="text"
                  value={formData.howDidYouHear}
                  onChange={(e) => handleChange('howDidYouHear', e.target.value)}
                  placeholder="Google, LinkedIn, Referral, etc."
                />

                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                  size="lg"
                  className="w-full"
                  rightIcon={<Send className="h-5 w-5" />}
                >
                  Submit Quote Request
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* What to Expect */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What to Expect</h3>
              <div className="space-y-4">
                <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="h-4 w-4 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Review</h4>
                    <p className="text-sm text-gray-500">We review your requirements within 24 hours</p>
                  </div>
                </div>
                <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <DollarSign className="h-4 w-4 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Quote</h4>
                    <p className="text-sm text-gray-500">Receive a detailed cost estimate</p>
                  </div>
                </div>
                <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Response</h4>
                    <p className="text-sm text-gray-500">Get a response within 24-48 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-primary-500 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Need Immediate Help?</h3>
              <p className="text-white/90 mb-4">
                Prefer to talk directly? Our team is ready to assist you.
              </p>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <a href="mailto:hello@company.com" className="underline hover:text-white/80">
                    hello@company.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Phone:</span>
                  <a href="tel:+1234567890" className="underline hover:text-white/80">
                    +1 234 567 890
                  </a>
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose Us</h3>
              <div className="space-y-4">
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">100+ successful projects</span>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">Transparent pricing</span>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">No hidden costs</span>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">Dedicated support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}