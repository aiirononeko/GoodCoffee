<template>
  <div class="container">
    <div v-if="Number(this.time[1]) < 1">
      <h2 class="title">沸騰したお湯を150g注ぎます</h2>
      <h2 class="title">タイマーをスタートしましょう</h2>
      <div>{{ time }}</div>
      <button @click="timerStart" v-if="!isRunning" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">スタート</button>
      <p>タイマーが1分を経過すると次のアクションがあります</p>
    </div>
    <div v-if="Number(this.time[1]) >= 1 && Number(this.time[1]) < 4">
      <h2 class="title">1分経過しました</h2>
      <h2 class="title">クラストのアロマはいかがですか？</h2>
      <div>{{ time }}</div>
      <div class="buttons">
        <button @click="setCrustForce" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">強い</button>
        <button @click="setCrustMedium" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">普通</button>
        <button @click="setCrustLight" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">弱い</button>
      </div>
      <p>タイマーが4分を経過すると次のアクションがあります</p>
    </div>
    <div v-if="Number(this.time[1]) >= 4 && !isBreakDone">
      <h2 class="title">4分経過しました</h2>
      <h2 class="title">ブレイクのアロマはいかがですか？</h2>
      <div>{{ time }}</div>
      <div class="buttons">
        <button @click="setBreakForce" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">強い</button>
        <button @click="setBreakMedium" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">普通</button>
        <button @click="setBreakLight" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">弱い</button>
      </div>
      <button @click="breakDone">次に進む</button>
    </div>
    <div v-if="isBreakDone">
      <h2 class="title">それではテイスティングをはじめましょう</h2>
      <h2 class="title">各項目を評価してください</h2>
      <div>{{ time }}</div>
      <div class="cupping_items">
        <div class="cupping_item">
          <label for="cleanCup">クリーンカップ</label>
          <input type="number" v-model="cleanCup">
        </div>
        <div class="cupping_item">
          <label for="sweet">甘さ</label>
          <input type="number" v-model="sweet">
        </div>
        <div class="cupping_item">
          <label for="acidity">酸</label>
          <input type="number" v-model="acidity">
        </div>
        <div class="cupping_item">
          <label for="mouseFeel">触感</label>
          <input type="number" v-model="mouseFeel">
        </div>
        <div class="cupping_item">
          <label for="flavor">フレーバー</label>
          <input type="number" v-model="flavor">
        </div>
        <div class="cupping_item">
          <label for="afterTaste">後味</label>
          <input type="number" v-model="afterTaste">
        </div>
        <div class="cupping_item">
          <label for="balance">バランス</label>
          <input type="number" v-model="balance">
        </div>
        <div class="cupping_item">
          <label for="overall">オーバーオール</label>
          <input type="number" v-model="overAll">
        </div>
      </div>
      <button @click="dispatchResult">次に進む</button>
    </div>
  </div>
</template>

<script>
import { Timer } from 'easytimer.js';
const timer = new Timer();

export default {
  data() {
    return {
      time: '00:00',
      isRunning: false,
      isBreakDone: false,
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
  methods: {
    timerStart() {
      timer.start()
      this.isRunning = true
      setInterval(() => {
        this.time = timer.getTimeValues().toString().slice(-5);
      }, 1000)
    },
    breakDone() {
      this.isBreakDone = true
    },
    setCrustForce() {
      this.crustAroma = '強い'
      this.$store.commit('cuppingResult/setCrustAroma', this.crustAroma)
    },
    setCrustMedium() {
      this.crustAroma = '普通'
      this.$store.commit('cuppingResult/setCrustAroma', this.crustAroma)
    },
    setCrustLight() {
      this.crustAroma = '弱い'
      this.$store.commit('cuppingResult/setCrustAroma', this.crustAroma)
    },
    setBreakForce() {
      this.breakAroma = '強い'
      this.$store.commit('cuppingResult/setBreakAroma', this.breakAroma)
    },
    setBreakMedium() {
      this.breakAroma = '普通'
      this.$store.commit('cuppingResult/setBreakAroma', this.breakAroma)
    },
    setBreakLight() {
      this.breakAroma = '弱い'
      this.$store.commit('cuppingResult/setBreakAroma', this.breakAroma)
    },
    dispatchResult() {
      this.$store.commit('cuppingResult/setCleanCup', this.cleanCup)
      this.$store.commit('cuppingResult/setSweet', this.sweet)
      this.$store.commit('cuppingResult/setAcidity', this.acidity)
      this.$store.commit('cuppingResult/setMouseFeel', this.mouseFeel)
      this.$store.commit('cuppingResult/setFlavor', this.flavor)
      this.$store.commit('cuppingResult/setAfterTaste', this.afterTaste)
      this.$store.commit('cuppingResult/setBalance', this.balance)
      this.$store.commit('cuppingResult/setOverAll', this.overAll)

      this.score = Number(this.cleanCup) + Number(this.sweet) + Number(this.acidity) + Number(this.mouseFeel) + Number(this.flavor) + Number(this.afterTaste) + Number(this.balance) + Number(this.overAll) + 36
      this.$store.commit('cuppingResult/setScore', this.score)

      this.$router.push('/cupping/beansInfo')
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

.cupping_item > input {
  margin-top: 10px;
  border: 1px #35495e solid;
}
</style>
