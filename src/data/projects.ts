import type { Localized } from '../i18n'

export type Category = 'sistemas' | 'landing' | 'automacao'
export type Access = 'public' | 'login'

export type GalleryItem = {
  src: string
  thumb?: string
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
    stack: [
      'PostgreSQL',
      'Supabase',
      'JavaScript',
      'IA no desenvolvimento',
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
    ],
    result: {
      'pt-BR': 'Conteúdo publicado uma vez passa a valer para todos os terminais, no lugar da atualização manual tela por tela.',
      en: 'Content published once applies to every terminal, replacing manual screen-by-screen updates.',
      fr: 'Le contenu publié une fois s\'applique à tous les terminaux, à la place de la mise à jour manuelle écran par écran.',
    },
    cover: '/projects/clubeon/cover.webp',
    gallery: [
      { src: '/projects/clubeon/gallery-1.webp', thumb: '/projects/clubeon/gallery-1-thumb.webp', caption: p('ClubeON') },
      {
        src: '/projects/clubeon/gallery-2.webp',
        thumb: '/projects/clubeon/gallery-2-thumb.webp',
        caption: {
          'pt-BR': 'Painel administrativo e prévia de TV',
          en: 'Admin panel and TV preview',
          fr: 'Panneau d\'administration et prévision TV',
        },
      },
      {
        src: '/projects/clubeon/gallery-3.webp',
        thumb: '/projects/clubeon/gallery-3-thumb.webp',
        caption: {
          'pt-BR': 'Editor de apresentação',
          en: 'Presentation editor',
          fr: 'Éditeur de présentation',
        },
      },
      {
        src: '/projects/clubeon/gallery-4.webp',
        thumb: '/projects/clubeon/gallery-4-thumb.webp',
        caption: {
          'pt-BR': 'Atribuição de apresentações aos terminais',
          en: 'Assigning presentations to terminals',
          fr: 'Attribution des présentations aux terminaux',
        },
      },
      {
        src: '/projects/clubeon/gallery-5.webp',
        thumb: '/projects/clubeon/gallery-5-thumb.webp',
        caption: { 'pt-BR': 'Biblioteca de mídias', en: 'Media library', fr: 'Médiathèque' },
      },
      {
        src: '/projects/clubeon/gallery-6.webp',
        thumb: '/projects/clubeon/gallery-6-thumb.webp',
        caption: {
          'pt-BR': 'Faixa de notícias (rodapé)',
          en: 'News ticker (footer)',
          fr: 'Bandeau d\'actualités (pied de page)',
        },
      },
      {
        src: '/projects/clubeon/gallery-7.webp',
        thumb: '/projects/clubeon/gallery-7-thumb.webp',
        caption: {
          'pt-BR': 'SplitScreen — listagem de layouts',
          en: 'SplitScreen — layout list',
          fr: 'SplitScreen — liste des dispositions',
        },
      },
      {
        src: '/projects/clubeon/gallery-8.webp',
        thumb: '/projects/clubeon/gallery-8-thumb.webp',
        caption: {
          'pt-BR': 'Editor de layout SplitScreen',
          en: 'SplitScreen layout editor',
          fr: 'Éditeur de disposition SplitScreen',
        },
      },
      {
        src: '/projects/clubeon/gallery-9.webp',
        thumb: '/projects/clubeon/gallery-9-thumb.webp',
        caption: {
          'pt-BR': 'Estúdio de transmissão ao vivo',
          en: 'Live broadcast studio',
          fr: 'Studio de diffusion en direct',
        },
      },
      {
        src: '/projects/clubeon/gallery-10.webp',
        thumb: '/projects/clubeon/gallery-10-thumb.webp',
        caption: {
          'pt-BR': 'Login (administrador / terminal)',
          en: 'Login (admin / terminal)',
          fr: 'Connexion (administrateur / terminal)',
        },
      },
      {
        src: '/projects/clubeon/gallery-11.webp',
        thumb: '/projects/clubeon/gallery-11-thumb.webp',
        caption: {
          'pt-BR': 'Terminal em execução na TV',
          en: 'Terminal running on the TV',
          fr: 'Terminal en cours sur le TV',
        },
      },
    ],
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
    stack: ['PostgreSQL', 'Supabase', 'JavaScript'],
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
    decisions: [
      {
        'pt-BR': 'Dashboard único que consolida alunos matriculados, lista de espera e turmas lotadas',
        en: 'A single dashboard consolidating enrolled students, waiting list and full classes',
        fr: 'Un tableau de bord unique regroupant élèves inscrits, liste d\'attente et classes pleines',
      },
      {
        'pt-BR': 'Resumo por modalidade para leitura rápida da ocupação',
        en: 'Summary by activity for a quick read of occupancy',
        fr: 'Résumé par activité pour une lecture rapide de l\'occupation',
      },
      {
        'pt-BR': 'Consultas agregadas sobre PostgreSQL/Supabase',
        en: 'Aggregated queries on PostgreSQL/Supabase',
        fr: 'Requêtes agrégées sur PostgreSQL/Supabase',
      },
    ],
    result: {
      'pt-BR': 'Painel único no lugar do controle disperso — visão imediata de matrículas, lista de espera e turmas lotadas.',
      en: 'A single panel instead of scattered tracking — immediate view of enrollments, waiting list and full classes.',
      fr: 'Un panneau unique à la place d\'un suivi épars — vue immédiate des inscriptions, listes d\'attente et classes pleines.',
    },
    cover: '/projects/clubstrategy/cover.webp',
    gallery: [
      {
        src: '/projects/clubstrategy/gallery-1.webp',
        thumb: '/projects/clubstrategy/gallery-1-thumb.webp',
        caption: { 'pt-BR': 'ClubStrategy — tela 1', en: 'ClubStrategy — screen 1', fr: 'ClubStrategy — écran 1' },
      },
      {
        src: '/projects/clubstrategy/gallery-2.webp',
        thumb: '/projects/clubstrategy/gallery-2-thumb.webp',
        caption: { 'pt-BR': 'ClubStrategy — tela 2', en: 'ClubStrategy — screen 2', fr: 'ClubStrategy — écran 2' },
      },
      {
        src: '/projects/clubstrategy/gallery-3.webp',
        thumb: '/projects/clubstrategy/gallery-3-thumb.webp',
        caption: { 'pt-BR': 'ClubStrategy — tela 3', en: 'ClubStrategy — screen 3', fr: 'ClubStrategy — écran 3' },
      },
      {
        src: '/projects/clubstrategy/gallery-4.webp',
        thumb: '/projects/clubstrategy/gallery-4-thumb.webp',
        caption: { 'pt-BR': 'ClubStrategy — tela 4', en: 'ClubStrategy — screen 4', fr: 'ClubStrategy — écran 4' },
      },
      {
        src: '/projects/clubstrategy/gallery-5.webp',
        thumb: '/projects/clubstrategy/gallery-5-thumb.webp',
        caption: { 'pt-BR': 'ClubStrategy — tela 5', en: 'ClubStrategy — screen 5', fr: 'ClubStrategy — écran 5' },
      },
      {
        src: '/projects/clubstrategy/gallery-6.webp',
        thumb: '/projects/clubstrategy/gallery-6-thumb.webp',
        caption: { 'pt-BR': 'ClubStrategy — tela 6', en: 'ClubStrategy — screen 6', fr: 'ClubStrategy — écran 6' },
      },
      {
        src: '/projects/clubstrategy/gallery-7.webp',
        thumb: '/projects/clubstrategy/gallery-7-thumb.webp',
        caption: { 'pt-BR': 'ClubStrategy — tela 7', en: 'ClubStrategy — screen 7', fr: 'ClubStrategy — écran 7' },
      },
    ],
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
    stack: ['Vercel', 'PWA', 'Supabase (realtime)'],
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
    decisions: [
      {
        'pt-BR': 'Sincronização em tempo real entre sorteador e conferentes (Supabase Realtime)',
        en: 'Real-time sync between drawer and checkers (Supabase Realtime)',
        fr: 'Synchronisation en temps réel entre le tirage et les contrôleurs (Supabase Realtime)',
      },
      {
        'pt-BR': 'PWA instalável no celular, sem depender de loja de aplicativos',
        en: 'PWA installable on mobile, without relying on an app store',
        fr: 'PWA installable sur mobile, sans dépendre d\'un store d\'applications',
      },
      {
        'pt-BR': 'Papéis separados (sorteador/conferente) com saída protegida por senha',
        en: 'Separate roles (drawer/checker) with a password-protected exit',
        fr: 'Rôles distincts (tireur/contrôleur) avec sortie protégée par mot de passe',
      },
    ],
    result: {
      'pt-BR': 'A conferência acompanha o sorteio em tempo real, substituindo a checagem manual das cartelas.',
      en: 'Checking follows the draw in real time, replacing manual card verification.',
      fr: 'Le contrôle suit le tirage en temps réel, remplaçant la vérification manuelle des cartes.',
    },
    cover: '/projects/clubingo/cover.webp',
    gallery: [
      { src: '/projects/clubingo/gallery-1.webp', thumb: '/projects/clubingo/gallery-1-thumb.webp', caption: p('Clubingo') },
      {
        src: '/projects/clubingo/gallery-2.webp',
        thumb: '/projects/clubingo/gallery-2-thumb.webp',
        caption: {
          'pt-BR': 'Acesso (sorteador / conferente)',
          en: 'Access (drawer / checker)',
          fr: 'Accès (tireur / contrôleur)',
        },
      },
      {
        src: '/projects/clubingo/gallery-3.webp',
        thumb: '/projects/clubingo/gallery-3-thumb.webp',
        caption: { 'pt-BR': 'Tela do sorteador', en: 'Drawer screen', fr: 'Écran du tireur' },
      },
      {
        src: '/projects/clubingo/gallery-4.webp',
        thumb: '/projects/clubingo/gallery-4-thumb.webp',
        caption: { 'pt-BR': 'Número sorteado', en: 'Drawn number', fr: 'Numéro tiré' },
      },
      {
        src: '/projects/clubingo/gallery-5.webp',
        thumb: '/projects/clubingo/gallery-5-thumb.webp',
        caption: { 'pt-BR': 'Números sorteados', en: 'Drawn numbers', fr: 'Numéros tirés' },
      },
      {
        src: '/projects/clubingo/gallery-6.webp',
        thumb: '/projects/clubingo/gallery-6-thumb.webp',
        caption: {
          'pt-BR': 'Tela do conferente (vertical)',
          en: 'Checker screen (vertical)',
          fr: 'Écran du contrôleur (vertical)',
        },
      },
      {
        src: '/projects/clubingo/gallery-7.webp',
        thumb: '/projects/clubingo/gallery-7-thumb.webp',
        caption: {
          'pt-BR': 'Tela do conferente (horizontal)',
          en: 'Checker screen (horizontal)',
          fr: 'Écran du contrôleur (horizontal)',
        },
      },
      {
        src: '/projects/clubingo/gallery-8.webp',
        thumb: '/projects/clubingo/gallery-8-thumb.webp',
        caption: {
          'pt-BR': 'Saída protegida por senha',
          en: 'Password-protected exit',
          fr: 'Sortie protégée par mot de passe',
        },
      },
    ],
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
    liveUrl: 'https://myfly.vercel.app',
    access: 'public',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'lucide-react', 'SEO local', 'Vercel'],
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
    decisions: [
      {
        'pt-BR': 'React + Vite para páginas rápidas e build estático publicado na Vercel',
        en: 'React + Vite for fast pages and a static build published on Vercel',
        fr: 'React + Vite pour des pages rapides et un build statique publié sur Vercel',
      },
      {
        'pt-BR': 'Tailwind CSS para aplicar a identidade visual escura de forma consistente',
        en: 'Tailwind CSS to apply the dark visual identity consistently',
        fr: 'Tailwind CSS pour appliquer l\'identité visuelle sombre de manière cohérente',
      },
      {
        'pt-BR': 'Framer Motion nas animações de entrada e lucide-react nos ícones',
        en: 'Framer Motion for entrance animations and lucide-react for icons',
        fr: 'Framer Motion pour les animations d\'entrée et lucide-react pour les icônes',
      },
      {
        'pt-BR': 'SEO local (Pirassununga/SP): meta tags, Open Graph e conversão direta para o WhatsApp',
        en: 'Local SEO (Pirassununga/SP): meta tags, Open Graph and direct WhatsApp conversion',
        fr: 'SEO local (Pirassununga/SP) : meta tags, Open Graph et conversion directe vers WhatsApp',
      },
    ],
    cover: '/projects/myfly/cover.webp',
    gallery: [{ src: '/projects/myfly/gallery-1.webp', thumb: '/projects/myfly/gallery-1-thumb.webp', caption: p('My Fly') }],
  },
  {
    slug: 'lume',
    title: { 'pt-BR': 'Lume Estamparia — Landing page', en: 'Lume Estamparia — Landing page', fr: 'Lume Estamparia — Landing page' },
    tagline: {
      'pt-BR':
        'Modelo de landing page para estamparia (marca fictícia) — catálogo com abas, bastidores e orçamento via WhatsApp.',
      en: 'Landing page model for a print shop (fictional brand) — tabbed catalog, behind-the-scenes gallery and quote requests via WhatsApp.',
      fr: 'Modèle de landing page pour un atelier d\'impression (marque fictive) — catalogue à onglets, coulisses et devis via WhatsApp.',
    },
    category: ['landing'],
    role: {
      'pt-BR': 'Design e desenvolvimento front-end completo (modelo conceitual)',
      en: 'Full front-end design and development (conceptual model)',
      fr: 'Conception et développement front-end complet (modèle conceptuel)',
    },
    period: '2026',
    liveUrl: 'https://modelolanding.vercel.app',
    access: 'public',
    stack: ['HTML', 'CSS', 'JavaScript', 'Google Fonts', 'Vercel'],
    problem: {
      'pt-BR':
        'Empresa fictícia de estamparia precisava de um site que apresentasse produtos, processo de produção e bastidores, e captasse pedidos de orçamento.',
      en: 'A fictional print shop needed a website presenting its products, production process and behind-the-scenes, while capturing quote requests.',
      fr: 'Une imprimerie fictive avait besoin d\'un site présentant ses produits, son processus de production et ses coulisses, tout en captant les demandes de devis.',
    },
    solution: {
      'pt-BR':
        'Landing page estática e responsiva com catálogo por abas, galeria de bastidores, depoimentos e formulário que monta a mensagem e abre o WhatsApp — sem backend.',
      en: 'Responsive static landing page with a tabbed catalog, behind-the-scenes gallery, testimonials and a form that builds the message and opens WhatsApp — no backend.',
      fr: 'Landing page statique et responsive avec catalogue à onglets, galerie de coulisses, témoignages et formulaire qui compose le message et ouvre WhatsApp — sans backend.',
    },
    decisions: [
      {
        'pt-BR': 'HTML, CSS e JavaScript puros (sem framework) para página leve e sem etapa de build',
        en: 'Plain HTML, CSS and JavaScript (no framework) for a lightweight page with no build step',
        fr: 'HTML, CSS et JavaScript purs (sans framework) pour une page légère sans étape de build',
      },
      {
        'pt-BR': 'Abas de catálogo e animações de revelação on scroll em JavaScript vanilla',
        en: 'Tabbed catalog and scroll-reveal animations in vanilla JavaScript',
        fr: 'Catalogue à onglets et animations de révélation au défilement en JavaScript vanilla',
      },
      {
        'pt-BR':
          'Formulário estático que gera a mensagem pronta e abre o WhatsApp — nenhum dado armazenado no site',
        en: 'Static form that builds the message and opens WhatsApp — no data stored on the site',
        fr: 'Formulaire statique qui compose le message et ouvre WhatsApp — aucune donnée stockée sur le site',
      },
      {
        'pt-BR': 'Identidade visual própria: paleta escura com destaque vermelho e tipografia Bebas Neue + PT Sans',
        en: 'Custom visual identity: dark palette with red accent and Bebas Neue + PT Sans typography',
        fr: 'Identité visuelle personnalisée : palette sombre avec accent rouge et typographie Bebas Neue + PT Sans',
      },
    ],
    cover: '/projects/lume/cover.webp',
    gallery: [
      {
        src: '/projects/lume/gallery-1.webp',
        thumb: '/projects/lume/gallery-1-thumb.webp',
        caption: { 'pt-BR': 'Hero — Sua arte, nossa estampa', en: 'Hero — Your art, our print', fr: 'Hero — Votre art, notre impression' },
      },
      {
        src: '/projects/lume/gallery-2.webp',
        thumb: '/projects/lume/gallery-2-thumb.webp',
        caption: { 'pt-BR': 'Sobre a Lume', en: 'About Lume', fr: 'À propos de Lume' },
      },
      {
        src: '/projects/lume/gallery-3.webp',
        thumb: '/projects/lume/gallery-3-thumb.webp',
        caption: { 'pt-BR': 'Diferenciais', en: 'Key features', fr: 'Atouts' },
      },
      {
        src: '/projects/lume/gallery-4.webp',
        thumb: '/projects/lume/gallery-4-thumb.webp',
        caption: { 'pt-BR': 'Catálogo de produtos', en: 'Product catalog', fr: 'Catalogue de produits' },
      },
      {
        src: '/projects/lume/gallery-5.webp',
        thumb: '/projects/lume/gallery-5-thumb.webp',
        caption: { 'pt-BR': 'Do orçamento à entrega', en: 'From quote to delivery', fr: 'Du devis à la livraison' },
      },
      {
        src: '/projects/lume/gallery-6.webp',
        thumb: '/projects/lume/gallery-6-thumb.webp',
        caption: { 'pt-BR': 'Bastidores e depoimentos', en: 'Behind the scenes and testimonials', fr: 'Coulisses et témoignages' },
      },
      {
        src: '/projects/lume/gallery-7.webp',
        thumb: '/projects/lume/gallery-7-thumb.webp',
        caption: { 'pt-BR': 'Formulário de orçamento', en: 'Quote form', fr: 'Formulaire de devis' },
      },
      {
        src: '/projects/lume/gallery-8.webp',
        thumb: '/projects/lume/gallery-8-thumb.webp',
        caption: { 'pt-BR': 'Contato e mapa', en: 'Contact and map', fr: 'Contact et plan' },
      },
    ],
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
