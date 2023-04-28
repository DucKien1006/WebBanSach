<template>
    <div class="manage-product">
       <div class="top-table" style="width: 240px;">
           <div class="search-table" v-if="isShowPromotion">
               <input placeholder="Điền % giảm giá" style="width: 120px;" v-model="valuePromotionPercent"/>
           </div>
           <div class="btn-insert" @click="createNewPromotion()">
               <span>Sinh MGG</span>
           </div>
       </div>
       <ThePromotionTable 
           :listColumns="listColumns"
           :listData="listOrder"
           @reloadData="getAllPromotion"

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
import {getAllOrder, filterOrder, getAllPromotion, createNewPromotion} from '../../apis/adminApi'
import DetailUserPopup from '../popups/DetailUserPopup.vue';
import ThePromotionTable from './ThePromotionTable.vue'
export default {
    setup() {
        const setupToast = useToast();

        return {setupToast};
    },  
   components: {  DetailUserPopup, ThePromotionTable },
   data() {
       return{
           listColumns:[
               "Mã giảm giá",
               "Đã dùng",
               "Phần trăm giảm",
               "Ngày tạo",

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
           valuePromotionPercent: null,
       }
   },
   methods: {
      async getAllPromotion() {
       const me = this;
           await getAllPromotion().then((res) => {
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
        createNewPromotion() {
            if (!this.isShowPromotion) {
                this.isShowPromotion = true;
            }
            else {
                // check MGG
                this.valuePromotionPercent = parseInt(this.valuePromotionPercent);
                if (isNaN(this.valuePromotionPercent) ) {
                    this.setupToast.error("% giảm giá phải là số");
                    this.valuePromotionPercent = null
                }
                else {
                    createNewPromotion(this.valuePromotionPercent).then(res => {
                    if (res && res.success) {
                        this.setupToast.info("Đã thêm thành công MGG");
                        this.isShowPromotion = false;
                        this.valuePromotionPercent = null;
                        this.getAllPromotion();

                    }
                    else {
                        this.setupToast.error("Có lỗi xảy ra");
                        this.isShowPromotion = false;
                        this.valuePromotionPercent = null
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
       this.getAllPromotion();
   },
   
 
}
</script>