<template>
  <div class="container">
    <div>
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l user_form_items">カッピングを始める</button>
    </div>
    <div>
      <h2 class="title">{{ uid }}さんがカッピングしたコーヒー</h2>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      uid: '',
    }
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid
        if (this.uid != this.$route.params.id) {
          this.$router.push(`/users/${this.uid}`) // 自分以外のマイページにアクセスできない
        }
      } else {
        this.$router.push('/signin') // ログイン状態でなければマイページにアクセスできない
      }
    })
  },
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
</style>
