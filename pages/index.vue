<template>
  <div class="container">
    <div>
      <h2 class="title my-10">
        さあ、カッピングをはじめよう
      </h2>
      <div class="flex my-10">
        <button @click="goSignin" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-purple-400 hover:bg-purple-500 text-white-500 font-bold py-2 px-8 rounded-l mt-10">ログイン</button>
        <button @click="goSignup" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-purple-400 hover:bg-purple-500 text-white-500 font-bold py-2 px-8 rounded-l mt-10 ml-10">アカウントを作成</button>
      </div>
      <div>
        <form>
          <div>
            <div>
              <label class="mt-10">
                Name
              </label>
            </div>
            <div>
              <input v-model="name" placeholder="Taro" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="name" type="text" required>
            </div>
          </div>
        </form>
        <button @click="goTutorial" class="shadow focus:shadow-outline focus:outline-none bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-8 rounded-l mt-8 mx-10">アカウントを作らずに試す</button>
      </div>
      <div class="links">
        <nuxt-link class="mr-8" to="/terms">利用規約</nuxt-link>
        <nuxt-link to="/">プライバシーポリシー</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import firebase from '~/plugins/firebase'

export default Vue.extend({
  data() {
    return {
      name: '',
    }
  },
  methods: {
    goSignin() {
      this.$router.push("/signin")
    },
    goSignup() {
      this.$router.push("/signup")
    },
    async goTutorial() {
      await firebase.auth().signInAnonymously().then(async res => {
        const db = firebase.firestore()
        const usersRef = db.collection('users').doc(res.user.uid)
        await usersRef.set({
          uid: res.user.uid,
          name: this.name
        }).then(res => {
          this.$router.push(`/cupping/roastLevel`)
        }).catch(err => {
          console.log(err.message)
        })
      }).catch(err => {
        console.log(err.message)
      })
    },
  }
})
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
  font-size: 80px;
  color: #35495e;
  letter-spacing: 1px;
}

.links {
  margin-top: 80px;
}

.links > a:hover {
  color: #3490dc;
}

form {
  margin-top: 80px;
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
