<template>
    <div class="content-wrapper">
        <div class="banner">
            <div class="slideshow-container">
                <div class="mySlides fade">
                    <img src="../assets/265377-P56GA5-806.jpg" style="width:100%">
                </div>
                <div class="mySlides fade">
                    <img src="../assets/265377-P56GA5-807.jpg" style="width:100%">
                </div>
            </div>
            <br>
            <div style="text-align:center">
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </div>
        <div class="list-icon-menu">
            <div class="icon-menu">
                <div class="icon-menu-logo">
                    <img src="../assets/Icon_FlashSale.png"/>
                </div>
                <div class="icon-menu-title">
                    Giảm giá
                </div>
            </div>
            <!-- <div class="icon-menu">
                <div class="icon-menu-logo">
                    <img src="../assets/icon_Law.jpg"/>
                </div>
                <div class="icon-menu-title">
                    Chính trị và pháp luật
                </div>
            </div> -->
            <div class="icon-menu">
                <div class="icon-menu-logo">
                    <img src="../assets/Icon_bang.png"/>
                </div>
                <div class="icon-menu-title">
                    Khoa học công nghệ
                </div>
            </div>
            <div class="icon-menu">
                <div class="icon-menu-logo">
                    <img src="../assets/Icon_KinhTe.png"/>
                </div>
                <div class="icon-menu-title">
                    Kinh tế
                </div>
            </div>
            <div class="icon-menu">
                <div class="icon-menu-logo">
                    <img src="../assets/ico_giaotrinh.svg"/>
                </div>
                <div class="icon-menu-title">
                    Giáo trình
                </div>
            </div>
            <div class="icon-menu">
                <div class="icon-menu-logo">
                    <img src="../assets/ico_dochoi.svg"/>
                </div>
                <div class="icon-menu-title">
                    Thiếu nhi
                </div>
            </div>
        </div>
        <div class="left-menu">
            <div class="category-product">
                <p>Danh mục</p>
                <ul>
                    <li v-for="(item, index) in category" :key="index" @click="selectCategory(item)">
                        <p>{{ item.nameCategory }}</p>
                        <i class="fas fa-angle-right"></i>
                    </li>
                </ul>
            </div>
            <div class="price-product">

            </div>
        </div>
        <div class="right-list-wrapper">
            <!-- <div class="filter">
                <select name="Sort" id="sortFilter">
                    <option value="">Sản phẩm mới</option>
                    <option value="">Sản phẩm bán chạy</option>
                    <option value="">Sản phẩm xem nhiều</option>
                    <option value="">Tên từ A-Z</option>
                    <option value="">Tên từ Z-A</option>
                    <option value="">Giá tăng dần</option>
                    <option value="">Giá giảm dần</option>
                </select>
            </div> -->
            <div class="list-product">
                <div class="product" v-for="(item, index) in products" :key="index">
                    <img :src="item.imageProduct" alt="" @click="openDetail(item.idProduct)">
                    <div class="product-info">
                        <p id="product-name" class="hover-text-underline" @click="addToCart(item)">{{ item.nameProduct }}
                        </p>
                        <p id="product-author" class="hover-text-underline">{{ item.author }}</p>
                        <p id="product-price">{{ formatCurrencyVi(item.priceProduct) }}</p>
                    </div>
                </div>
            </div>
            <ThePagination :page-count="pageCount" @choosePage="choosePage" ref="pagination" class="pagination-wrapper" />
        </div>
    </div>
</template>

<script>
import { addItems } from '../apis/cartApi';
import { getProductFilter, getCategory, getProductFilterByCategory } from '../apis/productApi';
import formatCurrencyVi from '../utils/formatCurrencyVi';
import ThePagination from './ThePagination.vue';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'TheContent',
    components: {
        ThePagination
    },
    data() {
        return {
            category: [
                {
                    idCategory: 0,
                    nameCategory: 'Tất cả'
                },
                {
                    idCategory: 1,
                    nameCategory: 'Sách Chính trị và Pháp luật'
                },
                {
                    idCategory: 2,
                    nameCategory: 'Sách Khoa học - Công nghệ'
                },
                {
                    idCategory: 3,
                    nameCategory: 'Sách văn hóa và nghệ thuật'
                },
                {
                    idCategory: 4,
                    nameCategory: 'Sách kinh tế'
                },
                {
                    idCategory: 5,
                    nameCategory: 'Sách Giáo trình'
                },
                {
                    idCategory: 6,
                    nameCategory: 'Tiểu thuyết'
                },
                {
                    idCategory: 7,
                    nameCategory: 'Sách Thiếu nhi'
                },
            ],
            pageNumber: 1,
            pageSize: 20,
            pageCount: 0,
            idCategory: 0,
            slideIndex: 0,
        };
    },
    created() {
        // this.getCategory();
        this.getAllProduct();
    },
    mounted() {
        this.showSlides();
    },
    methods: {
        ...mapActions({
            updateQuantityCart: 'cart/updateQuantityCart',
            updateCartItems: 'cart/updateCartItems',
            updateListProduct: 'product/SET_LIST_PRODUCT',
        }),
        formatCurrencyVi,
        openDetail(id) {
            this.$router.push({ path: '/detail', query: { id: id } });
        },
        showSlides() {
            let i;
            let slides = document.getElementsByClassName("mySlides");
            let dots = document.getElementsByClassName("dot");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            this.slideIndex++;
            if (this.slideIndex > slides.length) { this.slideIndex = 1 }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[this.slideIndex - 1].style.display = "block";
            dots[this.slideIndex - 1].className += " active";
            setTimeout(this.showSlides, 2000); // Change image every 2 seconds
        },
        async addToCart(item) {
            item.quantity = 1;
            item.imageProduct = null;
            // let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
            let itemExisted = false;
            this.cartItems.map(i => {
                if (i.idProduct === item.idProduct) {
                    i.quantity++;
                    itemExisted = true;
                }
            });
            if (!itemExisted) {
                this.cartItems.push(item);
            }
            await addItems(this.cartItems)
                .then(res => {
                });
            this.updateQuantityCart(this.cartItems.length);
        },
        async getAllProduct() {
            await getProductFilter(this.pageNumber, this.pageSize, this.searchKey)
                .then(res => {
                    if (res.data) {
                        res.data.data.map(i => i.imageProduct = 'https://bookbuy.vn/Res/Images/Product/dung-de-tam-trang-tro-thanh-thai-do_121749_4.jpg');
                        this.updateListProduct(res.data.data);
                        let totalRecord = res.data.totalRecord;
                        this.pageCount = Math.ceil(totalRecord / this.pageSize);
                    }
                });
        },
        async getCategory() {
            await getCategory()
                .then(res => {
                    if (res.data) {
                        this.category = res.data;
                    }
                });
        },
        async choosePage(page) {
            this.pageNumber = page;
            if (this.idCategory === 0) {
                await this.getAllProduct();
            }
            else {
                await getProductFilterByCategory(this.pageNumber, this.pageSize, this.searchKey, this.idCategory)
                    .then(res => {
                        res.data.data.map(i => i.imageProduct = 'https://bookbuy.vn/Res/Images/Product/dung-de-tam-trang-tro-thanh-thai-do_121749_4.jpg');
                        this.updateListProduct(res.data.data);
                    })
            }
        },
        async selectCategory(item) {
            this.idCategory = item.idCategory;
            this.pageNumber = 1;
            const childComponent = this.$refs.pagination;
            childComponent.chooseFirstPage();
            if (item.idCategory === 0) {
                await this.getAllProduct();
            }
            else {
                await getProductFilterByCategory(this.pageNumber, this.pageSize, this.searchKey, item.idCategory)
                    .then(res => {
                        res.data.data.map(i => i.imageProduct = 'https://bookbuy.vn/Res/Images/Product/dung-de-tam-trang-tro-thanh-thai-do_121749_4.jpg');
                        this.updateListProduct(res.data.data);
                        let totalRecord = res.data.totalRecord;
                        this.pageCount = Math.ceil(totalRecord / this.pageSize);
                    })
            }
        }
    },
    computed: {
        ...mapState({ products: state => state.product.listProduct }),
        ...mapState({ searchKey: state => state.product.searchKeyWord }),
        ...mapState({ cartItems: state => state.cart.cartItems }),
    },
    watch: {
        async searchKey(newVal) {
            await getProductFilter(this.pageNumber, this.pageSize, newVal)
                .then(res => {
                    if (res.data) {
                        res.data.data.map(i => i.imageProduct = 'https://bookbuy.vn/Res/Images/Product/dung-de-tam-trang-tro-thanh-thai-do_121749_4.jpg');
                        this.updateListProduct(res.data.data);
                        let totalRecord = res.data.totalRecord;
                        this.pageCount = Math.ceil(totalRecord / this.pageSize);
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }
}
</script>

<style scoped>
@import url(../css/components/content.css);
</style>