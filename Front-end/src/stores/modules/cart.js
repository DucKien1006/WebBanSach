export default {
    // Thêm không gian tên cho store, tránh trường hợp trùng tên action giữa các module => dispatch nhiều lần
    namespaced: true,
    state: () => ({
        quantity: 0,
        cartItems: [],
        totalAmount: 0,
        promotionPercent: 0,
    }),
    getters: {},
    mutations: {
        UPDATE_QUANTITY(state, payload) {
            state.quantity = payload;
        },
        UPDATE_CART_ITEMS(state, payload) {
            state.cartItems = payload;
        },
        UPDATE_TOTAL_AMOUNT(state, payload) {
            state.totalAmount = payload;
        },
        UPDATE_PROMOTION_PERCENT(state, payload) {
            state.promotionPercent = payload;
        }
    },
    actions: {
        updateQuantityCart({ commit }, quantity) {
            commit('UPDATE_QUANTITY', quantity)
        },
        updateCartItems({ commit }, newCartItems) {
            commit('UPDATE_CART_ITEMS', newCartItems)
        },
        updateTotalAmount({ commit }, payload) {
            commit('UPDATE_TOTAL_AMOUNT', payload)
        },
        updatePromotionPercent({ commit }, payload) {
            commit('UPDATE_PROMOTION_PERCENT', payload)
        }
    }
  }