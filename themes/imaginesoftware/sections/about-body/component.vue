<template>
  <section>
    <div class="wrap split">
      <div class="prose">
        <p><Txt :text="d.aboutMore" /></p>
        <p v-if="d.aboutNote" class="muted" style="font-size:16px;margin-top:20px"><Rich as="span" field="aboutNote" :value="d.aboutNote" :text-style="d.textStyle" /> <Txt :text="d.aboutNoteFlag" /></p>
      </div>
      <div class="grid2" style="gap:14px">
        <div v-for="img in d.aboutImages || []" :key="img.image" class="media"><img :src="img.image" :alt="img.alt"></div>
      </div>
    </div>
  </section>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'

import Txt from '../../components/Txt.vue'
const props = defineProps({ data: Object, page: Object })
defineOptions({ inheritAttrs: false })
const { d } = useSectionBlock(props)
</script>
