import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { script } from './assets/js/script'
import SimpleHeader from './components/website/SimpleHeader'
import DownloadPage from './pages/download'
import HomePage from './pages/home'
import ThemePage from './pages/theme'
import EnterprisePage from './pages/enterprise'

function App() {
  useEffect(() => {
    setTimeout(script, 500)
  }, [])

  return (
    <BrowserRouter>
      <SimpleHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/theme" element={<ThemePage />} />
        <Route path="/enterprise" element={<EnterprisePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
