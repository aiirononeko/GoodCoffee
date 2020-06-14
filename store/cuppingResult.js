export const state = () => ({
  uid: '',
  cupped: '',
  country: '',
  farmer: '',
  elevation: 0,
  process: '',
  variety: '',
  roastLeval: '',
  dryAroma: '',
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
  score: 0,
})

export const getters = {
  uid: state => state.uid,
  copped: state => state.cupped,
  country: state => state.country,
  farmer: state => state.farmer,
  elevation: state => state.elevation,
  process: state => state.process,
  variety: state => state.variety,
  roastLeval: state => state.roastLeval,
  dryAroma: state => state.dryAroma,
  crustAroma: state => state.crustAroma,
  breakAroma: state => state.breakAroma,
  cleanCup: state => state.cleanCup,
  sweet: state => state.sweet,
  acidity: state => state.acidity,
  mouseFeel: state => state.mouseFeel,
  flavor: state => state.flavor,
  afterTaste: state => state.afterTaste,
  balance: state => state.balance,
  overall: state => state.overAll,
  score: state => state.score,
}

export const mutations = {
  setUid(state, payload) {
    state.uid = payload
  },
  setCupped(state, payload) {
    state.cupped = payload
  },
  setCountry(state, payload) {
    state.country = payload
  },
  setFarmer(state, payload) {
    state.farmer = payload
  },
  setElevation(state, payload) {
    state.elevation = payload
  },
  setProcess(state, payload) {
    state.process = payload
  },
  setVariety(state, payload) {
    state.variety = payload
  },
  setRoastLeval(state, payload) {
    state.roastLeval = payload
  },
  setDryAroma(state, payload) {
    state.dryAroma = payload
  },
  setCrustAroma(state, payload) {
    state.crustAroma = payload
  },
  setBreakAroma(state, payload) {
    state.breakAroma = payload
  },
  setCleanCup(state, payload) {
    state.cleanCup = payload
  },
  setSweet(state, payload) {
    state.sweet = payload
  },
  setAcidity(state, payload) {
    state.acidity = payload
  },
  setMouseFeel(state, payload) {
    state.mouseFeel = payload
  },
  setFlavor(state, payload) {
    state.flavor = payload
  },
  setAfterTaste(state, payload) {
    state.afterTaste = payload
  },
  setBalance(state, payload) {
    state.balance = payload
  },
  setOverAll(state, payload) {
    state.overAll = payload
  },
  setScore(state, payload) {
    state.score = payload
  },
}
