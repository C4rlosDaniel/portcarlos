import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outFile = path.resolve(__dirname, '../src/data/github.json')
const username = 'C4rlosDaniel'

async function main() {
  const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers },
    )
    if (!res.ok) throw new Error(`GitHub API ${res.status}`)
    const repos = await res.json()
    const picked = repos
      .filter((r) => r.fork === false && r.archived === false)
      .map((r) => ({
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        language: r.language,
        stargazers_count: r.stargazers_count,
        updated_at: r.updated_at,
        fork: r.fork,
      }))
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    fs.writeFileSync(outFile, JSON.stringify(picked, null, 2))
    console.log(`fetch-github: wrote ${picked.length} repos`)
  } catch (err) {
    const previous = fs.existsSync(outFile) ? fs.readFileSync(outFile, 'utf8') : '[]'
    fs.writeFileSync(outFile, previous)
    console.warn(`fetch-github: failed (${err.message}); kept previous data`)
  }
}

main()