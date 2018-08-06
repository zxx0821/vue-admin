<template>
  <div class="uploader">
    <div><H1>使用webuploader</H1> </div>
    <div class="file-panel">
      <div class="showFileMes">
        <div id="filePicker" class="filePickerIcon">
          <i class="fa fa-upload" style="font-size: 50px;"></i>
          <p>单次可上传100张</p>
        </div>
      </div>
      <div class="file-list">
        <ul class="file-item" :class="`file-${file.id}`" v-for="file in fileList">
          <li class="file-type"><i class=fa :class="fileCategory(file.ext)" size="20"></i></li>
          <li class="file-name">{{file.name}}</li>
          <li class="file-size">{{fileSize(file.size)}}</li>
          <li class="file-status">上传中...</li>
          <ul class="uploaderStatue">
            <li class="progress"><p class="length"></p></li>
            <li class="file-operate">
              <a title="开始" @click="resume(file)"><i class="fa fa-pause" aria-hidden="true" ></i></a>
              <a title="暂停" @click="stop(file)"><i class="fa fa-play" aria-hidden="true"></i></a>
              <a title="移除" @click="remove(file)"><i class="fa fa-close" aria-hidden="true"></i></a>
            </li>
          </ul>
        </ul>
      </div>
    </div>
    <vueupLoader
      ref="uploader"
      uploadButton="#filePicker"
      multiple
      url="url"
      @fileChange="fileChange"
      @uploadProgress="onProgress"
      @uploadSuccess="onSuccess"
      @uploadError="uploadError"
      @error="error"
      @uploadComplete="complete"
    ></vueupLoader>
  </div>
</template>

<script>
  import WebUploader from 'webuploader'
  import vueupLoader from '../../components/upLoader/uploader'
  export default {
    name: 'uploaderImage',
    data() {
      return {
        url: '',
        fileList: [],
        oldlist:0,
        percent:0
      }
    },
    watch: {
      fileList (val) {
        this.oldlist = this.fileList.length
      },
    },
    computed: {
      uploader() {
        return this.$refs.uploader;
      },
      IconSize () {
        console.log(this.fileList.length)
        if(this.fileList.length>0){
          return 1;
        }else{
          return 100;
        }
      }

    },
    methods: {
      fileChange(file) {
        if (!file.size) return;
        this.fileList.push(file);
      },
      onProgress(file, percent) {
        $(`.file-${file.id} .length`).css('width', percent * 100 + '%');
        $(`.file-${file.id} .file-status`).html((percent * 100).toFixed(2) + '%');
      },
      onSuccess (file, response) {
        console.log('上传成功', response);
        /* if (response.needMerge) {
           api.mergeUpload({
             tempName: response.tempName,
             fileName: file.name
           }).then(res => {
             let $fileStatus = $(`.file-${file.id} .file-status`);
             console.log(res);
             if (res.status === 0) {
               $fileStatus.html('上传成功，转码中');
             } else if (res.status === 1) {
               $fileStatus.html('上传失败');
             } else if (res.status === 2) {
               $fileStatus.html('上传成功');
             }
           });
         }*/
      },
      uploadError (file, response) {
        // console.log(arguments)
      },
      error(mes) {
        // console.log(arguments)
      },
      complete (file, response) {
        // console.log(arguments)
      },
      resume(file) {
        this.uploader.upload(file);
      },
      stop(file) {
        this.uploader.stop(file);
      },
      remove(file) {
        // 取消并中断文件上传
        this.uploader.cancelFile(file);
        // 在队列中移除文件
        this.uploader.removeFile(file, true);
        // 在ui上移除
        let index = this.fileList.findIndex(ele => ele.id === file.id);
        this.fileList.splice(index, 1);
      },
      fileSize(size) {
        return WebUploader.Base.formatSize(size);
      },
      fileCategory(ext) {
        let type = '';
        const typeMap = {
          'fa-picture-o': ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
          'fa-video-camera': ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'],
          'fa-file-text-o': ['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx','vue','json','html'],
          'fa-th-large': ['rar','zip']
        };
        Object.keys(typeMap).forEach((_type) => {
          const extensions = typeMap[_type];
          if (extensions.indexOf(ext) > -1) {
            type = _type
          }
        });
        console.log(type)
        return type
      }
    },
    components: {
      vueupLoader
    }
  }
</script>

<style>
  .uploader{
    width:100%;
  }
  .uploader .file-panel{
  }
  .file-panel .showFileMes{
    border: 2px dashed #ccc;
  }
  .webuploader-pick{
    color: dodgerblue !important;
    background: #fff !important;
  }
  .file-panel .showFileMes:hover{
    border: 2px dashed dodgerblue;
  }
  .file-list{
    width:100%;
    position: relative;
  }
  .file-list .file-item{
    width:100%;
  //background: #aaa;
    margin-bottom: 10px;
  }
  .file-list .file-item li{
    display: inline-block;
  }
  .file-list .file-item .file-type{
    width:5%;
  }
  .file-list .file-item .file-name{
    width:50%;
  }
  .file-list .file-item .file-size{
    width:30%;
  }
  .file-list .file-item .uploaderStatue{
    width:100%;
    padding-left:10px;
    line-height: 30px;
  }
  .file-list .file-item .uploaderStatue li {
    display: inline-block;
  }
  .file-list .file-item .uploaderStatue .progress{
    width:90%;
    height:4px;
    background: #eee;
  }
  .uploaderStatue .progress p{
    width:30%;
    height:100%;
    background: dodgerblue;
    border-radius: 2px
  }
 .uploaderStatue .file-operate a i{
    font-size: 14px;
   color: #ccc;
   font-weight: normal;
  }
  .uploaderStatue .file-operate a:hover i{
    color: dodgerblue;
  }
  .showFileMes{
    text-align: center;
  }
  .no-file {

  }
  .filePickerIcon{

  }
</style>
