<template>
  <div class="container">
    <h2 class="title">最後に、カッピングした豆の情報を教えてください</h2>
    <div class="beans_infomations">
      <div class="beans_information">
        <label for="country">生産国</label>
        <input type="text">
      </div>
      <div class="beans_information">
        <label for="farmer">農園・生産者</label>
        <input type="text">
      </div>
      <div class="beans_information">
        <label for="process">プロセス</label>
        <input type="text">
      </div>
      <div class="beans_information">
        <label for="elevation">標高</label>
        <input type="text">
      </div>
      <div class="beans_information">
        <label for="variety">品種</label>
        <input type="text">
      </div>
    </div>
    <nuxt-link to="/coffee/">カッピングを終了する</nuxt-link>
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

.beans_information > input {
  margin-top: 10px;
  border: 1px #35495e solid;
}
</style>
