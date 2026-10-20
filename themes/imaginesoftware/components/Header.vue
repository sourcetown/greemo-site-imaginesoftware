<template>
  <header class="site-header">
    <div class="wrap">
      <router-link class="brand" to="/" @click="open = false"><img :src="company.logo" :alt="company.legalName"></router-link>
      <nav class="nav" :class="{ open }">
        <ALink v-for="item in items" :key="item.id" :to="item.path" :class="{ active: isActive(item) }" @click="open = false">{{ item.label }}</ALink>
        <ALink v-for="item in cta" :key="item.id" :to="item.path" class="btn btn-primary" @click="open = false">{{ item.label }}</ALink>
      </nav>
      <button class="burger" :class="{ on: open }" :aria-expanded="open" aria-label="Menu" @click="open = !open"></button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ALink from './ALink.vue'
import { collections, menuItems } from '../utils/greemo'
const company = collections.company || {}
const items = menuItems('header')
const cta = menuItems('header-cta')
const open = ref(false)
const route = useRoute()
// A menu item is active on its own page. Links to an anchor (Contact = /about#contact) are never marked active.
const isActive = item => !item.external && !item.path.includes('#') && item.path === route.path
</script>
