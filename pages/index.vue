<template>
  <section id="home">

    <div v-if="!$auth.loggedIn" class="noLogin">
      <h3>ログインすると自分が飲んだお酒を登録できます！</h3>
    </div>
    <search-content @parentMethod="handleChangeQuery"></search-content>

    <div class="card">
      <p v-if="error">{{error}}</p>
      <div class="cardItem">
        <div v-for="item in items" :key="item.id" class="cardItem__inner">
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
import SearchContent from "../components/SearchContent.vue"

export default {
  name: 'HomePage',

  components: {
    SearchContent
  },

  data() {
    return {
      // filterQuery: {
      //   title: "",
      //   score: ""
      // },
      error: ''
    }
  },

  computed: {

    items() {
      return this.$store.getters.filterItems
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
      this.$store.dispatch("stateSetDatabase", response.data.result)
    })

    this.$store.commit("setFilterQuery", this.filterQuery)
  },

  methods: {
    handleChangeQuery(args) {
      this.$store.commit("setFilterQuery", args)
    }
  }
}
</script>

<style lang="scss" scoped>
.noLogin {
  text-align: center;
}

.cardItem__inner__user {
  margin-top: 10px;
  text-align: right;
  font-size: 1.4rem;

  a {
    color: $basecolor;
    padding-right: 10px;

    &:hover {
      color: $keycolor;
    }
  }    

  .user-icon {
    padding-right: 7px;
  }
}

</style>