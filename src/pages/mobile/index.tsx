import { ArrowRight, Download, Files, ImagePlus, Monitor, Plug, Sparkles, Terminal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import fileLibraryEn from '@/assets/images/screenshots/mobile/en/file-library.webp'
import htmlPreviewEn from '@/assets/images/screenshots/mobile/en/html-preview.webp'
import ipadConversationEn from '@/assets/images/screenshots/mobile/en/ipad-conversation.webp'
import ipadImagePreviewEn from '@/assets/images/screenshots/mobile/en/ipad-image-preview.webp'
import fileLibraryZh from '@/assets/images/screenshots/mobile/zh/file-library.webp'
import htmlPreviewZh from '@/assets/images/screenshots/mobile/zh/html-preview.webp'
import ipadConversationZh from '@/assets/images/screenshots/mobile/zh/ipad-conversation.webp'
import ipadImagePreviewZh from '@/assets/images/screenshots/mobile/zh/ipad-image-preview.webp'
import LogoDrawDemo from '@/components/demos/mobile/LogoDrawDemo'
import MobileComposerDemo from '@/components/demos/mobile/MobileComposerDemo'
import DemoMount from '@/components/demos/primitives/DemoMount'
import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import SectionBackdrop from '@/components/website/SectionBackdrop'
import { usePageMeta } from '@/hooks/usePageMeta'
import { getMobileDocsUrl } from '@/utils/urls'

const screenshotsByLanguage = {
  zh: {
    files: fileLibraryZh,
    preview: htmlPreviewZh,
    tabletConversation: ipadConversationZh,
    tabletDrawing: ipadImagePreviewZh
  },
  en: {
    files: fileLibraryEn,
    preview: htmlPreviewEn,
    tabletConversation: ipadConversationEn,
    tabletDrawing: ipadImagePreviewEn
  }
}

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
  const screenshots = screenshotsByLanguage[(i18n.resolvedLanguage || i18n.language).startsWith('zh') ? 'zh' : 'en']
  usePageMeta('mobile')

  return (
    <div className="min-h-screen bg-background pt-[60px] text-foreground">
      <main>
        <section className="relative isolate overflow-hidden border-b border-border py-12 sm:py-20">
          <SectionBackdrop variant="grid-glow" />
          <div className="site-container site-split lg:items-center">
            <div className="max-w-xl">
              <LogoDrawDemo bare size={44} className="mb-6" />
              <p className="text-primary mb-4 font-mono text-xs tracking-widest uppercase">
                {t('mobile_site.hero.eyebrow')}
              </p>
              <h1 className="text-gradient text-4xl leading-[1.04] font-semibold tracking-[-0.045em] text-balance sm:text-6xl zh:tracking-normal">
                {t('mobile_site.hero.title')}
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                {t('mobile_site.hero.description')}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="rounded-full px-5">
                  <Link to="/download?platform=mobile">
                    <Download aria-hidden="true" />
                    {t('mobile_site.hero.download')}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-5">
                  <a href={mobileDocsUrl}>
                    {t('mobile_site.hero.docs')}
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <p className="mt-4 font-mono text-xs leading-6 text-muted-foreground">
                {t('mobile_site.hero.platforms')}
              </p>
            </div>

            <div className="relative flex justify-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/4 left-1/2 -z-10 size-80 -translate-x-1/2 rounded-full bg-primary/25 blur-[100px]"
              />
              <MobileComposerDemo />
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card py-12 sm:py-16">
          <div className="site-container">
            <div className="max-w-3xl">
              <p className="text-primary mb-4 text-sm font-semibold tracking-[0.16em] uppercase">
                {t('mobile_site.mobile_first.eyebrow')}
              </p>
              <h2 className="text-gradient text-3xl leading-tight font-semibold tracking-[-0.035em] text-balance sm:text-5xl zh:tracking-normal">
                {t('mobile_site.mobile_first.title')}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                {t('mobile_site.mobile_first.description')}
              </p>
            </div>
            <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map(({ key, icon: Icon }) => (
                <li key={key} className="glass-card min-w-0 rounded-2xl p-6">
                  <Icon aria-hidden="true" className="mb-5 h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">{t(`mobile_site.mobile_first.items.${key}.title`)}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {t(`mobile_site.mobile_first.items.${key}.description`)}
                  </p>
                </li>
              ))}
            </ul>
            <a
              href={mobileDocsUrl}
              className="mt-10 inline-flex items-center gap-2 rounded-sm text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current">
              {t('mobile_site.mobile_first.docs')}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="relative isolate overflow-hidden border-b border-border py-16 sm:py-24">
          <SectionBackdrop variant="beams" />
          <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="min-w-0">
              <p className="mb-4 font-mono text-xs tracking-widest text-primary uppercase">
                {t('mobile_site.picker.eyebrow')}
              </p>
              <h2 className="text-gradient text-3xl leading-tight font-semibold tracking-[-0.035em] text-balance sm:text-5xl zh:tracking-normal">
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
              <p className="mb-4 font-mono text-xs tracking-widest text-primary uppercase">
                {t('mobile_site.pairing.eyebrow')}
              </p>
              <h2 className="text-gradient text-3xl leading-tight font-semibold tracking-[-0.035em] text-balance sm:text-5xl zh:tracking-normal">
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
              <p className="text-primary mb-4 text-sm font-semibold tracking-[0.14em]">
                {t('mobile_site.workflows.eyebrow')}
              </p>
              <h2 className="text-gradient text-3xl leading-tight font-semibold tracking-[-0.035em] text-balance sm:text-5xl zh:tracking-normal">
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

            <div className="mx-auto grid w-full max-w-lg grid-cols-2 items-start gap-4 sm:gap-6">
              {[
                { key: 'files', src: screenshots.files },
                { key: 'preview', src: screenshots.preview }
              ].map(({ key, src }) => (
                <figure key={key} className="min-w-0">
                  <img
                    src={src}
                    alt={t(`mobile_site.screenshots.${key}`)}
                    width={1206}
                    height={2622}
                    loading="lazy"
                    className="block h-auto w-full rounded-2xl border border-border shadow-(--shadow-card)"
                  />
                  <figcaption className="mt-4 text-center text-sm leading-6 text-muted-foreground">
                    {t(`mobile_site.workflows.captions.${key}`)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card py-12 sm:py-16">
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-primary mb-4 text-sm font-semibold tracking-[0.16em] uppercase">
                {t('mobile_site.tablet.eyebrow')}
              </p>
              <h2 className="text-gradient text-3xl leading-tight font-semibold tracking-[-0.035em] text-balance sm:text-5xl zh:tracking-normal">
                {t('mobile_site.tablet.title')}
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{t('mobile_site.tablet.description')}</p>
            </div>
            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 items-start gap-3 rounded-lg border border-border bg-background p-3 sm:gap-6 sm:p-6">
              <img
                src={screenshots.tabletDrawing}
                alt={t('mobile_site.screenshots.tablet_drawing')}
                width={2064}
                height={2752}
                loading="lazy"
                className="block h-auto w-full rounded-2xl border border-border shadow-(--shadow-card)"
              />
              <img
                src={screenshots.tabletConversation}
                alt={t('mobile_site.screenshots.tablet_conversation')}
                width={2064}
                height={2752}
                loading="lazy"
                className="block h-auto w-full rounded-2xl border border-border shadow-(--shadow-card)"
              />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="site-container text-center">
            <p className="text-primary text-sm font-semibold tracking-[0.16em] uppercase">
              {t('mobile_site.cta.eyebrow')}
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-gradient text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl zh:tracking-normal">
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
