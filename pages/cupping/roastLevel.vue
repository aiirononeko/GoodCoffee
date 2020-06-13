<template>
  <div class="container">
    <h2 class="title my-10">まずはローストレベルを確認しましょう</h2>
    <div class="flex my-10 buttons">
      <button @click="setRoastLevelDark" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-orange-800 hover:bg-orange-900 text-orange-100 font-bold py-2 px-10 buttons_item">ダーク</button>
      <button @click="setRoastLevelMedium" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-yellow-600 hover:bg-yellow-700 text-yellow-300 font-bold py-2 px-10 buttons_item">ミディアム</button>
      <button @click="setRoastLevelLight" class="flex-1 shadow focus:shadow-outline focus:outline-none bg-yellow-400 hover:bg-yellow-500 text-black-100 font-bold py-2 px-10 buttons_item">ライト</button>
    </div>
    <nuxt-link to="/cupping/dryAroma">次に進む</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roastLeval: '',
    }
  },
  methods: {
    setRoastLevelDark() {
      this.roastLeval = 'ダーク'
      this.$store.commit('cuppingResult/setRoastLeval', this.roastLeval)
    },
    setRoastLevelMedium() {
      this.roastLeval = 'ミディアム'
      this.$store.commit('cuppingResult/setRoastLeval', this.roastLeval)
    },
    setRoastLevelLight() {
      this.roastLeval = 'ライト'
      this.$store.commit('cuppingResult/setRoastLeval', this.roastLeval)
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
