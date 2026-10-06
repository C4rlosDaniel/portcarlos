import { useTranslation } from 'react-i18next'
import Timeline from '../components/Timeline'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Trajectory() {
  const { t } = useTranslation()
  useDocumentTitle(t('nav.trajectory') + ' — Carlos Daniel')

  return (
    <section className="mx-auto max-w-[var(--maxw)] px-[var(--gutter)] py-10">
      <h1 className="mb-1 text-3xl font-bold">{t('nav.trajectory')}</h1>
      <p className="label-mono mb-10">/trajetoria</p>
      <Timeline />
    </section>
  )
}