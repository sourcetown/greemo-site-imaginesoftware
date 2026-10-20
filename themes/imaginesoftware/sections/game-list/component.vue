<template>
  <section style="padding-top:60px">
    <div class="wrap rel">
      <div v-if="d.filters" class="pills" style="margin-bottom:28px" role="group" aria-label="Filter by platform">
        <button v-for="f in filters" :key="f.value" type="button" class="pill" :class="{ on: active === f.value }" :aria-pressed="active === f.value" @click="active = f.value">{{ f.label }}</button>
      </div>
      <div class="grid3">
        <GameTile v-for="g in shown" :key="g.key" :game="g" :link-to-list="false" anchor />
      </div>
    </div>
  </section>
</template>
<script setup>import { useSectionBlock } from '../../utils/sectionBlock'

import { computed, ref } from 'vue'
import GameTile from '../game-tile/component.vue'
import { collectionItems } from '../../utils/greemo'
import { byOrder, platformLabels } from '../../utils/site'
const props = defineProps({ data: Object, page: Object })
defineOptions({ inheritAttrs: false })
const { d } = useSectionBlock(props)
const games = computed(() => collectionItems(d.value.items).slice().sort(byOrder))
// Filter pills: All, then each platform in the order it is listed in platformLabels (Nintendo Switch, Xbox as in the mockup).
const filters = [{ value: 'all', label: 'All' }, { value: 'switch', label: platformLabels.switch }, { value: 'xbox', label: platformLabels.xbox }]
const active = ref('all')
const shown = computed(() => games.value.filter(g => active.value === 'all' || (g.platforms || []).includes(active.value)))
</script>
