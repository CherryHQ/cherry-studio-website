import './index.css'
import './i18n'

import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import { initAnalytics } from './utils/analytics'

initAnalytics()

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
