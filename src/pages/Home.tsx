import { useTranslation } from 'react-i18next'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Home() {
  const { t } = useTranslation()
  useDocumentTitle('Carlos Daniel Alencar — Analista de Sistemas & Automação')
  return (
    <section className="mx-auto max-w-[var(--maxw)] px-[var(--gutter)] py-16">
      <h1 className="text-5xl font-bold">WIP: Home</h1>
      <p>{t('home.seeProjects')}</p>
    </section>
  )
}