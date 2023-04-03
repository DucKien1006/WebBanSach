<template>
    <div class="product-detail-wrapper">
        <div class="product-wrapper">
            <div class="product-image">
                <img src="https://bookbuy.vn/Res/Images/Product/dung-de-tam-trang-tro-thanh-thai-do_121749_4.jpg" alt="">
            </div>
            <div class="product-detail">
                <p id="product-name">Đừng Để Tâm Trạng Trở Thành Thái Độ</p>
                <p id="product-author">Na Gyeo Ul (Tác giả)</p>
                <p id="product-translator">Khánh Huyền (Dịch giả)</p>
                <p id="product-price">81,500 đ</p>
                <div class="fontsize-12" id="promotion-info">Tiết kiệm:<p id="promotion-amount">14,500 đ (15%)</p></div>
                <p class="fontsize-12" id="real-price">Giá thị trường: 96,000 đ</p>
                <div class="fontsize-12" id="product-status">Tình trạng: <p>Còn hàng</p></div>
                <div class="add-favorites"><i class="far fa-heart"></i><p>Thêm vào yêu thích</p></div>
                <button id="add-to-cart">Thêm vào giỏ hàng</button>
                <button id="buy-now">Mua Ngay</button>
                <div id="contact-info">Gọi đặt hàng: <p>(028) 3820 7153</p> hoặc <p>0933 109 009</p></div>
            </div>
        </div>
        <div class="info-promotion-wrapper">
            <p id="info-promotion">Thông tin & Khuyến mãi</p>
            <p><i class="fas fa-box-open"></i>Đổi trả hàng trong vòng 7 ngày</p>
            <p><i class="fas fa-truck"></i>Freeship toàn quốc từ 250.000đ</p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ProductDetail',
    components: {
    },
    created() {
    }
}
</script>

<style>
@import url(../css/components/detail.css);
</style>