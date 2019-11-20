export const state = () => {
  return {
    time: 0,
    timer: 0
  }
};

export const actions = {
  start({ state, commit }) {
    commit('START', commit)
  },
  reset({ state, commit, dispatch }) {
    commit('RESET', commit)
    dispatch('start')
  },
}

export const mutations = {
  START(state, commit) {
    state.timer = setInterval(() => {
      commit('INCREMENT')
    }, 1000)
  },
  INCREMENT(state) {
    state.time++
  },
  RESET(state) {
    state.time = 0
    clearInterval(state.timer)
  },
};

export const namespaced = true