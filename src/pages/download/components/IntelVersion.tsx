import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import intelLogo from '@/assets/images/cherry-studio-intel-logo.webp'

const IntelVersion: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="intel-version">
      <div className="intel-version-header">
        <h2 className="intel-version-title">
          <img src={intelLogo} alt={t('download_page.intel_version.title')} />
          {t('download_page.intel_version.title')}
        </h2>
        <div className="intel-version-subtitle">{t('download_page.intel_version.subtitle')}</div>
        <div className="intel-version-description">{t('download_page.intel_version.description')}</div>
      </div>

      <div className="intel-features">
        <div className="intel-feature-item">
          <div className="intel-feature-title">{t('download_page.intel_version.features.local_model.title')}</div>
          <div className="intel-feature-description">
            {t('download_page.intel_version.features.local_model.description')}
          </div>
        </div>
        <div className="intel-feature-item">
          <div className="intel-feature-title">{t('download_page.intel_version.features.long_context.title')}</div>
          <div className="intel-feature-description">
            {t('download_page.intel_version.features.long_context.description')}
          </div>
        </div>
        <div className="intel-feature-item">
          <div className="intel-feature-title">{t('download_page.intel_version.features.knowledge_base.title')}</div>
          <div className="intel-feature-description">
            {t('download_page.intel_version.features.knowledge_base.description')}
          </div>
        </div>
        <div className="intel-feature-item">
          <div className="intel-feature-title">
            {t('download_page.intel_version.features.protocol_extension.title')}
          </div>
          <div className="intel-feature-description">
            {t('download_page.intel_version.features.protocol_extension.description')}
          </div>
        </div>
      </div>

      <div className="intel-download-section">
        <div className="intel-download-buttons gap-2">
          <div className="intel-download-button">
            <a href="https://pan.quark.cn/s/705e01ff21d9" target="_blank" rel="noopener noreferrer">
              {t('download_page.quark_drive')}
            </a>
          </div>
          <div className="intel-download-button">
            <a
              href="https://1drv.ms/f/c/100833ac71368975/Eg6uwM0KlbhKuDIDzXnQjSoBEYHlX7lFpkvdWSZVnMtmtg"
              target="_blank"
              rel="noopener noreferrer">
              OneDrive
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntelVersion
