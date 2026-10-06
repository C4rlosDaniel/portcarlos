import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { ArrowLeft, X } from 'lucide-react'
import type { Skill } from '../data/skills'
import { visibleProjects } from '../data/projects'
import { l } from '../i18n'
import { useScrollLock } from '../hooks/useScrollLock'

type Props = {
  planet: Skill
  onClose: () => void
}

export default function PlanetDetail({ planet, onClose }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  useScrollLock(true)

  useEffect(() => {
    ref.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const items = Array.from(
        el.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])'),
      )
      if (items.length === 0) return
      const start = items[0]
      const end = items[items.length - 1]
      if (event.shiftKey && document.activeElement === start) {
        event.preventDefault()
        end.focus()
      } else if (!event.shiftKey && document.activeElement === end) {
        event.preventDefault()
        start.focus()
      }
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [])

  const usedIn = planet.usedIn
    .map((slug) => ({ slug, project: visibleProjects.find((item) => item.slug === slug) }))
    .filter((entry) => entry.project)

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={l(planet.name)}>
      <div
        className="absolute inset-0 bg-black/60"
        role="button"
        tabIndex={-1}
        aria-label={t('projects.lightboxClose')}
        onClick={() => onClose()}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onClose()
          }
        }}
      />
      <motion.div
        ref={ref}
        tabIndex={-1}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto overscroll-contain rounded-t-[var(--radius)] border border-border bg-surface p-6 sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[480px] sm:max-w-full sm:rounded-none sm:rounded-l-[var(--radius)] sm:border-y-0 sm:border-r-0 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-sm text-muted transition-colors hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('skills.back')}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border p-2 text-muted transition-colors hover:text-text"
            aria-label={t('projects.lightboxClose')}
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <h2 className="mt-6 font-head text-2xl font-bold">{l(planet.name)}</h2>
        <p className="label-mono mt-2 flex items-center gap-3">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs ${
              planet.status === 'producao'
                ? 'bg-emerald-400/15 text-emerald-300'
                : 'bg-cyan-400/15 text-cyan-300'
            }`}
          >
            {planet.status === 'producao' ? t('skills.inProduction') : t('skills.studying')}
          </span>
        </p>

        <p className="mt-5 leading-relaxed text-text/90">{l(planet.summary)}</p>

        <div className="mt-6">
          <h3 className="label-mono mb-2 text-accent-2">tools</h3>
          <div className="flex flex-wrap gap-2">
            {planet.tools.map((tool) => (
              <span key={tool} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-text/90">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {usedIn.length > 0 && (
          <div className="mt-6">
            <h3 className="label-mono mb-2 text-accent-2">{t('skills.usedIn')}</h3>
            <ul className="flex flex-col gap-2">
              {usedIn.map(({ slug, project }) =>
                project ? (
                  <li key={slug}>
                    <button
                      type="button"
                      onClick={() => navigate(`/projetos/${slug}`)}
                      className="text-left text-text underline-offset-4 hover:text-accent-2 hover:underline"
                    >
                      {l(project.title)}
                    </button>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  )
}