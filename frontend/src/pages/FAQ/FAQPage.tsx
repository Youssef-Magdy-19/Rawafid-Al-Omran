import { useState, useMemo } from 'react';
import { HelpCircle, Search, RotateCcw } from 'lucide-react';
import { PageHeader, FAQAccordion, type FAQItem } from '@components';
import { useLanguage } from '@providers/LanguageProvider';
import { useFaqs } from '@hooks/useFaqs';
import type { Faq } from '@services/api/types';

function mapFaqToItem(faq: Faq, language: string): FAQItem {
  return {
    id: faq._id,
    question: language === 'ar' ? faq.questionAr || faq.question : faq.question,
    answer: language === 'ar' ? faq.answerAr || faq.answer : faq.answer,
  };
}

function getCategoryKey(category: string | undefined, language: string): string {
  return language === 'ar'
    ? category || 'uncategorized'
    : category || 'Uncategorized';
}

function getCategoryLabel(category: string | undefined, categoryAr: string | undefined, language: string): string {
  return language === 'ar'
    ? categoryAr || category || 'غير مصنف'
    : category || 'Uncategorized';
}

export function FAQPage() {
  const { language, isRTL } = useLanguage();
  const { data: faqs = [], isLoading, error, refetch } = useFaqs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<string, { label: string; items: FAQItem[] }>();
    for (const faq of faqs) {
      const key = getCategoryKey(faq.category, language);
      const label = getCategoryLabel(faq.category, faq.categoryAr, language);
      if (!map.has(key)) {
        map.set(key, { label, items: [] });
      }
      map.get(key)!.items.push(mapFaqToItem(faq, language));
    }
    return map;
  }, [faqs, language]);

  const categoryKeys = useMemo(() => Array.from(grouped.keys()), [grouped]);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return null;
    const q = searchQuery.toLowerCase();
    const all = Array.from(grouped.values()).flatMap((g) => g.items);
    return all.filter((item) =>
      item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    );
  }, [grouped, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Frequently Asked Questions"
          description="Find answers to common questions about our services and process"
          variant="centered"
        />
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Frequently Asked Questions"
          description="Find answers to common questions about our services and process"
          variant="centered"
        />
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">Failed to load FAQs. Please try again.</p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Frequently Asked Questions"
          description="Find answers to common questions about our services and process"
          variant="centered"
        />
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-gray-500">No FAQs available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Frequently Asked Questions"
        description="Find answers to common questions about our services and process"
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
              placeholder="Search questions..."
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
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === key
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {grouped.get(key)!.label}
            </button>
          ))}
        </div>

        {/* FAQ Content */}
        <div className="max-w-3xl mx-auto">
          {searchQuery ? (
            <div>
              {filteredItems && filteredItems.length > 0 ? (
                <FAQAccordion items={filteredItems} />
              ) : (
                <p className="text-center text-gray-500 py-12">No results found</p>
              )}
            </div>
          ) : selectedCategory ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {grouped.get(selectedCategory)!.label}
              </h2>
              <FAQAccordion items={grouped.get(selectedCategory)!.items} />
            </div>
          ) : (
            categoryKeys.map((key) => (
              <div key={key} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-primary-500" />
                  {grouped.get(key)!.label}
                </h2>
                <FAQAccordion items={grouped.get(key)!.items} />
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
