import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { ExternalLink, X } from 'lucide-react'
import type { Project } from '../data/projects'
import { l } from '../i18n'
import Gallery from './Gallery'

function useFocusTrap(active: boolean, ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!active) return
    const el = ref.current
    if (!el) return
    const focusables = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
      )
    const first = focusables()[0]
    first?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const items = focusables()
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
  }, [active, ref])
}

type Props = {
  project: Project
  onClose: () => void
  onNavigate: (dir: 'prev' | 'next') => void
}

export default function ProjectPanel({ project, onClose, onNavigate }: Props) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  useFocusTrap(true, ref)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const blocks: { title: string; body: ReactNode }[] = []
  if (project.problem) blocks.push({ title: t('projects.problem'), body: l(project.problem) })
  if (project.solution) blocks.push({ title: t('projects.solution'), body: l(project.solution) })
  if (project.decisions && project.decisions.length > 0) {
    const list = project.decisions.map((item) => l(item))
    if (list.length > 0) {
      blocks.push({
        title: t('projects.decisions'),
        body: (
          <ul className="flex flex-col gap-2">
            {list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ),
      })
    }
  }
  if (project.result) {
    blocks.push({ title: t('projects.result'), body: l(project.result) })
  }

  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label={l(project.title)}>
      <div
        className="absolute inset-0 bg-black/60"
        role="button"
        tabIndex={-1}
        aria-label={t('projects.lightboxClose')}
        onClick={onClose}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onClose()
          }
        }}
      />
      <motion.aside
        ref={ref}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute inset-y-0 right-0 w-full max-w-[640px] overflow-y-auto border-l border-border bg-surface p-6 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="float-right rounded-full border border-border p-2 text-muted transition-colors hover:text-text"
          aria-label={t('projects.lightboxClose')}
        >
          <X aria-hidden="true" />
        </button>

        <h2 className="font-head text-2xl font-bold">{l(project.title)}</h2>
        <p className="mt-2 text-muted">{l(project.tagline)}</p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <p><span className="label-mono">{t('projects.role')}: </span>{l(project.role)}</p>
          <p><span className="label-mono">{t('projects.period')}: </span>{project.period}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
              <span key={tech} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-text/90">
                {tech}
              </span>
            ))}
          {project.access === 'login' && (
            <span className="rounded-full border border-amber-400/50 px-3 py-1 text-xs text-amber-300">
              {t('projects.accessRestricted')}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-5">
          {blocks.map((block) => (
            <section key={block.title}>
              <h3 className="label-mono mb-1 text-accent-2">{block.title}</h3>
              <div className="text-[0.97rem] leading-relaxed text-text/90">{block.body}</div>
            </section>
          ))}
        </div>

        {project.liveUrl && project.access !== 'login' && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent/80"
          >
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
            {project.liveUrl.replace(/^https?:\/\//, '')}
          </a>
        )}

        <Gallery items={project.gallery} />

        <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
          <button type="button" className="label-mono text-muted hover:text-accent-2" onClick={() => onNavigate('prev')}>
            {t('projects.prevProject')}
          </button>
          <button type="button" className="label-mono text-muted hover:text-accent-2" onClick={() => onNavigate('next')}>
            {t('projects.nextProject')}
          </button>
        </div>
      </motion.aside>
    </div>
  )
}