<template>
  <section :class="{ tint: d.tint }">
    <div class="wrap">
      <div class="sec-head"><div><Rich as="div" class="eyebrow" field="sectionEyebrow" :value="d.sectionEyebrow" :text-style="d.textStyle" /><Rich as="h2" field="sectionTitle" :value="d.sectionTitle" :text-style="d.textStyle" /></div></div>
      <div class="shots">
        <template v-for="(s, i) in d.gallery || []" :key="i">
          <img v-if="s.image" :src="s.image" :alt="s.alt">
          <div v-else class="ph-box" style="height:300px">{{ s.alt || '[PLACEHOLDER: screenshot]' }}</div>
        </template>
      </div>
    </div>
  </section>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'
const props = defineProps({ data: Object, page: Object })
defineOptions({ inheritAttrs: false })
const { d } = useSectionBlock(props)</script>
