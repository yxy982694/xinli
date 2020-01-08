<!-- 需要外面传入的字段，可以根据需要，传入对应的字段，当不传入时，会使用默认值
1.传入需要渲染的数据，data
2.传入需要渲染的列，columns
3.是否显示编辑和删除按钮，showOperate
4.在显示树形结构时，根据的字段，rowKey
5.在显示树形结构时，字节点的对象，treeProps
6.在树形结构时，首次加载时，是否展开所有行，defaultExpandAll
7.是否显示复选框，showCheckBox
8.是否显示分页，showPage
9.表格是否显示边框，border
10.表格当前行是否显示高亮，highlightCurrentRow
11.是否显示斑马线，stripe
12.表格的最大高度，maxHeight
13.表格中字体型号，size
14.表格中文本对齐方式，align
 -->
<template>
  <div class="table-container">
    <!--表格栏-->
    <el-table
          :data="dataArr"
          :highlight-current-row="highlightCurrentRow"
          :element-loading-text="$t('action.loading')"
          :border="border"
          :stripe="stripe"
          :show-overflow-tooltip="showOverflowTooltip"
          :size="size" :align="align" style="width:100%;"
          height="100%"
          :tree-props="treeProps"
          :default-expand-all="defaultExpandAll"
          :row-key="rowKey"
          v-loading="loading"
          @row-contextmenu="shortCutMenu"
          @cell-click="clickCell"
          @selection-change="selectionChange"
          @select-all="selectAll"
          ref="elTable"
          > <!-- :tree-props="treeProps"  :default-expand-all="defaultExpandAll" :row-key="rowKey" -->
      <el-table-column type="selection" width="40" v-if="showCheckBox"></el-table-column><!-- :max-height="maxHeight" -->
      <el-table-column v-for="column in columns" header-align="center" :align="column.align?column.align:'center'"
        :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth"
        :fixed="column.fixed" :key="column.prop" :type="column.type" :formatter="column.formatter"
        :sortable="column.sortable==null?true:column.sortable">
      </el-table-column>
      <el-table-column
        :label="$t('action.operation')"
        width="185"
        fixed="right"
        v-if="showOperate"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <kt-button icon="fa fa-edit" :label="$t('action.edit')" :perms="permsEdit" :size="size" @click="handleEdit(scope.$index, scope.row)" />
          <kt-button icon="fa fa-trash" :label="$t('action.delete')" :perms="permsDelete" :size="size" type="danger" @click="handleDelete(scope.$index, scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页栏-->
    <div class="toolbar" v-if="showPage">
      <kt-button :label="$t('action.batchDelete')" :perms="permsDelete" :size="size" type="danger" @click="handleBatchDelete()"
        :disabled="this.selections.length===0" style="float:left;" v-if="showCheckBoxDele"/>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      <!-- <el-pagination layout="total, prev, pager, next, jumper"
      @current-change="refreshPageRequest"
        :current-page="pageRequest.pageNum"
        :page-size="pageRequest.pageSize"
        :total="data.totalSize"
        style="float:right;">
      </el-pagination> -->
    </div>
    <!-- <div class="shortcut-container" v-if="ifShortCut" v-show="showShortCut">
      <kt-button icon="fa fa-plus" :label="$t('action.add')" @click="addInfo" />
      <kt-button icon="fa fa-edit" :label="$t('action.edit')" @click="handleEdit" />
      <kt-button icon="fa fa-trash" :label="$t('action.delete')" @click="handleDelete" />
    </div> -->
  </div>
</template>

<script>
import KtButton from "@/components/KtButton/index"
import { mapMutations } from 'vuex'
export default {
  name: 'KtTable',
  components:{
			KtButton
	},
  props: {
    columns: Array, // 表格列配置
    dataArr: Array, // 表格分页数据
    permsEdit: String,  // 编辑权限标识
    permsDelete: String,  // 删除权限标识
    size: { // 尺寸样式
      type: String,
      default: 'mini'
    },
    align: {  // 文本对齐方式
      type: String,
      default: 'left'
    },
    maxHeight: {  // 表格最大高度
      type: Number,
      default: 420
    },
    border: {  // 是否显示边框
      type: Boolean,
      default: false
    },
    stripe: {  // 是否显示斑马线
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {  // // 是否高亮当前行
      type: Boolean,
      default: true
    },
    showOverflowTooltip: {  // 是否单行显示
      type: Boolean,
      default: true
    },
    showCheckBox: {
      type: Boolean,
      default: true
    },
    showPage: {
      type: Boolean,
      default: true
    },
    showOperate: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: ''
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    treeProps: {
      type: Object,
      // default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    showCheckBoxDele: {
      type: Boolean,
      default: false
    },
    currentPage: Number,
    pageSizes: Array,
    pageSize: Number,
    total:  Number
  },
  data() {
    return {
      // 分页信息
			pageRequest: {
				pageNum: 1,
        pageSize: 10
      },
      tempArr: [],
      // showShortCut: false,
      // loading: false,  // 加载标识
      selections: [],  // 列表选中列
      shortCutInfo: {}
    }
  },
  methods: {
    ...mapMutations({
      // 'setCurrentId': 'setCurrentId',
      // 'setResourceLeft': 'setResourceLeft',
      // 'setResourceTop': 'setResourceTop',
    }),
    shortCutMenu: function (row,column,e) {
      e.stopPropagation()
      e.preventDefault()
      this.shortCutInfo.id = row.id
      this.shortCutInfo.showShortCut = 'block'
      let scrollTop = document.documentElement.scrollTop
      let offsetTopElMain = document.querySelector('.table-container').scrollTop
      let x = e.clientX-180
      let y = e.clientY+scrollTop+offsetTopElMain-170
      this.shortCutInfo.x = x+'px'
      this.shortCutInfo.y = y+'px'
      this.$emit('changeShortCutInfo',this.shortCutInfo)
    },
    getCellRow: function () {
      let domsCell = document.querySelectorAll('.resource-container .cell')
      Array.prototype.forEach.call(domsCell,function (item) {
        if (item.innerHTML.trim() == '有效' || item.innerHTML.trim() == '是') {
          item.style.color = 'green'
        } else if (item.innerHTML.trim() == '失效' || item.innerHTML.trim() == '否') {
          item.style.color = 'red'
        }
      })
    },

    // cellClass: function ({row, column, rowIndex, columnIndex}) {
    //   if (columnIndex == 0) {
    //     return 'align-left'
    //   }
    //   if (columnIndex == 2) {
    //     return 'cursor-pointer'
    //   }
    // },
    // handleClass: function (row,id) {
    //   // this.tempArr.push(row)
    //   // console.log(this.tempArr)
    //     // return 'clrow'+row.row.id
    // },
    // 分页查询
    findPage: function () {
        // this.loading = true
        let callback = res => {
          this.loading = false
        }
      this.$emit('findPage', {pageRequest:this.pageRequest, callback:callback})
    },
    // 点击某个单元格时
    clickCell: function (row,column,cell,event) {
      this.$emit('clickCell', row,column,event)
    },
    // 点击某一行前面的复选框
    selectionChange: function (selection) {
      this.$emit('selectionChange', selection)
    },
    // 点击全选复选框
    selectAll: function (selection) {
      this.$emit('selectAll', selection)
    },
    clickRow: function (obj) {
      this.$refs.elTable.clearSelection()
      this.$refs.elTable.toggleRowSelection(obj)
    },
    handleSizeChange: function (pageSize) {
      this.$emit('handleSizeChange', pageSize)
    },
    handleCurrentChange: function (currentPage) {
      this.$emit('handleCurrentChange', currentPage)
    },
    // 换页刷新
		refreshPageRequest: function (pageNum) {
      this.pageRequest.pageNum = pageNum
      this.findPage()
    },
    addInfo: function () {
      this.$emit('addInfo',true)
    },
    // 编辑
		handleEdit: function (index, row) {
      this.$emit('handleEdit', row.id)
		},
    // 删除
		handleDelete: function (index, row) {
			if (row.parentId) {
			  this.delete(row.id)
			} else {
			  this.$alert('根节点不可删除')
			}

		},
		// 批量删除
		handleBatchDelete: function () {
			let ids = this.selections.map(item => item.id).toString()
			this.delete(ids)
		},
		// 删除操作
		delete: function (ids) {
      // alert('delete')
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {
				let params = []
				let idArray = (ids+'').split(',')
				for(var i=0; i<idArray.length; i++) {
					params.push({'id':idArray[i]})
			}
			if (idArray.length == 1) {
			  this.$emit('handleDelete', ids)
			} else if (idArray.length > 1){
			  this.$emit('handleDelete', {params:params})
			}
				}).catch(() => {
				})
		}
  },
  mounted() {
    console.log('table-mounted')
    // this.getCellRow()
    // document.querySelector('.el-con .table-container').style.height = document.querySelector('.el-con .el-tabs__content').style.height-40 + 'px'
      // var _this = this
      // document.querySelector('.table-container').style.height = document.body.clientHeight-210 + 'px'
      // window.addEventListener('resize',function () {
      //   document.querySelector('.table-container').style.height = document.body.clientHeight-210 + 'px'
      // })
    // console.log(this.columns)
    // this.$nextTick(function () {
      // console.log(this.data)
    // })
    // this.refreshPageRequest(1)
    // this.pageRequest.pageNum = 1
    // this.findPage()
    // this.$nextTick(function () {
    //   window.addEventListener('resize',function () {

    //   })
    // })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-table
    // margin-top: 5px
  .table-container
    display: flex
    flex-direction: column
    position: relative
    padding: 0 5px 0px 5px
    overflow: hidden
    // height: 40px
    margin-top: 5px
    height: 100%
  .toolbar
    padding-right: 20px
    background-color: #DFDFDF
    height: 25px
    padding: 1px 15px 1px 0
    display: flex
    justify-content: flex-end
  .el-pagination
    box-sizing: border-box
    padding: 0
</style>
