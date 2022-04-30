<template>
  <section>
    <select id="star-select" v-model="filterQuery.score" name="star" @change="starSearch">
      <option value="0">指定しない</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <!-- <star-rating v-model="filterQuery.score" :star-size="28" active-color="#FFD768" @click="starSearch"></star-rating> -->
    <div class="search-border">
      <input v-model="filterQuery.title" type="text" placeholder="お酒の名前を検索" class="search" @input="keywordSearch">
    </div>
  </section>
</template>



<script>
export default {
  data() {
    return {
      filterQuery: {
        title: '',
        score: ''
      }
    }
  },

  methods: {
    keywordSearch(e) {
      this.$emit('parentMethod', {title: this.filterQuery.title})
    },
    starSearch(e) {
      this.$emit('parentMethod', {score: this.filterQuery.score})
    }
  }
}
</script>

<style>

</style>