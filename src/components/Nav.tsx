import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LangSwitch from './LangSwitch'
import { profile } from '../data/profile'

const links: { to: string; key: 'home' | 'about' | 'skills' | 'projects' | 'trajectory' | 'contact'; end?: boolean }[] = [
  { to: '/', key: 'home', end: true },
  { to: '/sobre', key: 'about' },
  { to: '/skills', key: 'skills' },
  { to: '/projetos', key: 'projects' },
  { to: '/trajetoria', key: 'trajectory' },
  { to: '/contato', key: 'contact' },
]

function navClass(isActive: boolean) {
  return [
    'font-mono text-sm lowercase tracking-wide transition-colors',
    isActive ? 'text-text underline decoration-accent-2 decoration-2 underline-offset-4' : 'text-muted hover:text-text',
  ].join(' ')
}

export default function Nav() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[var(--maxw)] items-center justify-between gap-4 px-[var(--gutter)]">
        <NavLink to="/" onClick={close} className="font-head text-lg font-semibold tracking-tight">
          {profile.shortName}
        </NavLink>

        <nav aria-label="Principal" className="hidden items-center gap-5 md:flex">
          {links.map((link) =>
            link.key === 'contact' ? (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={close}
                className="rounded-full bg-accent px-4 py-1.5 font-mono text-sm lowercase text-white transition-colors hover:bg-accent/80"
              >
                /{t(`nav.${link.key}`)}
              </NavLink>
            ) : (
              <NavLink key={link.to} to={link.to} end={link.end} onClick={close} className={({ isActive }) => navClass(isActive)}>
                /{t(`nav.${link.key}`)}
              </NavLink>
            ),
          )}
          <LangSwitch />
        </nav>

        <div className="md:hidden">
          <LangSwitch />
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-text md:hidden"
          aria-expanded={open}
          aria-label={open ? t('nav.menuClose') : t('nav.menuOpen')}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-16 z-40 flex flex-col items-center gap-6 bg-bg px-6 pt-12 md:hidden">
          <nav aria-label="Principal" className="flex w-full max-w-xs flex-col items-center gap-5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={close}
                className={({ isActive }) => [navClass(isActive), 'text-2xl'].join(' ')}
              >
                /{t(`nav.${link.key}`)}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}