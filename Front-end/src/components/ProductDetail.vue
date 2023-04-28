<template>
    <div>
        <div class="product-detail-wrapper">
            <div class="product-wrapper">
                <div class="product-image">
                    <img :src="formatImage(product.imageProduct)"
                        alt="">
                </div>
                <div class="product-detail">
                    <p id="product-name">{{ product.nameProduct }}</p>
                    <p id="product-author">{{ product.author }}</p>
                    <p id="product-price">{{ formatCurrencyVi(priceAfterDiscount) }}</p>
                    <div class="fontsize-12" id="promotion-info">Tiết kiệm:<p id="promotion-amount">{{ formatCurrencyVi(product.priceProduct * product.discountSale / 100) }} ({{ product.discountSale }}%)</p>
                    </div>
                    <p class="fontsize-12" id="real-price">Giá thị trường: {{ formatCurrencyVi(product.priceProduct) }}</p>
                    <div class="fontsize-12" id="product-status">
                        Tình trạng:
                        <p v-if="product.quantitySock">Còn hàng</p>
                        <p v-else>Hết hàng</p>
                    </div>
                    <div class="add-favorites"><i class="far fa-heart"></i>
                        <p>Thêm vào yêu thích</p>
                    </div>
                    <button id="add-to-cart" @click="addToCart">Thêm vào giỏ hàng</button>
                    <!-- <button id="buy-now">Mua Ngay</button> -->
                    <div id="contact-info">Gọi đặt hàng: <p>(028) 3820 7153</p> hoặc <p>0933 109 009</p>
                    </div>
                </div>
            </div>
            <div class="info-promotion-wrapper">
                <p id="info-promotion">Thông tin & Khuyến mãi</p>
                <p><i class="fas fa-box-open"></i>Đổi trả hàng trong vòng 7 ngày</p>
                <p><i class="fas fa-truck"></i>Freeship toàn quốc từ 250.000đ</p>
            </div>
        </div>
        <div class="info-detail">
            <p class="info-detail-title">Thông tin chi tiết</p>
            <ul>
                <li>Nhà xuất bản: {{ product.titleProduct }}</li>
                <li>Ngày xuất bản: {{ formatDate }}</li>
                <li>Số trang: {{ product.pageNumber }} trang</li>
                <li>Thể loại: {{ productCategory }}</li>
                <li>Tóm tắt: {{ product.descriptionProduct }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getProductDetail } from '../apis/productApi';
import formatCurrencyVi from '../utils/formatCurrencyVi';
import { mapState, mapActions } from 'vuex';
import { addItems } from '../apis/cartApi';
import { useToast } from "vue-toastification";

export default {
    name: 'ProductDetail',
    components: {
    },
    data() {
        return {
            product: {}
        }
    },
    async created() {
        const id = this.$route.query.id;
        await getProductDetail(id)
            .then(res => {
                this.product = res.data.shift();
            })
    },
    methods: {
        ...mapActions({
            updateQuantityCart: 'cart/updateQuantityCart',
            updateCartItems: 'cart/updateCartItems',
            updateTotalAmount: 'cart/updateTotalAmount',
        }),
        formatCurrencyVi,
        async addToCart() {
            const toast = useToast();
            if (this.product.quantitySock === 0) {
                toast.error('Sản phẩm hiện đã bán hết', {
                    position: "top-center",
                    timeout: 2000,
                    showCloseButtonOnHover: true,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
                return;
            }
            this.product.quantity = 1;
            // let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
            let itemExisted = false;
            this.cartItems.map(i => {
                if (i.idProduct === this.product.idProduct) {
                    i.quantity++;
                    itemExisted = true;
                }
            });
            if (!itemExisted) {
                this.cartItems.push(this.product);
            }
            await addItems(this.cartItems)
                .then(res => {
                    this.updateTotalAmount(res.data.totalPayment);
                });
            this.updateQuantityCart(this.cartItems.length);
            toast.success('Thêm vào giỏ hàng thành công', {
                    position: "top-center",
                    timeout: 2000,
                    showCloseButtonOnHover: true,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
        },
        formatImage(url) {
            if (url != null) {
                url = 'data:image/jpeg;base64,' + url;
            }
            else{
                url = 'src/assets/icon_book.png';
            }
            return url;
        }
    },
    computed: {
        ...mapState({ cartItems: state => state.cart.cartItems }),
        productCategory() {
            return this.product.nameCategory ? this.product.nameCategory : "Khác";
        },
        formatDate() {
            const date = new Date(this.product.postDate);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return day + "/" + month + "/" + year;
        },
        priceAfterDiscount() {
            return this.product.priceProduct - this.product.priceProduct * this.product.discountSale / 100;
        }
    }
}
</script>

<style>@import url(../css/components/detail.css);</style>