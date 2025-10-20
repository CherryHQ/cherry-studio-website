import './index.css'

import {
  BookOpen,
  Building2,
  Check,
  Download,
  FileText,
  KeyRound,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
  Zap
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
                  <th className="feature-column">{t('enterprise_page.comparison.table.feature_category')}</th>
                  <th className="feature-column">{t('enterprise_page.comparison.table.specific_item')}</th>
                  <th>{t('enterprise_page.comparison.table.community')}</th>
                  <th>{t('enterprise_page.comparison.table.enterprise_startup')}</th>
                  <th>{t('enterprise_page.comparison.table.enterprise')}</th>
                </tr>
              </thead>
              <tbody>
                {/* 许可与费用 */}
                <tr className="category-row">
                  <td rowSpan={2} className="category-cell">
                    {t('enterprise_page.comparison.table.license_and_cost')}
                  </td>
                  <td className="item-cell">{t('enterprise_page.comparison.table.pricing_plan')}</td>
                  <td className="plan-cell">
                    <div className="plan-content">
                      <div className="plan-title">{t('enterprise_page.comparison.table.pricing_community_title')}</div>
                      <div className="plan-price">{t('enterprise_page.comparison.table.pricing_community_price')}</div>
                    </div>
                  </td>
                  <td className="plan-cell">
                    <div className="plan-content">
                      <div className="plan-title">{t('enterprise_page.comparison.table.pricing_startup_title')}</div>
                      <div className="plan-price">{t('enterprise_page.comparison.table.pricing_startup_price')}</div>
                    </div>
                  </td>
                  <td className="plan-cell">
                    <div className="plan-content">
                      <div
                        className="plan-price"
                        dangerouslySetInnerHTML={{
                          __html: t('enterprise_page.comparison.table.pricing_enterprise_price')
                        }}></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="item-cell">{t('enterprise_page.comparison.table.annual_service_fee')}</td>
                  <td data-placeholder="true">-</td>
                  <td>{t('enterprise_page.comparison.table.annual_fee_rate')}</td>
                  <td>{t('enterprise_page.comparison.table.annual_fee_rate')}</td>
                </tr>

                {/* 部署与支持 */}
                <tr className="category-row">
                  <td rowSpan={3} className="category-cell">
                    {t('enterprise_page.comparison.table.deployment_and_support')}
                  </td>
                  <td className="item-cell">{t('enterprise_page.comparison.table.deployment_method')}</td>
                  <td>{t('enterprise_page.comparison.table.deployment_single')}</td>
                  <td>
                    <span className="check">✓</span> {t('enterprise_page.comparison.table.deployment_private')}
                  </td>
                  <td>
                    <span className="check">✓</span> {t('enterprise_page.comparison.table.deployment_private')}
                  </td>
                </tr>
                <tr>
                  <td className="item-cell">{t('enterprise_page.comparison.table.tech_support')}</td>
                  <td>{t('enterprise_page.comparison.table.support_community')}</td>
                  <td>
                    <span className="check">✓</span> {t('enterprise_page.comparison.table.support_dedicated')}
                  </td>
                  <td>
                    <span className="check">✓</span> {t('enterprise_page.comparison.table.support_dedicated')}
                  </td>
                </tr>
                <tr>
                  <td className="item-cell">{t('enterprise_page.comparison.table.system_support')}</td>
                  <td>{t('enterprise_page.comparison.table.system_community')}</td>
                  <td>{t('enterprise_page.comparison.table.system_enterprise')}</td>
                  <td>{t('enterprise_page.comparison.table.system_enterprise')}</td>
                </tr>

                {/* 核心功能 */}
                <tr className="category-row">
                  <td rowSpan={11} className="category-cell">
                    {t('enterprise_page.comparison.table.core_features')}
                  </td>
                  <td className="item-cell">{t('enterprise_page.comparison.table.basic_features')}</td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="item-cell">{t('enterprise_page.comparison.table.provider_management')}</td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                  <td>{t('enterprise_page.comparison.table.provider_management_builtin')}</td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="item-cell">{t('enterprise_page.comparison.table.model_management')}</td>
                  <td data-placeholder="true">-</td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="item-cell">{t('enterprise_page.comparison.table.employee_management')}</td>
                  <td data-placeholder="true">-</td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="item-cell">{t('enterprise_page.comparison.table.shared_knowledge_base')}</td>
                  <td data-placeholder="true">-</td>
                  <td data-placeholder="true">-</td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="item-cell">{t('enterprise_page.comparison.table.permission_control')}</td>
                  <td data-placeholder="true">-</td>
                  <td data-placeholder="true">-</td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="item-cell">{t('enterprise_page.comparison.table.data_backup')}</td>
                  <td data-placeholder="true">-</td>
                  <td data-placeholder="true">-</td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="item-cell">{t('enterprise_page.comparison.table.assistant_management')}</td>
                  <td data-placeholder="true">-</td>
                  <td data-placeholder="true">-</td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="item-cell">{t('enterprise_page.comparison.table.agent_management')}</td>
                  <td data-placeholder="true">-</td>
                  <td data-placeholder="true">-</td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="item-cell">{t('enterprise_page.comparison.table.mcp_management')}</td>
                  <td data-placeholder="true">-</td>
                  <td data-placeholder="true">-</td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="item-cell">{t('enterprise_page.comparison.table.miniprogram_management')}</td>
                  <td data-placeholder="true">-</td>
                  <td data-placeholder="true">-</td>
                  <td>
                    <span className="check">✓</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Express Edition Highlight */}
      <section className="express-highlight-section">
        <div className="container">
          <div className="express-highlight-card">
            <div className="express-badge">
              <Sparkles className="w-5 h-5" />
              <span>{t('enterprise_page.express.badge')}</span>
            </div>

            <h2 className="express-title">{t('enterprise_page.express.title')}</h2>
            <p className="express-subtitle">{t('enterprise_page.express.subtitle')}</p>

            <div className="express-price-section">
              <div className="price-tag">
                <span className="price-label">{t('enterprise_page.express.price_label')}</span>
                <div className="price-amount">
                  <span className="currency">¥</span>
                  <span className="amount">5,000</span>
                  <span className="period">{t('enterprise_page.express.period')}</span>
                </div>
              </div>

              <div className="express-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <Check className="w-5 h-5" />
                  </div>
                  <span>{t('enterprise_page.express.features.unlimited_users')}</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <Check className="w-5 h-5" />
                  </div>
                  <span>{t('enterprise_page.express.features.builtin_provider')}</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <Check className="w-5 h-5" />
                  </div>
                  <span>{t('enterprise_page.express.features.quick_deployment')}</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <Check className="w-5 h-5" />
                  </div>
                  <span>{t('enterprise_page.express.features.one_time_payment')}</span>
                </div>
              </div>
            </div>

            <div className="express-benefits">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <Zap className="w-8 h-8" />
                </div>
                <h3>{t('enterprise_page.express.benefits.fast_start.title')}</h3>
                <p>{t('enterprise_page.express.benefits.fast_start.description')}</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3>{t('enterprise_page.express.benefits.cost_effective.title')}</h3>
                <p>{t('enterprise_page.express.benefits.cost_effective.description')}</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3>{t('enterprise_page.express.benefits.enterprise_grade.title')}</h3>
                <p>{t('enterprise_page.express.benefits.enterprise_grade.description')}</p>
              </div>
            </div>

            <div className="express-cta">
              <a href="mailto:bd@cherry-ai.com" className="express-cta-button">
                {t('enterprise_page.express.cta_button')}
              </a>
              <p className="express-cta-note">{t('enterprise_page.express.cta_note')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Notice Section */}
      <section className="beta-section">
        <div className="container">
          <div className="beta-content">
            <div className="beta-card">
              <h3>{t('enterprise_page.beta.demo.title')}</h3>
              <div className="card-content">
                <ul>
                  <li>
                    <strong>{t('enterprise_page.beta.demo.admin_portal')}</strong>
                    <a href="https://admin.demo.cherry-ai.com" target="_blank" rel="noopener noreferrer">
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
                  <li>{t('enterprise_page.beta.download.server_url')} https://api.demo.cherry-ai.com</li>
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
                  href="https://docs.enterprise.cherry-ai.com/"
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
