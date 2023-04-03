<template>
    <div class="content-wrapper">
        <div class="left-menu">
            <div class="category-product">
                <p>Danh mục</p>
                <ul>
                    <li v-for="(item, index) in items" :key="index">
                        <p>{{ item.name }}</p>
                        <i class="fas fa-angle-right"></i>
                    </li>
                </ul>
            </div>
            <div class="price-product">

            </div>
        </div>
        <div class="right-list-wrapper">
            <div class="filter">
                <select name="Sort" id="sortFilter">
                    <option value="">Sản phẩm mới</option>
                    <option value="">Sản phẩm bán chạy</option>
                    <option value="">Sản phẩm xem nhiều</option>
                    <option value="">Tên từ A-Z</option>
                    <option value="">Tên từ Z-A</option>
                    <option value="">Giá tăng dần</option>
                    <option value="">Giá giảm dần</option>
                </select>
            </div>
            <div class="list-product">
                <div class="product" v-for="(item, index) in products" :key="index">
                    <img :src="item.imageProduct" alt="" @click="openDetail(item.idProduct)">
                    <div class="product-info">
                        <p id="product-name" class="hover-text-underline" @click="addToCart(item)">{{ item.nameProduct }}</p>
                        <p id="product-author" class="hover-text-underline">{{ item.author }}</p>
                        <p id="product-price">{{ formatCurrencyVi(item.priceProduct) }}</p>
                    </div>
                </div>
            </div>
            <ThePagination class="pagination-wrapper"/>
        </div>
    </div>
</template>

<script>
import { getAllProduct } from '../apis/productApi';
import formatCurrencyVi from '../utils/formatCurrencyVi';
import ThePagination from './ThePagination.vue';
import { mapActions } from 'vuex';

export default {
    name: 'TheContent',
    components: {
        ThePagination
    },
    data() {
        return {
            items: [
                {
                    id: 1,
                    name: 'Truyện tranh',
                },
                {
                    id: 2,
                    name: 'Flashcard, Thẻ Học Online',
                },
                {
                    id: 3,
                    name: 'Artbook & Sách tranh',
                },
                {
                    id: 4,
                    name: 'Văn học',
                },
                {
                    id: 5,
                    name: 'Kinh tế',
                },
                {
                    id: 6,
                    name: 'Sách - Truyện thiếu nhi',
                },
                {
                    id: 7,
                    name: 'Sách Teen',
                },
                {
                    id: 8,
                    name: 'Sách cho cha mẹ',
                },

            ],
            products: [
            ]
        };
    },
    async created() {
        await getAllProduct()
            .then(res => {
                if(res.data) {
                    this.products = res.data.data;
                }
            });
    },
    methods: {
        ...mapActions({
            updateQuantityCart: 'cart/updateQuantityCart',
        }),
        formatCurrencyVi,
        openDetail(id) {
            this.$router.push({ path: '/detail', query: { id: id } });
        },
        // Lưu item vào local storage
        addToCart(item) {
            item.quantity = 1;
            let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
            let itemExisted = false;
            cartItems.map(i => {
                if(i.idProduct === item.idProduct) {
                    i.quantity++;
                    itemExisted = true;
                }
            });          
            if(!itemExisted) {
                cartItems.push(item);
            }
            // Update lại quantity cart để binding
            this.updateQuantityCart(cartItems.length);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }
}
</script>

<style scoped>
@import url(../css/components/content.css);
</style>