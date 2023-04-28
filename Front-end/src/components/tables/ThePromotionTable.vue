<template>
    <div class="wrap-table100">
        
        <div class="table">
            <div class="row header">
                <div class="cell" v-for="(column, index) in listColumns">
                    {{ column }}
                </div>
                <div class="cell" >
                </div>
                
            </div>
            <div class="row" v-for="(item, index) in listData">
                <div class="cell" data-title="Full Name">
                    {{ item.promotionName }}
                </div>
                <div class="cell" data-title="Age">
                    {{ item.isUsed==1?"Đã dùng":"Chưa dùng" }}
                </div>
                <div class="cell" data-title="Job Title">
                    {{ item.promotionPercent }} %
                </div>
                <div class="cell" data-title="Job Title">
                    {{ formartDate(item.createdDate) }}
                </div>
                <!-- <div class="cell" data-title="Location">
                    {{ enumPaymentStatus[item.paymentStatus] }}
                </div>
                <div class="cell" data-title="Location">
                    {{ item.fullName }}
                </div>
                <div class="cell" data-title="Location" v-if="item.lastTime != null">
                     {{ formartDate(item.lastTime) }}
                </div> -->
                <!-- <div class="cell" data-title="Location">
                    <label class="switch">
                        <input type="checkbox" :checked="item.isAdmin == 1" disabled>
                        <span class="slider round"></span>
                    </label>
                </div> -->
                 <div class="cell btn-row" data-title="Location" style="cursor: pointer;"> 
                     <div class="btn-delete" title="Xóa" @click="deleteRow(item)">
                        <i class="fa-solid fa-trash"></i>   
                    </div>
                    <!-- <div class="btn-edit" title="Chỉnh sửa" @click="selectedRow(item)"> 
                        <i class="fa-solid fa-pen-to-square"></i>  
                    </div>  -->
                    
                </div> 
            </div>
          
        </div>
    </div>
    
    <div class="apui-popup" v-if="isShowPopupConfirm">
           <div class="popup-confirm">
                <span>Bạn có chắc chắn muốn xóa mã giảm giá: <b>{{ nameBookSelect }}?</b> </span>
                <div class="footer-popup">
                    <div class="btn-popup btn-cancle" @click="() => {isShowPopupConfirm = false}">Hủy</div>
                    <div class="btn-popup btn-save" @click="deleteUser()">Xác nhận</div>
                </div>
           </div>
    </div>
</template>

<script>
import { deletePrmotion } from '../../apis/adminApi';
import DetailOrderPopup from '../popups/DetailOrderPopup.vue';
import { useToast } from 'vue-toastification';
export default {
    setup() {
    // Option 2 (preferred): Inject the app-provided toast interface and return it from setup
    const setupToast = useToast()
    return { setupToast }
    },
    methods: {
        selectedRow(item){
            this.detailData = item;
            this.isShowPopup = true; 
            this.rowSelected = item.idOrder;
        },
        closePopup() {
            this.isShowPopup = false;
        },
        deleteRow(item) {
            this.detailData = item;
            this.nameBookSelect = item.promotionName;
            this.isShowPopupConfirm = true;
        },
        deleteUser() {
            deletePrmotion(this.detailData.id).then((res) => {
                this.setupToast.info("Đã xóa thành công");
                this.isShowPopupConfirm = false;
                this.$emit("reloadData");
            })
        },
        reloadData() {
            this.$emit('reloadData');
        },
        formartDate(date) {
            if (date !=null) {
                var dateformart = new Date(date);
                return `${dateformart.getDate()}/${dateformart.getMonth()}/${dateformart.getFullYear()}`
            }
        }
    },
    props:{
        listColumns: [],
        listData: [],
        
    },
    created() {
    },
    data() {
        return{
            detailData: {},
            isShowPopup: false,
            isShowPopupConfirm: false,
            nameBookSelect: '',
            enumPaymentStatus: [
                 "Đơn hàng mới",
                 "Chưa thanh toán",
                 "Đã thanh toán",
                 "Chờ xác nhận thanh toán",
                 "Đã hủy",
            ],
            enumPaymentType:[
                "",
                "Tiền mặt",
                "Chuyển khoản",
            ],
            rowSelected: '',
            
        }
    },
    components:{  DetailOrderPopup }
}

</script>

<style scoped>
a {
    margin: 0;
    transition: all .4s;
    -webkit-transition: all .4s;
    -o-transition: all .4s;
    -moz-transition: all .4s
}

a:focus {
    outline: none !important
}

a:hover {
    text-decoration: none
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0
}

p {
    margin: 0
}

ul,
li {
    margin: 0;
    list-style-type: none
}

input {
    display: block;
    outline: none;
    border: none !important
}

textarea {
    display: block;
    outline: none
}

textarea:focus,
input:focus {
    border-color: transparent !important
}

button {
    outline: none !important;
    border: none;
    background: 0 0
}

button:hover {
    cursor: pointer
}

iframe {
    border: none !important
}

.limiter {
    width: 100%;
    margin: 0 auto
}

.container-table100 {
    width: 100%;
    min-height: 100vh;
    background: #c4d3f6;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 33px 30px
}

.wrap-table100 {
    width: 100%;
    border-radius: 10px;
    max-height: 540px;
    overflow-x: auto;
    min-height: 540px;
}

.table {
    width: 90%;
    display: table;
    margin: auto;
}
.top-table{
    display: flex;
    margin-top: 64px;
    float: right;
    margin-right: 96px;
    height: 32px;
    width: 420px;
    display: flex;
    justify-content: space-between;
}
.top-table input{
    height: 32px;
    width: 240px;
    border-radius: 4px;
}
.top-table .search-table{
    position: relative;
    
}
.top-table .search-table i {
    position: absolute;
    top: 8px;
    right: 8px;
    color: #000;
}
.top-table .btn-insert{
    height: 32px;
    width: 80px;
    background-color: rgb(230, 148, 34);
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: 4px;
    color: #f9f0f0;
}
@media screen and (max-width: 768px) {
    .table {
        display: block
    }
}

.row {
    display: table-row;
    background: #fff
}

.row.header {
    color: #fff;
    background: #6c7ae0;
    z-index: 99;
}

@media screen and (max-width: 768px) {
    .row {
        display: block
    }

    .row.header {
        padding: 0;
        height: 0
    }

    .row.header .cell {
        display: none
    }

    .row .cell:before {
        font-family: Poppins-Bold;
        font-size: 12px;
        color: gray;
        line-height: 1.2;
        text-transform: uppercase;
        font-weight: unset !important;
        margin-bottom: 13px;
        content: attr(data-title);
        min-width: 98px;
        display: block
    }
}

.cell {
    display: table-cell
}

@media screen and (max-width: 768px) {
    .cell {
        display: block
    }
}

.row .cell {
    font-family: Poppins-Regular;
    font-size: 15px;
    color: #666;
    line-height: 1.2;
    font-weight: unset !important;
    /* padding-top: 10px; */
    /* padding-bottom: 10px; */
    border-bottom: 1px solid #f2f2f2;
    white-space: nowrap;
    padding: 10px 24px;
}

.row.header .cell {
    font-family: Poppins-Regular;
    font-size: 18px;
    color: #fff;
    line-height: 1.2;
    font-weight: unset !important;
    padding-top: 9px;
    padding-bottom: 9px;
}

.row .cell:nth-child(1) {
    width: 220px;
    padding-left: 40px
}

.row .cell:nth-child(2) {
    width: 80px
}

.row .cell:nth-child(3) {
    width: 180px
}

.row .cell:nth-child(4) {
    width: 180px
}
.row .cell:nth-child(5) {
    width: 120px;
    text-align: center;
}
.row .cell:nth-child(6) {
    width: 80px;
    text-align: center;
}
.table,
.row {
}
.table .row:first-child:hover{
    background-color: #6c7ae0;
}
.row:hover {
    background-color: #ececff;
    cursor: pointer
}

@media(max-width: 768px) {
    .row {
        border-bottom: 1px solid #f2f2f2;
        padding-bottom: 18px;
        padding-top: 30px;
        padding-right: 15px;
        margin: 0
    }

    .row .cell {
        border: none;
        padding-left: 30px;
        padding-top: 16px;
        padding-bottom: 16px
    }

    .row .cell:nth-child(1) {
        padding-left: 30px
    }

    .row .cell {
        font-family: Poppins-Regular;
        font-size: 18px;
        color: #555;
        line-height: 1.2;
        font-weight: unset !important
    }

    .table,
    .row,
    .cell {
    }
}
.btn-row{
    display: flex;
    justify-content: space-around;
}
.btn-row .btn-delete:hover{
    color: red;
}
.btn-row .btn-edit:hover {
    color: aqua;
}
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(24px);
  transform: translateX(24px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.left{
    text-align: right;
    
}
</style>