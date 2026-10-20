<template>
  <section :class="{ tint: d.tint }">
    <div class="wrap">
      <div class="sec-head"><div><Rich as="div" class="eyebrow" field="sectionEyebrow" :value="d.sectionEyebrow" :text-style="d.textStyle" /><Rich as="h2" field="sectionTitle" :value="d.sectionTitle" :text-style="d.textStyle" /></div></div>
      <div class="feat"><div v-for="f in d.features || []" :key="f.title"><b>{{ f.title }}</b><span>{{ f.text }}</span></div></div>
    </div>
  </section>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'
const props = defineProps({ data: Object, page: Object })
defineOptions({ inheritAttrs: false })
const { d } = useSectionBlock(props)</script>
