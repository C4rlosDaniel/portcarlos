import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Scene } from '../data/profile'
import { l } from '../i18n'

type Props = { scenes: readonly Scene[] }

const AUTO_MS = 7000

export default function SceneCarousel({ scenes }: Props) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const count = scenes.length
  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count])

  useEffect(() => {
    if (reduced || paused || count < 2) return
    const id = setTimeout(() => go(index + 1), AUTO_MS)
    return () => clearTimeout(id)
  }, [index, paused, reduced, count, go])

  useEffect(() => {
    if (reduced || count < 2) return
    const onKey = (event: KeyboardEvent) => {
      const active = document.activeElement
      if (active && containerRef.current?.contains(active)) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          go(index - 1)
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          go(index + 1)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, reduced, count, go])

  const touchX = useRef<number | null>(null)

  const scene = scenes[index]

  return (
    <div
      ref={containerRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={t('home.sceneLabel')}
      className="relative flex min-h-[70vh] flex-col justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(event) => {
        touchX.current = event.touches[0].clientX
      }}
      onTouchEnd={(event) => {
        if (touchX.current === null) return
        const delta = event.changedTouches[0].clientX - touchX.current
        if (delta > 40) go(index - 1)
        else if (delta < -40) go(index + 1)
        touchX.current = null
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={reduced ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? undefined : { opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="max-w-[860px]"
        >
          <p className="label-mono mb-4">/&nbsp;{l(scene.kicker)}</p>
          <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight">
            {l(scene.title)}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{l(scene.blurb)}</p>
          <Link to={scene.to} className="label-mono mt-8 inline-block text-accent-2 hover:underline">
            {t('home.learnMore')}
          </Link>
        </motion.div>
      </AnimatePresence>

      {count > 1 && !reduced && (
        <>
          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              className="rounded-full border border-border p-2 text-muted transition-colors hover:text-text"
              aria-label={t('home.scenePrevious')}
              onClick={() => go(index - 1)}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className="rounded-full border border-border p-2 text-muted transition-colors hover:text-text"
              aria-label={t('home.sceneNext')}
              onClick={() => go(index + 1)}
            >
              <ChevronRight aria-hidden="true" />
            </button>
            <div className="ml-2 flex items-center gap-2" role="tablist" aria-label="Cenas">
              {scenes.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={l(item.kicker)}
                  onClick={() => go(i)}
                  className={`flex h-6 min-w-6 items-center ${
                    i === index
                      ? '[&>span]:w-6'
                      : '[&>span]:w-2 [&>span]:bg-border [&>span]:hover:bg-muted'
                  }`}
                >
                  <span className="block h-2 w-2 shrink-0 rounded-full transition-all bg-accent-2" />
                </button>
              ))}
            </div>
          </div>
          <p className="label-mono mt-3" aria-hidden="true">
            {index + 1} / {count}
          </p>
        </>
      )}
    </div>
  )
}