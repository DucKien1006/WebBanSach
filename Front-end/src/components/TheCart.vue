<template>
    <div class="cart-wrapper">
        <div class="cart">
            <div class="row-item">
                <p class="cart-title">Giỏ hàng</p>
                <div class="item-amount">{{ cartItems.length }} items</div>
            </div>
            <div class="empty-cart" v-if="cartItems.length === 0"> Opps! Giỏ hàng của bạn đang trống... </div>
            <div v-else>
                <table>
                    <tr class="row-item">
                        <th></th>
                        <th>Tên sách</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th></th>
                    </tr>
                    <tr v-for="(item, index) in cartItems" :key="index" class="row-item">
                        <!-- <td><img :src="item.imageProduct" alt=""></td> -->
                        <td><img src="https://bookbuy.vn/Res/Images/Product/dung-de-tam-trang-tro-thanh-thai-do_121749_4.jpg"
                                alt=""></td>
                        <td>
                            <p id="name-item">{{ item.nameProduct }}</p>
                        </td>
                        <td>
                            <div class="quantity-item">
                                <div class="item icon" @click="minusQuantity(item)"><i class="fas fa-minus"></i></div>
                                <div class="item quantity">{{ item.quantity }}</div>
                                <div class="item icon" @click="increaseQuantity(item)"><i class="fas fa-plus"></i></div>
                            </div>
                        </td>
                        <td>
                            <p id="price-item">{{ formatCurrencyVi(item.priceProduct * item.quantity) }}</p>
                        </td>
                        <td><i class="far fa-trash-alt" @click="deleteItem(item)"></i></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="total">
            <p class="total-title">Tổng tiền</p>
            <div class="item-amount-wrapper">
                <div class="item-amount">{{ cartItems.length }} sản phẩm</div>
                <p class="total-amount">{{ totalAmount }}</p>
            </div>
            <div class="item-amount-wrapper">
                <div class="item-amount">Phí vận chuyển</div>
                <p class="total-amount">{{ formatCurrencyVi(0) }}</p>
            </div>
            <div class="promotion-code-wrapper">
                <div class="promotion-code">Mã giảm giá</div>
                <input type="text" placeholder="Nhập vào mã giảm giá">
            </div>
            <div class="total-amount-after-discount-wrapper">
                <div class="total-amount-title">Tổng tiền phải trả: </div>
                <p class="total-amount">{{ totalAmount }}</p>
            </div>
            <button @click="showCheckoutForm">Thanh toán</button>
        </div>
        <CheckoutPopup v-if="isShowCheckoutForm" :totalAmount="totalAmount" @closeCheckoutForm="closeCheckoutForm" />
    </div>
</template>

<script>
import formatCurrencyVi from '../utils/formatCurrencyVi';
import { mapActions } from 'vuex';
import { addItems, getItems } from '../apis/cartApi';
import { mapState } from 'vuex';
import CheckoutPopup from './popups/CheckoutPopup.vue';
import { useToast } from "vue-toastification";

export default {
    name: 'TheCart',
    data() {
        return {
            isShowCheckoutForm: false,
        }
    },
    components: {
        CheckoutPopup,
    },
    methods: {
        ...mapActions({
            updateQuantityCart: 'cart/updateQuantityCart',
            updateCartItems: 'cart/updateCartItems',
        }),
        formatCurrencyVi,
        async deleteItem(item) {
            const newCartItems = this.cartItems.filter(i => i.idProduct != item.idProduct);
            this.updateQuantityCart(newCartItems.length);
            this.updateCartItems(newCartItems);
            await addItems(newCartItems)
                .then(res => {
                    console.log(res);
                });
        },
        async minusQuantity(item) {
            this.cartItems.forEach(i => {
                if (i.idProduct === item.idProduct && item.quantity > 1) {
                    i.quantity--;
                    return;
                }
            })
            await addItems(this.cartItems)
                .then(res => {
                });
        },
        async increaseQuantity(item) {
            this.cartItems.forEach(i => {
                if (i.idProduct === item.idProduct) {
                    i.quantity++;
                    return;
                }
            })
            await addItems(this.cartItems)
                .then(res => {
                });
        },
        closeCheckoutForm(typeClose) {
            this.isShowCheckoutForm = false;
            if(typeClose === 0) {
                return;
            }
            const toast = useToast();
            toast.success('Bạn đã đặt hàng thành công', {
                position: "top-center",
                showCloseButtonOnHover: true,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false,
            });
            this.updateQuantityCart(0);
            this.updateCartItems([]);
        },
        showCheckoutForm() {
            const toast = useToast();
            if (this.cartItems.length === 0 && localStorage.getItem('token')) {
                toast.error('Giỏ hàng đang trống', {
                    position: "top-center",
                    showCloseButtonOnHover: true,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false,
                });
            }
            else if(!localStorage.getItem('token')) {
                toast.error('Bạn cần đăng nhập để thanh toán', {
                    position: "top-center",
                    showCloseButtonOnHover: true,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
            }
            else this.isShowCheckoutForm = true;
        }
    },
    computed: {
        ...mapState({ cartItems: state => state.cart.cartItems }),
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

<style scoped>@import url(../css/components/cart.css);</style>