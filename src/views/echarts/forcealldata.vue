<template>
  <div class="app-container chart-container">
    <div id="chart"  style="width:100%;height: 100%;"></div>
  </div>
</template>

<script>
  import {getvisiual,radialTree} from '../../api/api'
  export default {
    name: "forcealldata",
    data(){
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
          let links = [];
          let nodes = [{name:"识别",nodeName:"识别",childrenLen:1,isHasChild:1,parentNodeId:0,status:1,category:-1,nodeType:0}];
          let n =-1;
          let solute = [TreeData]
          let resultData = this.solutionNum(solute,nodes,links,n)
          resultData.nodes.sort(function (a,b) {
            return a.nodeId -b.nodeId;
          });
          resultData.links.sort(function (a,b) {
            return a.source -b.source;
          });

          console.log(resultData)
          let numItem =[];
          let categories =[];
          resultData.nodes.map(function (item, idex) {
            numItem.push(item.category);
          });
          numItem = Array.from(new Set(numItem));
          for(let i=0;i<numItem.length;i++){
            categories[i] = {
              name: '类目' + i
            };
          }
          console.log(categories)
          let option = {
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'
            },
            legend: [{
              data: categories.map(function (a) {
                return a.name;
              })
            }],
            "series": [
              {
                "type": "graph",
                "layout": "force",
                "edgeSymbol": ["circle"],
                "data": resultData.nodes,
                "links": resultData.links,
                "draggable": true,
                "categories" :categories,
                "roam": true,
                "hoverAnimation" : true,
                "focusNodeAdjacency": true,
                "symbolSize":function (value, params) {
                  switch (params.data.category) {
                    case 0:return 120;break;
                    case 1:return 100;break;
                    case 2:return 80;break;
                    case 3:return 60;break;
                    case 4:return 40;break;
                    case 5:return 20;break;
                    default:return 10;
                  }
                },
                "itemStyle": {
                  "normal": {
                    borderColor: '#fff',
                    borderWidth: 1,
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    "label": {
                      "show": true,
                      "position": "inside",
                      formatter: '{b}'
                    },
                  },
                  "emphasis": {
                    "borderWidth": 5,
                    "borderType": "solid",
                    "borderColor": "#ccc",
                    lineStyle: {
                      width: 10
                    }
                  }
                },
                "lineStyle": {
                  "normal": {
                    "color": "source",
                    "width": "3",
                    "type": "solid",
                    "curveness": 0.1,
                    "opacity": 1
                  }
                },
                "label": {
                },
                "edgeSymbolSize": [8, 10],
                "force": {
                  "repulsion" :100,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                  "gravity" : 0.03,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                  "edgeLength":[10,200],
                  "layoutAnimation" : true
                },
                //"showSymbol": true,
                //"yAxisIndex": 0,
                //"z": 2
              }
            ]
          }
          _this.chart.setOption(option);
        })
        _this.chart.on('click', function (params) {
          console.log(params)
        })
      },
      solutionNum(data,nodes,links,n){
        n++;
        let _this = this;
        for(let i=0; i<data.length;i++){
          let nodesobj = {};
          nodesobj.nodeId=data[i].nodeId;
          nodesobj.name=data[i].nodeName;
          nodesobj.childrenLen = data[i].dictionaryChildNode.length;
          nodesobj.isHasChild = data[i].isHasChild;
          nodesobj.parentNodeId = data[i].parentNodeId;
          nodesobj.status = data[i].status;
          nodesobj.category = n;
          if(data[i].isHasChild>0){
            nodesobj.nodeType = 1;
          }else{
            nodesobj.nodeType = 0;
          }
          nodes.push(nodesobj);
          let obj = {};
          obj.source = data[i].parentNodeId;
          obj.target = data[i].nodeName;
          links.push(obj);
          if(data[i].dictionaryChildNode && data[i].dictionaryChildNode.length>0){
            _this.solutionNum(data[i].dictionaryChildNode,nodes,links,n);
          }
        }
        return {nodes,links};
      },
    },
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
