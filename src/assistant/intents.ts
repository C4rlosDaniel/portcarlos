import type { Localized } from '../i18n'
import { profile } from '../data/profile'
import { visibleProjects } from '../data/projects'
import { skills } from '../data/skills'
import { experience, formation, certifications } from '../data/timeline'
import type { Lang } from './normalize'
import { normalize, padded } from './normalize'

export type ReplyLink = { label: string; to?: string; href?: string }

export type Reply = {
  text: string
  chips?: string[]
  links?: ReplyLink[]
}

export type IntentId =
  | 'greeting'
  | 'self'
  | 'whoIs'
  | 'role'
  | 'location'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'formation'
  | 'certifications'
  | 'languages'
  | 'teaching'
  | 'contact'
  | 'hire'
  | 'gaps'
  | 'recommend'
  | 'promptDecline'
  | 'thanks'
  | 'fallback'

type Rule = {
  id: IntentId
  keywords: string[]
  build: (lang: Lang) => Reply
}

const t = (lang: Lang) => (value: Localized) => value[lang]

const CHIPS_DEFAULT: Record<Lang, string[]> = {
  'pt-BR': ['Quem é Carlos?', 'Projetos', 'Habilidades', 'Contato'],
  en: ['Who is Carlos?', 'Projects', 'Skills', 'Contact'],
  fr: ['Qui est Carlos ?', 'Projets', 'Compétences', 'Contact'],
}

const projectNames = (lang: Lang) =>
  visibleProjects.map((project) => project.title[lang].split(' — ')[0])

const rules: Rule[] = [
  {
    id: 'greeting',
    keywords: ['ola', 'oi', 'olá', 'bom dia', 'boa tarde', 'boa noite', 'hello', 'hi', 'hey', 'salut', 'bonjour', 'tudo bem'],
    build: (lang) => {
      const tr = t(lang)
      const text = {
        'pt-BR': `Olá! Eu sou o representante digital do ${profile.shortName} — respondo com base no conteúdo deste portfólio. Posso falar sobre projetos, habilidades, trajetória ou contato.`,
        en: `Hello! I'm ${profile.shortName}'s digital representative — I answer from this portfolio's content. I can talk about projects, skills, background or contact.`,
        fr: `Bonjour ! Je suis le représentant numérique de ${profile.shortName} — je réponds à partir du contenu de ce portfolio. Je peux parler des projets, des compétences, du parcours ou du contact.`,
      } as Localized
      return { text: tr(text), chips: CHIPS_DEFAULT[lang] }
    },
  },
  {
    id: 'self',
    keywords: ['quem e voce', 'quem es tu', 'voce e um', 'voce e uma', 'voce e bot', 'voce e ia', 'voce e inteligencia', 'what are you', 'who are you', 'are you a bot', 'are you ai', 'tu es qui', 'est tu un'],
    build: (lang) => {
      const tr = t(lang)
      const text = {
        'pt-BR': 'Sou o representante digital deste portfólio: um assistente com respostas pré-programadas, sem IA e sem custo. Tudo o que digo vem dos dados publicados aqui — projetos, habilidades e trajetória do Carlos. Não converso com modelos de linguagem externos.',
        en: "I'm this portfolio's digital representative: a pre-programmed assistant, no AI and no cost. Everything I say comes from the data published here — Carlos's projects, skills and background. I don't talk to external language models.",
        fr: 'Je suis le représentant numérique de ce portfolio : un assistant préprogrammé, sans IA et sans coût. Tout ce que je dis provient des données publiées ici — projets, compétences et parcours de Carlos. Je n\'utilise aucun modèle de langage externe.',
      } as Localized
      return { text: tr(text), chips: CHIPS_DEFAULT[lang] }
    },
  },
  {
    id: 'whoIs',
    keywords: ['quem e carlos', 'fale do carlos', 'sobre carlos', 'quem e o carlos', 'quem e ele', 'conta sobre carlos', 'quem e o dono', 'who is carlos', 'about carlos', 'tell me about carlos', 'qui est carlos', 'parlez de carlos'],
    build: (lang) => {
      const tr = t(lang)
      const about = profile.about[0].text[lang]
      const where = profile.about[1].text[lang]
      const text = {
        'pt-BR': `${profile.name} — ${tr(profile.role)}. ${about} ${where}`,
        en: `${profile.name} — ${tr(profile.role)}. ${about} ${where}`,
        fr: `${profile.name} — ${tr(profile.role)}. ${about} ${where}`,
      } as Localized
      return {
        text: tr(text),
        chips: ['Projetos', 'Trajetória', 'Habilidades'],
        links: [{ label: 'Ver trajetória', to: '/trajetoria' }],
      }
    },
  },
  {
    id: 'role',
    keywords: ['onde trabalha', 'emprego atual', 'cargo', 'funcao', 'atua', 'profissao', 'trabalha onde', 'current job', 'job title', 'role', 'what does he do', 'ou travaille', 'metier'],
    build: (lang) => {
      const tr = t(lang)
      const current = experience[0]
      const text = {
        'pt-BR': `Hoje é ${tr(current.role)} na ${current.organization} (${current.period}) — ${tr(current.bullets[0])} Antes foi estagiário de TI no Clube Pirassununga, onde construiu ClubeON, ClubStrategy e Clubingo.`,
        en: `Today he is ${tr(current.role)} at ${current.organization} (${current.period}) — ${tr(current.bullets[0])} Before that he was an IT intern at Clube Pirassununga, where he built ClubeON, ClubStrategy and Clubingo.`,
        fr: `Aujourd'hui, il est ${tr(current.role)} chez ${current.organization} (${current.period}) — ${tr(current.bullets[0])} Avant, il était stagiaire IT au Clube Pirassununga, où il a créé ClubeON, ClubStrategy et Clubingo.`,
      } as Localized
      return { text: tr(text), chips: ['Projetos', 'Experiência', 'Contato'] }
    },
  },
  {
    id: 'location',
    keywords: ['onde mora', 'onde fica', 'cidade', 'estado', 'localizacao', 'enderecos', 'where do you live', 'where is he from', 'location', 'ou habite', 'ou vit'],
    build: (lang) => {
      const tr = t(lang)
      const text = {
        'pt-BR': `Ele é de ${tr(profile.location)} — atua presencialmente na região e também de forma remota.`,
        en: `He is based in ${tr(profile.location)} — he works on-site in the region and also remotely.`,
        fr: `Il est basé à ${tr(profile.location)} — il travaille sur place dans la région et aussi à distance.`,
      } as Localized
      return { text: tr(text), chips: ['Contato', 'Experiência'] }
    },
  },
  {
    id: 'projects',
    keywords: ['projetos', 'projeto', 'projects', 'project', 'portfolio', 'trabalhos', 'works', 'realizacoes', 'realisations', 'o que ele fez', 'what did he build', 'quoi a-t-il fait'],
    build: (lang) => {
      const tr = t(lang)
      const names = (category: 'sistemas' | 'landing') =>
        visibleProjects
          .filter((project) => project.category.includes(category))
          .map((project) => project.title[lang].split(' — ')[0])
      const conjunction = { 'pt-BR': 'e', en: 'and', fr: 'et' }[lang]
      const join = (list: string[]) =>
        list.length > 1
          ? `${list.slice(0, -1).join(', ')} ${conjunction} ${list[list.length - 1]}`
          : list.join('')
      const systems = join(names('sistemas'))
      const landings = join(names('landing'))
      const text = {
        'pt-BR': `São ${visibleProjects.length} projetos publicados. Sistemas: ${systems}. Landing pages: ${landings}. Cada um tem problema, solução, decisões técnicas e resultado na página de projetos. Quer que eu detalhe algum? Também posso te levar até a página de contato.`,
        en: `There are ${visibleProjects.length} published projects. Systems: ${systems}. Landing pages: ${landings}. Each one has problem, solution, technical decisions and result on the projects page. Want me to detail one? I can also take you to the contact page.`,
        fr: `Il y a ${visibleProjects.length} projets publiés. Systèmes : ${systems}. Landing pages : ${landings}. Chacun présente le problème, la solution, les décisions techniques et le résultat sur la page projets. Je peux en détailler un ? Je peux aussi vous emmener à la page de contact.`,
      } as Localized
      return {
        text: tr(text),
        chips: projectNames(lang),
        links: [
          { label: { 'pt-BR': 'Ver projetos', en: 'View projects', fr: 'Voir les projets' }[lang], to: '/projetos' },
          { label: { 'pt-BR': 'Contato', en: 'Contact', fr: 'Contact' }[lang], to: '/contato' },
        ],
      }
    },
  },
  {
    id: 'skills',
    keywords: ['habilidades', 'habilidade', 'skills', 'skill', 'competencias', 'competences', 'tecnologias', 'stack', 'ferramentas', 'tools', 'o que ele sabe', 'what can he do', 'que sait-il'],
    build: (lang) => {
      const tr = t(lang)
      const prod = skills.filter((skill) => skill.status === 'producao').map((skill) => skill.name[lang])
      const learning = skills.filter((skill) => skill.status === 'estudando').map((skill) => skill.name[lang])
      const text = {
        'pt-BR': `Em produção: ${prod.join(', ')}. Estudando: ${learning.join(', ')}. Pergunte por uma delas para ver detalhes e em quais projetos foi usada.`,
        en: `In production: ${prod.join(', ')}. Learning: ${learning.join(', ')}. Ask about one to see details and which projects used it.`,
        fr: `En production : ${prod.join(', ')}. En cours d'apprentissage : ${learning.join(', ')}. Demandez-en une pour voir les détails et les projets concernés.`,
      } as Localized
      return {
        text: tr(text),
        chips: prod.slice(0, 3),
        links: [{ label: 'Ver mapa de skills', to: '/skills' }],
      }
    },
  },
  {
    id: 'experience',
    keywords: ['experiencia', 'experiencia profissional', 'experience', 'trabalhou', 'empregos', 'historico profissional', 'career', 'carreira', 'parcours', 'emplois'],
    build: (lang) => {
      const tr = t(lang)
      const items = experience
        .slice(0, 4)
        .map((item) => `${item.period} — ${tr(item.role)} (${item.organization})`)
        .join(' · ')
      const text = {
        'pt-BR': `Experiências recentes: ${items}. A lista completa, com o que ele fez em cada uma, está na página de trajetória.`,
        en: `Recent experience: ${items}. The full list, with what he did in each role, is on the trajectory page.`,
        fr: `Expériences récentes : ${items}. La liste complète, avec ce qu'il a fait dans chaque poste, est sur la page parcours.`,
      } as Localized
      return { text: tr(text), chips: ['Formação', 'Projetos'], links: [{ label: 'Ver trajetória', to: '/trajetoria' }] }
    },
  },
  {
    id: 'formation',
    keywords: ['formacao', 'estudou', 'faculdade', 'graduacao', 'universidade', 'curso superior', 'escola', 'educacao', 'formation', 'education', 'diplome', 'etudes', 'universite'],
    build: (lang) => {
      const tr = t(lang)
      const items = formation.map((item) => `${tr(item.role)} — ${item.organization} (${item.period})`).join(' · ')
      const text = {
        'pt-BR': `Formação: ${items}.`,
        en: `Education: ${items}.`,
        fr: `Formation : ${items}.`,
      } as Localized
      return { text: tr(text), chips: ['Certificações', 'Experiência'], links: [{ label: 'Ver trajetória', to: '/trajetoria' }] }
    },
  },
  {
    id: 'certifications',
    keywords: ['certificados', 'certificacoes', 'certificacao', 'certifications', 'certification', 'cursos livres', 'certificats'],
    build: (lang) => {
      const tr = t(lang)
      const list = certifications.join(' · ')
      const text = {
        'pt-BR': `Certificações: ${list}.`,
        en: `Certifications: ${list}.`,
        fr: `Certifications : ${list}.`,
      } as Localized
      return { text: tr(text), chips: ['Formação', 'Habilidades'], links: [{ label: 'Ver trajetória', to: '/trajetoria' }] }
    },
  },
  {
    id: 'languages',
    keywords: ['idiomas', 'languages', 'langues', 'ingles', 'english', 'frances', 'francais', 'espanhol', 'espagnol', 'alemao', 'german', 'fala ingles'],
    build: (lang) => {
      const tr = t(lang)
      const skill = skills.find((item) => item.id === 'idiomas')
      const text = skill ? tr(skill.summary) : ''
      return { text, chips: ['Habilidades', 'Contato'], links: [{ label: 'Ver skills', to: '/skills' }] }
    },
  },
  {
    id: 'teaching',
    keywords: ['ensina', 'deu aula', 'aula', 'professor', 'professora', 'ensino', 'monitor', 'teach', 'teaching', 'teacher', 'enseigne', 'enseignement', 'professeur'],
    build: (lang) => {
      const tr = t(lang)
      const item = experience.find((entry) => entry.organization === 'FATECE')
      const text = {
        'pt-BR': item
          ? `Ele foi professor de Informática e Pacote Office na FATECE (${item.period}). ${tr(item.bullets[0])} Também é monitor acadêmico e trabalhou com suporte bilíngue em inglês e francês.`
          : 'Ele dá aulas de Informática e Pacote Office na FATECE, além de ter experiência com suporte bilíngue (inglês e francês).',
        en: item
          ? `He taught IT and Office Suite at FATECE (${item.period}). ${tr(item.bullets[0])} He's also an academic monitor and worked in bilingual support (English and French).`
          : 'He teaches IT and Office Suite at FATECE, and has bilingual support experience (English and French).',
        fr: item
          ? `Il a enseigné l'informatique et le Pack Office à la FATECE (${item.period}). ${tr(item.bullets[0])} Il est aussi moniteur académique et a travaillé en support bilingue (anglais et français).`
          : "Il enseigne l'informatique et le Pack Office à la FATECE et a une expérience en support bilingue (anglais et français).",
      } as Localized
      return { text: tr(text), chips: ['Formação', 'Idiomas'] }
    },
  },
  {
    id: 'contact',
    keywords: ['contato', 'contact', 'falar com', 'email', 'e-mail', 'linkedin', 'github', 'instagram', 'telefone', 'whatsapp', 'redes sociais', 'social media', 'me contate', 'reach him', 'get in touch', 'comment le contacter', 'rejoindre'],
    build: (lang) => {
      const tr = t(lang)
      const text = {
        'pt-BR': `A melhor forma é pela página de contato (cartão postal) ou pelo LinkedIn. Também dá para chamar pelo GitHub e pelo Instagram. E-mail para contato: ${profile.shortName} via formulário do site — o formulário chega direto na caixa dele.`,
        en: `Best way is the contact page (postcard form) or LinkedIn. You can also reach him on GitHub and Instagram. To email him, use the site's contact form — it lands straight in his inbox.`,
        fr: `Le mieux est la page de contact (carte postale) ou LinkedIn. Vous pouvez aussi le joindre sur GitHub et Instagram. Pour lui écrire, utilisez le formulaire du site — il arrive directement dans sa boîte.`,
      } as Localized
      return {
        text: tr(text),
        chips: ['Contratar', 'Projetos'],
        links: [
          { label: 'Abrir contato', to: '/contato' },
          { label: 'LinkedIn', href: profile.links.linkedin },
          { label: 'GitHub', href: profile.links.github },
        ],
      }
    },
  },
  {
    id: 'hire',
    keywords: ['contratar', 'contrato', 'contratacao', 'freela', 'freelance', 'vaga', 'emprego', 'trabalhar com', 'disponivel', 'hire', 'hiring', 'job', 'available for work', 'engager', 'disponible', 'emploi'],
    build: (lang) => {
      const tr = t(lang)
      const text = {
        'pt-BR': 'O Carlos está disponível para conversar sobre vagas, projetos e freelas — principalmente sistemas web, automação e integrações. Mande uma mensagem pela página de contato ou conecte no LinkedIn; ele responde pessoalmente.',
        en: "Carlos is open to talking about roles, projects and freelance work — especially web systems, automation and integrations. Send a message through the contact page or connect on LinkedIn; he replies personally.",
        fr: 'Carlos est disponible pour discuter d\'offres, de projets et de missions freelance — surtout systèmes web, automatisation et intégrations. Envoyez un message via la page de contact ou connectez-vous sur LinkedIn ; il répond personnellement.',
      } as Localized
      return {
        text: tr(text),
        chips: ['Projetos', 'Habilidades'],
        links: [
          { label: 'Enviar mensagem', to: '/contato' },
          { label: 'LinkedIn', href: profile.links.linkedin },
        ],
      }
    },
  },
  {
    id: 'gaps',
    keywords: ['ponto fraco', 'pontos fracos', 'fragilidades', 'nao sabe', 'limitacoes', 'deficiencias', 'weakness', 'weaknesses', 'gaps', 'not good at', 'points faibles', 'faiblesses'],
    build: (lang) => {
      const tr = t(lang)
      const learning = skills
        .filter((skill) => skill.status === 'estudando')
        .map((skill) => skill.name[lang])
        .join(' e ')
      const text = {
        'pt-BR': `Ele é honesto sobre o que ainda está no processo: ${learning} estão em estudo, não em produção. O portfólio também não tem resultados numéricos por projeto ainda — o foco até agora foi entregar sistemas que rodam de verdade.`,
        en: `He's honest about what's still in progress: ${learning} are being studied, not in production yet. The portfolio also doesn't have numeric results per project yet — the focus so far was shipping systems that actually run.`,
        fr: `Il est honnête sur ce qui est encore en cours : ${learning} sont en cours d'étude, pas encore en production. Le portfolio n'a pas non plus de résultats chiffrés par projet — l'objectif jusqu'ici a été de livrer des systèmes qui tournent.`,
      } as Localized
      return { text: tr(text), chips: ['Habilidades', 'Projetos'] }
    },
  },
  {
    id: 'recommend',
    keywords: ['recomenda', 'recomendar', 'sugestao', 'sugerir', 'por onde comecar', 'o que estudar', 'dica', 'recommend', 'recommendation', 'suggest', 'what should i learn', 'where to start', 'conseil', 'recommande'],
    build: (lang) => {
      const tr = t(lang)
      const text = {
        'pt-BR': 'Pela trajetória dele, o caminho que funcionou foi: base de HTML/CSS/JavaScript, dados com PostgreSQL/Supabase, um projeto real no ar (mesmo pequeno) e automação com APIs e webhooks depois. Ele publica as decisões técnicas de cada projeto na página de projetos — vale ler como referência.',
        en: 'From his path, what worked was: an HTML/CSS/JavaScript base, data with PostgreSQL/Supabase, one real project live (even a small one), then automation with APIs and webhooks. He publishes the technical decisions of each project on the projects page — worth reading as a reference.',
        fr: 'D\'après son parcours, ce qui a fonctionné : une base HTML/CSS/JavaScript, des données avec PostgreSQL/Supabase, un projet réel en ligne (même petit), puis l\'automatisation avec API et webhooks. Il publie les décisions techniques de chaque projet sur la page projets — à lire comme référence.',
      } as Localized
      return { text: tr(text), chips: ['Projetos', 'Habilidades'], links: [{ label: 'Ver projetos', to: '/projetos' }] }
    },
  },
  {
    id: 'promptDecline',
    keywords: ['ignore instrucoes', 'instrucoes anteriores', 'system prompt', 'prompt do sistema', 'ignore previous', 'disregard instructions', 'jailbreak', 'ignore les instructions', 'mode developpeur'],
    build: (lang) => {
      const tr = t(lang)
      const text = {
        'pt-BR': 'Não tenho instruções ocultas para ignorar: sou um conjunto de respostas pré-programadas, sem modelo de linguagem por trás. Posso seguir respondendo sobre o portfólio do Carlos.',
        en: "I have no hidden instructions to ignore: I'm a set of pre-programmed responses, with no language model behind me. I can keep answering about Carlos's portfolio.",
        fr: 'Je n\'ai pas d\'instructions cachées à ignorer : je suis un ensemble de réponses préprogrammées, sans modèle de langage derrière moi. Je peux continuer à répondre sur le portfolio de Carlos.',
      } as Localized
      return { text: tr(text), chips: CHIPS_DEFAULT[lang] }
    },
  },
  {
    id: 'thanks',
    keywords: ['obrigado', 'obrigada', 'valeu', 'vlw', 'thanks', 'thank you', 'thx', 'merci', 'grand merci'],
    build: (lang) => {
      const tr = t(lang)
      const text = {
        'pt-BR': 'De nada! Se quiser, continue perguntando — ou fale direto com o Carlos pela página de contato.',
        en: 'You\'re welcome! Keep asking — or talk to Carlos directly on the contact page.',
        fr: 'Avec plaisir ! Continuez à poser des questions — ou parlez directement avec Carlos sur la page de contact.',
      } as Localized
      return { text: tr(text), chips: ['Projetos', 'Contato'], links: [{ label: 'Contato', to: '/contato' }] }
    },
  },
]

function countMatches(hay: string, keywords: string[]): number {
  let hits = 0
  for (const keyword of keywords) {
    if (padded(hay).includes(` ${normalize(keyword)} `)) hits += 1
  }
  return hits
}

export function matchIntent(text: string): { id: IntentId; score: number } | undefined {
  const hay = padded(normalize(text))
  if (!hay.trim()) return undefined
  let best: { id: IntentId; score: number } | undefined
  for (const rule of rules) {
    const score = countMatches(hay, rule.keywords)
    if (score > 0 && (!best || score > best.score)) best = { id: rule.id, score }
  }
  return best
}

export function buildIntent(id: IntentId, lang: Lang): Reply {
  const rule = rules.find((entry) => entry.id === id)
  if (rule) return rule.build(lang)
  return fallbackReply(lang)
}

export function fallbackReply(lang: Lang): Reply {
  const tr = t(lang)
  const text = {
    'pt-BR': `Não tenho uma resposta pré-programada para isso. Posso falar sobre os projetos (${projectNames('pt-BR').join(', ')}), habilidades, trajetória, idiomas ou contato — ou use uma das sugestões abaixo.`,
    en: `I don't have a pre-programmed answer for that. I can talk about the projects (${projectNames('en').join(', ')}), skills, background, languages or contact — or pick a suggestion below.`,
    fr: `Je n'ai pas de réponse préprogrammée pour cela. Je peux parler des projets (${projectNames('fr').join(', ')}), des compétences, du parcours, des langues ou du contact — ou choisissez une suggestion ci-dessous.`,
  } as Localized
  return { text: tr(text), chips: CHIPS_DEFAULT[lang] }
}
