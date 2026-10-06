import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SceneCarousel from '../components/SceneCarousel'
import { profile } from '../data/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Home() {
  const { t } = useTranslation()
  useDocumentTitle('Carlos Daniel Alencar — Analista de Sistemas & Automação')

  return (
    <section className="mx-auto max-w-[var(--maxw)] px-[var(--gutter)] py-10">
      <SceneCarousel scenes={profile.scenes} />

      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-8">
        <Link
          to="/projetos"
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/80"
        >
          {t('home.seeProjects')}
        </Link>
      </div>
    </section>
  )
}