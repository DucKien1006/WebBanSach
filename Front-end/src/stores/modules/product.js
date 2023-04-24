export default {
  namespaced: true,
  state: () => ({
    listProduct: [],
    searchKeyWord: '',
  }),
  getters: {},
  mutations: {
    SET_LIST_PRODUCT(state, payload) {
      state.listProduct = payload;
    },
    SET_SEARCH_KEYWORD(state, payload) {
      state.searchKeyWord = payload;
    }
  },
  actions: {
    SET_LIST_PRODUCT({ commit }, list) {
      commit('SET_LIST_PRODUCT', list);
    },
    SET_SEARCH_KEYWORD({ commit }, key) {
      commit('SET_SEARCH_KEYWORD', key);
    },
  }
}