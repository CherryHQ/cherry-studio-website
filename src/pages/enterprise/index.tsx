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

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams'
import Footer from '@/components/website/Footer'
import { useEnterpriseData } from '@/hooks/useEnterpriseData'
import { usePageMeta } from '@/hooks/usePageMeta'

const EnterprisePage: FC = () => {
  const { t } = useTranslation()
  usePageMeta('enterprise')
  const enterpriseData = useEnterpriseData()

  const [selectedUserRange, setSelectedUserRange] = useState('1-50')

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

  const features = [
    { icon: KeyRound, titleKey: 'model_management', descKey: 'model_management' },
    { icon: BookOpen, titleKey: 'knowledge_base', descKey: 'knowledge_base' },
    { icon: Users, titleKey: 'permission_control', descKey: 'permission_control' },
    { icon: Building2, titleKey: 'private_deployment', descKey: 'private_deployment' },
    { icon: RefreshCw, titleKey: 'backend_service', descKey: 'backend_service' },
    { icon: ShieldCheck, titleKey: 'security_compliance', descKey: 'security_compliance' }
  ]

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0e27] to-[#1a1f3a] px-6 pt-24 pb-12">
        <BackgroundBeams className="absolute inset-0 z-0" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            {t('enterprise_page.hero.title')}
          </h1>
          <p className="text-lg text-white/80 sm:text-xl">{t('enterprise_page.hero.subtitle')}</p>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="bg-card px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
              {t('enterprise_page.features.title')}
            </h2>
            <p className="text-muted-foreground mx-auto max-w-xl text-lg">{t('enterprise_page.features.subtitle')}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, titleKey, descKey }) => (
              <div
                key={titleKey}
                className="group border-border bg-card rounded-xl border p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="bg-primary/10 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-4 text-xl font-semibold">
                  {t(`enterprise_page.features.${titleKey}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(`enterprise_page.features.${descKey}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Version Comparison */}
      <section className="border-border bg-secondary/30 border-t px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
              {t('enterprise_page.comparison.title')}
            </h2>
            <p className="text-muted-foreground mx-auto max-w-xl text-lg">{t('enterprise_page.comparison.subtitle')}</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Community Edition */}
            <div className="border-border bg-card flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md">
              <div className="flex min-h-[200px] flex-col justify-start bg-gradient-to-b from-green-500/10 to-transparent p-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-green-600">
                  {t('enterprise_page.comparison.table.community')}
                </h3>
                <div className="mt-3 flex flex-1 flex-col gap-3">
                  <span className="text-muted-foreground text-sm">
                    {t('enterprise_page.comparison.table.pricing_community_title')}
                  </span>
                  <span className="text-foreground mt-auto text-2xl font-bold">
                    {t('enterprise_page.comparison.table.pricing_community_price')}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-8 p-6">
                <div className="flex flex-col gap-4">
                  <h4 className="border-border text-foreground border-b pb-3 text-sm font-semibold">
                    {t('enterprise_page.comparison.table.license_and_cost')}
                  </h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t('enterprise_page.comparison.table.annual_service_fee')}
                    </span>
                    <span className="text-muted-foreground/50">-</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="border-border text-foreground border-b pb-3 text-sm font-semibold">
                    {t('enterprise_page.comparison.table.deployment_and_support')}
                  </h4>
                  {['deployment_method', 'tech_support', 'system_support'].map((key, idx) => (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t(`enterprise_page.comparison.table.${key}`)}</span>
                      <span className="text-foreground">
                        {t(
                          `enterprise_page.comparison.table.${['deployment_single', 'support_community', 'system_community'][idx]}`
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="border-border text-foreground border-b pb-3 text-sm font-semibold">
                    {t('enterprise_page.comparison.table.core_features')}
                  </h4>
                  {[
                    { key: 'basic_features', hasCheck: true },
                    { key: 'provider_management', hasCheck: true },
                    { key: 'model_management', hasCheck: false },
                    { key: 'employee_management', hasCheck: false },
                    { key: 'shared_knowledge_base', hasCheck: false },
                    { key: 'permission_control', hasCheck: false },
                    { key: 'data_backup', hasCheck: false },
                    { key: 'assistant_management', hasCheck: false },
                    { key: 'agent_management', hasCheck: false },
                    { key: 'mcp_management', hasCheck: false },
                    { key: 'miniprogram_management', hasCheck: false }
                  ].map(({ key, hasCheck }) => (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t(`enterprise_page.comparison.table.${key}`)}</span>
                      {hasCheck ? (
                        <span className="text-primary">
                          <Check className="h-4 w-4" />
                        </span>
                      ) : (
                        <span className="text-muted-foreground/50">-</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enterprise Startup Edition */}
            <div className="border-border bg-card flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md">
              <div className="flex min-h-[200px] flex-col justify-start bg-gradient-to-b from-orange-500/10 to-transparent p-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-orange-600">
                  {t('enterprise_page.comparison.table.enterprise_startup')}
                </h3>
                <div className="mt-3 flex flex-1 flex-col gap-3">
                  <span className="text-muted-foreground text-sm">
                    {t('enterprise_page.comparison.table.pricing_startup_title')}
                  </span>
                  <span className="text-foreground mt-auto text-2xl font-bold">
                    {t('enterprise_page.comparison.table.pricing_startup_price')}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-8 p-6">
                <div className="flex flex-col gap-4">
                  <h4 className="border-border text-foreground border-b pb-3 text-sm font-semibold">
                    {t('enterprise_page.comparison.table.license_and_cost')}
                  </h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t('enterprise_page.comparison.table.annual_service_fee')}
                    </span>
                    <span className="text-foreground">{t('enterprise_page.comparison.table.annual_fee_rate')}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="border-border text-foreground border-b pb-3 text-sm font-semibold">
                    {t('enterprise_page.comparison.table.deployment_and_support')}
                  </h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t('enterprise_page.comparison.table.deployment_method')}
                    </span>
                    <span className="text-primary flex items-center gap-1">
                      <Check className="h-4 w-4" /> {t('enterprise_page.comparison.table.deployment_private')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t('enterprise_page.comparison.table.tech_support')}</span>
                    <span className="text-primary flex items-center gap-1">
                      <Check className="h-4 w-4" /> {t('enterprise_page.comparison.table.support_dedicated')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t('enterprise_page.comparison.table.system_support')}
                    </span>
                    <span className="text-foreground">{t('enterprise_page.comparison.table.system_enterprise')}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="border-border text-foreground border-b pb-3 text-sm font-semibold">
                    {t('enterprise_page.comparison.table.core_features')}
                  </h4>
                  {[
                    { key: 'basic_features', hasCheck: true },
                    { key: 'provider_management', text: 'provider_management_builtin' },
                    { key: 'model_management', hasCheck: true },
                    { key: 'employee_management', hasCheck: true },
                    { key: 'shared_knowledge_base', hasCheck: true },
                    { key: 'permission_control', hasCheck: true },
                    { key: 'data_backup', hasCheck: true },
                    { key: 'assistant_management', hasCheck: true },
                    { key: 'agent_management', hasCheck: true },
                    { key: 'mcp_management', hasCheck: true },
                    { key: 'miniprogram_management', hasCheck: true }
                  ].map(({ key, hasCheck, text }) => (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t(`enterprise_page.comparison.table.${key}`)}</span>
                      {hasCheck ? (
                        <span className="text-primary">
                          <Check className="h-4 w-4" />
                        </span>
                      ) : text ? (
                        <span className="text-foreground">{t(`enterprise_page.comparison.table.${text}`)}</span>
                      ) : (
                        <span className="text-muted-foreground/50">-</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enterprise Edition */}
            <div className="border-primary/30 bg-card flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md">
              <div className="from-primary/10 flex min-h-[200px] flex-col justify-start bg-gradient-to-b to-transparent p-8 text-center">
                <h3 className="text-primary mb-2 text-2xl font-bold">
                  {t('enterprise_page.comparison.table.enterprise')}
                </h3>
                <div className="mt-3 flex flex-1 flex-col gap-3">
                  <div className="mx-auto w-40">
                    <Select value={selectedUserRange} onValueChange={setSelectedUserRange}>
                      <SelectTrigger className="border-border h-9 text-sm">
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
                  <span className="text-foreground mt-auto text-2xl font-bold">¥ {getCurrentPrice()}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-8 p-6">
                <div className="flex flex-col gap-4">
                  <h4 className="border-border text-foreground border-b pb-3 text-sm font-semibold">
                    {t('enterprise_page.comparison.table.license_and_cost')}
                  </h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t('enterprise_page.comparison.table.annual_service_fee')}
                    </span>
                    <span className="text-foreground">{t('enterprise_page.comparison.table.annual_fee_rate')}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="border-border text-foreground border-b pb-3 text-sm font-semibold">
                    {t('enterprise_page.comparison.table.deployment_and_support')}
                  </h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t('enterprise_page.comparison.table.deployment_method')}
                    </span>
                    <span className="text-primary flex items-center gap-1">
                      <Check className="h-4 w-4" /> {t('enterprise_page.comparison.table.deployment_private')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t('enterprise_page.comparison.table.tech_support')}</span>
                    <span className="text-primary flex items-center gap-1">
                      <Check className="h-4 w-4" /> {t('enterprise_page.comparison.table.support_dedicated')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t('enterprise_page.comparison.table.system_support')}
                    </span>
                    <span className="text-foreground">{t('enterprise_page.comparison.table.system_enterprise')}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="border-border text-foreground border-b pb-3 text-sm font-semibold">
                    {t('enterprise_page.comparison.table.core_features')}
                  </h4>
                  {[
                    'basic_features',
                    'provider_management',
                    'model_management',
                    'employee_management',
                    'shared_knowledge_base',
                    'permission_control',
                    'data_backup',
                    'assistant_management',
                    'agent_management',
                    'mcp_management',
                    'miniprogram_management'
                  ].map((key) => (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t(`enterprise_page.comparison.table.${key}`)}</span>
                      <span className="text-primary">
                        <Check className="h-4 w-4" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Express Edition Highlight */}
      <section className="border-border from-secondary/30 to-background relative overflow-hidden border-t bg-gradient-to-br px-6 py-24">
        <div className="bg-primary/5 absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl" />
        <div className="mx-auto max-w-6xl">
          <div className="relative z-10 grid items-start gap-16 lg:grid-cols-[1fr_480px]">
            {/* Left Side - Main Info */}
            <div className="flex flex-col gap-8 lg:pr-8">
              <span className="from-primary to-primary/80 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase shadow-lg">
                <Sparkles className="h-4 w-4" />
                {t('enterprise_page.express.badge')}
              </span>

              <h2 className="text-foreground text-4xl font-bold tracking-tight lg:text-5xl">
                {t('enterprise_page.express.title')}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{t('enterprise_page.express.subtitle')}</p>

              <div className="mt-2 grid gap-4 sm:grid-cols-2">
                {['unlimited_users', 'builtin_provider', 'quick_deployment', 'one_time_payment'].map((key) => (
                  <div
                    key={key}
                    className="border-border bg-card hover:border-primary flex items-start gap-3 rounded-lg border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="bg-primary/10 text-primary flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-foreground text-sm font-medium">
                      {t(`enterprise_page.express.features.${key}`)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <Button asChild size="lg" className="w-fit shadow-lg">
                  <a href="mailto:bd@cherry-ai.com">{t('enterprise_page.express.cta_button')}</a>
                </Button>
                <p className="text-muted-foreground text-sm">{t('enterprise_page.express.cta_note')}</p>
              </div>
            </div>

            {/* Right Side - Pricing Card */}
            <div className="lg:sticky lg:top-32">
              <div className="border-border bg-card rounded-2xl border p-10 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="pb-8 text-center">
                  <span className="text-muted-foreground mb-5 block text-xs font-semibold tracking-widest uppercase">
                    {t('enterprise_page.express.price_label')}
                  </span>
                  <div className="mb-3 flex items-baseline justify-center gap-1">
                    <span className="text-foreground text-3xl font-normal">¥</span>
                    <span className="text-primary text-7xl font-bold tracking-tight">5,000</span>
                  </div>
                  <span className="text-muted-foreground text-sm font-medium">
                    {t('enterprise_page.express.period')}
                  </span>
                </div>

                <div className="via-border mx-auto my-8 h-px bg-gradient-to-r from-transparent to-transparent" />

                <div className="flex flex-col gap-7">
                  {[
                    { icon: Zap, key: 'fast_start' },
                    { icon: Building2, key: 'cost_effective' },
                    { icon: ShieldCheck, key: 'enterprise_grade' }
                  ].map(({ icon: Icon, key }) => (
                    <div key={key} className="flex items-start gap-4">
                      <div className="from-primary/10 to-primary/5 text-primary flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br transition-transform hover:scale-105">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="pt-0.5">
                        <h4 className="text-foreground mb-2 font-semibold">
                          {t(`enterprise_page.express.benefits.${key}.title`)}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {t(`enterprise_page.express.benefits.${key}.description`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Notice Section */}
      <section className="border-border bg-secondary/30 border-t px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Demo Card */}
            <div className="border-border bg-card flex h-full flex-col rounded-xl border p-7 shadow-sm">
              <h3 className="text-foreground mb-5 flex items-center gap-2 text-base font-semibold">
                <span className="bg-primary h-4 w-1 rounded" />
                {t('enterprise_page.beta.demo.title')}
              </h3>
              <div className="text-muted-foreground flex flex-1 flex-col text-sm leading-relaxed">
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <strong className="text-foreground min-w-[80px] font-medium">
                      {t('enterprise_page.beta.demo.admin_portal')}
                    </strong>
                    <a
                      href="https://admin.demo.cherry-ai.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline">
                      admin.demo.cherry-ai.com
                    </a>
                  </li>
                  <li className="flex gap-2">
                    <strong className="text-foreground min-w-[80px] font-medium">
                      {t('enterprise_page.beta.demo.account')}
                    </strong>
                    admin
                  </li>
                  <li className="flex gap-2">
                    <strong className="text-foreground min-w-[80px] font-medium">
                      {t('enterprise_page.beta.demo.password')}
                    </strong>
                    password
                  </li>
                </ul>
              </div>
            </div>

            {/* Download Card */}
            <div className="border-border bg-card flex h-full flex-col rounded-xl border p-7 shadow-sm">
              <h3 className="text-foreground mb-5 flex items-center gap-2 text-base font-semibold">
                <span className="bg-primary h-4 w-1 rounded" />
                {t('enterprise_page.beta.download.title')}
              </h3>
              <div className="text-muted-foreground flex flex-1 flex-col text-sm leading-relaxed">
                <ul className="space-y-3">
                  <li className="flex flex-wrap gap-2">
                    {t('enterprise_page.beta.download.server_url')} https://api.demo.cherry-ai.com
                  </li>
                  <li className="flex gap-2">
                    <strong className="text-foreground min-w-[80px] font-medium">
                      {t('enterprise_page.beta.demo.account')}
                    </strong>
                    user
                  </li>
                  <li className="flex gap-2">
                    <strong className="text-foreground min-w-[80px] font-medium">
                      {t('enterprise_page.beta.demo.password')}
                    </strong>
                    password
                  </li>
                </ul>
                <Button asChild className="mt-4 w-full">
                  <Link to="/enterprise/download" className="gap-2">
                    <Download className="h-4 w-4" />
                    {t('enterprise_page.beta.download.download_button')}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Manual Card */}
            <div className="border-border bg-card flex h-full flex-col rounded-xl border p-7 shadow-sm">
              <h3 className="text-foreground mb-5 flex items-center gap-2 text-base font-semibold">
                <span className="bg-primary h-4 w-1 rounded" />
                {t('enterprise_page.beta.manual.title')}
              </h3>
              <div className="text-muted-foreground flex flex-1 flex-col text-sm leading-relaxed">
                <p className="mb-4">{t('enterprise_page.beta.manual.description')}</p>
                <Button variant="outline" asChild className="mt-auto w-full">
                  <a
                    href="https://docs.enterprise.cherry-ai.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2">
                    <FileText className="h-4 w-4" />
                    {t('enterprise_page.beta.manual.view_manual')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="border-border bg-card border-t px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">{t('enterprise_page.support.title')}</h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
            {t('enterprise_page.support.description')}
          </p>
          <div className="flex flex-col items-center gap-6">
            <p className="text-primary text-2xl font-medium">bd@cherry-ai.com</p>
            {enterpriseData?.data?.contact_qrcode && (
              <div className="mt-4 flex flex-col items-center gap-5">
                <img
                  src={enterpriseData.data.contact_qrcode}
                  alt="Contact QR Code"
                  className="border-border h-56 w-56 rounded-2xl border bg-white p-2 shadow-lg transition-transform hover:scale-105"
                />
                <p className="text-foreground font-medium">{t('enterprise_page.support.scan_qrcode')}</p>
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
