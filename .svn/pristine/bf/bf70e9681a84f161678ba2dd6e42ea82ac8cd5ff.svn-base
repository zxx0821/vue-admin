<template>
  <div id="solutionNum">
    <button @click="toChange">切换</button>
    <transition name="bounce">
      <div :class="className" :id="id" :style="{height:height,width:width}" v-if="show"></div>
    </transition>
    <div class="modal" v-show="showmodal" id="modelDrag">
      <div class="visualMes">
       <div class="visualMes-wrapper">
         <div class="showImg">
           <p class="visuimg"><img :src="isdata.img" alt="" class=""></p>
         </div>
         <div class="showMess">
         <p v-for="(item,key) in isdata.message" class="detailMess"
         ><label class="keyMess">{{key}}</label><span class="valueMess">{{item}}</span></p>
       </div>
       </div>
      </div>
      <!--<div class="btn">
        <el-button type="primary" size="mini" @click="cancelModel">取消</el-button>
        <el-button type="primary" size="mini" @click="selectedmodel">确定</el-button>
      </div>-->
    </div>
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
        form: {
          region: ''
        },
        onOff:true,
        showmodal: false,
        isdata: {
          img:  require('../../assets/logo.png'),
          message:{
            title: "整体内容超出div宽度后自动换行的css代码内容超出div宽度后自动换行的css代码内容超出div宽度后自动换行的css代码",
            bubble:true,
            button: 0,
            buttons: 1,
            cancelBubble: false,
            cancelable: true,
            clientX: 977,
            clientY: 475,
            composed: true,
            ctrlKey: false,
            currentTarget: null,
            defaultPrevented: false,
            detail: 1,
            eventPhase: 0,
            fromElement: null,
            isTrusted: true,
            layerX: 90,
            layerY: -93,
            metaKey: false,
            movementX: 0,
            movementY: 0,
            offsetX: 300,
            offsetY: 5,
            pageX: 977,
            pageY: 475
          }
          }
      }
    },
    components: {
      modelDetail
    },
    computed: {
    },
    mounted(){
      this.initChart();
      this.dragable();
    },
    methods: {
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
            _this.showmodal = true;
          });
        }).catch((err)=> {
          console.log(err)
        })
      },
      select(sorce, nodes){
        for(let i=0;i<nodes.length;i++){
          if(nodes[i].id === sorce){
            return nodes[i].name;
          }
        }
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
          obj.value = data[i].nodeId;
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
      },
      toChange(){
        let _this = this;
        let dom = document.getElementById(this.id);
        console.log(dom.className)
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
         dom.removeAttribute("class")
         dom.setAttribute("class","force")
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
      selectedmodel(){
        let _this = this;
        _this.showmodal = false;
      },
      cancelModel(){
        let _this = this;
        _this.showmodal = false;
      },
      dragable(e){
        let dom = document.getElementById("modelDrag");
        let parentDom = document.getElementById("solutionNum")
        dom.onmousedown = function(e) {
           e = e || window.event; //兼容ie浏览器
          let diffX = e.clientX - dom.offsetLeft;
          let diffY = e.clientY - dom.offsetTop;
          if(typeof dom.setCapture!='undefined'){
            dom.setCapture();
          }
          document.onmousemove = function(e) {
            e = e || window.event; //兼容ie浏览器
            let left =e.clientX-diffX;
            let top=e.clientY-diffY;
            //移动时重新得到物体的距离，解决拖动时出现晃动的现象
            dom.style.left = left+ 'px';
            dom.style.top = top + 'px';
          };
          document.onmouseup = function(e) { //当鼠标弹起来的时候不再移动
            this.onmousemove = null;
            this.onmouseup = null; //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）

            //修复低版本ie bug
            if(typeof dom.releaseCapture!='undefined'){
              dom.releaseCapture();
            }
          };
        };
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
  #modelDrag{
    position:absolute;
    top:50%;
    left:50%;
    z-index: 900;
    border-radius: 6px;
    background: #eee;
    color: #000;
    padding:10px 0 10px 0;
    transform: translate(-50%,-50%);
    cursor: move;
  }
  .visualMes{
  }
  .visualMes .visualMes-wrapper{
    display: flex;
    width: 400px;
  }
  .visualMes-wrapper .showImg{
    flex: 1;
    box-sizing: border-box;
    height:400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .showImg .visuimg{
  }
  .visualMes .showMess{
    flex: 1;
    height:400px;
    overflow-y: scroll;
    font-size: 12px;
  }
  .showMess .detailMess{
    margin-bottom: 8px;
  }
  .showMess .keyMess{
    color: #333;
  }
  .showMess .valueMess{
    margin-left: 8px;
    color: #666;
  }
  .modal .btn{
    width:100%;
    text-align: center;
    margin-top:10px;
  }
  /*.circle{
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
   }*/
</style>
