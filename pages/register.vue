<template>
  <section>
    <h2 class="error-message">{{ error }}</h2>
    <login-register v-model="user" title="新規作成" @submit="register"/>
  </section>
</template>

<script>
import LoginRegister from "../components/LoginRegister.vue"

export default {
  name: 'RegisterPage',

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
    async register($v) {
      await this.$axios.post("/user/register", $v.user.$model)
      .then((res) => {
        if(!res.data.isAuth) {
          this.error = res.data.message
        } else {
          this.$auth.loginWith('local', {data: $v.user.$model})
        }
      })
    }
  }
}
</script>

<style>

</style>