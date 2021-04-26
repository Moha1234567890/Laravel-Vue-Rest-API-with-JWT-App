import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: null,
    token: null
  },
  
  plugins: [new VuexPersistence().plugin],


  mutations: {
    SET_loggedIn(state, payload) {
      state.loggedIn = payload

    },
    SET_user(state, payload) {
      state.user = payload

    },
    SET_token(state, payload) {
      state.token = payload

    },
  },

  actions: {

      //create this action to check for login credinitianls

    doLoginAction({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        axios.post("http://127.0.0.1:8000/api/auth/login",{
             email: payload.email,
             password: payload.password,
             token: state.token
              
            })
            .then(res => {
              commit("SET_token", res.data.access_token)
              commit("SET_user", res.data.user)
              commit("SET_loggedIn", true)
              resolve(res)
            })
            .catch(err => {
              reject(err)
            })
      })
      
    },

    doRegisrAction({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios.post("http://127.0.0.1:8000/api/auth/register",{
             name: payload.name,
             email: payload.email,
             password: payload.password,
              
            })
            .then(res => {
              commit("SET_token", res.data.access_token)
              commit("SET_user", res.data.user)
              commit("SET_loggedIn", true)
              resolve(res)
            })
            .catch(err => {
              reject(err)
            })
      })
      
    },

    doLogoutAction({commit , state}) {

      return new Promise((resolve, reject) => {
        axios.post("http://127.0.0.1:8000/api/auth/logout", {
         token: state.token})
         .then(res => {
          commit("SET_token", null)
          commit("SET_user", null)
          commit("SET_loggedIn", false)
          resolve(res)
         })
         .catch(err => {
           reject(err)
         })
      })
    },

    updateProfileAction({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch("http://localhost:8000/api/auth/update", {
            name: payload.name,
            email: payload.email,
            token: state.token
          })
          .then(res => {
            commit("SET_user", res.data.user);
  
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },

 

    
 
  getters: {
    get_loggedIn(state) {
      return state.loggedIn
    },

    get_user(state) {
      return state.user
    }
  }
});
