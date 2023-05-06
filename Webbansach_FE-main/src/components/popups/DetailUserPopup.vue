<template>
    <div class="detail-popup" style="height: 75%;">
        <div class="top-popup">
            <div class="title-popup" v-if="type==2">Chỉnh sửa</div>
            <div class="title-popup" v-if="type==1">Thêm mới</div>

            <div class="btn-close" @click="closePopup">X</div>
        </div>

        <div class="content-popup">
            <div class="left-content">
                <div class="row-content">
                    <div class="row-title">
                        Tên người dùng:
                    </div>
                    <input class="row-value" v-model="userDetail.fullname" />
                </div>

                <div class="row-content">
                    <div class="row-title">
                        Email:
                    </div>
                    <input class="row-value" v-model="userDetail.email" />
                </div>
            </div>
            <div class="right-content">
                <div class="row-content">
                    <div class="row-title">
                        Số điện thoại:
                    </div>
                    <input class="row-value" v-model="userDetail.phone" />
                </div>

                <div class="row-content">
                    <div class="row-title">
                        Là Admin:
                    </div>
                    <label class="switch" >
                        <input type="checkbox" :checked="userDetail.isAdmin" @change="changeCheckbox()">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            
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
        </div>

        <div class="footer-popup">
            <div class="btn-popup btn-cancle" @click="closePopup()">
                Hủy
            </div>
            <div class="btn-popup btn-save" @click="saveUser()">
                Xác nhận
            </div>
        </div>
    </div>
</template>
<script>
import { useToast } from "vue-toastification";
import DxSelectBox from 'devextreme-vue/select-box';
import { insertNewUser } from '../../apis/adminApi';
import {updateUser} from '../../apis/accountApi';
export default {
    data() {
        return {
            userDetail: null,
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
            isAdminChecked: false
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
        this.userDetail = this.detailData;
        if (this.userDetail.isAdmin === 1) this.isAdminChecked = true;
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
        async saveUser(){
            // nếu type = 1 thì thêm mới
            if (this.isAdminChecked == true) this.userDetail.isAdmin = 1;
            else this.userDetail.isAdmin = 0;
            var me = this;
            if (this.type == 1) {
                await insertNewUser(this.userDetail).then((res) => {
                        this.setupToast.info(res.message);
                        if (res.success) {
                            me.closePopup();
                        }
                })
            } else if (this.type == 2) {
                await updateUser(this.userDetail).then((res) => {
                    this.setupToast.info(res.message);
                    if (res.success) {
                            me.closePopup();
                        }
                })
            }
        },
        removeImg() {
            this.imageProduct = null;
        },
        getBase64StringFromDataURL (dataURL){
            return dataURL.replace('data:', '').replace(/^.+,/, '');
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

</style>

