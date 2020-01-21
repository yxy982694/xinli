<template>
  <div class="content-radius">
    <div class="todo-header">
      <div class="todo-userimg">
        <img ref="userImg" class="userimg-img" src="../../../common/image/imgioServlet.png">
        <input class="userimg-input" ref="menuInput" type="file" @change="selectMenuImg" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
      </div>
      <div class="todo-usertext">
        <p class="toto-username" :title="'您好,'+userName">您好，{{userName}}</p>
        <p class="todo-userdep" @mouseenter="enterDep">
          <span>切换部门&nbsp;>&nbsp;</span>
          <span>{{toggleText}}</span>
          <span class="toggle-dep" v-show="toggleDep" @mouseleave="leaveDep(toggleText)">
            <i @click="leaveDep('资管室')">资管室</i>
            <i @click="leaveDep('信息管理')">信息管理</i>
            <i @click="leaveDep('移动')">移动</i>
          </span>
        </p>
      </div>
    </div>
    <div class="todo-items">
      <div v-for="(item,index) in dbList" :key="item.id" class="need-item">
          <p class="todo-item-p">
            <!-- <i class="iconfont todo-itemicon" :class="item.url"></i> -->
            <span :class="'todo-bg'+index"></span>
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
                toggleDep: false,
                dialogTableVisible: false,
                userName: '',
                imgUrl: '',
                toggleText: '资管室',
                dbList: [
                    { id: 1, name: "运维待办", value: 12, url: 'icon-daibanshixiang' },
                    { id: 2, name: "值班作业", value: 8, url: 'icon-zhibanxinxi-copy' },
                    { id: 3, name: "需求待办", value: 60, url: 'icon-fabuxuqiu'}
                ]
            }
        },
        methods: {
          selectMenuImg: function () {
            let file = this.$refs.menuInput.files[0]
            this.$refs.userImg.src = window.URL.createObjectURL(file)
            let formData = new FormData()
            formData.append('fileImg', file)
            // this.imgUrl = "../../../common/image/ChinaMobile.png"
            // this.$refs.userImg.src = "../../../common/image/ChinaMobile.png"
          },
          enterDep: function () {
            this.toggleDep = true
          },
          leaveDep: function (val) {
            this.toggleText = val
            this.toggleDep = false
          }
        },
        created() {
            this.$api.home.getDbList().then((res) => {
                const result = res;
                // const result = eval('(' + res + ')');
                this.messageData = result.data
            })
            this.userName = sessionStorage.getItem("user")
        },
        mounted: function () {
          var _this = this
           // this.selectMenuImg()
          document.body.onclick = function () {
            _this.leaveDep(_this.toggleText)
          }
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
     display: flex
     justify-content: center
     align-items: center
     .todo-userimg
        height: 60px
        width: 60px
        border: 2px solid #fff
        border-radius: 50%
        position: relative
        .userimg-input
          position: absolute
          left: 0
          top: 0
          height: 100%
          width: 100%
          border-radius: 50%
          cursor: pointer
          opacity: 0
        .userimg-img
          position: absolute
          left: 0
          top: 0
          height: 100%
          width: 100%
          border-radius: 50%
     .todo-usertext
        margin-left: 15px
        text-align: left
        color: #fff
        .todo-userdep
          margin-top: 10px
          font-size: $font-size-medium
          position: relative
          cursor: pointer
          .toggle-dep
            position: absolute
            top: 20px
            right: 0
            display: flex
            flex-direction: column
            background-color: #1d3770
            color: #fff
            padding: 5px
            i
              font-style: normal
              display: inline-block
              line-height: 20px
        .toto-username
          font-size: $font-size-medium
          font-weight: bold
          max-width: 165px
          line-height: 20px
          no-wrap()
   .todo-items
     flex: 1
     padding: 0 40px 0 30px
     font-size: $font-size-medium-s
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
       font-size: $font-size-medium-s
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
   .todo-bg0
     display: inline-block
     background: url('../../../common/image/operationAgency_bg.png') no-repeat
     background-size: 100% 100%
     width: 26px
     height: 26px
     margin-right: 10px
   .todo-bg1
     display: inline-block
     background: url('../../../common/image/demandAgency_bg.png') no-repeat
     background-size: 100% 100%
     width: 26px
     height: 26px
     margin-right: 10px
   .todo-bg2
     display: inline-block
     background: url('../../../common/image/dayWork_bg.png') no-repeat
     background-size: 100% 100%
     width: 27px
     height: 26px
     margin-right: 10px
</style>
