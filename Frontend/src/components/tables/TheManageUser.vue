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
        <TheUserTable 
            :listColumns="listColumns"
            :listData="listUser"

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
import {getAllUser, getAllUserByName} from '../../apis/adminApi'
import DetailUserPopup from '../popups/DetailUserPopup.vue';
import TheUserTable from './TheUserTable.vue';
import { mapState, mapActions } from 'vuex';
export default {
    components: { TheUserTable, DetailUserPopup },
    data() {
        return{
            listColumns:[
                "Tên người dùng",
                "Email",
                "Số điện thoại",
                "Địa chỉ 1",
                "Là Admin",

            ],
            filterSearch: '',
            listUser : [],
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
        ...mapActions({
            toggleLoading: 'loading/toggleLoading',
        }),
       async getUser() {
        const me = this;
            me.toggleLoading(true);
            await getAllUser().then((res) => {
                me.toggleLoading(false);
                if (res.data) {
                    me.listUser = res.data;
                }
            })
        },
       
        add() {
            this.isShowPopup =true;
        },
        closePopup() {
            this.isShowPopup = false;
        },
        filterUserBySearch() {
            const me = this;
            me.toggleLoading(true);
            getAllUserByName(this.filterSearch).then((res) => {
                me.toggleLoading(false);
                    me.listUser = res.data;
                })
        }
    },
    created() {
        this.getUser();
    },
    watch:{
        filterSearch(newValue) {
            const me = this;
            if (newValue != '') {
               this.filterUserBySearch();
            } else {
                this.getUser();
            }
        }
    }
  
}
</script>