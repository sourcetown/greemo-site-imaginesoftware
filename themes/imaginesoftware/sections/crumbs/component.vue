<template>
  <div class="crumbs">
    <template v-for="c in items" :key="c.path"><router-link :to="c.path">{{ c.label }}</router-link> / </template>{{ current }}
  </div>
</template>
<script setup>
defineProps({ items: { type: Array, default: () => [] }, current: String })
</script>
