import { createStore } from 'vuex'
import product from './modules/product'
import cart from './modules/cart'
import user from './modules/user';

const store = createStore({
    modules: {
        product,
        cart,
        user
    }
});

export default store;