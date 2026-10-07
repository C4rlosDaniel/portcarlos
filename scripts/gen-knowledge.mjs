import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outFile = path.resolve(root, 'agent/knowledge.md')

const pt = (loc) => loc['pt-BR'] ?? Object.values(loc)[0] ?? ''

async function main() {
  const [{ profile }, { projects }, { skills }, { experience, formation, certifications }, { interests }] =
    await Promise.all([
      import(pathToFileURL(path.join(root, 'src/data/profile.ts')).href),
      import(pathToFileURL(path.join(root, 'src/data/projects.ts')).href),
      import(pathToFileURL(path.join(root, 'src/data/skills.ts')).href),
      import(pathToFileURL(path.join(root, 'src/data/timeline.ts')).href),
      import(pathToFileURL(path.join(root, 'src/data/interests.ts')).href),
    ])

  let repos = []
  try {
    repos = JSON.parse(fs.readFileSync(path.join(root, 'src/data/github.json'), 'utf8'))
  } catch {
    repos = []
  }

  const lines = []
  const w = (s = '') => lines.push(s)

  w('# Base de Conhecimento — Portfólio de Carlos Daniel Alencar')
  w()
  w('<!-- GERADO AUTOMATICAMENTE por scripts/gen-knowledge.mjs — não editar à mão.')
  w('     Fonte: src/data/*.ts. Regenerar com: npm run knowledge -->')
  w()
  w('Fonte oficial de verdade sobre o profissional. Não inventar informações fora desta base.')
  w()

  w('## Perfil')
  w()
  w(`- **Nome:** ${profile.name}`)
  w(`- **Cargo/atuacao:** ${pt(profile.role)}`)
  w(`- **Localizacao:** ${pt(profile.location)}`)
  for (const block of profile.about) w(`- **${pt(block.title)}:** ${pt(block.text)}`)
  w()

  w('## Links')
  w()
  w(`- LinkedIn: ${profile.links.linkedin}`)
  w(`- GitHub: ${profile.links.github}`)
  w(`- Instagram: ${profile.links.instagram}`)
  w('- Site (este portfólio): https://portcarlos.vercel.app')
  w('- Repositorio: https://github.com/C4rlosDaniel/portcarlos')
  w()

  w('## Experiencia profissional')
  w()
  for (const item of experience) {
    w(`### ${item.role['pt-BR']} — ${item.organization} (${item.period})`)
    w()
    w(`- Local: ${item.location}${item.mode === 'remote' ? ' (remoto)' : item.mode === 'onSite' ? ' (presencial)' : ''}`)
    for (const b of item.bullets) w(`- ${pt(b)}`)
    w()
  }

  w('## Formacao')
  w()
  for (const item of formation) w(`- **${item.role['pt-BR']}** — ${item.organization}, ${item.location} (${item.period})`)
  w()

  w('## Certificacoes')
  w()
  for (const c of certifications) w(`- ${c}`)
  w()

  w('## Projetos')
  w()
  const visible = projects.filter((p) => !p.hidden)
  for (const proj of visible) {
    w(`### ${proj.title['pt-BR']} (slug: ${proj.slug})`)
    w()
    w(`- Resumo: ${pt(proj.tagline)}`)
    w(`- Papel: ${pt(proj.role)}`)
    w(`- Periodo: ${proj.period}`)
    w(`- Categoria: ${proj.category.join(', ')}`)
    w(`- Stack: ${proj.stack.join(', ')}`)
    if (proj.liveUrl) w(`- Link: ${proj.liveUrl}${proj.access === 'login' ? ' (requer login)' : ''}`)
    if (proj.problem) w(`- Problema: ${pt(proj.problem)}`)
    if (proj.solution) w(`- Solucao: ${pt(proj.solution)}`)
    if (proj.decisions?.length) {
      w('- Decisoes:')
      for (const d of proj.decisions) w(`  - ${pt(d)}`)
    }
    if (proj.result) w(`- Resultado: ${pt(proj.result)}`)
    else w('- Resultado: nao informado na base.')
    w()
  }
  const hidden = projects.filter((p) => p.hidden)
  if (hidden.length) {
    w('### Projetos ocultos (nao exibidos no site)')
    w()
    for (const proj of hidden) w(`- ${proj.title['pt-BR']} (slug: ${proj.slug}) — ${pt(proj.tagline)} — stack: ${proj.stack.join(', ')}`)
    w()
  }

  w('## Habilidades')
  w()
  for (const skill of skills) {
    const status = skill.status === 'producao' ? 'em producao' : 'em estudo'
    const used = skill.usedIn.length ? `; usada em: ${skill.usedIn.join(', ')}` : ''
    w(`- **${skill.name['pt-BR']}** [${status}]: ${pt(skill.summary)} Ferramentas: ${skill.tools.join(', ')}${used}`)
  }
  w()

  w('## Idiomas')
  w()
  w('- Portugues: nativo')
  w('- Ingles: C1')
  w('- Frances: C1')
  w('- Espanhol: B1')
  w('- Alemao: em aprendizado')
  w()

  w('## Interesses fora do computador')
  w()
  w(`- ${interests.map((i) => i.label['pt-BR']).join('; ')}`)
  w()

  w('## Repositorios GitHub (atualizado automaticamente)')
  w()
  if (repos.length) {
    for (const r of repos.slice(0, 20)) {
      w(`- ${r.name}${r.language ? ` (${r.language})` : ''}${r.description ? ` — ${r.description}` : ''}: ${r.html_url}`)
    }
  } else {
    w('- Indisponivel no momento.')
  }
  w()

  w('## Contato')
  w()
  w('- Formulario no site: https://portcarlos.vercel.app/contato')
  w('- E-mail (fallback do formulario): devclub152@gmail.com')
  w('- LinkedIn: https://www.linkedin.com/in/carlos-alencar-22b950353')
  w()

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, lines.join('\n'))
  console.log(`gen-knowledge: wrote ${path.relative(root, outFile)} (${lines.length} lines)`)
}

main().catch((err) => {
  console.error(`gen-knowledge: failed (${err.message})`)
  process.exit(1)
})
