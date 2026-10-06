import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import type { GalleryItem } from '../data/projects'
import { l } from '../i18n'

type Props = { items: readonly GalleryItem[] }

export default function Gallery({ items }: Props) {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const count = items.length

  const prev = useCallback(() => setActive((i) => (i - 1 + count) % count), [count])
  const next = useCallback(() => setActive((i) => (i + 1) % count), [count])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  if (count === 0) return null
  const current = items[active]

  return (
    <div>
      <div className="overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
        <button
          type="button"
          className="block w-full cursor-zoom-in"
          onClick={() => setLightbox(true)}
          aria-label={l(current.caption)}
        >
          <img
            src={current.src}
            alt={l(current.caption)}
            width={1600}
            height={900}
            loading="lazy"
            className="aspect-video w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = 'none'
            }}
          />
        </button>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {items.map((item, i) => (
          <button
            key={item.src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            aria-label={`${i + 1} — ${l(item.caption)}`}
            className={`w-[110px] shrink-0 overflow-hidden rounded-md border-2 ${
              i === active ? 'border-accent-2' : 'border-transparent hover:border-border'
            }`}
          >
            <img
              src={item.src}
              alt=""
              width={110}
              height={80}
              loading="lazy"
              className="h-20 w-full object-cover"
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-6"
          role="button"
          tabIndex={-1}
          aria-label={t('projects.lightboxClose')}
          onClick={() => setLightbox(false)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setLightbox(false)
            }
          }}
        >
          <button
            type="button"
            className="absolute right-5 top-5 rounded-full border border-border p-2 text-text hover:text-accent-2"
            aria-label={t('projects.lightboxClose')}
onClick={(event) => {
            if (event.target === event.currentTarget) setLightbox(false)
          }}
          >
            <X aria-hidden="true" />
          </button>
          <div className="flex w-full max-w-4xl flex-col">
            <img
              src={current.src}
              alt={l(current.caption)}
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />
            <div className="mt-3 flex items-center justify-between">
              <button type="button" className="label-mono text-accent-2 hover:underline" onClick={prev}>
                ←
              </button>
              <p className="text-sm text-muted">{l(current.caption)}</p>
              <button type="button" className="label-mono text-accent-2 hover:underline" onClick={next}>
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}