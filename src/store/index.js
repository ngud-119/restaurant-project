import { createStore } from 'vuex'
import ApiCall from '../api/apiInterface'

const localStorageToken = localStorage.getItem('token')
const localStorageUser = localStorage.getItem('currentUser')

export default createStore({
  state: {
    token: localStorageToken ? localStorageToken : '',
    currentUser: localStorageUser ? JSON.parse(localStorageUser) : {},
    allEmployee: {},
    allTable: {},
    drawerVisibility: true,
    loadingState: false
  },
  getters: {
    getCurrentUser: (state) => state.currentUser,
    getToken: (state) => state.token,
    getAllEmployee: (state) => state.allEmployee,
    getAllTableData: (state) => state.allTable,
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
        commit('IS_LOADING', true)
        const response = await ApiCall.get('api/Employee/datatable')
        console.log(response.data)
        commit('ADD_ALL_EMPLOYEE', response.data)
        commit('IS_LOADING', false)
      } catch (error) {
        commit('IS_LOADING', false)
        console.log(error)
      }
    },

    async postEmployee({ commit }, payload) {
      try {
        commit('IS_LOADING', true)
        const response = await ApiCall.post('api/Employee/create', payload)
        console.log(response.data)
        commit('IS_LOADING', false)
      } catch (error) {
        console.log(error)
        commit('IS_LOADING', false)
      }
    },
    async deleteEmployee({ commit }, payload) {
      try {
        console.log('pay', payload)
        commit('IS_LOADING', true)
        const response = await ApiCall.delete(`api/Employee/delete/${payload}`)
        console.log("delete-employee-pay", payload)
        commit('REMOVE_EMPLOYEE', payload)
        commit('IS_LOADING', false)
      } catch (error) {
        console.log(error)
        commit('IS_LOADING', false)
      }
    },
    async fetchAllTable({ commit }, payload) {
      try {
        commit('IS_LOADING', true)
        const response = await ApiCall.get('api/Table/datatable')
        console.log(response.data)
        commit('ADD_ALL_TABLE', response.data)
        commit('IS_LOADING', false)
      } catch (error) {
        commit('IS_LOADING', false)
        console.log(error)
      }
    },
    async postTable({ commit }, payload) {
      try {
        commit('IS_LOADING', true)
        console.log('payload', payload)
        const response = await ApiCall.post('api/Table/create', payload)
        console.log(response.data)
        commit('IS_LOADING', false)
      } catch (error) {
        commit('IS_LOADING', false)
        console.log(error)
      }
    },

    async assignEmployee({ commit }, payload) {
      try {
        commit('IS_LOADING', true)
        console.log('payload', payload)
        //const response = await ApiCall.post('api/EmployeeTable/create', payload)
        //console.log(response.data)
        commit('IS_LOADING', false)
      } catch (error) {
        commit('IS_LOADING', false)
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
    REMOVE_EMPLOYEE(state, payload) {
      state.allEmployee.data = state.allEmployee.data.filter((employee) => employee.id !== payload)
    },
    ADD_ALL_TABLE(state, payload) {
      state.allTable = payload
    },
    IS_LOADING(state, payload) {
      state.loadingState = payload
    }
  }
})
