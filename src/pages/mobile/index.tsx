import { ArrowRight, Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import ipadConversation from '@/assets/images/screenshots/mobile/app-store/ipad-conversation.jpg'
import ipadImagePreview from '@/assets/images/screenshots/mobile/app-store/ipad-image-preview.jpg'
import iphoneAgent from '@/assets/images/screenshots/mobile/app-store/iphone-agent.jpg'
import iphoneConversation from '@/assets/images/screenshots/mobile/app-store/iphone-conversation.jpg'
import iphoneDrawing from '@/assets/images/screenshots/mobile/app-store/iphone-drawing.jpg'
import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'
import { getMobileDocsUrl } from '@/utils/urls'

export default function MobilePage() {
  const { t, i18n } = useTranslation()
  const mobileDocsUrl = getMobileDocsUrl(i18n.language)
  usePageMeta('mobile')

  return (
    <div className="min-h-screen bg-white pt-[72px] text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <main>
        <section className="overflow-hidden px-4 pt-14 pb-10 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8 lg:pt-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <p className="text-primary mb-5 text-sm font-semibold tracking-[0.14em] uppercase">
                {t('mobile_site.hero.eyebrow')}
              </p>
              <h1 className="text-4xl leading-[1.04] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">
                {t('mobile_site.hero.title')}
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-zinc-600 lg:mx-0 dark:text-zinc-300">
                {t('mobile_site.hero.description')}
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
                <Button asChild size="lg" className="rounded-full px-7 active:scale-95">
                  <Link to="/download?platform=mobile">
                    <Download aria-hidden="true" />
                    {t('mobile_site.hero.download')}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-7 active:scale-95">
                  <a href={mobileDocsUrl}>
                    {t('mobile_site.hero.docs')}
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <p className="mt-5 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                {t('mobile_site.hero.platforms')}
              </p>
            </div>

            <div
              role="group"
              aria-label={t('mobile_site.screenshots.group_alt')}
              className="relative mx-auto h-[450px] w-full max-w-[690px] sm:h-[620px]">
              <div className="bg-primary/10 absolute top-1/2 left-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl sm:h-[480px] sm:w-[480px]" />
              <img
                src={iphoneAgent}
                alt={t('mobile_site.screenshots.agent')}
                width={1320}
                height={2868}
                loading="eager"
                className="absolute top-14 left-[1%] w-[145px] -rotate-6 rounded-[1.65rem] shadow-[3px_5px_30px_rgba(0,0,0,0.22)] sm:left-[4%] sm:w-[205px] sm:rounded-[2.25rem]"
              />
              <img
                src={iphoneDrawing}
                alt={t('mobile_site.screenshots.drawing')}
                width={1320}
                height={2868}
                loading="eager"
                className="absolute top-14 right-[1%] w-[145px] rotate-6 rounded-[1.65rem] shadow-[3px_5px_30px_rgba(0,0,0,0.22)] sm:right-[4%] sm:w-[205px] sm:rounded-[2.25rem]"
              />
              <img
                src={iphoneConversation}
                alt={t('mobile_site.screenshots.conversation')}
                width={1320}
                height={2868}
                loading="eager"
                className="absolute top-0 left-1/2 z-10 w-[176px] -translate-x-1/2 rounded-[1.9rem] shadow-[3px_5px_30px_rgba(0,0,0,0.22)] sm:w-[250px] sm:rounded-[2.75rem]"
              />
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-zinc-950 px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div>
              <p className="text-primary mb-4 text-sm font-semibold tracking-[0.16em] uppercase">
                {t('mobile_site.mobile_first.eyebrow')}
              </p>
              <h2 className="text-3xl leading-tight font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
                {t('mobile_site.mobile_first.title')}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
                {t('mobile_site.mobile_first.description')}
              </p>
              <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
                {(['touch', 'tools', 'continuity'] as const).map((item) => (
                  <div key={item} className="py-6">
                    <h3 className="font-semibold">{t(`mobile_site.mobile_first.items.${item}.title`)}</h3>
                    <p className="mt-2 leading-7 text-zinc-400">
                      {t(`mobile_site.mobile_first.items.${item}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto h-[520px] w-full max-w-[540px] sm:h-[650px]">
              <img
                src={iphoneAgent}
                alt={t('mobile_site.screenshots.agent')}
                width={1320}
                height={2868}
                loading="lazy"
                className="absolute top-14 right-2 w-[205px] rotate-6 rounded-[2.25rem] opacity-80 shadow-[3px_5px_30px_rgba(0,0,0,0.4)] sm:w-[270px]"
              />
              <img
                src={iphoneConversation}
                alt={t('mobile_site.screenshots.conversation')}
                width={1320}
                height={2868}
                loading="lazy"
                className="absolute top-0 left-2 z-10 w-[230px] -rotate-3 rounded-[2.5rem] shadow-[3px_5px_30px_rgba(0,0,0,0.48)] sm:w-[310px]"
              />
            </div>
          </div>
        </section>

        <section className="overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-primary mb-4 text-sm font-semibold tracking-[0.16em] uppercase">
                {t('mobile_site.tablet.eyebrow')}
              </p>
              <h2 className="text-3xl leading-tight font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
                {t('mobile_site.tablet.title')}
              </h2>
              <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                {t('mobile_site.tablet.description')}
              </p>
            </div>
            <div className="relative mx-auto mt-14 h-[350px] max-w-5xl sm:h-[560px] lg:h-[680px]">
              <img
                src={ipadImagePreview}
                alt={t('mobile_site.screenshots.tablet_drawing')}
                width={2064}
                height={2752}
                loading="lazy"
                className="absolute top-10 left-0 w-[52%] -rotate-3 rounded-[1.6rem] shadow-[3px_5px_30px_rgba(0,0,0,0.22)] sm:rounded-[2.2rem]"
              />
              <img
                src={ipadConversation}
                alt={t('mobile_site.screenshots.tablet_conversation')}
                width={2064}
                height={2752}
                loading="lazy"
                className="absolute top-0 right-0 w-[52%] rotate-3 rounded-[1.6rem] shadow-[3px_5px_30px_rgba(0,0,0,0.22)] sm:rounded-[2.2rem]"
              />
            </div>
          </div>
        </section>

        <section className="bg-zinc-100 px-4 py-20 text-zinc-950 sm:px-6 sm:py-24 lg:px-8 dark:bg-zinc-900 dark:text-white">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-primary text-sm font-semibold tracking-[0.16em] uppercase">
              {t('mobile_site.cta.eyebrow')}
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
              {t('mobile_site.cta.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              {t('mobile_site.cta.description')}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-7 active:scale-95">
                <Link to="/download?platform=mobile">
                  <Download aria-hidden="true" />
                  {t('mobile_site.cta.download')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-7 active:scale-95">
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
