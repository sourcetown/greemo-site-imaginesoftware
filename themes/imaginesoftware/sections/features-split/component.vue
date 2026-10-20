<template>
  <section :class="{ tint: d.tint }">
    <div class="wrap split" style="align-items:center">
      <div>
        <Rich as="div" class="eyebrow" field="eyebrow" :value="d.eyebrow" :text-style="d.textStyle" />
        <Rich as="h2" style="margin:14px 0 20px" field="title" :value="d.title" :text-style="d.textStyle" />
        <Rich as="p" class="muted" field="body" :value="d.body" :text-style="d.textStyle" />
        <div v-if="d.cta?.path" class="ctas"><ALink class="btn btn-dark arrow" :to="d.cta.path"><Rich as="span" field="cta.label" :value="d.cta.label" :text-style="d.textStyle" /></ALink></div>
      </div>
      <div class="feat" style="grid-template-columns:1fr 1fr">
        <div v-for="f in d.features || []" :key="f.title"><b>{{ f.title }}</b><span>{{ f.text }}</span></div>
      </div>
    </div>
  </section>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'

import ALink from '../../components/ALink.vue'
const props = defineProps({ data: Object, page: Object })
defineOptions({ inheritAttrs: false })
const { d } = useSectionBlock(props)
</script>
