<template>
    <!-- 短信定制 -->
    <div class="content-radius">
      <div class="section-title">
        <p>| 短信定制</p>
      </div>
      <div class="fast-container">
          <div class="fast-item font-smallnum" v-for="item in faultSheet" :key="item.key" :title="item.name">
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
          showHead: false,
          faultSheet:[{
                id: '1',
                name: '故障工单',
                url: 'icon-guzhang'
                // url: require('../../../common/image/sms/gzgd.png')
              },{
                id: '2',
                name: '非故障工单',
                url: 'icon-shengchanrenwu'
                // url: require('../../../common/image/sms/fgzgd.png')
              },{
                id: '3',
                name: '需求工单',
                url: 'icon-xuqiu'
                // url: require('../../../common/image/sms/xqgd.png')
              },{
                id: '4',
                name: '公共服务',
                url: 'icon-gonggongfuwu'
                // url: require('../../../common/image/sms/gzgd.png')
              },{
                id: '5',
                name: '机房管理',
                url: 'icon-idcjifangguanli'
                // url: require('../../../common/image/sms/jfgl.png')
              },{
                id: '6',
                name: '值班管理',
                url: 'icon-zhibanguanli'
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
    .fast-container
      display: flex
      flex-wrap: wrap
    .fast-img
      width: 32px
    .fast-text
      display: block
      text-align: center
      margin-top: 5px
      no-wrap()
    .iconfont
      font-size: 30px
      display: inline-block
      margin-bottom: 5px
</style>
