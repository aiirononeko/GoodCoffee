<template>
  <div class="container">
    <div>
      <h1 class="title">{{ country }} {{ farmer }} {{ process }}</h1>
    </div>
    <div>
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
      <h2>Score {{ score }}</h2>
    </div>
    <div>
      <p>Twitterに投稿する</p>
      <p>Facebookに投稿する</p>
    </div>
    <nuxt-link :to="`/users/${uid}`">マイページに戻る</nuxt-link>
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
      uid: '',
      id: '',
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
      score: 0
    }
  },
  async beforeCreate() {
    this.$nextTick(async () => {
      this.id = this.$route.params.id
      await firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          this.uid = user.uid
          // if (this.uid != this.$route.params.id) {
          //   this.$router.push(`/users/${this.uid}`) // 自分以外のリザルトにアクセスできない
          // }
          const db = firebase.firestore()
          const coffeeRef = db.collection('coffee').doc(this.id)
          await coffeeRef.get().then(doc => {
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
        } else {
          this.$router.push('/signin') // ログイン状態でなければアクセスできない
        }
      })
    })
  },
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
</style>
