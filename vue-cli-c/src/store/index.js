import Vue from 'vue'
import Vuex from 'vuex'
import page1 from './page1'
import page2 from './page2'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    page1,
    page2,
  },
})

export default store