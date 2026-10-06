import { useTranslation } from 'react-i18next'
import { MessageCircle } from 'lucide-react'
import PostcardForm from '../components/PostcardForm'
import { GithubIcon, LinkedinIcon } from '../components/icons'
import { profile } from '../data/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Contact() {
  const { t } = useTranslation()
  useDocumentTitle(t('nav.contact') + ' — Carlos Daniel')

  const whatsappUrl = import.meta.env.VITE_WHATSAPP_URL as string | undefined

  return (
    <section className="mx-auto max-w-[var(--maxw)] px-[var(--gutter)] py-10">
      <h1 className="mb-1 text-3xl font-bold">{t('nav.contact')}</h1>
      <p className="label-mono mb-10">/contato</p>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <PostcardForm />

        <div className="flex flex-col gap-3">
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3.5 transition-colors hover:border-accent-2/60"
          >
            <LinkedinIcon className="h-5 w-5 text-accent" />
            {t('contact.linkedin')}
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3.5 transition-colors hover:border-accent-2/60"
          >
            <GithubIcon className="h-5 w-5 text-accent" />
            {t('contact.github')}
          </a>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3.5 transition-colors hover:border-accent-2/60"
            >
              <MessageCircle className="h-5 w-5 text-accent" aria-hidden="true" />
              {t('contact.whatsapp')}
            </a>
          )}
          <a
            href="/cv/Carlos-Daniel-Alencar-CV.pdf"
            download
            className="flex items-center gap-3 rounded-2xl border border-dashed border-accent-2/60 bg-surface px-5 py-3.5 transition-colors hover:bg-surface-2"
          >
            <span aria-hidden="true">↧</span>
            {t('contact.cvDownload')}
          </a>
        </div>
      </div>
    </section>
  )
}