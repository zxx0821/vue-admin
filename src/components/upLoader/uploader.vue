<template>
  <div class="upload"></div>
</template>

<script>
  import WebUploader from 'webuploader'
  export default {
    name: 'vueupLoader',
    props: {
      /*上传按钮ID*/
      uploadButton: {
        type: String,
        default: ''
      },
      /*上传地址*/
      url: {
        type: String,
        default: ''
      },
      /*上传最大数量 默认为100*/
      fileNumLimit: {
        type: Number,
        default: 100
      },
      /*/ 大小限制 默认2M */
      fileSingleSizeLimit: {
        type: Number,
        default: 6e+10
      },
      //上传token等参数
      formData: {
        type: Object,
        default: null
      },
      imageUrl: {
        type: String,
        default: ''
      },
      accept: {
        type: Object,
        default: null
      },
      multiple: {
        type: Boolean,
        default: true
      },
      keyGenerator: {
        type: Function,
        default: function (file) {
          const currentTime = new Date().getTime();
          const key = currentTime + "." + file.name;
          return key;
        }
      }
    },
    data () {
      return {
        uploader: null
      }
    },
    mounted () {
      this.initWebUpload()
    },
    methods: {
      initWebUpload() {
        let _this = this
        _this.uploader =  new WebUploader.Uploader({
          auto: true, // 选完文件后，是否自动上传
          // swf: swgimg, // swf文件路径
          server: _this.url,  // 文件接收服务端
          pick: {
            id: _this.uploadButton,   // 选择文件的按钮
            multiple: _this.multiple,  // 是否多文件上传 默认true
            label: ''
          },
          // 允许选择文件格式。
          accept: _this.getAccept(_this.accept),  // 允许选择文件格式。
          thread: 5,
          fileNumLimit: _this.fileNumLimit, //限制上传个数
          fileSingleSizeLimit: _this.fileSingleSizeLimit, //限制单个上传图片的大小
          formData: _this.formData,  //上传所需参数
          chunked: true,   //分片上传
          chunkSize: 102400000, //分片大小
          duplicate: true, // 重复上传
        });
        // 当有文件被添加进队列的时候，添加到页面预览
        _this.uploader.on('fileQueued', (file) => {
          _this.$emit('fileChange', file);
        });
        _this.uploader.on('uploadStart', (file) => {
          // 在这里可以准备好formData的数据
          //_this.uploader.options.formData.key = _this.keyGenerator(file);
        });
        // 文件上传过程中创建进度条实时显示。
        _this.uploader.on('uploadProgress', (file, percentage) => {
          _this.$emit('uploadProgress', file, percentage);
        });
        // 文件上传成功
        _this.uploader.on('uploadSuccess', (file, response) => {
          _this.$emit('uploadSuccess', file, response);
        });
        /*文件上传失败*/
        _this.uploader.on('uploadError', (file, reason) => {
          // console.log(reason);
          _this.$emit('uploadError', file, reason);
        });
        _this.uploader.on( 'error', function( type ) {
          let errorMessage = '';
          if (type === "F_EXCEED_SIZE") {
            errorMessage = "文件大小不能超过" + _this.fileSingleSizeLimit/(1024*1000) + "M";
          } else if (type === "Q_EXCEED_NUM_LIMIT") {
            errorMessage = '文件上传已达到最大上限数';
          } else {
            errorMessage = "上传出错！请检查后重新上传！错误代码" + type;
          }
          _this.$emit('error', errorMessage);
        });
        /*上传完成*/
        _this.uploader.on( 'uploadComplete', function( file, response ) {
          _this.$emit('uploadComplete', file, response);
        });
      },
      upload(file) {
        this.uploader.upload(file);
      },
      stop(file) {
        this.uploader.stop(file);
      },
      // 取消并中断文件上传
      cancelFile(file) {
        this.uploader.cancelFile(file);
      },
      // 在队列中移除文件
      removeFile(file, bool) {
        this.uploader.removeFile(file, bool);
      },
      getAccept(accept) {
        switch (accept) {
          case 'text':
            return {
              title: 'Texts',
              exteensions: 'doc,docx,xls,xlsx,ppt,pptx,pdf,txt',
              mimeTypes: '.doc,docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt'
            };
            break;
          case 'video':
            return {
              title: 'Videos',
              exteensions: 'mp4',
              mimeTypes: '.mp4'
            };
            break;
          case 'image':
            return {
              title: 'Images',
              exteensions: 'gif,jpg,jpeg,bmp,png',
              mimeTypes: '.gif,.jpg,.jpeg,.bmp,.png'
            };
            break;
          default: return accept
        }
      },


    }
  }
</script>

<style>
  .webuploader-container {
    position: relative;
  }
  .webuploader-element-invisible {
    position: absolute !important;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px,1px,1px,1px);
  }
  .webuploader-pick {
    position: relative;
    display: inline-block;
    cursor: pointer;
    background: #3399ff;
    padding: 10px 15px;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
  }
  .webuploader-pick-hover {
    background:  #3399ff;
  }
  .webuploader-pick-disable {
    opacity: 0.6;
    pointer-events:none;
  }

</style>
