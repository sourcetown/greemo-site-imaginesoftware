<template>
  <footer class="site-footer">
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-brand">
          <img :src="c.logo" :alt="c.legalName">
          <p style="max-width:40ch">{{ c.description }}</p>
        </div>
        <div><h4>Games</h4><router-link v-for="g in games" :key="g.key" :to="gameLink(g)">{{ g.shortTitle || g.title }}</router-link></div>
        <div><h4>Company</h4><ALink v-for="item in company" :key="item.id" :to="item.path">{{ item.label }}</ALink></div>
        <div class="foot-follow">
          <h4>Follow</h4>
          <template v-for="s in c.social || []" :key="s.label">
            <template v-if="isPlaceholder(s.url)"><Ph>{{ s.url }}</Ph><br></template>
            <a v-else :href="s.url" target="_blank" rel="noopener">{{ s.label }}</a>
          </template>
          <p v-if="hasGaps && c.socialNote" class="small muted" style="margin-top:8px">{{ c.socialNote }}</p>
        </div>
      </div>
      <div class="foot-base">
        <span>© {{ year }} {{ c.legalName }}. {{ c.trademarks }}</span>
        <span><Txt :text="c.registration" /></span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import ALink from './ALink.vue'
import Ph from './Ph.vue'
import Txt from './Txt.vue'
import { collections, menuItems } from '../utils/greemo'
import { allGames, gameLink, isPlaceholder } from '../utils/site'
const c = collections.company || {}
const games = allGames()
const company = menuItems('footer')
const hasGaps = (c.social || []).some(s => isPlaceholder(s.url))
const year = new Date().getFullYear()
</script>
