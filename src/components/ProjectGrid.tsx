import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Project } from '../data/projects'
import { l } from '../i18n'

export type FilterKey = 'todos' | 'sistemas' | 'landing' | 'automacao'

type Props = {
  projects: readonly Project[]
  filter: FilterKey
  onFilter: (filter: FilterKey) => void
  onOpen: (slug: string) => void
}

function CategoryChip({ label }: { label: string }) {
  return <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-muted">{label}</span>
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  const { t } = useTranslation()
  const [imgOk, setImgOk] = useState(true)

  return (
    <button
      type="button"
      onClick={() => onOpen(project.slug)}
      className="group overflow-hidden rounded-[var(--radius)] border border-border bg-surface text-left transition-colors hover:border-accent-2/60"
    >
      <div className="relative aspect-[219/158] w-full overflow-hidden bg-surface-2">
        {imgOk ? (
          <img
            src={project.cover}
            alt=""
            width={438}
            height={316}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-4 text-center font-head text-lg font-semibold text-muted">
            {l(project.title)}
          </div>
        )}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          <span className="label-mono text-accent-2">{t('projects.viewProject')}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-head text-base font-semibold leading-snug">{l(project.title)}</h3>
        <p className="mt-1 text-sm text-muted">{l(project.tagline)}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.category.map((cat) => (
            <CategoryChip key={cat} label={t(`projects.filter${cat[0].toUpperCase()}${cat.slice(1)}`)} />
          ))}
        </div>
      </div>
    </button>
  )
}

const filters: { key: FilterKey; label: string }[] = [
  { key: 'todos', label: 'filterAll' },
  { key: 'sistemas', label: 'filterSistemas' },
  { key: 'landing', label: 'filterLanding' },
  { key: 'automacao', label: 'filterAutomacao' },
]

export default function ProjectGrid({ projects, filter, onFilter, onOpen }: Props) {
  const { t } = useTranslation()

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            onClick={() => onFilter(key)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              filter === key
                ? 'border-accent-2 bg-accent-2 font-semibold text-black'
                : 'border-border text-muted hover:text-text'
            }`}
          >
            {t(`projects.${label}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} onOpen={onOpen} />
        ))}
      </div>
      {projects.length === 0 && (
        <p className="mt-2 text-sm text-muted">{t('projects.noResults')}</p>
      )}
    </div>
  )
}