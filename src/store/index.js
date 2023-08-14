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
    allFood: {},
    nonAssignedEmployees: [],
    drawerVisibility: true,
    cartVisibility: false,
    loadingState: false,
    myCart: {
      tableId: 0,
      orderNumber: '',
      amount: 0,
      phoneNumber: '',
      items: []
    }
  },
  getters: {
    getCurrentUser: (state) => state.currentUser,
    getToken: (state) => state.token,
    getAllEmployee: (state) => state.allEmployee,
    getAllNonAssignedEmployees: (state) => state.nonAssignedEmployees,
    getAllTableData: (state) => state.allTable,
    getAllFoodData: (state) => state.allFood,
    getMyCart: (state) => state.myCart,
    getDrawerVisibility: (state) => state.drawerVisibility,
    getCartVisibility: (state) => state.cartVisibility,
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

    async postFoodDetails({ commit }, payload) {
      try {
        commit('IS_LOADING', true)
        console.log('payload-addFood', payload)
        const response = await ApiCall.post('api/Food/create', payload)
        console.log(response.data)
        commit('IS_LOADING', false)
      } catch (error) {
        console.log(error)
        commit('IS_LOADING', false)
      }
    },

    async fetchAllFoodData({ commit }) {
      try {
        commit('IS_LOADING', true)
        const response = await ApiCall.get('api/Food/datatable')
        console.log(response.data)
        commit('ADD_ALL_FOOD', response.data)
        commit('IS_LOADING', false)
      } catch (error) {
        commit('IS_LOADING', false)
        console.log(error)
      }
    },
    async deleteEmployee({ commit }, payload) {
      try {
        commit('IS_LOADING', true)
        const response = await ApiCall.delete(`api/Employee/delete/${payload}`)
        console.log('delete-employee-pay', payload)
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

    async fetchNonAssignedEmployees({ commit }, payload) {
      try {
        commit('IS_LOADING', true)
        const response = await ApiCall.get(`api/Employee/non-assigned-employees/${payload}`)
        console.log(response.data)
        commit('ADD_ALL_NON_ASSIGNED_EMPLOYEES', response.data)
        commit('IS_LOADING', false)
      } catch (error) {
        commit('IS_LOADING', false)
        console.log(error)
      }
    },
    async assignEmployee({ commit }, payload) {
      try {
        commit('IS_LOADING', true)
        console.log('payload-assignEmployee', payload)
        const response = await ApiCall.post('api/EmployeeTable/create-range', payload)
        commit('ASSIGN_EMPLOYEE_DATA', payload)
        commit('IS_LOADING', false)
      } catch (error) {
        commit('IS_LOADING', false)
        console.log(error)
      }
    },

    updateCart({ commit }, payload) {
      commit('UPDATE_CART', payload)
    },
    decreaseCartItem({ commit }, payload) {
      commit('DECREASE_CART', payload)
    },
    increaseCartItem({ commit }, payload) {
      commit('INCREASE_CART', payload)
    },
    setTotalAmount({ commit }, payload) {
      commit('SET_TOTAL_AMOUNT', payload)
    },
    logoutUser({ commit }) {
      commit('DELETE_USER')
    },
    toggleDrawerVisibility({ commit }) {
      commit('TOGGLE_DRAWER')
    },
    toggleCartVisibility({ commit }) {
      commit('TOGGLE_CART')
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
    ADD_ALL_NON_ASSIGNED_EMPLOYEES(state, payload) {
      state.nonAssignedEmployees = payload
    },
    ASSIGN_EMPLOYEE_DATA(state, payload) {
      state.getAllTableData.data
        .filter((item) => item.id === payload.tableId)
        .employees.push([...payload])
    },

    ADD_ALL_FOOD(state, payload) {
      state.allFood = payload
    },
    TOGGLE_CART(state) {
      state.cartVisibility = !state.cartVisibility
    },
    UPDATE_CART(state, payload) {
      state.myCart = payload
    },
    DECREASE_CART(state, payload) {
      const duplicate = state.myCart.items.find((item) => item.foodId == payload.foodId)
      if (duplicate) {
        if (duplicate.quantity > 1) {
          duplicate.quantity = duplicate.quantity - 1
          duplicate.totalPrice = duplicate.quantity * duplicate.unitPrice
        } else {
          state.myCart.items = state.myCart.items.filter((item) => item.foodId !== payload.foodId)
        }
      }
    },
    INCREASE_CART(state, payload) {
      const duplicate = state.myCart.items.find((item) => item.foodId == payload.foodId)
      if (duplicate) {
        duplicate.quantity = duplicate.quantity + 1
        duplicate.totalPrice = duplicate.quantity * duplicate.unitPrice
      }
    },
    SET_TOTAL_AMOUNT(state, payload) {
      state.myCart.amount = state.myCart.items
        .map((item) => item.totalPrice)
        .reduce((acc, current) => {
          return acc + current
        }, 0)
    },
    IS_LOADING(state, payload) {
      state.loadingState = payload
    }
  }
})
