<template>
  <div class="chart-container">
    <Chart height="100%" width="100%"></Chart>
  </div>
</template>
<script>
  import Chart from '../../components/echarts/lesmisterable'
  export default {
    name: "lesmisterable",
    data(){
      return {
        form: {
          region: ''
        },
      }
    },
    components: {
      Chart
    },
    methods: {
      clickSelect(){
      }
    },
    mounted(){
    }
  }
</script>

<style scoped>
  .chart-container{
    position: relative;
    padding:20px;
    width: 96%;
    height: 85vh;
  }
</style>
