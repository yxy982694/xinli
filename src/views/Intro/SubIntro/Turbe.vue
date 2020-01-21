<template>
  <div class="content-radius">
    <div class="section-title">
      <p class="section-title-name">快速通道</p>
    </div>
    <div class="fast-container">
      <div class="fast-item" v-for="item in channelList" :key="item.id" :title="item.name">
        <p class="fast-item-icon"><i class="iconfont" :class="item.url"></i></p>
        <p class="fast-item-text">
          <span class="fast-text-new">新增</span>
          <span class="fast-text-name">{{ item.name }}</span>
        </p>
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
              name: '生产任务工单',
              url: 'icon-chuangjiangongdan'
              // url: require('../../../common/image/sms/gzgd.png')
          },{
              id: '2',
              name: '故障工单',
              url: 'icon-chuangjiangongdan'
              // url: require('../../../common/image/sms/fgzgd.png')
          },{
              id: '3',
              name: '生产任务工单',
              url: 'icon-chuangjiangongdan'
              // url: require('../../../common/image/sms/xqgd.png')
          },{
              id: '4',
              name: '故障工单',
              url: 'icon-chuangjiangongdan'
              // url: require('../../../common/image/sms/gzgd.png')
          },{
              id: '5',
              name: '生产任务工单',
              url: 'icon-chuangjiangongdan'
              // url: require('../../../common/image/sms/jfgl.png')
          },{
              id: '6',
              name: '故障工单',
              url: 'icon-chuangjiangongdan'
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
      justify-content: space-between
      margin: 0 18px
      .fast-item
        width: 46%
        height: 110px
        margin-top: 12px
        text-align: left
        border-radius: 2px
        transition: all 0.38s ease-out
        cursor: pointer
        &:hover
          background-color: rgb(42,148,226)
          color: #fff
        &:nth-child(1)
          margin-top: 0
          background-color: #deefff
          .iconfont
            color: #93b5f2
        &:nth-child(2)
          margin-top: 0
          background-color: #e9f7f7
          .iconfont
            color: #68b8e7
        &:nth-child(3)
          background-color: #f8efea
          .iconfont
            color: #f6a87c
        &:nth-child(4)
          background-color: #e9ebf7
          .iconfont
            color: #94a2f6
        &:nth-child(5)
          background-color: #f4e9f7
          .iconfont
            color: #e6a1f8
        &:nth-child(6)
          background-color: #f7f5e9
          .iconfont
            color: #dbc857
        .fast-item-icon
          padding-left: 15px
          padding-top: 15px
          // margin-left: 15px
          // margin-top: 15px
          // width: 32px
          // height: 30px
          // background: url('../../../common/image/newWork_bg.png') no-repeat
          // background-size: 100% 100%
          .iconfont
            font-size: 30px
        .fast-item-text
          padding-right: 15px
          text-align: right
          .fast-text-new
            font-size: $font-size-medium-s
            margin-bottom: 17px
            color: $color-textblack
            display: block
            no-wrap()
          .fast-text-name
            font-size: $font-size-small
            color: #70777e
            display: block
            no-wrap()
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
</style>
