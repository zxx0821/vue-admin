<template>
  <div id="solutionNum">
    <button @click="toChange">切换</button>
    <div :class="className" :id="id" :style="{height:height,width:width}"></div>

  </div>
</template>

<script>
  import {getvisiual} from '../../api/api'
  export default {
    name: "forcetocircle",
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      }
    },
    data(){
      return {
        chart: null,
        show:false,
        form: {
          region: ''
        },
        onOff:true,
        showmodal: false,
        isdata: {

        }
      }
    },
    computed: {
    },
    mounted(){
      this.initChart();
    },
    methods: {
      initChart(){
        let _this = this;
        _this.chart = _this.$echarts.init(document.getElementById(this.id));
        _this.chart.showLoading();
        getvisiual().then((res)=>{
          _this.chart.hideLoading();
          // console.log(res);
          let graph = res.data.dataEchart;
          //console.log(graph)
          let links = [];
          let nodes = [{id:0,name:"识别",childrenLen:1,isHasChild:1,parentNodeId:0,status:1,category:-1,nodeType:0}];
          let n =-1;
          //  console.log(graph);
          let graphData = _this.solutionNum(graph,nodes,links,n);
          graphData.links.sort(function (a,b) {
            return a.source -b.source;
          });
          graphData.nodes.sort(function (a,b) {
            return a.id -b.id;
          });
          // console.log(graphData);
          let numItem =[];
          let categories =[];
          graphData.nodes.map(function (item, idex) {
            numItem.push(item.category);
          });
          numItem = Array.from(new Set(numItem));
          for(let i=0;i<numItem.length;i++){
            categories[i] = {
              name: '类目' + i
            };
          }
          // console.log(categories)
          let options = {
            tooltip: {
              formatter:function (datas) {}
            },
            legend: [{
              // selectedMode: 'single',
              data: categories.map(function (a) {
                return a.name;
              })
            }],
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            "series": [
              {
                "type": "graph",
                "layout": "force",
                "edgeSymbol": ["circle"],
                "data": graphData.nodes,
                "links": graphData.links,
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
          };
          _this.chart.setOption(options);
          _this.chart.on("click", function (params) {
            console.log(params)
          })
        }).catch((err)=> {
          console.log(err)
        })
      },
      solutionNum(data,nodes,links,n){
        n++;
        let _this = this;
        for(let i=0; i<data.length;i++){
          let nodesobj = {};
          nodesobj.id=data[i].nodeId;
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
          obj.target = data[i].nodeId;
          links.push(obj);
          if(data[i].dictionaryChildNode && data[i].dictionaryChildNode.length>0){
            _this.solutionNum(data[i].dictionaryChildNode,nodes,links,n);
          }
        }
        return {nodes,links};
      },
      toggleShowNodes(chart, params) {
        //console.log(params)
        let _this = this;
        let open = !!params.data.open,
          options = chart.getOption(),
          seriesIndex = params.seriesIndex,
          srcLinkName = params.data.id,
          serieLinks = options.series[seriesIndex].links,
          serieData = options.series[seriesIndex].data,
          serieDataMap = new Map(),
          serieLinkArr = [];
        // 当前根节点是展开的，那么就需要关闭所有的根节点
        if (open) {
          // 递归找到所有的link节点的target的值
          _this.findLinks(serieLinkArr, srcLinkName, serieLinks, true);
          // console.log(serieLinkArr.length)
          if (serieLinkArr.length) {
            serieData.forEach(sd => serieDataMap.set(sd.id, sd));
            for (let i = 0; i < serieLinkArr.length; i++) {
              if (serieDataMap.has(serieLinkArr[i])) {
                let currentData = serieDataMap.get(serieLinkArr[i]);
                currentData.category = -Math.abs(currentData.category);
                if (currentData.nodeType === 1) {
                  currentData.open = false;
                }
              }
            }
            serieDataMap.get(srcLinkName).open = false;
            chart.setOption(options);
          }
        } else {
          // 当前根节点是关闭的，那么就需要展开第一层根节点
          _this.findLinks(serieLinkArr, srcLinkName, serieLinks, false);
          // console.log(serieLinkArr)
          if (serieLinkArr.length) {
            _this.cities = serieLinkArr;
            _this.showmodal = true;
            /* _this.$nextTick(()=>{
               let oModel = document.getElementsByClassName('modal')[0];
               oModel.style.top = params.event.offsetY + 'px';
               oModel.style.left = params.event.offsetX + 150+ 'px';
             });*/
            serieData.forEach(sd => serieDataMap.set(sd.id, sd));
            for (let j = 0; j < serieLinkArr.length; j++) {
              if (serieDataMap.has(serieLinkArr[j])) {
                let currentData = serieDataMap.get(serieLinkArr[j]);
                currentData.category = Math.abs(currentData.category);
              }
            }
            //console.log(_this.checkedCities)
            serieDataMap.get(srcLinkName).open = true;
            chart.setOption(options);
          }
        }
      },
      findLinks(links, srcLinkName, serieLinks, deep) {
        // console.log(srcLinkName)
        let _this = this;
        let targetLinks = [];
        serieLinks.filter(link => link.source === srcLinkName).forEach(link => {
          targetLinks.push(link.target);
          links.push(link.target)
        });
        if (deep) {
          for (let i = 0; i < targetLinks.length; i++) {
            _this.findLinks(links, targetLinks[i], serieLinks, deep);
          }
        }
        //.log(targetLinks)
      },
      toChange(){
        let _this = this;
       //console.log(_this.chart.getOption().series)
        let option = _this.chart.getOption();
       console.log(option.series[0].categories);
       if(_this.onOff){
         option.series[0].layout= 'circular';
         option.series[0].circular.rotateLabel= true;
         option.series[0].symbolSize=function(value, params){
           switch (params.data.category) {
             case 0:return 50;break;
             case 1:return 40;break;
             case 2:return 30;break;
             case 3:return 20;break;
             default:return 10;
           }
         };
         _this.onOff = false;
       }else{
         option.series[0].layout= 'force';
         option.series[0].symbolSize=function(value, params){
           switch (params.data.category) {
             case 0:return 120;break;
             case 1:return 100;break;
             case 2:return 80;break;
             case 3:return 60;break;
             case 4:return 40;break;
             case 5:return 20;break;
             default:return 10;
           }
         };
         _this.onOff = true;
       }
        _this.chart.setOption(option);
      }
    }
  }
</script>

<style scoped>
  #solutionNum{
    width: 100%;
    height: 100vh;
  }
  .modal{
    position:absolute;
    top:50%;
    left:50%;
    z-index: 900;
    width:160px;
    background: #ccc;
    border-radius: 6px;
    color: #fff;
    padding:10px 0 10px 0;
    transform: translate(-50%,-50%);
    text-align:center;
  }
  .el-checkbox{
    margin-left:4px;
  }
  .modal .checkboxselect{
    padding:20px;
  }
  .modal .btn{
    width:100%;
  }
</style>
