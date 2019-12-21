<template>
	<div class="user-container" ref="userContainer">
		<div class="user-left" ref="userLeft">
			<div class="expand-container">
				<kt-button label="展开所有节点" @click="openAll" icon="fa fa-angle-double-down"></kt-button>
				<kt-button label="关闭所有节点" @click="closeAll" icon="fa fa-angle-double-up"></kt-button>
			</div>
			<div class="tree-container">
				<el-tree :data="treeData" node-key="id" ref="tree" @node-click="handleNodeClick"></el-tree>
			</div>
		</div>
		<div class="user-middle" ref="userMiddle"></div>
		<div class="user-right" ref="userRight">
			<div class="right-top">
				<!-- <div class="date-container">
					<p>创建时间:</p>
					<el-date-picker
			            v-model="dateValue"
			            type="datetimerange"
			            start-placeholder="开始日期"
			            end-placeholder="结束日期"
			            :default-time="['12:00:00','12:00:00']">
			        </el-date-picker>
				    <kt-button icon="fa fa-calendar" class="user-search-btn" :label="$t('action.search')" @click="searchDate"></kt-button>
				    <kt-button icon="fa fa-calendar" :label="$t('action.reset')" @click="resetDate"></kt-button>
				</div> -->
				<div class="search-container">
					<!-- <p class="input-left input-name">用户名:</p> -->
	                <el-input type="text"  placeholder="用户名"></el-input>
	                <kt-button icon="fa fa-search" type="primary" class="user-search-btn" :label="$t('action.search')" @click="searchDate"></kt-button>
		          <!-- <div class="checkbox-more">
		            <el-checkbox v-model="checkedBox" @change="changeBox">查询更多条件</el-checkbox>
		          </div> -->
                <!-- <div class="more-line"></div> -->
		          <!-- <div class="search-container-border">  --><!-- v-show="checkedBox" -->
	               <!--  <div class="search-container-input">
	                  <p class="input-left input-name">用户名:</p>
	                  <el-input type="text" placeholder="请输入..."></el-input>
	                  <kt-button icon="fa fa-calendar" class="user-search-btn" :label="$t('action.search')" @click="searchDate"></kt-button>
	                </div> -->
	                <!-- <div class="search-container-input search-container-middle">
	                  <p class="input-left">账号类型:</p>
	                  <el-select placeholder="请选择" v-model="selectedVal">
	                    <el-option value="全选" label="全选"></el-option>
	                    <el-option value="PC" label="PC"></el-option>
	                    <el-option value="APP" label="APP"></el-option>
	                    <el-option value="PC+APP" label="PC+APP"></el-option>
	                  </el-select>
	                </div>
	                <div class="search-container-input">
	                  <p class="input-left">是否授权:</p>
	                  <el-radio v-model="radioVal" label="all">全部</el-radio>
	                  <el-radio v-model="radioVal" label="yes">是</el-radio>
	                  <el-radio v-model="radioVal" label="no">否</el-radio>
	                </div> -->
		          <!-- </div> -->
				</div>
			</div>
			<div class="right-center">
				<!-- <div class="bread-crumb">部门>杭州东方通信软件技术有限公司</div> -->
				<div class="btn-container">
					<kt-button type="primary" icon="fa fa-calendar" :label="$t('action.add')"></kt-button>
					<kt-button type="primary" icon="fa fa-calendar" label="详情"></kt-button>
					<kt-button type="primary" icon="fa fa-calendar" label="授权"></kt-button>
					<kt-button type="primary" icon="fa fa-calendar" label="批量授权"></kt-button>
					<kt-button type="primary" icon="fa fa-calendar" label="启用"></kt-button>
					<kt-button type="primary" icon="fa fa-calendar" label="停用"></kt-button>
				</div>
			</div>
			<div class="right-bottom" :style="{height: tableHeight}">
				<el-table :data="tableData.content" :border="true">
					<el-table-column type="selection" width="40"></el-table-column>
					<el-table-column v-for="column in columns" header-align="center" align="center" :prop="column.prop" :label="column.label"
					 :min-width="column.minWidth" :key="column.prop" :sortable="true">
					</el-table-column>
					<el-table-column :label="$t('action.operation')" width="185" fixed="right" header-align="center" align="center">
						<template slot-scope="scope">
							<kt-button icon="fa fa-edit" :label="$t('action.edit')"></kt-button>
							<kt-button icon="fa fa-trash" :label="$t('action.delete')" type="danger"></kt-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
      <div class="user-toolbar">
        <el-pagination layout="total, prev, pager, next, jumper"
          :current-page="1" :page-size="10" :total="87">
        </el-pagination>
      </div>
		</div>
	</div>
</template>

<script>
	import '../../../../common/stylus/userManage.styl'
	import KtButton from "@/components/KtButton/index"
	export default {
		data: function() {
			return {
            dateValue: '',
        		checkedBox: false,
            selectedVal: '',
            radioVal: '',
            tableHeight: '220px',
		        outData: [{
		          name: '',
		          age: ''
		        }],
				treeData: [{
					label: '一级 1右移',
					id: 1,
					children: [{
						label: '二级 1-1一级 1右',
						id: 11,
						children: [{
							label: '三级 1-1-1一级',
							id: 111
						}]
					}]
				}, {
					label: '一级 2一级 1右移一级',
					id: 2,
					children: [{
						label: '二级 2-1一级',
						id: 21,
						children: [{
							label: '三级 2-1-1一级2-1-1一级2-1-1一级',
							id: 211
						}]
					}, {
						label: '二级 2-2一级 1',
						id: 22,
						children: [{
							label: '三级 2-2-1一级',
							id: 221
						}]
					}]
				}, {
					label: '一级 3',
					id: 3,
					children: [{
						label: '二级 3-1',
						id: 31,
						children: [{
							label: '三级 3-1-1',
							id: 311
						}]
					}, {
						label: '二级 3-2',
						id: 32,
						children: [{
							label: '三级 3-2-1',
							id: 321
						}]
					}]
				}],
				tableData: {
					content: [{
						name: "yxy",
						nameCn: '袁晓宇',
						zhanghao: 'yxy90',
						bumen: '技术部',
						keyong: '可用',
						shemin: '是',
						jibie: '一般',
						creator: '创建者',
						createTime: '2015-12-29 15:17:51',
						startTime: '2017-09-28 00:00:00',
						endTime: '2019-09-28 00:00:00'
					}, {
						name: "yxy",
						nameCn: '袁晓宇',
						zhanghao: 'yxy90',
						bumen: '技术部',
						keyong: '可用',
						shemin: '是',
						jibie: '一般',
						creator: '创建者',
						createTime: '2015-12-29 15:17:51',
						startTime: '2017-09-28 00:00:00',
						endTime: '2019-09-28 00:00:00'
					}, {
						name: "yxy",
						nameCn: '袁晓宇',
						zhanghao: 'yxy90',
						bumen: '技术部',
						keyong: '可用',
						shemin: '是',
						jibie: '一般',
						creator: '创建者',
						createTime: '2015-12-29 15:17:51',
						startTime: '2017-09-28 00:00:00',
						endTime: '2019-09-28 00:00:00'
					}, {
						name: "yxy",
						nameCn: '袁晓宇',
						zhanghao: 'yxy90',
						bumen: '技术部',
						keyong: '可用',
						shemin: '是',
						jibie: '一般',
						creator: '创建者',
						createTime: '2015-12-29 15:17:51',
						startTime: '2017-09-28 00:00:00',
						endTime: '2019-09-28 00:00:00'
					}, {
						name: "yxy",
						nameCn: '袁晓宇',
						zhanghao: 'yxy90',
						bumen: '技术部',
						keyong: '可用',
						shemin: '是',
						jibie: '一般',
						creator: '创建者',
						createTime: '2015-12-29 15:17:51',
						startTime: '2017-09-28 00:00:00',
						endTime: '2019-09-28 00:00:00'
					}, {
						name: "yxy",
						nameCn: '袁晓宇',
						zhanghao: 'yxy90',
						bumen: '技术部',
						keyong: '可用',
						shemin: '是',
						jibie: '一般',
						creator: '创建者',
						createTime: '2015-12-29 15:17:51',
						startTime: '2017-09-28 00:00:00',
						endTime: '2019-09-28 00:00:00'
					}, {
						name: "yxy",
						nameCn: '袁晓宇',
						zhanghao: 'yxy90',
						bumen: '技术部',
						keyong: '可用',
						shemin: '是',
						jibie: '一般',
						creator: '创建者',
						createTime: '2015-12-29 15:17:51',
						startTime: '2017-09-28 00:00:00',
						endTime: '2019-09-28 00:00:00'
					}, {
						name: "yxy",
						nameCn: '袁晓宇',
						zhanghao: 'yxy90',
						bumen: '技术部',
						keyong: '可用',
						shemin: '是',
						jibie: '一般',
						creator: '创建者',
						createTime: '2015-12-29 15:17:51',
						startTime: '2017-09-28 00:00:00',
						endTime: '2019-09-28 00:00:00'
					}, {
						name: "yxy",
						nameCn: '袁晓宇',
						zhanghao: 'yxy90',
						bumen: '技术部',
						keyong: '可用',
						shemin: '是',
						jibie: '一般',
						creator: '创建者',
						createTime: '2015-12-29 15:17:51',
						startTime: '2017-09-28 00:00:00',
						endTime: '2019-09-28 00:00:00'
					}, {
						name: "yxy",
						nameCn: '袁晓宇',
						zhanghao: 'yxy90',
						bumen: '技术部',
						keyong: '可用',
						shemin: '是',
						jibie: '一般',
						creator: '创建者',
						createTime: '2015-12-29 15:17:51',
						startTime: '2017-09-28 00:00:00',
						endTime: '2019-09-28 00:00:00'
					}]
				},
				columns: [{
					prop: 'name',
					label: '用户名'
				}, {
					prop: 'nameCn',
					label: '中文名称'
				}, {
					prop: 'zhanghao',
					label: '账号类型'
				}, {
					prop: 'bumen',
					label: '部门'
				}, {
					prop: 'keyong',
					label: '是否可用'
				}, {
					prop: 'shemin',
					label: '是否涉敏'
				}, {
					prop: 'jibie',
					label: '用户级别'
				}, {
					prop: 'creator',
					label: '创建者'
				}, {
					prop: 'createTime',
					label: '创建时间'
				}, {
					prop: 'startTime',
					label: '账户有效期开始时间'
				}, {
					prop: 'endTime',
					label: '账户有效期结束时间'
				}]
			}
		},
		mounted: function () {
			let _this = this
			this.$refs.userMiddle.addEventListener('mousedown',function (e) {
				let startX = e.clientX
				let middleLeft = _this.$refs.userMiddle.offsetLeft
				console.log( _this.$refs.userMiddle.offsetLeft)
				document.onmousemove = function (e) {
					let endX = e.clientX
					let moveLen = middleLeft + (endX - startX)
					// let maxT = _this.$refs.userContainer.clientWidth - _this.$refs.userMiddle.offsetWidth
					// console.log(maxT)
			      	if(moveLen<240) moveLen = 240
			      	// if(moveLen>maxT-180) moveLen = maxT-180
			      	// _this.$refs.userMiddle.style.left = moveLen;
			      	_this.$refs.userLeft.style.width = moveLen + "px";
			      	// _this.$refs.userRight.style.width = (_this.$refs.userContainer.clientWidth - moveLen - 10) + "px";
				}
				document.onmouseup = function (e) {
					document.onmousemove = null
					document.onmouseup = null
					_this.$refs.userMiddle.setCapture && _this.$refs.userMiddle.setCapture()
				}
				_this.$refs.userMiddle.setCapture && _this.$refs.userMiddle.setCapture()
				return false
			})
		},
		components: {
			KtButton
		},
		methods: {
			openAll: function() {
				for(var i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
				  this.$refs.tree.store._getAllNodes()[i].expanded=true
				}
			},
			closeAll: function() {
				for(var i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
				  this.$refs.tree.store._getAllNodes()[i].expanded=false
				}
			},
			handleNodeClick: function() {
				console.log('点击')
			},
      changeBox: function () {
        if (this.checkedBox) {
          this.tableHeight = '170px'
        } else {
          this.tableHeight = '220px'
        }
      },
      searchDate: function () {
        console.log(this.dateValue)
      },
      resetDate: function () {
        this.dateValue = ''
      }
		}
	}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
    .user-container
      display: flex
      border: 1px solid #666
      overflow: hidden
      box-sizing: border-box
      height: 100%
      position: relative
    .user-left
      box-sizing: border-box
      height: 100%
      background-color: #fff
      overflow: hidden
      width: 240px
      display: flex
      flex-direction: column
      .expand-container
         display: flex
         justify-content: center
      .tree-container
        width: 100%
        overflow: auto
        flex: 1
    .user-middle
      // float: left
      width: 5px
      height: 100%
      cursor: move
      box-sizing: border-box
      background-color: #FAECD8
      overflow: hidden
    .user-right
      width: 70%
      flex: 1
      display: flex
      flex-direction: column
      // border: 1px solid red
      // float: left
      box-sizing: border-box
      height: 100%
      // padding-top: 15px
      position: relative
      overflow: hidden
    .date-container
      display: flex
      justify-content: center
      align-items: center
    .user-search-btn
      margin-right: 15px
    .search-container
        padding: 5px 20px
        display: flex
       // margin: 15px
       // position: relative
       // min-height: 10px
    .checkbox-more
      position: absolute
      left: 20px
      top: -15px
      background-color: #ddd
      width: 130px
      height: 30px
      display: flex
      justify-content: center
      align-items: center
      z-index: 22
      input
        margin-right: 10px
    .more-line
      position: absolute
      left: 0
      top: 0
      height: 1px
      width: 100%
      background-color: #999
      z-index: 11
    .search-container-border
       border: 1px solid #999
       border-top: none
       display: flex
       padding: 0 20px
       justify-content: center
    .search-container-input
       display: flex
       align-items: center
       margin: 23px 0 10px 0
    .search-container-middle
       margin: 23px 30px 10px 30px
    .input-name
       width: 54px
    .right-center
      border-top: 1px solid #999
    .right-bottom
      overflow: auto
      flex: 1
      overflow: auto
      // border: 1px solid green
    .bread-crumb
	    height: 30px
	    line-height: 30px
	    background-color: #abcdef
	    // border: 1px solid blue
     font-size: 13px
	    box-sizing: border-box
	    text-align: left
	    padding: 0 10px
	.btn-container
	   display: flex
	   // border: 1px solid green
	   border-top: none
	.btn-container .el-button+.el-button
	  margin-left: 0
	.input-left
	  margin-right: 10px
  .user-toolbar
  	// background-color: #fff
  	margin: 5px 0
    // position: absolute
    // bottom: 7px
    // left: 0
    // width: 100%
</style>
