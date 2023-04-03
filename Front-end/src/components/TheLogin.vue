<template>
    <div class="login-form-wrapper">
        <div class="login-form">
            <p id="login-form-title">Đăng nhập</p>
            <div id="username-title">Tài khoản <i id="required">*</i></div>
            <input type="text" placeholder="">
            <div id="password-title">Mật khẩu <i id="required">*</i></div>
            <input type="text" placeholder="">
            <button id="button-login">Đăng nhập</button>
            <p id="forgot-password">Quên mật khẩu?</p>
            <div class="not-register">Chưa có tài khoản? <p id="register-here" @click="redirectRegister">Đăng ký tại đây</p></div>
            <p id="back-home-page" @click="redirectHomePage"><i class="fas fa-arrow-circle-left"></i>Trở lại trang chủ</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheLogin',
    components: {
    },
    created() {
    },
    methods: {
        redirectRegister() {
            this.$router.push('/register')
        },
        redirectHomePage() {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
@import url(../css/components/login.css);
</style>