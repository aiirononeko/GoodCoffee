<template>
  <div class="container">
    <div class="container" v-if="Number(this.time[1]) < 1">
      <h2 class="title mt-10 mb-5">沸騰したお湯を150g注ぎます</h2>
      <h2 class="title mb-10">タイマーをスタートしましょう</h2>
      <div class="timer my-10">{{ time }}</div>
      <button @click="timerStart" v-if="!isRunning" class="shadow focus:shadow-outline focus:outline-none bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l start_button">スタート</button>
      <p class="mt-10 text-green-600">タイマーが1分を経過すると次のアクションがあります</p>
      <p class="info my-10">3 / 6</p>
    </div>
    <div class="containers" v-if="Number(this.time[1]) >= 1 && Number(this.time[1]) < 4">
      <h2 class="title mt-10 mb-5">1分経過しました</h2>
      <h2 class="title mb-10">クラストのアロマはいかがですか？</h2>
      <div class="timer my-10">{{ time }}</div>
      <div class="flex buttons my-10">
        <button @click="setCrustForce" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-pink-200 hover:bg-pink-300 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">強い</button>
        <button @click="setCrustMedium" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-purple-200 hover:bg-purple-300 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">普通</button>
        <button @click="setCrustLight" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-yellow-200 hover:bg-yellow-300 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">弱い</button>
      </div>
      <p v-if="this.crustAroma !== ''">あなたは{{ this.crustAroma }}を選択しています</p>
      <p v-else>香りの強さを選択してください</p>
      <p class="mt-10 text-green-600">タイマーが4分を経過すると次のアクションがあります</p>
      <p class="info my-10">3 / 6</p>
    </div>
    <div v-if="Number(this.time[1]) >= 4 && !isBreakDone">
      <h2 class="title mt-10 mb-5">4分経過しました</h2>
      <h2 class="title mb-10">ブレイクのアロマはいかがですか？</h2>
      <div class="timer my-10">{{ time }}</div>
      <div class="flex buttons my-10">
        <button @click="setBreakForce" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-pink-200 hover:bg-pink-300 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">強い</button>
        <button @click="setBreakMedium" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-purple-200 hover:bg-purple-300 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">普通</button>
        <button @click="setBreakLight" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-yellow-200 hover:bg-yellow-300 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">弱い</button>
      </div>
      <p v-if="this.breakAroma !== ''">あなたは{{ this.breakAroma }}を選択しています</p>
      <p v-else>香りの強さを選択してください</p>
      <button @click="breakDone" class="next mt-10">次に進む</button>
      <p class="info my-10">4 / 6</p>
    </div>
    <div class="container" v-if="isBreakDone">
      <h2 class="title mt-10 mb-5">それではテイスティングをはじめましょう</h2>
      <h2 class="title mb-10">各項目を評価してください</h2>
      <div class="timer my-10">{{ time }}</div>
      <div class="cupping_items my-5">
        <div class="flex custom_flex">
          <div class="cupping_item flex flex-col">
            <label for="cleanCup">クリーンカップ</label>
            <div class="inline-block relative w-64">
              <select v-model="cleanCup" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>0</option>
                <option>0.5</option>
                <option>1</option>
                <option>1.5</option>
                <option>2</option>
                <option>2.5</option>
                <option>3</option>
                <option>3.5</option>
                <option>4</option>
                <option>4.5</option>
                <option>5</option>
                <option>5.5</option>
                <option>6</option>
                <option>6.5</option>
                <option>7</option>
                <option>7.5</option>
                <option>8</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div class="cupping_item flex flex-col">
            <label for="sweet">甘さ</label>
            <div class="inline-block relative w-64">
              <select v-model="sweet" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>0</option>
                <option>0.5</option>
                <option>1</option>
                <option>1.5</option>
                <option>2</option>
                <option>2.5</option>
                <option>3</option>
                <option>3.5</option>
                <option>4</option>
                <option>4.5</option>
                <option>5</option>
                <option>5.5</option>
                <option>6</option>
                <option>6.5</option>
                <option>7</option>
                <option>7.5</option>
                <option>8</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div class="cupping_item flex flex-col">
            <label for="acidity">酸</label>
            <div class="inline-block relative w-64">
              <select v-model="acidity" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>0</option>
                <option>0.5</option>
                <option>1</option>
                <option>1.5</option>
                <option>2</option>
                <option>2.5</option>
                <option>3</option>
                <option>3.5</option>
                <option>4</option>
                <option>4.5</option>
                <option>5</option>
                <option>5.5</option>
                <option>6</option>
                <option>6.5</option>
                <option>7</option>
                <option>7.5</option>
                <option>8</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div class="cupping_item flex flex-col">
            <label for="mouseFeel">触感</label>
            <div class="inline-block relative w-64">
              <select v-model="mouseFeel" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>0</option>
                <option>0.5</option>
                <option>1</option>
                <option>1.5</option>
                <option>2</option>
                <option>2.5</option>
                <option>3</option>
                <option>3.5</option>
                <option>4</option>
                <option>4.5</option>
                <option>5</option>
                <option>5.5</option>
                <option>6</option>
                <option>6.5</option>
                <option>7</option>
                <option>7.5</option>
                <option>8</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div class="flex mt-5 custom_flex">
          <div class="cupping_item flex flex-col">
            <label for="flavor">フレーバー</label>
            <div class="inline-block relative w-64">
              <select v-model="flavor" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>0</option>
                <option>0.5</option>
                <option>1</option>
                <option>1.5</option>
                <option>2</option>
                <option>2.5</option>
                <option>3</option>
                <option>3.5</option>
                <option>4</option>
                <option>4.5</option>
                <option>5</option>
                <option>5.5</option>
                <option>6</option>
                <option>6.5</option>
                <option>7</option>
                <option>7.5</option>
                <option>8</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div class="cupping_item flex flex-col">
            <label for="afterTaste">後味</label>
            <div class="inline-block relative w-64">
              <select v-model="afterTaste" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>0</option>
                <option>0.5</option>
                <option>1</option>
                <option>1.5</option>
                <option>2</option>
                <option>2.5</option>
                <option>3</option>
                <option>3.5</option>
                <option>4</option>
                <option>4.5</option>
                <option>5</option>
                <option>5.5</option>
                <option>6</option>
                <option>6.5</option>
                <option>7</option>
                <option>7.5</option>
                <option>8</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div class="cupping_item flex flex-col">
            <label for="balance">バランス</label>
            <div class="inline-block relative w-64">
              <select v-model="balance" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>0</option>
                <option>0.5</option>
                <option>1</option>
                <option>1.5</option>
                <option>2</option>
                <option>2.5</option>
                <option>3</option>
                <option>3.5</option>
                <option>4</option>
                <option>4.5</option>
                <option>5</option>
                <option>5.5</option>
                <option>6</option>
                <option>6.5</option>
                <option>7</option>
                <option>7.5</option>
                <option>8</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div class="cupping_item flex flex-col">
            <label for="overall">オーバーオール</label>
            <div class="inline-block relative w-64">
              <select v-model="overAll" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>0</option>
                <option>0.5</option>
                <option>1</option>
                <option>1.5</option>
                <option>2</option>
                <option>2.5</option>
                <option>3</option>
                <option>3.5</option>
                <option>4</option>
                <option>4.5</option>
                <option>5</option>
                <option>5.5</option>
                <option>6</option>
                <option>6.5</option>
                <option>7</option>
                <option>7.5</option>
                <option>8</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button @click="dispatchResult" class="next m-5 mb-10">次に進む</button>
      <p class="info my-10">5 / 6</p>
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
      cleanCup: '',
      sweet: '',
      acidity: '',
      mouseFeel: '',
      flavor: '',
      afterTaste: '',
      balance: '',
      overAll: '',
      score: '',
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
      this.$store.commit('cuppingResult/setCleanCup', Number(this.cleanCup))
      this.$store.commit('cuppingResult/setSweet', Number(this.sweet))
      this.$store.commit('cuppingResult/setAcidity', Number(this.acidity))
      this.$store.commit('cuppingResult/setMouseFeel', Number(this.mouseFeel))
      this.$store.commit('cuppingResult/setFlavor', Number(this.flavor))
      this.$store.commit('cuppingResult/setAfterTaste', Number(this.afterTaste))
      this.$store.commit('cuppingResult/setBalance', Number(this.balance))
      this.$store.commit('cuppingResult/setOverAll', Number(this.overAll))

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
  font-size: 40px;
  color: #35495e;
  letter-spacing: 1px;
}

.start_button {
  width: 60%;
}

.timer {
  font-size: 50px;
}

.next:hover {
  color: #3490dc;
}

.info {
  font-size: 180%;
}

/** 
 * タブレット用ブレークポイント
 */
@media screen and (max-width: 1179px) {
  .title {
    font-size: 30px;
  }

  .cupping_items {
    display: flex;
  }

  .custom_flex {
    flex-direction: column;
    margin: 0;
  }

  .info {
    font-size: 150%;
  }
}

/**
 * スマホ用ブレークポイント
 */
@media screen and (max-width: 767px) {
  .title {
    font-size: 20px;
    margin: 10px auto;
    margin-top: 30px;
  }

  .cupping_items {
    flex-wrap: wrap;
    justify-content: center;
  }

  .cupping_item {
    margin: 0;
    margin-bottom: 10px;
  }

  .info {
    font-size: 150%;
  }
}
</style>
