<template>
  <div class="badges"><span v-for="p in sorted" :key="p" class="badge" :class="platformClass[p]">{{ platformLabels[p] || p }}</span></div>
</template>

<script setup>
import { computed } from 'vue'
import { platformLabels, platformClass } from '../utils/site'
const props = defineProps({ platforms: { type: Array, default: () => [] } })
const order = ['xbox', 'switch']
const sorted = computed(() => props.platforms.slice().sort((a, b) => order.indexOf(a) - order.indexOf(b)))
</script>
