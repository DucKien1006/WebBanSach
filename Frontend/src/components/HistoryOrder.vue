<template>
    <div class="history-wrapper">
        <div class="title-history">Lịch sử mua hàng</div>
        <table>
            <tr class="row-item">
                <th>Mã đơn hàng</th>
                <th>Giá</th>
                <th>Hình thức thanh toán</th>
                <th>Tình trạng thanh toán</th>
                <th>Ngày mua</th>
            </tr>
            <tr v-for="(item, index) in listOrder" :key="index" class="row-item">
                <td>
                    <p id="name-item">{{ item.orderCode }}</p>
                </td>
                <td>{{ item.totalPayment }}</td>
                <td>{{ mapPaymentType(item.paymentType) }}</td>
                <td>{{ mapPaymentStatus(item.paymentStatus) }}</td>
                <td>{{ formatDate(item.lastTime) }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import { getHistory } from '../apis/cartApi';

export default {
    data() {
        return {
            listOrder: [],
        }
    },
    async created() {
        await getHistory()
            .then(res => {
                this.listOrder = res.data;
            })
    },
    methods: {
        formatDate(oDate) {
            const date = new Date(oDate);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return day + "/" + month + "/" + year;
        },
        mapPaymentType(type) {
            return type === 1 ? "Thanh toán khi nhận hàng" : "Chuyển khoản"
        },
        mapPaymentStatus(status) {
            let res = '';
            switch (status) {
                case 1:
                    res = 'Chưa thanh toán';
                    break;
                case 2:
                    res = 'Đã thanh toán';
                    break;
                case 3:
                    res = 'Chờ chuyển khoản';
                    break;
                case 4:
                    res = 'Đã hủy';
                    break;
                default:
                    res = 'Error';
            }
            return res;
        },
    }
}
</script>

<style scoped>
.history-wrapper {
    margin: 0 12%;
}

.title-history {
    font-size: 20px;
    font-weight: bold;
}

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border-bottom: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    text-align: center;
}
</style>