<template>
  <div class="checkout-wrapper">
    <div class="checkout-form">
      <div class="checkout-title">
        <p>Thanh toán</p>
        <i @click="closeCheckoutForm" class="fas fa-times"></i>
      </div>
      <div class="main-content">
        <div class="info-customer">
          <p class="info-contact">Thông tin liên hệ</p>
          <div class="row-info">
            <label for="fname"><i class="far fa-user"></i> Họ tên:</label>
            <input type="text" id="fname" v-model="sessionOrder.fullName">
          </div>
          <div class="row-info">
            <label for="phone"><i class="fas fa-mobile-alt"></i> Số điện thoại:</label>
            <input type="text" id="phone" v-model="sessionOrder.phoneNumber">
          </div>
          <div class="row-info">
            <label for="email"><i class="far fa-envelope"></i> Địa chỉ email:</label>
            <input type="text" id="email" v-model="sessionOrder.email">
          </div>
          <div class="row-info">
            <label for="address"><i class="far fa-address-card"></i> Địa chỉ nhận hàng:</label>
            <input type="text" id="address" v-model="sessionOrder.address">
          </div>
        </div>
        <div class="payment-way">
          <p class="payment-way-title">Hình thức thanh toán</p>
          <div class="row-way">
            <input type="radio" id="transfer" value="2" v-model="sessionOrder.paymentType" />
            <label for="transfer">Chuyển khoản</label>
          </div>
          <div class="row-way">
            <input type="radio" id="cod" value="1" v-model="sessionOrder.paymentType" />
            <label for="cod">Thanh toán khi nhận hàng (Ship COD)</label>
          </div>
          <div v-if="showQrCode" class="transfer-way">
            <div class="info-transfer">
              <p>Quý khách vui lòng chuyển khoản theo đúng các thông tin dưới đây:</p>
              <div class="row-right">
                <p>Tên chủ tài khoản:</p>
                <p>Số tài khoản:</p>
                <p>Ngân hàng:</p>
                <p>Số tiền:</p>
              </div>
              <div class="bold-text">
                <p>Nguyễn Văn Dũng</p>
                <p>0123456789</p>
                <p>ACB</p>
                <p>{{ formatCurrencyVi(totalAmountAfterDiscount) }}</p>
              </div>
            </div>
            <img src="../../assets/qr-code.png" alt="">
          </div>
        </div>
      </div>
      <div class="confirm">
        <button @click="checkout">Hoàn tất</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getItems, checkoutApi } from '../../apis/cartApi';
import formatCurrencyVi from '../../utils/formatCurrencyVi';
import { mapState } from 'vuex';

export default {
  components: {
  },
  props: {
    totalAmount: {
      type: String,
      default: 0,
    }
  },
  data() {
    return {
      sessionOrder: {

      }
    }
  },
  async created() {
    if (localStorage.getItem('token')) {
      await getItems()
        .then(res => {
          if (res.data) {
            this.sessionOrder = res.data;
          }
        });
    }
  },
  methods: {
    formatCurrencyVi,
    closeCheckoutForm() {
      this.$emit('closeCheckoutForm', 0);
    },
    async checkout() {
      await checkoutApi(this.sessionOrder)
        .then(res => {
          if(res.success === true) {
            this.$emit('closeCheckoutForm');
          }
        })
    }
  },
  computed: {
    ...mapState({ totalAmountAfterDiscount: state => state.cart.totalAmount }),
    showQrCode() {
      return this.sessionOrder.paymentType == 2;
    }
  }
}
</script>

<style scoped>
@import url(../../css/popup/checkout-popup.css);
</style>