// Reads Greemo's file format at build time.
// parseGreemoMarkdown mirrors MarkdownParser.parse in greemo/packages/core/src/parser.ts.
// resolveSectionData mirrors resolveSectionBlockData in greemo/apps/web/src/utils/resolveSectionBlockData.ts.

const dataFiles = import.meta.glob('../data/*.json', { eager: true, import: 'default' })

/** Every Greemo collection in src/data, keyed by name. Skips site.json (settings) and *.meta.json (schemas). */
export const collections = Object.fromEntries(
  Object.entries(dataFiles)
    .map(([path, data]) => [path.split('/').pop().replace(/\.json$/, ''), data])
    .filter(([name]) => name !== 'site' && !name.endsWith('.meta'))
)

export const site = dataFiles['../data/site.json'] || {}

export function collectionItems(data) {
  if (Array.isArray(data)) return data.filter(item => item && typeof item === 'object')
  if (data && typeof data === 'object' && Array.isArray(data.items)) return data.items.filter(item => item && typeof item === 'object')
  return []
}

export function findRecord(name, key) {
  return collectionItems(collections[name]).find(item => item.key === key || String(item.id) === String(key))
}

function parseFrontmatter(content) {
  const frontmatter = {}
  let offset = 0
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
  if (match) {
    match[1].split('\n').forEach(line => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) return
      const m = trimmed.match(/^(\w+):\s*(.+)$/)
      if (!m) return
      let value = m[2].trim()
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
      else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1)
      else if (value === 'true') value = true
      else if (value === 'false') value = false
      else if (!isNaN(Number(value)) && value !== '') value = Number(value)
      frontmatter[m[1].trim()] = value
    })
    offset = match[0].length
  }
  return { frontmatter, offset }
}

/** Split a Greemo page into ordered blocks: { type: 'template' | 'layout', name, config } and { type: 'markdown', content }. */
export function parseGreemoMarkdown(content) {
  const { frontmatter, offset } = parseFrontmatter(content)
  const annotations = []
  const commentRegex = /<!--[\s\S]*?-->/g
  let m
  while ((m = commentRegex.exec(content)) !== null) {
    const comment = m[0]
    const kind = comment.includes('layout name=') ? 'layout' : comment.includes('template name=') ? 'template' : null
    if (!kind) continue
    const nameMatch = comment.match(/(?:template|layout)\s+name=["']([^"']+)["']\s+/)
    if (!nameMatch) continue
    const jsonStart = comment.indexOf('{', (nameMatch.index || 0) + nameMatch[0].length)
    if (jsonStart === -1) continue
    let depth = 0
    let jsonEnd = jsonStart
    for (let i = jsonStart; i < comment.length; i++) {
      if (comment[i] === '{') depth++
      if (comment[i] === '}') depth--
      if (depth === 0) { jsonEnd = i + 1; break }
    }
    let config
    try { config = JSON.parse(comment.slice(jsonStart, jsonEnd)) } catch { continue }
    annotations.push({ type: kind, name: nameMatch[1], config, start: m.index, end: m.index + comment.length })
  }
  const blocks = []
  let pos = offset
  for (const a of annotations) {
    const text = content.slice(pos, a.start)
    if (text.trim()) blocks.push({ type: 'markdown', content: text })
    blocks.push({ type: a.type, name: a.name, config: a.config })
    pos = a.end
  }
  const tail = content.slice(pos)
  if (tail.trim()) blocks.push({ type: 'markdown', content: tail })
  return { metadata: frontmatter, blocks }
}

function findDataset(name) {
  if (name in collections) return collections[name]
  const hit = Object.keys(collections).find(k => k.toLowerCase() === String(name).toLowerCase())
  return hit ? collections[hit] : undefined
}

/** Flatten a section's annotation config and its linked collections, the same way Greemo's preview does. */
export function resolveSectionData(config = {}, pageContext = {}) {
  let resolved = {}
  const linkedName = config.__dataset__ || (typeof config.data === 'string' && config.data ? '' : pageContext.collection)
  if (linkedName) {
    const data = findDataset(linkedName)
    if (Array.isArray(data)) resolved = { items: data, data }
    else if (data && typeof data === 'object') resolved = { ...data }
  }
  if (typeof config.data === 'string' && config.data) {
    const data = findDataset(config.data)
    if (data !== undefined) {
      if (typeof data === 'object' && !Array.isArray(data)) resolved = { ...data, ...resolved }
      else resolved.data = data
    }
  }
  for (const [key, value] of Object.entries(config)) {
    if (key === '__dataset__' || key === 'data') continue
    if (value !== undefined && value !== null && value !== '') resolved[key] = value
  }
  const sliceKey = resolved.key || pageContext.objectKey
  if (sliceKey && Array.isArray(resolved.items)) {
    const item = resolved.items.find(i => i?.key === sliceKey || i?.id === sliceKey)
    if (item && typeof item === 'object') resolved = { ...resolved, ...item }
  }
  return resolved
}

/** Menu items for a location, from Greemo's canonical menu dataset (locations + menus mirror). */
export function menuItems(location) {
  const menu = collections.menu || {}
  const loc = menu.locations?.[location] || (menu.menus || []).find(m => m.location === location || m.id === location)
  return (loc?.items || []).filter(item => item.visible !== false)
}

/** "The *word*" -> "The <em>word</em>", with HTML escaped. */
export function inlineEm(text = '') {
  return String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
}
