<template>
    <div class="wrap-table100">
        
        <div class="table">
            <div class="row header">
                <div class="cell" v-for="(column, index) in listColumns">
                    {{ column }}
                </div>
                <div class="cell">
                    
                </div>
            </div>
            <div class="row" v-for="(item, index) in listProductData" :class="rowSelected==item.idProduct?'row-selected':''" @dblclick="selectedRow(item)">
                <div class="cell" data-title="Full Name">
                    {{ item.nameProduct }}
                </div>
                <div class="cell" data-title="Age">
                    {{ item.author }}
                </div>
                <div class="cell" data-title="Job Title">
                    {{ item.nameCategory }}
                </div>
                <div class="cell" data-title="Location">
                    {{ item.titleProduct }}
                </div>
                <div class="cell" data-title="Location">
                    {{ item.quantitySock }}
                </div>
                <div class="cell btn-row" data-title="Location">
                    <div class="btn-delete" title="Xóa" @click="deleteRow(item)">
                        <i class="fa-solid fa-trash"></i>   
                    </div>
                    <div class="btn-edit" title="Chỉnh sửa" @click="selectedRow(item)"> 
                        <i class="fa-solid fa-pen-to-square"></i>  
                    </div>
                    
                </div>
            </div>
          
        </div>
    </div>
    <div class="apui-popup" v-if="isShowPopup">
            <DetailPopup 
                :detailData="detailData"
                :type=2
                @closePopup="closePopup"
                :listDataCategory="listDataCategory"
            />
    </div>
    <div class="apui-popup" v-if="isShowPopupConfirm">
           <div class="popup-confirm">
                <span>Bạn có chắc chắn muốn xóa <b>{{ nameBookSelect }}?</b> </span>
                <div class="footer-popup">
                    <div class="btn-popup btn-cancle" @click="() => {isShowPopupConfirm = false}">Hủy</div>
                    <div class="btn-popup btn-save" @click="deleteProduct()">Xác nhận</div>
                </div>
           </div>
    </div>
</template>

<script>
import DetailPopup from '../popups/DetailPopup.vue';
import { useToast } from 'vue-toastification';
import { deleteProduct } from '../../apis/adminApi';

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
            this.rowSelected = item.idProduct;
        },
        closePopup() {
            this.isShowPopup = false;
        },
        deleteRow(item) {
            this.nameBookSelect = item.nameProduct;
            this.rowSelected = item.idProduct;
            this.isShowPopupConfirm = true;
        },
        deleteProduct() {
            deleteProduct(this.rowSelected).then((res) => {
                if (res && res.success) {
                    this.setupToast.info("Đã xóa thành công");
                    this.isShowPopupConfirm = false;
                    this.listProductData = this.listProductData.filter(item => item.idProduct != this.rowSelected);
                }else 
                {
                    this.isShowPopupConfirm = false
                    this.setupToast.error("Có lỗi xảy ra");
                }
                
            })
        },
        
    },
    props:{
        listColumns: [],
        listData: [],
        listDataCategory: [],
    },
    created() {
        this.listProductData = this.listData;
    },
    data() {
        return{
            detailData: {},
            isShowPopup: false,
            isShowPopupConfirm: false,
            nameBookSelect: '',
            rowSelected:'',
            listProductData: [],
        }
    },
    watch: {
        listData: {
            handler(newValue, oldValue) {
                this.listProductData = newValue;
            },
            deep: true
        }
    },
    components:{DetailPopup}
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
    overflow: hidden
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
    background-color: aquamarine;
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: 4px;
    color: #fef6f6;
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
    background: #6c7ae0
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
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f2f2f2;
    white-space: nowrap;
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
    padding-left: 10px;
    white-space: nowrap;
}

.row .cell:nth-child(2) {
    width: 180px;
    padding-left: 10px;

}

.row .cell:nth-child(3) {
    width: 180px;
    padding-left: 10px;

}

.row .cell:nth-child(4) {
    width: 180px;
    padding-left: 10px;
}
.row .cell:nth-child(5) {
    width: 120px;
    text-align: center;
    padding-left: 10px;
    
}
.row .cell:nth-child(6) {
    width: 80px;
    padding-left: 10px;

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
</style>