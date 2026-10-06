import { useTranslation } from 'react-i18next'
import { Languages } from 'lucide-react'
import { setLanguage, type Language } from '../i18n'

const languages: Language[] = ['pt-BR', 'en', 'fr']

export default function LangSwitch() {
  const { i18n } = useTranslation()

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-1" role="group" aria-label="Language">
      <Languages className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
      {languages.map((lang) => {
        const active = i18n.language === lang
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            aria-pressed={active}
            className={`rounded-full px-2 py-0.5 font-mono text-xs transition-colors ${
              active ? 'bg-accent-2 text-black' : 'text-muted hover:text-text'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}