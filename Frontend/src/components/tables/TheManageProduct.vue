<template>
    <div class="manage-product">
        <div class="top-table">
            <div class="search-table">
                <input placeholder="Nhập từ bạn muốn tìm kiếm" v-model="filterSearch"/>
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div class="btn-insert" @click="add()">
                <span>Thêm mới</span>
            </div>
        </div>
        <TheTable 
            :listColumns="listColumns"
            :listData="listProduct"
            :listDataCategory="listCategory"
        />
        <ThePagination :page-count="pageCount" @choosePage="choosePage" class="pagination-wrapper"/>
        <div class="apui-popup" v-if="isShowPopup">
            <DetailPopup 
                :detailData="newProduct"
                :type=1
                :listDataCategory="listCategory"
                @closePopup="closePopup"
            />
        </div>
    </div>
</template>

<script>
import TheTable from './TheTable.vue';
import {getProductFilter, getAllCategory} from '../../apis/productApi';
import ThePagination from '../ThePagination.vue';
import DetailPopup from '../popups/DetailPopup.vue';
import { mapState, mapActions } from 'vuex';


export default {
    components: { TheTable, ThePagination, DetailPopup },
    created(){
        this.getProduct();
        this.getAllCategory();  
    },
    methods: {
        ...mapActions({
            toggleLoading: 'loading/toggleLoading',
        }),
       async getProduct() {
            this.toggleLoading(true);
            await getProductFilter(this.pageNumber,this.pageSize,this.filterSearch).then((res) => {
                this.toggleLoading(false);
                if (res.data && res.data.data) {
                    this.listProduct = res.data.data;
                    this.caculationPageCount(res.data.totalRecord)
                }
            })
        },
        caculationPageCount(total) {
            if (total % this.pageSize == 0) this.pageCount = total / this.pageSize;
            else this.pageCount = parseInt(total/this.pageSize) + 1;
        },
        choosePage(page) {
            this.pageNumber = page;
            this.getProduct();
        },
        add() {
            this.isShowPopup =true;
        },
        closePopup() {
            this.isShowPopup = false;
        },
        getAllCategory() {
            getAllCategory().then((res) => {
                if (res && res.success) {
                    this.listCategory = res.data;
                }
                else {

                }
            })
        }
    },
    data() {
        return {
            listColumns:[
                "Tên sách",
                "Tên tác giả",
                "Thể loại",
                "Nhà xuất bản",
                "Số lượng còn lại",
            ],
            listProduct:[],
            pageCount: 1,
            pageNumber: 1,
            pageSize: 10,
            filterSearch: '',
            newProduct:{
                nameProduct:'',
                author:'',
                idCategory: 1,
                titleProduct: '',
                imageProduct: null,
                quantitySock : 1,
            },
            isShowPopup: false,
            listCategory: null,
        }
    },
    watch:{
        filterSearch(newVal) {
            this.getProduct();
        }
    }
  
}
</script>

<style>
@import url(../../css/manage-product.css);
</style>