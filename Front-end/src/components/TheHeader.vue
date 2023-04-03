<template>
    <div class="header">
        <div class="navbar-wrapper">
            <div class="left-header"></div>
            <div class="right-header">
                <ul>
                    <li><i class="fas fa-gift"></i>Ưu đãi</li>
                    <li @click="redirectLogin"><i class="fas fa-sign-in-alt"></i>Đăng nhập</li>
                    <li><i class="fas fa-user-plus"></i>Đăng ký</li>
                </ul>
            </div>
        </div>
        <div class="search-box-field">
            <img src="../assets/logo-new.png" alt="" @click="redirectHomePage">
            <div class="search-box-wrapper">
                <div class="option-search">Tất cả</div>
                <div class="search-box"><input type="text" placeholder="Bạn cần tìm gì?"><i class="fas fa-search"></i></div>
            </div>
            <div class="hotline-wrapper">
                <i class="fas fa-headphones-alt"></i>
                <div class="hotline-info">
                    <p>0933 109 009</p>
                    <p>Hotline</p>
                </div>
            </div>
            <div class="cart-wrapper" @click="redirectCart">
                <i class="fas fa-shopping-cart"></i>
                <p>Giỏ hàng ({{ quantity }})</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex';
import cart from '../stores/modules/cart';

export default {
    name: 'TheHeader',
    components: {

    },
    created() {
        let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        this.updateQuantityCart(cartItems.length);
    },
    methods: {
        ...mapActions({
            updateQuantityCart: 'cart/updateQuantityCart',
        }),
        redirectHomePage() {
            this.$router.push("/");
        },
        redirectLogin() {
            this.$router.push("/login");
        },
        redirectCart() {
            this.$router.push("/cart");
        }
    },
    computed: {
        ...mapState({ quantity: state => state.cart.quantity })
    }
}
</script>

<style scoped>
@import url(../css/components/header.css);
</style>