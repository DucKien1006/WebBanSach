<template>
    <div class="detail-popup">
        <div class="top-popup">
            <div class="title-popup" v-if="type==2">Chỉnh sửa</div>
            <div class="title-popup" v-if="type==1">Thêm mới</div>

            <div class="btn-close" @click="closePopup">X</div>
        </div>

        <div class="content-popup">
            <div class="left-content">
                <div class="row-content">
                    <div class="row-title">
                        Tên sách:
                    </div>
                    <input class="row-value" v-model="detailData.nameProduct" />
                </div>

                <div class="row-content">
                    <div class="row-title">
                        Tên tác giả:
                    </div>
                    <input class="row-value" v-model="detailData.author" />
                </div>

                <div class="row-content">
                    <div class="row-title">
                        Thể loại:
                    </div>
                    <DxSelectBox
                        :data-source="listCategory"
                        :value="detailData.idCategory"
                        display-expr="Title"
                        value-expr="ID"
                    />
                    <!-- <input class="row-value" v-model="detailData.nameCategory"  /> -->
                </div>

                <div class="row-content">
                    <div class="row-title">
                        Nhà xuất bản:
                    </div>
                    <input class="row-value" v-model="detailData.titleProduct" autocomplete="true"/>
                </div>
                
                <div class="row-content">
                    <div class="row-title">
                        Số trang sách:
                    </div>
                    <input class="row-value" v-model="detailData.pageNumber" autocomplete="true"/>
                </div>

                <div class="row-content">
                    <div class="row-title">
                        Giá tiền:
                    </div>
                    <input class="row-value" v-model="detailData.priceProduct" autocomplete="true"/>
                </div>



            </div>
            <div class="right-content">
                <div class="img-product" @dragover.prevent @drop="onDrop">
                    <input type="file" placeholder="Drop or chosse" style="z-index: 100; opacity: 1; width: 100%; height: 100%; outline: none; border: none;"
                     @click="onChange" @change="onChange"/>
                    <!-- <div class="btn-choose" v-if="!imageProduct">Drop or chosse</div> -->
                    <img :src="imageProduct" alt="" class="img" v-if="imageProduct"/>
                    <!-- <img id="profileImage" class="img" :src="imageProduct" > -->
                </div>
                <div class="btn-choose" @click="removeImg()" v-if="imageProduct"> Xóa ảnh</div>
                <div class="info-sock">
                    <div class="row-title">
                       <span>Số lượng còn: </span> 
                       <div class="btn-calc" v-if="detailData.quantitySock != 0"  @click="() => {detailData.quantitySock > 0;detailData.quantitySock -= 1}">-</div>
                        <div class="row-value">{{ detailData.quantitySock }}</div>
                        <div class="btn-calc" @click="() => {detailData.quantitySock += 1}">+</div>
                    </div>

                    <div class="row-title" v-if="type == 2">
                       <span>Số lượng đã bán:  </span> 
                        <div class="btn-calc" v-if="detailData.quantitySold != 0" @click="() => {detailData.quantitySold -= 1}">-</div>
                        <div class="row-value">{{ detailData.quantitySold }}</div>
                        <div class="btn-calc" @click="() => {detailData.quantitySold += 1}">+</div>
                    </div>
                </div>
            </div>

        </div>
        <div class="row-detail">
            <div class="row-title">
                Chi tiết:
            </div>
            <textarea class="row-value" v-model="detailData.descriptionProduct"> </textarea>
        </div>

        <div class="footer-popup">
            <div class="btn-popup btn-cancle">
                Hủy
            </div>
            <div class="btn-popup btn-save" @click="saveProduct()">
                Xác nhận
            </div>
        </div>
    </div>
</template>
<script>
import {insertProduct, updateProduct}  from '../../apis/productApi';
import { categoryEnum } from '../../enums/categoryEnum';
import { useToast } from "vue-toastification";
import DxSelectBox from 'devextreme-vue/select-box';
export default {
    data() {
        return {
            productDetail: null,
            imageProduct: null,
            listCategory: [{
                ID: 1,
                Title: 'Sách chính trị pháp luật',
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
            ]
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
        this.productDetail = this.detailData;
        if (this.type == 2) {
            this.imageProduct = 'data:image/jpeg;base64,' + (this.detailData.imageProduct)
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
        async saveProduct(){
            this.productDetail.imageProduct = this.getBase64StringFromDataURL(this.imageProduct);
            // nếu type = 1 thì thêm mới
            if (this.type == 1) {
                await insertProduct(this.productDetail).then((res) => {
                    if (res.message == null) {
                        this.setupToast.info("Đã thêm thành công");
                    }
                })
            } else if (this.type == 2) {
                await updateProduct(this.productDetail).then((res) => {
                    if (res.message == null) {
                        this.setupToast.info("Đã chỉnh sửa thành công");
                    }
                })
            }
        },
        removeImg() {
            this.imageProduct = null;
        },
        getBase64StringFromDataURL (dataURL){
            return dataURL.replace('data:', '').replace(/^.+,/, '');
        }
    },
    components:{
        DxSelectBox
    }
}
</script>

<style>
.detail-popup {
    width: 680px;
    height: 90%;
    background-color: #fff;
    margin: auto;
    margin-top: 60px;
    padding: 24px 24px;
    color: #000;
    position: relative;
    border-radius: 4px;
    border: 1px solid #a6a3a3;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}

.top-popup {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;
}

.detail-popup .row {
    display: flex;
    justify-content: space-between;
}

.detail-popup .row .row-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.detail-popup input {
    border: 1px solid #a6a3a3;
    border-radius: 4px;
    padding: 8px 8px;
    min-width: 200px;
}

.content-popup {
    display: flex;
    margin-top: 24px;
}

.left-content {
    width: 60%;
    height: 100%;
}

.row-content {
    display: flex;
    align-items: center;
    margin: 16px 0px;
}

.row-title {
    padding:0 8px;
    width: 120px;
}

.row-detail {
    display: flex;
    margin-top: 24px;
}

.row-detail .row-value {
    min-height: 180px;
    width: 100%;
}

.footer-popup {
    display: flex;
    justify-content: space-around;
    position: absolute;
    right: 24px;
    bottom: 24px;
}

.footer-popup .btn-popup {
    border: 1px solid #a6a3a3;
    height: 32px;
    padding: 8px 32px;
    margin: 0 8px;
    border-radius: 4px;
    cursor: pointer;

}

.footer-popup .btn-save {
    background-color: #33A2FF;
    color: #fff;
}

.footer-popup .btn-save:hover {
    background-color: #3393FF;
}

.footer-popup .btn-cancle {
    border: 1px solid rgb(237, 36, 70);
}

.footer-popup .btn-cancle:hover {
    background-color: #f0efef;
}

.content-popup .img-product {
    margin: auto;
    height: 180px;
    width: 140px;
    border: 1px solid #a6a3a3;
    text-align: center;
}

.right-content .row-title {
    display: flex;
    height: 24px;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 8px;
    align-items: center;
}

.right-content .row-value {
    width: 24px;
}

.btn-close {
    cursor: pointer;
}

.btn-close:hover {
    color: red;
}
.img-product{
    position: relative;
    cursor: pointer;
}
.img-product img{
    position: absolute;
    top: 0;
    left: 0;
    width: 140px;
    height: 180px;
}
.right-content .btn-choose{
    border: 1px solid #33A2FF;
    padding: 4px 4px;
    border-radius: 4px;
    cursor: pointer;
    width: fit-content;
    margin: auto;
    margin-top: 8px;

}
.row-title span {
    min-width: 130px;
}
.btn-calc{
    padding: 2px 4px;
    border: 1px solid #33A2FF;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
}
.row-title input {
    margin: 0 8px;
}
.row-title .row-value {
    margin: 0 8px;
}
.info-sock{
    margin-top: 8px;
}
input:focus-visible{
    border: 1px solid #28484f;
    outline: none;
}
</style>