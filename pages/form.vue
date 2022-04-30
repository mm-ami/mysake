<template>
  <section>
    <form-content v-model="user" @submit="add"/>
  </section>
</template>

<script>
import FormContent from "../components/FormContent.vue"

export default {
  name: "FormPage",

  components:{
    FormContent
  },

  data() {
    return {
      user: {
        id: this.$auth.$state.user.user.id,
        t_date: '',
        title: '',
        score: 0,
        body: '',
        public: '',
      }
    }
  },
  methods: {
    async add($v) {
      await this.$axios.post("/mypage/form", $v.user.$model)
      .then(() => {
        this.$router.push("/mypage")
      })
    }
  }
}
</script>

<style>

</style>