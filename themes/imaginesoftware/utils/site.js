// Small helpers shared by the Imagine Software sections.
import { collections, collectionItems } from './greemo'

/** Content gaps are written as "[PLACEHOLDER: ...]" in src/data and src/content, and render as dashed labels. */
export const isPlaceholder = value => typeof value === 'string' && /^\s*\[PLACEHOLDER/i.test(value)

export const byOrder = (a, b) => (a.order ?? 999) - (b.order ?? 999)

export const platformLabels = { xbox: 'Xbox', switch: 'Nintendo Switch' }
export const platformClass = { xbox: 'x', switch: 'n' }

export function allGames() {
  return collectionItems(collections.games).slice().sort(byOrder)
}

/** Where a game links to: its own page if it has one, otherwise its card on the Games page. */
export const gameLink = game => game.path || `/games#${game.key}`

export function collectionGames(items, collectionKey) {
  return collectionItems(items).filter(g => g.collection === collectionKey).sort(byOrder)
}
