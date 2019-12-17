<template>
  <div class="content-radius">
    <div class="section-title">
      <p>| 待办列表</p>
    </div>
    <table class="font-smallnum">
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
                <td :style="cellStyle(item.sheetStatus)">{{item.sheetStatus}}</td>
            </tr>
        </tbody>
    </table>
    <div style="float: right; margin-top: 5px">
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
                totalPages: 0
            }
        },
        methods: {
            cellStyle(val) {
                if(val === '成功'){
                    return 'color: green'
                }else if(val === '失败'){
                    return 'color: red'
                } else {
                    return '';
                }
            }
        },
        created() {  //  在 created 中，data 和 methods 都已经被初始化好了！如果要调用 methods 中的方法，或者操作 data 中的数据，最早，只能在 created 中操作return axios({
            this.$api.home.getUpComList().then((res) => {
                // const result = eval('('+res+')')
                let result = res
                this.tableData = result.data.content
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
   table,tr
     width: 100%
   th,td
     text-align: center
     height: 30px
     line-height: 30px
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
</style>
