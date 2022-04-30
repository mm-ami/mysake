<template>
  <section>
    <h2 class="error-message">{{ error }}</h2>
    <login-register v-model="user" title="ログイン" @submit="login"/>
  </section>
</template>

<script>
import LoginRegister from "../components/LoginRegister.vue"

export default {
  name: 'LoginPage',

  components: {
    LoginRegister
  },

  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    async login($v) {
      await this.$auth.loginWith("local", { data: $v.user.$model })
      .catch(() => {
        this.error = 'ユーザー名とパスワードの組み合わせが正しくありません。'
      })
    }
  }
}
</script>

<style>

</style>