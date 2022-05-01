<template>
  <section>
    <search-content @parentMethod="handleChangeQuery"></search-content>
    <h2 class="other_username"><fa class="user-icon" :icon="faCircleUser" />{{ username }} さん</h2>
    <div class="card">
      <div class="cardItem">
        <div v-for="item in items" :key="item.id" class="cardItem__inner">
          <h2 class="cardItem__inner__title"><fa class="icon" :icon="faWineGlass" />{{ item.title }}</h2>
          <div class="cardItem__inner__star">
            <star-rating v-model="item.score" :increment="0.5" :star-size="28" active-color="#FFD768" :read-only="true"></star-rating>
          </div>
          <div class="cardItem__inner__text">
            {{ item.body }}
          </div>
        </div>
      </div>
      <div v-if="!items.length">
        <h2 class="noItem">登録されたお酒がありません。</h2>
      </div>
    </div>
    
  </section>
</template>

<script>
import { faWineGlass, faCircleUser } from "@fortawesome/free-solid-svg-icons"
import SearchContent from "../../components/SearchContent.vue"

export default {
  name: 'OtherPage',

  components:{
    SearchContent
  },

  data() {
    return {
      keyword: '',
      username: ''
    }
  },

  computed: {
    items() {
      return this.$store.getters.filterItems
    },
    faWineGlass() {
      return faWineGlass
    },
    faCircleUser() {
      return faCircleUser
    }
  },

  async mounted() {
    await this.$axios.post("/home/otheruser", this.$route.query)
    .then((response) => {
      this.$store.dispatch("stateSetDatabase", response.data.result)
      this.username = this.$store.state.items[0].name
    })
  },

  methods: {
    handleChangeQuery(args) {
      this.$store.commit("setFilterQuery", args)
    },
  }
}
</script>

<style lang="scss" scoped>
.other_username {
  margin-top: 20px;
  font-size: 1.8rem;
  
  .user-icon {
    padding-right: 7px;
    font-size: 2.2rem;
  }
}

.cardItem {
  margin-top: 20px;
}
</style>
