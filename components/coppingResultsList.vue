<template>
  <div class="flex shadow focus:shadow-outline focus:outline-none bg-gray-200 font-bold py-2 px-10 links" @click="goMoreInfo">
    <h2 class="flex-1 bg-gray-200">{{ country }}</h2>
    <h2 class="flex-1 bg-gray-200">{{ farmer }}</h2>
    <h2 class="flex-1 bg-gray-200">{{ process }}</h2>
    <h2 class="flex-1 bg-gray-200">Score: {{ score }}</h2>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  props: [
    'result_id'
  ],
  data() {
    return {
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
      overall: 0,
      score: 0
    }
  },
  beforeMount() {
    this.id = this.result_id.result_id
  },
  mounted() {
    const db = firebase.firestore()
    const coffeeRef = db.collection('coffee').doc(this.id)
    coffeeRef.get().then(doc => {
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
      this.overall = doc.data().overall
      this.score = doc.data().score
    })
  },
  methods: {
    goMoreInfo() {
      this.$router.push(`/coffee/${this.id}`)
    }
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 25px;
}

.links:hover {
  color: #3490dc;
}

.links {
  width: 80rem;
  padding-top: 40px;
}

/** 
 * タブレット用ブレークポイント
 */
@media screen and (max-width: 1179px) {
  .links {
    width: 50rem;
    padding-top: 40px;
  }
}

/**
 * スマホ用ブレークポイント
 */
@media screen and (max-width: 767px) {
  .links {
    width: 100%;
    padding-top: 40px;
    padding-right: 5px;
    padding-left: 5px;
  }
}
</style>
