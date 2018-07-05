<template>
    <div class="chart-container">
      <radiaTrees height="120%" width="80%"></radiaTrees>
    </div>
</template>

<script>
  import radiaTrees from '../../components/echarts/radialTree'
    export default {
        name: "radialTree",
      components: {
        radiaTrees
      }
    }
</script>

<style scoped>
  .chart-container{
    position: relative;
    padding:0;
    width: 100%;
    height:100vh;
  }
</style>
