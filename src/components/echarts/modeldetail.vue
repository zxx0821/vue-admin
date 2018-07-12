<template>
  <div class="modal" v-show="showmodal" id="modelDrag" ref="modelref">
    <p class="icon"><strong>信息</strong><i class="el-icon-close close" @click="cancelModel"></i></p>
    <el-carousel indicator-position="outside" :autoplay= "false">
      <el-carousel-item v-for="(item,key) in modelData" :key="key" class="visualMes-wrapper">
        <div class="showImg">
          <p class="visuimg"><img :src="item.img" alt="" class=""></p>
        </div>
        <div class="showMess">
            <p class="detailMess" v-for="(val,childkey) in item.message"><label class="keyMess">{{childkey}}</label><span class="valueMess">{{val}}</span></p>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
    export default {
      name: "modeldetail",
      props: {
        isdata: {
          type: Array,
          default: function () {
            return []
          }
        },
        showmodal: {
          type: Boolean,
          default: false
        }
      },
      data(){
          return {
            modelData:this.isdata,
          }
      },
      watch:{
        /*监听父组件数据,子组件实时更新*/
        isdata(){
          this.modelData = this.isdata
        }
      },
      computed:{
        modelWidth(){
          return this.$refs.modelref.clientWidth;
        },
        modelHeight(){
          return this.$refs.modelref.clientHeight;
        }
      },
      mounted(){
        this.dragable();
      },
      methods: {
        /*模态框隐藏*/
        cancelModel(){
          let _this = this;
          _this.showmodal = false;
         _this.$emit('cancelModel',_this.showmodal);
        },
        /*弹框拖拽函数*/
        dragable(){
          this.$nextTick(()=>{
            let dom = document.getElementById("modelDrag");
           /* let parentDom = document.getElementById("solutionNum");*/
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
                if(left<200){
                  left=200;
                }
                if(top<200){
                  top=200;
                }
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
          })
        }
      }
    }
</script>

<style>
  #modelDrag{
    position:absolute;
    top:50%;
    left:50%;
    z-index: 900;
    border-radius: 6px;
    background: #eee;
    padding:10px 0 10px 0;
    transform: translate(-50%,-50%);
    cursor: move;
  }
  .modal .icon{
    width:95%;
    margin: 0 auto 4px;
    font-size:20px;
    border-bottom:1px solid deepskyblue;
    padding-bottom: 2px;
  }
  .close{
    color: deepskyblue;
    float:right;
  }
  .modal .el-carousel{
    width:500px;
  }
  #modelDrag .el-carousel__container{
    height:400px;
  }
  #modelDrag .visualMes-wrapper{
    display: flex;
    width: 100%;
  }
  .visualMes-wrapper .showImg{
    flex: 1;
    box-sizing: border-box;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .visualMes-wrapper .showMess{
    flex: 1;
    height:100%;
    overflow-y: auto;
    font-size: 12px;
  }
  .showMess .detailMess{
    margin-right: 8px;
  }
  .showMess .keyMess{
    color: #333;
  }
  .showMess .valueMess{
    margin-left: 8px;
    color: #666;
  }
  .is-active button{
    background-color: deepskyblue;
    opacity: .54;
  }
</style>
