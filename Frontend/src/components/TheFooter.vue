<template>
    <div class="footer">
        <div class="letter-wrapper">
            <img src="../assets/canh-cam-letter.png" alt="">
            <div class="register-info">
                <p>Đăng ký nhận bản tin từ Book Store</p>
                <p>Đừng bỏ lỡ những tin nhắn ưu đãi độc quyền dành riêng cho bạn</p>
            </div>
            <div class="email-field">
                <input type="text" placeholder="Nhập địa chỉ email của bạn">
                <i class="far fa-paper-plane"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheFooter',
    components: {

    },
    created() {
    }
}
</script>

<style scoped>
@import url(../css/components/footer.css);
</style>