<template>
  <section>
    <h2 class="other_username"><fa class="user-icon" :icon="faCircleUser" />{{ username }} さん</h2>
    <div class="card">
      <div class="cardItem">
        <div v-for="item in filteredUsers" :key="item.id" class="cardItem__inner">
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
        <h2 class="noItem">表示できるお酒がありません。</h2>
      </div>
    </div>
    
  </section>
</template>

<script>
import { faWineGlass, faCircleUser } from "@fortawesome/free-solid-svg-icons"

export default {
  name: 'OtherPage',

  data() {
    return {
      items: [],
      keyword: '',
      username: ''
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

    faCircleUser() {
      return faCircleUser
    }
  },

  async mounted() {
    await this.$axios.post("/home/otheruser", this.$route.query)
    .then((response) => {
      console.log(response)
      this.items = response.data.result
      this.username = this.items[0].name
    })
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
