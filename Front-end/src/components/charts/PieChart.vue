<template>
    <DxPieChart :data-source="billionaires" type="doughnut"
    :customize-point="customizePoint"
    >
        <DxSeries argument-field="country" value-field="amount" color="#9c9c9c"
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
            billionaires: [
                {
                    country: "China",
                    amount: 100
                },
                {
                    country: "United States",
                    amount: 18
                },
            ]
        }
    }, 
    methods: {
        customizePoint(pointInfo) {
            return pointInfo.value < 100 ? { color: this.colorPie } : { };
        }
    },
    props:{
        colorPie: null,
    }

}
</script>