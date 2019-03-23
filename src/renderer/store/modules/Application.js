const state = () => {
  return {
    bodySide: 0,
    bluetoothDevice: null,
    bluetoothName: 'HC-06'
  }
}

const mutations = {
  UPDATE_SIDE (state, side) {
    state.bodySide = side
  },
  UPDATE_BLUETOOTH_DEVICE (state, device) {
    state.bluetoothDevice = device
  },
  UPDATE_BLUETOOTH_NAME (state, name) {
    state.bluetoothName = name
  },
}

const actions = {
  setBodySide ({ commit }, side) {
    commit('UPDATE_SIDE', side)
  },
  setBluetoothDevice ({ commit }, device) {
    commit('UPDATE_BLUETOOTH_DEVICE', device)
  },
  setBluetoothName ({ commit }, name) {
    commit('UPDATE_BLUETOOTH_NAME', name)
  },
}

const getters = {
  bodySide (state) {
    return state.bodySide
  },
  bluetoothDevice (state) {
    return state.bluetoothDevice
  },
  bluetoothName (state) {
    return state.bluetoothName
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
