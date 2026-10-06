import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/inter'
import '@fontsource/jetbrains-mono'
import './index.css'
import App from './App.tsx'

const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim().replace(/\/+$/, '')
if (siteUrl) {
  document.querySelector('#canonical')?.setAttribute('href', `${siteUrl}/`)
  document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach((meta) => {
    meta.setAttribute('content', `${siteUrl}/og-image.png`)
  })
  const person = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]')
  if (person) {
    try {
      const data = JSON.parse(person.textContent ?? '{}')
      data.url = `${siteUrl}/`
      person.textContent = JSON.stringify(data)
    } catch {
      /* keep static schema */
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)