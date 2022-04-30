<template>
  <section id="header">
    <div class="title">
      <nuxt-link class="mainname" to="/"><span>My</span>Sake</nuxt-link>
    </div>
    <nav class="nav">
      <div v-if="!$auth.loggedIn" class="nav-inner" >
        <nuxt-link to="/register">新規作成</nuxt-link>
        <nuxt-link to="/login">ログイン</nuxt-link>
      </div>
      <div v-else class="nav-inner">
        <nuxt-link to="/form">お酒を登録</nuxt-link>
        <nuxt-link to="/mypage">マイページ</nuxt-link>
        <input type="submit" value="ログアウト" @click="$auth.logout()">
      </div>
    </nav>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Whisper&display=swap');

#header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    display: flex;
    align-items: flex-end;

    .mainname {
      font-family: 'Whisper', cursive;
      color: $keycolor;
      font-size: 15rem;
      padding-right: 10px;

      span {
        color: $basecolor;
      }
    }
  }
}

.nav {
  &-inner {
    display: flex;
    flex-direction: column;

    input, a {
      color: $keycolor;
      font-size: 1.8rem;

      background: none;

      &:hover {
        color: $basecolor;
      }
    }
  }
}

</style>