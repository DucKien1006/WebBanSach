export default {
    // Thêm không gian tên cho store, tránh trường hợp trùng tên action giữa các module => dispatch nhiều lần
    namespaced: true,
    state: () => ({
        userInfo: {}
    }),
    getters: {},
    mutations: {
        UPDATE_USER_INFO(state, payload) {
            state.userInfo = payload;
        }
    },
    actions: {
        updateUserInfo({ commit }, info) {
            commit('UPDATE_USER_INFO', info)
        },
    }
  }