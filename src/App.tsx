import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import DownloadPage from './pages/download'
import { useEffect } from 'react'
import { script } from './assets/js/script'

function App() {
  useEffect(() => {
    setTimeout(script, 500)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
