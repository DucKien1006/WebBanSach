<template>
  <div id="chart-demo">
    <DxChart
      id="chart"
      :data-source="sharingStatisticsInfo"
      palette="red"
    >
      <DxCommonSeriesSettings
        :type="type"
        argument-field="MONTH"
      />
      <DxCommonAxisSettings>
        <DxGrid :visible="true"/>
      </DxCommonAxisSettings>
      <DxSeries
        v-for="architecture in architectureSources"
        :key="architecture.value"
        :value-field="architecture.value"
        :name="architecture.name"
        color="#00c689"
      />
      <DxMargin :bottom="20"/>
      <DxArgumentAxis
        :allow-decimals="false"
        :axis-division-factor="60"
      >
        <DxLabel>
          <DxFormat type="decimal"/>
        </DxLabel>
      </DxArgumentAxis>
      
      <DxTooltip :enabled="true"/>
    </DxChart>
    
  </div>
</template>
<script>

import {
  DxChart,
  DxSeries,
  DxArgumentAxis,
  DxCommonSeriesSettings,
  DxCommonAxisSettings,
  DxGrid,
  DxLegend,
  DxMargin,
  DxTooltip,
  DxLabel,
  DxFormat,
} from 'devextreme-vue/chart';
import DxSelectBox from 'devextreme-vue/select-box';
export default {

  components: {
    DxSelectBox,
    DxChart,
    DxSeries,
    DxArgumentAxis,
    DxCommonSeriesSettings,
    DxCommonAxisSettings,
    DxGrid,
    DxLegend,
    DxMargin,
    DxTooltip,
    DxLabel,
    DxFormat,
  },
  props:{
    chartOrder :[],
  },

  data() {
    return {
      sharingStatisticsInfo: [{
        MONTH: 1,
        Total: 1,
      }, {
        MONTH: 2,
        Total: 7,
      }, {
        MONTH: 3,
        Total: 45,
      }, {
        MONTH: 4,
        Total: 211,
      }, {
        MONTH: 5,
        Total: 382,
      }, {
        MONTH: 6,
        Total: 437,
      },
      {
        MONTH: 7,
        Total: 437,
      }, {
        MONTH: 8,
        Total: null,
      }, {
        MONTH: 9,
        Total: 0,
      }, {
        MONTH: 10,
        // cluster: 0,
      }, {
        MONTH: 11,
        // cluster: 0,
      }, {
        MONTH: 12,
        // cluster: 0,
      },],
      architectureSources : [
{ value: 'Total', name: 'Tổng tiền' },
],
      types: ['spline', 'stackedspline', 'fullstackedspline'],
      type: 'spline',
    };
  },
  created() {
  },
  watch:{
    chartOrder: {
      handler(newQuestion) {
        // this will be run immediately on component creation.
        this.sharingStatisticsInfo = this.chartOrder;
      },
      // force eager callback execution
      immediate: true
    }
  }
};
</script>
<style>

.caption {
  font-weight: 500;
}

.option > span {
  margin-right: 14px;
}

.option > .dx-widget {
  display: inline-block;
  vertical-align: middle;
}
#chart-demo{
  height: 380px;
}
</style>
