<template>
  <section id="home">

    <div v-if="!$auth.loggedIn" class="noLogin">
      <h3>ログインすると自分が飲んだお酒を登録できます！</h3>
    </div>
    <div class="search-border">
      <input v-model="keyword" type="text" placeholder="お酒の名前を検索" class="search">
    </div>

    <div class="card">
      <p v-if="error">{{error}}</p>
      <div class="cardItem">
        <div v-for="item in filteredUsers" :key="item.id" class="cardItem__inner">
          <h2 class="cardItem__inner__title"><fa class="icon" :icon="faWineGlass" />{{ item.title }}</h2>
          <div class="cardItem__inner__star">
            <star-rating v-model="item.score" :increment="0.5" :star-size="28" active-color="#FFD768" :read-only="true"></star-rating>
          </div>
          <div class="cardItem__inner__text">
            {{ item.body }}
          </div>
          <div class="cardItem__inner__user">
            <nuxt-link :to="{ path: `/OtherUser/?id=${item.user_id}`}"><fa class="user-icon" :icon="faUser" />{{ item.name }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { faWineGlass, faUser } from "@fortawesome/free-solid-svg-icons"

export default {
  name: 'HomePage',

  data() {
    return {
      items: [],
      keyword: '',
      error: ''
    }
  },

  computed: {

    filteredUsers() {
      return this.items.filter((item) => {
        return item.title.includes(this.keyword)
      })
    },

    faWineGlass() {
      return faWineGlass
    },

    faUser() {
      return faUser
    }
  },
  
  async mounted() {
    await this.$axios.get("/home/homelist")
    .then((response) => {
      this.items = response.data.result
    })
  }
}
</script>

<style lang="scss" scoped>
.noLogin {
  text-align: center;
  margin-top: 10px;
}

.cardItem__inner__user {
  margin-top: 14px;

  a {
    color: $basecolor;
    position: absolute;
    right: 20px;
    bottom: 10px;
    font-size: 1.4rem;

    &:hover {
      color: $keycolor;
    }
  }    

  .user-icon {
    padding-right: 7px;
  }
}

</style>

