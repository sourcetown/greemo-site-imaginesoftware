<template>
  <section :class="{ tint: d.tint }">
    <div class="wrap">
      <div v-if="d.title" class="sec-head">
        <div><Rich as="div" class="eyebrow" field="eyebrow" :value="d.eyebrow" :text-style="d.textStyle" /><Rich as="h2" field="title" :value="d.title" :text-style="d.textStyle" /></div>
        <ALink v-if="d.link?.path" class="link" :to="d.link.path"><Rich as="span" field="link.label" :value="d.link.label" :text-style="d.textStyle" /></ALink>
      </div>
      <div :class="d.columns === 2 ? 'grid2' : 'grid3'">
        <GameTile v-for="g in games" :key="g.key" :game="g" />
      </div>
    </div>
  </section>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'

import { computed } from 'vue'
import ALink from '../../components/ALink.vue'
import GameTile from '../game-tile/component.vue'
import { collectionItems } from '../../utils/greemo'
import { byOrder } from '../../utils/site'
const props = defineProps({ data: Object, page: Object })
defineOptions({ inheritAttrs: false })
const { d } = useSectionBlock(props)
const games = computed(() => collectionItems(d.value.items).filter(g => !d.value.group || g.homeGroup === d.value.group).sort(byOrder))
</script>
