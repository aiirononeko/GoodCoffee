<template>
  <div class="container">
    <h2 class="title">最後に、カッピングした豆の情報を教えてください</h2>
    <div class="beans_infomations">
      <div class="beans_information">
        <label for="country">生産国</label>
        <input type="text" v-model="country">
      </div>
      <div class="beans_information">
        <label for="farmer">農園・生産者</label>
        <input type="text" v-model="farmer">
      </div>
      <div class="beans_information">
        <label for="process">プロセス</label>
        <input type="text" v-model="process">
      </div>
      <div class="beans_information">
        <label for="elevation">標高</label>
        <input type="number" v-model="elevation">
      </div>
      <div class="beans_information">
        <label for="variety">品種</label>
        <input type="text" v-model="variety">
      </div>
    </div>
    <button @click="dispathBeansInfo">カッピングを終了する</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      country: '',
      farmer: '',
      elevation: 0,
      process: '',
      variety: '',
    }
  },
  methods: {
    dispathBeansInfo() {
      this.$store.commit('cuppingResult/setCountry', this.country)
      this.$store.commit('cuppingResult/setFarmer', this.farmer)
      this.$store.commit('cuppingResult/setElevation', this.elevation)
      this.$store.commit('cuppingResult/setProcess', this.process)
      this.$store.commit('cuppingResult/setVariety', this.variety)

      const db = firebase.firestore()
      const coffeeRef = db.collection('coffee')
      coffeeRef.add(this.$store.state.cuppingResult).then(res => {
        console.log('success')
        console.log(res.id)
        const cuppingResultsRef
          = db.collection('users').doc(firebase.auth().currentUser.uid).collection('cupping_results').doc(res.id)
        cuppingResultsRef.set({ result_id: res.id }) // カッピングリザルトをusersコレクションのサブコレクションとして保存

        this.$router.push(`/coffee/${res.id}`)
      }).catch(err => {
        console.log(err.message)
      })
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

.beans_information > input {
  margin-top: 10px;
  border: 1px #35495e solid;
}
</style>
