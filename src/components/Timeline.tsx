import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import { certifications, experience, formation, type TimelineItem } from '../data/timeline'
import { l } from '../i18n'

function FadeIn({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLLIElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <li
      ref={ref}
      className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
    </li>
  )
}

function TimelineEntry({ item }: { item: TimelineItem }) {
  const { t } = useTranslation()
  return (
    <article className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-wrap items-center gap-3">
        <p className="label-mono">{item.period}</p>
        {item.mode && (
          <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
            {t(`trajectory.${item.mode}`)}
          </span>
        )}
      </div>
      <h3 className="mt-2 text-xl font-semibold">{l(item.role)}</h3>
      <p className="mt-1 text-muted">
        {item.organization} · {item.location}
      </p>
      {item.bullets.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2 text-[0.95rem] text-text/90">
          {item.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2" aria-hidden="true" />
              <span>{l(bullet)}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default function Timeline() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'experience' | 'formation'>('experience')
  const items = tab === 'experience' ? experience : formation

  return (
    <div>
      <div className="mb-8 flex gap-2" role="tablist" aria-label="Timeline">
        {(['experience', 'formation'] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`rounded-full border px-5 py-2 text-sm transition-colors ${
              tab === key
                ? 'border-accent-2 bg-accent-2 font-semibold text-black'
                : 'border-border text-muted hover:text-text'
            }`}
          >
            {t(`trajectory.${key}`)}
          </button>
        ))}
      </div>

      <ol className="relative flex flex-col gap-6 border-l border-border pl-6 lg:pl-10">
        {items.map((item, i) => (
          <FadeIn key={`${tab}-${i}`}>
            <TimelineEntry item={item} />
          </FadeIn>
        ))}
      </ol>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">{t('trajectory.certifications')}</h2>
        <ul className="flex flex-col gap-2">
          {certifications.map((name) => (
            <li key={name} className="flex items-center gap-2 text-[0.95rem] text-muted">
              <span className="text-accent-2" aria-hidden="true">
                •
              </span>
              {name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}