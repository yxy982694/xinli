<template>
  <div class="content-radius">
    <div class="section-title">
      <p class="section-title-name">待办列表</p>
    </div>
    <div class="upcom-table">
      <table>
          <thead>
              <tr>
                  <th>工单流水号</th>
                  <th>工单类型</th>
                  <th>工单主题</th>
                  <th>工单状态</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(item,index) in tableData" :key="index">
                  <td>{{item.sheetId}}</td>
                  <td>{{item.sheetType}}</td>
                  <td>{{item.sheetTheme}}</td>
                  <td>{{item.sheetStatus}}</td>
                  <!-- <td class="upcom-td">
                    <p class="upcom-tab" :style="cellColor(item.sheetStatus)">{{cellStyle(item.sheetStatus)}}</p>
                  </td> -->
              </tr>
          </tbody>
      </table>
    </div>
    <div class="upcom-page">
      <pagination :pageNum="pageNum" :pageSize="pageSize" :totalSize="totalSize" :totalPages="totalPages"></pagination>
    </div>
  </div>
</template>

<script>
    import pagination from '../../Core/Pagination'
    export default {
        components: {
            pagination
        },
        data() {
            return {
                flag: true,
                tableData: [],
                pageNum: 0,
                pageSize: 0,
                totalSize: 0,
                totalPages: 0,
                upcomTab: ''
            }
        },
        methods: {
            cellStyle(val) {
                if(val === '成功'){
                    return 'v'
                }else if(val === '失败'){
                    return 'x'
                } else {
                    return '';
                }
            },
            cellColor(val) {
                if(val === '成功'){
                    return 'color: #2eb992;border: 1px solid #2eb992;'
                }else if(val === '失败'){
                    return 'color: #e63a62;border: 1px solid #e63a62;'
                } else {
                  return ''
                }
            },
        },
        created() {  //  在 created 中，data 和 methods 都已经被初始化好了！如果要调用 methods 中的方法，或者操作 data 中的数据，最早，只能在 created 中操作return axios({
            this.$api.home.getUpComList().then((res) => {
                const result = eval('('+res+')')
                // let result = res
                // console.log(result)
                // this.tableData = result.data.content
                for (let i=0;i<5;i++) {
                  this.tableData.push(result.data.content[i])
                }
                this.pageNum = Number.parseInt(result.data.pageNum)
                this.pageSize = Number.parseInt(result.data.pageSize)
                this.totalSize = Number.parseInt(result.data.totalSize)
                this.totalPages = Number.parseInt(result.data.totalPages)
            })
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
   .content-radius
     height: 350px
     overflow: hidden
   .upcom-table
     margin: 0 18px
     box-sizing: border-box
     font-size: $font-size-small
   table,tr
     width: 100%
   thead
     background-color: #fafafa
   tr
     border-bottom: 1px solid $color-border
   th,td
     text-align: center
     height: 39px
     line-height: 39px
     no-wrap()
   th
     font-weight: bold
   th:nth-child(1)
     width: 25%
   th:nth-child(2)
     width: 20%
   th:nth-child(3)
     width: 40%
   th:nth-child(4)
     width: 15%
   .upcom-page
     float: right
     margin: 12px 18px 0 0
   .upcom-td
    display: flex
    justify-content: center
    align-items: center
   .upcom-tab
     width: 14px
     height: 14px
     border-radius: 50%
     font-size: $font-size-small
     display: flex
     justify-content: center
     align-items: center
</style>
