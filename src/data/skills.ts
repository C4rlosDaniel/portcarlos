import type { Localized } from '../i18n'

export type SkillStatus = 'producao' | 'estudando'

export type Skill = {
  id: string
  name: Localized
  status: SkillStatus
  summary: Localized
  tools: string[]
  usedIn: string[]
  colors: [string, string]
  size: 1 | 2 | 3
  orbitSeconds: number
}

export const orbitRadii = [130, 185, 240, 295, 350, 405, 450, 480]

export const skills: Skill[] = [
  {
    id: 'automacao',
    name: { 'pt-BR': 'Automação & Workflows', en: 'Automation & Workflows', fr: 'Automatisation & Workflows' },
    status: 'estudando',
    summary: {
      'pt-BR': 'Automatizo tarefas e integro sistemas com n8n, APIs e webhooks, em fluxos simples e confiáveis.',
      en: 'I automate tasks and integrate systems with n8n, APIs and webhooks, in simple, reliable flows.',
      fr: 'J\'automatise les tâches et j\'intègre les systèmes avec n8n, les API et les webhooks, dans des flux simples et fiables.',
    },
    tools: ['n8n', 'Webhooks', 'APIs REST', 'integrações'],
    usedIn: ['myfly'],
    colors: ['#7c5cff', '#22d3ee'],
    size: 2,
    orbitSeconds: 40,
  },
  {
    id: 'web',
    name: { 'pt-BR': 'Web & Front-end', en: 'Web & Front-end', fr: 'Web & Front-end' },
    status: 'producao',
    summary: {
      'pt-BR': 'Construo interfaces web com HTML, CSS e JavaScript — foi assim que os sistemas do Clube Pirassununga saíram do papel.',
      en: 'I build web interfaces with HTML, CSS and JavaScript — that\'s how the Clube Pirassununga systems came to life.',
      fr: 'Je construis des interfaces web avec HTML, CSS et JavaScript — c\'est ainsi que les systèmes du Clube Pirassununga sont nés.',
    },
    tools: ['HTML5', 'CSS3', 'JavaScript'],
    usedIn: ['clubeon', 'clubstrategy', 'clubingo', 'myfly', 'lume'],
    colors: ['#f472b6', '#a78bfa'],
    size: 3,
    orbitSeconds: 55,
  },
  {
    id: 'dados',
    name: { 'pt-BR': 'Dados & Backend', en: 'Data & Backend', fr: 'Données & Backend' },
    status: 'producao',
    summary: {
      'pt-BR': 'Modelo e consulto dados com PostgreSQL e Supabase, incluindo sincronização em tempo real.',
      en: 'I model and query data with PostgreSQL and Supabase, including real-time sync.',
      fr: 'Je modélise et j\'interroge les données avec PostgreSQL et Supabase, y compris la synchronisation en temps réel.',
    },
    tools: ['PostgreSQL', 'Supabase', 'SQL'],
    usedIn: ['clubeon', 'clubstrategy', 'clubingo'],
    colors: ['#34d399', '#22d3ee'],
    size: 3,
    orbitSeconds: 70,
  },
  {
    id: 'ia',
    name: { 'pt-BR': 'IA aplicada ao desenvolvimento', en: 'AI applied to development', fr: 'IA appliquée au développement' },
    status: 'producao',
    summary: {
      'pt-BR': 'Uso IA no dia a dia para acelerar o desenvolvimento e a automação, revisando o que vai para produção.',
      en: 'I use AI daily to speed up development and automation while reviewing what reaches production.',
      fr: 'J\'utilise l\'IA au quotidien pour accélérer le développement et l\'automatisation, en révisant ce qui part en production.',
    },
    tools: ['Antigravity', 'OpenCode', 'engenharia de prompt'],
    usedIn: ['clubeon', 'clubstrategy', 'clubingo', 'myfly'],
    colors: ['#a78bfa', '#f472b6'],
    size: 2,
    orbitSeconds: 85,
  },
  {
    id: 'infra',
    name: { 'pt-BR': 'Infraestrutura & Suporte', en: 'Infrastructure & Support', fr: 'Infrastructure & Support' },
    status: 'producao',
    summary: {
      'pt-BR': 'Instalo, configuro e mantenho equipamentos, redes e estações de trabalho, com atendimento presencial.',
      en: 'I install, configure and maintain equipment, networks and workstations, with on-site support.',
      fr: 'J\'installe, configure et maintiens les équipements, les réseaux et les postes de travail, avec un support sur site.',
    },
    tools: ['Hardware', 'Redes', 'Windows', 'inventário de TI', 'atendimento em campo'],
    usedIn: [],
    colors: ['#fbbf24', '#fb923c'],
    size: 3,
    orbitSeconds: 100,
  },
  {
    id: 'python',
    name: { 'pt-BR': 'Python & Dados', en: 'Python & Data', fr: 'Python & Données' },
    status: 'estudando',
    summary: {
      'pt-BR': 'Estudo Python, com noções de machine learning e análise de dados.',
      en: 'I\'m learning Python, with basics of machine learning and data analysis.',
      fr: 'J\'apprends Python, avec des notions de machine learning et d\'analyse de données.',
    },
    tools: ['Python', 'noções de ML e análise de dados'],
    usedIn: [],
    colors: ['#facc15', '#34d399'],
    size: 1,
    orbitSeconds: 115,
  },
  {
    id: 'idiomas',
    name: { 'pt-BR': 'Idiomas', en: 'Languages', fr: 'Langues' },
    status: 'producao',
    summary: {
      'pt-BR': 'Comunico em português (nativo), inglês e francês (C1) e espanhol (B1).',
      en: 'I communicate in Portuguese (native), English and French (C1) and Spanish (B1).',
      fr: 'Je communique en portugais (natif), en anglais et en français (C1) et en espagnol (B1).',
    },
    tools: ['Inglês C1', 'Francês C1', 'Espanhol B1', 'Português nativo'],
    usedIn: [],
    colors: ['#38bdf8', '#818cf8'],
    size: 2,
    orbitSeconds: 130,
  },
  {
    id: 'ensino',
    name: { 'pt-BR': 'Ensino & Comunicação', en: 'Teaching & Communication', fr: 'Enseignement & Communication' },
    status: 'producao',
    summary: {
      'pt-BR': 'Ensino Informática e Pacote Office e acompanho alunos de perto, desenvolvendo didática e comunicação.',
      en: 'I teach IT and Office Suite and support students closely, developing my teaching and communication.',
      fr: 'J\'enseigne l\'informatique et le Pack Office et j\'accompagne les élèves de près, en développant pédagogie et communication.',
    },
    tools: ['Pacote Office', 'didática', 'monitoria'],
    usedIn: [],
    colors: ['#fb7185', '#f59e0b'],
    size: 1,
    orbitSeconds: 145,
  },
]