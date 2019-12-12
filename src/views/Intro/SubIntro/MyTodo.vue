<template>
  <div class="content-radius">
    <div class="section-title">
      <p>| 我的待办</p>
    </div>
    <div  v-for="item in dbList" :key="item.id" class="need-item font-smallnum">
      <p class="need-left">
        <i class="el-icon-caret-right"></i>
        <span>{{item.name}}</span>
      </p>
      <p class="serial-number">.............................................</p>
      <p class="label-btn">{{ item.value }}</p>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'myTodo',
        data() {
            return {
                dialogTableVisible: false,
                dbList: [
                    { id: 1, name: "运维待办", value: 12 },
                    { id: 2, name: "值班作业", value: 8 },
                    { id: 3, name: "需求待办", value: 60}
                ]
            }
        },
        methods: {

        },
        created() {
            this.$api.home.getDbList().then((res) => {
                const result = res;
                // const result = eval('(' + res + ')');
                this.messageData = result.data
            })
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
   .content-radius
     height: 151px
   .el-divider--horizontal
     margin: 6px 0 !important
   .need-item
     display: flex
     align-items: center
     justify-content: space-between
     font-size: $font-size-small
     &+.need-item
       margin-top: 12px
     .serial-number
       flex: 1
       overflow: hidden
       margin: 0 10px
   .el-icon-caret-right
     color: #1296db
     padding-right: 6px
   .label-btn
     btn-blue()
   .need-left
     display: flex
     align-items: center
</style>
