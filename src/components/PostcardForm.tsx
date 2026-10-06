import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Loader2, Mail, Send } from 'lucide-react'

type Status = 'idle' | 'sending' | 'success' | 'error'

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL as string | undefined
const RATE_LIMIT_MS = 30_000
const STORAGE_KEY = 'portfolio.lastSend'

type FieldErrors = { name?: string; email?: string; message?: string }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readLastSend(): number {
  try {
    return Number(localStorage.getItem(STORAGE_KEY) ?? 0)
  } catch {
    return 0
  }
}

function writeLastSend() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()))
  } catch {
    /* storage unavailable */
  }
}

function buildMailto(name: string, email: string, message: string, lang: string): string {
  const subject = encodeURIComponent(`[Portfolio ${lang}] Mensagem de ${name}`)
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
  return `mailto:${CONTACT_EMAIL ?? ''}?subject=${subject}&body=${body}`
}

export default function PostcardForm() {
  const { t, i18n } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [rateLimited, setRateLimited] = useState(false)

  const hasWebhook = Boolean(WEBHOOK_URL)
  const mailtoFallback = hasWebhook || !CONTACT_EMAIL ? null : buildMailto(name, email, message, i18n.language)

  const validate = (): boolean => {
    const next: FieldErrors = {}
    if (!name.trim() || name.trim().length > 80) next.name = t('contact.nameRequired')
    if (!email.trim() || !emailPattern.test(email.trim())) next.email = t('contact.emailInvalid')
    if (!message.trim() || message.trim().length > 1000) next.message = t('contact.messageRequired')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!hasWebhook) return
    if (honeypot.trim()) {
      setStatus('success')
      return
    }

    const last = readLastSend()
    if (Date.now() - last < RATE_LIMIT_MS) {
      setErrors({})
      setRateLimited(true)
      setStatus('error')
      return
    }

    if (!validate()) return

    setStatus('sending')
    setErrors({})
    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      lang: i18n.language,
      source: 'portfolio',
      sentAt: new Date().toISOString(),
    }

    try {
      const response = await fetch(WEBHOOK_URL as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      writeLastSend()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setName('')
    setEmail('')
    setMessage('')
    setErrors({})
    setStatus('idle')
    setRateLimited(false)
  }

  const inputClass = (invalid: boolean) =>
    `w-full rounded-[var(--radius)] border bg-surface-2 px-4 py-3 text-text outline-none transition-colors placeholder:text-muted focus:border-accent-2 ${
      invalid ? 'border-red-400/70' : 'border-border'
    }`

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="border-b border-border bg-surface-2 px-6 py-4">
        <p className="label-mono flex items-center gap-2">
          <Mail className="h-4 w-4" aria-hidden="true" />
          {t('contact.title')}
        </p>
      </div>

      <div className="p-6">
        {status === 'success' ? (
          <div role="status" aria-live="polite" className="flex flex-col items-center gap-4 py-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300" aria-hidden="true">
              ✓
            </span>
            <p className="text-xl font-semibold">{t('contact.successTitle')}</p>
            <p className="text-muted">{t('contact.successText')}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-2 rounded-full border border-border px-5 py-2 text-sm transition-colors hover:border-accent-2"
            >
              {t('contact.sendAnother')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {!hasWebhook && CONTACT_EMAIL && mailtoFallback && (
              <p className="mb-4 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
                {t('contact.mailtoFallback')}:{' '}
                <a href={mailtoFallback} className="font-medium underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            )}

            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="contact-name" className="label-mono mb-1.5 block">
                  {t('contact.name')} *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  maxLength={80}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={inputClass(Boolean(errors.name))}
                  placeholder="Carlos Daniel"
                  autoComplete="name"
                />
                {errors.name && <p role="alert" className="mt-1 text-sm text-red-300">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="label-mono mb-1.5 block">
                  {t('contact.email')} *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClass(Boolean(errors.email))}
                  placeholder="ola@exemplo.com"
                  autoComplete="email"
                />
                {errors.email && <p role="alert" className="mt-1 text-sm text-red-300">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="label-mono mb-1.5 block">
                  {t('contact.message')} *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  maxLength={1000}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className={inputClass(Boolean(errors.message))}
                  placeholder="Escreva seu cartão postal..."
                />
                <div className="mt-1 flex items-center justify-between">
                  {errors.message ? (
                    <p role="alert" className="text-sm text-red-300">{errors.message}</p>
                  ) : (
                    <span />
                  )}
                  <span className="label-mono">{t('contact.messageCounter', { count: message.length })}</span>
                </div>
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website">{t('contact.honeypot')}</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={!hasWebhook || status === 'sending'}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      {t('contact.send')}
                    </>
                  )}
                </button>
                <span className="label-mono">{t('contact.requiredNote')}</span>
              </div>

              {status === 'error' && (
                <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  {rateLimited ? t('contact.rateLimited') : t('contact.error')}
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}