import type { Localized } from '../i18n'
import type { Project } from '../data/projects'
import type { Skill } from '../data/skills'
import { visibleProjects } from '../data/projects'
import { skills } from '../data/skills'
import { detectLang, normalize, padded, type Lang } from './normalize'
import { findProject, findSkill, findTechProject } from './entities'
import { buildIntent, fallbackReply, matchIntent, type Reply, type ReplyLink } from './intents'

export type AssistantState = {
  lastProjectSlug?: string
  lastSkillId?: string
}

export type Answer = {
  reply: Reply
  lang: Lang
  state: AssistantState
}

const chipsFor: Record<Lang, Record<'project' | 'skill', string[]>> = {
  'pt-BR': {
    project: ['Problema', 'Solução', 'Decisões', 'Resultado', 'Stack'],
    skill: ['Ver no mapa', 'Outras skills', 'Projetos'],
  },
  en: {
    project: ['Problem', 'Solution', 'Decisions', 'Result', 'Stack'],
    skill: ['View on map', 'Other skills', 'Projects'],
  },
  fr: {
    project: ['Problème', 'Solution', 'Décisions', 'Résultat', 'Stack'],
    skill: ['Voir sur la carte', 'Autres compétences', 'Projets'],
  },
}

type Field =
  | 'problem'
  | 'solution'
  | 'decisions'
  | 'result'
  | 'stack'
  | 'link'
  | 'period'

const FIELD_PATTERNS: { field: Field; words: string[] }[] = [
  {
    field: 'problem',
    words: ['problema', 'problemas', 'dor', 'problem', 'issues', 'pain point', 'probleme'],
  },
  {
    field: 'solution',
    words: ['solucao', 'como funciona', 'solution', 'how does it work', 'works exactly', 'fonctionne', 'principe'],
  },
  {
    field: 'decisions',
    words: ['decisoes', 'escolhas', 'decisions', 'technical decisions', 'choix techniques', 'architeture'],
  },
  {
    field: 'result',
    words: ['resultado', 'resultados', 'impacto', 'result', 'impact', 'outcome', 'resultat', 'gains'],
  },
  {
    field: 'stack',
    words: ['stack', 'tecnologias', 'ferramentas', 'feito com', 'built with', 'technologies', 'technologies utilisees'],
  },
  {
    field: 'link',
    words: ['link', 'url', 'abrir', 'abre', 'acessar', 'site', 'online', 'open', 'live', 'voir le site'],
  },
  {
    field: 'period',
    words: ['quando', 'periodo', 'ano', 'when', 'year', 'date', 'quand', 'periode'],
  },
]

function hasWord(text: string, words: string[]): boolean {
  const hay = padded(normalize(text))
  return words.some((word) => hay.includes(` ${normalize(word)} `))
}

function detectField(text: string): Field | undefined {
  for (const entry of FIELD_PATTERNS) {
    if (hasWord(text, entry.words)) return entry.field
  }
  return undefined
}

function projectById(slug: string | undefined): Project | undefined {
  return visibleProjects.find((project) => project.slug === slug)
}

function skillById(id: string | undefined): Skill | undefined {
  return skills.find((skill) => skill.id === id)
}

function projectLinks(project: Project, lang: Lang): ReplyLink[] | undefined {
  if (!project.liveUrl) return undefined
  const label = { 'pt-BR': 'Abrir sistema', en: 'Open system', fr: 'Ouvrir le système' } as Localized
  return [
    { label: label[lang], href: project.liveUrl },
    { label: { 'pt-BR': 'Ver no portfólio', en: 'View in portfolio', fr: 'Voir dans le portfolio' }[lang], to: `/projetos/${project.slug}` },
  ]
}

function projectOverview(project: Project, lang: Lang): Reply {
  const links = projectLinks(project, lang)
  const open = { 'pt-BR': 'Quer saber o problema, a solução ou as decisões técnicas?', en: 'Want the problem, the solution or the technical decisions?', fr: 'Vous voulez le problème, la solution ou les décisions techniques ?' } as Localized
  const text = [
    `${project.title[lang]} (${project.period})`,
    project.tagline[lang],
    project.role[lang],
    open[lang],
  ].join(' ')
  return { text, chips: chipsFor[lang].project, links }
}

function projectField(project: Project, field: Field, lang: Lang): Reply {
  const base = projectOverview(project, lang)
  let extra = ''
  switch (field) {
    case 'problem':
      extra = project.problem?.[lang] ?? ''
      break
    case 'solution':
      extra = project.solution?.[lang] ?? ''
      break
    case 'decisions':
      extra = project.decisions?.map((item) => `• ${item[lang]}`).join(' ') ?? ''
      break
    case 'result':
      extra = project.result?.[lang] ?? ''
      break
    case 'stack':
      extra = project.stack.join(' · ')
      break
    case 'period':
      extra = `${project.period} — ${project.role[lang]}`
      break
    case 'link':
      extra = project.liveUrl ?? ''
      break
  }
  if (!extra) {
    const missing = {
      'pt-BR': 'Esse projeto ainda não publicou esse campo no portfólio.',
      en: "This project hasn't published that field in the portfolio yet.",
      fr: 'Ce projet n\'a pas encore publié ce champ dans le portfolio.',
    } as Localized
    extra = missing[lang]
  }
  return { text: `${project.title[lang]} — ${extra}`, chips: base.chips, links: base.links }
}

function skillDetail(skill: Skill, lang: Lang): Reply {
  const used = skill.usedIn
    .map((slug) => visibleProjects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project))
    .map((project) => project.title[lang].split(' — ')[0])
  const status = {
    'pt-BR': skill.status === 'producao' ? 'Em produção' : 'Em estudo',
    en: skill.status === 'producao' ? 'In production' : 'Learning',
    fr: skill.status === 'producao' ? 'En production' : 'En cours d\'apprentissage',
  } as Localized
  const usedLabel = {
    'pt-BR': used.length ? ` Usada em: ${used.join(', ')}.` : '',
    en: used.length ? ` Used in: ${used.join(', ')}.` : '',
    fr: used.length ? ` Utilisée dans : ${used.join(', ')}.` : '',
  } as Localized
  const text = `${skill.name[lang]} — ${status[lang]}. ${skill.summary[lang]} Ferramentas: ${skill.tools.join(', ')}.${usedLabel[lang]}`
  return {
    text,
    chips: chipsFor[lang].skill,
    links: [{ label: { 'pt-BR': 'Ver no mapa', en: 'View on map', fr: 'Voir sur la carte' }[lang], to: `/skills/${skill.id}` }],
  }
}

export function greet(lang: Lang): Reply {
  return buildIntent('greeting', lang)
}

export function ask(input: string, siteLang: Lang, state: AssistantState = {}): Answer {
  const lang = detectLang(input, siteLang)
  const text = input.trim()

  const project = findProject(text)
  if (project) {
    const field = detectField(text)
    const reply = field ? projectField(project, field, lang) : projectOverview(project, lang)
    return { reply, lang, state: { ...state, lastProjectSlug: project.slug } }
  }

  const skill = findSkill(text)
  if (skill) {
    return { reply: skillDetail(skill, lang), lang, state: { ...state, lastSkillId: skill.id } }
  }

  const tech = findTechProject(text)
  if (tech) {
    return {
      reply: {
        text: `${tech.tech} aparece no stack do projeto ${tech.project.title[lang].split(' — ')[0]}. Stack completo: ${tech.project.stack.join(' · ')}.`,
        chips: chipsFor[lang].project,
        links: [{ label: 'Ver projeto', to: `/projetos/${tech.project.slug}` }],
      },
      lang,
      state: { ...state, lastProjectSlug: tech.project.slug },
    }
  }

  const field = detectField(text)
  if (field) {
    const contextProject = projectById(state.lastProjectSlug)
    const contextSkill = skillById(state.lastSkillId)
    if (contextProject) {
      return {
        reply: projectField(contextProject, field, lang),
        lang,
        state: { ...state, lastProjectSlug: contextProject.slug },
      }
    }
    if (contextSkill) {
      return { reply: skillDetail(contextSkill, lang), lang, state }
    }
    const intent = matchIntent(text)
    if (intent) {
      return { reply: buildIntent(intent.id, lang), lang, state }
    }
    const hint = {
      'pt-BR': 'Essa pergunta parece ser sobre um projeto — me diga qual (ClubeON, ClubStrategy, Clubingo, My Fly ou Lume) ou toque em um dos projetos na página.',
      en: 'That question seems to be about a project — tell me which one (ClubeON, ClubStrategy, Clubingo, My Fly or Lume) or open one from the projects page.',
      fr: 'Cette question semble porter sur un projet — dites lequel (ClubeON, ClubStrategy, Clubingo, My Fly ou Lume) ou ouvrez-en un depuis la page projets.',
    } as Localized
    return { reply: { text: hint[lang], chips: projectChipNames(lang) }, lang, state }
  }

  const intent = matchIntent(text)
  if (intent) {
    return { reply: buildIntent(intent.id, lang), lang, state }
  }

  if (isThanksOnly(text)) {
    return { reply: buildIntent('thanks', lang), lang, state }
  }

  return { reply: fallbackReply(lang), lang, state }
}

function projectChipNames(lang: Lang): string[] {
  return visibleProjects.map((project) => project.title[lang].split(' — ')[0])
}

function isThanksOnly(text: string): boolean {
  const hay = normalize(text)
  return hay === 'ok' || hay === 'okay' || hay === 'sim' || hay === 'yes' || hay === 'oui'
}
