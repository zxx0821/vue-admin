<template>
  <div class="modal">
    <div class="model-wrapper">
      <h1 class="title"></h1>
    </div>
    <div class="btn">
      <el-button type="primary" size="mini" @click="cancelModel">取消</el-button>
      <el-button type="primary" size="mini" @click="selectedmodel">确定</el-button>
    </div>
  </div>
</template>

<script>
    export default {
      name: "modeldetail",
      props: ['isdata'],
      data(){
          return {
            showmodal:false,
            modelData: {

            }
          }
      },
      created:{
        init(){
        }
      },
      mounted(){
        this.modelDataInit();
      },
      methods: {
        modelDataInit(){
          let _this = this;
          console.log('zz')
          console.log(_this.modelData)
        },
        cancelModel(){
          let _this = this;
          _this.showmodal = false;
          _this.$emit('cancelModel',_this.showmodal);
        },
        selectedmodel(){
          let _this = this;
          _this.showmodal = false;
          _this.$emit('selectedmodel',_this.showmodal);
        }
      }
    }
</script>

<style scoped>
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
    width:500px;
    height:500px;
  }
  .modal .btn{
    width:100%;
  }
</style>
