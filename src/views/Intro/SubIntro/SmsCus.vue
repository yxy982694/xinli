<template>
    <!-- 短信定制 -->
    <div class="content-radius">
      <div class="section-title">
        <p class="section-title-name">短信定制</p>
      </div>
      <div class="sms-container">
          <div class="sms-item" v-for="item in faultSheet" :key="item.key" :title="item.name">
            <i class="iconfont" :class="item.url"></i>
            <p class="sms-text">{{ item.name }}</p>
          </div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
          showHead: false,
          faultSheet:[{
                id: '1',
                name: '故障工单',
                url: 'icon-zhidongxiguzhang'
                // url: require('../../../common/image/sms/gzgd.png')
              },{
                id: '2',
                name: '非故障工单',
                url: 'icon-tianxiegongdan-kuozhan-hebing'
                // url: require('../../../common/image/sms/fgzgd.png')
              },{
                id: '3',
                name: '需求工单',
                url: 'icon-fabuxuqiu'
                // url: require('../../../common/image/sms/xqgd.png')
              },{
                id: '4',
                name: '公共服务',
                url: 'icon-yingyongfuwu'
                // url: require('../../../common/image/sms/gzgd.png')
              },{
                id: '5',
                name: '机房管理',
                url: 'icon-bangongqujifangshebeijinrushenqingliucheng'
                // url: require('../../../common/image/sms/jfgl.png')
              },{
                id: '6',
                name: '值班管理',
                url: 'icon-zhibanchaxun'
                // url: require('../../../common/image/sms/zbgl.png')
              }],
          fit: 'fill'

      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
    .content-radius
      height: 390px
      display: flex
      flex-direction: column
    .sms-container
      display: flex
      flex: 1
      flex-wrap: wrap
      margin: 5px 20px 25px 20px
      .sms-item
        height: 105px
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        box-sizing: border-box
        width: 50%
        font-size: $font-size-medium
        &:nth-child(1)
          border-right: 1px solid $color-border
          border-bottom: 1px solid $color-border
        &:nth-child(2)
          border-bottom: 1px solid $color-border
        &:nth-child(3)
          border-right: 1px solid $color-border
          border-bottom: 1px solid $color-border
        &:nth-child(4)
          border-bottom: 1px solid $color-border
        &:nth-child(5)
          border-right: 1px solid $color-border
    .sms-text
      display: block
      margin-top: 10px
      no-wrap()
    .iconfont
      font-size: 35px
      display: inline-block
      color: $color-textblue
</style>
