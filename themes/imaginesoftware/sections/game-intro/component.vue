<template>
  <section>
    <div class="wrap split-wide">
      <div class="prose">
        <Rich as="p" field="body" :value="d.body" :text-style="d.textStyle" />
        <div class="ctas">
          <ALink v-for="(s, i) in d.stores || []" :key="s.url" class="btn arrow" :class="i === 0 ? 'btn-primary' : 'btn-ghost'" :to="s.url">{{ s.label }}</ALink>
        </div>
      </div>
      <div>
        <Rich as="h4" field="includedTitle" :value="d.includedTitle || 'Included games'" :text-style="d.textStyle" />
        <div class="grid2" style="gap:12px">
          <div v-for="g in included" :key="g.key" class="card" style="padding:18px 20px"><h3 style="font-size:19px">{{ g.title }}</h3></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'

import { computed } from 'vue'
import ALink from '../../components/ALink.vue'
import { collectionGames } from '../../utils/site'
const props = defineProps({ data: Object, page: Object })
defineOptions({ inheritAttrs: false })
const { d } = useSectionBlock(props)
const included = computed(() => collectionGames(d.value.data, d.value.key))
</script>
