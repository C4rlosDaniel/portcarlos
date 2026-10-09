import { visibleProjects, type Project } from '../data/projects'
import { skills, type Skill } from '../data/skills'
import { normalize, padded } from './normalize'

const PROJECT_ALIASES: Record<string, string[]> = {
  clubeon: [
    'clubeon', 'clube on', 'clubeon ccp', 'transmissao digital', 'digital signage',
    'tv', 'tvs', 'monitor', 'monitores', 'painel de tv', 'conteudo nas tvs',
  ],
  clubstrategy: [
    'clubstrategy', 'club strategy', 'gestao de turmas', 'turmas', 'lista de espera',
    'alunos matriculados', 'class management',
  ],
  clubingo: [
    'clubingo', 'club ingo', 'bingo', 'cartela', 'cartelas', 'sorteio', 'sorteador',
    'conferencia de bingo', 'bingo checking',
  ],
  myfly: ['myfly', 'my fly', 'landing page', 'landing', 'my fly landing'],
  lume: ['lume', 'estamparia', 'serigrafia', 'lume estamparia', 'modelolanding'],
}

const SKILL_ALIASES: Record<string, string[]> = {
  automacao: ['automacao', 'workflows', 'n8n', 'webhooks', 'integracoes', 'api', 'apis'],
  web: ['front end', 'frontend', 'front-end', 'html', 'css', 'javascript', 'interfaces'],
  dados: ['postgres', 'postgresql', 'supabase', 'sql', 'backend', 'banco de dados'],
  ia: ['ia', 'inteligencia artificial', 'ai', 'machine learning', 'llm', 'prompt'],
  infra: ['infraestrutura', 'hardware', 'redes', 'suporte', 'windows', 'ti', 'inventario'],
  python: ['python', 'analise de dados', 'dados', 'ml'],
  idiomas: ['idiomas', 'ingles', 'english', 'frances', 'francais', 'espanhol', 'languages'],
  ensino: ['ensino', 'aula', 'aula', 'professor', 'professorado', 'monitoria', 'didatica', 'ensinar'],
}

function projectBySlug(slug: string): Project | undefined {
  return visibleProjects.find((project) => project.slug === slug)
}

function skillById(id: string): Skill | undefined {
  return skills.find((skill) => skill.id === id)
}

function matches(hay: string, alias: string): boolean {
  const needle = normalize(alias)
  if (!needle) return false
  return padded(hay).includes(` ${needle} `)
}

export function findProject(text: string): Project | undefined {
  const hay = normalize(text)
  if (!hay) return undefined
  for (const [slug, aliases] of Object.entries(PROJECT_ALIASES)) {
    for (const alias of aliases) {
      if (matches(hay, alias)) return projectBySlug(slug)
    }
  }
  return undefined
}

export function findSkill(text: string): Skill | undefined {
  const hay = normalize(text)
  if (!hay) return undefined
  for (const [id, aliases] of Object.entries(SKILL_ALIASES)) {
    for (const alias of aliases) {
      if (matches(hay, alias)) return skillById(id)
    }
  }
  return undefined
}

export type TechMatch = { tech: string; project: Project }

export function findTechProject(text: string): TechMatch | undefined {
  const hay = normalize(text)
  if (!hay) return undefined
  for (const project of visibleProjects) {
    for (const tech of project.stack) {
      if (matches(hay, tech)) return { tech, project }
    }
  }
  return undefined
}
