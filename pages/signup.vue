<template>
  <div>
    <div>
      <h2 class="title">アカウントを作成しましょう</h2>
    </div>
    <div class="signup_form">
      <label for="email">メールアドレス</label>
      <input type="text" v-model="email"><br>
      <label for="password">パスワード</label>
      <input type="password" v-model="password"><br>
      <button @click="signUpWithEmail" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l user_form_items">登録</button>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { auth } from 'firebase'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    signUpWithEmail() {
      auth().createUserWithEmailAndPassword(this.email, this.password).then(res => {
        console.log('success!')
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

.signup_form > input {
  border: 1px black solid;
}
</style>
