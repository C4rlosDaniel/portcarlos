import { useEffect, useRef, useState, type FormEvent, type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { MessageCircle, Send, X } from 'lucide-react'
import i18n from '../i18n'
import type { Language } from '../i18n'
import { ask, greet, type AssistantState } from '../assistant/engine'
import type { Reply, ReplyLink } from '../assistant/intents'
import type { Lang } from '../assistant/normalize'
import { useScrollLock } from '../hooks/useScrollLock'

type Message = {
  id: number
  from: 'user' | 'assistant'
  text: string
  chips?: string[]
  links?: ReplyLink[]
}

function currentLang(): Lang {
  const lang = i18n.language
  if (lang === 'pt-BR' || lang === 'en' || lang === 'fr') return lang
  return 'pt-BR'
}

function useFocusTrap(active: boolean, ref: RefObject<HTMLDivElement | null>, initial: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active) return
    const el = ref.current
    if (!el) return
    const focusables = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
      )
    ;(initial.current ?? focusables()[0])?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const start = items[0]
      const end = items[items.length - 1]
      if (event.shiftKey && document.activeElement === start) {
        event.preventDefault()
        end.focus()
      } else if (!event.shiftKey && document.activeElement === end) {
        event.preventDefault()
        start.focus()
      }
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [active, ref, initial])
}

let nextId = 1

export default function ChatWidget() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => {
    const greeting = greet(currentLang())
    return [{ id: nextId++, from: 'assistant', text: greeting.text, chips: greeting.chips, links: greeting.links }]
  })
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<AssistantState>({})
  const timerRef = useRef<number | undefined>(undefined)

  useFocusTrap(open, panelRef, inputRef)
  useScrollLock(open)

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current)
  }, [])

  useEffect(() => {
    if (!open || messages.length === 0) return
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [open, messages, typing])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const send = (raw: string) => {
    const text = raw.trim()
    if (!text || typing) return
    setMessages((prev) => [...prev, { id: nextId++, from: 'user', text }])
    setDraft('')
    setTyping(true)
    const lang: Language = currentLang()
    timerRef.current = window.setTimeout(() => {
      const answer = ask(text, lang, stateRef.current)
      stateRef.current = answer.state
      const reply: Reply = answer.reply
      setMessages((prev) => [
        ...prev,
        { id: nextId++, from: 'assistant', text: reply.text, chips: reply.chips, links: reply.links },
      ])
      setTyping(false)
    }, 420)
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    send(draft)
  }

  const lastAssistant = [...messages].reverse().find((message) => message.from === 'assistant')
  const chips = typing ? undefined : lastAssistant?.chips

  const renderLink = (link: ReplyLink, index: number) => {
    const className =
      'rounded-full border border-border bg-surface px-3 py-1 text-xs text-text/90 transition-colors hover:border-accent hover:text-accent-2'
    if (link.to) {
      return (
        <Link key={index} to={link.to} className={className} onClick={() => setOpen(false)}>
          {link.label}
        </Link>
      )
    }
    return (
      <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
      </a>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? t('assistant.close') : t('assistant.open')}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[65] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-transform hover:scale-105"
      >
        {open ? <X aria-hidden="true" className="h-6 w-6" /> : <MessageCircle aria-hidden="true" className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('assistant.title')}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-5 z-[75] flex max-h-[70vh] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
          >
            <header className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
              <div>
                <p className="font-head font-bold">{t('assistant.title')}</p>
                <p className="text-xs text-muted">{t('assistant.subtitle')}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('assistant.close')}
                className="rounded-full border border-border p-1.5 text-muted transition-colors hover:text-text"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </header>

            <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-4">
              {messages.map((message) => (
                <div key={message.id} className={message.from === 'user' ? 'self-end' : 'self-start'}>
                  <div
                    className={
                      message.from === 'user'
                        ? 'max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-3.5 py-2 text-sm text-white'
                        : 'max-w-[95%] rounded-2xl rounded-bl-sm border border-border bg-surface-2 px-3.5 py-2 text-sm leading-relaxed text-text/90'
                    }
                  >
                    {message.text}
                  </div>
                  {message.links && message.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">{message.links.map(renderLink)}</div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="self-start rounded-2xl rounded-bl-sm border border-border bg-surface-2 px-3.5 py-2">
                  <span className="label-mono text-muted">{t('assistant.typing')}</span>
                </div>
              )}

              {chips && chips.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {chips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => send(chip)}
                      className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent-2 transition-colors hover:bg-accent/20"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border px-3 py-3">
              <input
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={t('assistant.placeholder')}
                aria-label={t('assistant.placeholder')}
                maxLength={300}
                className="min-w-0 flex-1 rounded-full border border-border bg-surface-2 px-4 py-2 text-sm text-text outline-none placeholder:text-muted focus:border-accent"
              />
              <button
                type="submit"
                disabled={!draft.trim() || typing}
                aria-label={t('assistant.send')}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-opacity disabled:opacity-40"
              >
                <Send aria-hidden="true" className="h-4 w-4" />
              </button>
            </form>
            <p className="px-4 pb-3 text-[0.65rem] leading-snug text-muted">{t('assistant.disclaimer')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
