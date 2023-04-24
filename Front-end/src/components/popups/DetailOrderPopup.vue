<template>
    <div class="detail-popup" style="height: 75%;">
        <div class="top-popup">
            <div class="title-popup">Chi tiết đơn hàng {{orderData.orderCode }}</div>

            <div class="btn-close" @click="closePopup">X</div>
        </div>

        <!-- <div class="content-popup">
            <div class="left-content">
                <div class="row-content">
                    <div class="row-title">
                        Người mua: {{ orderData.fullName }}
                    </div>
                    <input class="row-value" v-model="orderData.fullName" />
                </div>

                <div class="row-content">
                    <div class="row-title">
                        Email:
                    </div>
                    <input class="row-value" v-model="orderData.email" />
                </div>
            </div>
            <div class="right-content">
                <div class="row-content">
                    <div class="row-title">
                        Số đơn hàng
                    </div>
                    <div>{{orderData.orderCode  }}</div>
                </div>
                <div class="row-content">
                    <div class="row-title">
                        Số điện thoại:
                    </div>
                    <input class="row-value" v-model="orderData.phone" />
                </div>
            </div>
           
        </div>
        <div class="right-content">
                <div class="row-content">
                    <div class="row-title">
                        Trạng thái đơn hàng
                    </div>
                </div>
                <div class="row-content">
                    <div class="row-title">
                        Hình thức thanh toán
                    </div>
        </div>
        <div>Tổng số tiền: {{ orderData.totalPayment }}</div>
        </div>
        <div class="row-detail">
            <div class="row-title">
                Địa chỉ 1:
            </div>
            <textarea class="row-value" style="min-height: 120px;" v-model="detailData.address1"> </textarea>
        </div>

        <div class="row-detail">
            <div class="row-title">
                Địa chỉ 2:
            </div>
            <textarea class="row-value" style="min-height: 120px;" v-model="detailData.address2"> </textarea>
        </div> -->
        <div class="row-content">
            <span>Người mua:</span> 
            <span>{{ orderData.fullName }}</span>
        </div>
        <div class="row-content">
            <span>Số điện thoại:</span> 
            <span>{{ orderData.fullName }}</span>
        </div>
        <div class="row-content">
            <span>Địa chỉ:</span> 
            <span>{{ orderData.fullName }}</span>
        </div>
        <div class="row-content">
            <span>Ngày mua:</span> 
            <span>{{ orderData.fullName }}</span>
        </div>
        <div class="row-content">
            <span>Trạng thái thanh toán:</span> 
            <span>{{ enumPaymentStatus[orderData.paymentStatus] }};</span>
            <span class="row-content-right">Hình thức thanh toán:</span> 
            <span>{{ enumPaymentType[orderData.paymentType] }}</span>
        </div>
        <div class="row-content-product">
           <div>Sản phẩm đã mua:</div>
           <!-- <div>{{ orderData.orderDetail }}</div> -->
           <div class="order-list-product">
                <div class="item-order-list">
                    <div class="name-item"> Tên sách</div>
                    <div class="price-item">Giá tiền</div>
                    <div class="quantity-item"> Số lượng</div>

                </div>
                <div class="item-order-list" v-for="(item, index) in orderListProduct">
                    <div class="name-item"> {{item.NameProduct}}</div>
                    <div class="price-item">{{ item.PriceProduct }} <span class="unit-price">đ</span></div>
                    <div class="quantity-item">{{item.Quantity}}</div>

                </div>
           </div>
           <div class="total-list-product">Tổng tiền: {{ orderData.totalPayment }} <span class="unit-price">đ</span></div>
        </div>
        <div class="footer-popup">
            <div class="btn-popup btn-cancle" :class="orderData.paymentStatus == 4 ? 'disabled':''" @click="updateOrder(4)">
                Hủy đơn hàng
            </div>
            <div class="btn-popup btn-save" :class="orderData.paymentStatus == 2 ? 'disabled':''" @click="updateOrder(2)">
                Xác nhận thanh toán
            </div>
        </div>
    </div>
</template>
<script>
import { useToast } from "vue-toastification";
import DxSelectBox from 'devextreme-vue/select-box';
import { updateOrder } from '../../apis/adminApi';
import { updateQuantity } from "../../apis/cartApi";
export default {
    data() {
        return {
            orderData: null,
            imageProduct: null,
            listCategory: [{
                ID: 1,
                Title: 'Sách chính trị pháp luật', 1: "Sách chính trị pháp luật",
                }, 
                {
                ID: 2,
                Title: 'Sách khoa học công nghệ kinh tế',
                },
                {
                ID: 3,
                Title: 'Sách văn học nghệ thuật',
                },
                {
                ID: 4,
                Title: 'Sách văn học xã hội lịch sử',
                },
                {
                ID: 5,
                Title: 'Sách giáo trình',
                },
                {
                ID: 6,
                Title: 'Sách truyện tiểu thuyết',
                },
                {
                ID: 7,
                Title: 'Sách thiếu nhi',
                }
            ],
            isAdminChecked: false,
            orderListProduct: [],
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
        }
    },
    setup() {
    // Option 2 (preferred): Inject the app-provided toast interface and return it from setup
    const setupToast = useToast()
    return { setupToast }
    },
    props: {
        detailData: {},
        type: 0, // 1: thêm mới; 2: chỉnh sửa
    },
    created() {
        this.orderData = this.detailData;
        if (this.orderData.orderDetail) {
            this.orderListProduct = JSON.parse(this.orderData.orderDetail)
        }
    },
    methods: {
        closePopup() {
            this.$emit('closePopup');
        },
        createFile(file) {
            if (!file.type.match('image.*')) {
                alert('Select an image');
                return;
            }
            var img = new Image();
            var reader = new FileReader();
            const me = this;

            reader.onload = function (e) {
                me.imageProduct = e.target.result;
            }
            reader.readAsDataURL(file);
        },
        onDrop: function(e) {
            e.stopPropagation();
            e.preventDefault();
            var files = e.dataTransfer.files;
            this.createFile(files[0]);
        },
        onChange(e) {
            var files = e.target.files;
            this.createFile(files[0]);
        },
        async updateOrder(paymentSatus){
            var me = this;
            var checked = true;
            if (paymentSatus == this.orderData.paymentStatus ) {
                return ;
            } 
                await updateOrder(me.orderData.idOrder, paymentSatus).then((res) => {
                if (res && res.success) {
                   
                }
                else {
                    checked = false;
                    me.setupToast.error("Có lỗi xảy ra!");
                }
            }) 
            await updateQuantity(me.orderData.idOrder, 2).then((res) => {
                if (res && res.success) {
                  
                }
                else {
                    checked = false;
                    me.setupToast.error("Có lỗi xảy ra!");
                }
            })
            if (checked){ 
                me.setupToast.info("Đã cập nhật đơn hàng thành công")
                    me.closePopup();
                    
                    me.$emit('reloadData')
            }
           
        },
       
        
        changeCheckbox() {
            this.isAdminChecked = !this.isAdminChecked;
        }
    },
    components:{
        DxSelectBox
    }
}
</script>

<style>
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
.row-content-right{
    margin-left: 24px;
}
.row-content span{
    margin-left: 8px;
}
.item-order-list{
    display: flex;
    width: 100%;
    /* justify-content: space-between; */
    /* margin-top: 8px; */
    user-select: none;
    /* border: 1px solid #2196F3; */
    border-bottom: 1px solid #2196F3;
    /* border-radius: 8px; */
}
.item-order-list span{
    font-weight: 600;
    padding-right: 8px;
}
.item-order-list .name-item{
    flex-basis: 50%;
}
.item-order-list .price-item{
    flex-basis: 30%;
}
.item-order-list div{
    border-right: 1px solid #2196F3;
    padding: 4px 8px;
}
.item-order-list div:last-child{
    border: none;
}
.unit-price{
    font-size: 13px;
    font-weight: 400;
}
.total-list-product{
    margin-top: 8px;
}
.order-list-product{
    margin-top: 8px;
    border: 1px solid #2196F3;
    border-radius: 4px;
}
.order-list-product .item-order-list:last-child{
    border-bottom: none;
}
.disabled{
    cursor: default !important;
    opacity: .5 !important;
}
</style>

