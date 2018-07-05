<template>
  <div id="lesmisterable">
    <div :class="className" :id="id" :style="{height:height,width:width}"></div>
    <div class="modal" v-show="showmodal">
        <div class="checkboxselect">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
      <div class="btn">
        <el-button type="primary" size="mini" @click="showmodal=false">取消</el-button>
        <el-button type="primary" size="mini" @click="selectedmodel">确定</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import {getEchartsData} from '../../api/api'
    export default {
      name: "lesmisterable",
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
            checkAll: false,
            checkedCities: ['上海'],
            cities: ['上海', '北京', '广州', '深圳','杭州','江西','福建','大连'],
            isIndeterminate: false,
            showmodal: false
          }
      },
      mounted(){
          this.initChart();
          //this.drag();
      },
      methods: {
          initChart(){
            let _this = this;
            this.chart = this.$echarts.init(document.getElementById(this.id));
            this.chart.showLoading();
            getEchartsData().then((res)=>{
              this.chart.hideLoading();
              let graph = res.data.dataEchart;
              let categories = [];
              /*for (let i = 0; i < 9; i++) {
                categories[i] = {
                  name: '类目' + i
                };
              }*/
              graph.nodes.forEach(function (node) {
                node.itemStyle = null;
                node.value = node.symbolSize;
                node.symbolSize /= 1.5;
                node.label = {
                  normal: {
                    show: node.symbolSize > 30
                  }
                };
                node.category = node.attributes.modularity_class;
              });
              this.chart.setOption({
                title: {},
                toolbox: { //可视化的工具箱
                },
                tooltip: {
                  trigger: "item",
                  enterable:true,
                  padding: [5,5,5,5],
                  textStyle: {
                    color: '#fff'
                  },
                  position: function (point,params,dom,rect,size ) {
                    let model = document.getElementsByName('dom');
                    let str = `<div><button>按钮</button></button></div>`
                    console.log(model.innerHTML)
                  }
                },
               /* legend: [{
                  // selectedMode: 'single',
                 data: categories.map(function (a) {
                    return a.name;
                  })
                }],*/
                animationDuration: 1500,
                animationEasingUpdate: 'quinticInOut',
                series : [
                  {
                    type: 'graph',
                    layout: 'none',
                    edgeSymbol: ['circle', 'arrow'],
                    data: graph.nodes,
                    links: graph.links,
                    categories: categories,
                    roam: true,
                    focusNodeAdjacency: true,
                    symbolSize: 50,
                    itemStyle: {
                      normal: {
                        borderColor: '#fff',
                        borderWidth: 1,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                      }
                    },
                    label: {
                     //position: 'left',
                      formatter: '{b}'
                    },
                    lineStyle: {
                      color: 'source',
                      curveness: 0
                    },
                    emphasis: {
                      lineStyle: {
                        width: 10
                      }
                    }
                  }
                ]
              });
              this.chart.on('click',function (e) {
                let ev = e || window.event;
                console.log(ev)
                _this.showmodal = true;
                _this.$nextTick(()=>{
                  let oModel = document.getElementsByClassName('modal')[0];
                  oModel.style.top = ev.event.offsetY + 'px';
                  oModel.style.left = ev.event.offsetX + 150+ 'px';
                })
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
