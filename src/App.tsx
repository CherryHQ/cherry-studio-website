import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import DownloadPage from './pages/download'
import { useEffect } from 'react'
import { script } from './assets/js/script'
import CSSPage from './pages/css'

function App() {
  useEffect(() => {
    setTimeout(script, 1200)
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
