<template>
  <form class="form">
    <div class="form__inner">
      <label for="date">日付</label>
      <p v-if="$v.user.t_date.$error">日付を選択してください。</p>
      <input id="date" v-model="$v.user.t_date.$model" type="date">
    </div>

    <div class="form__inner">
      <label for="name">お酒の名前</label
      ><p v-if="$v.user.title.$error">お酒の名前を入力してください。</p>
      <input id="name" v-model="$v.user.title.$model" type="text">
    </div>
    
    <div class="form__inner">
      <label>星評価</label>
      <star-rating v-model="$v.user.score.$model" :increment="0.5" class="star" :star-size="50"></star-rating>
    </div>

    <div class="form__inner">
      <label for="body">感想</label>
      <p v-if="$v.user.body.$error">感想を入力してください。</p>
      <textarea id="body" v-model="$v.user.body.$model" cols="30" rows="10"></textarea>
    </div>

    <section class="form__radio">
      <input id="release" v-model="$v.user.public.$model" type="radio" name="public" value=1 @change="onChange">
      <label for="release">公開</label>
      <input id="private" v-model="$v.user.public.$model" type="radio"  name="public" value=0 @change="onChange">
      <label for="private">非公開</label>
      <p v-if="$v.user.public.$error">選択してください。</p>
    </section>

    <input type="submit" value="登録" @click.prevent="submit">
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators"
export default {

  validations: {
    user: {
      t_date: {required},
      title: {required},
      score: {required},
      body: {required},
      public: {required}
    }
  },

  props: {
    value: {
      type: Object,
      required: true,
    }
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
    editItem(e) {
      this.user = e
    },

    onChange(e) {
      this.user.public = e.target.defaultValue
    },

    submit() {
      this.$v.$touch()
      if(this.$v.$invalid) {
        ;
      }else{
        this.$emit("submit", this.$v)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  margin-top: 30px;

  &__inner {

    input, textarea {
      border: 1px solid $basecolor;
      background: $basecolor;
      border-radius: 10px;
      @include search(8px 0, 10px, 1.3rem)
    }

    input[type=text] {
      padding: 14px;
    }

    textarea {
      height: 140px;
    }

    input[type=date]{
      position: relative;
      font-size: 1.2rem;
    }

    input[type=date]::-webkit-calendar-picker-indicator {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    
  }

  &__radio {
    width: 100%;
    display: flex;
    align-items: center;

    label {
      padding: 0 9px;
      font-size: 1.4rem;
    }
  }
  input[type=submit] {
    @include submit
  }
}

.vue-star-rating {
  justify-content: center;
}
</style>