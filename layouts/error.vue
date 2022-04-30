<template>
  <section class="error">
    <h2 v-if="error.statusCode === 404">
      ページが見つかりません。
    </h2>
    <h2 v-else>
      エラーが発生しました。少し時間を置いてから再度お試しください。
    </h2>
    <nuxt-link to="/">HOMEに戻る</nuxt-link>
  </section>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  margin-top: 50px;
  text-align: center;

  a {
    margin-top: 20px;
    display: inline-block;
    color: $basecolor;
    border: 1px solid $basecolor;
    padding: 10px;
    border-radius: 7px;
  }
}
</style>