<template>
  <div id="chart-demo">
    <DxChart
      id="chart"
      :data-source="sharingStatisticsInfo"
      palette="red"
    >
      <DxCommonSeriesSettings
        :type="type"
        argument-field="year"
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

  data() {
    return {
      sharingStatisticsInfo : [{
year: 1,
cluster: 1,
}, {
year: 2,
cluster: 7,
}, {
year: 3,
cluster: 45,
}, {
year: 4,
cluster: 211,
}, {
year: 5,
cluster: 382,
}, {
year: 6,
cluster: 437,
},
{
year: 7,
cluster: 437,
}, {
year: 8,
cluster: null,
}, {
year: 9,
// cluster: 437,
}, {
year: 10,
// cluster: 0,
}, {
year: 11,
// cluster: 0,
}, {
year: 12,
// cluster: 0,
}, ],
      architectureSources : [
{ value: 'cluster', name: 'Cluster' },
],
      types: ['spline', 'stackedspline', 'fullstackedspline'],
      type: 'spline',
    };
  },
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
