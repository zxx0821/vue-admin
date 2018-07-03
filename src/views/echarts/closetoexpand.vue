<template>
  <div class="chart-container">
    <echarsgraph height="100%" width="100%"></echarsgraph>
  </div>
</template>

<script>
  import echarsgraph from '../../components/echarts/closetoexpand'
    export default {
        name: "closetoexpand",
      data(){
          return {

          }
      },
      components: {
        echarsgraph
      }
    }
</script>

<style scoped>
  .chart-container{
    position: relative;
    padding:20px;
    width: 96%;
    height:85vh;
  }
</style>
