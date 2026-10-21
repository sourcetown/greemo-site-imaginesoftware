<template>
  <section :class="{ tint: d.tint }" :id="d.anchor || 'contact'">
    <div class="wrap split">
      <div>
        <Rich as="div" class="eyebrow" field="eyebrow" :value="d.eyebrow" :text-style="d.textStyle" />
        <Rich as="h2" style="margin:14px 0 22px" field="title" :value="d.title" :text-style="d.textStyle" />
        <template v-if="d.address">
          <h4>{{ d.ourAddress || 'Our address' }}</h4>
          <p style="font-size:18px"><Rich as="span" field="legalName" :value="d.legalName" :text-style="d.textStyle" /><br><Rich as="span" field="address.line1" :value="d.address.line1" :text-style="d.textStyle" /><br><Rich as="span" field="address.line2" :value="d.address.line2" :text-style="d.textStyle" />, <Rich as="span" field="address.town" :value="d.address.town" :text-style="d.textStyle" /><br><Rich as="span" field="address.county" :value="d.address.county" :text-style="d.textStyle" />, <Rich as="span" field="address.postcode" :value="d.address.postcode" :text-style="d.textStyle" /></p>
        </template>
        <Rich as="p" v-if="d.deliveryNote" class="muted small" style="margin-top:16px" field="deliveryNote" :value="d.deliveryNote" :text-style="d.textStyle" />
        <template v-for="e in d.emails || []" :key="e.address">
          <h4 style="margin-top:28px">{{ e.label }}</h4>
          <p><Txt v-if="isPlaceholder(e.address)" :text="e.address" /><a v-else :href="`mailto:${e.address}`">{{ e.address }}</a></p>
        </template>
      </div>
      <div class="card" style="padding:34px">
        <Rich as="h3" field="formTitle" :value="d.formTitle || 'Send a message'" :text-style="d.textStyle" />
        <form class="form" :action="d.formAction || null" method="POST" @submit.prevent="submit">
          <div class="grid2" style="gap:14px">
            <div class="field"><label for="cf-first">{{ d.firstName || 'First name' }}</label><input id="cf-first" v-model="form.firstName" name="firstName" autocomplete="given-name" required></div>
            <div class="field"><label for="cf-last">{{ d.lastName || 'Last name' }}</label><input id="cf-last" v-model="form.lastName" name="lastName" autocomplete="family-name"></div>
          </div>
          <div class="field"><label for="cf-email">{{ d.email || 'Email' }}</label><input id="cf-email" v-model="form.email" name="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="cf-message">{{ d.commentOrMessage || 'Comment or message' }}</label><textarea id="cf-message" v-model="form.message" name="message" required></textarea></div>
          <button class="btn btn-primary" type="submit" :disabled="state === 'sending'">{{ state === 'sending' ? 'Sending' : 'Submit' }}</button>
          <p v-if="state === 'sent'" class="form-note">Thank you. We will get back to you as soon as possible.</p>
          <p v-if="state === 'error'" class="form-note">Sorry, the form is not connected yet. Please write to us at the address shown.</p>
        </form>
        <p v-if="d.formNote" class="small muted"><Txt :text="d.formNote" /></p>
      </div>
    </div>
  </section>
</template>
<script setup>
import Rich from '../../components/Rich.vue'
import { useSectionBlock } from '../../utils/sectionBlock'

import { reactive, ref } from 'vue'
import Txt from '../../components/Txt.vue'
import { isPlaceholder } from '../../utils/site'
const props = defineProps({ data: Object, page: Object })
defineOptions({ inheritAttrs: false })
const { d } = useSectionBlock(props)
const form = reactive({ firstName: '', lastName: '', email: '', message: '' })
const state = ref('idle')
// No form backend yet (company.formAction is empty), so submitting shows a "not connected" message.
async function submit() {
  if (!d.value.formAction) { state.value = 'error'; return }
  state.value = 'sending'
  try {
    const res = await fetch(d.value.formAction, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    state.value = res.ok ? 'sent' : 'error'
  } catch { state.value = 'error' }
}
</script>
