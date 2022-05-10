<template>
  <div>
    <home-header />
    <transition name="page">
      <Nuxt />
    </transition>
    <fa class="top-icon" :icon="faCircleUp" @click="scrollTop"></fa>
  </div>
</template>

<script>
import { faCircleUp } from "@fortawesome/free-solid-svg-icons"
import HomeHeader from '../components/HomeHeader.vue'

export default {
  name: "HomePage",
  components: {
    HomeHeader
  },

  computed: {
    faCircleUp() {
      return faCircleUp
    }
  },

  methods: {
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
  }
  
}
</script>

<style>

</style>
