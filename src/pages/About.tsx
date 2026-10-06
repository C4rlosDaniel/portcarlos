import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CircuitBoard, GraduationCap, Languages } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../components/icons'
import { profile } from '../data/profile'
import { interests } from '../data/interests'
import { l } from '../i18n'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const interestIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  languages: Languages,
  teaching: GraduationCap,
  electronics: CircuitBoard,
}

export default function About() {
  const { t } = useTranslation()
  useDocumentTitle(t('nav.about') + ' — Carlos Daniel')
  const [photoOk, setPhotoOk] = useState(true)

  const socials = [
    { href: profile.links.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { href: profile.links.github, label: 'GitHub', Icon: GithubIcon },
    { href: profile.links.instagram, label: 'Instagram', Icon: InstagramIcon },
  ]

  return (
    <section className="mx-auto max-w-[var(--maxw)] px-[var(--gutter)] py-10">
      <h1 className="mb-1 text-3xl font-bold">{t('about.title')}</h1>
      <p className="label-mono mb-10">/sobre</p>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <div>
          <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-full border-2 border-accent bg-surface-2">
            {photoOk ? (
              <img
                src="/profile.webp"
                alt={t('about.photoAlt')}
                className="h-full w-full object-cover"
                onError={() => setPhotoOk(false)}
              />
            ) : (
              <span className="font-head text-6xl font-bold text-accent">{t('about.photoFallback')}</span>
            )}
          </div>
          <div className="mt-6 flex justify-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full border border-border p-2.5 text-muted transition-colors hover:text-accent-2"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="label-mono mt-6 text-center">{l(profile.role)}</p>
          <p className="mt-1 text-center text-sm text-muted">{l(profile.location)}</p>
        </div>

        <div className="flex flex-col gap-5">
          {profile.about.map((block) => (
            <article key={block.title['pt-BR']} className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="mb-2 text-lg font-semibold text-accent-2">{l(block.title)}</h2>
              <p className="text-[0.98rem] leading-relaxed text-text/90">{l(block.text)}</p>
            </article>
          ))}
        </div>
      </div>

      <section className="mt-14">
        <h2 className="mb-5 text-xl font-semibold">{t('about.outsideTitle')}</h2>
        <div className="flex flex-wrap gap-4">
          {interests.map((interest) => {
            const Icon = interestIcons[interest.icon]
            return (
              <div
                key={interest.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3"
              >
                <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                <span>{l(interest.label)}</span>
              </div>
            )
          })}
        </div>
      </section>
    </section>
  )
}