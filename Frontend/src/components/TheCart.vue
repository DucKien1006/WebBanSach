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
                        <th>Thành tiền</th>
                        <th></th>
                    </tr>
                    <tr v-for="(item, index) in cartItems" :key="index" class="row-item">
                        <!-- <td><img :src="item.imageProduct" alt=""></td> -->
                        <td><img :src=formatImage(item.imageProduct) alt=""></td>
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
                            <p id="price-item">{{ formatCurrencyVi(priceAfterDiscount(item) * item.quantity) }}</p>
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
                <div class="promotion-field">
                    <input type="text" placeholder="Nhập vào mã giảm giá" v-model="promotionCode">
                    <button @click="applyPromotion">Áp dụng</button>
                </div>
            </div>
            <p class="promotion-info">{{ promotionInfo }}</p>
            <div class="total-amount-after-discount-wrapper">
                <div class="total-amount-title">Tổng tiền phải trả: </div>
                <p class="total-amount">{{ formatCurrencyVi(totalAmountAfterDiscount) }}</p>
            </div>
            <button @click="showCheckoutForm">Thanh toán</button>
        </div>
        <CheckoutPopup v-if="isShowCheckoutForm" :totalAmount="totalAmount" @closeCheckoutForm="closeCheckoutForm" />
    </div>
</template>

<script>
import formatCurrencyVi from '../utils/formatCurrencyVi';
import { mapActions } from 'vuex';
import { addItems, applyPromotionCode } from '../apis/cartApi';
import { mapState } from 'vuex';
import CheckoutPopup from './popups/CheckoutPopup.vue';
import { useToast } from "vue-toastification";

export default {
    name: 'TheCart',
    data() {
        return {
            isShowCheckoutForm: false,
            promotionCode: '',
        }
    },
    components: {
        CheckoutPopup,
    },
    methods: {
        ...mapActions({
            updateQuantityCart: 'cart/updateQuantityCart',
            updateCartItems: 'cart/updateCartItems',
            updateTotalAmount: 'cart/updateTotalAmount',
            updatePromotionPercent: 'cart/updatePromotionPercent',
            toggleLoading: 'loading/toggleLoading',
        }),
        formatCurrencyVi,
        async applyPromotion() {
            this.toggleLoading(true);
            if (this.promotionCode != '' && this.promotionCode.length == 8) {
                await applyPromotionCode(this.promotionCode)
                    .then(res => {
                        this.toggleLoading(false);
                        const toast = useToast();
                        if (res.success && res.data) {
                            this.updateTotalAmount(res.data.totalPayment);
                            this.updatePromotionPercent(res.data.promotionPercent);
                            toast.success('Áp dụng mã giảm giá thành công', {
                                position: "top-center",
                                showCloseButtonOnHover: true,
                                hideProgressBar: true,
                                closeButton: "button",
                                icon: true,
                                rtl: false,
                            });
                        } else {
                            const toast = useToast();
                            toast.error('Mã giảm giá không hợp lệ', {
                                position: "top-center",
                                showCloseButtonOnHover: true,
                                hideProgressBar: true,
                                closeButton: "button",
                                icon: true,
                                rtl: false,
                            });
                        }

                    })
            } else {
                this.toggleLoading(false);
                const toast = useToast();
                toast.error('Mã giảm giá phải là 8 kí tự', {
                    position: "top-center",
                    showCloseButtonOnHover: true,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false,
                });
            }
        },
        async deleteItem(item) {
            this.toggleLoading(true);
            const newCartItems = this.cartItems.filter(i => i.idProduct != item.idProduct);
            this.updateQuantityCart(newCartItems.length);
            this.updateCartItems(newCartItems);
            await addItems(newCartItems)
                .then(res => {
                    this.toggleLoading(false);
                    this.updateTotalAmount(res.data.totalPayment);
                });
        },
        async minusQuantity(item) {
            if (item.quantity === 1) {
                return;
            }
            this.cartItems.forEach(i => {
                if (i.idProduct === item.idProduct && item.quantity > 1) {
                    i.quantity--;
                    return;
                }
            })
            this.toggleLoading(true);
            await addItems(this.cartItems)
                .then(res => {
                    this.toggleLoading(false);
                    this.updateTotalAmount(res.data.totalPayment);
                });
        },
        async increaseQuantity(item) {
            this.cartItems.forEach(i => {
                if (i.idProduct === item.idProduct) {
                    i.quantity++;
                    return;
                }
            })
            this.toggleLoading(true);
            await addItems(this.cartItems)
                .then(res => {
                    this.toggleLoading(false);
                    this.updateTotalAmount(res.data.totalPayment);
                });
        },
        closeCheckoutForm(typeClose) {
            this.isShowCheckoutForm = false;
            if (typeClose === 0) {
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
            else if (!localStorage.getItem('token')) {
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
        },
        priceAfterDiscount(item) {
            return item.priceProduct - (item.priceProduct * item.discountSale / 100);
        },
        formatImage(url) {
            if (url != null) {
                url = 'data:image/jpeg;base64,' + url;
            }
            else {
                url = 'src/assets/icon_book.png';
            }
            return url;
        }
    },
    computed: {
        ...mapState({ cartItems: state => state.cart.cartItems }),
        ...mapState({ totalAmountAfterDiscount: state => state.cart.totalAmount }),
        ...mapState({ promotionPercent: state => state.cart.promotionPercent }),
        ...mapState({ isLoading: state => state.loading.isLoading }),
        totalAmount() {
            let total = 0;
            this.cartItems.forEach(i => {
                total += (this.priceAfterDiscount(i) * i.quantity);
            })
            return formatCurrencyVi(total);
        },
        promotionInfo() {
            return this.promotionPercent != 0 ? `Giảm ${this.promotionPercent}% giá trị đơn hàng` : null;
        }
    }
}
</script>

<style scoped>
@import url(../css/components/cart.css);
</style>