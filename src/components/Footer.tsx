import { useTranslation } from 'react-i18next'
import { GithubIcon, InstagramIcon, LinkedinIcon } from './icons'
import { profile } from '../data/profile'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const socials = [
    { href: profile.links.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { href: profile.links.github, label: 'GitHub', Icon: GithubIcon },
    { href: profile.links.instagram, label: 'Instagram', Icon: InstagramIcon },
  ]

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-[var(--maxw)] flex-col items-center justify-between gap-4 px-[var(--gutter)] sm:flex-row">
        <p className="label-mono">{t('footer.credit')} · {year} · {t('footer.rights')}</p>
        <div className="flex items-center gap-3">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-full border border-border p-2 text-muted transition-colors hover:text-accent-2"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}