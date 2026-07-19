import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HelpCircle, Search } from 'lucide-react';
import { PageHeader, FAQAccordion, type FAQItem } from '@components';
import { useLanguage } from '@providers/LanguageProvider';

const faqData: Record<string, FAQItem[]> = {
  general: [
    {
      id: 'g1',
      question: 'What services do you offer?',
      answer: 'We offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, cloud solutions, and digital consulting. Our team specializes in creating custom solutions tailored to your specific business needs.',
    },
    {
      id: 'g2',
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary depending on scope and complexity. A simple website might take 4-6 weeks, while a complex enterprise application could take 3-6 months. We provide detailed timelines during our initial consultation based on your specific requirements.',
    },
    {
      id: 'g3',
      question: 'Do you provide ongoing support after project completion?',
      answer: 'Yes, we offer comprehensive post-launch support including maintenance, updates, and technical support. We provide various support packages to ensure your digital product continues to perform optimally.',
    },
    {
      id: 'g4',
      question: 'What technologies do you work with?',
      answer: 'We work with a wide range of modern technologies including React, Vue, Angular, Node.js, Python, TypeScript, and various cloud platforms like AWS, Google Cloud, and Azure. We choose the best technology stack for each specific project.',
    },
  ],
  pricing: [
    {
      id: 'p1',
      question: 'How is your pricing structured?',
      answer: 'Our pricing is project-based, with costs determined by scope, complexity, and timeline requirements. We provide detailed proposals after understanding your specific needs. We also offer retainer arrangements for ongoing work.',
    },
    {
      id: 'p2',
      question: 'Do you offer payment plans?',
      answer: 'Yes, we offer flexible payment plans for larger projects. Typically, we structure payments as a deposit followed by milestone-based payments throughout the project lifecycle.',
    },
    {
      id: 'p3',
      question: 'Are there any hidden costs?',
      answer: 'We believe in complete transparency. All costs are clearly outlined in our proposal before any work begins. We discuss potential additional costs upfront and get your approval before proceeding.',
    },
  ],
  process: [
    {
      id: 'pr1',
      question: 'What is your development process?',
      answer: 'Our process follows agile methodology with regular sprints and demos. We start with discovery and planning, move to design, then development, testing, and finally deployment. Throughout the process, we maintain open communication and gather your feedback.',
    },
    {
      id: 'pr2',
      question: 'How do you handle project changes?',
      answer: 'We understand that requirements may evolve. Changes can be submitted through our project management system, and we assess their impact on timeline and budget. We always communicate any adjustments before implementing them.',
    },
    {
      id: 'pr3',
      question: 'Do you provide progress updates?',
      answer: 'Yes, we provide regular updates through weekly status reports, sprint reviews, and ad-hoc calls as needed. You will have access to a project dashboard where you can track progress in real-time.',
    },
  ],
  technical: [
    {
      id: 't1',
      question: 'Can you work with our existing systems?',
      answer: 'Absolutely. We have extensive experience integrating with legacy systems and third-party services. During discovery, we assess your current infrastructure and plan for seamless integration.',
    },
    {
      id: 't2',
      question: 'Do you provide hosting and domain services?',
      answer: 'We can assist with hosting setup and domain management. We work with major cloud providers and can recommend the best solution for your needs and budget.',
    },
    {
      id: 't3',
      question: 'How do you ensure code quality?',
      answer: 'We follow industry best practices including code reviews, automated testing, continuous integration, and adherence to coding standards. All code is documented and maintained for long-term sustainability.',
    },
  ],
};

const categoryLabels: Record<string, string> = {
  general: 'General Questions',
  pricing: 'Pricing & Payment',
  process: 'Our Process',
  technical: 'Technical Questions',
};

export function FAQPage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Object.keys(faqData);

  const filteredFaqs = selectedCategory
    ? faqData[selectedCategory]?.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : Object.values(faqData)
        .flat()
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('faq.title') || 'Frequently Asked Questions'}
        description={t('faq.subtitle') || 'Find answers to common questions about our services and process'}
        variant="centered"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('faq.search') || 'Search questions...'}
              className={`w-full h-12 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Questions
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {/* FAQ Content */}
        <div className="max-w-3xl mx-auto">
          {selectedCategory ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {categoryLabels[selectedCategory]}
              </h2>
              <FAQAccordion items={filteredFaqs || []} />
            </div>
          ) : (
            categories.map((category) => (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-primary-500" />
                  {categoryLabels[category]}
                </h2>
                <FAQAccordion items={faqData[category]} />
              </div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <div className="bg-primary-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-lg text-white/90 mb-6">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-500 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}