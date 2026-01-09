import {
  BookOpen,
  Building2,
  Check,
  Cog,
  Download,
  ExternalLink,
  FileText,
  KeyRound,
  Layers,
  PlayCircle,
  RefreshCw,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap
} from 'lucide-react'
import { type FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Particles } from '@/components/ui/shadcn-io/particles'
import Footer from '@/components/website/Footer'
import { useEnterpriseData } from '@/hooks/useEnterpriseData'
import { useEnterpriseVersionData } from '@/hooks/useEnterpriseVersionData'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useTheme } from '@/hooks/useTheme'
import { detectPlatform, isMobileDevice } from '@/utils/systemDetection'
import EnterpriseFAQ from './components/EnterpriseFAQ'
import EnterprisePlatformDownloads from './components/EnterprisePlatformDownloads'
import type { Platform } from './components/EnterprisePlatformTabs'
import EnterprisePlatformTabs from './components/EnterprisePlatformTabs'

const EnterprisePage: FC = () => {
  const { t } = useTranslation()
  usePageMeta('enterprise')
  const { isDark } = useTheme()
  const enterpriseData = useEnterpriseData()
  const { loading, error, versionData } = useEnterpriseVersionData()

  const [selectedUserRange, setSelectedUserRange] = useState('1-50')
  const [activePlatform, setActivePlatform] = useState<Platform>('windows')
  const [detectedPlatform, setDetectedPlatform] = useState<Platform | null>(null)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const isMobile = isMobileDevice()

  useEffect(() => {
    const detected = detectPlatform()
    if (detected) {
      setDetectedPlatform(detected)
      setActivePlatform(detected)
    }
  }, [])

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
    {
      icon: KeyRound,
      titleKey: 'model_management',
      descKey: 'model_management',
      color: 'text-blue-500 bg-blue-500/10'
    },
    {
      icon: BookOpen,
      titleKey: 'knowledge_base',
      descKey: 'knowledge_base',
      color: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      icon: Users,
      titleKey: 'permission_control',
      descKey: 'permission_control',
      color: 'text-violet-500 bg-violet-500/10'
    },
    {
      icon: Building2,
      titleKey: 'private_deployment',
      descKey: 'private_deployment',
      color: 'text-orange-500 bg-orange-500/10'
    },
    {
      icon: RefreshCw,
      titleKey: 'backend_service',
      descKey: 'backend_service',
      color: 'text-cyan-500 bg-cyan-500/10'
    },
    {
      icon: ShieldCheck,
      titleKey: 'security_compliance',
      descKey: 'security_compliance',
      color: 'text-rose-500 bg-rose-500/10'
    }
  ]

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white px-6 pb-20 pt-24 dark:bg-black sm:pt-32 lg:pt-40">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
        {/* Particles */}
        <Particles className="absolute inset-0" quantity={60} color={isDark ? '#ffffff' : '#000000'} size={0.4} staticity={40} />
        {/* Subtle center glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-[1400px] text-center">
          <h1 className="mb-6 text-4xl font-bold text-black dark:text-white sm:text-5xl">{t('enterprise_page.hero.title')}</h1>
          <p className="mb-8 text-lg text-neutral-500 dark:text-neutral-400 sm:text-xl">{t('enterprise_page.hero.subtitle')}</p>
          <Button
            asChild
            size="lg"
            className="cursor-pointer gap-2 bg-black font-semibold text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90">
            <a href="#download">
              <PlayCircle className="h-5 w-5" />
              {t('enterprise_page.hero.quick_start')}
            </a>
          </Button>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="bg-card px-6 py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
              {t('enterprise_page.features.title')}
            </h2>
            <p className="text-muted-foreground mx-auto max-w-xl text-lg">{t('enterprise_page.features.subtitle')}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, titleKey, descKey, color }) => (
              <div
                key={titleKey}
                className="group border-border bg-card rounded-xl border p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
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
        <div className="mx-auto max-w-[1400px]">
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
                        <span className="text-blue-500">
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
                    <span className="flex items-center gap-1 text-blue-500">
                      <Check className="h-4 w-4" /> {t('enterprise_page.comparison.table.deployment_private')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t('enterprise_page.comparison.table.tech_support')}</span>
                    <span className="flex items-center gap-1 text-blue-500">
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
                        <span className="text-blue-500">
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
            <div className="bg-card flex flex-col overflow-hidden rounded-xl border border-blue-500/30 shadow-sm transition-all hover:shadow-md">
              <div className="flex min-h-[200px] flex-col justify-start bg-gradient-to-b from-blue-500/10 to-transparent p-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-blue-500">
                  {t('enterprise_page.comparison.table.enterprise')}
                </h3>
                <div className="mt-3 flex flex-1 flex-col items-center gap-3">
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
                    <span className="flex items-center gap-1 text-blue-500">
                      <Check className="h-4 w-4" /> {t('enterprise_page.comparison.table.deployment_private')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t('enterprise_page.comparison.table.tech_support')}</span>
                    <span className="flex items-center gap-1 text-blue-500">
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
                      <span className="text-blue-500">
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
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-orange-500/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="mx-auto max-w-[1400px]">
          <div className="relative z-10 grid items-stretch gap-8 lg:grid-cols-[420px_1fr] lg:gap-16">
            {/* Left Side - Pricing Card */}
            <div className="flex">
              <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500 to-orange-600 p-8 shadow-xl">
                <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" />
                  {t('enterprise_page.express.badge')}
                </span>

                <div className="mb-6">
                  <span className="mb-2 block text-sm font-medium text-white/80">
                    {t('enterprise_page.express.price_label')}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-normal text-white/90">¥</span>
                    <span className="text-6xl font-bold tracking-tight text-white">5,000</span>
                  </div>
                  <span className="mt-2 block text-sm font-medium text-white/70">
                    {t('enterprise_page.express.period')}
                  </span>
                </div>

                <div className="mb-6 h-px bg-white/20" />

                <div className="mb-6 flex-1 space-y-3">
                  {['unlimited_users', 'builtin_provider', 'quick_deployment', 'one_time_payment'].map((key) => (
                    <div key={key} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {t(`enterprise_page.express.features.${key}`)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button
                    size="lg"
                    onClick={() => setShowContactModal(true)}
                    className="w-full cursor-pointer border-0 bg-white font-semibold text-orange-600 shadow-lg hover:bg-white/90">
                    {t('enterprise_page.express.cta_button')}
                  </Button>
                  <p className="mt-3 text-center text-xs text-white/60">{t('enterprise_page.express.cta_note')}</p>
                </div>
              </div>
            </div>

            {/* Right Side - Features & Benefits */}
            <div className="flex flex-col">
              <div className="mb-6">
                <h2 className="text-foreground mb-3 text-3xl font-bold tracking-tight">
                  {t('enterprise_page.express.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{t('enterprise_page.express.subtitle')}</p>
              </div>

              {/* Core Value Points - 4 cards */}
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                {[
                  { icon: Zap, key: 'save_money', color: 'text-green-500 bg-green-500/10' },
                  { icon: RefreshCw, key: 'save_effort', color: 'text-blue-500 bg-blue-500/10' },
                  { icon: ShieldCheck, key: 'peace_of_mind', color: 'text-orange-500 bg-orange-500/10' },
                  { icon: Building2, key: 'security', color: 'text-violet-500 bg-violet-500/10' }
                ].map(({ icon: Icon, key, color }) => (
                  <div key={key} className="border-border bg-card flex flex-col rounded-xl border p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="text-foreground text-lg font-semibold">
                        {t(`enterprise_page.express.values.${key}.title`)}
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`enterprise_page.express.values.${key}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Standard Edition */}
      <section className="border-border bg-card border-t px-6 py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative z-10 grid items-stretch gap-8 lg:grid-cols-[420px_1fr] lg:gap-16">
            {/* Left Side - Pricing Card */}
            <div className="flex">
              <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500 to-blue-600 p-8 shadow-xl">
                <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  <Building2 className="h-4 w-4" />
                  {t('enterprise_page.standard.badge')}
                </span>

                <div className="mb-6">
                  <span className="mb-2 block text-sm font-medium text-white/80">
                    {t('enterprise_page.standard.price_label')}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold tracking-tight text-white">
                      {t('enterprise_page.standard.price_range')}
                    </span>
                  </div>
                  <span className="mt-2 block text-sm font-medium text-white/70">
                    {t('enterprise_page.standard.period')}
                  </span>
                </div>

                <div className="mb-6 h-px bg-white/20" />

                <div className="mb-6 flex-1 space-y-3">
                  {['custom_models', 'full_isolation', 'sso_integration', 'dedicated_support'].map((key) => (
                    <div key={key} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {t(`enterprise_page.standard.features.${key}`)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button
                    size="lg"
                    onClick={() => setShowContactModal(true)}
                    className="w-full cursor-pointer border-0 bg-white font-semibold text-blue-600 shadow-lg hover:bg-white/90">
                    {t('enterprise_page.standard.cta_button')}
                  </Button>
                  <p className="mt-3 text-center text-xs text-white/60">{t('enterprise_page.standard.cta_note')}</p>
                </div>
              </div>
            </div>

            {/* Right Side - Features & Benefits */}
            <div className="flex flex-col">
              <div className="mb-6">
                <h2 className="text-foreground mb-3 text-3xl font-bold tracking-tight">
                  {t('enterprise_page.standard.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{t('enterprise_page.standard.subtitle')}</p>
              </div>

              {/* Core Value Points - 4 cards */}
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                {[
                  { icon: Cog, key: 'flexibility', color: 'text-orange-500 bg-orange-500/10' },
                  { icon: Scale, key: 'compliance', color: 'text-blue-500 bg-blue-500/10' },
                  { icon: Layers, key: 'scalability', color: 'text-green-500 bg-green-500/10' },
                  { icon: KeyRound, key: 'integration', color: 'text-violet-500 bg-violet-500/10' }
                ].map(({ icon: Icon, key, color }) => (
                  <div key={key} className="border-border bg-secondary/30 flex flex-col rounded-xl border p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="text-foreground text-lg font-semibold">
                        {t(`enterprise_page.standard.values.${key}.title`)}
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`enterprise_page.standard.values.${key}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section - 3 Steps */}
      <section id="download" className="border-border bg-secondary/30 border-t px-6 py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
              {t('enterprise_page.beta.section_title')}
            </h2>
            <p className="text-muted-foreground text-lg">{t('enterprise_page.beta.section_subtitle')}</p>
          </div>

          {/* 3 Steps */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Step 1: Experience Admin System */}
            <div className="border-border bg-card relative flex flex-col rounded-2xl border p-8 shadow-sm">
              <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                1
              </div>
              <h3 className="text-foreground mb-3 mt-2 text-xl font-semibold">
                {t('enterprise_page.beta.step1.title')}
              </h3>
              <p className="text-muted-foreground mb-6 text-sm">{t('enterprise_page.beta.step1.description')}</p>

              <div className="bg-secondary/50 mb-6 flex-1 space-y-3 rounded-xl p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('enterprise_page.beta.step1.admin_portal')}</span>
                  <span className="text-foreground font-mono text-xs">admin.demo.cherry-ai.com</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('enterprise_page.beta.step1.account')}</span>
                  <span className="text-foreground font-mono">admin</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('enterprise_page.beta.step1.password')}</span>
                  <span className="text-foreground font-mono">password</span>
                </div>
              </div>

              <Button asChild className="mt-auto w-full gap-2">
                <a href="https://admin.demo.cherry-ai.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  {t('enterprise_page.beta.step1.open_admin')}
                </a>
              </Button>
            </div>

            {/* Step 2: Download and Use Client */}
            <div className="border-border bg-card relative flex flex-col rounded-2xl border p-8 shadow-sm">
              <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                2
              </div>
              <h3 className="text-foreground mb-3 mt-2 text-xl font-semibold">
                {t('enterprise_page.beta.step2.title')}
              </h3>
              <p className="text-muted-foreground mb-6 text-sm">{t('enterprise_page.beta.step2.description')}</p>

              <div className="bg-secondary/50 mb-6 flex-1 space-y-3 rounded-xl p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('enterprise_page.beta.step2.server_url')}</span>
                  <span className="text-foreground font-mono text-xs">https://api.demo.cherry-ai.com</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('enterprise_page.beta.step2.account')}</span>
                  <span className="text-foreground font-mono">user</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('enterprise_page.beta.step2.password')}</span>
                  <span className="text-foreground font-mono">password</span>
                </div>
              </div>

              <Button
                className="mt-auto w-full gap-2"
                onClick={() => setShowDownloadModal(true)}
                disabled={loading || !!error || isMobile}>
                <Download className="h-4 w-4" />
                {t('enterprise_page.beta.download.download_button')}
              </Button>
              {isMobile && (
                <p className="text-muted-foreground mt-2 text-center text-xs">{t('download_page.mobile_detected')}</p>
              )}
            </div>

            {/* Step 3: View User Manual */}
            <div className="border-border bg-card relative flex flex-col rounded-2xl border p-8 shadow-sm">
              <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                3
              </div>
              <h3 className="text-foreground mb-3 mt-2 text-xl font-semibold">
                {t('enterprise_page.beta.step3.title')}
              </h3>
              <p className="text-muted-foreground mb-6 flex-1 text-sm">{t('enterprise_page.beta.step3.description')}</p>

              <Button variant="outline" asChild className="mt-auto w-full gap-2">
                <a href="https://docs.enterprise.cherry-ai.com/" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4" />
                  {t('enterprise_page.beta.step3.view_manual')}
                </a>
              </Button>
            </div>
          </div>

          {/* Version Info */}
          {versionData && (
            <p className="text-muted-foreground mt-8 text-center text-sm">
              {t('download_page.version')}: {versionData.version} · {t('download_page.published_at_label')}
              {versionData.publishedAt}
            </p>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <EnterpriseFAQ />

      {/* Support Section */}
      <section className="border-border bg-card border-t px-6 py-24 text-center">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">{t('enterprise_page.support.title')}</h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
            {t('enterprise_page.support.description')}
          </p>
          <div className="flex flex-col items-center gap-6">
            <p className="text-2xl font-medium text-blue-500">bd@cherry-ai.com</p>
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

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDownloadModal(false)} />
          {/* Modal Content */}
          <div className="bg-card border-border relative z-10 mx-4 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border p-6 shadow-2xl sm:p-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowDownloadModal(false)}
              className="text-muted-foreground hover:text-foreground absolute right-4 top-4 cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <h3 className="text-foreground text-xl font-semibold">{t('enterprise_page.beta.step2.title')}</h3>
              {versionData && (
                <p className="text-muted-foreground mt-1 text-sm">
                  {t('download_page.version')}: {versionData.version}
                </p>
              )}
            </div>

            {/* Platform Tabs & Downloads */}
            <EnterprisePlatformTabs
              activePlatform={activePlatform}
              detectedPlatform={detectedPlatform}
              onPlatformChange={setActivePlatform}
              variant="light"
            />
            <EnterprisePlatformDownloads
              platform={activePlatform}
              version={versionData?.version || ''}
              variant="light"
            />
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowContactModal(false)} />
          {/* Modal Content */}
          <div className="bg-card border-border relative z-10 mx-4 w-full max-w-md overflow-hidden rounded-2xl border p-6 shadow-2xl sm:p-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowContactModal(false)}
              className="text-muted-foreground hover:text-foreground absolute right-4 top-4 cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 text-center">
              <h3 className="text-foreground text-xl font-semibold">{t('enterprise_page.support.title')}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{t('enterprise_page.support.description')}</p>
            </div>

            {/* Email */}
            <div className="mb-6 text-center">
              <p className="text-muted-foreground mb-2 text-sm">{t('enterprise_page.support.business_cooperation')}</p>
              <a
                href="mailto:bd@cherry-ai.com"
                className="inline-flex items-center gap-2 text-xl font-semibold text-blue-500 transition-colors hover:text-blue-600">
                bd@cherry-ai.com
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* QR Code */}
            {enterpriseData?.data?.contact_qrcode && (
              <div className="flex flex-col items-center gap-4">
                <div className="bg-secondary/50 h-px w-full" />
                <p className="text-muted-foreground text-sm">{t('enterprise_page.support.scan_qrcode')}</p>
                <img
                  src={enterpriseData.data.contact_qrcode}
                  alt="Contact QR Code"
                  className="border-border h-48 w-48 rounded-xl border bg-white p-2 shadow-md"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default EnterprisePage
