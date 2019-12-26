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
        <span>查看全部</span>
      </p>
    </div>
    <div class="message-items">
      <div class="message-item font-smallnum" v-for="item in messageData" :key="item.ID">
        <p class="text-left">
          <span class="text-name">{{item.NAME}}</span>
          <span class="text-content"><i class="message-quot">“</i><i class="text-content-title">{{item.TITLE}}</i><i class="message-quot">”</i></span>
        </p>
        <p class="text-right">{{item.MESSAGETIME}}</p>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        data() {
            return {
                messageData: [ // 留言板数据
                    {
                        content: "张三-故障管理工单处理有问题，请处理",
                        time: "2019-10-20"
                    },
                    {
                        content: "张三-故障管理工单处理有问题，请处理",
                        time: "2019-10-20"
                    },
                    {
                        content: "张三-故障管理工单处理有问题，请处理",
                        time: "2019-10-20"
                    },
                    {
                        content: "张三-故障管理工单处理有问题，请处理",
                        time: "2019-10-20"
                    }]
            }
        },
        created() {
            this.$api.home.getMessageData().then((res) => {
                const result = res;
                // const result = eval('(' + res + ')');
                this.messageData = result.data
            })
        },
        methods: {
          clickNew () {
            this.$emit('newwindow')
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
          font-size: $font-size-medium
          color: $color-textblue
        .message-quot
          color: #bed0f6
          font-size: 20px
          font-style: normal
        .text-content-title
          margin: 0 3px
          font-style: normal
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
