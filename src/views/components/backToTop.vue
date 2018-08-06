<template>
  <div class="components-container">
    <h3>backToTop api</h3>
    <el-table
      :data="backToTop">
      <el-table-column
        prop="params"
        label="参数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="descript"
        label="说明"
      >
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="value"
        label="可选值">
      </el-table-column>
      <el-table-column
      prop="defaultvalue"
      label="默认值">
    </el-table-column>

    </el-table>

    <i class="fa fa-user" style="width:20px;height:20px;font-size: 20px;"></i>
    <i class="fa fa-tasks" style="width:20px;height:20px;font-size: 20px;"></i>
    <div class="placeholder-container">
      <div v-for="value in content">{{value}}</div>
    </div>
      <backToTop
        transitionName="fade"
        :customStyle="myBackToTopStyle"
        :visibilityHeight="300"
        :backPosition="50"
        :customIconStyle="customIconStyle"
        backIcon="fa-space-shuttle fa-rotate-270"
      ></backToTop>
  </div>
</template>

<script>
  import backToTop from '../../components/backToTop/backToTop'

  export default {
    name: 'backToTop-demo',
    components: { backToTop },
    data() {
      return {
        myBackToTopStyle: {
          right: '50px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        },
        customIconStyle: {
          color: 'deepskyblue',
          'font-size': '30px'
        },
        backToTop: [{
          params: 'transitionName',
          descript: 'transition动画',
          type: 'String',
          value:'-',
          defaultvalue:'fade'
        },
          {
          params: 'customStyle',
          descript: '返回标签自定义样式',
          type: 'Object',
          value:'-',
          defaultvalue:'right: \'30px\',\n' +
          '            bottom: \'30px\',\n' +
          '            width: \'30px\',\n' +
          '            height: \'30px\',\n' +
          '            \'border-radius\': \'4px\',\n' +
          '            \'line-height\': \'30px\',\n' +
          '            background: \'#e7eaf1\''
        },
          {
            params: 'visibilityHeight',
            descript: '出现backToTop时,scrolle高度',
            type: 'Number',
            value:'-',
            defaultvalue:'400'
          },
          {
            params: 'backPosition',
            descript: '到达的目标值, backToTop消失',
            type: 'Number',
            value:'-',
            defaultvalue:'0'
          },
          {
            params: 'customIconStyle',
            descript: '自定义图标样式',
            type: 'Object',
            value:'-',
            defaultvalue:' \'font-size\': \'20px\',\n' +
            '            color: \'#9aaabf\''
          },
          {
            params: 'customIconStyle',
            descript: '图标的className ,使用fontawesome',
            type: 'String',
            value:'-',
            defaultvalue:'fa-arrow-up'
          }
        ],
        content: []
      }
    },
    mounted(){
      let msg = 'test-back-to-top'
      for(let i=9;i<100;i++){
        this.content.push(msg)
      }
    }
  }
</script>

<style scoped>
  .placeholder-container div {
    margin: 10px;
  }
</style>
