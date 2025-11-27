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
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams'
import Footer from '@/components/website/Footer'
import { useEnterpriseData } from '@/hooks/useEnterpriseData'
import { usePageMeta } from '@/hooks/usePageMeta'

const EnterprisePage: FC = () => {
  const { t } = useTranslation()
  usePageMeta('enterprise')
  const enterpriseData = useEnterpriseData()

  // 企业版人数选择器
  const [selectedUserRange, setSelectedUserRange] = useState('1-50')

  // 企业版价格配置
  const enterprisePricing = {
    '1-50': { range: '1 - 50', price: '50,000' },
    '51-200': { range: '51 - 200', price: '100,000' },
    '201-1000': { range: '201 - 1,000', price: '200,000' },
    '1000+': { range: '1,000+', price: '350,000' }
  }

  const getCurrentPrice = () => {
    const pricing = enterprisePricing[selectedUserRange as keyof typeof enterprisePricing]
    return pricing ? pricing.price : '50,000'
  }

  return (
    <div className="enterprise-page">
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        <BackgroundBeams className="absolute inset-0 z-0" />
        <div className="relative z-10 container">
          <div className="hero-content">
            <h1 className="text-4xl font-semibold text-gray-900">{t('enterprise_page.hero.title')}</h1>
            <p className="subtitle">{t('enterprise_page.hero.subtitle')}</p>
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
          <div className="comparison-grid">
            {/* Community Edition */}
            <div className="comparison-card community">
              <div className="card-header">
                <h3>{t('enterprise_page.comparison.table.community')}</h3>
                <div className="pricing">
                  <div className="plan-title">{t('enterprise_page.comparison.table.pricing_community_title')}</div>
                  <div className="plan-price">{t('enterprise_page.comparison.table.pricing_community_price')}</div>
                </div>
              </div>
              <div className="card-body">
                <div className="feature-group">
                  <h4>{t('enterprise_page.comparison.table.license_and_cost')}</h4>
                  <ul>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.annual_service_fee')}</span>
                      <span className="feature-value disabled">-</span>
                    </li>
                  </ul>
                </div>
                <div className="feature-group">
                  <h4>{t('enterprise_page.comparison.table.deployment_and_support')}</h4>
                  <ul>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.deployment_method')}</span>
                      <span className="feature-value">{t('enterprise_page.comparison.table.deployment_single')}</span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.tech_support')}</span>
                      <span className="feature-value">{t('enterprise_page.comparison.table.support_community')}</span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.system_support')}</span>
                      <span className="feature-value">{t('enterprise_page.comparison.table.system_community')}</span>
                    </li>
                  </ul>
                </div>
                <div className="feature-group">
                  <h4>{t('enterprise_page.comparison.table.core_features')}</h4>
                  <ul>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.basic_features')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.provider_management')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.model_management')}</span>
                      <span className="feature-value disabled">-</span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.employee_management')}</span>
                      <span className="feature-value disabled">-</span>
                    </li>
                    <li>
                      <span className="feature-label">
                        {t('enterprise_page.comparison.table.shared_knowledge_base')}
                      </span>
                      <span className="feature-value disabled">-</span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.permission_control')}</span>
                      <span className="feature-value disabled">-</span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.data_backup')}</span>
                      <span className="feature-value disabled">-</span>
                    </li>
                    <li>
                      <span className="feature-label">
                        {t('enterprise_page.comparison.table.assistant_management')}
                      </span>
                      <span className="feature-value disabled">-</span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.agent_management')}</span>
                      <span className="feature-value disabled">-</span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.mcp_management')}</span>
                      <span className="feature-value disabled">-</span>
                    </li>
                    <li>
                      <span className="feature-label">
                        {t('enterprise_page.comparison.table.miniprogram_management')}
                      </span>
                      <span className="feature-value disabled">-</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Enterprise Startup Edition */}
            <div className="comparison-card startup">
              <div className="card-header">
                <h3>{t('enterprise_page.comparison.table.enterprise_startup')}</h3>
                <div className="pricing">
                  <div className="plan-title">{t('enterprise_page.comparison.table.pricing_startup_title')}</div>
                  <div className="plan-price">{t('enterprise_page.comparison.table.pricing_startup_price')}</div>
                </div>
              </div>
              <div className="card-body">
                <div className="feature-group">
                  <h4>{t('enterprise_page.comparison.table.license_and_cost')}</h4>
                  <ul>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.annual_service_fee')}</span>
                      <span className="feature-value">{t('enterprise_page.comparison.table.annual_fee_rate')}</span>
                    </li>
                  </ul>
                </div>
                <div className="feature-group">
                  <h4>{t('enterprise_page.comparison.table.deployment_and_support')}</h4>
                  <ul>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.deployment_method')}</span>
                      <span className="feature-value check">
                        <Check size={16} /> {t('enterprise_page.comparison.table.deployment_private')}
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.tech_support')}</span>
                      <span className="feature-value check">
                        <Check size={16} /> {t('enterprise_page.comparison.table.support_dedicated')}
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.system_support')}</span>
                      <span className="feature-value">{t('enterprise_page.comparison.table.system_enterprise')}</span>
                    </li>
                  </ul>
                </div>
                <div className="feature-group">
                  <h4>{t('enterprise_page.comparison.table.core_features')}</h4>
                  <ul>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.basic_features')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.provider_management')}</span>
                      <span className="feature-value">
                        {t('enterprise_page.comparison.table.provider_management_builtin')}
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.model_management')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.employee_management')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">
                        {t('enterprise_page.comparison.table.shared_knowledge_base')}
                      </span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.permission_control')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.data_backup')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">
                        {t('enterprise_page.comparison.table.assistant_management')}
                      </span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.agent_management')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.mcp_management')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">
                        {t('enterprise_page.comparison.table.miniprogram_management')}
                      </span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Enterprise Edition */}
            <div className="comparison-card enterprise">
              <div className="card-header">
                <h3>{t('enterprise_page.comparison.table.enterprise')}</h3>
                <div className="pricing">
                  <div className="m-auto mt-[-5px] w-50">
                    <Select value={selectedUserRange} onValueChange={setSelectedUserRange}>
                      <SelectTrigger className="user-range-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-50">1 - 50 {t('enterprise_page.comparison.table.people')}</SelectItem>
                        <SelectItem value="51-200">51 - 200 {t('enterprise_page.comparison.table.people')}</SelectItem>
                        <SelectItem value="201-1000">
                          201 - 1,000 {t('enterprise_page.comparison.table.people')}
                        </SelectItem>
                        <SelectItem value="1000+">1,000+ {t('enterprise_page.comparison.table.people')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="plan-price">¥ {getCurrentPrice()}</div>
                </div>
              </div>
              <div className="card-body">
                <div className="feature-group">
                  <h4>{t('enterprise_page.comparison.table.license_and_cost')}</h4>
                  <ul>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.annual_service_fee')}</span>
                      <span className="feature-value">{t('enterprise_page.comparison.table.annual_fee_rate')}</span>
                    </li>
                  </ul>
                </div>
                <div className="feature-group">
                  <h4>{t('enterprise_page.comparison.table.deployment_and_support')}</h4>
                  <ul>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.deployment_method')}</span>
                      <span className="feature-value check">
                        <Check size={16} /> {t('enterprise_page.comparison.table.deployment_private')}
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.tech_support')}</span>
                      <span className="feature-value check">
                        <Check size={16} /> {t('enterprise_page.comparison.table.support_dedicated')}
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.system_support')}</span>
                      <span className="feature-value">{t('enterprise_page.comparison.table.system_enterprise')}</span>
                    </li>
                  </ul>
                </div>
                <div className="feature-group">
                  <h4>{t('enterprise_page.comparison.table.core_features')}</h4>
                  <ul>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.basic_features')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.provider_management')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.model_management')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.employee_management')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">
                        {t('enterprise_page.comparison.table.shared_knowledge_base')}
                      </span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.permission_control')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.data_backup')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">
                        {t('enterprise_page.comparison.table.assistant_management')}
                      </span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.agent_management')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">{t('enterprise_page.comparison.table.mcp_management')}</span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                    <li>
                      <span className="feature-label">
                        {t('enterprise_page.comparison.table.miniprogram_management')}
                      </span>
                      <span className="feature-value check">
                        <Check size={16} />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Express Edition Highlight */}
      <section className="express-highlight-section">
        <div className="container">
          <div className="express-highlight-wrapper">
            {/* Left Side - Main Info */}
            <div className="express-main-content">
              <div className="express-badge">
                <Sparkles className="h-4 w-4" />
                <span>{t('enterprise_page.express.badge')}</span>
              </div>

              <h2 className="express-title">{t('enterprise_page.express.title')}</h2>
              <p className="express-subtitle">{t('enterprise_page.express.subtitle')}</p>

              <div className="express-feature-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="highlight-text">
                    <span className="highlight-label">{t('enterprise_page.express.features.unlimited_users')}</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="highlight-text">
                    <span className="highlight-label">{t('enterprise_page.express.features.builtin_provider')}</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="highlight-text">
                    <span className="highlight-label">{t('enterprise_page.express.features.quick_deployment')}</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="highlight-text">
                    <span className="highlight-label">{t('enterprise_page.express.features.one_time_payment')}</span>
                  </div>
                </div>
              </div>

              <div className="express-cta-wrapper">
                <a href="mailto:bd@cherry-ai.com" className="express-cta-button">
                  {t('enterprise_page.express.cta_button')}
                </a>
                <p className="express-cta-note">{t('enterprise_page.express.cta_note')}</p>
              </div>
            </div>

            {/* Right Side - Pricing Card */}
            <div className="express-pricing-card">
              <div className="pricing-card-inner">
                <div className="pricing-header">
                  <span className="pricing-label">{t('enterprise_page.express.price_label')}</span>
                  <div className="pricing-amount">
                    <span className="pricing-currency">¥</span>
                    <span className="pricing-value">5,000</span>
                  </div>
                  <span className="pricing-period">{t('enterprise_page.express.period')}</span>
                </div>

                <div className="pricing-divider" />

                <div className="pricing-benefits">
                  <div className="pricing-benefit-item">
                    <div className="benefit-icon-wrapper">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div className="benefit-content">
                      <h4 className="benefit-title">{t('enterprise_page.express.benefits.fast_start.title')}</h4>
                      <p className="benefit-description">
                        {t('enterprise_page.express.benefits.fast_start.description')}
                      </p>
                    </div>
                  </div>

                  <div className="pricing-benefit-item">
                    <div className="benefit-icon-wrapper">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div className="benefit-content">
                      <h4 className="benefit-title">{t('enterprise_page.express.benefits.cost_effective.title')}</h4>
                      <p className="benefit-description">
                        {t('enterprise_page.express.benefits.cost_effective.description')}
                      </p>
                    </div>
                  </div>

                  <div className="pricing-benefit-item">
                    <div className="benefit-icon-wrapper">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div className="benefit-content">
                      <h4 className="benefit-title">{t('enterprise_page.express.benefits.enterprise_grade.title')}</h4>
                      <p className="benefit-description">
                        {t('enterprise_page.express.benefits.enterprise_grade.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
                <ul className="server-info">
                  <li>{t('enterprise_page.beta.download.server_url')} https://api.demo.cherry-ai.com</li>
                  <li>
                    <strong>{t('enterprise_page.beta.demo.account')}</strong>user
                  </li>
                  <li>
                    <strong>{t('enterprise_page.beta.demo.password')}</strong>password
                  </li>
                </ul>
                <Link to="/enterprise/download" className="download-page-link">
                  <Download size={18} />
                  {t('enterprise_page.beta.download.download_button')}
                </Link>
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
            <p className="email">bd@cherry-ai.com</p>
            {enterpriseData?.data?.contact_qrcode && (
              <div className="contact-qrcode">
                <img src={enterpriseData.data.contact_qrcode} alt="Contact QR Code" />
                <p className="qrcode-hint">{t('enterprise_page.support.scan_qrcode')}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default EnterprisePage
