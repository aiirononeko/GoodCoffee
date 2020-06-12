<template>
  <div class="container">
    <div>
      <button @click="createCuppingData" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l user_form_items">カッピングを始める</button>
    </div>
    <div>
      <h2 class="title">{{ uid }}さんがカッピングしたコーヒー</h2>
      <div v-for="(result, i) in cuppingResult" :key="i">
        <List :result_id="result" />
      </div>
    </div>
    <nuxt-link to="/">トップページに戻る</nuxt-link>
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
    createCuppingData() { // 開発用メソッド（機能開発後に削除）
      const cuppingResult = {
        uid: this.uid,
        country: 'コスタリカ',
        farmer: 'ドンマヨ',
        elevation: 1800,
        process: 'ハニー',
        variety: 'ブルボン',
        roastLeval: 30, // 1~100
        dryAroma: '普通',
        crustAroma: '普通',
        breakAroma: '普通',
        cleanCup: 7.5,
        sweet: 7,
        acidity: 7,
        mouseFeel: 6.5,
        flavor: 6,
        afterTaste: 7,
        balance: 7.5,
        overAll: 7.5,
        score: 87.3
      }
      const db = firebase.firestore()
      const coffeeRef = db.collection('coffee')
      coffeeRef.add(cuppingResult).then(res => {
        console.log('success')
        const cuppingResultsRef
          = db.collection('users').doc(this.uid).collection('cupping_results').doc(res.id)
        cuppingResultsRef.set({ result_id: res.id }) // カッピングリザルトをusersコレクションのサブコレクションとして保存
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
</style>
