const state = () => {
  return {
    status: '',
  }
}

const mutations = {
  UPDATE_CONN_STATUS (state, value) {
    state.status = value
  }
}

const actions = {
  setConnStatus ({ commit }, value) {
    commit('UPDATE_CONN_STATUS', value)
  }
}

const getters = {
  connStatus (state) {
    return state.status
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}

