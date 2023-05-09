<template>
    <div class="title-progress">Tiền mặt khi giao hàng</div>
 <DxProgressBar
      id="progress-bar-status"
      :min="0"
      :max="orderDashboard?.TotalPayment"
      :status-format="statusFormat"
      :value="orderDashboard?.TotalShipCode"
      width="90%"
    />
    <div class="title-progress">Chuyển khoản</div>
    <DxProgressBar
      id="progress-bar-status"
      :min="0"
      :max="orderDashboard?.TotalPayment"
      :status-format="statusFormat"
      :value="orderDashboard?.TotalTransfer"
      width="90%"
    />
</template>

<script>
import { DxProgressBar } from 'devextreme-vue/progress-bar';

export default {
    components:{
        DxProgressBar
    },
    methods: {
        statusFormat(ratio) {
            return `${Math.round(ratio * 100)}%`;
            }
    },
    props:{
        orderDashboard:{}
    }
}
</script>

<style>
.dx-progressbar-container {
    height: 18px;
}
.dx-progressbar-range {
    background-color: #3da5f4;
}
.title-progress{
    margin-top: 8px;
    font-size: 12px;
}

</style>