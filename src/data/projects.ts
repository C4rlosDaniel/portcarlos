import type { Localized } from '../i18n'
import { TODO } from './profile'

export type Category = 'sistemas' | 'landing' | 'automacao'
export type Access = 'public' | 'login'

export type GalleryItem = {
  src: string
  caption: Localized
}

export type Project = {
  slug: string
  title: Localized
  tagline: Localized
  category: Category[]
  role: Localized
  period: string
  stack: string[]
  liveUrl?: string
  access?: Access
  problem?: Localized
  solution?: Localized
  decisions?: Localized[]
  result?: Localized
  cover: string
  gallery: GalleryItem[]
  hidden?: boolean
  items?: string[]
}

const p = (value: string): Localized => ({ 'pt-BR': value, en: value, fr: value })

const projects: Project[] = [
  {
    slug: 'clubeon',
    title: {
      'pt-BR': 'ClubeON — Transmissão Digital',
      en: 'ClubeON — Digital Signage',
      fr: 'ClubeON — Affichage Numérique',
    },
    tagline: {
      'pt-BR': 'Sistema oficial de transmissão digital do Clube Pirassununga.',
      en: 'Official digital signage system of Clube Pirassununga.',
      fr: 'Système officiel d\'affichage numérique du Clube Pirassununga.',
    },
    category: ['sistemas'],
    role: { 'pt-BR': 'Desenvolvimento e implantação', en: 'Development and rollout', fr: 'Développement et mise en place' },
    period: '2026',
    liveUrl: 'https://clubeon.clubepirassununga.com.br',
    access: 'login',
    stack: [
      'PostgreSQL',
      'Supabase',
      'JavaScript',
      'IA no desenvolvimento',
      TODO('confirmar front-end'),
    ],
    problem: {
      'pt-BR': 'Os conteúdos exibidos nas TVs e monitores do clube eram atualizados manualmente, tela por tela.',
      en: 'The content shown on the club\'s TVs and monitors was updated manually, screen by screen.',
      fr: 'Le contenu affiché sur les téléviseurs et moniteurs du club était mis à jour manuellement, écran par écran.',
    },
    solution: {
      'pt-BR':
        'Uma plataforma centralizada: o administrador publica o conteúdo uma vez e os terminais (TVs, monitores e dispositivos conectados) sincronizam em tempo real.',
      en: 'A centralized platform: the administrator publishes content once and the terminals (TVs, monitors and connected devices) sync in real time.',
      fr: 'Une plateforme centralisée : l\'administrateur publie le contenu une fois et les terminaux (téléviseurs, moniteurs et appareils connectés) se synchronisent en temps réel.',
    },
    decisions: [
      {
        'pt-BR': 'Três perfis de acesso: administrador, terminal de exibição e usuário',
        en: 'Three access roles: administrator, display terminal and user',
        fr: 'Trois profils d\'accès : administrateur, terminal d\'affichage et utilisateur',
      },
      {
        'pt-BR': 'Sincronização em tempo real entre painel e terminais',
        en: 'Real-time sync between panel and terminals',
        fr: 'Synchronisation en temps réel entre le tableau de bord et les terminaux',
      },
      p(TODO('adicionar 1–2 decisões técnicas reais')),
    ],
    result: p(TODO('número real (ex.: quantas telas, quanto tempo de atualização foi economizado)')),
    cover: '/projects/clubeon/cover.webp',
    gallery: [{ src: '/projects/clubeon/gallery-1.webp', caption: p('ClubeON') }],
  },
  {
    slug: 'clubstrategy',
    title: {
      'pt-BR': 'ClubStrategy — Gestão de Turmas',
      en: 'ClubStrategy — Class Management',
      fr: 'ClubStrategy — Gestion des Classes',
    },
    tagline: {
      'pt-BR': 'Dashboard de turmas e listas de espera das aulas do Clube Pirassununga.',
      en: 'Dashboard for classes and waiting lists at Clube Pirassununga.',
      fr: 'Tableau de bord des classes et listes d\'attente du Clube Pirassununga.',
    },
    category: ['sistemas'],
    role: { 'pt-BR': 'Desenvolvimento e implantação', en: 'Development and rollout', fr: 'Développement et mise en place' },
    period: '2026',
    liveUrl: 'https://clubstrategy.clubepirassununga.com.br',
    stack: ['PostgreSQL', 'Supabase', 'JavaScript', TODO('confirmar')],
    problem: {
      'pt-BR': 'Controle de alunos matriculados, lista de espera e turmas lotadas sem uma visão única.',
      en: 'Tracking enrolled students, waiting lists and full classes without a single view.',
      fr: 'Suivi des élèves inscrits, listes d\'attente et classes pleines sans vue unique.',
    },
    solution: {
      'pt-BR': 'Dashboard com alunos matriculados, lista de espera, turmas lotadas e resumo por modalidade.',
      en: 'Dashboard with enrolled students, waiting list, full classes and a summary by activity.',
      fr: 'Tableau de bord avec élèves inscrits, liste d\'attente, classes pleines et résumé par activité.',
    },
    result: p(TODO('resultado real')),
    cover: '/projects/clubstrategy/cover.webp',
    gallery: [{ src: '/projects/clubstrategy/gallery-1.webp', caption: p('ClubStrategy') }],
  },
  {
    slug: 'clubingo',
    title: {
      'pt-BR': 'Clubingo — Conferência de Bingo',
      en: 'Clubingo — Bingo Checking',
      fr: 'Clubingo — Contrôle du Bingo',
    },
    tagline: {
      'pt-BR': 'Sorteador e conferentes sincronizados em tempo real.',
      en: 'Drawer and checkers synced in real time.',
      fr: 'Tirage et contrôleurs synchronisés en temps réel.',
    },
    category: ['sistemas'],
    role: { 'pt-BR': 'Desenvolvimento e implantação', en: 'Development and rollout', fr: 'Développement et mise en place' },
    period: '2026',
    liveUrl: 'https://clubingo.vercel.app',
    access: 'public',
    stack: ['Vercel', 'PWA', 'Supabase (realtime)', TODO('confirmar')],
    problem: {
      'pt-BR': 'A conferência das cartelas era manual e lenta durante o evento.',
      en: 'Checking the cards was manual and slow during the event.',
      fr: 'Le contrôle des cartes était manuel et lent pendant l\'événement.',
    },
    solution: {
      'pt-BR':
        'Sistema de bingo com sincronização em tempo real entre o sorteador e os conferentes, instalável no celular (PWA).',
      en: 'A bingo system with real-time sync between the drawer and the checkers, installable on mobile (PWA).',
      fr: 'Système de bingo avec synchronisation en temps réel entre le tirage et les contrôleurs, installable sur mobile (PWA).',
    },
    result: p(TODO('ex.: eventos em que foi usado, nº de participantes')),
    cover: '/projects/clubingo/cover.webp',
    gallery: [{ src: '/projects/clubingo/gallery-1.webp', caption: p('Clubingo') }],
  },
  {
    slug: 'myfly',
    title: { 'pt-BR': 'My Fly — Landing page', en: 'My Fly — Landing page', fr: 'My Fly — Landing page' },
    tagline: {
      'pt-BR': 'Site institucional da empresa de automação comercial onde atuo como Analista de Sistemas (PJ).',
      en: 'Corporate site of the commercial automation company where I work as a Systems Analyst (contractor).',
      fr: 'Site institutionnel de l\'entreprise d\'automatisation commerciale où je travaille comme Analyste de Systèmes (PJ).',
    },
    category: ['landing'],
    role: {
      'pt-BR': 'Analista de Sistemas (PJ) — desenvolvimento da landing page',
      en: 'Systems Analyst (contractor) — landing page development',
      fr: 'Analyste de Systèmes (PJ) — développement de la landing page',
    },
    period: '2026',
    liveUrl: 'https://www.myfly.store',
    access: 'public',
    stack: [TODO('confirmar'), 'Vercel'],
    problem: {
      'pt-BR':
        'A empresa precisava apresentar suas soluções (Food Service, FlyERP e unificação de vendas, financeiro, contratos e notas fiscais) e captar contatos.',
      en: 'The company needed to present its solutions (Food Service, FlyERP and the unification of sales, finance, contracts and invoices) and capture contacts.',
      fr: 'L\'entreprise devait présenter ses solutions (Food Service, FlyERP et l\'unification des ventes, finances, contrats et factures) et capter des contacts.',
    },
    solution: {
      'pt-BR':
        'Landing page responsiva com foco em conversão para o WhatsApp, SEO local (Pirassununga/SP) e identidade visual escura.',
      en: 'Responsive landing page focused on WhatsApp conversion, local SEO (Pirassununga/SP) and a dark visual identity.',
      fr: 'Landing page responsive axée sur la conversion vers WhatsApp, le SEO local (Pirassununga/SP) et une identité visuelle sombre.',
    },
    result: p(TODO('resultado real')),
    cover: '/projects/myfly/cover.webp',
    gallery: [{ src: '/projects/myfly/gallery-1.webp', caption: p('My Fly') }],
  },
  {
    slug: 'n8n-lab',
    title: { 'pt-BR': 'Lab de Automação (n8n)', en: 'Automation Lab (n8n)', fr: 'Lab d\'automatisation (n8n)' },
    tagline: {
      'pt-BR': 'Workflows que construí para estudar e aplicar automação.',
      en: 'Workflows I built to learn and apply automation.',
      fr: 'Workflows que j\'ai construits pour apprendre et appliquer l\'automatisation.',
    },
    category: ['automacao'],
    role: { 'pt-BR': 'Estudo e experimentação', en: 'Study and experimentation', fr: 'Étude et expérimentation' },
    period: '2026',
    stack: ['n8n', 'Webhooks', 'APIs REST'],
    items: [],
    cover: '/projects/n8n-lab/cover.webp',
    gallery: [],
    hidden: true,
  },
]

export const visibleProjects = projects.filter((project) => !project.hidden)

export { projects }