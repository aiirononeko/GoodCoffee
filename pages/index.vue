<template>
  <div class="container">
    <div>
      <h2 class="title">
        さあ、カッピングをはじめよう
      </h2>
      <div class="user_form">
        <button @click="goSignin" class="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-8 rounded-l user_form_items">ログイン</button>
        <p class="user_form_items">または、</p>
        <button @click="goSignup" class="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-8 rounded-l user_form_items">アカウントを作成</button>
      </div>
      <div class="links">
        <nuxt-link to="/">利用規約</nuxt-link>
        <nuxt-link to="/">プライバシーポリシー</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    goSignin() {
      this.$router.push("/signin")
    },
    goSignup() {
      this.$router.push("/signup")
    }
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 80px;
  color: #35495e;
  letter-spacing: 1px;
}

.user_form {
  margin-top: 80px;
  margin-bottom: 20px;
}

.user_form > p {
  margin: 0 auto;
}

.user_form > button {
  margin-bottom: 20px;
}

.user_form_items {
  margin-top: 20px;
  width: 20%;
}

.links {
  margin-top: 50px;
}

.links > a:hover {
  color: blue;
}

/** 
 * タブレット用ブレークポイント
 */
@media screen and (max-width: 1179px) {
  .title {
    font-size: 50px;
  }

  .user_form_items {
    width: 30%;
  }
}

/**
 * スマホ用ブレークポイント
 */
@media screen and (max-width: 767px) {
  .title {
    font-size: 25px;
  }

  .user_form_items {
    width: 60%;
  }
}
</style>
