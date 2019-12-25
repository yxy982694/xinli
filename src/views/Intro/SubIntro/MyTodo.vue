<template>
  <div class="content-radius">
    <div class="todo-header">
      <div class="todo-userimg"></div>
      <div class="todo-usertext">
        <p class="toto-username">您好，{{userName}}</p>
        <p class="todo-userdep">所属部门：资管室</p>
      </div>
    </div>
    <div class="todo-items">
      <div v-for="item in dbList" :key="item.id" class="need-item">
          <p class="todo-item-p">
            <i class="iconfont todo-itemicon" :class="item.url"></i>
            <span class="todo-itemname">{{item.name}}</span>
          </p>
          <span class="todo-itemvalue">{{item.value}}</span>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'myTodo',
        data() {
            return {
                dialogTableVisible: false,
                userName: '',
                dbList: [
                    { id: 1, name: "运维待办", value: 12, url: 'icon-daibanshixiang' },
                    { id: 2, name: "值班作业", value: 8, url: 'icon-zhibanxinxi-copy' },
                    { id: 3, name: "需求待办", value: 60, url: 'icon-fabuxuqiu'}
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
            this.userName = sessionStorage.getItem("user")
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
   .content-radius
     height: 300px
     display: flex
     flex-direction: column
   .todo-header
     height: 106px
     width: 100%
     background-color: #4c83ef
     // background: url("../../../common/image/contentImg.png") no-repeat
     // background-size: 100% 100%
     display: flex
     justify-content: center
     align-items: center
     .todo-userimg
        height: 60px
        width: 60px
        border: 2px solid #fff
        border-radius: 50%
        background: url("../../../common/image/contentImg.png") no-repeat
        background-size: 100% 100%
     .todo-usertext
        margin-left: 15px
        text-align: left
        color: #fff
        .todo-userdep
          margin-top: 10px
          font-size: $font-size-medium
        .toto-username
          font-size: $font-size-medium-x
          font-weight: bold
          max-width: 100px
          no-wrap()
   .todo-items
     flex: 1
     padding: 0 40px 0 30px
     font-size: $font-size-medium
   .el-divider--horizontal
     margin: 6px 0 !important
   .need-item
     display: flex
     align-items: center
     justify-content: space-between
     align-items: center
     margin-top: 25px
     &:first-child .todo-itemicon
      font-size: 30px
     .todo-itemvalue
       font-weight: bold
       color: $color-textblue
     .todo-itemicon
       margin-right: 10px
       color: $color-textblue
       font-size: 25px
     .todo-item-p
       display: flex
       align-items: center
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
