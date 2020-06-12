<template>
  <div class="container">
    <h2 class="title">まずはローストレベルを確認しましょう</h2>
    <div class="buttons">
      <button @click="setRoastLevelDark" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">ダーク</button>
      <button @click="setRoastLevelMedium" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">ミディアム</button>
      <button @click="setRoastLevelLight" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">ライト</button>
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
  display: flex;
  flex-direction: row;
}

.buttons_item {
  margin-left: 10px;
}
</style>
