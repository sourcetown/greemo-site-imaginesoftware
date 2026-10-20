<template>
  <component :is="tag" class="gtile" v-bind="attrs" :id="anchor ? game.key : null">
    <img :src="game.image" :alt="game.title">
    <div class="b">
      <h3>{{ game.title }}</h3>
      <p>{{ game.summary }}</p>
      <Badges :platforms="game.platforms || []" />
    </div>
  </component>
</template>
<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import Badges from '../../components/Badges.vue'
import { gameLink } from '../../utils/site'
// linkToList: link games without their own page to their card on /games. anchor: give the card an id (on /games).
const props = defineProps({ game: Object, linkToList: { type: Boolean, default: true }, anchor: Boolean })
const to = computed(() => (props.game.path ? props.game.path : props.linkToList ? gameLink(props.game) : null))
const tag = computed(() => (to.value ? RouterLink : 'div'))
const attrs = computed(() => (to.value ? { to: to.value } : {}))
</script>
