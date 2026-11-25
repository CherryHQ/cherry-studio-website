import { LazyMotion, MotionConfig } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ScrollToTop from '@/components/ScrollToTop'
import SimpleHeader from '@/components/website/SimpleHeader.tsx'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LegacyCompareRedirect } from '@/pages/compare'
import DownloadPage from '@/pages/download'
import HomePage from '@/pages/home'
import MobilePage from '@/pages/mobile'
import NotFoundPage from '@/pages/not-found'
import LegacySubscriptionRedirect from '@/pages/subscription/legacy-redirect'

// Rarely visited routes load on demand so the home and download pages ship less JavaScript.
const ArticlesPage = lazy(() => import('@/pages/resources/articles'))
const AiPptUseCasePage = lazy(() => import('@/pages/resources/use-cases/ai-ppt'))
const CareersPage = lazy(() => import('@/pages/careers'))
const ComparePage = lazy(() => import('@/pages/compare'))
const SubscriptionPage = lazy(() => import('@/pages/subscription'))
const SubscriptionFaqPage = lazy(() => import('@/pages/subscription/faq'))
const SubscriptionUsagePage = lazy(() => import('@/pages/subscription/usage'))
const ThemePage = lazy(() => import('@/pages/theme'))
const loadMotionFeatures = () => import('@/lib/motion-features').then((module) => module.default)

function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <LazyMotion features={loadMotionFeatures} strict>
          <BrowserRouter>
            <ScrollToTop />
            <SimpleHeader />
            <div id="site-content" tabIndex={-1} className="min-h-dvh">
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/download" element={<DownloadPage />} />
                  <Route path="/download/v1" element={<DownloadPage edition="v1" />} />
                  <Route path="/download/v2" element={<DownloadPage edition="v2" />} />
                  <Route path="/mobile" element={<MobilePage />} />
                  <Route path="/subscription" element={<SubscriptionPage />} />
                  <Route path="/flash" element={<LegacySubscriptionRedirect to="/subscription" />} />
                  <Route path="/subscription/usage" element={<SubscriptionUsagePage />} />
                  <Route path="/flash/usage" element={<LegacySubscriptionRedirect to="/subscription/usage" />} />
                  <Route path="/subscription/faq" element={<SubscriptionFaqPage />} />
                  <Route path="/theme" element={<ThemePage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/resources/articles" element={<ArticlesPage />} />
                  <Route path="/resources/articles/:slug" element={<ComparePage />} />
                  <Route path="/resources/use-cases/ai-ppt" element={<AiPptUseCasePage />} />
                  <Route path="/compare/:slug" element={<LegacyCompareRedirect />} />
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </div>
          </BrowserRouter>
        </LazyMotion>
      </MotionConfig>
    </ThemeProvider>
  )
}

export default App
