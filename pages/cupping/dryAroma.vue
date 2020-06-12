<template>
  <div class="container">
    <h2 class="title">10gの豆を計量し、中粗挽きで挽きましょう</h2>
    <h2 class="title">ドライの状態のアロマはいかがですか？</h2>
    <div class="buttons">
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">強い</button>
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">普通</button>
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l buttons_item">弱い</button>
    </div>
    <nuxt-link to="/cupping/timer">次に進む</nuxt-link>
  </div>
</template>

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
