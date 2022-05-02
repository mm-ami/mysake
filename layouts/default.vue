<template>
  <div>
    <home-header />
    <transition name="page">
      <Nuxt />
    </transition>
  </div>
</template>

<script>
import HomeHeader from '../components/HomeHeader.vue'

export default {
  name: "HomePage",
  components: {
    HomeHeader
  }
}
</script>

<style>

</style>
