<template>
  <div id="radialTree">
    <div :class="className" :id="id" :style="{height:height,width:width}" class="circle"></div>
    <div class="modal" v-show="showmodal">
      <div class="model-wrapper">
        <ul>
          <li><a href="#"><img src="../../assets/logo.png" alt=""></a></li>
        </ul>
      </div>
      <div class="btn">
        <el-button type="primary" size="mini" @click="showmodal=false">取消</el-button>
        <el-button type="primary" size="mini" @click="selectedmodel">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {getvisiual} from '../../api/api'
    export default {
        name: "radialTree",
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
      mounted(){
        this.initChart();
      },
      methods: {
        initChart(){
          let _this = this;
          _this.chart = _this.$echarts.init(document.getElementById(this.id));
          let dom = document.getElementById(this.id);
          console.log(dom)
          _this.chart.showLoading();
          getvisiual().then((res)=>{
            _this.chart.hideLoading();
           let data = res.data.dataEchart;
            let n=0;
            let graphData =_this.changename(data,n)[0];
            console.log(graphData);
            let options = {
              draggable:true,
              series: [
                {
                  type: 'tree',
                  data: [graphData],
                  top: '1%',
                  bottom: '1%',
                  layout: 'radial',
                  symbol: 'emptyCircle',
                  //zlevel: 6,
                  hoverAnimation : true,
                  focusNodeAdjacency: true,
                  symbolSize:function (value, params) {
                    switch (params.data.category) {
                      case 0:return 40;break;
                      case 1:return 35;break;
                      case 2:return 30;break;
                      case 3:return 25;break;
                      case 4:return 20;break;
                      case 5:return 15;break;
                      default:return 10;
                    }
                  },
                  initialTreeDepth:3,
                  /*expandAndCollapse: true,
                  animationDuration: 3050,
                  animationDurationUpdate:3050*/
                }
              ]
            };
            _this.chart.setOption(options);
            _this.chart.on('mouseover',function (e) {
              let ev = e || window.event;
              console.log(ev);
              _this.chart.dispatchAction({
                type: 'focusNodeAdjacency',
                // 使用 dataIndex 来定位节点。
                dataIndex: ev.dataIndex
              });
              _this.showmodal = true;
              _this.$nextTick(()=>{
                let oModel = document.getElementsByClassName('modal')[0];
                let w =oModel.clientWidth;
                console.log(w)
                oModel.style.top = ev.event.offsetY + 'px';
                oModel.style.left = ev.event.offsetX +w+ 10+'px';
              })
            })
            _this.chart.on('mouseout',function (e) {
              let ev = e || window.event;
              console.log(ev);
              _this.showmodal = false;
              let oModel = document.getElementsByClassName('modal')[0];
              oModel.addEventListener("mouseover",function () {
                _this.showmodal = true;
              })

              //_this.showmodal = false;
            })
          }).catch((err)=> {
            console.log(err)
          })
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
        selectedmodel(){
          let _this = this;
          _this.showmodal = false;
        }
      }
    }
</script>

<style scoped>
  #radialTree{
   width: 100%;
    height: 100vh;
    position:relative;
    text-align: center;
  }
  #chart{
    height:100%;
    margin: 0 auto;
  }
  .modal{
    position:absolute;
    top:50%;
    left:50%;
    z-index: 900;
    background: #ccc;
    border-radius: 6px;
    color: #fff;
    padding:10px 0 10px 0;
    transform: translate(-50%,-50%);
    text-align:center;
    width:300px;
    height:400px;
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
  .circle{
    animation-name: myfirst;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    animation-play-state: running;
  }
  @keyframes myfirst {
    0%{transform: scale(0.1);}
    100%{transform: none;}
  }
</style>
