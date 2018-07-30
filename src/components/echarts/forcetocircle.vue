<template>
  <div id="solutionNum">
   <!-- <button @click="toChange">切换</button>-->
    <div :class="className" :id="id" :style="{height:height,width:width}" v-if="show"></div>
  <!--  <modelDetail  v-show="showmodal" @cancelModel="cancelModel" :isdata="isdata"> </modelDetail>-->
  </div>
</template>

<script>
  import {getvisiual} from '../../api/api';
  import modelDetail from './modeldetail'
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
        show:true,
        onOff:true,
        showmodal: false,
        isdata: [{
          img: "",
          message:{
          }
        }]
      }
    },
    components: {
      modelDetail
    },
    mounted(){
      this.initChart();
    },
    methods: {
      /**初始化数据*/
      initChart(){
        let _this = this;
        _this.chart = _this.$echarts.init(document.getElementById(this.id));
        let dom = document.getElementById(this.id);
        dom.setAttribute("class", "circle");
        _this.chart.showLoading();
        getvisiual().then((res)=>{
          _this.chart.hideLoading();
          let graph = res.data.dataEchart;
          let links = [];
          let nodes = [{id:0,name:"识别",childrenLen:1,isHasChild:1,parentNodeId:0,status:1,category:-1,nodeType:0}];
          let n =-1;
          let graphData = _this.solutionNum(graph,nodes,links,n);
          graphData.nodes.sort(function (a,b) {
            return a.nodeId -b.nodeId;
          });
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
          let options = {
            tooltip: {
              formatter:function (datas) {}
            },
            legend: [{
              data: categories.map(function (a) {
                return a.name;
              })
            }],
            animation:false,
            animationDuration: 750,
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
                    "borderColor": '#fff',
                    "borderWidth": 1,
                    "shadowBlur": 10,
                    "shadowColor": 'rgba(0, 0, 0, 0.3)',
                    "label": {
                      "show": true,
                      "position": "inside",
                      "formatter": '{b}'
                    },
                  },
                  "emphasis": {
                    "borderWidth": 5,
                    "borderType": "solid",
                    "borderColor": "#ccc",
                    "lineStyle": {
                      "width": 10
                    }
                  }
                },
                "lineStyle": {
                  "normal": {
                    "color": "source",
                    "width": "3",
                    "type": "solid",
                    "curveness": 0,
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
              }
            ]
          };
          _this.chart.setOption(options);
          _this.chart.on("click", function (params) {
            _this.isdata = [{
              img:  require('../../assets/logo.png'),
              message:{
                title: "自动换行的css代码自动换自动换行的码自动换行的css代码",
                offsetX: 300,
                offsetY: 5,
                pageX: 977,
                pageY: 475
              }
            },{
              img:  require('../../assets/1.jpg'),
              message:{
                title: "轮播图js",
                offsetX: 300,
                offsetY: 5,
                pageX: 977,
                pageY: 475,
                des:"浏览器支浏览器支持所有主流浏览器都支持 overflow-y 属性注释：overflow-y 属性无法在 IE8 以及更早的浏览器正确地工作。浏览器支持所有主流浏览器都支持 overflow-y 属性注释：overflow-y 属性无法在 IE8 以及更早的浏览器正确地工作。持所有主流浏览器都支持 overflow-y 属性注释：overflow-y 属性无法在 IE8 以及更早的浏览器正确地工作。浏览器支持所有主流浏览器都支持 overflow-y 属性注释：overflow-y 属性无法在 IE8 以及更早的浏览器正确地工作。",
                page:"自动换行的css代码自动换自动换行的码自动换行的css代码自动换行的css代码自动换自动换行的码自动换行的css代码自动换行的css代码自动换自动换行的码自动换行的css代码自动换行的css代码自动换自动换行的码自动换行的css代码自动换行的css代码自动换自动换行的码自动换行的css代码自动换行的css代码自动换自动换行的码自动换行的css代码"
              }
            }];
            _this.showmodal = true;
          });
        }).catch((err)=> {
          console.log(err)
        })
      },
      /**
       * @param data  遍历的数据
       * @param nodes  存放节点信息
       * @param links  存放连接信息
       * @param n      递归的次数,即深度
       * @returns {{nodes: *, links: *}}
       */
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
          obj.value = data[i].nodeId;
          links.push(obj);
          if(data[i].dictionaryChildNode && data[i].dictionaryChildNode.length>0){
            _this.solutionNum(data[i].dictionaryChildNode,nodes,links,n);
          }
        }
        return {nodes,links};
      },
      /* 点击按钮改变数据布局方式*/
      toChange(){
        let _this = this;
        let dom = document.getElementById(this.id);
        let option = _this.chart.getOption();
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
          dom.removeAttribute("class");
          dom.setAttribute("class","force");
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
          dom.removeAttribute("class");
          dom.setAttribute("class","circle");
          _this.onOff = true;
        }
        _this.chart.setOption(option);
      },
      /**
       * 自定义函数,隐藏模态框
       */
      cancelModel(){
        let _this = this;
        _this.showmodal = false;
      }
    }
  }
</script>

<style scoped>
  #solutionNum{
    width: 100%;
    height: 100vh;
    position:relative;
  }
  .circle{
    animation-name: myfirst;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    animation-direction: alternate;
    animation-play-state: running;
  }
  @keyframes myfirst {
    0%{transform: scale(0.1);}
    100%{transform: none;}
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  .force{
    animation-name: first;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    animation-direction: alternate;
    animation-play-state: running;
  }
  @keyframes first {
    0%{transform: scale(0.1);}
    100%{transform: none;}
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
