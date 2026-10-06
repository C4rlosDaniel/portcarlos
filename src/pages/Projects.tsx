import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { GitFork, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ProjectGrid, { type FilterKey } from '../components/ProjectGrid'
import ProjectPanel from '../components/ProjectPanel'
import { visibleProjects } from '../data/projects'
import githubRepos from '../data/github.json'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function OpenSourceSection() {
  const { t } = useTranslation()
  if (githubRepos.length === 0) return null
  return (
    <section className="mt-16">
      <h2 className="mb-5 text-xl font-semibold">{t('projects.openSource')}</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {githubRepos.slice(0, 6).map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[var(--radius)] border border-border bg-surface p-5 transition-colors hover:border-accent-2/60"
          >
            <h3 className="font-mono text-sm font-semibold text-accent-2">{repo.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted">{repo.description ?? t('projects.openSource')}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5" aria-hidden="true" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
                {repo.fork ? 1 : 0}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { slug } = useParams()
  const [filter, setFilter] = useState<FilterKey>('todos')
  useDocumentTitle(t('nav.projects') + ' — Carlos Daniel')

  const project = useMemo(() => visibleProjects.find((item) => item.slug === slug) ?? null, [slug])

  const filtered = useMemo(() => {
    if (filter === 'todos') return visibleProjects
    return visibleProjects.filter((item) => item.category.includes(filter))
  }, [filter])

  const handlePanelNavigate = (dir: 'prev' | 'next') => {
    if (!project) return
    const index = visibleProjects.findIndex((item) => item.slug === project.slug)
    const next = visibleProjects[(index + (dir === 'next' ? 1 : -1) + visibleProjects.length) % visibleProjects.length]
    navigate(`/projetos/${next.slug}`)
  }

  return (
    <section className="mx-auto max-w-[var(--maxw)] px-[var(--gutter)] py-10">
      <h1 className="mb-1 text-3xl font-bold">{t('nav.projects')}</h1>
      <p className="label-mono mb-10">/projetos — work and play</p>

      <ProjectGrid
        projects={filtered}
        filter={filter}
        onFilter={setFilter}
        onOpen={(itemSlug) => navigate(`/projetos/${itemSlug}`)}
      />

      <OpenSourceSection />

      <AnimatePresence>
        {project && (
          <ProjectPanel
            project={project}
            onClose={() => navigate('/projetos')}
            onNavigate={handlePanelNavigate}
          />
        )}
      </AnimatePresence>
    </section>
  )
}