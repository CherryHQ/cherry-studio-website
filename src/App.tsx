import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ScrollToTop from '@/components/ScrollToTop'
import SimpleHeader from '@/components/website/SimpleHeader.tsx'
import { ThemeProvider } from '@/contexts/ThemeContext'
import CareersPage from '@/pages/careers'
import DownloadPage from '@/pages/download'
import FlashPage from '@/pages/flash'
import FlashUsagePage from '@/pages/flash/usage'
import HomePage from '@/pages/home'
import MobilePage from '@/pages/mobile'
import NotFoundPage from '@/pages/not-found'
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
          <Route path="/flash" element={<FlashPage />} />
          <Route path="/flash/usage" element={<FlashUsagePage />} />
          <Route path="/theme" element={<ThemePage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
