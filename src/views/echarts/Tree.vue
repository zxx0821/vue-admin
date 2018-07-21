<template>
  <div class="chart-container">
    <div id=chart  style="width:100%;height: 100%;"></div>
  </div>
</template>

<script>
  import {getvisiual} from '../../api/api'
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
         let data = res.data.dataEchart;
         let n=0;
         let graphData =_this.changename(data,n)[0];
         let options = {
           tooltip: {
             trigger: 'item',
             triggerOn: 'mousemove'
           },
           draggable:true,
           series: [
             {
               type: 'tree',
               data: [graphData],
               top: '1%',
               left: '7%',
               bottom: '1%',
               right: '20%',
               hoverAnimation : true,
               label: {
                 normal: {
                   position: 'left',
                   verticalAlign: 'middle',
                   align: 'right',
                   fontSize: 12
                 }
               },
               leaves: {
                 label: {
                   normal: {
                     position: 'right',
                     verticalAlign: 'middle',
                     align: 'left'
                   }
                 }
               },
               symbolSize:8,
               initialTreeDepth:2,
               expandAndCollapse: true,
               animationDuration: 550,
               animationDurationUpdate: 750
             }
           ]
         };
         _this.chart.setOption(options);
         _this.adjustSize()
       })
         _this.chart.on('click', function (params) {
           _this.adjustSize()
       })
       /* _this.chart.on('dblclick', function (params) {
          console.log(params)
        })*/
      },
      changename(data,n){
        n++;
        let _this = this;
        for(let i=0;i<data.length;i++){
          data[i].children=data[i].dictionaryChildNode;
          data[i].name=data[i].nodeName;
          data[i].category = n;
          if(data[i].dictionaryChildNode && data[i].dictionaryChildNode.length>0){
            _this.changename(data[i].dictionaryChildNode,n);
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
