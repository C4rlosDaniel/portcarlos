import type { Localized } from '../i18n'

export const profile = {
  name: 'Carlos Daniel da Silva Alencar',
  shortName: 'Carlos Daniel',
  role: {
    'pt-BR': 'Analista de Sistemas & Automação',
    en: 'Systems Analyst & Automation',
    fr: 'Analyste de Systèmes & Automation',
  } as Localized,
  location: {
    'pt-BR': 'Pirassununga, SP — Brasil',
    en: 'Pirassununga, SP — Brazil',
    fr: 'Pirassununga, SP — Brésil',
  } as Localized,
  links: {
    linkedin: 'https://www.linkedin.com/in/carlos-alencar-22b950353',
    github: 'https://github.com/C4rlosDaniel',
    instagram: 'https://www.instagram.com/c4rl0s.d4niel/',
  },
  scenes: [
    {
      id: 'hello',
      kicker: { 'pt-BR': 'olá', en: 'hello', fr: 'bonjour' } as Localized,
      title: {
        'pt-BR': 'Oi, eu sou o Carlos.',
        en: 'Hi, I\'m Carlos.',
        fr: 'Salut, je suis Carlos.',
      } as Localized,
      blurb: {
        'pt-BR': 'Analista de Sistemas e Automação. Construo sistemas web que rodam de verdade.',
        en: 'Systems Analyst and Automation. I build web systems that actually run.',
        fr: 'Analyste de Systèmes et Automation. Je construis des systèmes web qui tournent vraiment.',
      } as Localized,
      to: '/sobre',
    },
    {
      id: 'production',
      kicker: { 'pt-BR': 'em produção', en: 'in production', fr: 'en production' } as Localized,
      title: { 'pt-BR': '3 sistemas no ar.', en: '3 systems live.', fr: '3 systèmes en ligne.' } as Localized,
      blurb: {
        'pt-BR':
          'Transmissão digital, controle de turmas e conferência de bingo em tempo real, criados para o Clube Pirassununga.',
        en: 'Digital signage, class management and real-time bingo checking, built for Clube Pirassununga.',
        fr: 'Affichage numérique, gestion de classes et contrôle de bingo en temps réel, créés pour le Clube Pirassununga.',
      } as Localized,
      to: '/projetos',
    },
    {
      id: 'myfly',
      kicker: { 'pt-BR': 'atualmente', en: 'currently', fr: 'actuellement' } as Localized,
      title: { 'pt-BR': 'Analista de Sistemas na My Fly.', en: 'Systems Analyst at My Fly.', fr: 'Analyste de Systèmes chez My Fly.' } as Localized,
      blurb: {
        'pt-BR':
          'Automação comercial para micro e pequenas empresas: vendas, financeiro, contratos e notas fiscais.',
        en: 'Business automation for small companies: sales, finance, contracts and invoices.',
        fr: 'Automatisation commerciale pour les très petites entreprises : ventes, finances, contrats et factures.',
      } as Localized,
      to: '/projetos/myfly',
    },
    {
      id: 'automation',
      kicker: { 'pt-BR': 'aprendendo', en: 'learning', fr: 'en apprentissage' } as Localized,
      title: { 'pt-BR': 'Automação com n8n.', en: 'Automation with n8n.', fr: 'Automatisation avec n8n.' } as Localized,
      blurb: {
        'pt-BR': 'Workflows que eliminam tarefas manuais e conectam sistemas por API e webhooks.',
        en: 'Workflows that remove manual tasks and connect systems via APIs and webhooks.',
        fr: 'Des workflows qui éliminent les tâches manuelles et connectent les systèmes via API et webhooks.',
      } as Localized,
      to: '/skills/automacao',
    },
    {
      id: 'infra',
      kicker: { 'pt-BR': 'base', en: 'foundation', fr: 'fondations' } as Localized,
      title: {
        'pt-BR': 'Da infraestrutura ao código.',
        en: 'From infrastructure to code.',
        fr: 'De l\'infrastructure au code.',
      } as Localized,
      blurb: {
        'pt-BR':
          'Suporte técnico, redes e hardware me deram o olhar de quem usa o sistema, não só de quem o escreve.',
        en: 'Tech support, networks and hardware gave me the eyes of the user, not just the coder.',
        fr: 'Le support technique, les réseaux et le matériel m\'ont donné le regard de celui qui utilise le système, pas seulement de celui qui l\'écrit.',
      } as Localized,
      to: '/trajetoria',
    },
    {
      id: 'languages',
      kicker: { 'pt-BR': 'idiomas', en: 'languages', fr: 'langues' } as Localized,
      title: {
        'pt-BR': 'Inglês, francês e português.',
        en: 'English, French and Portuguese.',
        fr: 'Anglais, français et portugais.',
      } as Localized,
      blurb: {
        'pt-BR': 'Inglês C1, francês C1, espanhol B1. Este portfólio também existe em EN e FR.',
        en: 'English C1, French C1, Spanish B1. This portfolio also exists in EN and FR.',
        fr: 'Anglais C1, français C1, espagnol B1. Ce portfolio existe aussi en EN et FR.',
      } as Localized,
      to: '/sobre',
    },
    {
      id: 'teach',
      kicker: { 'pt-BR': 'ensino', en: 'teaching', fr: 'enseignement' } as Localized,
      title: { 'pt-BR': 'Também dou aula.', en: 'I teach too.', fr: 'J\'enseigne aussi.' } as Localized,
      blurb: {
        'pt-BR': 'Monitor e professor de Informática e Pacote Office na FATECE.',
        en: 'Monitor and teacher of IT and Office Suite at FATECE.',
        fr: 'Moniteur et professeur d\'informatique et de Pack Office à la FATECE.',
      } as Localized,
      to: '/trajetoria',
    },
    {
      id: 'contact',
      kicker: { 'pt-BR': 'contato', en: 'contact', fr: 'contact' } as Localized,
      title: { 'pt-BR': 'Vamos conversar?', en: 'Shall we talk?', fr: 'On discute ?' } as Localized,
      blurb: {
        'pt-BR': 'Tem um processo manual que pode virar sistema ou automação? Me manda um cartão postal.',
        en: 'Got a manual process that could become a system or automation? Send me a postcard.',
        fr: 'Un processus manuel qui pourrait devenir un système ou une automatisation ? Envoyez-moi une carte postale.',
      } as Localized,
      to: '/contato',
    },
  ],
  about: [
    {
      title: { 'pt-BR': 'Quem sou', en: 'Who I am', fr: 'Qui je suis' } as Localized,
      text: {
        'pt-BR':
          'Sou estudante de Ciência da Computação (FATECE, previsão de conclusão em 12/2028) e atuo com suporte técnico, infraestrutura de TI e desenvolvimento de sistemas web.',
        en: 'I study Computer Science (FATECE, expected graduation 12/2028) and work with tech support, IT infrastructure and web system development.',
        fr: 'Je suis étudiant en informatique (FATECE, diplôme prévu en 12/2028) et je travaille dans le support technique, l\'infrastructure informatique et le développement de systèmes web.',
      } as Localized,
    },
    {
      title: { 'pt-BR': 'Onde atuo', en: 'Where I work', fr: 'Où je travaille' } as Localized,
      text: {
        'pt-BR':
          'Sou Analista de Sistemas na My Fly, empresa de automação comercial em Pirassununga. Antes, como estagiário de TI no Clube Pirassununga (mar–set/2026), desenvolvi os sistemas ClubeON, ClubStrategy e Clubingo.',
        en: 'I am a Systems Analyst at My Fly, a commercial automation company in Pirassununga. Before that, as an IT intern at Clube Pirassununga (Mar–Sep/2026), I built ClubeON, ClubStrategy and Clubingo.',
        fr: 'Je suis Analyste de Systèmes chez My Fly, entreprise d\'automatisation commerciale à Pirassununga. Auparavant, comme stagiaire IT au Clube Pirassununga (mars–sept. 2026), j\'ai développé ClubeON, ClubStrategy et Clubingo.',
      } as Localized,
    },
    {
      title: { 'pt-BR': 'Como eu trabalho', en: 'How I work', fr: 'Comment je travaille' } as Localized,
      text: {
        'pt-BR':
          'Parto do problema real da operação: observo o processo manual, modelo os dados (PostgreSQL/Supabase), entrego algo simples que funciona e melhoro com o feedback de quem usa.',
        en: 'I start from the real problem in the operation: I observe the manual process, model the data (PostgreSQL/Supabase), ship something simple that works and improve it with user feedback.',
        fr: 'Je pars du problème réel de l\'opération : j\'observe le processus manuel, je modélise les données (PostgreSQL/Supabase), je livre quelque chose de simple qui fonctionne et j\'améliore avec le retour des utilisateurs.',
      } as Localized,
    },
    {
      title: { 'pt-BR': 'IA como ferramenta', en: 'AI as a tool', fr: 'L\'IA comme outil' } as Localized,
      text: {
        'pt-BR':
          'Uso ferramentas de IA (como Antigravity) para acelerar o desenvolvimento e a automação, mas reviso, testo e entendo o que vai para produção.',
        en: 'I use AI tools (like Antigravity) to speed up development and automation, but I review, test and understand what goes to production.',
        fr: 'J\'utilise des outils d\'IA (comme Antigravity) pour accélérer le développement et l\'automatisation, mais je révise, teste et comprends ce qui part en production.',
      } as Localized,
    },
    {
      title: { 'pt-BR': 'Além do código', en: 'Beyond code', fr: 'Au-delà du code' } as Localized,
      text: {
        'pt-BR':
          'Sou monitor e professor de Informática e Pacote Office na FATECE, e tenho passagem pelo Exército Brasileiro como técnico de TI, o que me deu disciplina e trabalho sob pressão.',
        en: 'I am a monitor and teacher of IT and Office Suite at FATECE, and I served in the Brazilian Army as an IT technician, which gave me discipline and the ability to work under pressure.',
        fr: 'Je suis moniteur et professeur d\'informatique et de Pack Office à la FATECE, et j\'ai une expérience dans l\'armée brésilienne comme technicien IT, ce qui m\'a donné discipline et travail sous pression.',
      } as Localized,
    },
    {
      title: { 'pt-BR': 'Idiomas', en: 'Languages', fr: 'Langues' } as Localized,
      text: {
        'pt-BR':
          'Português (nativo), inglês (avançado, C1), francês (avançado, C1) e espanhol (intermediário, B1). Estou aprendendo alemão.',
        en: 'Portuguese (native), English (advanced, C1), French (advanced, C1) and Spanish (intermediate, B1). I\'m learning German.',
        fr: 'Portugais (natif), anglais (avancé, C1), français (avancé, C1) et espagnol (intermédiaire, B1). J\'apprends l\'allemand.',
      } as Localized,
    },
  ],
} as const

export const TODO = (label: string): string => `TODO(carlos): ${label}`