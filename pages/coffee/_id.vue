<template>
  <div class="container">
    <div>
      <h1 class="title my-10">{{ country }} {{ farmer }} {{ process }}</h1>
      <p class="mb-10">Cupped by {{ cupped }}</p>
    </div>
    <div class="chart">
      <Chart
        :cleanCup="cleanCup"
        :sweet="sweet"
        :acidity="acidity"
        :mouseFeel="mouseFeel"
        :flavor="flavor"
        :afterTaste="afterTaste"
        :balance="balance"
        :overAll="overAll"
      />
    </div>
    <div>
      <h2 class="title my-10">Score: {{ score }}</h2>
    </div>
    <div v-if="currentUser !== '' && uid === currentUser">
      <div class="flex-row mb-10">
        <button @click="shareOntoTwitter" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-blue-400 hover:bg-blue-500 text-gray-100 font-bold py-2 px-10">Twitterに投稿する</button>
        <button @click="shareOntoFacebook" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-indigo-400 hover:bg-indigo-500 text-gray-100 font-bold py-2 px-10">Facebookに投稿する</button>
      </div>
      <nuxt-link v-if="!anonymous" :to="`/users/${uid}`">マイページに戻る</nuxt-link>
      <div v-else-if="anonymous">
        <p>気に入っていただけましたか？アカウントを作成すればカッピングしたデータを保存できます。</p>
        <button @click="goSignInPage" class="shadow focus:shadow-outline focus:outline-none bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-8 rounded-l my-8 mx-10">アカウントを作成する</button>
      </div>
    </div>
    <div v-else-if="currentUser === ''">
      <p>あなたもカッピングを始めてみませんか？</p>
      <button @click="goTutorial" class="shadow focus:shadow-outline focus:outline-none bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-8 rounded-l mt-8 mx-10">アカウントを作らずに試す</button>
      <button @click="goSignInPage" class="shadow focus:shadow-outline focus:outline-none bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-8 rounded-l my-8 mx-10">アカウントを作成する</button>
    </div>
    <nuxt-link v-if="!anonymous && uid !== currentUser" :to="`/users/${uid}`">マイページに戻る</nuxt-link>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import Chart from '~/components/RaderChart.vue'

export default {
  components: {
    Chart
  },
  data() {
    return {
      uid: '', // カッピングしたユーザー
      currentUser: '', // ログインしているユーザー
      id: '', // coffeeコレクションのドキュメントID
      cupped: '',
      country: '',
      farmer: '',
      elevation: 0,
      process: '',
      variety: '',
      roastLeval: 0,
      dryAroma: '',
      crustAroma: '',
      breakAroma: '',
      cleanCup: 0,
      sweet: 0,
      acidity: 0,
      mouseFeel: 0,
      flavor: 0,
      afterTaste: 0,
      balance: 0,
      overAll: 0,
      score: 0,
      anonymous: false,
    }
  },
  async beforeCreate() {
    this.$nextTick(async () => {
      this.id = this.$route.params.id

      await firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.currentUser = user.uid
          this.anonymous = user.isAnonymous
        }
      })

      const db = firebase.firestore()
      const coffeeRef = await db.collection('coffee').doc(this.id)
      await coffeeRef.get().then(doc => {
        this.uid = doc.data().uid
        this.cupped = doc.data().cupped
        this.country = doc.data().country
        this.farmer = doc.data().farmer
        this.elevation = doc.data().elevation
        this.process = doc.data().process
        this.variety = doc.data().variety
        this.roastLeval = doc.data().roastLeval
        this.dryAroma = doc.data().dryAroma
        this.crustAroma = doc.data().crustAroma
        this.breakAroma = doc.data().breakAroma
        this.cleanCup = doc.data().cleanCup
        this.sweet = doc.data().sweet
        this.acidity = doc.data().acidity
        this.mouseFeel = doc.data().mouseFeel
        this.flavor = doc.data().flavor
        this.afterTaste = doc.data().afterTaste
        this.balance = doc.data().balance
        this.overAll = doc.data().overAll
        this.score = doc.data().score
      })
    })
  },
  methods: {
    shareOntoFacebook() {
      const url = encodeURIComponent('https://goodcoffee.dev')
      const fbURL = `https://www.facebook.com/sharer/sharer.php?src=bm&u=${url}&t=「GoodCoffee」でコーヒーをカッピングしました！\n${this.country} ${this.farmer} ${this.process}のコーヒーは${this.score}点でした！`
      window.open(fbURL, '_blank')
    },
    shareOntoTwitter() {
      const url = encodeURIComponent('https://goodcoffee.dev')
      const twURL = `https://twitter.com/intent/tweet?url=${url}&text=「GoodCoffee」でコーヒーをカッピングしました！\n${this.country} ${this.farmer} ${this.process}のコーヒーは${this.score}点でした！\n&hashtags=GoodCoffee&hashtags=カッピングシェア`
      window.open(twURL, '_blank')
    },
    goSignInPage() {
      this.$router.push('/signup')
    },
    async goTutorial() {
      await firebase.auth().signInAnonymously().then(async res => {
        const db = firebase.firestore()
        const usersRef = db.collection('users').doc(res.user.uid)
        await usersRef.set({
          uid: res.user.uid,
          name: '匿名'
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
}
</script>

<style>
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

a:hover {
  color: #3490dc;
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
