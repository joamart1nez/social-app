import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    dataUser: null ,
  },
  mutations: {
    setToken(state, payload){
      state.token = payload;
    },
    setDataUser(state, payload){
      state.dataUser = payload
    }
  },
  actions: {
    getToken({commit}){
      if(localStorage.getItem('token')){
        commit('setToken', localStorage.getItem('token'));
      }else{
        commit('setToken', null);
      }
    },
    logout({commit}){
      commit('setToken', null);
      localStorage.removeItem('token');
    },
    async route({commit, state}) {
      const res = await fetch(`http://localhost:3000/api/admin`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": state.token
        },
      });
      const resDB = await res.json();
      if (resDB.error === null) {
        await commit('setDataUser', resDB.dataUser);
      } else {
        await commit('setDataUser', resDB.error)
      }
      console.log(state.dataUser)
    },
  },
  created(state){
  }
})
