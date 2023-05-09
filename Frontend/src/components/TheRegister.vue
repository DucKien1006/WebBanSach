<template>
    <div class="login-form-wrapper">
        <div class="login-form">
            <p id="login-form-title">Đăng ký</p>
            <div id="username-title">Họ và tên <i id="required">*</i></div>
            <input type="text" placeholder="" v-model="username">
            <div id="username-title">Email <i id="required">*</i></div>
            <input type="text" placeholder="" v-model="email">
            <div id="username-title">Số điện thoại <i id="required">*</i></div>
            <input type="text" placeholder="" v-model="phone">
            <div id="username-title">Địa chỉ<i id="required">*</i></div>
            <input type="text" placeholder="" v-model="address">
            <div id="password-title">Mật khẩu <i id="required">*</i></div>
            <input type="password" placeholder="" v-model="password" >
            <div id="password-title">Nhập lại mật khẩu <i id="required">*</i></div>
            <input type="password" placeholder="" v-model="passwordAgain" >
            <button id="button-login" @click="register">Đăng ký</button>
            <!-- <p id="forgot-password">Quên mật khẩu?</p> -->
            <!-- <div class="not-register">Chưa có tài khoản? <p id="register-here" @click="redirectRegister">Đăng ký tại đây</p> -->
            <!-- </div> -->
            <p id="back-home-page" @click="redirectHomePage"><i class="fas fa-arrow-circle-left"></i>Trở lại trang chủ</p>
        </div>
    </div>
</template>

<script>
import { register } from '../apis/accountApi'
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
            passwordAgain: null,
            email: null,
            phone: null,
            address: null,

        }
    },
    methods: {
        redirectRegister() {
            this.$router.push('/register')
        },
        redirectHomePage() {
            this.$router.push('/');
        },
        async register() {
            const toast = useToast();
            if (!this.username || this.username == "") {
                toast.error("Không được để trống họ và tên", {
                                position: "top-center",
                                showCloseButtonOnHover: true,
                                hideProgressBar: true,
                                closeButton: "button",
                                icon: true,
                                rtl: false
                            });
                            return;
            }
            if (!this.email || this.email == "") {
                toast.error("Không được để trống email", {
                                position: "top-center",
                                showCloseButtonOnHover: true,
                                hideProgressBar: true,
                                closeButton: "button",
                                icon: true,
                                rtl: false
                            });
                            return;

            }
            if (!this.phone || this.phone == "") {
                toast.error("Không được để trống điện thoại", {
                                position: "top-center",
                                showCloseButtonOnHover: true,
                                hideProgressBar: true,
                                closeButton: "button",
                                icon: true,
                                rtl: false
                            });
                            return;

            }
            if (!this.address || this.address == "") {
                toast.error("Không được để trống địa chỉ", {
                                position: "top-center",
                                showCloseButtonOnHover: true,
                                hideProgressBar: true,
                                closeButton: "button",
                                icon: true,
                                rtl: false
                            });
                            return;

            }
            if (!this.address || this.address == "") {
                toast.error("Không được để trống địa chỉ", {
                                position: "top-center",
                                showCloseButtonOnHover: true,
                                hideProgressBar: true,
                                closeButton: "button",
                                icon: true,
                                rtl: false
                            });
                            return;

            }
            if (!this.password || this.password == "") {
                toast.error("Không được để trống mật khẩu", {
                                position: "top-center",
                                showCloseButtonOnHover: true,
                                hideProgressBar: true,
                                closeButton: "button",
                                icon: true,
                                rtl: false
                            });
                            return;

            };
            if (!this.passwordAgain || this.passwordAgain == "" || this.passwordAgain != this.password) {
                toast.error("Nhập lại mật khẩu không đúng", {
                                position: "top-center",
                                showCloseButtonOnHover: true,
                                hideProgressBar: true,
                                closeButton: "button",
                                icon: true,
                                rtl: false
                            });
                            return;

            };
            if (this.username && this.password) {
                var user = {
                    Fullname: this.username,
                    Email: this.email,
                    NewPassword: this.password,
                    Address1: this.address,
                    Phone: this.phone
                }
                await register(user)
                    .then(res => {
                        if (res.message != null) {
                            toast.info(res.message, {
                                position: "top-center",
                                showCloseButtonOnHover: true,
                                hideProgressBar: true,
                                closeButton: "button",
                                icon: true,
                                rtl: false
                            });
                        }
                        else {
                            toast.error("Có lỗi xảy ra", {
                                position: "top-center",
                                showCloseButtonOnHover: true,
                                hideProgressBar: true,
                                closeButton: "button",
                                icon: true,
                                rtl: false
                            });
                        }
                        if (res.success) {
                            toast.info("Vui lòng đăng nhập lại", {
                                position: "top-center",
                                showCloseButtonOnHover: true,
                                hideProgressBar: true,
                                closeButton: "button",
                                icon: true,
                                rtl: false
                            });
                            this.$router.push('/login');
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