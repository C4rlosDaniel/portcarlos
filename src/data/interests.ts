import type { Localized } from '../i18n'

export type Interest = {
  id: string
  label: Localized
  icon: 'languages' | 'teaching' | 'electronics'
}

export const interests: Interest[] = [
  {
    id: 'idiomas',
    label: { 'pt-BR': 'Idiomas', en: 'Languages', fr: 'Langues' },
    icon: 'languages',
  },
  {
    id: 'ensino',
    label: { 'pt-BR': 'Ensino', en: 'Teaching', fr: 'Enseignement' },
    icon: 'teaching',
  },
  {
    id: 'eletronica',
    label: { 'pt-BR': 'Eletrônica', en: 'Electronics', fr: 'Électronique' },
    icon: 'electronics',
  },
]