<template>
  <section :class="{ tint: d.tint }" id="downloads">
    <div class="wrap">
      <div class="sec-head">
        <div><Rich as="div" class="eyebrow" field="eyebrow" :value="d.eyebrow" :text-style="d.textStyle" /><Rich as="h2" field="title" :value="d.title" :text-style="d.textStyle" /></div>
        <Rich as="p" field="intro" :value="d.intro" :text-style="d.textStyle" />
      </div>
      <div class="dl">
        <div v-for="item in items" :key="item.key" class="dl-tile">
          <a :href="item.boxTemplateUrl || null" target="_blank" rel="noopener">
            <img v-if="item.image" :src="item.image" :alt="`${item.title} box template`">
            <div v-else class="ph-box">{{ item.imagePlaceholder || `[PLACEHOLDER: ${item.title} image]` }}</div>
          </a>
          <span class="t">{{ item.title }}</span>
          <span class="files">
            <a v-if="item.boxTemplateUrl" :href="item.boxTemplateUrl" target="_blank" rel="noopener">Box</a>
            <a v-if="item.manualUrl" :href="item.manualUrl" target="_blank" rel="noopener">Manual</a>
          </span>
        </div>
      </div>
      <p v-if="d.note || d.notePlaceholder" class="muted small" style="margin-top:20px"><Rich as="span" field="note" :value="d.note" :text-style="d.textStyle" /> <Txt :text="d.notePlaceholder" /></p>
    </div>
  </section>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'

import { computed } from 'vue'
import Txt from '../../components/Txt.vue'
import { collectionItems } from '../../utils/greemo'
import { byOrder } from '../../utils/site'
const props = defineProps({ data: Object, page: Object })
defineOptions({ inheritAttrs: false })
const { d } = useSectionBlock(props)
const items = computed(() => collectionItems(d.value.items).slice().sort(byOrder))
</script>
