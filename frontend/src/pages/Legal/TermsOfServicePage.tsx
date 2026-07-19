import { useTranslation } from 'react-i18next';
import { PageHeader, SectionContainer } from '@components';
import { useLanguage } from '@providers/LanguageProvider';

export function TermsOfServicePage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title={t('legal.terms.title')}
        description={t('legal.terms.subtitle')}
        variant="centered"
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className={`prose prose-lg max-w-none ${isRTL ? 'text-right' : ''}`}>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {t('legal.terms.lastUpdated')}: January 2024
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.terms.sections.acceptance')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('legal.terms.sections.acceptanceDesc')}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.terms.sections.descriptionServices')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.terms.sections.descriptionServicesDesc')}
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>{t('legal.terms.services.webDev')}</li>
              <li>{t('legal.terms.services.mobileDev')}</li>
              <li>{t('legal.terms.services.uiux')}</li>
              <li>{t('legal.terms.services.cloud')}</li>
              <li>{t('legal.terms.services.digital')}</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.terms.sections.userResponsibilities')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.terms.sections.userResponsibilitiesDesc')}
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>{t('legal.terms.responsibilities.accurateInfo')}</li>
              <li>{t('legal.terms.responsibilities.security')}</li>
              <li>{t('legal.terms.responsibilities.illegal')}</li>
              <li>{t('legal.terms.responsibilities.laws')}</li>
              <li>{t('legal.terms.responsibilities.interfere')}</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.terms.sections.intellectualProperty')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('legal.terms.sections.intellectualPropertyDesc')}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.terms.sections.paymentTerms')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.terms.sections.paymentTermsDesc')}
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>{t('legal.terms.payment.deposit')}</li>
              <li>{t('legal.terms.payment.finalPayment')}</li>
              <li>{t('legal.terms.payment.ongoing')}</li>
              <li>{t('legal.terms.payment.lateFees')}</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.terms.sections.limitationLiability')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('legal.terms.sections.limitationLiabilityDesc')}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.terms.sections.confidentiality')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('legal.terms.sections.confidentialityDesc')}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.terms.sections.termination')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('legal.terms.sections.terminationDesc')}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.terms.sections.changesTerms')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('legal.terms.sections.changesTermsDesc')}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.terms.sections.contactInformation')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('legal.terms.sections.contactInformationDesc')}
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Email:</strong> legal@company.com<br />
                <strong>Phone:</strong> +1 234 567 890<br />
                <strong>Address:</strong> 123 Business Street, Cairo, Egypt
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}