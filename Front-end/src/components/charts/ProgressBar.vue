<template>
 <DxProgressBar
      id="progress-bar-status"
      :min="0"
      :max="100"
      :status-format="statusFormat"
      :value="20"
      width="90%"
      height="60px"
    />
    <DxProgressBar
      id="progress-bar-status"
      :min="0"
      :max="100"
      :status-format="statusFormat"
      :value="80"
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
            return `${ratio * 100}%`;
            }
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

</style>