import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'

const CareersPage: FC = () => {
  const { t } = useTranslation()
  usePageMeta('careers')

  const positions = [
    { key: 'frontend', icon: '💻' },
    { key: 'backend', icon: '⚙️' },
    { key: 'fullstack', icon: '🔧' },
    { key: 'mobile', icon: '📱' },
    { key: 'ai', icon: '🤖' }
  ]

  const benefits = ['no_clock', 'equity', 'ai_native', 'growth']

  return (
    <div className="bg-background min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-4 inline-block rounded-md bg-foreground/10 px-3 py-1 text-sm font-medium text-foreground">
            {t('careers.badge')}
          </span>
          <h1 className="mb-6 text-4xl font-bold text-foreground sm:text-5xl">{t('careers.title')}</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">{t('careers.subtitle')}</p>
          <Button size="lg" asChild>
            <a
              href="https://mcnnox2fhjfq.feishu.cn/share/base/form/shrcnaepLR6BrddSI3mv0899Wpf"
              target="_blank"
              rel="noopener noreferrer">
              {t('careers.apply_button')}
            </a>
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-border/50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold text-foreground">{t('careers.why_join')}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((key) => (
              <div key={key} className="rounded-lg border border-border/50 bg-card/50 p-6">
                <h3 className="mb-2 font-semibold text-foreground">{t(`careers.benefits.${key}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`careers.benefits.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="border-t border-border/50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold text-foreground">{t('careers.positions_title')}</h2>
          <div className="space-y-4">
            {positions.map((pos) => (
              <div
                key={pos.key}
                className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-5 transition-colors hover:border-border">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{pos.icon}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{t(`careers.positions.${pos.key}.title`)}</h3>
                    <p className="text-sm text-muted-foreground">{t(`careers.positions.${pos.key}.description`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <a
                href="https://github.com/CherryHQ/cherry-studio/issues/11953"
                target="_blank"
                rel="noopener noreferrer">
                {t('careers.view_full_jd')}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="border-t border-border/50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground">{t('careers.location_title')}</h2>
          <p className="mb-8 text-center text-muted-foreground">{t('careers.location')}</p>
          <a
            href="https://amap.com/search?query=上海市嘉定区沪宜公路1188号"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-xl border border-border/50 transition-all hover:border-border hover:shadow-lg">
            {/* Google Maps style background */}
            <div className="absolute inset-0 bg-[#f2f2f2] dark:bg-[#1d2c3a]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Water areas */}
                  <pattern id="water" width="100" height="100" patternUnits="userSpaceOnUse">
                    <rect width="100" height="100" fill="#aadaff" className="dark:fill-[#264b5d]" />
                  </pattern>
                </defs>
                {/* Base land color */}
                <rect width="100%" height="100%" fill="#f2f2f2" className="dark:fill-[#1d2c3a]" />
                {/* Water body */}
                <ellipse cx="85%" cy="70%" rx="200" ry="150" fill="#aadaff" className="dark:fill-[#264b5d]" />
                {/* Parks/Green areas */}
                <rect x="10%" y="15%" width="80" height="60" rx="4" fill="#c5e8b7" className="dark:fill-[#2d4a3e]" />
                <rect x="70%" y="25%" width="100" height="70" rx="4" fill="#c5e8b7" className="dark:fill-[#2d4a3e]" />
                <ellipse cx="25%" cy="75%" rx="60" ry="40" fill="#c5e8b7" className="dark:fill-[#2d4a3e]" />
                {/* Buildings/Blocks */}
                <rect x="20%" y="35%" width="60" height="45" rx="2" fill="#e8e8e8" className="dark:fill-[#2a3f4d]" />
                <rect x="35%" y="20%" width="50" height="35" rx="2" fill="#e8e8e8" className="dark:fill-[#2a3f4d]" />
                <rect x="55%" y="55%" width="70" height="50" rx="2" fill="#e8e8e8" className="dark:fill-[#2a3f4d]" />
                <rect x="15%" y="60%" width="45" height="30" rx="2" fill="#e8e8e8" className="dark:fill-[#2a3f4d]" />
                <rect x="60%" y="10%" width="55" height="40" rx="2" fill="#e8e8e8" className="dark:fill-[#2a3f4d]" />
                {/* Main roads - yellow/orange */}
                <path
                  d="M 0 200 Q 200 180, 400 200 T 800 180 L 1000 190"
                  fill="none"
                  stroke="#ffd54f"
                  strokeWidth="8"
                  className="dark:stroke-[#6b5b3a]"
                />
                <path
                  d="M 300 0 Q 320 150, 280 300 T 320 500"
                  fill="none"
                  stroke="#ffd54f"
                  strokeWidth="8"
                  className="dark:stroke-[#6b5b3a]"
                />
                {/* Secondary roads - white */}
                <path
                  d="M 0 100 L 400 110 Q 500 115, 600 100 L 1000 95"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="5"
                  className="dark:stroke-[#3d5467]"
                />
                <path
                  d="M 0 320 Q 250 300, 500 330 T 1000 310"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="5"
                  className="dark:stroke-[#3d5467]"
                />
                <path
                  d="M 150 0 L 160 200 Q 165 300, 150 400"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4"
                  className="dark:stroke-[#3d5467]"
                />
                <path
                  d="M 500 0 Q 510 200, 490 400"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4"
                  className="dark:stroke-[#3d5467]"
                />
                <path
                  d="M 700 50 L 680 400"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3"
                  className="dark:stroke-[#3d5467]"
                />
              </svg>
            </div>
            {/* Content */}
            <div className="relative flex h-[300px] items-center justify-center sm:h-[400px]">
              <div className="text-center">
                {/* Google Maps style pin */}
                <div className="mb-4 flex justify-center">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 24 24"
                    className="drop-shadow-lg transition-transform group-hover:scale-110">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      fill="#ea4335"
                      className="dark:fill-[#ea4335]"
                    />
                    <circle cx="12" cy="9" r="2.5" fill="#7b231c" className="dark:fill-[#7b231c]" />
                  </svg>
                </div>
                <div className="mb-1 rounded-lg bg-white/90 px-4 py-2 text-lg font-semibold text-gray-800 shadow-md backdrop-blur-sm dark:bg-gray-800/90 dark:text-gray-100">
                  Cherry Studio
                </div>
                <div className="mb-3 text-sm text-gray-600 dark:text-gray-300">{t('careers.location_detail')}</div>
                <div className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white shadow-md transition-all group-hover:bg-blue-600">
                  {t('careers.click_to_view_map')}
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-secondary/30 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">{t('careers.cta_title')}</h2>
          <p className="mb-8 text-muted-foreground">{t('careers.cta_subtitle')}</p>
          <Button size="lg" asChild>
            <a
              href="https://mcnnox2fhjfq.feishu.cn/share/base/form/shrcnaepLR6BrddSI3mv0899Wpf"
              target="_blank"
              rel="noopener noreferrer">
              {t('careers.apply_button')}
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CareersPage
