import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    access_token: null,
    darkModeOn: null,
  },
  plugins: [createPersistedState()],
  mutations: {
    setAccess_token(state, payload){
      state.access_token = payload;
    },
    setCurrentUser(state, payload){
      state.currentUser = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
