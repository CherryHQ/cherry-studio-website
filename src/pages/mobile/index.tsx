import { ArrowRight, Download, Files, ImagePlus, Monitor, Plug, Sparkles, Terminal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import LogoDrawDemo from '@/components/demos/mobile/LogoDrawDemo'
import MobileComposerDemo from '@/components/demos/mobile/MobileComposerDemo'
import DemoMount from '@/components/demos/primitives/DemoMount'
import { Button } from '@/components/ui/button'
import FeatureBento from '@/components/website/FeatureBento'
import Footer from '@/components/website/Footer'
import HeroBackdrop from '@/components/website/HeroBackdrop'
import { usePageMeta } from '@/hooks/usePageMeta'
import { getMobileDocsUrl } from '@/utils/urls'

const capabilities = [
  { key: 'skills', icon: Sparkles },
  { key: 'tools', icon: Plug },
  { key: 'files', icon: Files },
  { key: 'images', icon: ImagePlus },
  { key: 'desktop', icon: Monitor },
  { key: 'ssh', icon: Terminal }
] as const

export default function MobilePage() {
  const { t, i18n } = useTranslation()
  const mobileDocsUrl = getMobileDocsUrl(i18n.language)
  usePageMeta('mobile')

  return (
    <div className="min-h-screen bg-background pt-[60px] text-foreground">
      <main>
        <section className="relative isolate overflow-hidden border-b border-border py-12 sm:py-20">
          <HeroBackdrop className="inset-x-0 top-0 -z-10 h-full [mask-image:linear-gradient(to_bottom,#000_72%,transparent)]" />
          <div className="site-container site-split lg:items-center">
            <div className="max-w-xl">
              <LogoDrawDemo bare size={44} className="mb-6" />
              <p className="mb-4 on-silk text-sm font-medium text-muted-foreground">{t('mobile_site.hero.eyebrow')}</p>
              <h1 className="on-silk text-5xl leading-[1.04] font-display text-balance sm:text-7xl">
                {t('mobile_site.hero.title')}
              </h1>
              <p className="mt-5 on-silk max-w-lg text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                {t('mobile_site.hero.description')}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="rounded-full px-5">
                  <Link to="/download?platform=mobile">
                    <Download aria-hidden="true" />
                    {t('mobile_site.hero.download')}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white/40 bg-white/10 px-5 text-white backdrop-blur hover:bg-white/20 hover:text-white">
                  <a href={mobileDocsUrl}>
                    {t('mobile_site.hero.docs')}
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <p className="mt-4 on-silk text-sm leading-6 text-muted-foreground">{t('mobile_site.hero.platforms')}</p>
            </div>

            <div className="relative flex justify-center">
              <MobileComposerDemo />
            </div>
          </div>
        </section>

        <section className="border-b border-border py-12 sm:py-20">
          <div className="site-container">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium text-muted-foreground">{t('mobile_site.mobile_first.eyebrow')}</p>
              <h2 className="text-4xl leading-tight font-display text-balance sm:text-6xl">
                {t('mobile_site.mobile_first.title')}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                {t('mobile_site.mobile_first.description')}
              </p>
            </div>
            <FeatureBento
              className="mt-12"
              items={capabilities.map(({ key, icon }) => ({
                key,
                icon,
                title: t(`mobile_site.mobile_first.items.${key}.title`),
                description: t(`mobile_site.mobile_first.items.${key}.description`)
              }))}
            />
            <a
              href={mobileDocsUrl}
              className="mt-10 inline-flex items-center gap-2 rounded-sm text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current">
              {t('mobile_site.mobile_first.docs')}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="relative isolate overflow-hidden border-b border-border py-16 sm:py-24">
          <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="min-w-0">
              <p className="mb-4 text-sm font-medium text-muted-foreground">{t('mobile_site.picker.eyebrow')}</p>
              <h2 className="text-4xl leading-tight font-display text-balance sm:text-6xl">
                {t('mobile_site.picker.title')}
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">{t('mobile_site.picker.description')}</p>
            </div>
            <DemoMount
              load={() => import('@/components/demos/mobile/ModelPickerScrollerDemo')}
              className="flex min-h-[700px] justify-center"
            />
          </div>
        </section>

        <section className="relative isolate overflow-hidden border-b border-border py-16 sm:py-24">
          <div className="site-container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-4 text-sm font-medium text-muted-foreground">{t('mobile_site.pairing.eyebrow')}</p>
              <h2 className="text-4xl leading-tight font-display text-balance sm:text-6xl">
                {t('mobile_site.pairing.title')}
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">{t('mobile_site.pairing.description')}</p>
            </div>
            <DemoMount load={() => import('@/components/demos/mobile/PairingDemo')} className="min-h-[760px]" />
          </div>
        </section>

        <section className="border-b border-border py-12 sm:py-16">
          <div className="site-container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="min-w-0">
              <p className="mb-4 text-sm font-medium text-muted-foreground">{t('mobile_site.workflows.eyebrow')}</p>
              <h2 className="text-4xl leading-tight font-display text-balance sm:text-6xl">
                {t('mobile_site.workflows.title')}
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">{t('mobile_site.workflows.description')}</p>
              <ul className="mt-8 space-y-6">
                {(['accounts', 'steer', 'import'] as const).map((item) => (
                  <li key={item}>
                    <h3 className="font-semibold">{t(`mobile_site.workflows.items.${item}.title`)}</h3>
                    <p className="mt-2 leading-7 text-muted-foreground">
                      {t(`mobile_site.workflows.items.${item}.description`)}
                    </p>
                  </li>
                ))}
              </ul>
              <a
                href={mobileDocsUrl}
                className="mt-8 inline-flex items-center gap-2 rounded-sm text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current">
                {t('mobile_site.workflows.docs')}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>

            <DemoMount
              load={() => import('@/components/demos/mobile/MobileFilesDemo')}
              className="flex min-h-[720px] justify-center"
            />
          </div>
        </section>

        <section className="border-b border-border py-12 sm:py-20">
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-sm font-medium text-muted-foreground">{t('mobile_site.tablet.eyebrow')}</p>
              <h2 className="text-4xl leading-tight font-display text-balance sm:text-6xl">
                {t('mobile_site.tablet.title')}
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{t('mobile_site.tablet.description')}</p>
            </div>
            {/* The iPad canvas is unreadable on phones, so it only mounts from the md breakpoint. */}
            <DemoMount
              load={() => import('@/components/demos/mobile/TabletLayoutDemo')}
              className="mx-auto mt-10 hidden min-h-[680px] max-w-[900px] md:block"
            />
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="site-container text-center">
            <p className="text-sm font-medium text-muted-foreground">{t('mobile_site.cta.eyebrow')}</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-display text-balance sm:text-6xl">
              {t('mobile_site.cta.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              {t('mobile_site.cta.description')}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-5">
                <Link to="/download?platform=mobile">
                  <Download aria-hidden="true" />
                  {t('mobile_site.cta.download')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-5">
                <a href={mobileDocsUrl}>{t('mobile_site.cta.docs')}</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
