import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import fr from './locales/fr.json'
import ptBR from './locales/pt-BR.json'

export type Language = 'pt-BR' | 'en' | 'fr'
export type Localized = Record<Language, string>

const STORAGE_KEY = 'portfolio.lang'

export function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt-BR' || saved === 'en' || saved === 'fr') return saved
    const nav = navigator.language.toLowerCase()
    if (nav.startsWith('pt')) return 'pt-BR'
    if (nav.startsWith('fr')) return 'fr'
    return 'en'
  } catch {
    return 'pt-BR'
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { translation: ptBR },
      en: { translation: en },
      fr: { translation: fr },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'pt-BR',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: STORAGE_KEY,
    },
  })

document.documentElement.lang = i18n.language

export function setLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* storage unavailable */
  }
  void i18n.changeLanguage(lang)
  document.documentElement.lang = lang
}

export function l(locale: Localized): string {
  return locale[i18n.language as Language] ?? locale['pt-BR'] ?? Object.values(locale)[0] ?? ''
}

export default i18n