<template>
    <div class="login-form-wrapper">
        <div class="login-form">
            <p id="login-form-title">Đăng nhập</p>
            <div id="username-title">Tài khoản <i id="required">*</i></div>
            <input type="text" placeholder="" v-model="username">
            <div id="password-title">Mật khẩu <i id="required">*</i></div>
            <input type="password" placeholder="" v-model="password" v-on:keyup.enter="loginAuth">
            <button id="button-login" @click="loginAuth">Đăng nhập</button>
            <p id="forgot-password">Quên mật khẩu?</p>
            <div class="not-register">Chưa có tài khoản? <p id="register-here" @click="redirectRegister">Đăng ký tại đây</p>
            </div>
            <p id="back-home-page" @click="redirectHomePage"><i class="fas fa-arrow-circle-left"></i>Trở lại trang chủ</p>
        </div>
    </div>
</template>

<script>
import { loginAuth } from '../apis/accountApi'
import { useToast } from "vue-toastification"

export default {
    name: 'TheLogin',
    components: {
    },
    created() {
    },
    data() {
        return {
            username: null,
            password: null,
        }
    },
    methods: {
        redirectRegister() {
            this.$router.push('/register')
        },
        redirectHomePage() {
            this.$router.push('/');
        },
        async loginAuth() {
            if (this.username && this.password) {
                await loginAuth(this.username, this.password)
                    .then(res => {
                        if (res.data) {
                            localStorage.setItem('token', res.data);
                            this.$router.push('/');
                        }
                        else {
                            const toast = useToast();
                            toast.error('Tài khoản và mật khẩu không đúng', {
                                position: "top-center",
                                showCloseButtonOnHover: true,
                                hideProgressBar: true,
                                closeButton: "button",
                                icon: true,
                                rtl: false
                            });
                        }
                    })
            }
        }
    }
}
</script>

<style scoped>
@import url(../css/components/login.css);
</style>