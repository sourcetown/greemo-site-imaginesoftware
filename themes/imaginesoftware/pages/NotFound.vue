<template>
  <div class="page-head rel not-found">
    <div class="wrap">
      <div class="eyebrow">Page not found</div>
      <h1 style="margin-top:18px">Game over</h1>
      <p class="lede" style="margin-top:22px">We couldn’t find that page. The link may be out of date. Try the home page or our games.</p>
      <div class="ctas"><router-link class="btn btn-primary arrow" to="/">Home</router-link><router-link class="btn btn-ghost" to="/games">Our games</router-link></div>
    </div>
  </div>
</template>

<script setup>
document.title = 'Page not found | Imagine Software'
</script>
