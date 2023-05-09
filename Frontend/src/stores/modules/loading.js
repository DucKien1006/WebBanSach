export default {
    // Thêm không gian tên cho store, tránh trường hợp trùng tên action giữa các module => dispatch nhiều lần
    namespaced: true,
    state: () => ({
        isLoading: false,
    }),
    getters: {},
    mutations: {
        TOGGLE_LOADING(state, stateLoading) {
            state.isLoading = stateLoading;
        },
    },
    actions: {
        toggleLoading({ commit }, stateLoading) {
            commit('TOGGLE_LOADING', stateLoading);
        },
    }
  }