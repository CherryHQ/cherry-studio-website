import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { script } from '@/assets/js/script.ts'
import ScrollToTop from '@/components/ScrollToTop'
import SimpleHeader from '@/components/website/SimpleHeader.tsx'
import { ThemeProvider } from '@/contexts/ThemeContext'
import CareersPage from '@/pages/careers'
import DownloadPage from '@/pages/download'
import EnterprisePage from '@/pages/enterprise'
import EnterpriseDownloadPage from '@/pages/enterprise-download'
import HomePage from '@/pages/home'
import ThemePage from '@/pages/theme'

function App() {
  useEffect(() => {
    setTimeout(script, 500)
  }, [])

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SimpleHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/theme" element={<ThemePage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />
          <Route path="/enterprise/download" element={<EnterpriseDownloadPage />} />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
