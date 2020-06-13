<template>
  <div class="container">
    <h2 class="title my-5">10gの豆を計量し、中粗挽きで挽きましょう</h2>
    <h2 class="title my-5">ドライの状態のアロマはいかがですか？</h2>
    <div class="flex my-10 buttons">
      <button @click="setDryAromaForce" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-pink-200 hover:bg-pink-300 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">強い</button>
      <button @click="setDryAromaMedium" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-purple-200 hover:bg-purple-300 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">普通</button>
      <button @click="setDryAromaLight" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-yellow-200 hover:bg-yellow-300 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">弱い</button>
    </div>
    <nuxt-link to="/cupping/timer">次に進む</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dryAroma: '',
    }
  },
  methods: {
    setDryAromaForce() {
      this.dryAroma = '強い'
      this.$store.commit('cuppingResult/setDryAroma', this.dryAroma)
    },
    setDryAromaMedium() {
      this.dryAroma = '普通'
      this.$store.commit('cuppingResult/setDryAroma', this.dryAroma)
    },
    setDryAromaLight() {
      this.dryAroma = '軽い'
      this.$store.commit('cuppingResult/setDryAroma', this.dryAroma)
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

.buttons {
  width: 60%;
}

a:hover {
  color: #3490dc;
}

/** 
 * タブレット用ブレークポイント
 */
@media screen and (max-width: 1179px) {
  .title {
    font-size: 30px;
  }

  .buttons {
    width: 70%;
  }
}

/**
 * スマホ用ブレークポイント
 */
@media screen and (max-width: 767px) {
  .title {
    font-size: 20px;
  }

  .buttons {
    width: 100%;
  }
}
</style>
