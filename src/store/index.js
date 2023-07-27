import { createStore } from 'vuex'
import ApiCall from '../api/apiInterface'

const localStorageToken = localStorage.getItem('token')
const localStorageUser = localStorage.getItem('currentUser')

export default createStore({
  state: {
    token: localStorageToken ? localStorageToken : '',
    currentUser: localStorageUser ? JSON.parse(localStorageUser) : {},
    allEmployee: {},
    drawerVisibility: false,
    loadingState: false
  },
  getters: {
    getCurrentUser: (state) => state.currentUser,
    getToken: (state) => state.token,
    getAllEmployee: (state) => state.allEmployee,
    getDrawerVisibility: (state) => state.drawerVisibility,
    getLoadingState: (state) => state.loadingState
  },
  actions: {
    async loginUser({ commit }, payload) {
      try {
        commit('IS_LOADING', true)

        const response = await ApiCall.post('api/auth/signin', payload)

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('currentUser', JSON.stringify(response.data.user))

        commit('SET_USER', response.data)
        commit('IS_LOADING', false)
      } catch (error) {
        console.log(error)
        commit('IS_LOADING', false)
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
    },
    IS_LOADING(state, payload) {
      state.loadingState = payload
    }
  }
})
