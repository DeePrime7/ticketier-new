import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'

axios.defaults.baseURL="https://ethical-antelope-rockgtargames24-f3b69411.koyeb.app"

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
