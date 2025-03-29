import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { script } from './assets/js/script'
import CSSPage from './pages/css'
import DownloadPage from './pages/download'
import HomePage from './pages/home'

function App() {
  useEffect(() => {
    setTimeout(script, 500)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/css" element={<CSSPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
