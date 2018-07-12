<template>
  <div class="chart-container">
    <forcetocircles height="100%" width="100%"></forcetocircles>
  </div>
</template>

<script>
  import forcetocircles from '../../components/echarts/forcetocircle'
  export default {
    name: "forcetocircle",
    components: {
      forcetocircles
    },
    mounted(){
      this.selectList()
    },
    methods:{
      selectList(){

      }
    }
  }
</script>

<style scoped>
  .chart-container{
    position: relative;
    padding:20px;
    width: 100%;
    height:95vh;
  }
</style>
