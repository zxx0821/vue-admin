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
  import {getforceGraph} from '../../api/api'
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
        checkAll: false,
        checkedCities: [],
        cities: ['上海', '北京', '广州', '深圳','杭州','江西','福建','大连'],
        isIndeterminate: false,
        showmodal: false
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
        getforceGraph().then((res)=>{
          _this.chart.hideLoading();
          let graph = res.data.dataEchart;
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
                "categories": [
                  {
                    "name": "用户"
                  },
                  {
                    "name": "身份证"
                  },
                  {
                    "name": "姓名"
                  },
                  {
                    "name": "性别"
                  },
                  {
                    "name": "生日"
                  },
                  {
                    "name": "手机"
                  },
                  {
                    "name": "固定电话"
                  },
                  {
                    "name": "邮箱"
                  },
                  {
                    "name": "qq"
                  },
                  {
                    "name": "地址"
                  },
                  {
                    "name": "银行卡"
                  },
                  {
                    "name": "基本信息"
                  },
                  {
                    "name": "地址分类"
                  },
                  {
                    "name": "联系方式"
                  },
                  {
                    "name": "银行卡分类"
                  }
                ],
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
                  "repulsion": 300,
                  "edgeLength": 50
                },
                "showSymbol": true,
                "yAxisIndex": 0,
                "z": 2
              }
            ],
            "legend": {
              /*"data": [
                "用户",
                "身份证",
                "姓名",
                "性别",
                "生日",
                "手机",
                "固定电话",
                "邮箱",
                "qq",
                "地址",
                "银行卡",
                "基本信息",
                "地址分类",
                "联系方式",
                "银行卡分类"
              ]*/
            }
          };
          _this.chart.setOption(options);
          _this.chart.on('click', function (params) {
            let category = params.data.category,
               nodeType = params.data.nodeType;
            if (category === 0 || nodeType === 1) {
              _this.toggleShowNodes(_this.chart, params);
            }
          })
        });

      },
      toggleShowNodes(chart, params) {
        console.log(params.data.open)
        let _this = this;
        let open = !!params.data.open,
          options = chart.getOption(),
          seriesIndex = params.seriesIndex,
          srcLinkName = params.name,
          serieLinks = options.series[seriesIndex].links,
          serieData = options.series[seriesIndex].data,
          serieDataMap = new Map(),
          serieLinkArr = [];
        // 当前根节点是展开的，那么就需要关闭所有的根节点
        if (open) {
          // 递归找到所有的link节点的target的值
          _this.findLinks(serieLinkArr, srcLinkName, serieLinks, true);
          console.log(serieLinkArr.length)
          if (serieLinkArr.length) {
            serieData.forEach(sd => serieDataMap.set(sd.name, sd));
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
          console.log(serieLinkArr)
          if (serieLinkArr.length) {
            _this.cities = serieLinkArr;
            _this.showmodal = true;
            _this.$nextTick(()=>{
              let oModel = document.getElementsByClassName('modal')[0];
              oModel.style.top = params.event.offsetY + 'px';
              oModel.style.left = params.event.offsetX + 150+ 'px';
            });
            serieData.forEach(sd => serieDataMap.set(sd.name, sd));
            for (let j = 0; j < serieLinkArr.length; j++) {
              if (serieDataMap.has(serieLinkArr[j])) {
                let currentData = serieDataMap.get(serieLinkArr[j]);
                currentData.category = Math.abs(currentData.category);
              }
            }
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
        console.log(targetLinks)
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
