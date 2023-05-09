<template>
    <DxPieChart :data-source="dataPieChart" type="doughnut"
    :customize-point="customizePoint"
    >
        <DxSeries argument-field="title" value-field="total" color="#9c9c9c"
        >
        </DxSeries>
        <DxLegend
            horizontal-alignment="center"
            vertical-alignment="bottom"
            :visible=false
        />
    </DxPieChart>
</template>
 
<script>
import { DxPieChart, DxSeries, DxLegend } from 'devextreme-vue/pie-chart';

export default {
    components: {
        DxPieChart,
        DxSeries,
        DxLegend
    },
    data() {
        return {
            dataPieChart: [
                {
                    title: "China",
                    total: 100
                },
                {
                    title: "United States",
                    total: 18
                },
            ]
        }
    }, 
    methods: {
        customizePoint(pointInfo) {
            return this.dataPieChart[1].total == pointInfo.value ? { color: this.colorPie } : { };
        }
    },
    props:{
        colorPie: null,
        dataChart: [],
    },
    watch:{
        dataChart: {
            handler(newQuestion) {
                // this will be run immediately on component creation.
                this.dataPieChart = this.dataChart;
            },
            // force eager callback execution
            immediate: true
        }
  }

}
</script>