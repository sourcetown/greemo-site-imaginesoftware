import { createRouter, createWebHistory } from 'vue-router'
import GreemoPage from '../pages/GreemoPage.vue'
import NotFound from '../pages/NotFound.vue'
import { pages } from '../utils/pages'

// One route per Greemo page in src/content. Detail pages (kind: detail) use their frontmatter path, e.g. /services/:key.
const routes = [
  ...pages.map(page => ({ path: page.path, name: page.name, component: GreemoPage, props: { pageName: page.name } })),
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    // Anchors (/about#contact, /games#epyx-rogue): wait for the new page to render, then jump. Smooth only within a page.
    if (to.hash) return new Promise(resolve => setTimeout(() => resolve({ el: to.hash, top: 90, behavior: to.path === from.path ? 'smooth' : 'auto' }), 60))
    return { top: 0 }
  }
})
