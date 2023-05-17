<template>
    <div class="manage-product">
       <div class="top-table" :style="isShowPromotion?'width: 482px;':'width: 120px;'">
           <div class="search-table" v-if="isShowPromotion">
               <input placeholder="Điền tên danh mục" style="width: 320px;" v-model="valueCategoryName"/>
           </div>
           <div class="btn-insert" @click="createNewCategory()">
               <span>Thêm mới</span>
           </div>
       </div>
       <TheCategoryTable 
           :listColumns="listColumns"
           :listData="listOrder"
           @reloadData="getAllCategory"

       />
       <div class="apui-popup" v-if="isShowPopup">
           <DetailUserPopup 
               :detailData="newUser"
               :type=1
               @closePopup="closePopup"
           />
       </div>
   </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import {getAllOrder, filterOrder, createNewCategory} from '../../apis/adminApi'
import DetailUserPopup from '../popups/DetailUserPopup.vue';
import TheCategoryTable from './TheCategoryTable.vue'
import {getAllCategory} from '../../apis/productApi';
import { mapState, mapActions } from 'vuex';

export default {
    setup() {
        const setupToast = useToast();

        return {setupToast};
    },  
   components: {  DetailUserPopup, TheCategoryTable },
   data() {
       return{
           listColumns:[
               "Số thứ tự",
               "Tên danh mục",
               "Người tạo",
               "Ngày tạo",
               "Người sửa",
               "Ngày sửa",
           ],
           filterSearch: '',
           listOrder : [],
           newUser:{
               idUser: '',
               fullname:'',
               email:'',
               phone: '',
               isAdmin: 0,
               address1: null,
               address2 : null,
           },
           isShowPopup: false,
           isShowPromotion: false,
           valueCategoryName: null,
       }
   },
   methods: {
    ...mapActions({
            toggleLoading: 'loading/toggleLoading',
        }),
      async getAllCategory() {
       const me = this;
       me.toggleLoading(true);
           await getAllCategory().then((res) => {
                me.toggleLoading(false);
               if (res.data) {
                   me.listOrder = res.data;
               }
           })
       },
      
       add() {
           this.isShowPopup =true;
       },
       closePopup() {
           this.isShowPopup = false;
       },
       filterBySearch() {
        const me = this;
        if (this.filterSearch != '') {
            filterOrder(this.filterSearch).then((res) => {
                   me.listOrder = res.data;
               })
        }
        else {
            getAllOrder().then((res) => {
               if (res.data) {
                   me.listOrder = res.data;
               }
           })
        }
        },
        createNewCategory() {
            if (!this.isShowPromotion) {
                this.isShowPromotion = true;
            }
            else {
                // check MGG
                if (this.valueCategoryName == '' ||  this.valueCategoryName == null) {
                    this.setupToast.error("Không được để trống tên danh mục");
                    this.valueCategoryName = null;
                }
                else {
                    createNewCategory(this.valueCategoryName).then(res => {
                    if (res && res.success) {
                        this.setupToast.info("Đã thêm thành công danh mục");
                        this.isShowPromotion = false;
                        this.valueCategoryName = null;
                        this.getAllCategory();

                    }
                    else {
                        this.setupToast.error("Có lỗi xảy ra");
                        this.isShowPromotion = false;
                        this.valueCategoryName = null
                    }
                })
                }
               
                // this.isShowPromotion = false;

            }
            // this.isShowPromotion = true;
            // createNewPromotion()
        }
        
   },
   created() {
       this.getAllCategory();
   }
   
 
}
</script>