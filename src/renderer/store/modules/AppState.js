const state = () => {
  return {
    bodySide: 0,
  }
}

const mutations = {
  UPDATE_SIDE (state, side) {
    state.bodySide = side
  },
}

const actions = {
  setBodySide ({ commit }, side) {
    commit('UPDATE_SIDE', side)
  }
}

const getters = {
  bodySide (state) {
    return state.bodySide
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
