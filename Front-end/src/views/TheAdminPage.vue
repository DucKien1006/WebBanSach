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
</template>


<script>
import TheSideBarAdmin from '../components/TheSideBarAdmin.vue';
import TheUserTable from '../components/TheUserTable.vue';
export default {
    data() {
        return {
            isShowSideBar: false,
        }
    },
    methods: {
        toggleSlidebar() {
            this.isShowSideBar = !this.isShowSideBar;
        }
    },
    components:{ TheSideBarAdmin, TheUserTable },
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