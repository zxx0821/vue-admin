<template>
  <div class="app-container chart-container">
    <div id="chart"  style="width:100%;height: 100%;"></div>
  </div>
</template>

<script>
  import {getvisiual, radialTree} from '../../api/api'
  export default {
    name: "Tree",
    data () {
      return {
        chart: null
      }
    },
    mounted () {
      this.initChart()
    },
    methods: {
      initChart(){
        let _this = this;
        _this.chart = _this.$echarts.init(document.getElementById('chart'));
        _this.chart.showLoading();
        getvisiual().then((res) => {
          _this.chart.hideLoading();
          // let data = res.data.dataEchart
          let TreeData = res.data.dataEchart
          let solute = [TreeData]
          let data = this.changename(solute)[0]
          console.log(data)
          let option = {
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'
            },
            series: [
              {
                type: 'tree',
                data: [data],
                top: '18%',
                bottom: '14%',
                layout: 'radial',
                symbol: 'emptyCircle',
                symbolSize: 7,
                initialTreeDepth: 3,
                animationDurationUpdate: 750

              }
            ]
          }
          _this.chart.setOption(option);
        })
        _this.chart.on('click', function (params) {
          _this.adjustSize()
        })
      },
      changename(data){
        let _this = this;
        for(let i=0;i<data.length;i++){
          data[i].children=data[i].dictionaryChildNode;
          data[i].name=data[i].nodeName;
          if(data[i].dictionaryChildNode && data[i].dictionaryChildNode.length>0){
            _this.changename(data[i].dictionaryChildNode);
          }
        }
        return data;
      },
      adjustSize () {
        let _this = this
        let dom = document.getElementById('chart')
        let allNode = 0;
        let nodes = _this.chart._chartsViews[0]._data._graphicEls
        for(let i=0;i<nodes.length;i++){
          let node = nodes[i]
          if(node===undefined){
            continue;
          }
          allNode++;
        }
        let height = window.innerHeight -100;
        let currentHeight = 10*allNode;
        let newHeight = Math.max(currentHeight, height);
        dom.style.width = window.innerWidth -210 + 'px';
        dom.style.height = newHeight+ 'px';
        _this.chart.resize()
      }
    },
  }
</script>

<style scoped>
  .chart-container{
    position: relative;
    padding:0;
    width: 100%;
    height:90vh;
  }
</style>
