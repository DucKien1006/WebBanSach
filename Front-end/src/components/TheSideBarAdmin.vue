<template>
      <div class="admin-side-bar" :class="isShowMini?'admin-side-bar-mini':'admin-side-bar-medium'">
                <div class="logo-branch">
                    <i class="fas fa-store" v-if="!isShowMini"></i>
                    <i class="fas fa-bars icon" v-if="isShowMini" @click="toggleSlidebar()"></i>
                    <a v-if="!isShowMini">
                        <h5 class="logo-text">Quản lý cửa hàng</h5>
                    </a>
                </div>
                <ul class="sidebar-menu do-nicescrol in" v-if="!isShowMini">
                    <li title="Dashboard" :class="chooseSideBar==1?'active-admin':''" @click="chooseSideBar = 1">
                        <RouterLink class= "admin-link" to="/dashboard">
                            <i class="fas fa-desktop"></i>
                            <span>Tổng quan</span>
                        </RouterLink>
                    </li>

                    <li class="active" :class="chooseSideBar==2?'active-admin':''" @click="chooseSideBar = 2">
                        <RouterLink class= "admin-link" to="/manageproduct">
                            <i class="fas fa-book"></i>
                             <span>Quản lý sản phẩm</span>
                        </RouterLink>
                    </li>

                    <li :class="chooseSideBar==3?'active-admin':''" @click="chooseSideBar = 3">
                        <RouterLink class= "admin-link" to="/manageuser">
                            <i class="fas fa-users"></i>
                            <span>Quản lý người dùng</span>
                        </RouterLink>
                    </li>
                    
                    <li :class="chooseSideBar==4?'active-admin':''" @click="chooseSideBar = 4">
                        <RouterLink class= "admin-link" to="/manageorder">
                            <i class="fas fa-cart-plus"></i>
                            <span>Quản lý đơn hàng</span>
                        </RouterLink>
                    </li>
                    <!-- <li>
                        <i class="fas fa-table"></i>
                        <a >
                            <span>Tables</span>
                        </a>
                    </li> -->
                </ul>
                <ul class="sidebar-menu sidebar-menu-mini do-nicescrol in" v-if="isShowMini">
                    <li>
                        <RouterLink to="/dashboard">
                            <i class="fas fa-desktop"></i>
                        </RouterLink>
                        
                    </li>

                    <li class="active">
                        <RouterLink to="/manageproduct">
                            <i class="fas fa-book"></i>
                        </RouterLink>
                    </li>

                    <li>
                        <RouterLink  to="/manageuser">
                            <i class="fas fa-users"></i>
                        </RouterLink>
                    </li>
                    
                    <li>
                        <RouterLink  to="/manageorder">
                            <i class="fas fa-cart-plus"></i>
                        </RouterLink>
                    </li>
                    <!-- <li>
                        <i class="fas fa-table"></i>
                    </li> -->
                </ul>
            </div>
</template>

<script>

export default {

   props: {
    isShowMini : false,
   },
   created() {

   },
   data() {
    return {
        chooseSideBar: 1,
        listSidebar: [
            {
                title: 'Tổng quan',
                value: 1,
            },
            {
                title: 'Quản lý sản phẩm',
                value: 2,
            },
            {
                title: 'Quản lý người dùng',
                value: 3,
            },
            {
                title: 'Quản lý đơn hàng',
                value: 4,
            },
            
        ]
    }
   },
   methods: {
    toggleSlidebar() {
        this.$emit('toggleSlidebar');
    }
   },
}
</script>

<style>
.admin-side-bar {
    background-color: transparent;
    color: #ffffff;
    background-color: rgba(0,0,0,.2);
    user-select: none;
}
.admin-side-bar-mini {
    width: 3%;
    background-color: transparent;
    color: #ffffff;
    background-color: rgba(0,0,0,.2);
}
.admin-side-bar-medium {
    width: 20%;
    min-width: 240px;
}
    .admin-side-bar .logo-branch {
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    height: 60px;
    background-color: #000e1be0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 20px;
}

.admin-side-bar .logo-text {
    color: #ffffff;
    font-size: 15px;
    display: inline-block;
    text-transform: uppercase;
    position: relative;
    top: 3px;
    font-weight: 400;
    text-align: center;
    line-height: 50px;
}

.admin-side-bar .sidebar-menu {
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: transparent;
    margin-top: 32px;
}
.admin-side-bar .sidebar-menu li.sidebar-header {
    padding: 10px 25px 10px 15px;
    font-size: 12px;
    color: #000;
}
.admin-side-bar .sidebar-menu>li>a {
    padding: 13px 5px 13px 15px;
    display: block;
    border-left: 3px solid transparent;
    color: #ffffff;
    font-size: 15px;
    font-weight: 400;
}
.sidebar-menu a {
    color: #ffffff;
    text-decoration: none;
}
.admin-side-bar .sidebar-menu li:hover{
    background-color: #274d68;
    border-left: 2px solid #ffffff;
    font-weight: 600;
}

.admin-navbar{
    height: 60px;
    background-color: transparent;
    background-color: rgba(0,0,0,.2);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 24px;
    padding-left: 12px;
    color: #ffffff;
}
.icon-secret{
    color: #ffffff;
    margin-right: 8px;
}

.avatar-admin{
    display: flex;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    align-items: center;
}
.avatar-admin .avatar-img{
    height: 32px;
    width: 32px;
    border-radius: 50%;
    background-color: aquamarine;
    margin-right: 8px;
}
.icon{
    cursor: pointer;
}
.sidebar-menu li {
    width: 100%;
    display: flex;
    color: #ffffff;
    justify-content: space-around;
    align-items: center;
    padding-left: 12px;
}
.sidebar-menu li a {
    width: 100%;
    
}
.admin-side-bar-mini ul{
    height: 100%;
}
.sidebar-menu-mini li{
    height: 32px;
    align-items: center;
    padding-left: 0px;
    cursor: pointer;
}
.admin-link{
    display: flex;
    justify-content: space-between;
    width: 80%;
}
.admin-link i{
    padding-right: 24px;
}
.admin-navbar .sidebar-menu .li-active{
    background-color: #305f81;
    border-left: 2px solid #ffffff;
    font-weight: 600;
}
.active-admin{
    background-color: #1e415b;
    border-left: 2px solid #ffffff;
    font-weight: 600;
}
</style>