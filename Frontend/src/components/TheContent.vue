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
    
                    <img src="../assets/Icon_FlashSale.png" />
    
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
    
                    <img src="../assets/Icon_bang.png" />
    
                </div>
    
                <div class="icon-menu-title">
    
                    Khoa học công nghệ
    
                </div>
    
            </div>
    
            <div class="icon-menu">
    
                <div class="icon-menu-logo">
    
                    <img src="../assets/Icon_KinhTe.png" />
    
                </div>
    
                <div class="icon-menu-title">
    
                    Kinh tế
    
                </div>
    
            </div>
    
            <div class="icon-menu">
    
                <div class="icon-menu-logo">
    
                    <img src="../assets/ico_giaotrinh.svg" />
    
                </div>
    
                <div class="icon-menu-title">
    
                    Giáo trình
    
                </div>
    
            </div>
    
            <div class="icon-menu">
    
                <div class="icon-menu-logo">
    
                    <img src="../assets/ico_dochoi.svg" />
    
                </div>
    
                <div class="icon-menu-title">
    
                    Thiếu nhi
    
                </div>
    
            </div>
    
        </div>
    
        <div class="list-discount" style="width: 100%">
    
    
    
            <p class="list-discount-title"> <img src="../assets/Icon_FlashSale_mini.png" />ƯU ĐÃI</p>
    
            <ul class="list-discount-content">
    
                <div @click="minusIndex"><i class="fas fa-chevron-left"></i></div>
    
                <li v-for="(item, index) in listDiscountProduct" :key="index">
    
                    <div class="discount-percent-title">-{{ item.discountSale }}%</div>
    
                    <img :src="item.imageProduct" @load="onImageLoad(index)" @click="openDetail(item.idProduct)">
    
                    <div class="product-info">
    
                        <p id="product-name" class="hover-text-underline">{{ item.nameProduct }}
    
                        </p>
    
                        <p id="product-author" class="hover-text-underline">{{ item.author }}</p>
    
                        <div id="product-price">
    
                            <p>{{ priceAfterDiscount(item) }}</p>
    
                            <p class="old-price">{{ formatCurrencyVi(item.priceProduct) }}</p>
    
                            <div class="promotion-percent">-{{ item.discountSale }}%</div>
    
                        </div>
    
                    </div>
    
                </li>
    
                <div @click="increaseIndex"><i class="fas fa-chevron-right"></i></div>
    
            </ul>
    
        </div>
    
        <div class="left-menu" ref="leftMenu">
    
            <div class="category-product" id="category" ref="category" :class="{ fixed: isFixed, static: !isFixed }">
    
                <p class="title-category"><img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_menu_red.svg" />Danh mục</p>
    
                <ul>
    
                    <li v-for="(item, index) in category" :key="index" @click="selectCategory(item)">
    
                        <div :class="{ chooseCategory: item.idCategory === idCategory }">
    
                            <p>{{ item.nameCategory }}</p>
    
                            <i class="fas fa-angle-right"></i>
    
                        </div>
    
                    </li>
    
                </ul>
    
            </div>
    
            <div class="price-product">
    
    
    
            </div>
    
        </div>
    
        <div class="right-list-wrapper">
    
            <div class="list-product">
    
                <div class="product" v-for="(item, index) in products" :key="index">
    
                    <img :src="item.imageProduct" alt="" @click="openDetail(item.idProduct)">
    
                    <div class="product-info">
    
                        <p id="product-name" class="hover-text-underline">{{ item.nameProduct }}
    
                        </p>
    
                        <p id="product-author" class="hover-text-underline">{{ item.author }}</p>
    
                        <div id="product-price">
    
                            <p>{{ priceAfterDiscount(item) }}</p>
    
                            <p v-if="item.discountSale" class="old-price">{{ formatCurrencyVi(item.priceProduct) }}</p>
    
                            <div v-if="item.discountSale" class="promotion-percent">-{{ item.discountSale }}%</div>
    
                        </div>
    
                    </div>
    
                </div>
    
            </div>
    
            <ThePagination :page-count="pageCount" @choosePage="choosePage" ref="pagination" class="pagination-wrapper" />
    
        </div>
    
    </div>
</template>

<script>
import { addItems } from '../apis/cartApi';
import { getProductFilter, getCategory, getProductFilterByCategory, getAllCategory } from '../apis/productApi';
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
            // category: [
            //     {
            //         idCategory: 0,
            //         nameCategory: 'Tất cả'
            //     },
            //     {
            //         idCategory: 1,
            //         nameCategory: 'Sách Chính trị và Pháp luật'
            //     },
            //     {
            //         idCategory: 2,
            //         nameCategory: 'Sách Khoa học - Công nghệ'
            //     },
            //     {
            //         idCategory: 3,
            //         nameCategory: 'Sách văn hóa và nghệ thuật'
            //     },
            //     {
            //         idCategory: 4,
            //         nameCategory: 'Sách kinh tế'
            //     },
            //     {
            //         idCategory: 5,
            //         nameCategory: 'Sách Giáo trình'
            //     },
            //     {
            //         idCategory: 6,
            //         nameCategory: 'Tiểu thuyết'
            //     },
            //     {
            //         idCategory: 7,
            //         nameCategory: 'Sách Thiếu nhi'
            //     },
            // ],
            category: [],
            pageNumber: 1,
            pageSize: 20,
            pageCount: 0,
            idCategory: 0,
            slideIndex: 0,
            isFixed: false,
            currentIndex: 1,
            quantityDiscount: 0,
            listDiscountProduct: []
        };
    },
    created() {
        // this.getCategory();
        this.getAllProduct();
        this.toggleLoading(true);
        this.getAllCategory();
    },
    mounted() {
        this.showSlides();
    },
    methods: {
        ...mapActions({
            updateQuantityCart: 'cart/updateQuantityCart',
            updateCartItems: 'cart/updateCartItems',
            updateListProduct: 'product/SET_LIST_PRODUCT',
            toggleLoading: 'loading/toggleLoading',
        }),

        minusIndex() {
            if (this.currentIndex === 1) {
                this.currentIndex = this.quantityDiscount;
            } else this.currentIndex--;
        },
        increaseIndex() {
            if (this.currentIndex === this.quantityDiscount) {
                this.currentIndex = 1;
            } else this.currentIndex++;
        },
        formatCurrencyVi,
        openDetail(id) {
            this.$router.push({ path: '/detail', query: { id: id } });
        },
        /* wait for image is loaded */
        onImageLoad(index) {
            try {
                if (index > 0) return;
                const topDiff = this.$refs.category.offsetTop;
                const width = this.$refs.leftMenu.offsetWidth;
                window.addEventListener("scroll", () => {
                    if (window.scrollY > topDiff) {
                        this.isFixed = true;
                        if (this.$refs.category != null && this.$refs.category.style != null) {
                            this.$refs.category.style.width = width + "px";
                        }
                    } else {
                        this.isFixed = false;
                    }
                })
            } catch (error) {
                console.log(error);
            }
        },
        showSlides() {
            let i;
            let slides = document.getElementsByClassName("mySlides");
            let dots = document.getElementsByClassName("dot");
            if (slides.length && dots.length) {
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
            }
        },
        // async addToCart(item) {
        //     item.quantity = 1;
        //     item.imageProduct = null;
        //     // let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        //     let itemExisted = false;
        //     this.cartItems.map(i => {
        //         if (i.idProduct === item.idProduct) {
        //             i.quantity++;
        //             itemExisted = true;
        //         }
        //     });
        //     if (!itemExisted) {
        //         this.cartItems.push(item);
        //     }
        //     await addItems(this.cartItems)
        //         .then(res => {
        //         });
        //     this.updateQuantityCart(this.cartItems.length);
        // },
        async getAllProduct() {
            this.toggleLoading(true);
            await getProductFilter(this.pageNumber, this.pageSize, this.searchKey)
                .then(res => {
                    this.toggleLoading(false);
                    if (res.data) {
                        res.data.data.map(i => i.imageProduct = this.formatImage(i.imageProduct));
                        this.updateListProduct(res.data.data);
                        let totalRecord = res.data.totalRecord;
                        this.pageCount = Math.ceil(totalRecord / this.pageSize);

                        if (res.data.listDiscountProduct && res.data.listDiscountProduct.length > 0) {
                            res.data.listDiscountProduct.map(i => i.imageProduct = this.formatImage(i.imageProduct));
                            const listDiscount = res.data.listDiscountProduct.filter(x => x.discountSale && x.quantitySock);
                            const length = listDiscount.length;
                            this.quantityDiscount = Math.ceil(length / 5);
                            this.listDiscountProduct = listDiscount.slice(0, 5);
                        }

                    }
                });
        },
        async getCategory() {
            this.toggleLoading(true);
            await getCategory()
                .then(res => {
                    this.toggleLoading(false);
                    if (res.data) {
                        this.category = res.data;
                    }
                });
        },
        async choosePage(page) {
            this.toggleLoading(true);
            this.pageNumber = page;
            if (this.idCategory === 0) {
                await this.getAllProduct();
            } else {
                await getProductFilterByCategory(this.pageNumber, this.pageSize, this.searchKey, this.idCategory)
                    .then(res => {
                        this.toggleLoading(false);
                        res.data.data.map(i => i.imageProduct = this.formatImage(i.imageProduct));
                        this.updateListProduct(res.data.data);
                    })
            }
        },
        async selectCategory(item) {
            this.toggleLoading(true);
            this.idCategory = item.idCategory;
            this.pageNumber = 1;
            const childComponent = this.$refs.pagination;
            childComponent.chooseFirstPage();
            if (item.idCategory === 0) {
                this.toggleLoading(false);
                await this.getAllProduct();
            } else {
                await getProductFilterByCategory(this.pageNumber, this.pageSize, this.searchKey, item.idCategory)
                    .then(res => {
                        this.toggleLoading(false);
                        res.data.data.map(i => i.imageProduct = this.formatImage(i.imageProduct));
                        this.updateListProduct(res.data.data);
                        let totalRecord = res.data.totalRecord;
                        this.pageCount = Math.ceil(totalRecord / this.pageSize);
                    })
            }
            this.toggleLoading(false);

        },
        priceAfterDiscount(item) {
            return formatCurrencyVi(item.priceProduct - (item.priceProduct * item.discountSale / 100));
        },
        formatImage(url) {
            if (url != null) {
                url = 'data:image/jpeg;base64,' + url;
            } else {
                url = 'src/assets/icon_book.png';
            }
            return url;
        },
        getAllCategory() {
            getAllCategory().then((res) => {
                if (res && res.success) {
                    this.category = res.data;
                }
                else {

                }
            })
        }
    },
    computed: {
        ...mapState({ products: state => state.product.listProduct }),
        ...mapState({ searchKey: state => state.product.searchKeyWord }),
        ...mapState({ cartItems: state => state.cart.cartItems }),
        ...mapState({ isLoading: state => state.loading.isLoading }),
    },
    watch: {
        async searchKey(newVal) {
            await getProductFilter(this.pageNumber, this.pageSize, newVal)
                .then(res => {
                    if (res.data) {
                        res.data.data.map(i => i.imageProduct = this.formatImage(i.imageProduct));
                        this.updateListProduct(res.data.data);
                        let totalRecord = res.data.totalRecord;
                        this.pageCount = Math.ceil(totalRecord / this.pageSize);
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        },
        currentIndex(newVal) {
            const discountProduct = this.products.filter(x => x.discountSale && x.quantitySock);
            this.listDiscountProduct = discountProduct.slice((newVal - 1) * 5, newVal * 5);
        }
    }
}
</script>

<style scoped>
@import url(../css/components/content.css);
.product img {
    height: 200px;
}

.list-discount-content img {
    min-height: 200px;
}
</style>