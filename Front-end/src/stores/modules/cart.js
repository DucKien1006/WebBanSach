export default {
    // Thêm không gian tên cho store, tránh trường hợp trùng tên action giữa các module => dispatch nhiều lần
    namespaced: true,
    state: () => ({
        quantity: 0
    }),
    getters: {},
    mutations: {
        UPDATE_QUANTITY(state, payload) {
            state.quantity = payload;
        }
    },
    actions: {
        updateQuantityCart({ commit }, quantity) {
            commit('UPDATE_QUANTITY', quantity)
        }
    }
  }