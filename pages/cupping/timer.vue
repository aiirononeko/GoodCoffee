<template>
  <div class="container">
    <h2 class="title">沸騰したお湯を150g注ぎます</h2>
    <h2 class="title">タイマーをスタートしましょう</h2>
    <div>{{ time }}</div>
    <button @click="timerStart" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">スタート</button>
    <p>1分間待ちましょう</p>
  </div>
</template>

<script>
import { Timer } from 'easytimer.js';
const timer = new Timer();

export default {
  data() {
    return {
      time: '00:00',
    }
  },
  methods: {
    timerStart() {
      timer.start()
      setInterval(() => {
        this.time = timer.getTimeValues().toString().slice(-5);
      }, 1000)
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
