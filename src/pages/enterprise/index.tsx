import './index.css'

import {
  AlertTriangle,
  BookOpen,
  Building2,
  Download,
  FileText,
  KeyRound,
  RefreshCw,
  ShieldCheck,
  Users
} from 'lucide-react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'

const EnterprisePage: FC = () => {
  const { t } = useTranslation()
  usePageMeta('enterprise')

  return (
    <div className="enterprise-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>{t('enterprise_page.hero.title')}</h1>
            <p className="subtitle">{t('enterprise_page.hero.subtitle')}</p>
            <div className="hero-actions">
              <a href="mailto:bd@cherry-ai.com" className="primary-button">
                {t('enterprise_page.hero.contact_us')}
              </a>
              <a href="#features" className="secondary-button">
                {t('enterprise_page.hero.learn_more')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('enterprise_page.features.title')}</h2>
            <p>{t('enterprise_page.features.subtitle')}</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon">
                <KeyRound size={32} />
              </div>
              <h3>{t('enterprise_page.features.model_management.title')}</h3>
              <p>{t('enterprise_page.features.model_management.description')}</p>
            </div>
            <div className="feature-card">
              <div className="icon">
                <BookOpen size={32} />
              </div>
              <h3>{t('enterprise_page.features.knowledge_base.title')}</h3>
              <p>{t('enterprise_page.features.knowledge_base.description')}</p>
            </div>
            <div className="feature-card">
              <div className="icon">
                <Users size={32} />
              </div>
              <h3>{t('enterprise_page.features.permission_control.title')}</h3>
              <p>{t('enterprise_page.features.permission_control.description')}</p>
            </div>
            <div className="feature-card">
              <div className="icon">
                <Building2 size={32} />
              </div>
              <h3>{t('enterprise_page.features.private_deployment.title')}</h3>
              <p>{t('enterprise_page.features.private_deployment.description')}</p>
            </div>
            <div className="feature-card">
              <div className="icon">
                <RefreshCw size={32} />
              </div>
              <h3>{t('enterprise_page.features.backend_service.title')}</h3>
              <p>{t('enterprise_page.features.backend_service.description')}</p>
            </div>
            <div className="feature-card">
              <div className="icon">
                <ShieldCheck size={32} />
              </div>
              <h3>{t('enterprise_page.features.security_compliance.title')}</h3>
              <p>{t('enterprise_page.features.security_compliance.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Version Comparison */}
      <section className="comparison-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('enterprise_page.comparison.title')}</h2>
            <p>{t('enterprise_page.comparison.subtitle')}</p>
          </div>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>{t('enterprise_page.comparison.table.feature')}</th>
                  <th>{t('enterprise_page.comparison.table.community')}</th>
                  <th>{t('enterprise_page.comparison.table.enterprise')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('enterprise_page.comparison.table.license')}</td>
                  <td>
                    <span className="check">✓</span> {t('enterprise_page.comparison.table.license_community')}
                  </td>
                  <td>
                    <span className="cross">◎</span> {t('enterprise_page.comparison.table.license_enterprise')}
                  </td>
                </tr>
                <tr>
                  <td>{t('enterprise_page.comparison.table.cost')}</td>
                  <td>{t('enterprise_page.comparison.table.cost_community')}</td>
                  <td>{t('enterprise_page.comparison.table.cost_enterprise')}</td>
                </tr>
                <tr>
                  <td>{t('enterprise_page.comparison.table.deployment')}</td>
                  <td>{t('enterprise_page.comparison.table.deployment_community')}</td>
                  <td>
                    <span className="check">✓</span> {t('enterprise_page.comparison.table.deployment_enterprise')}
                  </td>
                </tr>
                <tr>
                  <td>{t('enterprise_page.comparison.table.features')}</td>
                  <td>{t('enterprise_page.comparison.table.features_community')}</td>
                  <td>
                    <ul className="feature-list">
                      <li>
                        <span className="check">✓</span>{' '}
                        {t('enterprise_page.comparison.table.features_enterprise.model_management')}
                      </li>
                      <li>
                        <span className="check">✓</span>{' '}
                        {t('enterprise_page.comparison.table.features_enterprise.employee_management')}
                      </li>
                      <li>
                        <span className="check">✓</span>{' '}
                        {t('enterprise_page.comparison.table.features_enterprise.knowledge_base')}
                      </li>
                      <li>
                        <span className="check">✓</span>{' '}
                        {t('enterprise_page.comparison.table.features_enterprise.workflow')}
                      </li>
                      <li>
                        <span className="check">✓</span>{' '}
                        {t('enterprise_page.comparison.table.features_enterprise.permission')}
                      </li>
                      <li>
                        <span className="check">✓</span>{' '}
                        {t('enterprise_page.comparison.table.features_enterprise.backup')}
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>{t('enterprise_page.comparison.table.support')}</td>
                  <td>{t('enterprise_page.comparison.table.support_community')}</td>
                  <td>
                    <span className="check">✓</span> {t('enterprise_page.comparison.table.support_enterprise')}
                  </td>
                </tr>
                <tr>
                  <td>{t('enterprise_page.comparison.table.system_support')}</td>
                  <td>{t('enterprise_page.comparison.table.system_community')}</td>
                  <td>{t('enterprise_page.comparison.table.system_enterprise')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Beta Notice Section */}
      <section className="beta-section">
        <div className="container">
          <div className="beta-notice">
            <div className="notice-icon">
              <AlertTriangle size={24} />
            </div>
            <div className="notice-content">
              <h2>{t('enterprise_page.beta.title')}</h2>
              <p>{t('enterprise_page.beta.description')}</p>
            </div>
          </div>

          <div className="beta-content">
            <div className="beta-card">
              <h3>{t('enterprise_page.beta.demo.title')}</h3>
              <div className="card-content">
                <ul>
                  <li>
                    <strong>{t('enterprise_page.beta.demo.admin_portal')}</strong>
                    <a href="https://demo.admin.cherry-ai.com" target="_blank" rel="noopener noreferrer">
                      admin.demo.cherry-ai.com
                    </a>
                  </li>
                  <li>
                    <strong>{t('enterprise_page.beta.demo.account')}</strong>admin
                  </li>
                  <li>
                    <strong>{t('enterprise_page.beta.demo.password')}</strong>password
                  </li>
                </ul>
              </div>
            </div>

            <div className="beta-card">
              <h3>{t('enterprise_page.beta.download.title')}</h3>
              <div className="card-content">
                <ul>
                  <li>{t('enterprise_page.beta.download.description')}</li>
                  <li>
                    <strong>{t('enterprise_page.beta.demo.account')}</strong>user
                  </li>
                  <li>
                    <strong>{t('enterprise_page.beta.demo.password')}</strong>password
                  </li>
                </ul>
                <div className="download-info">
                  <a
                    href="https://gitcode.com/CherryHQ/cherry-studio-enterprise/releases"
                    className="download-button"
                    target="_blank"
                    rel="noopener noreferrer">
                    <span className="icon">
                      <Download size={20} />
                    </span>
                    <span className="button-text">{t('enterprise_page.beta.download.download_button')}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="beta-card">
              <h3>{t('enterprise_page.beta.manual.title')}</h3>
              <div className="card-content">
                <p>{t('enterprise_page.beta.manual.description')}</p>
                <a
                  href="https://doc.weixin.qq.com/doc/w3_ASIAPQaBALgCNdQv1pcxUTJGhXLsX?scode=APkA7AeJABIVWchL1vASIAPQaBALg"
                  className="doc-link"
                  target="_blank"
                  rel="noopener noreferrer">
                  <span className="icon">
                    <FileText size={20} />
                  </span>
                  {t('enterprise_page.beta.manual.view_manual')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="support-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('enterprise_page.support.title')}</h2>
            <p>{t('enterprise_page.support.description')}</p>
          </div>
          <div className="support-actions">
            <div className="contact-info">
              <p className="email">bd@cherry-ai.com</p>
              <div className="contact-buttons">
                <a href="mailto:bd@cherry-ai.com" className="contact-button">
                  {t('enterprise_page.support.send_email')}
                </a>
                <a
                  href="https://docs.cherry-ai.com/contact-us/questions"
                  className="contact-button secondary"
                  target="_blank"
                  rel="noopener noreferrer">
                  {t('enterprise_page.support.business_cooperation')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default EnterprisePage
