<template>
  <div>d3</div>
</template>

<script>
  import * as d3 from 'd3';
  import {d3relation} from '../../mock/D3/relation.js'
  export default {
    name: "forceGraph",
    data(){
      return {
        graphData:null
      }
    },
    mounted(){
      this.graphinit();
    },
    methods: {
      graphinit(){
        let _this = this;
        _this.graphData = d3relation;
        let width = 900;
        let height = 800;
        let img_w = 77;
        let img_h = 80;
        let radius = 30;    //圆形半径
        let svg = d3.select(_this.$el).append("svg")
          .attr("width",width)
          .attr("height",height);
        //let forces = d3.force();
        //边
      }
    }
  }
</script>

<style scoped>
  .nodetext {
    font-size: 12px ;
    font-family: SimSun;
    fill:#000000;
  }

  .linetext {
    font-size: 12px ;
    font-family: SimSun;
    fill:#1f77b4;
    fill-opacity:0.0;
  }

  .circleImg {
    stroke: #ff7f0e;
    stroke-width: 1.5px;
  }
</style>
