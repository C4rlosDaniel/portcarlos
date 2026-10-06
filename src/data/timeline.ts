import type { Localized } from '../i18n'

export type TimelineItem = {
  period: string
  role: Localized
  organization: string
  location: string
  mode?: 'remote' | 'onSite'
  bullets: Localized[]
}

export const experience: TimelineItem[] = [
  {
    period: 'Out/2026 – atual',
    role: { 'pt-BR': 'Analista de Sistemas', en: 'Systems Analyst', fr: 'Analyste de Systèmes' },
    organization: 'My Fly Automação Comercial',
    location: 'Pirassununga, SP',
    bullets: [
      {
        'pt-BR':
          'Desenvolvimento, manutenção e evolução de sistemas alinhados às necessidades dos clientes e aos processos de negócio.',
        en: 'Development, maintenance and evolution of systems aligned with client needs and business processes.',
        fr: 'Développement, maintenance et évolution de systèmes alignés sur les besoins des clients et les processus métier.',
      },
      {
        'pt-BR': 'Automação de processos e rotinas para reduzir tarefas manuais e aumentar a eficiência dos sistemas.',
        en: 'Automation of processes and routines to cut manual tasks and increase system efficiency.',
        fr: 'Automatisation des processus et des routines pour réduire les tâches manuelles et augmenter l\'efficacité des systèmes.',
      },
      {
        'pt-BR': 'Análise de requisitos, integração e suporte a sistemas, identificando problemas e implementando melhorias.',
        en: 'Requirements analysis, integration and system support, identifying problems and implementing improvements.',
        fr: 'Analyse des besoins, intégration et support des systèmes, identification des problèmes et mise en place d\'améliorations.',
      },
    ],
  },
  {
    period: 'Mar/2026 – Set/2026',
    role: { 'pt-BR': 'Estagiário de TI — Suporte e Infraestrutura', en: 'IT Intern — Support and Infrastructure', fr: 'Stagiaire IT — Support et Infrastructure' },
    organization: 'Clube Pirassununga',
    location: 'Pirassununga, SP',
    bullets: [
      {
        'pt-BR':
          'Desenvolvi o ClubeON CCP, que automatizou a distribuição de conteúdos corporativos para TVs, monitores e dispositivos conectados com sincronização em tempo real, substituindo atualizações manuais.',
        en: 'I built ClubeON CCP, which automated the distribution of corporate content to TVs, monitors and connected devices with real-time sync, replacing manual updates.',
        fr: 'J\'ai développé ClubeON CCP, qui a automatisé la distribution de contenus d\'entreprise aux téléviseurs, moniteurs et appareils connectés avec synchronisation en temps réel, remplaçant les mises à jour manuelles.',
      },
      {
        'pt-BR': 'Também desenvolvi o ClubStrategy e o Clubingo para o clube.',
        en: 'I also built ClubStrategy and Clubingo for the club.',
        fr: 'J\'ai aussi développé ClubStrategy et Clubingo pour le club.',
      },
      {
        'pt-BR':
          'Instalação, configuração e manutenção de equipamentos de informática, controle de inventário e melhorias tecnológicas.',
        en: 'Installation, configuration and maintenance of computer equipment, inventory control and technology improvements.',
        fr: 'Installation, configuration et maintenance des équipements informatiques, contrôle d\'inventaire et améliorations technologiques.',
      },
    ],
  },
  {
    period: 'Abr/2026 – Out/2026',
    role: { 'pt-BR': 'Professor de Informática e Pacote Office — Monitoria Acadêmica', en: 'IT and Office Suite Teacher — Academic Monitoring', fr: 'Professeur d\'informatique et de Pack Office — Monitorat académique' },
    organization: 'FATECE',
    location: 'Pirassununga, SP',
    bullets: [
      {
        'pt-BR': 'Planejamento e condução de aulas de Informática e Pacote Office.',
        en: 'Planning and teaching IT and Office Suite classes.',
        fr: 'Planification et conduite de cours d\'informatique et de Pack Office.',
      },
      {
        'pt-BR': 'Suporte individual e coletivo a alunos, desenvolvendo didática, comunicação e liderança.',
        en: 'Individual and group support for students, developing teaching skills, communication and leadership.',
        fr: 'Accompagnement individuel et collectif des élèves, en développant pédagogie, communication et leadership.',
      },
    ],
  },
  {
    period: 'Set/2025 – Set/2026',
    role: { 'pt-BR': 'Técnico de Campo de T.I (Freelancer)', en: 'Field IT Technician (Freelancer)', fr: 'Technicien IT de Terrain (Freelance)' },
    organization: 'Vexus I.T',
    location: 'São Paulo',
    mode: 'onSite',
    bullets: [
      {
        'pt-BR': 'Atendimento técnico presencial a empresas parceiras: diagnóstico e resolução de incidentes de hardware, software e redes.',
        en: 'On-site technical support to partner companies: diagnosing and resolving hardware, software and network incidents.',
        fr: 'Support technique sur site auprès d\'entreprises partenaires : diagnostic et résolution d\'incidents matériels, logiciels et réseaux.',
      },
      {
        'pt-BR': 'Instalação, configuração e manutenção de equipamentos e sistemas.',
        en: 'Installation, configuration and maintenance of equipment and systems.',
        fr: 'Installation, configuration et maintenance des équipements et systèmes.',
      },
    ],
  },
  {
    period: 'Mar/2025 – Fev/2026',
    role: { 'pt-BR': 'Estagiário de Suporte Bilíngue (Inglês e Francês)', en: 'Bilingual Support Intern (English and French)', fr: 'Stagiaire en Support Bilingue (anglais et français)' },
    organization: 'Teleperformance',
    location: 'São Paulo',
    mode: 'remote',
    bullets: [
      {
        'pt-BR': 'Suporte técnico bilíngue a usuários internos: incidentes de hardware, software e conectividade.',
        en: 'Bilingual technical support for internal users: hardware, software and connectivity incidents.',
        fr: 'Support technique bilingue aux utilisateurs internes : incidents matériels, logiciels et de connectivité.',
      },
      {
        'pt-BR': 'Configuração, atualização e manutenção de estações de trabalho, periféricos e aplicações corporativas.',
        en: 'Configuration, update and maintenance of workstations, peripherals and corporate applications.',
        fr: 'Configuration, mise à jour et maintenance des postes de travail, périphériques et applications d\'entreprise.',
      },
    ],
  },
  {
    period: 'Mar/2024 – Fev/2025',
    role: { 'pt-BR': 'Técnico de T.I (Serviço Militar)', en: 'IT Technician (Military Service)', fr: 'Technicien IT (Service militaire)' },
    organization: 'Exército Brasileiro — 13º RCMEC',
    location: 'Pirassununga, SP',
    bullets: [
      {
        'pt-BR': 'Suporte de TI a setores internos: configuração de equipamentos, manutenção básica e demandas técnicas do dia a dia.',
        en: 'IT support for internal departments: equipment setup, basic maintenance and daily technical requests.',
        fr: 'Support IT aux secteurs internes : configuration des équipements, maintenance de base et demandes techniques quotidiennes.',
      },
      {
        'pt-BR': 'Atuação nas áreas administrativa e jurídica: gestão de documentos, organização de processos e apoio na elaboração de relatórios.',
        en: 'Work in administrative and legal areas: document management, process organization and report writing support.',
        fr: 'Intervention dans les domaines administratif et juridique : gestion des documents, organisation des processus et aide à la rédaction de rapports.',
      },
    ],
  },
  {
    period: 'Fev/2021 – Jan/2022',
    role: { 'pt-BR': 'Tradutor Freelancer (temporário)', en: 'Freelance Translator (temporary)', fr: 'Traducteur Freelance (temporaire)' },
    organization: 'OpenSenses — Acessibilidade Comunicacional',
    location: 'São Paulo',
    bullets: [
      {
        'pt-BR': 'Tradução de documentos, reuniões e materiais técnicos em inglês, com precisão e consistência terminológica.',
        en: 'Translation of documents, meetings and technical materials in English, with accuracy and terminological consistency.',
        fr: 'Traduction de documents, réunions et documents techniques en anglais, avec précision et cohérence terminologique.',
      },
      {
        'pt-BR': 'Suporte linguístico a equipes internas e clientes, com foco em comunicação clara.',
        en: 'Language support for internal teams and clients, focused on clear communication.',
        fr: 'Soutien linguistique aux équipes internes et aux clients, axé sur une communication claire.',
      },
    ],
  },
]

export const formation: TimelineItem[] = [
  {
    period: '03/2025 – previsão 12/2028',
    role: { 'pt-BR': 'Bacharelado em Ciência da Computação', en: 'Bachelor\'s in Computer Science', fr: 'Licence en informatique' },
    organization: 'FATECE',
    location: 'Pirassununga — SP',
    bullets: [],
  },
  {
    period: 'Jul/2023 – Dez/2024',
    role: {
      'pt-BR': 'Técnico em Eletrônica',
      en: 'Electronics Technician',
      fr: 'Technicien en électronique',
    },
    organization: 'ETEC',
    location: 'Pirassununga — SP',
    bullets: [],
  },
]

export const certifications: string[] = [
  'Criando um Projeto com Interface Gráfica utilizando a linguagem Python',
  'Certificado de Extensão Universitário',
  'Fundamentos da Engenharia de Software — Faculdade Metropolitana',
  'Segurança em Tecnologia da Informação — Faculdade Metropolitana',
  'Lógica de Programação em Python Developer',
  'Crie um site simples usando HTML, CSS e JavaScript',
  'Introdução à Análise de Dados — Microsoft Power BI',
]