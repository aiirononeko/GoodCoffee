<template>
  <div class="container">
    <div>
      <button @click="startCupping" class="shadow focus:shadow-outline focus:outline-none bg-blue-300 hover:bg-blue-500 text-gray-800 font-bold py-2 px-10 rounded-l start_button mt-10">カッピングを始める</button>
    </div>
    <div>
      <h2 class="title">{{ username }}さんがカッピングしたコーヒー</h2>
      <div v-for="(result, i) in cuppingResult" :key="i">
        <List :result_id="result" />
      </div>
    </div>
    <button @click="signOut">サインアウト</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import List from '~/components/coppingResultsList'

export default {
  components: {
    List
  },
  data() {
    return {
      uid: '',
      username: '',
      cuppingResult: [],
    }
  },
  beforeMount() {
    /**
     * ログイン状態管理.
     */
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid
        if (this.uid != this.$route.params.id) {
          this.$router.push(`/users/${this.uid}`) // 自分以外のマイページにアクセスできない
        }
        /**
         * ユーザーネーム取得.
         */
        const usersRef = firebase.firestore().collection('users').doc(this.uid)
        usersRef.get().then(doc => {
          if (doc) {
            this.username = doc.data().name
          }
        })
        /**
         * カッピングリザルト取得.
         */
        const cuppingResultsRef = firebase.firestore().collection('users').doc(this.uid).collection('cupping_results')
        cuppingResultsRef.get().then(snapshot => {
          if (snapshot) {
            snapshot.forEach(doc => {
              this.cuppingResult.push(doc.data())
            })
          }
        })
      } else {
        this.$router.push('/signin') // ログイン状態でなければマイページにアクセスできない
      }
    })
  },
  methods: {
    startCupping() {
      this.$router.push('/cupping/roastLevel')
    },
    signOut() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
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
  margin-top: 50px;
  margin-bottom: 30px;
}

.container > button {
  margin-top: 30px;
}

.container > button:hover {
  color: #3490dc;
}

/** 
 * タブレット用ブレークポイント
 */
@media screen and (max-width: 1179px) {
  .title {
    font-size: 20px;
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
