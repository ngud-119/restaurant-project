import { createStore } from 'vuex'
import ApiCall from '../api/apiInterface'

const localStorageToken = localStorage.getItem('token')
const localStorageUser = localStorage.getItem('currentUser')

export default createStore({
  state: {
    token: localStorageToken ? localStorageToken : '',
    currentUser: localStorageUser ? JSON.parse(localStorageUser) : {},
    drawerVisibility: false,
    allEmployee: {}
  },
  getters: {
    getCurrentUser: (state) => state.currentUser,
    getToken: (state) => state.token,
    getDrawerVisibility: (state) => state.drawerVisibility,
    getAllEmployee: (state) => state.allEmployee
  },
  actions: {
    async loginUser({ commit }, payload) {
      try {
        const response = await ApiCall.post('api/auth/signin', payload)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('currentUser', JSON.stringify(response.data.user))
        commit('SET_USER', response.data)
      } catch (error) {
        console.log(error)
      }
    },

    async fetchAllEmployee({ commit }, payload) {
      try {
        const response = await ApiCall.get('api/Employee/datatable')
        console.log(response.data)
        commit('ADD_ALL_EMPLOYEE', response.data)
      } catch (error) {
        console.log(error)
      }
    },

    logoutUser({ commit }) {
      commit('DELETE_USER')
    },
    toggleDrawerVisibility({ commit }) {
      commit('TOGGLE_DRAWER')
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.currentUser = payload.user
      state.token = payload.token
    },
    DELETE_USER(state) {
      state.currentUser = {}
      state.token = ''
    },
    TOGGLE_DRAWER(state) {
      state.drawerVisibility = !state.drawerVisibility
    },
    ADD_ALL_EMPLOYEE(state, payload) {
      state.allEmployee = payload
    }
  }
})
