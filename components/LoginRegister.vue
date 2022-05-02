<template>
  <form class="form">
    <h2>{{title}}</h2>
    <div class="form__inner">
      <label for="username">ユーザー名</label>
      <p v-if="$v.user.username.$error">ユーザー名を入力してください。</p>
      <input id="username" v-model="$v.user.username.$model" name="username" type="text">
    </div>
    <div class="form__inner">
      <label for="password">パスワード</label>
      <p v-if="$v.user.password.$error && !$v.user.password.required">パスワードを入力してください</p>
      <p v-if="$v.user.password.$error && !$v.user.password.minLength">文字数が足りません。</p>
      <input id="password" v-model="$v.user.password.$model" name="password" type="password">
    </div>
    
    <input v-if="title == '新規作成'" type="submit" value="新規作成" @click.prevent="submit">
    <input v-else type="submit" value="ログイン" @click.prevent="submit">
  </form>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators"

export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    title: String
  },

  data() {
    return {
      user: null
    }
  },

  mounted() {
    this.user = {...this.value}
  },

  methods: {
    submit() {
      this.$v.$touch()
      if(this.$v.$invalid) {
        ;
      }else{
        this.$emit("submit", this.$v)
      }
    }
  },

  validations: {
    user: {
      username: {required},
      password: {
        required,
        minLength: minLength(4)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {

  h2 {
    font-size: 2rem;
    text-align: center;
  }

  input[type=submit] {
    @include submit(7px 10px)
  }
}
</style>