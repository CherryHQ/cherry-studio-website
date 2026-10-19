import { useTranslation } from 'react-i18next'

import googlePlayLogo from '@/assets/images/resource/store-badges/google-play-logo.png'

interface StoreDownloadBadgeProps {
  platform: 'android' | 'ios'
  url: string
}

function AppleLogo() {
  return (
    <svg viewBox="8.5 8.5 19 21.5" aria-hidden="true" className="h-6 w-6 fill-white">
      <path d="M24.76888,20.30068a4.94881,4.94881,0,0,1,2.35656-4.15206,5.06566,5.06566,0,0,0-3.99116-2.15768c-1.67924-.17626-3.30719,1.00483-4.1629,1.00483-.87227,0-2.18977-.98733-3.6085-.95814a5.31529,5.31529,0,0,0-4.47292,2.72787c-1.934,3.34842-.49141,8.26947,1.3612,10.97608.9269,1.32535,2.01018,2.8058,3.42763,2.7533,1.38706-.05753,1.9051-.88448,3.5794-.88448,1.65876,0,2.14479.88448,3.591.8511,1.48838-.02416,2.42613-1.33124,3.32051-2.66914a10.962,10.962,0,0,0,1.51842-3.09251A4.78205,4.78205,0,0,1,24.76888,20.30068Z" />
      <path d="M22.03725,12.21089a4.87248,4.87248,0,0,0,1.11452-3.49062,4.95746,4.95746,0,0,0-3.20758,1.65961,4.63634,4.63634,0,0,0-1.14371,3.36139A4.09905,4.09905,0,0,0,22.03725,12.21089Z" />
    </svg>
  )
}

export default function StoreDownloadBadge({ platform, url }: StoreDownloadBadgeProps) {
  const { t } = useTranslation()
  const isAndroid = platform === 'android'
  const store = isAndroid ? 'Google Play' : 'App Store'

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('mobile_download.direct_store', { store })}
      className="focus-visible:ring-ring inline-flex h-12 w-44 items-center gap-3 rounded-xl bg-black px-4 text-left text-white ring-1 ring-black transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:ring-white/25">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center">
        {isAndroid ? <img src={googlePlayLogo} alt="" className="h-6 w-auto" /> : <AppleLogo />}
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[10px] font-medium text-white/80">{t('mobile_download.badge_caption')}</span>
        <span className="mt-1 text-[17px] font-semibold tracking-tight">{store}</span>
      </span>
    </a>
  )
}
