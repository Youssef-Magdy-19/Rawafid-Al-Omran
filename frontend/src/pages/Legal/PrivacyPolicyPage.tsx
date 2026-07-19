import { useTranslation } from 'react-i18next';
import { PageHeader, SectionContainer } from '@components';
import { useLanguage } from '@providers/LanguageProvider';

export function PrivacyPolicyPage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title={t('legal.privacy.title')}
        description={t('legal.privacy.subtitle')}
        variant="centered"
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className={`prose prose-lg max-w-none ${isRTL ? 'text-right' : ''}`}>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {t('legal.privacy.lastUpdated')}: January 2024
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.privacy.sections.informationWeCollect')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.privacy.sections.informationWeCollectDesc')}
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>{t('legal.privacy.items.contactInfo')}</li>
              <li>{t('legal.privacy.items.companyInfo')}</li>
              <li>{t('legal.privacy.items.projectRequirements')}</li>
              <li>{t('legal.privacy.items.communicationPreferences')}</li>
              <li>{t('legal.privacy.items.otherInfo')}</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.privacy.sections.howWeUse')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.privacy.sections.howWeUseDesc')}
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>{t('legal.privacy.items.provideServices')}</li>
              <li>{t('legal.privacy.items.respondInquiries')}</li>
              <li>{t('legal.privacy.items.sendNotices')}</li>
              <li>{t('legal.privacy.items.communicateProducts')}</li>
              <li>{t('legal.privacy.items.monitorTrends')}</li>
              <li>{t('legal.privacy.items.preventFraud')}</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.privacy.sections.informationSharing')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.privacy.sections.informationSharingDesc')}
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>{t('legal.privacy.items.serviceProviders')}</li>
              <li>{t('legal.privacy.items.businessPartners')}</li>
              <li>{t('legal.privacy.items.legalAuthorities')}</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.privacy.sections.dataSecurity')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.privacy.sections.yourRights')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.privacy.sections.yourRightsDesc')}
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>{t('legal.privacy.items.accessData')}</li>
              <li>{t('legal.privacy.items.correctData')}</li>
              <li>{t('legal.privacy.items.deleteData')}</li>
              <li>{t('legal.privacy.items.objectProcessing')}</li>
              <li>{t('legal.privacy.items.dataPortability')}</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.privacy.sections.cookiesAndTracking')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.privacy.sections.contactUs')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('legal.privacy.sections.contactUsDesc')}
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Email:</strong> privacy@company.com<br />
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