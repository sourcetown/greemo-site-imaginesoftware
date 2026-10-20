<template>
  <section class="hero">
    <div class="wrap" style="display:block">
      <div class="hero-card"><img :src="d.image || game?.banner" :alt="d.imageAlt || game?.title"></div>
      <div class="hero-strip">
        <div><Rich as="div" class="eyebrow" field="eyebrow" :value="d.eyebrow" :text-style="d.textStyle" /><h1 style="margin-top:16px" v-html="inlineEm(d.title)"></h1></div>
        <div>
          <Rich as="p" class="lede" field="lede" :value="d.lede" :text-style="d.textStyle" />
          <div class="ctas" style="margin-top:22px">
            <ALink v-if="d.primaryCta?.path" class="btn btn-primary arrow" :to="d.primaryCta.path"><Rich as="span" field="primaryCta.label" :value="d.primaryCta.label" :text-style="d.textStyle" /></ALink>
            <ALink v-if="d.secondaryCta?.path" class="btn btn-ghost" :to="d.secondaryCta.path"><Rich as="span" field="secondaryCta.label" :value="d.secondaryCta.label" :text-style="d.textStyle" /></ALink>
          </div>
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
import { findRecord, inlineEm } from '../../utils/greemo'
const props = defineProps({ data: Object, page: Object })
defineOptions({ inheritAttrs: false })
const { d } = useSectionBlock(props)
const game = computed(() => (d.value.game ? findRecord('games', d.value.game) : null))
</script>
