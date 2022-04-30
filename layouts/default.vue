<template>
  <div>
    <home-header />
    <Nuxt />
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
