<template>
    <!-- 专家值班 -->
    <div class="content-radius">
      <div class="section-title">
        <p>| 专家值班</p>
        <p class="section-title-click">
          <i class="el-icon-edit-outline"></i>
          <span class="cursor-pointer">全部</span>
        </p>
      </div>
      <div class="duty-container">
        <div class="duty-item font-smallnum" v-for="item in dutyData" :key="item.ID">
          <p class="text-left">
            <i class="el-icon-s-custom"></i>
            <span>{{ dutyMap[parseInt(item.SPECIALTY)-1] }}</span>
          </p>
          <p class="text-center">{{item.NAME}}</p>
          <p class="text-right">{{item.MOBILE}}</p>
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
              const result = res;
              this.dutyData = result.data
          })
      }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
    .duty-item
      display: flex
      justify-content: space-between
      align-items: center
      padding-right: 10px
      .text-left
        width: 70px
        text-align: left
      .text-center
        flex: 1
        text-align: center
      .text-right
        width: 70px
        text-align: right
      &+.duty-item
        margin-top: 15px
</style>
