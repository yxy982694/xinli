<template>
  <!-- 留言板 -->
  <!--  发表评论-->
  <!--  1. 把文本框做双向数据绑定-->
  <!--  2. 为发表按钮绑定一个事件-->
  <!--  3. 校验评论内容是否为空，如果为空，则Toast提示用户 评论内容不能为空-->
  <!--  4. 通过 vue-resource 发送一个请求，把评论内容提交给 服务器-->
  <!--  5. 当发表评论OK后，重新刷新列表，以查看最新的评论-->
  <!--  + 如果调用 getComments 方法重新刷新评论列表的话，可能只能得到 最后一页的评论，前几页的评论获取不到-->
  <!--  + 换一种思路： 当评论成功后，在客户端，手动拼接出一个 最新的评论对象，然后 调用 数组的 unshift 方法， 把最新的评论，追加到  data 中 comments 的开头；这样，就能 完美实现刷新评论列表的需求；-->
  <div class="content-radius">
    <div class="section-title">
      <p class="section-title-name">留言板</p>
      <p class="section-title-click">
        <!-- <i class="iconfont icon-liuyan message-color"></i> -->
        <span class="message-bg"></span>
        <span class="message-color" @click="clickNew">新建留言</span>
        <span @click="selectAll">全部 >></span>
      </p>
    </div>
    <div class="message-items">
      <div class="message-item" v-for="item in messageData" :key="item.ID">
        <p class="text-left">
          <span class="text-name">{{item.NAME}}</span>
          <span class="text-content"><i class="message-quot">“</i><i class="text-content-title">{{item.TITLE}}</i><i class="message-quot">”</i></span>
        </p>
        <p class="text-right">{{item.MESSAGETIME}}</p>
      </div>
    </div>
    <el-dialog title="新建留言" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="110px" :rules="dataFormRules" ref="dataForm"
        label-position="right">
        <el-form-item label="用户名:" prop="name" v-if="false">
          <el-input v-model="dataForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题:" prop="title">
          <el-input v-model="dataForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="留言:" prop="content">
          <el-input type="textarea" v-model="dataForm.content" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期:" prop="messagetime"> <!-- v-if="false" -->
          <el-input v-model="dataForm.messagetime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="附件:" prop="messagetime">
          <input ref="fileInput" type="file" @change="selectFile">
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click.native="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click.native="submitForm" :loading="editLoading">发表</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
    export default {
        data() {
            return {
                editLoading: false,
                fileData: null,
                dialogVisible: false,
                dataForm: null,
                dataFormRules: { // 规定哪些字段为必填项
                  title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                  ],
                  content: [
                    { required: true, message: '请输入留言信息', trigger: 'blur' }
                  ]
                },
                messageData: [] // 留言板数据
            }
        },
        created() {
            this.$api.home.getMessageData().then((res) => {
                console.log(res);
                const result = res;
                // const result = eval('(' + res + ')');
                this.messageData = result.data
            })
            Date.prototype.format = function(fmt) { 
               var o = { 
                  "M+" : this.getMonth()+1,                 //月份 
                  "d+" : this.getDate(),                    //日 
                  "h+" : this.getHours(),                   //小时 
                  "m+" : this.getMinutes(),                 //分 
                  "s+" : this.getSeconds(),                 //秒 
                  "q+" : Math.floor((this.getMonth()+3)/3), //季度 
                  "S"  : this.getMilliseconds()             //毫秒 
              }; 
              if(/(y+)/.test(fmt)) {
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
              }
               for(var k in o) {
                  if(new RegExp("("+ k +")").test(fmt)){
                       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                   }
               }
              return fmt; 
          }
          this.dataForm = {
              name: sessionStorage.getItem('user'),
              title: '',
              content: '',
              messagetime: (new Date()).format('yyyy-MM-dd hh:mm:ss')
            }
        },
        methods: {
          clickNew () {
            this.dialogVisible = true
            // this.$emit('newwindow')
          },
          selectAll () {
            console.log('全部')
          },
          submitForm () {
            let _this = this
            this.$refs.dataForm.validate((valid) => {
              if (valid) {
                _this.$confirm('确认发布吗？', '提示', {}).then(() => {
                  _this.editLoading = true
                  let jsonObj = Object.assign({}, _this.dataForm)
                  let jsonStr = JSON.stringify(jsonObj)
                  _this.$api.home.addMessage(jsonStr).then((res) => {
                    if(res.code == 0) {
                      _this.dialogVisible = false
                      _this.editLoading = false
                      _this.$message({ message: '发布成功', type: 'success' })
                    }
                  })
                  _this.dataForm = {
                    name: sessionStorage.getItem('user'),
                    title: '',
                    content: '',
                    messagetime: (new Date()).format('yyyy-MM-dd hh:mm:ss')
                  }
                })
              }
            })
          },
          selectFile () {
            this.fileData = this.$refs.fileInput.files[0]
            // let formData = new FormData()
            // formData.append('fileImg', file)
            // formData.append('id', this.currentId)
          }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
    .content-radius
      height: 200px
    .message-items
      margin: 0 22px
    .message-item
      display: flex
      justify-content: space-between
      align-items: center
      padding-right: 5px
      &+.message-item
        margin-top: 18px
      .text-left
        width: 70%
        text-align: left
        padding-left: 15px
        no-wrap()
        .text-name
          display: inline-block
          width: 60px
          font-size: $font-size-medium-s
          color: $color-textblue
        .message-quot
          color: #bed0f6
          font-size: 20px
          font-style: normal
        .text-content-title
          margin: 0 3px
          font-style: normal
          font-size: $font-size-medium-s
      .text-right
        width: 30%
        text-align: right
        font-size: $font-size-small
        color: $color-textgray
    .message-color
      color: $color-textblue
      margin-right: 10px
    .message-bg
      display: inline-block
      background: url('../../../common/image/newMessage_bg.png') no-repeat
      background-size: 100% 100%
      width: 14px
      height: 14px
</style>
