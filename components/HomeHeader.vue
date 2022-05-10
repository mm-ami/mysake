<template>
  <section id="header">

    <div class="title">
      <nuxt-link class="title__name" to="/"><span>My</span>Sake</nuxt-link>
    </div>

    <nav class="nav">
      <div v-if="!$auth.loggedIn" class="nav__inner" >
        <nuxt-link to="/register">新規作成</nuxt-link>
        <nuxt-link to="/login">ログイン</nuxt-link>
      </div>
      <div v-else class="nav__inner">
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

    &__name {
      font-family: 'Whisper', cursive;
      color: $keycolor;
      font-size: 15rem;
      padding-right: 10px;

      @include tab {
        font-size: 13rem;
      }

      @include phone {
        font-size: 8rem;
      }

      span {
        color: $basecolor;
      }
    }
  }


  .nav {
    &__inner {
      display: flex;
      flex-direction: column;

      input, a {
        color: $keycolor;
        font-size: 1.8rem;

        @include tab {
          font-size: 1.5rem;
        }

         @include phone {
          font-size: 1.2rem;
        }

        background: none;

        &:hover {
          color: $basecolor;
        }
      }
    }
  }
}

</style>