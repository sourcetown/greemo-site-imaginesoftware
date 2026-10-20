<template>
  <span v-if="editing" v-bind="attrs"><slot /></span>
  <a v-else-if="external" v-bind="attrs" :href="to" :target="to.startsWith('http') ? '_blank' : null" :rel="to.startsWith('http') ? 'noopener' : null"><slot /></a>
  <router-link v-else v-bind="attrs" :to="to"><slot /></router-link>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
import { computed, inject, useAttrs } from 'vue'
const props = defineProps({ to: { type: String, default: '/' } })
const attrs = useAttrs()
const inline = inject('greemoInline', null)
const editing = computed(() => Boolean(inline))
const external = computed(() => /^(https?:|mailto:|tel:)/.test(props.to))
</script>
