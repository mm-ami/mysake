<template>
  <section>
    <div class="search-border">
      <input v-model="keyword" type="text" placeholder="お酒の名前を検索" class="search">
    </div>
    <div class="card">
      <div class="cardItem">
        <div v-for="item in filteredUsers" :key="item.id" class="cardItem__inner">
          <h3 class="cardItem__inner__public">{{ item.public != 0 ? "公開" : "非公開" }}</h3>
          <h3 class="cardItem__inner__day">{{ $dateFns.format(item.t_date, 'yyyy年MM月dd日') }}</h3>
          <h2 class="cardItem__inner__title"><fa class="icon" :icon="faWineGlass" />{{ item.title }}</h2>
          <div class="cardItem__inner__star">
            <star-rating v-model="item.score" :increment="0.5" :star-size="28" active-color="#FFD768" :read-only="true"></star-rating>
          </div>
          <div class="cardItem__inner__text">{{ item.body }}</div>
          <div class="cardItem__inner__edit">
            <div class="cardItem__inner__edit__inner">
              <button @click="additem(item)" v-on:click="show = !show">編集</button>
              <button @click="deletebtn(item)">削除</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!items.length">
        <h2 class="noItem">登録されたお酒がありません。</h2>
      </div>
    </div>

    <vue-final-modal v-model="show" style="background-color: rgba(0,0,0,.9); cursor: pointer">
      <div class="modal">
        <div class="modal__close" @click="show = !show">
          <fa class="modal__close__icon" :icon="faXmark" />
        </div>
        <form-content ref="form" v-model="editItem" @submit="edit"/>
      </div>
    </vue-final-modal>
    
  </section>
</template>

<script>
import { faXmark, faWineGlass } from "@fortawesome/free-solid-svg-icons"

import FormContent from "../components/FormContent.vue"

export default {
  name: 'MyPage',

  components:{
    FormContent,
  },

  transition: {
    name: 'fade',
  },

  data() {
    return {
      items: [],
      editItem: {},
      keyword: '',
      show: false,
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
    faXmark() {
      return faXmark
    }
  },

  async mounted() {
    await this.$axios.post("/mypage/mypagelist", this.$auth.$state.user.user)
    .then((response) => {
      this.items = response.data.response
    })
  },

  methods: {

    additem(e) {
      this.$refs.form.editItem(e)
    },

    async edit($v) {
      await this.$axios.post("/mypage/edit", $v.user.$model)
      .then(() => {
        location.reload();
      })
    },

    async deletebtn(e) {
      await this.$axios.post("/mypage/delete", e)
      .then(() => {
        location.reload();
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cardItem__inner {
  h3 {
    display: inline-block;
    margin-bottom: 2px;
  }
  &__public {
    font-size: 1.4rem;
    color: $keycolor;
  }

  &__day {
    padding-left: 5px;
  }

  &__edit {
    margin-top: 26px;

    @include phone {
      margin-top: 30px;
    }

    &__inner {
      position: absolute;
      right: 20px;
      bottom: 10px;

      @include phone {
        right: 10px;
      }

      button {
        border: $basecolor 1px solid;
        background-color: rgba(0,0,0,0.9);
        padding: 3px 10px;
        border-radius: 8px;
        cursor: pointer;
        color: $basecolor;
        margin-left: 5px;

        &:hover {
          background-color: $basecolor;
          color: rgba(0,0,0,0.9);
        }
      }
    }
  }
}

.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 80%;
  max-width: 600px;
  z-index: 2;

  &__close {
    position: absolute;
    right: -40px;
    top: -270px;
    cursor: pointer;

    @include phone {
      right: -20px;
    }

    &__icon{
      font-size: 30px;
      color: $basecolor; 
    }
  }
}
</style>
