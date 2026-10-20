<template>
  <em v-if="isPlaceholder(text)" class="ph">{{ text }}</em>
  <template v-else>{{ text }}</template>
</template>

<script setup>
// Prints a content string. Strings that start with "[PLACEHOLDER" are gaps and show as a dashed placeholder label.
import { isPlaceholder } from '../utils/site'
defineProps({ text: { type: String, default: '' } })
</script>
