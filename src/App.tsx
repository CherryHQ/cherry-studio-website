import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ScrollToTop from '@/components/ScrollToTop'
import SimpleHeader from '@/components/website/SimpleHeader.tsx'
import { ThemeProvider } from '@/contexts/ThemeContext'
import CareersPage from '@/pages/careers'
import DownloadPage from '@/pages/download'
import HomePage from '@/pages/home'
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
          <Route path="/theme" element={<ThemePage />} />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
