<template>
  <div class="content-radius">
    <div class="section-title">
      <p>快速通道</p>
    </div>
    <div class="fast-container">
      <div class="fast-item font-smallnum" v-for="item in channelList" :key="item.id" :title="item.name">
        <!-- <img :src="item.url" class="fast-img"> -->
        <i class="iconfont" :class="item.url"></i>
        <p class="fast-text">{{ item.name }}</p>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
          channelList: [{
              id: '1',
              name: '新增生产任务工单',
              url: 'icon-guzhang'
              // url: require('../../../common/image/sms/gzgd.png')
          },{
              id: '2',
              name: '新增故障工单',
              url: 'icon-shengchanrenwu'
              // url: require('../../../common/image/sms/fgzgd.png')
          },{
              id: '3',
              name: '新增生产任务工单',
              url: 'icon-xuqiu'
              // url: require('../../../common/image/sms/xqgd.png')
          },{
              id: '4',
              name: '新增故障工单',
              url: 'icon-gonggongfuwu'
              // url: require('../../../common/image/sms/gzgd.png')
          },{
              id: '5',
              name: '新增生产任务工单',
              url: 'icon-idcjifangguanli'
              // url: require('../../../common/image/sms/jfgl.png')
          },{
              id: '6',
              name: '新增故障工单',
              url: 'icon-zhibanguanli'
              // url: require('../../../common/image/sms/zbgl.png')
          }],
          fit: 'fit'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
    .content-radius
      height: 416px
    .fast-container
      display: flex
      flex-wrap: wrap
    .fast-img
      width: 40px
    .fast-text
      display: block
      text-align: center
      margin-top: 5px
      no-wrap()
    .card-panel-icon-wrapper
      display: block
      width: 35px
      height: 35px
      padding: 12px
      border-radius: 6px
      .svg-icon
        display: block
        margin: 14px auto
        float: none
    .icon-people
      color: #40c9c6
    .iconfont
      font-size: 30px
      display: inline-block
      margin-bottom: 5px
      // color: yellow
</style>
