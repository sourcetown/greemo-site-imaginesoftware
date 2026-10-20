<template>
  <section>
    <div class="wrap">
      <div class="sec-head">
        <div><Rich as="div" class="eyebrow" field="eyebrow" :value="d.eyebrow" :text-style="d.textStyle" /><Rich as="h2" field="title" :value="d.title" :text-style="d.textStyle" /></div>
        <Rich as="p" v-if="d.intro" field="intro" :value="d.intro" :text-style="d.textStyle" />
      </div>
      <div class="strip">
        <img v-for="g in games" :key="g.key" :src="g.image" :alt="isPlaceholder(g.title) ? '' : g.title">
      </div>
      <div class="ctas">
        <ALink v-for="s in d.stores || []" :key="s.url" class="btn btn-dark arrow" :to="s.url">{{ s.label }}</ALink>
      </div>
    </div>
  </section>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'

import { computed } from 'vue'
import ALink from '../../components/ALink.vue'
import { collectionGames, isPlaceholder } from '../../utils/site'
const props = defineProps({ data: Object, page: Object })
defineOptions({ inheritAttrs: false })
const { d } = useSectionBlock(props)
const games = computed(() => collectionGames(d.value.data, d.value.key).filter(g => g.image))
</script>
