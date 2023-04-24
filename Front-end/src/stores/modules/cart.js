export default {
    // Thêm không gian tên cho store, tránh trường hợp trùng tên action giữa các module => dispatch nhiều lần
    namespaced: true,
    state: () => ({
        quantity: 0,
        cartItems: []
    }),
    getters: {},
    mutations: {
        UPDATE_QUANTITY(state, payload) {
            state.quantity = payload;
        },
        UPDATE_CART_ITEMS(state, payload) {
            state.cartItems = payload;
        }
    },
    actions: {
        updateQuantityCart({ commit }, quantity) {
            commit('UPDATE_QUANTITY', quantity)
        },
        updateCartItems({ commit }, newCartItems) {
            commit('UPDATE_CART_ITEMS', newCartItems)
        }
    }
  }