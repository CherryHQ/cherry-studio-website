import './index.css'
import './i18n'

import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import { initPosthog } from './utils/analytics'

initPosthog()

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
