import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TemaProvider } from './context/TemaContext.jsx'
import { IdiomaProvider } from './context/IdiomaContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TemaProvider>
      <IdiomaProvider>
        <App />
      </IdiomaProvider>
    </TemaProvider>
  </StrictMode>,
)
