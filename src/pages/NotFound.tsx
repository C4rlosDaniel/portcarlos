import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound() {
  const { t } = useTranslation()
  useDocumentTitle('404 — Carlos Daniel')
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-[var(--gutter)]">
      <p className="font-mono text-6xl text-muted">404</p>
      <p className="max-w-md text-center text-muted">{t('notFound.text')}</p>
      <Link to="/" className="rounded-full bg-accent px-5 py-2 text-white transition-colors hover:bg-accent/80">
        {t('notFound.home')}
      </Link>
    </section>
  )
}