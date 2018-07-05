<template>
  <div id="lesmisterable">
    <div :class="className" :id="id" :style="{height:height,width:width}"></div>
    <div class="modal" v-show="showmodal">
      <p>name:{{isdata.name}}</p>
      <p>label:{{isdata.label}}</p>
    </div>
  </div>

</template>

<script>
  import {getforceGraphall} from '../../api/api'
  export default {
    name: "forceGraph",
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
        _this.chart.showLoading();
        getforceGraphall().then((res)=>{
          _this.chart.hideLoading();
          let graph = res.data.dataEchart;
          console.log(graph)
          let options = {
            tooltip: {
              formatter:function (datas) {}
            },
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            "series": [
              {
                "type": "graph",
                "layout": "force",
                "edgeSymbol": ["circle", "arrow"],
                "data": graph.nodes,
                "links": graph.links,
                "draggable": true,
                "categories" : [ {name : '学校'}, {name : '校区'}, {name : '学院'}, {name : '班级'} ],
                "roam": true,
                "focusNodeAdjacency": true,
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
                      width: 5
                    }
                  }
                },
                "lineStyle": {
                  "normal": {
                    "color": "red",
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
                  "repulsion": 500,
                  "edgeLength": 100
                },
                "showSymbol": true,
                "yAxisIndex": 0,
                "z": 2
              }
            ]
          };
          _this.chart.setOption(options);
          _this.chart.on("click", function (params) {
            _this.isdata = params.data;
            _this.showmodal = true;
            _this.$nextTick(()=>{
              let oModel = document.getElementsByClassName('modal')[0];
              oModel.style.top = params.event.offsetY + 'px';
              oModel.style.left = params.event.offsetX + 150+ 'px';
            });
          })
        });

      },
      selectedmodel(){
        let _this = this;
        _this.showmodal = false;
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.checkedCities : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }
  }
</script>

<style scoped>
  #lesmisterable{
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
