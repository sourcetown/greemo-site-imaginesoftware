<template>
  <div class="page-head rel">
    <div class="wrap" :class="{ split: d.split }" :style="d.split ? 'align-items:end' : ''">
      <div>
        <Crumbs v-if="d.crumbs" :items="d.crumbs" :current="d.current" />
        <Rich as="div" class="eyebrow" field="eyebrow" :value="d.eyebrow" :text-style="d.textStyle" />
        <Rich as="h1" field="title" :value="d.title" :text-style="d.textStyle" />
      </div>
      <p class="lede">{{ d.lede || (d.ledeField ? d[d.ledeField] : '') }}</p>
    </div>
  </div>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'

import Crumbs from '../crumbs/component.vue'
const props = defineProps({ data: Object, page: Object })
defineOptions({ inheritAttrs: false })
const { d } = useSectionBlock(props)
</script>
