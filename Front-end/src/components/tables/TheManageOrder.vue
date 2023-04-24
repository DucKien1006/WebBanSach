<template>
    <div class="manage-product">
       <div class="top-table">
           <div class="search-table">
               <input placeholder="Nhập số đơn hàng" v-model="filterSearch"/>
               <i class="fa-solid fa-magnifying-glass"></i>
           </div>
           <div class="btn-insert" @click="btnBuyNew()">
               <span>Mua hộ</span>
           </div>
       </div>
       <TheOrderTable 
           :listColumns="listColumns"
           :listData="listOrder"
           @reloadData="filterBySearch"

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
import {getAllOrder, filterOrder} from '../../apis/adminApi'
import DetailUserPopup from '../popups/DetailUserPopup.vue';
import TheOrderTable from './TheOrderTable.vue';
export default {
   components: {  DetailUserPopup, TheOrderTable },
   data() {
       return{
           listColumns:[
               "Số đơn hàng",
               "Số tiền",
               "Kiểu thanh toán",
               "Trạng thái thanh toán",
               "Người mua",

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
       }
   },
   methods: {
      async getUser() {
       const me = this;
           await getAllOrder().then((res) => {
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
        btnBuyNew() {
            this.$router.push('/');
        }
        
   },
   created() {
       this.getUser();
   },
   watch:{
       filterSearch(newValue) {
           const me = this;
            this.filterBySearch();
       }
   }
 
}
</script>