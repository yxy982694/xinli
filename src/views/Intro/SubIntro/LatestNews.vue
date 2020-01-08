<template>
   <div class="content-radius">
     <div class="section-title">
       <p class="section-title-name">最新公告</p>
       <p class="section-title-click cursor-pointer">全部 >></p>
     </div>
     <el-carousel style="width: 100%" height="194px" direction="vertical"  :interval="20000" >
       <el-carousel-item v-for="(item,indexx) in announceData" :key="indexx">
         <div v-for="(list,index) in item.data" class="lastest-item" :key="index">
           <p class="text-left">
             <i class="iconfont icon-jiantoucu"></i>
             <span>{{list.CHESETYPE}}</span>
           </p>
           <p class="text-center" :title="list.TITLE">{{list.TITLE}}</p>
           <p class="text-right">{{list.RELEASEDATE}}</p>
         </div>
       </el-carousel-item>
     </el-carousel>
   </div>
</template>
<script>
  export default {
      props: {

      },
      data() {
        return {
            showHead: false,
            announceData: [],
            count: 0
        }
      },
      methods: {
          //数据初始化
          initLatestNews: function () {
              let params = {}
              params.organId = '1292'
              this.$api.home.getLatestNews(params).then((res) => {//参数部门id
                  // const result = eval('(' + res + ')');
                  const result = res ;
                  // console.log(result.data)
                  let size = result.data.length;
                  let page = size/5;  //展示页数3
                  if(size%5 != 0){ // 如果不为4的整数倍,则再多一页
                      // page++;
                  }
                  for(let index = 0; index < page; index++){
                      let announceObj = {};
                      announceObj.id = index+1;
                      announceObj.data = result.data.slice(index*5, (index+1)*5);
                      this.announceData.push(announceObj);
                  }


                  // this.announceData = result.data
              })
          }
      },
      created() { // 钩子函数
          this.initLatestNews();
      },
      computed: {

      }

  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .content-radius
    height: 240px
  .lastest-item
    display: flex
    justify-content: space-between
    padding: 0 25px 0 20px
    font-size: $font-size-small
    margin-top: 6px
    &+.lastest-item
      margin-top: 24px
  .text-left
    color: #F3BF44
    display: flex
    align-items: center
    .icon-jiantoucu
      margin-right: 5px
      font-size: 13px
      color: $color-border
  .text-center
    flex: 1
    text-align:left
    margin-left: 15px
    color: $color-textblack
    no-wrap()
  .text-right
    width:90px
    color: $color-textgray
</style>
