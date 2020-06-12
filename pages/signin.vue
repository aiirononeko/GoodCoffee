<template>
  <div class="container">
    <div>
      <h2 class="title">ログインしましょう</h2>
    </div>
    <div class="signin_form">
      <label for="email">メールアドレス</label>
      <input type="text" v-model="email"><br>
      <label for="password">パスワード</label>
      <input type="password" v-model="password"><br>
      <button @click="loginWithEmail" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l user_form_items">ログインする</button>
    </div>
    <nuxt-link to="/">トップページに戻る</nuxt-link>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      uid: '',
      email: '',
      password: '',
    }
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid
        console.log(this.uid) // ログイン状態ならリダイレクト
      }
    })
  },
  methods: {
    loginWithEmail() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(result => {
        console.log('success!')
        console.log(result)
      }).catch(err => {
        console.log(err.message)
      })
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 30px;
  color: #35495e;
  letter-spacing: 1px;
}

.signin_form > input {
  border: 1px black solid;
}
</style>
