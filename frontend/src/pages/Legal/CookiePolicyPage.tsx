import { useTranslation } from 'react-i18next';
import { PageHeader, SectionContainer } from '@components';
import { useLanguage } from '@providers/LanguageProvider';

export function CookiePolicyPage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title={t('legal.cookies.title')}
        description={t('legal.cookies.subtitle')}
        variant="centered"
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className={`prose prose-lg max-w-none ${isRTL ? 'text-right' : ''}`}>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {t('legal.cookies.lastUpdated')}: January 2024
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.cookies.sections.whatAreCookies')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('legal.cookies.sections.whatAreCookiesDesc')}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.cookies.sections.typesCookies')}
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-2">
              {t('legal.cookies.types.essential')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.cookies.types.essentialDesc')}
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-2">
              {t('legal.cookies.types.performance')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.cookies.types.performanceDesc')}
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-2">
              {t('legal.cookies.types.functionality')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.cookies.types.functionalityDesc')}
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-2">
              {t('legal.cookies.types.targeting')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('legal.cookies.types.targetingDesc')}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.cookies.sections.thirdPartyCookies')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.cookies.sections.thirdPartyCookiesDesc')}
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>{t('legal.cookies.thirdParty.analytics')}</li>
              <li>{t('legal.cookies.thirdParty.maps')}</li>
              <li>{t('legal.cookies.thirdParty.social')}</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.cookies.sections.howLongCookies')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.cookies.sections.howLongCookiesDesc')}
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>{t('legal.cookies.duration.session')}</li>
              <li>{t('legal.cookies.duration.persistent')}</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.cookies.sections.managingPreferences')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.cookies.sections.managingPreferencesDesc')}
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>{t('legal.cookies.managing.delete')}</li>
              <li>{t('legal.cookies.managing.block')}</li>
              <li>{t('legal.cookies.managing.allowCurrent')}</li>
              <li>{t('legal.cookies.managing.blockThird')}</li>
              <li>{t('legal.cookies.managing.clearOnClose')}</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.cookies.sections.browserSettings')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.cookies.sections.browserSettingsDesc')}
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>{t('legal.cookies.browsers.chrome')}</li>
              <li>{t('legal.cookies.browsers.firefox')}</li>
              <li>{t('legal.cookies.browsers.safari')}</li>
              <li>{t('legal.cookies.browsers.edge')}</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.cookies.sections.impactDisabling')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('legal.cookies.sections.impactDisablingDesc')}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.cookies.sections.updatesPolicy')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('legal.cookies.sections.updatesPolicyDesc')}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t('legal.cookies.sections.contactUs')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('legal.cookies.sections.contactUsDesc')}
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