<template>
    <div class="cart-wrapper">
        <div class="cart">
            <div class="row-item">
                <p class="cart-title">Giỏ hàng</p>
                <div class="item-amount">{{ cartItems.length }} items</div>
            </div>
            <div class="empty-cart" v-if="cartItems.length === 0"> Opps! Giỏ hàng của bạn đang trống... </div>
            <div v-for="(item, index) in cartItems" :key="index" class="row-item">
                <div class="item">
                    <img :src="item.imageProduct" alt="">
                    <p id="name-item">{{ item.nameProduct }}</p>
                </div>
                <div class="quantity-item">
                    <div class="item icon" @click="minusQuantity(item)"><i class="fas fa-minus"></i></div>
                    <div class="item quantity">{{ item.quantity }}</div>
                    <div class="item icon" @click="increaseQuantity(item)"><i class="fas fa-plus"></i></div>
                </div>
                <p id="price-item">{{ formatCurrencyVi(item.priceProduct * item.quantity) }}</p>
                <i class="far fa-trash-alt" @click="deleteItem(item)"></i>
            </div>
        </div>
        <div class="total">
            <p class="total-title">Tổng tiền</p>
            <div class="item-amount-wrapper">
                <div class="item-amount">{{ cartItems.length }} sản phẩm</div>
                <p class="total-amount">{{ totalAmount }}</p>
            </div>
            <div class="promotion-code-wrapper">
                <div class="promotion-code">Mã giảm giá</div>
                <input type="text" placeholder="Nhập vào mã giảm giá">
            </div>
            <div class="total-amount-after-discount-wrapper">
                <div class="total-amount-title">Tổng tiền phải trả: </div>
                <p class="total-amount">{{ totalAmount }}</p>
            </div>
            <button>Thanh toán</button>
        </div>
    </div>
</template>

<script>
import formatCurrencyVi from '../utils/formatCurrencyVi';
import { mapActions } from 'vuex';
import { addItems, getItems } from '../apis/cartApi';

export default {
    name: 'TheCart',
    data() {
        return {
            cartItems: [],
        }
    },
    async created() {
        this.cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        // let cart = await getItems('1')
        //     .then(res => {
        //     });
        // await addItems(this.cartItems)
        //     .then(res => {
        //         console.log(res);
        //     });
    },
    methods: {
        ...mapActions({
            updateQuantityCart: 'cart/updateQuantityCart',
        }),
        formatCurrencyVi,
        deleteItem(item) {
            this.cartItems = this.cartItems.filter(i => i.idProduct != item.idProduct);
            this.updateQuantityCart(this.cartItems.length);
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        },
        minusQuantity(item) {
            this.cartItems.forEach(i => {
                if(i.idProduct === item.idProduct && item.quantity > 1) {
                    i.quantity--;
                    return;
                }
            })
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        },
        increaseQuantity(item) {
            this.cartItems.forEach(i => {
                if(i.idProduct === item.idProduct) {
                    i.quantity++;
                    return;
                }
            })
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        }
    },
    computed: {
        totalAmount() {
            let total = 0;
            this.cartItems.forEach(i => {
                total += (i.priceProduct * i.quantity);
            })
            return formatCurrencyVi(total);
        },
    }
}
</script>

<style scoped>
@import url(../css/components/cart.css);
</style>