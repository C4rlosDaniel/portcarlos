import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function About() {
  useDocumentTitle('Sobre — Carlos Daniel')
  return <section className="mx-auto max-w-[var(--maxw)] px-[var(--gutter)] py-16"><h1 className="text-5xl font-bold">WIP: About</h1></section>
}