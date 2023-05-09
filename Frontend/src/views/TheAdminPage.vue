<template>
    <div class="admin-page">
        <div class="admin-page-acitve">
          <TheSideBarAdmin 
            :isShowMini="isShowSideBar"
            @toggleSlidebar="toggleSlidebar"
          />

            <div :class="!isShowSideBar?'admin-container':'admin-container-extend'">
                <div class="admin-navbar">
                    <div class=" icon icon-bar" @click="toggleSlidebar()">
                            <i class="fas fa-bars" v-if="!isShowSideBar"></i>
                        </div>
                    <div class="avatar-admin">
                        <div class="avatar-img"></div>
                        <div class="admin-name">
                            Phạm Bình
                        </div>
                    </div>
                </div>

                <div class="admin-content">
                    <router-view>

                    </router-view>
                </div>
            </div>
        </div>
    </div>
    <TheLoading v-if="isLoading"/>
</template>


<script>
import { useToast } from 'vue-toastification';
import { checkPermission } from '../apis/accountApi';
import TheSideBarAdmin from '../components/TheSideBarAdmin.vue';
import TheUserTable from '../components/TheUserTable.vue';
import TheLoading from '../components/TheLoading.vue';
import { mapState, mapActions } from 'vuex';

export default {
    setup() {
    // Option 2 (preferred): Inject the app-provided toast interface and return it from setup
    const setupToast = useToast()
    return { setupToast }
    },
    data() {
        return {
            isShowSideBar: false,
        }
    },
    methods: {
        toggleSlidebar() {
            this.isShowSideBar = !this.isShowSideBar;
        },
        checkPermission() {
            const me = this;
            checkPermission().then(res => {
                if (res && res.success) {

                }
                else {
                    me.setupToast.info('Tài khoản không có quyền đăng nhập trang admin');
                    me.$router.push('/')
                }
            })
        }
    },
    
    components:{ TheSideBarAdmin, TheUserTable, TheLoading },

    async created() {
        const me = this;
        await me.checkPermission();
    },
    computed: {
        ...mapState({isLoading: state => state.loading.isLoading}),
    }
}
</script>

<style>
.admin-page {
    /* min-height: 100vh; */
    height: 100vh;
    width: 100%;
}

.admin-page-acitve {
    height: 100%;
    width: 100%;
    /* background-color: aqua; */
    background-image: url('../assets/img-background.png');
    display: flex;
    background-size: cover;
    background-repeat: no-repeat;
}
.admin-content {
    color: #fff;
}
.admin-container{
    width: 90%;
    height: 100%;
}
.admin-container-extend{
    width: 97%;
}


</style>