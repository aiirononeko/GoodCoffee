<template>
  <div class="container">
    <h2 class="title my-10">最後に、カッピングした豆の情報を教えてください</h2>
    <div class="beans_infomations">
      <form class="w-full max-w-sm mb-10">
        <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input v-model="country" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="生産国">
        </div>
        <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input v-model="farmer" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="農園・生産者">
        </div>
        <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input v-model="process" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="プロセス">
        </div>
        <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input v-model="elevation" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" placeholder="標高">
        </div>
        <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input v-model="variety" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="品種">
        </div>
      </form>
    </div>
    <button @click="dispathBeansInfo" class="shadow focus:shadow-outline focus:outline-none bg-blue-300 hover:bg-blue-500 text-gray-800 font-bold py-2 px-10 rounded-l start_button mt-5">カッピングを終了する</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      country: '',
      farmer: '',
      elevation: '',
      process: '',
      variety: '',
    }
  },
  methods: {
    dispathBeansInfo() {
      this.$store.commit('cuppingResult/setCountry', this.country)
      this.$store.commit('cuppingResult/setFarmer', this.farmer)
      this.$store.commit('cuppingResult/setElevation', Number(this.elevation))
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

/**
 * スマホ用ブレークポイント
 */
@media screen and (max-width: 767px) {
  .title {
    font-size: 25px;
  }

  .user_form_items {
    width: 60%;
  }
}
</style>
