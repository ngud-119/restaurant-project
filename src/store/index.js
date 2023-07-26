import axios from 'axios'
import { createStore } from 'vuex'
import ApiCall from '../api/apiInterface'

const localStorageToken = localStorage.getItem('token')
const localStorageUser = localStorage.getItem('currentUser')

export default createStore({
  state: {
    token: localStorageToken ? localStorageToken : '',
    currentUser: localStorageUser ? JSON.parse(localStorageUser) : {}
  },
  getters: {
    getUser: (state) => state.currentUser
  },
  actions: {
    async loginUser({ commit }, payload) {
      try {
        ApiCall.post('api/auth/signin', payload).then((response) => {
          //   console.log(response.data.token)
          //   console.log(response.data.user)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('currentUser', JSON.stringify(response.data.user))
          commit('SET_USER', response.data)
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  mutations: {
    SET_USER(state, payload) {
      console.log(payload)
      state.currentUser = payload
    }
  }
})
