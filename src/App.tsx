import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ScrollToTop from '@/components/ScrollToTop'
import SimpleHeader from '@/components/website/SimpleHeader.tsx'
import { ThemeProvider } from '@/contexts/ThemeContext'
import CareersPage from '@/pages/careers'
import ComparePage, { LegacyCompareRedirect } from '@/pages/compare'
import DownloadPage from '@/pages/download'
import HomePage from '@/pages/home'
import MobilePage from '@/pages/mobile'
import NotFoundPage from '@/pages/not-found'
import ArticlesPage from '@/pages/resources/articles'
import SubscriptionPage from '@/pages/subscription'
import SubscriptionFaqPage from '@/pages/subscription/faq'
import LegacySubscriptionRedirect from '@/pages/subscription/legacy-redirect'
import SubscriptionUsagePage from '@/pages/subscription/usage'
import ThemePage from '@/pages/theme'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SimpleHeader />
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
          <Route path="/compare/:slug" element={<LegacyCompareRedirect />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
