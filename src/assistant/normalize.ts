export type Lang = 'pt-BR' | 'en' | 'fr'

const DIACRITICS = /[̀-ͯ]/g

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITICS, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function padded(text: string): string {
  return ` ${text} `
}

const FR = [
  ' le ', ' la ', ' les ', ' des ', ' une ', ' est ', ' qui ', ' quoi ', ' votre ', ' vous ',
  ' pour ', ' dans ', ' avec ', ' tres ', ' il ', ' elle ', ' du ', ' au ', ' aux ',
  'bonjour', 'salut', 'merci', 'comment', 'quel', 'quelle', 'combien',
]

const EN = [
  ' the ', ' is ', ' are ', ' what', ' who ', ' how ', ' does ', ' did ', ' his ', ' her ',
  ' he ', ' she ', ' tell ', ' about ', ' with ', ' your ', ' you ', ' would ', ' can ',
  'thanks', 'hello', 'please',
]

const PT = [
  ' que ', ' uma ', ' dos ', ' das ', ' voce ', ' vc ', ' como ', ' qual ', ' quais ',
  ' ele ', ' ela ', ' dele ', ' para ', ' com ', ' nao ', ' falar', ' sabe ',
  'obrigado', 'obrigada', 'ola ', 'tudo bem', 'boa tarde', 'boa noite',
]

function score(hay: string, markers: string[]): number {
  let total = 0
  for (const marker of markers) {
    total += hay.split(marker).length - 1
  }
  return total
}

export function detectLang(text: string, fallback: Lang): Lang {
  const hay = padded(normalize(text))
  const fr = score(hay, FR)
  const en = score(hay, EN)
  const pt = score(hay, PT)
  const best = Math.max(fr, en, pt)
  if (best === 0) return fallback
  const winners = [fr, en, pt].filter((s) => s === best).length
  if (winners > 1) return fallback
  if (best === fr) return 'fr'
  if (best === en) return 'en'
  return 'pt-BR'
}
