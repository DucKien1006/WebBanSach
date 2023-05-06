
<template>
        <div class="admin-dashboard">
            <div class="summary-admin">
                <div class="total-purchases total-summary">
                    <div class="icon">
                        <i class="fas fa-money-check-alt"></i>
                    </div>

                    <div class="total-value">
                        <span>Tổng thanh toán</span>
                        <div>
                            <span class="value-purchases">{{ orderDashboard.TotalPayment  || 0 }}Đ</span>
                            <span class="unit-value">
                                    năm nay</span>
                        </div>
                       
                    </div>
                </div>

                <div class="total-order total-summary">
                    <div class="icon">
                        <i class="fas fa-cart-plus"></i>
                    </div>

                    <div class="total-value">
                        <span>Tổng đơn hàng</span>
                        <div>
                            <span class="value-purchases">{{ orderDashboard.TotalOrder  || 0 }} đơn</span>
                            <span class="unit-value">
                                    năm nay</span>
                        </div>
                    </div>
                </div>

                <div class="total-products total-summary">
                    <div class="icon">
                        <i class="fas fa-book"></i>
                    </div>

                    <div class="total-value">
                        <span>Tổng sản phẩm</span>
                        <div>
                            <span class="value-purchases">{{totalProduct}} cuốn</span>
                            
                        </div>
                    </div>
                </div>

                <div class="total-users total-summary">
                    <div class="icon">
                        <i class="fas fa-user"></i>
                    </div>

                    <div class="total-value">
                        <span>Tổng người dùng</span>
                        <div>
                            <span class="value-purchases">{{totalUser}} người</span>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="chart-report">
                <div class="chart-left item-cart">
                    <div class="title-chart">
                        Tổng thanh toán
                    </div>
                    <SplineChart 
                        :chartOrder="chartOrder"
                    />
                </div>
                <div class="chart-right">
                    <div class="chart-right-1">
                        <div class="chart-right-1-content chart-right-1-left item-cart">
                            <div class="title-chart">
                                Số lượng sách mới
                            </div>
                            <PieChart class="pie-chart"
                            colorPie='#f1536e'
                            :dataChart="productChart"
                            />
                           
                        </div>
                        <div class="chart-right-1-content chart-right-1-right item-cart">
                            <div class="title-chart">
                                Số lượng user mới
                            </div>
                            <PieChart 
                                class="pie-chart"
                                colorPie='#fda006'
                                :dataChart="userChart"
                                />
                        </div>
                    </div>
                    <div class="chart-right-2 item-cart">
                        <div class="title-chart">
                            Tổng kiểu thanh toán
                            <ProgressBar 
                                :orderDashboard="orderDashboard"
                            />
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
</template>
<script>
import TheUserTable from '../../components/TheUserTable.vue';
import SplineChart from '../../components/charts/SplineChart.vue';
import PieChart from '../../components/charts/PieChart.vue';
import ProgressBar from '../../components/charts/ProgressBar.vue';
import TheTable from '../../components/tables/TheTable.vue';
import { getCountProduct } from '../../apis/productApi';
import {getCountUser} from '../../apis/accountApi';
import {dashboardAdmin} from '../../apis/adminApi'
import { mapActions } from 'vuex';
export default{
    components:{ TheUserTable, SplineChart, PieChart, ProgressBar, TheTable },

    data() {
        return {
            totalProduct: 0,
            totalUser: 0,
            orderDashboard: {},
            chartOrder:[],
            userChart:[],
            productChart: [],
        }
    },  

    async created() {
        const me = this;
        // await getCountProduct().then(res => {
        //     if (res != null && res.data != null) {
        //         this.totalProduct = res.data[0].total
        //     }
        // })

        // await getCountUser().then(res => {
        //     if (res != null && res.data != null) {
        //         this.totalUser = res.data[0].total
        //     }
        // })
        me.toggleLoading(true);
        await dashboardAdmin().then(res => {
            me.toggleLoading(false);
            if (res && res.success) {
                if (res.orderDashboard) {
                    me.orderDashboard = res.orderDashboard;
                }
                if (res.orderChart){
                    me.chartOrder = res.orderChart;
                    me.fomartChart();
                }
                if (res.userDashboard) {
                    me.totalUser = res.userDashboard.totalUser;
                    me.fomartdataUserChart(res.userDashboard);
                }
                if (res.productDashboard) {
                    me.totalProduct = res.productDashboard.totalProduct;
                    me.fomartdataProductChart(res.productDashboard);
                    
                }
            } 
        })
    }, 
    methods: {
        ...mapActions({
            toggleLoading: 'loading/toggleLoading',
        }),
        fomartChart() {
            const me = this;
            for (var i = me.chartOrder.length - 1 ; i >= 0; i--) {
                if (me.chartOrder[i].Total > 0) break;
                else me.chartOrder[i].Total = null;
            }
        },
        fomartdataUserChart(data){
            const me = this;
            me.userChart = [
                {
                    title: 'Tổng người dùng',
                    total: data.totalUser
                },
                {
                    title: 'Tổng người dùng mới trong tháng',
                    total: data.totalNewUser
                }
            ]
        },
        fomartdataProductChart(data){
            const me = this;
            me.productChart = [
                {
                    title: 'Tổng sản phẩm',
                    total: data.totalProduct
                },
                {
                    title: 'Tổng sản phẩm mới trong tháng',
                    total: data.totalNewProduct
                }
            ]
        }
    }
    
}
</script>

<style>
.summary-admin{
    margin-top: 32px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 32px;
}
.admin-dashboard{
    height: 100%;
}
.summary-admin .total-summary{
    height: 100px;
    width: 200px;
    padding: 1.25rem 1.75rem;
    border-radius: 2rem;
    width: 22%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.summary-admin .total-purchases{
    background-color: #00c689;
    color: #fff;
}
.total-purchases .icon{
    color: #00c689;
}
.total-summary .icon{
    height: 64px;
    width: 64px;
    align-items: center;
    background-color: #fff;
    text-align: center;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    font-size: 24px;
}
.total-summary .total-value{
    display: flex;
    flex-direction: column;
    text-align: right;
}
.total-summary .total-value .unit-value{
    font-size: 12px;
}
.total-summary .total-value .value-purchases{
    font-size: 18px;
    font-weight: 600;
}
.summary-admin .total-order{
    background-color: #3da5f4;
    color: #3da5f4 ;
}
.summary-admin .total-value{
    color: #fff;
}
.summary-admin .total-products{
    background-color: #f1536e;
    color: #f1536e;
}
.summary-admin .total-users{
    background-color: #fda006;
    color: #fda006;
}
.chart-report{
    height: 420px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 36px;
}
.chart-left{
    width: 47%;
    /* background-color: #eeeeee; */
    height: 100%;
    border-radius: 4px;
    border: 1px solid #eeeeee;
}
.chart-right{
    width: 47%;
    height: 100%;
}
.chart-report .chart-right-1{
    display: flex;
    height: 240px;
    justify-content: space-between;
}
.chart-report .chart-right-1-content{
    /* background-color: #eeeeee; */
    border: 1px solid #eeeeee;
    height: 240px;
    width: 47%;
    border-radius: 4px;
}
.chart-report .chart-right-2{
    margin-top: 20px;
    height: 160px;
    /* background-color: #eeeeee; */
    border: 1px solid #eeeeee;
    border-radius: 4px;
}
.item-cart{
    padding: 1.25rem 1.75rem;
    background-color: #fff;  
    color: #000;
    position: relative;
}
.pie-chart{
    position: absolute;
    top: -65px;
    left: 56px;
    width: 160px;
}
</style>