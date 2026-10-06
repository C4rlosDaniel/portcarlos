import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { useTranslation } from 'react-i18next'
import SolarSystem from '../components/SolarSystem'
import PlanetDetail from '../components/PlanetDetail'
import { skills } from '../data/skills'
import { l } from '../i18n'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export default function Skills() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { planetId } = useParams()
  useDocumentTitle(t('nav.skills') + ' — Carlos Daniel')

  const isCompact =
    useMediaQuery('(max-width: 640px)') ||
    (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  const selected = useMemo(() => skills.find((skill) => skill.id === planetId) ?? null, [planetId])

  const openDetail = (id: string) => navigate(`/skills/${id}`)
  const closeDetail = () => navigate('/skills')

  if (isCompact) {
    return (
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--gutter)] py-10">
        <h1 className="mb-1 text-3xl font-bold">{t('nav.skills')}</h1>
        <p className="label-mono mb-10">/skills</p>
        <div className="flex flex-col gap-4">
          {skills.map((skill) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => openDetail(skill.id)}
              className="rounded-2xl border border-border bg-surface p-5 text-left transition-colors hover:border-accent-2/60"
            >
              <div className="flex items-center gap-3">
                <span
                  className="rounded-full p-2.5"
                  style={{ background: `linear-gradient(135deg, ${skill.colors[0]}, ${skill.colors[1]})` }}
                  aria-hidden="true"
                />
                <div>
                  <h2 className="font-head text-lg font-semibold">{l(skill.name)}</h2>
                  <span
                    className={`label-mono text-xs ${
                      skill.status === 'producao' ? 'text-emerald-300' : 'text-cyan-300'
                    }`}
                  >
                    {skill.status === 'producao' ? t('skills.inProduction') : t('skills.studying')}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted">{l(skill.summary)}</p>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {selected && <PlanetDetail planet={selected} onClose={closeDetail} />}
        </AnimatePresence>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-[var(--maxw)] px-[var(--gutter)] py-10">
      <h1 className="mb-1 text-3xl font-bold">{t('nav.skills')}</h1>
      <p className="label-mono mb-4">/skills</p>
      <p className="mb-8 max-w-xl text-muted">{t('skills.hint')}</p>
      <SolarSystem paused={selected !== null} onOpen={openDetail} />

      <AnimatePresence>
        {selected && <PlanetDetail planet={selected} onClose={closeDetail} />}
      </AnimatePresence>
    </section>
  )
}