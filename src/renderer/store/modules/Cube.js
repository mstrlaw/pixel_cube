const state = () => {
  return {
    registering: true,
    cubeConfig: [
      {
        id: 'side-1',
        face: 1,
        labelValue: '',
        currentTime: 0,
        color: '#4CAF50', // Green
      },
      {
        id: 'side-2',
        face: 2,
        labelValue: '',
        currentTime: 0,
        color: '#F44336', // Red
      },
      {
        id: 'side-3',
        face: 3,
        labelValue: '',
        currentTime: 0,
        color: '#FDCF1A', // Yellow
      },
      {
        id: 'side-4',
        face: 4,
        labelValue: '',
        currentTime: 0,
        color: '#EA282E', // Orange
      },
      {
        id: 'side-5',
        face: 5,
        labelValue: '',
        currentTime: 0,
        color: '#00a6f1', // Blue
      },
      {
        id: 'side-6',
        face: 6,
        labelValue: '',
        currentTime: 0,
        color: '#673ab7', // Purple
      },
    ]
  }
}

const mutations = {
  UPDATE_SIDE_LABEL (state, { sideId='', label='' }) {
    let i = state.cubeConfig.findIndex( side => {
      return side.id === sideId
    })

    if (i >= 0) {
      let tmp = state.cubeConfig
      tmp[i].labelValue = label
      state.cubeConfig = JSON.parse(JSON.stringify(tmp))
    }
  },
  RESET_SIDE_TIME (state, sideId) {
    let i = state.cubeConfig.findIndex( side => {
      return side.id === sideId
    })

    if (i >= 0) {
      let tmp = state.cubeConfig
      tmp[i].currentTime = 0
      state.cubeConfig = JSON.parse(JSON.stringify(tmp))
    }
  },
  UPDATE_SIDE_TIME (state, faceId) {
    let i = state.cubeConfig.findIndex( side => {
      return side.face === faceId
    })

    if (i >= 0) {
      let tmp = state.cubeConfig
      tmp[i].currentTime += 500
      state.cubeConfig = JSON.parse(JSON.stringify(tmp))
    }
  },
  TOGGLE_REGISTERING_STATE (state) {
    state.registering = !state.registering
  },
  UPDATE_REGISTERING_STATE (state, value) {
    state.registering = value
  },
}

const actions = {
  setCubeLabel ({ commit }, { sideId='', label='' }) {
    commit('UPDATE_SIDE_LABEL', { sideId:sideId, label:label })
  },
  resetCubeTime({ commit }, sideId ) {
    commit('RESET_SIDE_TIME', sideId)
  },
  increaseSideTime ({ commit }, faceId) {
    commit('UPDATE_SIDE_TIME', faceId)
  },
  setRegistering ({ commit }, value) {
    commit('UPDATE_REGISTERING_STATE', value)
  },
  toggleRegistering ({ commit }) {
    commit('TOGGLE_REGISTERING_STATE')
  },
}

const getters = {
  isRegistering (state) {
    return state.registering
  },
  cubeConfig (state) {
    return state.cubeConfig
  },
  cubeSideConfig: (state) => (sideId) => {
    return state.cubeConfig.filter( side => {
      return side.id === sideId
    })[0].labelValue
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
