<template>
  <div class="page-head rel" style="padding-bottom:0;background:var(--paper);border:0">
    <div class="wrap">
      <Crumbs :items="d.crumbs" :current="d.title" />
      <div class="split" style="align-items:end;margin-top:10px">
        <div><Rich as="div" class="eyebrow" field="eyebrow" :value="d.eyebrow" :text-style="d.textStyle" /><Rich as="h1" field="title" :value="d.title" :text-style="d.textStyle" /></div>
        <div><Badges :platforms="d.platforms || []" /><Rich as="p" class="lede" style="margin-top:16px" field="lede" :value="d.lede" :text-style="d.textStyle" /></div>
      </div>
      <div class="hero-card" style="margin-top:44px"><img :src="d.banner || d.image" :alt="d.title"></div>
    </div>
  </div>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'

import Crumbs from '../crumbs/component.vue'
import Badges from '../../components/Badges.vue'
const props = defineProps({ data: Object, page: Object })
defineOptions({ inheritAttrs: false })
const { d } = useSectionBlock(props)
</script>
