import { createStore } from 'vuex'
import product from './modules/product'
import cart from './modules/cart'
import user from './modules/user';
import loading from './modules/loading';

const store = createStore({
    modules: {
        product,
        cart,
        user,
        loading
    }
});

export default store;