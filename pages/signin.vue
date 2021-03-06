<template>
  <div class="container">
    <div>
      <h2 class="title mt-10">ログインしましょう</h2>
    </div>
    
    <form class="w-full max-w-sm my-8">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="email">
            Email
          </label>
        </div>
        <div class="md:w-2/3">
          <input v-model="$v.email.$model" placeholder="taro@example.com" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="email" type="text" required>
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
            Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input v-model="$v.password.$model" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-username" type="password" placeholder="******************" required>
        </div>
      </div>
      <div class="my-8">
        <ul v-if="errors.length !== 0" class="mb-8">
          <li v-for="(err, i) in errors" :key="i" class="text-red-600">{{ err }}</li>
        </ul>
        <div>
          <button @click="loginWithEmail" class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
            ログインする
          </button>
        </div>
      </div>
    </form>

    <p>------------------------------------------</p>

    <button @click="loginWithTwitter" class="mt-10 mb-5 shadow focus:shadow-outline focus:outline-none bg-blue-400 hover:bg-blue-500 text-gray-100 font-bold py-2 px-10">Twitterアカウントでログインする</button>
    <button @click="loginWithFacebook" class="mb-10 shadow focus:shadow-outline focus:outline-none bg-indigo-400 hover:bg-indigo-500 text-gray-100 font-bold py-2 px-8">Facebookアカウントでログインする</button>

    <nuxt-link to="/signup">アカウントをお持ちでない方はこちら</nuxt-link>
    <nuxt-link to="/">トップページに戻る</nuxt-link>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { twProvider, fbProvider } from '~/plugins/firebase'
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: []
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$router.push(`/users/${user.uid}`)
      }
    })
  },
  methods: {
    loginWithEmail() {
      this.errors = []
      !this.$v.email.required && this.errors.push('メールアドレスを入力してください')
      !this.$v.email.email && this.errors.push('メールアドレスの形式で入力してください')
      !this.$v.password.required && this.errors.push('パスワードを入力してください')

      this.$v.$touch() // バリデーションチェック
      if (this.$v.$invalid) return

      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(result => {
        this.$router.push(`/users/${result.user.uid}`)
      }).catch(err => {
        console.log(err.message)
      })
    },
    loginWithTwitter() {
      firebase.auth().signInWithPopup(twProvider).then(result => {
        const user = result.user

        const db = firebase.firestore()
        const usersRef = db.collection('users').doc(result.user.uid)
        usersRef.set({
          uid: result.user.uid,
          name: result.user.displayName,
        }).then(res => {
          this.$router.push(`/users/${result.user.uid}`)
        }).catch(err => {
          console.log(err.message)
        })
      }).catch(err => {
        console.log(err.message)
      })
    },
    loginWithFacebook() {
      firebase.auth().signInWithPopup(fbProvider).then(result => {
        const user = result.user

        const db = firebase.firestore()
        const usersRef = db.collection('users').doc(result.user.uid)
        usersRef.set({
          uid: result.user.uid,
          name: result.user.displayName,
        }).then(res => {
          this.$router.push(`/users/${result.user.uid}`)
        }).catch(err => {
          console.log(err.message)
        })
      }).catch(err => {
        console.log(err.message)
      })
    },
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
  font-size: 40px;
  color: #35495e;
  letter-spacing: 1px;
}

form {
  margin-top: 80px;
}

a {
  margin-top: 10px;
}

a:hover {
  color: #3490dc;
}

/** 
 * タブレット用ブレークポイント
 */
@media screen and (max-width: 1179px) {
  .title {
    font-size: 40px;
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
