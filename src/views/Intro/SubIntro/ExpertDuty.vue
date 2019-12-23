<template>
    <!-- 专家值班 -->
    <div class="content-radius">
      <div class="section-title">
        <p>专家值班</p>
        <p class="section-title-click cursor-pointer">查看全部</p>
      </div>
      <div class="duty-container">
        <div class="duty-item" v-for="item in dutyData" :key="item.ID">
          <div class="duty-userimg"></div>
          <div class="duty-usertext">
            <p class="duty-username">
              <span class="duty-name">{{item.NAME}}</span>
              <span class="duty-posit">{{ dutyMap[parseInt(item.SPECIALTY)-1] }}</span>
            </p>
            <p class="duty-tel">{{item.MOBILE}}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
      data() {
          return {
            showHead: false,
            dutyData: [],
            dutyMap: ['值班班长','值班助理','监控','','传输','交换','数据','网管']
          }
      },
      created() {
          this.$api.home.getExpertDutyList().then((res) => {
              console.log(res)
              const result = res
              for (let i=0;i<6;i++) {
                this.dutyData.push(res.data[i])
              }
          })
      }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
    .content-radius
      height: 505px
    .duty-item
      display: flex
      align-items: center
      padding-right: 10px
      margin: 0 30px
      &+.duty-item
        margin-top: 32px
    .duty-item:first-child
       margin-top: 20px
    .duty-userimg
      width: 40px
      height: 40px
      border-radius: 50%
      background: url("../../../common/image/contentImg.png") no-repeat
      background-size: 100% 100%
      margin-right: 10px
    .duty-name
      font-size: $font-size-medium
    .duty-posit
      font-size: $font-size-small
    .duty-tel
      font-size: $font-size-small
      text-align: left
      margin-top: 7px
</style>
